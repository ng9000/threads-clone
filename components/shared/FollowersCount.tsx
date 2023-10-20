import React from "react";
import FollowButton from "./FollowButton";
interface Props {
  threads: number;
  followers: number;
  following: number;
  doesUserFollow: boolean;
  userToFollow: string;
  userObject: string;
  current: string;
  followingObject: string;
}
const FollowersCount = ({
  threads,
  followers,
  following,
  doesUserFollow,
  userToFollow,
  userObject,
  current,
  followingObject,
}: Props) => {
  // console.log(followingObject, "+++++++++");

  return (
    <div className="flex flex-col items-center justify-center mt-3">
      <div className="flex space-x-6">
        <div className="flex flex-col text-light-1">
          <div>
            {threads}
            <span className="text-gray-500 ms-2">Threads</span>
          </div>
        </div>
        <div className="flex flex-col text-light-1">
          <div>
            {followers}
            <span className="text-gray-500 ms-2">Followers</span>
          </div>
        </div>
        <div className="flex flex-col text-light-1">
          <div>
            {following}
            <span className="text-gray-500 ms-2">Following</span>
          </div>
        </div>
      </div>

      <div className="flex flex-col mt-3">
        {/* <Button>follow</Button> */}
        <FollowButton
          userToFollow={userToFollow}
          userObject={userObject}
          current={current}
          doesUserFollow={doesUserFollow}
          followingObject={followingObject}
        />
      </div>
    </div>
  );
};

export default FollowersCount;
