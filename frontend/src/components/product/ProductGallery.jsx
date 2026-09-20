'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ArrowLeft, ArrowRight } from 'lucide-react';

function getSinglePouchImage(url) {
  if (!url) return '/images/products/chicken-harvest-front.jpg';
  return url;
}

export default function ProductGallery({ images, productName }) {
  const [activeIndex, setActiveIndex] = useState(0);

  if (!images || images.length === 0) {
    return (
      <div className="w-full aspect-square bg-[#fbf8f2] rounded-2xl flex items-center justify-center text-plum-900/20 border border-plum-900/10 shadow-xs">
        <svg className="w-20 h-20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={0.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      </div>
    );
  }

  const activeImgUrl = getSinglePouchImage(images[activeIndex]?.url);

  return (
    <div className="space-y-2.5 sm:space-y-3 w-full min-w-0">
      {/* Main image — Compact ratio on mobile so title and details remain visible above fold */}
      <div className="w-full aspect-[4/3] sm:aspect-square max-h-[235px] sm:max-h-[440px] bg-[#fbf8f2] rounded-2xl overflow-hidden border border-plum-900/10 shadow-xs relative p-2.5 sm:p-5 flex items-center justify-center">
        <Image
          src={activeImgUrl}
          alt={images[activeIndex]?.altText || productName}
          fill
          priority
          className="object-contain p-2 sm:p-4 transition-all duration-300"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 520px"
        />
      </div>

      {/* Carousel Controls: Arrows + Dots Indicator */}
      <div className="flex items-center justify-between px-1">
        <button
          type="button"
          onClick={() => setActiveIndex((prev) => (images.length <= 1 ? 0 : prev === 0 ? images.length - 1 : prev - 1))}
          className="w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-plum-900/70 hover:text-plum-900 hover:bg-plum-900/5 transition-colors cursor-pointer"
          aria-label="Previous image"
        >
          <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>

        {/* Dots Indicator */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {(images.length > 1 ? images : [0, 1, 2, 3, 4, 5, 6]).slice(0, 7).map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => images.length > 1 && setActiveIndex(i % images.length)}
              className={`transition-all duration-300 rounded-full cursor-pointer ${
                i === (images.length > 1 ? activeIndex : 0)
                  ? 'w-4 h-1.5 sm:w-5 sm:h-2 bg-plum-900'
                  : 'w-1.5 h-1.5 sm:w-2 sm:h-2 bg-plum-900/25 hover:bg-plum-900/40'
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>

        <button
          type="button"
          onClick={() => setActiveIndex((prev) => (images.length <= 1 ? 0 : prev === images.length - 1 ? 0 : prev + 1))}
          className="w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-plum-900/70 hover:text-plum-900 hover:bg-plum-900/5 transition-colors cursor-pointer"
          aria-label="Next image"
        >
          <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>
      </div>

      {/* Thumbnails on larger screens */}
      {images.length > 1 && (
        <div className="hidden sm:flex gap-2 overflow-x-auto pb-1 w-full justify-center">
          {images.map((img, i) => {
            const thumbUrl = getSinglePouchImage(img.url);
            return (
              <button
                key={i}
                onClick={() => setActiveIndex(i)}
                className={`flex-shrink-0 w-14 h-14 rounded-xl overflow-hidden border-2 transition-all ${
                  i === activeIndex
                    ? 'border-plum-900 ring-1 ring-plum-900/20 shadow-xs'
                    : 'border-plum-900/10 hover:border-plum-900/30 opacity-70 hover:opacity-100'
                }`}
                aria-label={`View image ${i + 1}`}
              >
                <div className="relative w-full h-full bg-[#fbf8f2]">
                  <Image
                    src={thumbUrl}
                    alt={img.altText || productName}
                    fill
                    className="object-contain p-1"
                    sizes="56px"
                  />
                </div>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
