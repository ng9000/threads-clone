import { fetchCommunities } from "@/lib/actions/community.actions";
import React from "react";
import UserCard from "../cards/UserCard";
import { fetchUsers } from "@/lib/actions/user.action";
import { currentUser } from "@clerk/nextjs";

const RightSideBar = async () => {
  const user = await currentUser();
  if (!user) return null;

  const communities = await fetchCommunities({
    pageSize: 5,
  });
  const users = await fetchUsers({
    userId: user.id,
    searchString: "",
    pageNumber: 1,
    pageSize: 5,
  });
  return (
    <section className="custom-scrolbar rightsidebar">
      <div className="flex flex-1 flex-col justify-start">
        <h3 className="text-heading4-medium text-light-1">
          Suggested Communities
        </h3>
        {communities.communities.map((community) => (
          <div className=" mt-3 block max-w-sm p-3 bg-black border border-black rounded-lg shadow  dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
            <UserCard
              key={community.id}
              id={community.id}
              name={community.name}
              username={community.username}
              imgUrl={community.image}
              personType="community"
            />
          </div>
        ))}
      </div>
      <div className="flex flex-1 flex-col justify-start">
        <h3 className="text-heading4-medium text-light-1">Suggested Users</h3>
        {users.users.map((user) => (
          <div className=" mt-3 block max-w-sm p-3 bg-black border border-black rounded-lg shadow  dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
            <UserCard
              key={user.id}
              id={user.id}
              name={user.name}
              username={user.username}
              imgUrl={user.image}
              personType="User"
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default RightSideBar;
