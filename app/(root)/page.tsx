import ThreadCard from "@/components/cards/ThreadCard";
import { fetchUser, fetchUserFollowingPosts } from "@/lib/actions/user.action";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

export default async function Home() {
  const user = await currentUser();
  if (!user) redirect("/sign-in");
  const userId = await fetchUser(user.id);
  const result = await fetchUserFollowingPosts(user?.id);
  console.log(result, "=============================");
  return (
    <div>
      <h1 className="head-text text-left">Threads-Clone</h1>
      <section className="mt-7 flex flex-col gap-10">
        {result.length === 0 ? (
          <>
            <div className="text-gray-300" style={{ fontSize: "25px" }}>
              Hello there {user.username}!
            </div>
            <div className=" text-gray-500" style={{ fontSize: "20px" }}>
              Follow users or post something new
            </div>
          </>
        ) : (
          <>
            {result.map((post: any) => (
              <ThreadCard
                key={post?._id}
                _id={JSON.stringify(userId?._id)}
                id={JSON.stringify(post?._id)}
                currentUserId={user?.id || ""}
                parentId={post?.parentId}
                content={post?.text}
                author={post?.author}
                community={post?.community}
                createdAt={post?.createdAt}
                comments={post?.children}
                likes={post?.likes}
                isComment={false}
                postImages={post?.postImages}
              />
            ))}
          </>
        )}
      </section>
    </div>
  );
}
