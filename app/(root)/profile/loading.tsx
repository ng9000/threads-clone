import Image from "next/image";
import svgImage from "@/components/loader/loader.svg";

const Loading = () => {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <Image
        src={svgImage}
        width={50}
        height={50}
        alt="loader"
        className="object-contain text-light-1"
      />
    </div>
  );
};

export default Loading;
