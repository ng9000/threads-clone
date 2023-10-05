import Image from "next/image";

const Loading = () => {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <Image
        src="assets/loader.svg"
        width={50}
        height={50}
        alt="loader"
        className="object-contain text-light-1"
      />
    </div>
  );
};

export default Loading;
