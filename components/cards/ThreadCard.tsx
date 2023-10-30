// "use client";
import Image from "next/image";
import Link from "next/link";

import { formatDateString } from "@/lib/utils";
import LikeButton from "../client/LikeButton";
import ImageCarousel from "../carousel/ImageCarousel";
import DeleteThread from "../forms/DeleteThread";
import Share from "../shared/Share";

interface Props {
  id: string;
  _id: string;
  currentUserId: string;
  parentId: string | null;
  content: string;
  likes: any[];
  author: {
    name: string;
    image: string;
    id: string;
  };
  community: {
    id: string;
    name: string;
    image: string;
  } | null;
  createdAt: string;
  comments: {
    author: {
      image: string;
    };
  }[];
  isComment?: boolean;
  postImages?: any;
}

function ThreadCard({
  id,
  _id,
  currentUserId,
  parentId,
  content,
  author,
  community,
  createdAt,
  comments,
  isComment,
  likes,
  postImages,
}: Props) {
  return (
    <article
      className={`flex w-full flex-col rounded-xl ${
        isComment ? "px-0 xs:px-5" : "bg-dark-2 md:p-7 p-3"
      }`}
    >
      <div className="flex items-start justify-between">
        <div className="flex w-full flex-1 flex-row gap-4">
          <div className="flex flex-col items-center">
            <Link href={`/profile/${author.id}`} className="relative h-11 w-11">
              <Image
                src={author.image}
                alt="user_community_image"
                fill
                className="cursor-pointer rounded-full"
              />
            </Link>

            <div className="thread-card_bar" />
          </div>

          <div className="flex w-full flex-col">
            <Link href={`/profile/${author.id}`} className="w-fit">
              <h1 className="cursor-pointer text-base-semibold text-light-1">
                {author.name}
              </h1>
            </Link>
            <p className="mt-2 text-small-regular text-light-2">{content}</p>

            {postImages?.length > 0 && postImages ? (
              <ImageCarousel postImages={postImages} />
            ) : null}
            <div className={`${isComment && "mb-10"} mt-3 flex flex-col gap-3`}>
              <div className="flex gap-3.5">
                <LikeButton
                  like={
                    likes.findIndex((like) => JSON.stringify(like) === _id) >= 0
                  }
                  likesLength={likes.length}
                  id={id}
                  currentUser_id={_id}
                />
                <Link href={`/thread/${JSON.parse(id)}`}>
                  <Image
                    src="/assets/reply.svg"
                    alt="comment"
                    width={24}
                    height={24}
                    className="cursor-pointer object-contain"
                  />
                </Link>
                {/* //TODO add quoted retweet */}
                <Link href={`/repost/${JSON.parse(id)}`}>
                  <Image
                    src="/assets/repost.svg"
                    alt="repost"
                    width={24}
                    height={24}
                    className="cursor-pointer object-contain"
                  />
                </Link>
                <Share url={JSON.stringify(id)} />
              </div>

              {isComment && comments.length > 0 && (
                <Link href={`/thread/${id}`}>
                  <p className="mt-1 text-subtle-medium text-gray-1">
                    {comments.length} repl{comments.length > 1 ? "ies" : "y"}
                  </p>
                </Link>
              )}
            </div>
          </div>
        </div>

        <DeleteThread
          threadId={id}
          currentUserId={currentUserId}
          authorId={author.id}
          parentId={parentId}
          isComment={isComment}
        />
      </div>

      {!isComment && comments.length > 0 && (
        <div className="ml-1 mt-3 flex items-center gap-2">
          {comments.slice(0, 2).map((comment, index) => (
            <Image
              key={index}
              src={comment.author.image}
              alt={`user_${index}`}
              width={24}
              height={24}
              className={`${index !== 0 && "-ml-5"} rounded-full object-cover`}
            />
          ))}

          <Link href={`/thread/${id}`}>
            <p className="mt-1 text-subtle-medium text-gray-1">
              {comments.length} repl{comments.length > 1 ? "ies" : "y"}
            </p>
          </Link>
        </div>
      )}

      {!isComment && community && (
        <Link
          href={`/communities/${community.id}`}
          className="mt-5 flex items-center"
        >
          <p className="text-subtle-medium text-gray-1">
            {formatDateString(createdAt)}
            {community && ` - ${community.name} Community`}
          </p>

          <Image
            src={community.image}
            alt={community.name}
            width={14}
            height={14}
            className="ml-1 rounded-full object-cover"
          />
        </Link>
      )}
    </article>
  );
}

export default ThreadCard;
