"use client";
import React, { useState } from "react";
import TailWindModal from "../modal/TailWindModal";
import Image from "next/image";

const ImageCarousel = (postImages: any) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [viewImage, setViewImage] = useState("");

  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide
      ? postImages.postImages.length - 1
      : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const nextSlide = () => {
    const isLastSlide = currentIndex === postImages.postImages.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  const goToSlide = (slideIndex: number) => {
    setCurrentIndex(slideIndex);
  };

  const handleModalView = (image: string) => {
    setViewImage(image);
    setShowModal(true);
  };
  return (
    <div className="max-w-[1400px] sm:max-w-[768px] lg:max-w-[1400px] w-full h-full m-auto pt-3 relative group">
      <div
        style={{
          backgroundImage: `url(${postImages.postImages[currentIndex].dataURL})`,
        }}
        className="h-[175px] sm:h-[175px] lg:h-[580px] rounded-2xl bg-center bg-cover duration-500"
        onClick={() =>
          handleModalView(postImages.postImages[currentIndex].dataURL)
        }
      ></div>

      {/* Left Arrow */}
      {postImages.postImages.length > 1 ? (
        <div className="absolute top-[50%] -translate-x-0 translate-y-[-50%] left-2 text-2xl rounded-full p-2 text-white cursor-pointer">
          <span
            onClick={prevSlide}
            className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none"
          >
            <svg
              className="w-4 h-4 text-white dark:text-gray-800"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 6 10"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 1 1 5l4 4"
              />
            </svg>
            <span className="sr-only">Previous</span>
          </span>
        </div>
      ) : null}

      {/* Right Arrow */}
      {postImages.postImages.length > 1 ? (
        <div className="absolute top-[50%] -translate-x-0 translate-y-[-50%] right-2 text-2xl rounded-full p-2 text-white cursor-pointer">
          <span
            onClick={nextSlide}
            className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none"
          >
            <svg
              className="w-4 h-4 text-white dark:text-gray-800"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 6 10"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 9 4-4-4-4"
              />
            </svg>
            <span className="sr-only">Next</span>
          </span>
        </div>
      ) : null}

      {/* Bottom carousel image navigation */}
      {postImages.postImages.length > 1 ? (
        <div className="flex top-4 justify-center">
          {postImages.postImages.map((slide: any, slideIndex: number) => (
            <div
              key={slideIndex}
              onClick={() => goToSlide(slideIndex)}
              className="text-2xl cursor-pointer mx-1 mt-1"
            >
              {/* <button
                type="button"
                className="w-3 h-3 rounded-full text-light-1"
              >
                _
              </button> */}
              <svg height="10" width="10">
                <circle
                  cx="5"
                  cy="5"
                  r="4"
                  fill={currentIndex === slideIndex ? "white" : "gray"}
                />
                Sorry, your browser does not support inline SVG.
              </svg>
            </div>
          ))}
        </div>
      ) : null}
      <TailWindModal
        showModal={showModal}
        setShowModal={setShowModal}
        image={viewImage}
      />
    </div>
  );
};

export default ImageCarousel;
