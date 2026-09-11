'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, ShoppingBag, Check } from 'lucide-react';
import { MOCKUP_RECIPES } from '@/lib/constants';
import useCartStore from '@/store/cartStore';
import ScrollReveal from '@/components/common/ScrollReveal';

const FILTER_TAGS = ['All Meals', 'Chicken', 'Vegetarian', 'Lamb', 'Bone Broth'];

export default function MenuSection() {
  const [activeFilter, setActiveFilter] = useState('All Meals');
  const [addedSlug, setAddedSlug] = useState(null);
  const addItem = useCartStore((state) => state.addItem);

  const filteredRecipes = MOCKUP_RECIPES.filter((recipe) => {
    if (activeFilter === 'All Meals') return true;
    if (activeFilter === 'Chicken') return recipe.slug.includes('chicken');
    if (activeFilter === 'Vegetarian') return recipe.slug.includes('paneer') || recipe.slug.includes('egg');
    if (activeFilter === 'Lamb') return recipe.slug.includes('lamb');
    if (activeFilter === 'Bone Broth') return recipe.slug.includes('broth');
    return true;
  });

  const handleQuickAdd = (e, recipe) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(
      {
        id: recipe.id,
        name: recipe.name,
        slug: recipe.slug,
        isVeg: recipe.slug.includes('paneer') || recipe.slug.includes('egg'),
        images: [{ url: recipe.image, altText: recipe.name }],
      },
      {
        id: `variant-${recipe.id}`,
        mrp: recipe.price + 10,
        sellingPrice: recipe.price,
        size: recipe.weight,
      },
      1
    );
    setAddedSlug(recipe.slug);
    setTimeout(() => setAddedSlug(null), 1800);
  };

  return (
    <section id="menu-section" className="py-16 sm:py-24 bg-white border-b border-plum-900/5">
      <div className="container-main">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-10 sm:mb-12 gap-6">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <p className="text-xs sm:text-sm font-extrabold uppercase tracking-widest text-teal-600">
                Chef-Crafted Fresh Meals
              </p>
              <div className="hidden sm:flex items-center -space-x-2">
                <div className="w-6 h-6 rounded-full overflow-hidden border-2 border-white shadow-xs">
                  <Image src="/images/home/pack/luna.jpg" alt="Luna" width={24} height={24} className="object-cover" />
                </div>
                <div className="w-6 h-6 rounded-full overflow-hidden border-2 border-white shadow-xs">
                  <Image src="/images/home/pack/milo.jpg" alt="Milo" width={24} height={24} className="object-cover" />
                </div>
                <div className="w-6 h-6 rounded-full overflow-hidden border-2 border-white shadow-xs">
                  <Image src="/images/home/pack/oreo.jpg" alt="Oreo" width={24} height={24} className="object-cover" />
                </div>
                <div className="w-6 h-6 rounded-full overflow-hidden border-2 border-white shadow-xs">
                  <Image src="/images/home/pack/simba.jpg" alt="Simba" width={24} height={24} className="object-cover" />
                </div>
                <span className="text-[11px] font-bold text-plum-900/60 pl-3">
                  10,000+ Bowls Emptied
                </span>
              </div>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-plum-900 tracking-tight">
              Our Products &amp; Meals
            </h2>
            <p className="text-sm sm:text-base text-plum-900/70 font-normal mt-2 max-w-xl">
              100% human-grade, gently cooked recipes calibrated for every pup. Cut, open, and pour straight into the bowl.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-2">
            {FILTER_TAGS.map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => setActiveFilter(tag)}
                className={`text-xs font-bold px-3.5 py-1.5 rounded-full transition-all ${
                  activeFilter === tag
                    ? 'bg-teal-500 text-white shadow-xs'
                    : 'bg-[#faf6ed] text-plum-900/70 hover:bg-peach-50 hover:text-peach-700'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* 3x2 Grid of Recipe Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredRecipes.map((recipe, idx) => (
            <ScrollReveal key={recipe.id} delay={(idx % 3) * 80} className="h-full">
              <div
                className="group relative rounded-3xl p-6 sm:p-7 border-2 transition-all duration-300 flex flex-col justify-between hover:-translate-y-1.5 hover:shadow-xl bg-white h-full"
                style={{
                  backgroundColor: recipe.accentColor,
                  borderColor: recipe.borderColor,
                }}
              >
                {/* Card Top: Name, Badge & Tags */}
                <div>
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <Link href={`/shop/${recipe.slug}`} className="focus:outline-none">
                      <h3 className="text-xl sm:text-2xl font-black text-plum-900 hover:text-teal-600 transition-colors leading-tight">
                        {recipe.name}
                      </h3>
                    </Link>
                    <span
                      className="text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-full shrink-0 shadow-xs bg-white"
                      style={{ color: recipe.tagColor }}
                    >
                      {recipe.badge}
                    </span>
                  </div>

                  <p
                    className="text-xs font-bold mb-4 tracking-wide"
                    style={{ color: recipe.tagColor }}
                  >
                    {recipe.tags}
                  </p>
                </div>

                {/* Card Center: Product Pouch Image */}
                <Link href={`/shop/${recipe.slug}`} className="block focus:outline-none">
                  <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden my-3 flex items-center justify-center p-2 bg-white/80 backdrop-blur-xs border border-white/60 group-hover:bg-white transition-all shadow-inner">
                    <Image
                      src={recipe.image}
                      alt={recipe.name}
                      fill
                      className="object-contain p-2 transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                </Link>

                {/* Card Bottom: Price, Weight & Quick Add Button */}
                <div className="pt-3 border-t border-plum-900/10 flex items-center justify-between mt-2">
                  <div>
                    <span className="text-lg font-black text-plum-900">₹{recipe.price}</span>
                    <span className="text-[11px] text-plum-900/60 font-medium ml-1.5">/ {recipe.weight}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={(e) => handleQuickAdd(e, recipe)}
                      className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 shadow-xs ${
                        addedSlug === recipe.slug
                          ? 'bg-peach-500 text-white'
                          : 'bg-teal-500 hover:bg-teal-600 text-white'
                      }`}
                    >
                      {addedSlug === recipe.slug ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span>Added</span>
                        </>
                      ) : (
                        <>
                          <ShoppingBag className="w-3.5 h-3.5" />
                          <span>Add</span>
                        </>
                      )}
                    </button>

                    <Link
                      href={`/shop/${recipe.slug}`}
                      className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-plum-900 shadow-xs hover:bg-plum-900 hover:text-white transition-all"
                      aria-label={`View details of ${recipe.name}`}
                    >
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12 sm:mt-16">
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 bg-teal-500 hover:bg-teal-600 text-white font-bold text-sm sm:text-base px-8 py-3.5 rounded-full shadow-md hover:shadow-lg transition-all hover:-translate-y-0.5"
          >
            <span>View All 6 Recipes in Shop</span>
            <ArrowRight className="w-4 h-4 shrink-0" />
          </Link>
          <div className="text-xs text-plum-900/50 mt-2.5 font-medium">
            Mix and match available • Freshly sealed pouches delivered cold across India
          </div>
        </div>
      </div>
    </section>
  );
}
