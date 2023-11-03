import { currentUser } from "@clerk/nextjs";
import { fetchUser } from "@/lib/actions/user.action";
import { redirect } from "next/navigation";
import { fetchCommunities } from "@/lib/actions/community.actions";
import CommunityCard from "@/components/cards/CommunityCard";
import Searchbar from "@/components/shared/SearchBar";

const Page = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) => {
  const user = await currentUser();
  if (!user) return null;

  const userInfo = await fetchUser(user.id);
  if (!userInfo?.onboarded) redirect("/onboarding");

  const result = await fetchCommunities({
    searchString: searchParams.q,
    pageNumber: 1,
    pageSize: 25,
  });
  return (
    <section className="head-text mb-10">
      <h2>Communities</h2>
      <Searchbar routeType="communities" />
      <div className="mt-14 flex flex-wrap gap-9">
        {result.communities.length === 0 ? (
          <p className="no-result">No communities</p>
        ) : (
          <>
            {result.communities.map((community) => (
              <CommunityCard
                key={community.id}
                id={community.id}
                name={community.name}
                username={community.username}
                imgUrl={community.image}
                bio={community.bio}
                members={community.members}
              />
            ))}
          </>
        )}
      </div>
    </section>
  );
};

export default Page;
