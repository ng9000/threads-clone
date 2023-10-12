import { fetchUserComments, fetchUserPosts } from "@/lib/actions/user.action";
import { redirect } from "next/navigation";
import ThreadCard from "../cards/ThreadCard";
import { fetchCommunityPosts } from "@/lib/actions/community.actions";

interface Props {
  currentUserId: string;
  accountId: string;
  accountType: string;
  value?: string;
  searchId: string;
}
const ThreadsTab = async ({
  currentUserId,
  accountId,
  accountType,
  value,
  searchId,
}: Props) => {
  let response: any;
  if (accountType === "Community") {
    response = await fetchCommunityPosts(accountId);
  } else {
    response = await fetchUserPosts(accountId);
  }
  if (value === "replies") {
    response = await fetchUserComments(searchId);
  }

  if (!response) redirect("/");
  return (
    <section className="mt-9 flex flex-col gap-10">
      {value === "replies" ? (
        <>
          {response.map((reply: any) => (
            <ThreadCard
              key={reply._id}
              id={reply._id}
              currentUserId={currentUserId}
              parentId={reply.parentId}
              content={reply.text}
              likes={reply.likes}
              author={
                accountType === "User"
                  ? {
                      name: reply.author.name,
                      image: reply.author.image,
                      id: reply.author.id,
                    }
                  : {
                      name: reply.author.name,
                      image: reply.author.image,
                      id: reply.author.id,
                    }
              }
              community={reply.community}
              createdAt={reply.createdAt}
              comments={reply.children}
              postImages={reply?.postImages}
            />
          ))}
        </>
      ) : (
        <>
          {response.threads.map((thread: any) => (
            <ThreadCard
              key={thread._id}
              id={thread._id}
              currentUserId={currentUserId}
              parentId={thread.parentId}
              content={thread.text}
              likes={thread.likes}
              author={
                accountType === "User"
                  ? {
                      name: response.name,
                      image: response.image,
                      id: response.id,
                    }
                  : {
                      name: thread.author.name,
                      image: thread.author.image,
                      id: thread.author.id,
                    }
              }
              community={thread.community}
              createdAt={thread.createdAt}
              comments={thread.children}
              postImages={thread?.postImages}
            />
          ))}
        </>
      )}
    </section>
  );
};

export default ThreadsTab;
