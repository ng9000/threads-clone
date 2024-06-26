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
  _id: string;
}
const ThreadsTab = async ({
  currentUserId,
  accountId,
  accountType,
  value,
  searchId,
  _id,
}: Props) => {
  let threads: any;
  let replies: any;
  if (accountType === "Community") {
    threads = await fetchCommunityPosts(accountId);
  } else {
    threads = await fetchUserPosts(accountId);
  }
  if (value === "replies") {
    replies = await fetchUserComments(JSON.parse(searchId));
  }

  if (!threads) redirect("/");
  return (
    <section className="mt-9 flex flex-col gap-10">
      {value === "replies" ? (
        <>
          {replies?.length !== 0 ? (
            <>
              {replies.map((reply: any) => (
                <ThreadCard
                  key={reply?._id}
                  id={JSON.stringify(reply?._id)}
                  _id={_id}
                  currentUserId={currentUserId}
                  parentId={reply?.parentId}
                  content={reply?.text}
                  likes={reply?.likes}
                  author={
                    accountType === "User"
                      ? {
                          name: reply?.author.name,
                          image: reply?.author.image,
                          id: reply?.author.id,
                        }
                      : {
                          name: reply.author.name,
                          image: reply.author.image,
                          id: reply.author.id,
                        }
                  }
                  community={reply?.community}
                  createdAt={reply?.createdAt}
                  comments={reply?.children}
                  postImages={reply?.postImages}
                />
              ))}
            </>
          ) : (
            <div className="text-light-1 text-center ">No replies</div>
          )}
        </>
      ) : (
        <>
          {threads?.threads?.length !== 0 ? (
            <>
              {threads.threads.map((thread: any) => (
                <ThreadCard
                  key={thread?._id}
                  _id={_id}
                  id={JSON.stringify(thread?._id)}
                  currentUserId={currentUserId}
                  parentId={thread?.parentId}
                  content={thread?.text}
                  likes={thread?.likes}
                  author={
                    accountType === "User"
                      ? {
                          name: threads?.name,
                          image: threads?.image,
                          id: threads?.id,
                        }
                      : {
                          name: thread?.author.name,
                          image: thread?.author.image,
                          id: thread?.author.id,
                        }
                  }
                  community={thread?.community}
                  createdAt={thread?.createdAt}
                  comments={thread?.children}
                  postImages={thread?.postImages}
                />
              ))}
            </>
          ) : (
            <div className="text-light-1 text-center">No threads posted</div>
          )}
        </>
      )}
    </section>
  );
};

export default ThreadsTab;
