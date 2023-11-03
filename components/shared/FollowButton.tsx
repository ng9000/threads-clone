"use client";
import { followUser, unFollowUser } from "@/lib/actions/user.action";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { usePathname } from "next/navigation";

interface Props {
  userObject: string;
  current: any;
  userToFollow: any;
  doesUserFollow: boolean;
  followingObject: string;
}
const FollowButton = ({
  userToFollow,
  userObject,
  current,
  doesUserFollow,
  followingObject,
}: Props) => {
  const [follow, setFollow] = useState(doesUserFollow);
  const pathname = usePathname();

  const handleFollow = async (
    userObject: string,
    current: any,
    userToFollow: any
  ) => {
    await followUser({
      currentUserId: current,
      objectOfUserFollowed: JSON.parse(userObject),
      idOfUserThatIFollowed: userToFollow,
    });
  };

  const handleUnFollow = async (
    followingObject: string,
    userToFollow: string,
    userObject: string
  ) => {
    await unFollowUser({
      userId: current,
      unFollowObjectId: JSON.parse(followingObject),
      userToUnFollow: userToFollow,
      userObject: userObject,
    });
  };
  if (pathname.includes(current)) {
    return null;
  }
  return (
    <Button
      className="user-card_btn"
      onClick={() => {
        follow
          ? handleUnFollow(followingObject, userToFollow, userObject)
          : handleFollow(userObject, current, userToFollow);
        setFollow(!follow);
      }}
    >
      {follow ? "Following" : "Follow"}
    </Button>
  );
};

export default FollowButton;
