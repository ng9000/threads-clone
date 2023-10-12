"use client";
import React from "react";
import { Button } from "../ui/button";

interface Props {
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  handleDelete: () => void;
}

export default function ConformationModal({
  setShowModal,
  showModal,
  handleDelete,
}: Props) {
  return (
    <>
      {showModal ? (
        <div onClick={() => setShowModal(false)}>
          <div className="justify-center p-10 items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative my-6 mx-auto max-w-7xl">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col bg-gray-700 outline-none focus:outline-none">
                <div className="relative p-6 flex-auto">
                  <h2 className="text text-heading4-medium">
                    Do you really want to delete this thread?
                  </h2>
                  <div className="justify-center text-center flex mt-4">
                    <Button className="mx-3 bg-red-500" color="tomato">
                      Cancle
                    </Button>
                    <Button
                      className="mx-3 bg-green-500"
                      color="cyan"
                      onClick={handleDelete}
                    >
                      Confirm
                    </Button>
                  </div>
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
