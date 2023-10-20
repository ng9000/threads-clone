import Image from "next/image";
import React from "react";
import Link from "next/link";
import FollowButton from "../shared/FollowButton";

interface Props {
  id: string;
  name: string;
  username: string;
  imgUrl: string;
  personType: string;
  currentUser: any;
  _id: any;
  doesUserFollow: boolean;
  followingObject: string;
}
const UserCard = ({
  id,
  name,
  username,
  imgUrl,
  personType,
  currentUser,
  _id,
  doesUserFollow,
  followingObject,
}: Props) => {
  return (
    <article className="user-card">
      <Link
        //className="user-card_btn"
        href={`/${
          personType === "community" ? "communities" : "profile"
        }/${id}`}
      >
        <div className="user-card_avatar">
          <Image
            src={imgUrl}
            alt="logo"
            width={48}
            height={48}
            className="rounded-full"
          />
          <div className="flex-1 text-ellipsis">
            <h4 className="text-base-semibold text-light-1">{name}</h4>
            <p className="text-small-medium text-gray-1">{username}</p>
          </div>
        </div>
      </Link>
      {personType === "user" ? (
        <FollowButton
          userToFollow={id}
          userObject={JSON.stringify(_id)}
          current={currentUser}
          doesUserFollow={doesUserFollow}
          followingObject={followingObject}
        />
      ) : null}
    </article>
  );
};

export default UserCard;
