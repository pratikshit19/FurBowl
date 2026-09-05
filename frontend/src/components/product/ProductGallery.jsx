'use client';

import { useState } from 'react';
import Image from 'next/image';

function getSinglePouchImage(url) {
  if (!url) return '/images/products/only-chicken-rice-front.jpg';
  if (url.includes('only-')) return url;
  if (url.includes('chicken-rice')) return '/images/products/only-chicken-rice-front.jpg';
  if (url.includes('chicken-broth')) return '/images/products/only-chicken-broth-front.jpg';
  if (url.includes('paneer-medley')) return '/images/products/only-paneer-medley-front.jpg';
  if (url.includes('lamb-lentils')) return '/images/products/only-lamb-lentils-front.jpg';
  if (url.includes('egg-superfood')) return '/images/products/only-egg-superfood-front.jpg';
  return url;
}

export default function ProductGallery({ images, productName }) {
  const [activeIndex, setActiveIndex] = useState(0);

  if (!images || images.length === 0) {
    return (
      <div className="aspect-square bg-white rounded-3xl flex items-center justify-center text-plum-900/20 border border-plum-900/5 shadow-sm">
        <svg className="w-24 h-24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={0.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      </div>
    );
  }

  const activeImgUrl = getSinglePouchImage(images[activeIndex]?.url);

  return (
    <div className="space-y-4">
      {/* Main image */}
      <div className="aspect-square bg-white rounded-3xl overflow-hidden border border-plum-900/5 shadow-sm relative p-4 md:p-6 flex items-center justify-center">
        <Image
          src={activeImgUrl}
          alt={images[activeIndex]?.altText || productName}
          fill
          priority
          className="object-contain p-4 md:p-6 transition-all duration-300 hover:scale-105"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>

      {/* Thumbnails — only show if multiple images */}
      {images.length > 1 && (
        <div className="flex gap-3 overflow-x-auto pb-1">
          {images.map((img, i) => {
            const thumbUrl = getSinglePouchImage(img.url);
            return (
              <button
                key={i}
                onClick={() => setActiveIndex(i)}
                className={`flex-shrink-0 w-16 h-16 rounded-2xl overflow-hidden border-2 transition-all ${
                  i === activeIndex
                    ? 'border-coral-500 ring-2 ring-coral-500/20 shadow-sm scale-105'
                    : 'border-plum-900/10 hover:border-plum-900/20 opacity-70 hover:opacity-100'
                }`}
                aria-label={`View image ${i + 1}`}
              >
                <div className="relative w-full h-full bg-white">
                  <Image
                    src={thumbUrl}
                    alt={img.altText || productName}
                    fill
                    className="object-contain p-1.5"
                    sizes="64px"
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
