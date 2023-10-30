"use client";
import Image from "next/image";
import React from "react";
import { RWebShare } from "react-web-share";
interface Params {
  url: string;
}
const Share = ({ url }: Params) => {
  return (
    <RWebShare
      data={{
        text: "Share thread",
        url: `https://threads-clone-sand-zeta.vercel.app/thread/${JSON.parse(
          url
        )}`,
        title: "Threads",
      }}
    >
      <Image
        src="/assets/share.svg"
        alt="share"
        width={24}
        height={24}
        className="cursor-pointer object-contain"
      />
    </RWebShare>
  );
};

export default Share;
