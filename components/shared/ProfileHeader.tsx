import Image from "next/image";

interface Props {
  accountId: string;
  authUserID: string;
  name: string;
  username: string;
  imgUrl: string;
  bio: string;
}

const ProfileHeader = ({
  accountId,
  authUserID,
  name,
  username,
  imgUrl,
  bio,
}: Props) => {
  return (
    <div className="flex w-full flex-col justify-start">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative h-20 w-20 object-cover">
            <Image
              src={imgUrl}
              alt="Profile Image"
              fill
              className="rounded-full object-cover shadow-2xl"
            />
          </div>
        </div>
        <div className="flex-1 mx-2">
          <h2 className="text-left text-heading3-bold text-light-1">{name}</h2>
          <p className="text-gray-1 text-base-medium">@{username}</p>
        </div>
      </div>
      <p className="mt-6 max-w-lg text-base-regular text-light-2 ">{bio}</p>
      <div className="mt-12 h-0.5 w-full bg-dark-3" />
    </div>
  );
};

export default ProfileHeader;
