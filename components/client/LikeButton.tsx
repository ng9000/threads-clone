"use client";
import { dislikePost, likePost } from "@/lib/actions/thread.actions";
import Image from "next/image";
import React, { useState } from "react";

interface Params {
  id: string;
  like: boolean;
  likesLength: number;
  currentUser_id: string;
}
const LikeButton = ({ id, like, likesLength, currentUser_id }: Params) => {
  const [isLiked, setIsLiked] = useState(like);
  const [likeCount, setLikeCount] = useState(likesLength);

  const handleLikeOrDislike = () => {
    isLiked
      ? dislikePost({
          threadId: JSON.parse(id),
          userId: JSON.parse(currentUser_id),
        })
      : likePost({
          threadId: JSON.parse(id),
          userId: JSON.parse(currentUser_id),
        });
    setIsLiked(!isLiked);
    setLikeCount(isLiked ? likeCount - 1 : likeCount + 1);
  };
  return (
    <>
      {/* <Image
        src={`/assets/heart-${isLiked ? "filled" : "gray"}.svg`}
        alt="heart"
        width={24}
        height={24}
        className="cursor-pointer object-contain"
        onClick={handleLikeOrDislike}
      />
      {likeCount > 0 ? (
        <span className="mt-1 text-subtle-medium text-gray-1">
          {likeCount} Like{likeCount > 1 ? "s" : ""}
        </span>
      ) : null} */}
      <div className="flex items-center">
        <Image
          src={`/assets/heart-${isLiked ? "filled" : "gray"}.svg`}
          alt="heart"
          width={24}
          height={24}
          className="cursor-pointer object-contain"
          onClick={handleLikeOrDislike}
        />
        {likeCount > 0 && (
          <span className="mt-1 text-subtle-medium text-gray-1">
            {likeCount} Like{likeCount > 1 ? "s" : ""}
          </span>
        )}
      </div>
    </>
  );
};

export default LikeButton;
