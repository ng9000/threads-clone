import ThreadCard from "@/components/cards/ThreadCard";
import { fetchPosts } from "@/lib/actions/thread.actions";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

export default async function Home() {
  const result = await fetchPosts(1, 30);
  // console.log(result);
  const user = await currentUser();

  if (!user) redirect("/sign-in");

  return (
    <div>
      <h1 className="head-text text-left">Threads-Clone</h1>
      <section className="mt-7 flex flex-col gap-10">
        {result.posts.length === 0 ? (
          <p>No Threads found</p>
        ) : (
          <>
            {result.posts.map((post) => (
              <ThreadCard
                key={post._id}
                id={post._id}
                currentUserId={user?.id || ""}
                parentId={post.parentId}
                content={post.text}
                author={post.author}
                community={post.community}
                createdAt={post.createdAt}
                comments={post.children}
                likes={post.likes}
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
