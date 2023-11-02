"use server";

import { FilterQuery, SortOrder } from "mongoose";
import { revalidatePath } from "next/cache";

import Community from "../models/community.model";
import Thread from "../models/thread.model";
import User from "../models/user.model";

import { connectToDB } from "../mongoose";

export async function fetchUser(userId: string) {
  try {
    connectToDB("fetch user");

    return await User.findOne({ id: userId }).populate({
      path: "communities",
      model: Community,
    });
  } catch (error: any) {
    throw new Error(`Failed to fetch user: ${error}`);
  }
}

interface Params {
  userId: string;
  username: string;
  name: string;
  bio: string;
  image: string;
  path: string;
}

export async function updateUser({
  userId,
  bio,
  name,
  path,
  username,
  image,
}: Params): Promise<void> {
  try {
    connectToDB("update user (onboarding)");
    const get_id = await User.findOneAndUpdate(
      { id: userId },
      {
        username: username.toLowerCase(),
        name,
        bio,
        image,
        onboarded: true,
        following: [],
        followers: [],
      },
      { upsert: true, new: true }
    );
    if (get_id) {
      await followUser({
        currentUserId: userId,
        objectOfUserFollowed: get_id._id,
        idOfUserThatIFollowed: "",
      });
    }

    if (path === "/profile/edit") {
      revalidatePath(path);
    }
  } catch (error: any) {
    throw new Error(`Failed to create/update user: ${error}`);
  }
}

export async function fetchUserPosts(userId: string) {
  try {
    connectToDB("fetch user posts");

    // Find all threads authored by the user with the given userId
    const threads = await User.findOne({ id: userId }).populate({
      path: "threads",
      model: Thread,
      populate: [
        {
          path: "community",
          model: Community,
          select: "name id image _id", // Select the "name" and "_id" fields from the "Community" model
        },
        {
          path: "author",
          model: User,
          // Select the "name" and "_id" fields from the "User" model
          select: "name image id",
        },
        {
          path: "children",
          model: Thread,
          populate: {
            path: "author",
            model: User,
            select: "name image id", // Select the "name" and "_id" fields from the "User" model
          },
        },
        {
          path: "originalPost",
          model: Thread,
          populate: {
            path: "author",
            model: User,
            // Select the "name" and "_id" fields from the "User" model
            select: "name image id",
          },
        },
      ],
    });
    return threads;
  } catch (error) {
    console.error("Error fetching user threads:", error);
    throw error;
  }
}

// Almost similar to Thead (search + pagination) and Community (search + pagination)
export async function fetchUsers({
  userId,
  searchString = "",
  pageNumber = 1,
  pageSize = 20,
  sortBy = "desc",
}: {
  userId: string;
  searchString?: string;
  pageNumber?: number;
  pageSize?: number;
  sortBy?: SortOrder;
}) {
  try {
    connectToDB("fetch users (search)");

    // Calculate the number of users to skip based on the page number and page size.
    const skipAmount = (pageNumber - 1) * pageSize;

    // Create a case-insensitive regular expression for the provided search string.
    const regex = new RegExp(searchString, "i");

    // Create an initial query object to filter users.
    const currentUser = await User.findOne({ id: userId });
    // const followingIds = currentUser.following || [];

    const query: FilterQuery<typeof User> = {
      id: { $ne: userId }, // Exclude the current user from the results.
      // _id: { $nin: followingIds }, // Excluding users who current user follows
    };

    // If the search string is not empty, add the $or operator to match either username or name fields.
    if (searchString.trim() !== "") {
      query.$or = [
        { username: { $regex: regex } },
        { name: { $regex: regex } },
      ];
    }

    // Define the sort options for the fetched users based on createdAt field and provided sort order.
    const sortOptions = { createdAt: sortBy };

    const usersQuery = User.find(query)
      .sort(sortOptions)
      .skip(skipAmount)
      .limit(pageSize);

    // Count the total number of users that match the search criteria (without pagination).
    const totalUsersCount = await User.countDocuments(query);

    const users = await usersQuery.exec();

    // Check if there are more users beyond the current page.
    const isNext = totalUsersCount > skipAmount + users.length;
    return { users, isNext };
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
}

export async function getActivity(userId: string) {
  try {
    connectToDB("get activity");

    // Find all threads created by the user
    const userThreads = await Thread.find({ author: userId });

    // Collect all the child thread ids (replies) from the 'children' field of each user thread
    const childThreadIds = userThreads.reduce((acc, userThread) => {
      return acc.concat(userThread.children);
    }, []);
    const childRepostsIds = userThreads.reduce((acc, userThread) => {
      return acc.concat(userThread.reposts);
    }, []);

    // Find and return the child threads (replies) excluding the ones created by the same user
    const replies = await Thread.find({
      _id: { $in: childThreadIds },
      author: { $ne: userId }, // Exclude threads authored by the same user
    }).populate({
      path: "author",
      model: User,
      select: "name image _id",
    });
    const reposts = await Thread.find({
      childRepostsIds,
      author: { $ne: userId }, // Exclude threads authored by the same user
    }).populate({
      path: "author",
      model: User,
      select: "name image _id",
    });
    console.log(reposts, "=-=-=-=-=-=-=--=-=-=-=--=-=-=-=-=-=");

    // let concatenatedLikes: any[] = [];
    // for (const obj of userThreads) {
    //   if (Array.isArray(obj.likes)) {
    //     concatenatedLikes = concatenatedLikes.concat(obj.likes);
    //   }
    // }
    // const likes = await User.find({
    //   _id: { $in: concatenatedLikes },
    // });
    // console.log(likes, "=================================");

    return replies;
  } catch (error) {
    console.error("Error fetching replies: ", error);
    throw error;
  }
}

export async function fetchUserComments(userId: string) {
  try {
    connectToDB("fetch user comments");

    // Find all threads authored by the user with the given userId
    const threads = await Thread.find({
      author: userId,
      parentId: { $exists: true, $ne: null },
    }).populate([
      {
        path: "author",
        model: User,
        select: "name image id", // Select the "name" and "_id" fields from the "User" model
      },
      {
        path: "community",
        model: Community,
        select: "name id image _id", // Select the "name" and "_id" fields from the "Community" model
      },
      {
        path: "children",
        model: Thread,
        populate: {
          path: "author",
          model: User,
          select: "name image id", // Select the "name" and "_id" fields from the "User" model
        },
      },
    ]);
    return threads;
  } catch (error) {
    console.error("Error fetching user Comments:", error);
    throw error;
  }
}

export async function fetchUserFollowingPosts(
  userId: string,
  page: number = 1,
  itemsPerPage: number = 5
) {
  try {
    connectToDB("fetch posts from users following");
    const skip = (page - 1) * itemsPerPage;
    const threads = await User.findOne({ id: userId }).populate([
      {
        path: "following", // populating following accounts and then populating their posts
        model: User,
        populate: {
          path: "threads",
          model: Thread,
          options: { sort: { createdAt: -1 }, limit: itemsPerPage, skip: skip },
          populate: [
            {
              path: "author",
              model: User,
              select: "id name image",
            },
            {
              path: "community",
              model: Community,
              // Select the "name" and "_id" fields from the "Community" model
              select: "name id image _id",
            },
            {
              path: "children",
              model: Thread,
              populate: {
                path: "author",
                model: User,
                // Select the "name" and "_id" fields from the "User" model
                select: "name image id",
              },
            },
            {
              path: "originalPost",
              model: Thread,
              populate: {
                path: "author",
                model: User,
                // Select the "name" and "_id" fields from the "User" model
                select: "name image id",
              },
            },
          ],
        },
      },
    ]);
    const temp: any = [];
    threads.following.map((user: any) => {
      user.threads.map((thread: any) => {
        temp.push(thread);
      });
    });
    temp.sort((a: any, b: any) => (a.createdAt > b.createdAt ? -1 : 1));
    return temp;
  } catch (error) {
    console.error("Error fetching user following:", error);
    throw error;
  }
}

export async function fetchUsersForSidebar({
  userId,
}: {
  userId: string;
  searchString?: string;
  pageNumber?: number;
  pageSize?: number;
  sortBy?: SortOrder;
}) {
  try {
    connectToDB("fetch users for sidebar");

    // Create an initial query object to filter users.
    const currentUser = await User.findOne({ id: userId });
    const followingIds = currentUser.following || [];

    const query: FilterQuery<typeof User> = {
      id: { $ne: userId }, // Exclude the current user from the results.
      _id: { $nin: followingIds }, // Excluding users who current user follows
    };

    const usersQuery = User.find(query).limit(5);
    const users = await usersQuery.exec();

    return { users };
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
}

interface PropsFollow {
  currentUserId: any;
  objectOfUserFollowed: any;
  idOfUserThatIFollowed: any;
}
export async function followUser({
  currentUserId,
  objectOfUserFollowed,
  idOfUserThatIFollowed,
}: PropsFollow) {
  try {
    connectToDB("follow user");
    const followUser = await User.findOneAndUpdate(
      { id: currentUserId },
      { $addToSet: { following: objectOfUserFollowed } },
      { new: true }
    );
    if (idOfUserThatIFollowed) {
      await User.findOneAndUpdate(
        { id: idOfUserThatIFollowed },
        {
          $addToSet: {
            followers: {
              followersObject: followUser._id,
              followersId: currentUserId,
            },
          },
        }
      );
    }
  } catch (error) {
    console.error("Error while following user:", error);
  }
}

interface unFollowProps {
  userId: string;
  unFollowObjectId: string;
  userToUnFollow: string;
  userObject: string;
}
export async function unFollowUser({
  userId,
  unFollowObjectId,
  userToUnFollow,
  userObject,
}: unFollowProps) {
  try {
    connectToDB("unfollow user");

    // remove objectId from current users account in following
    await User.findOneAndUpdate(
      { id: userId },
      {
        $pull: {
          following: JSON.parse(userObject),
        },
      }
    );

    // remove object in followers from the user to unfollow
    await User.findOneAndUpdate(
      { id: userToUnFollow },
      {
        $pull: {
          followers: {
            _id: unFollowObjectId,
          },
        },
      }
    );
  } catch (error) {
    console.error("Error while unfollowing user:", error);
  }
}

export async function fetchPost(postId: string) {
  try {
    connectToDB("fetch thread for reposting");

    return await Thread.findOne({ _id: postId }).populate({
      path: "author",
      model: User,
      select: "id name image",
    });
  } catch (error: any) {
    throw new Error(`Failed to fetch user: ${error}`);
  }
}
