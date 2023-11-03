import ImageCarousel from "@/components/carousel/ImageCarousel";
import PostThread from "@/components/forms/PostThread";
import { fetchPost, fetchUser } from "@/lib/actions/user.action";
import { currentUser } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";

const Page = async ({ params }: { params: { id: string } }) => {
  const user = await currentUser();
  if (!user) return null;

  const userInfo = await fetchUser(user.id);
  if (!userInfo?.onboarded) redirect("/onboarding");

  const userStringId = userInfo._id.toString();
  const post = await fetchPost(params?.id);

  // console.log(post, "========");

  return (
    <div className="text-light-1">
      <div className="flex items-start justify-between">
        <div className="flex w-full flex-1 flex-row gap-4">
          <div className="flex flex-col items-center">
            <Link
              href={`/profile/${post.author.id}`}
              className="relative h-11 w-11"
            >
              <Image
                src={post.author.image}
                alt="user_community_image"
                fill
                className="cursor-pointer rounded-full"
              />
            </Link>

            <div className="thread-card_bar" />
          </div>

          <div className="flex w-full flex-col">
            <Link href={`/profile/${post.author.id}`} className="w-fit">
              <h4 className="cursor-pointer text-base-semibold text-light-1">
                {post.author.name}
              </h4>
            </Link>

            <p className="mt-2 text-small-regular text-light-2">{post.text}</p>

            {post.postImages?.length > 0 && post.postImages ? (
              <ImageCarousel postImages={post.postImages} />
            ) : null}
          </div>
        </div>
      </div>

      <PostThread
        isRepost={true}
        userId={userStringId}
        originalPost={params?.id}
      />
    </div>
  );
};

export default Page;
