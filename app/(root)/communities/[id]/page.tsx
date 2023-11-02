import { currentUser } from "@clerk/nextjs";
import ProfileHeader from "@/components/shared/ProfileHeader";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { communityTabs } from "@/lib/constants";
import Image from "next/image";
import ThreadsTab from "@/components/shared/ThreadsTab";
import { fetchCommunityDetails } from "@/lib/actions/community.actions";
import UserCard from "@/components/cards/UserCard";
import { fetchUser } from "@/lib/actions/user.action";

const Page = async ({ params }: { params: { id: string } }) => {
  const user = await currentUser();
  if (!user) return null;
  const userInfo = await fetchUser(params?.id);
  const current_id = await fetchUser(user?.id);

  const communityDetails = await fetchCommunityDetails(params.id);
  return (
    <section>
      <ProfileHeader
        accountId={communityDetails.id}
        authUserID={user.id}
        name={communityDetails.name}
        username={communityDetails.username}
        imgUrl={communityDetails.image}
        bio={communityDetails.bio}
        type="Community"
        userObject={""}
        followers={0}
        following={0}
        threads={0}
        doesUserFollow={false}
        followingObject=""
      />
      <div className="mt-9">
        <Tabs defaultValue="threads" className="w-full">
          <TabsList className="tab">
            {communityTabs.map((tab) => (
              <TabsTrigger key={tab.label} value={tab.value} className="tab">
                <Image
                  src={tab.icon}
                  alt={tab.label}
                  height={24}
                  width={24}
                  className="object-contain"
                />
                <p className="max-sm:hidden">{tab.label}</p>
                {tab.label === "Threads" && (
                  <p className="ml-1 rounded-sm bg-light-4 px-2 py-1 !text-tiny-medium text-light-2">
                    {communityDetails?.threads.length}
                  </p>
                )}
              </TabsTrigger>
            ))}
          </TabsList>
          <TabsContent value="threads" className="w-full text-light-1">
            <ThreadsTab
              user_Id={JSON.stringify(userInfo?._id)}
              userId={JSON.stringify(user?.id)}
              _id={JSON.stringify(current_id?._id)}
              currentUserId={user.id}
              accountId={communityDetails._id}
              searchId=""
              accountType="Community"
            />
          </TabsContent>
          <TabsContent value="members" className="w-full text-light-1">
            <section className="mt-9 flex flex-col gap-10">
              {communityDetails?.members.map((member: any) => (
                <UserCard
                  key={member.id}
                  id={member.id}
                  name={member.name}
                  currentUser=""
                  _id=""
                  username={member.username}
                  imgUrl={member.image}
                  personType="User"
                  followingObject=""
                  doesUserFollow={false}
                />
              ))}
            </section>
          </TabsContent>
          <TabsContent value="requests" className="w-full text-light-1">
            <ThreadsTab
              user_Id={JSON.stringify(userInfo?._id)}
              userId={JSON.stringify(user?.id)}
              _id={JSON.stringify(current_id?._id)}
              currentUserId={user.id}
              searchId=""
              accountId={communityDetails._id}
              accountType="Community"
            />
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default Page;
