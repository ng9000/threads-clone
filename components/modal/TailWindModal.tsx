"use client";
import React from "react";

interface Props {
  image: string;
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function TailWindModal({
  image,
  setShowModal,
  showModal,
}: Props) {
  return (
    <>
      {showModal ? (
        <div onClick={() => setShowModal(false)}>
          <div className="justify-center p-10 items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-screen my-6 mx-auto max-w-7xl">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col h-full w-full bg-gray-900 outline-none focus:outline-none">
                <div className="relative p-6 flex-auto">
                  <img
                    src={image}
                    alt="post image"
                    className="max-w-full max-h-full mx-auto"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </div>
      ) : null}
    </>
  );
}
