"use client";

import React, { useState } from "react";

const ImageCarousel = ({ images }: any) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [startX, setStartX] = useState<number | null>(null);

  const handleTouchStart: React.TouchEventHandler<HTMLDivElement> = (e) => {
    setStartX(e.touches[0].clientX);
  };

  const handleTouchMove: React.TouchEventHandler<HTMLDivElement> = (e) => {
    if (!startX) return;

    const currentX = e.touches[0].clientX;
    const difference = startX - currentX;

    if (difference > 50) {
      // Swipe right (previous slide)
      nextSlide();
    } else if (difference < -50) {
      // Swipe left (next slide)
      prevSlide();
    }

    setStartX(null);
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  return (
    <div
      className="relative overflow-hidden w-full"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
    >
      <div
        className="flex transition-transform"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {images.map((image: any, index: number) => (
          <img
            key={index}
            src={image.dataURL}
            alt={`slide ${index + 1}`}
            className="w-full max-h-screen object-contain"
          />
        ))}
      </div>
      {images.length > 1 ? (
        <div className="absolute top-[50%] -translate-x-0 translate-y-[-50%] left-5 text-2xl rounded-full p-2 text-white cursor-pointer">
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
      {images.length > 1 ? (
        <div className="absolute top-[50%] -translate-x-0 translate-y-[-50%] right-5 text-2xl rounded-full p-2 text-white cursor-pointer">
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
    </div>
  );
};

export default ImageCarousel;
