import { fetchCommunities } from "@/lib/actions/community.actions";
import React, { Suspense } from "react";
import UserCard from "../cards/UserCard";
import { fetchUsersForSidebar } from "@/lib/actions/user.action";
import { currentUser } from "@clerk/nextjs";

const RightSideBar = async () => {
  const current = await currentUser();
  if (!current) return null;

  const communities = await fetchCommunities({
    pageSize: 5,
  });
  const users = await fetchUsersForSidebar({
    userId: current.id,
  });
  //  console.log(users, " ============================== +");

  return (
    <section className="custom-scrolbar rightsidebar">
      <div className="flex flex-1 flex-col justify-start">
        <h3 className="text-heading4-medium text-light-1">
          Suggested Communities
        </h3>
        {communities.communities.map((community) => (
          <Suspense>
            <div className="mt-3 block max-w-sm p-3 bg-black border border-black rounded-lg shadow  dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
              <UserCard
                key={community.id}
                id={community.id}
                name={community.name}
                username={community.username}
                currentUser=""
                _id=""
                imgUrl={community.image}
                personType="community"
                doesUserFollow={false}
                followingObject=""
              />
            </div>
          </Suspense>
        ))}
      </div>
      {users.users.length === 0 ? (
        <></>
      ) : (
        <div className="flex flex-1 flex-col justify-start">
          <h3 className="text-heading4-medium text-light-1">Suggested Users</h3>

          {users.users.map((user, index) => (
            <Suspense>
              <div className="mt-3 block max-w-sm p-3 bg-black border border-black rounded-lg shadow  dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                <UserCard
                  key={user.id}
                  id={user.id}
                  currentUser={current.id}
                  _id={user._id}
                  name={user.name}
                  username={user.username}
                  imgUrl={user.image}
                  personType="user"
                  doesUserFollow={false}
                  followingObject={JSON.stringify(user?.followers[index]?._id)}
                />
              </div>
            </Suspense>
          ))}
        </div>
      )}
    </section>
  );
};

export default RightSideBar;
