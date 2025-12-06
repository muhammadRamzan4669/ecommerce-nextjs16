"use client";

import { useState } from "react";
import Image from "next/image";

type ImageGalleryProps = {
  images: string[];
  productName: string;
};

export default function ImageGallery({ images, productName }: ImageGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  // Ensure we have at least one image
  const displayImages = images.length > 0 ? images : ["/images/placeholder.jpg"];

  return (
    <div className="flex flex-col-reverse lg:flex-row gap-3.5 lg:gap-[14px]">
      {/* Thumbnails */}
      <div className="flex flex-row lg:flex-col gap-3.5 lg:gap-[14px] overflow-x-auto lg:overflow-visible scrollbar-hide">
        {displayImages.slice(0, 4).map((image, index) => (
          <button
            key={index}
            onClick={() => setSelectedIndex(index)}
            className={`shrink-0 w-[111px] h-[106px] lg:w-[152px] lg:h-[167px] rounded-[20px] overflow-hidden bg-[#F0EEED] dark:bg-[#1F1F1F] border-2 transition-all ${
              index === selectedIndex
                ? "border-black dark:border-white"
                : "border-transparent hover:border-black/20 dark:hover:border-white/20"
            }`}
            aria-label={`View image ${index + 1}`}
            aria-current={index === selectedIndex ? "true" : undefined}
          >
            <Image
              src={image}
              alt={`${productName} view ${index + 1}`}
              width={152}
              height={167}
              className="w-full h-full object-cover"
              sizes="(max-width: 768px) 111px, 152px"
            />
          </button>
        ))}
      </div>

      {/* Main Image */}
      <div className="relative w-full lg:w-[444px] h-[290px] lg:h-[530px] rounded-[20px] overflow-hidden bg-[#F0EEED] dark:bg-[#1F1F1F]">
        <Image
          src={displayImages[selectedIndex]}
          alt={productName}
          width={444}
          height={530}
          className="w-full h-full object-cover transition-opacity duration-300"
          priority
          sizes="(max-width: 768px) 100vw, 444px"
        />

        {/* Image Navigation Dots (Mobile) */}
        {displayImages.length > 1 && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 lg:hidden">
            {displayImages.slice(0, 4).map((_, index) => (
              <button
                key={index}
                onClick={() => setSelectedIndex(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === selectedIndex
                    ? "bg-black dark:bg-white w-6"
                    : "bg-black/30 dark:bg-white/30"
                }`}
                aria-label={`Go to image ${index + 1}`}
              />
            ))}
          </div>
        )}

        {/* Navigation Arrows (Desktop) */}
        {displayImages.length > 1 && (
          <>
            <button
              onClick={() =>
                setSelectedIndex((prev) =>
                  prev === 0 ? displayImages.length - 1 : prev - 1
                )
              }
              className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 dark:bg-black/80 rounded-full items-center justify-center hover:bg-white dark:hover:bg-black transition-colors hidden lg:flex"
              aria-label="Previous image"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>
            <button
              onClick={() =>
                setSelectedIndex((prev) =>
                  prev === displayImages.length - 1 ? 0 : prev + 1
                )
              }
              className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 dark:bg-black/80 rounded-full items-center justify-center hover:bg-white dark:hover:bg-black transition-colors hidden lg:flex"
              aria-label="Next image"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          </>
        )}
      </div>
    </div>
  );
}
