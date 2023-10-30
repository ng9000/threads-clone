"use client";
import Image from "next/image";
import React from "react";

interface Props {
  handleFile: (e: any) => void;
  files: any;
  removeImage: (fileName: string) => void;
  message: string;
}
const ImageUpload = ({ handleFile, files, removeImage, message }: Props) => {
  return (
    <>
      <div className="flex">
        <div className="rounded-lg shadow-xl border-dark-4 bg-dark-3 text-light-1  sm:w-full w-[310px]">
          <div className="m-4">
            <span className="flex justify-center items-center text-[12px] mb-1 text-red-500">
              {message}
            </span>
            <div className="flex items-center justify-center w-full">
              <label className="flex cursor-pointer flex-col w-full h-32 border-2 rounded-md border-dashed hover:bg-dark-3 hover:border-dark-4">
                <div className="flex flex-col items-center justify-center pt-7">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-12 h-12 text-gray-400 group-hover:text-gray-600"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <p className="pt-1 text-sm tracking-wider text-gray-400 group-hover:text-gray-600">
                    Select a photo
                  </p>
                </div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFile}
                  className="opacity-0"
                  multiple
                  name="files[]"
                />
              </label>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {files.map((file: any) => {
                return (
                  <div
                    key={file.file.name}
                    className="overflow-hidden relative"
                  >
                    <i
                      onClick={() => {
                        removeImage(file.file.name);
                      }}
                      className="mdi mdi-close absolute right-1 hover:text-white cursor-pointer"
                    >
                      <Image
                        src="assets/delete.svg"
                        alt="delete"
                        height={20}
                        width={20}
                      />
                    </i>
                    <img
                      className="h-20 w-20 rounded-md mx-3"
                      alt="thread post image"
                      src={file.dataURL}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ImageUpload;
