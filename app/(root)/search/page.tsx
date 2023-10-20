import { currentUser } from "@clerk/nextjs";
import { fetchUser, fetchUsers } from "@/lib/actions/user.action";
import { redirect } from "next/navigation";
import UserCard from "@/components/cards/UserCard";
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

  const result = await fetchUsers({
    userId: user.id,
    searchString: searchParams.q,
    pageNumber: 1,
    pageSize: 25,
  });

  return (
    <section className="head-text mb-10">
      <h2>Search</h2>
      <Searchbar routeType="search" />
      <div className="mt-14 flex flex-col gap-9">
        {result.users.length === 0 ? (
          <p className="no-result">No users</p>
        ) : (
          <>
            {result.users.map((person, index) => (
              <UserCard
                key={person.id}
                _id={person._id}
                id={person.id}
                currentUser={user.id}
                name={person.name}
                username={person.username}
                imgUrl={person.image}
                personType="user"
                doesUserFollow={person.followers.some(
                  (follower: any) => follower.followersId === user.id
                )}
                followingObject={JSON.stringify(person?.followers[index]?._id)}
              />
            ))}
          </>
        )}
      </div>
    </section>
  );
};

export default Page;
