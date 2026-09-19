'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, Check, ArrowRight } from 'lucide-react';
import useCartStore from '@/store/cartStore';

const BUNDLE_PRODUCTS = [
  {
    id: 'trial-pack-all-recipes',
    slug: 'all-recipes-trial-pack',
    title: 'All Recipes Dog Food Trial Pack',
    subtitle: '5 Flavours • 1 of Each Recipe',
    packOf: 'Pack of 5',
    packCount: 5,
    size: '5 x 100g',
    discount: '17% OFF',
    isSuperSaver: true,
    price: 499,
    originalPrice: 599,
    image: '/images/products/bundles/furbowl-bundle-all-three.jpg',
  },
  {
    id: 'trial-pack-chicken-lovers',
    slug: 'chicken-lovers-trial-pack',
    title: 'Chicken Dog Food Trial Pack',
    subtitle: '2 Chicken Veg + 2 Chicken Rice',
    packOf: 'Pack of 4',
    packCount: 4,
    size: '4 x 100g',
    discount: '17% OFF',
    isSuperSaver: false,
    price: 399,
    originalPrice: 479,
    image: '/images/products/bundles/furbowl-bundle-chicken.jpg',
  },
  {
    id: 'trial-pack-meat-lovers',
    slug: 'meat-lovers-trial-pack',
    title: 'Chicken & Lamb Dog Food Trial Pack',
    subtitle: '1 Chicken Veg + 1 Chicken Rice + 2 Lamb & Lentils',
    packOf: 'Pack of 4',
    packCount: 4,
    size: '4 x 100g',
    discount: '17% OFF',
    isSuperSaver: false,
    price: 429,
    originalPrice: 519,
    image: '/images/products/bundles/furbowl-bundle-lamb.jpg',
  },
  {
    id: 'trial-pack-paneer-greens',
    slug: 'paneer-vegetables',
    title: 'Paneer & Vegetables Dog Food Pack',
    subtitle: '100% vegetarian fresh protein bowl',
    packOf: 'Pack of 5',
    packCount: 5,
    size: '5 x 100g',
    discount: '17% OFF',
    isSuperSaver: false,
    price: 499,
    originalPrice: 599,
    image: '/images/products/bundles/furbowl-bundle-paneer.jpg',
  },
  {
    id: 'trial-pack-meat-veggie',
    slug: 'meat-veggie-variety-pack',
    title: 'Meat & Veggie Dog Food Variety Pack',
    subtitle: '2 Chicken Veg + 1 Chicken Rice + 1 Lamb + 1 Egg + 1 Paneer',
    packOf: 'Pack of 6',
    packCount: 6,
    size: '6 x 100g',
    discount: '17% OFF',
    isSuperSaver: false,
    price: 579,
    originalPrice: 699,
    image: '/images/products/bundles/furbowl-bundle-all-three.jpg',
  },
  {
    id: 'trial-pack-chicken-egg',
    slug: 'chicken-egg-trial-pack',
    title: 'Chicken & Egg Dog Food Trial Pack',
    subtitle: '1 Chicken Veg + 1 Chicken Rice + 2 Egg SuperFood',
    packOf: 'Pack of 4',
    packCount: 4,
    size: '4 x 100g',
    discount: '17% OFF',
    isSuperSaver: false,
    price: 399,
    originalPrice: 479,
    image: '/images/products/golden-egg-quinoa-front.jpg',
  },
  {
    id: 'starter-plan-pack-7',
    slug: 'all-recipes-7-pack',
    title: 'All Recipes Dog Food 7-Day Pack',
    subtitle: '1-Week Fresh Feeding Plan',
    packOf: 'Pack of 7',
    packCount: 7,
    size: '7 x 100g',
    discount: '20% OFF',
    isSuperSaver: true,
    price: 699,
    originalPrice: 875,
    image: '/images/products/bundles/furbowl-bundle-all-three.jpg',
  },
  {
    id: 'monthly-full-diet-pack-30',
    slug: 'all-recipes-monthly-pack',
    title: 'All Recipes Dog Food Monthly Pack',
    subtitle: 'Monthly full-diet subscription (Best Value)',
    packOf: 'Pack of 30',
    packCount: 30,
    size: '30 x 100g',
    discount: '25% OFF',
    isSuperSaver: true,
    price: 2699,
    originalPrice: 3599,
    image: '/images/products/bundles/furbowl-bundle-all-three.jpg',
  },
];

export default function MenuSection() {
  const [addedSlug, setAddedSlug] = useState(null);
  const scrollRef = useRef(null);
  const addItem = useCartStore((state) => state.addItem);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -340 : 340;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const handleQuickAdd = (e, item) => {
    e.preventDefault();
    e.stopPropagation();

    addItem(
      {
        id: item.id,
        name: item.title,
        slug: item.slug,
        isVeg: false,
        images: [{ url: item.image, altText: item.title }],
      },
      {
        id: `variant-${item.id}`,
        mrp: item.originalPrice,
        sellingPrice: item.price,
        size: item.size,
      },
      1
    );

    setAddedSlug(item.id);
    setTimeout(() => setAddedSlug(null), 1800);
  };

  return (
    <section id="menu-section" className="py-12 sm:py-16 bg-white border-b border-plum-900/5 relative">
      <div className="container-main max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 sm:mb-10 gap-4">
          <div>
            <div className="inline-flex items-center text-xs font-bold uppercase tracking-widest text-teal-700 bg-teal-50 px-3 py-1 rounded-full border border-teal-200/60 mb-2">
              <span>Multi-Packs &bull; Maximum Savings</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-plum-900 tracking-tight">
              Value Bundles &amp; Packs
            </h2>
          </div>

          <Link
            href="/shop?tab=multi-packs"
            className="text-xs sm:text-sm font-bold text-teal-700 hover:text-teal-800 flex items-center gap-1 transition-colors group"
          >
            <span>View All Bundles</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        {/* Carousel Slider with Side Arrows */}
        <div className="relative group/carousel">
          
          {/* Left Arrow Button */}
          <button
            type="button"
            onClick={() => scroll('left')}
            aria-label="Previous products"
            className="hidden sm:flex absolute -left-2 sm:-left-4 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-white border border-plum-900/10 shadow-md hover:shadow-lg items-center justify-center text-plum-900 hover:text-peach-600 hover:scale-105 active:scale-95 transition-all cursor-pointer"
          >
            <ChevronLeft className="w-5 h-5 stroke-[2.5]" />
          </button>

          {/* Right Arrow Button */}
          <button
            type="button"
            onClick={() => scroll('right')}
            aria-label="Next products"
            className="hidden sm:flex absolute -right-2 sm:-right-4 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-white border border-plum-900/10 shadow-md hover:shadow-lg items-center justify-center text-plum-900 hover:text-peach-600 hover:scale-105 active:scale-95 transition-all cursor-pointer"
          >
            <ChevronRight className="w-5 h-5 stroke-[2.5]" />
          </button>

          {/* Horizontal Scroll Track (Scrollbar hidden) */}
          <div
            ref={scrollRef}
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            className="flex gap-4 sm:gap-5 overflow-x-auto pb-4 pt-1 px-1 scroll-smooth no-scrollbar [&::-webkit-scrollbar]:hidden snap-x snap-mandatory"
          >
            {BUNDLE_PRODUCTS.map((item) => (
              <div
                key={item.id}
                className="w-[270px] sm:w-[280px] lg:w-[290px] shrink-0 snap-start rounded-lg bg-white border border-plum-900/10 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between overflow-hidden group"
              >
                {/* ─── Clickable Card Area (Pouch + Details) ─── */}
                <Link
                  href={`/shop/${item.slug}`}
                  className="flex-1 flex flex-col justify-between focus:outline-none group/link"
                >
                  {/* ─── Upper Image Area ─── */}
                  <div className="relative w-full h-[230px] sm:h-[245px] bg-[#faf6ed]/90 flex items-center justify-center overflow-hidden select-none border-b border-plum-900/5">
                    
                    {/* Top-Left Discount Badge — FurBowl Peach */}
                    <div className="absolute top-2.5 left-2.5 z-20">
                      <span className="text-[11px] font-bold tracking-wider text-white bg-peach-500 px-2.5 py-0.5 rounded-[3px] shadow-xs uppercase">
                        {item.discount}
                      </span>
                    </div>

                    {/* Top-Right SUPER SAVER Ribbon Badge — Amber Gold */}
                    {item.isSuperSaver && (
                      <div className="absolute top-0 right-3 z-20">
                        <div className="relative bg-amber-500 text-white text-[8.5px] font-bold uppercase tracking-wider px-2 pt-1.5 pb-2 shadow-xs text-center flex flex-col items-center leading-none">
                          <span>SUPER</span>
                          <span className="mt-0.5">•SAVER•</span>
                          {/* Ribbon notch cut-out */}
                          <div
                            className="absolute -bottom-1.5 left-0 right-0 h-1.5 bg-amber-500"
                            style={{ clipPath: 'polygon(0 0, 100% 0, 50% 100%)' }}
                          />
                        </div>
                      </div>
                    )}

                    {/* Stand-Up Retort Pouch Product Mockup */}
                    <div className="relative w-full h-full p-2.5 flex items-center justify-center">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        sizes="(max-width: 768px) 275px, 290px"
                        className="object-contain transition-transform duration-300 group-hover:scale-103"
                      />
                    </div>

                    {/* Bottom Center Pack Pill */}
                    <div className="absolute bottom-2.5 left-1/2 -translate-x-1/2 z-20 whitespace-nowrap">
                      <span className="text-xs font-bold text-plum-900 bg-white/95 backdrop-blur-xs px-3.5 py-0.5 rounded-full shadow-xs border border-plum-900/10">
                        {item.packOf}
                      </span>
                    </div>
                  </div>

                  {/* ─── Lower Details Area ─── */}
                  <div className="px-3.5 sm:px-4 pt-3 pb-1.5 flex flex-col justify-between flex-1 bg-white">
                    <div>
                      {/* Title */}
                      <h3 className="font-bold text-[14.5px] text-plum-900 group-hover/link:text-teal-600 transition-colors leading-snug line-clamp-1">
                        {item.title}
                      </h3>

                      {/* Subtitle */}
                      <p className="text-xs text-plum-900/60 font-medium mt-0.5 line-clamp-1">
                        {item.subtitle}
                      </p>

                      {/* Price */}
                      <div className="flex items-baseline gap-2 mt-1.5 mb-0.5">
                        <span className="text-base sm:text-lg font-normal text-plum-900">
                          ₹{item.price.toLocaleString('en-IN')}
                        </span>
                        <span className="text-xs text-plum-900/40 line-through">
                          ₹{item.originalPrice.toLocaleString('en-IN')}
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>

                {/* Add to Cart Button Footer — FurBowl Teal */}
                <div className="px-3.5 pb-2.5 sm:px-4 sm:pb-3 pt-0 bg-white">
                  <button
                    type="button"
                    onClick={(e) => handleQuickAdd(e, item)}
                    className={`w-full py-2.5 rounded text-sm font-bold transition-all shadow-xs flex items-center justify-center gap-1.5 cursor-pointer active:scale-98 ${
                      addedSlug === item.id
                        ? 'bg-emerald-600 text-white'
                        : 'bg-[#15aec0] hover:bg-[#0f8e9d] text-white shadow-sm'
                    }`}
                  >
                    {addedSlug === item.id ? (
                      <>
                        <Check className="w-4 h-4 stroke-[3]" />
                        <span>Added to Cart</span>
                      </>
                    ) : (
                      <span>Add to Cart</span>
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
