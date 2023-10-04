import { currentUser } from "@clerk/nextjs";
import React from "react";
import { fetchUser } from "@/lib/actions/user.action";
import { redirect } from "next/navigation";
import PostThread from "@/components/forms/PostThread";

const Page = async () => {
  const user = await currentUser();
  if (!user) return null;

  const userInfo = await fetchUser(user.id);
  if (!userInfo?.onboarded) redirect("/onboarding");

  const userStringId = userInfo._id.toString();
  return (
    <>
      <h1 className="head-text">Create thread</h1>
      <PostThread userId={userStringId} />
    </>
  );
};

export default Page;
