import Image from "next/image";
import FollowersCount from "./FollowersCount";

interface Props {
  accountId: string;
  authUserID: string;
  name: string;
  username: string;
  imgUrl: string;
  bio: string;
  type?: "User" | "Community";
  followers: number;
  following: number;
  threads: number;
  userObject: any;
  doesUserFollow: boolean;
  followingObject: string;
}

const ProfileHeader = ({
  accountId,
  authUserID,
  name,
  username,
  imgUrl,
  bio,
  type,
  followers,
  following,
  threads,
  userObject,
  doesUserFollow,
  followingObject,
}: Props) => {
  return (
    <div className="flex w-full flex-col justify-start">
      <div className="flex flex-col md:flex-row md:items-center justify-between w-full">
        <div className="flex items-center gap-3">
          <div className="relative h-20 w-20 object-cover">
            <Image
              src={imgUrl}
              alt="Profile Image"
              fill
              className="rounded-full object-cover shadow-2xl"
            />
          </div>
        </div>
        <div className="flex-1 md:mx-2 mt-4 md:mt-0 md:flex-row">
          <h2 className="text-left text-heading3-bold text-light-1">{name}</h2>
          <p className="text-gray-1 text-base-medium">@{username}</p>
        </div>
        <FollowersCount
          threads={threads}
          followers={followers}
          following={following}
          doesUserFollow={doesUserFollow}
          current={authUserID}
          userObject={userObject}
          userToFollow={accountId}
          followingObject={followingObject}
        />
      </div>

      <p className="mt-6 max-w-lg text-base-regular text-light-2 md:pl-20">
        {bio}
      </p>

      <div className="mt-12 h-0.5 w-full bg-dark-3" />
    </div>
  );
};

export default ProfileHeader;
