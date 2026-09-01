import Link from 'next/link';
import Image from 'next/image';

export default function AboutSection() {
  return (
    <section className="section-padding bg-offwhite" aria-labelledby="about-heading">
      <div className="container-main">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* Left — Visual Photo + Quote */}
          <div className="order-2 lg:order-1">
            <div className="relative">
              {/* Photo Showcase */}
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-lg border border-gray-100">
                <Image
                  src="/images/home/about-dog-parent.png"
                  alt="Dog owner hugging happy dog"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 500px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-gray-900/20 to-transparent flex items-end p-6">
                  <blockquote className="text-white text-base md:text-lg font-medium leading-snug drop-shadow">
                    "We couldn't find dog food we trusted. So we made our own — food we'd be comfortable eating ourselves."
                    <span className="block text-turquoise-300 text-xs font-semibold mt-2">— The FurBowl Family</span>
                  </blockquote>
                </div>
              </div>

              {/* Floating stats */}
              <div className="mt-4 grid grid-cols-3 gap-3">
                {[
                  { value: '5+', label: 'Recipes' },
                  { value: '100%', label: 'Real Food' },
                  { value: '0', label: 'Preservatives' },
                ].map((stat) => (
                  <div key={stat.label} className="bg-white rounded-xl p-4 text-center border border-gray-100 shadow-sm">
                    <div className="text-2xl font-extrabold text-turquoise-600">{stat.value}</div>
                    <div className="text-xs text-gray-500 font-medium mt-0.5">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right — Text */}
          <div className="order-1 lg:order-2">
            <span className="text-turquoise-600 text-xs font-bold uppercase tracking-widest bg-turquoise-50 px-3 py-1 rounded-full inline-block mb-3">
              About FurBowl
            </span>
            <h2 id="about-heading" className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-6 leading-tight">
              Made with Love.<br />For the One Who Loves You Unconditionally.
            </h2>
            <div className="space-y-4 text-gray-600 leading-relaxed text-base">
              <p>
                FurBowl was born from a simple belief: dogs deserve better than processed food filled with mystery ingredients. We set out to create fresh, whole-food meals that dogs genuinely love — and that owners can feel good about serving.
              </p>
              <p>
                Every recipe we create starts with a single question: would we eat it? If the answer isn't a confident yes, it doesn't go in the bowl. Our ingredients are sourced fresh, our meals are cooked carefully, and the result is food your dog can truly thrive on.
              </p>
            </div>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/about"
                className="inline-flex items-center gap-2 bg-turquoise-600 text-white px-7 py-3.5 rounded-full text-sm font-semibold hover:bg-turquoise-700 transition-colors shadow-sm"
              >
                Our Full Story
              </Link>
              <Link
                href="/why-furbowl"
                className="inline-flex items-center gap-2 border border-gray-300 text-gray-700 px-7 py-3.5 rounded-full text-sm font-medium hover:border-turquoise-600 hover:text-turquoise-600 transition-colors"
              >
                Why FurBowl
              </Link>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
