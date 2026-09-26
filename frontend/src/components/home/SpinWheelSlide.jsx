'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Gift, RotateCcw, Check, Copy, ArrowRight, Tag, ShieldCheck, X, PartyPopper } from 'lucide-react';
import useCartStore from '@/store/cartStore';

const OFFERS = [
  { label: '10% OFF', code: 'FUR10', type: 'PERCENTAGE', value: 10 },
  { label: '15% OFF', code: 'FUR15', type: 'PERCENTAGE', value: 15 },
  { label: '20% OFF', code: 'FUR20', type: 'PERCENTAGE', value: 20 },
  { label: '25% OFF', code: 'FUR25', type: 'PERCENTAGE', value: 25 },
  { label: '5% OFF', code: 'FUR5', type: 'PERCENTAGE', value: 5 },
  { label: 'FREE SHIPPING', code: 'FREESHIP', type: 'FLAT', value: 49 },
];

export default function SpinWheelSlide({ onSpinStateChange }) {
  const [rotation, setRotation] = useState(0);
  const [spinning, setSpinning] = useState(false);
  const [wonOffer, setWonOffer] = useState(null);
  const [copied, setCopied] = useState(false);
  const [applied, setApplied] = useState(false);
  const currentRotationRef = useRef(0);

  const { setCoupon } = useCartStore();

  const spinWheel = (e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    if (spinning) return;

    setSpinning(true);
    setWonOffer(null);
    setCopied(false);
    setApplied(false);
    if (onSpinStateChange) onSpinStateChange(true);

    const weights = [1, 2, 2, 3, 1, 1];
    const totalWeight = weights.reduce((a, b) => a + b, 0);
    let randomNum = Math.random() * totalWeight;
    let targetIndex = 0;

    for (let i = 0; i < weights.length; i++) {
      if (randomNum < weights[i]) {
        targetIndex = i;
        break;
      }
      randomNum -= weights[i];
    }

    const chosen = OFFERS[targetIndex];

    const targetAngle = (360 - targetIndex * 60) % 360;
    const current = currentRotationRef.current;
    const currentNormalized = current % 360;
    let delta = targetAngle - currentNormalized;

    if (delta <= 0) delta += 360;

    const totalSpins = 360 * 5;
    const nextRotation = current + totalSpins + delta;

    currentRotationRef.current = nextRotation;
    setRotation(nextRotation);

    setTimeout(() => {
      setSpinning(false);
      setWonOffer(chosen);
      if (onSpinStateChange) onSpinStateChange(false);
    }, 4500);
  };

  const handleCopyCode = () => {
    if (!wonOffer) return;
    navigator.clipboard.writeText(wonOffer.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleApplyToCart = () => {
    if (!wonOffer) return;
    setCoupon({
      code: wonOffer.code,
      type: wonOffer.type,
      value: wonOffer.value,
    });
    setApplied(true);
    setTimeout(() => setApplied(false), 3000);
  };

  return (
    <div className="relative w-full h-full overflow-hidden select-none bg-[#fdf3e2] flex items-center">
      {/* ─── 1. SEAMLESS STUDIO BACKDROP (BACKGROUND LAYER, Z-0) ─── */}
      <div className="absolute inset-0 z-0 pointer-events-none select-none">
        {/* Desktop 3:1 Studio Backdrop */}
        <Image
          src="/images/furbowl_studio_backdrop_3to1.png"
          alt="FurBowl Studio Backdrop"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center hidden md:block"
        />
        {/* Mobile 16:9 Studio Backdrop */}
        <Image
          src="/images/furbowl_studio_backdrop_mobile.png"
          alt="FurBowl Studio Backdrop"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center md:hidden"
        />
      </div>

      {/* ─── 2. INTERACTIVE SPINNING WHEEL (BEHIND THE DOG IMAGE, Z-10) ─── */}
      <div
        className="absolute z-10 pointer-events-auto aspect-square -translate-x-1/2 -translate-y-1/2 left-[76%] sm:left-[79%] md:left-[82.5%] top-[43%] sm:top-[40%] md:top-[38%] h-[68%] sm:h-[65%] md:h-[63%]"
      >
        <div className="relative w-full h-full flex items-center justify-center">
          {/* Wheel 3D Stand Foot behind wheel */}
          <div
            className="absolute bottom-[-14%] left-1/2 -translate-x-1/2 w-[30%] h-[18%] bg-[#31102f] rounded-b-xl shadow-lg border border-[#31102f]/80 pointer-events-none z-0"
            style={{
              clipPath: 'polygon(15% 0%, 85% 0%, 100% 100%, 0% 100%)',
            }}
          />

          {/* Outer Plum Rim with Crisp White Bevel */}
          <div className="absolute inset-0 rounded-full bg-[#31102f] shadow-[0_12px_32px_rgba(49,16,47,0.3)] pointer-events-none z-5 border-[4px] border-white/95 ring-1 ring-black/10" />

          {/* Thin inner cream ring */}
          <div className="absolute inset-[1.6%] rounded-full bg-[#fffaf0] pointer-events-none z-6" />

          {/* Top Pointer Pin (Plum with white core at 12 o'clock) */}
          <div
            className="absolute -top-[11%] left-1/2 -translate-x-1/2 z-35 pointer-events-none drop-shadow-md origin-bottom transition-transform duration-150"
            style={{
              width: '11.5%',
              transform: `translateX(-50%) ${spinning ? 'rotate(-6deg)' : 'rotate(0deg)'}`,
            }}
          >
            <svg viewBox="0 0 40 54" fill="none" className="w-full h-auto">
              <path
                d="M20 52 C20 52, 38 31, 38 19 C38 8.5 29.9 0 20 0 C10.1 0 2 8.5 2 19 C2 31, 20 52, 20 52 Z"
                fill="#31102f"
                stroke="#ffffff"
                strokeWidth="3.5"
                strokeLinejoin="round"
              />
              <circle cx="20" cy="19" r="6.5" fill="#ffffff" />
            </svg>
          </div>

          {/* Rotating Wheel Body */}
          <div
            className="w-[96%] h-[96%] rounded-full overflow-hidden cursor-pointer relative z-10 shadow-inner"
            onClick={spinWheel}
            suppressHydrationWarning
            style={{
              transform: `rotate(${rotation}deg)`,
              transformOrigin: '50% 50%',
              transition: spinning ? 'transform 4500ms cubic-bezier(0.17, 0.97, 0.25, 1)' : 'none',
            }}
          >
            <svg viewBox="0 0 400 400" className="w-full h-full block" suppressHydrationWarning>
              <defs>
                <linearGradient id="svgSliceTeal" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#15aec0" />
                  <stop offset="100%" stopColor="#0f8e9d" />
                </linearGradient>
                <linearGradient id="svgSliceCoral" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#ff7a63" />
                  <stop offset="100%" stopColor="#ff6547" />
                </linearGradient>
                <linearGradient id="svgSliceYellow" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#fff2b9" />
                  <stop offset="100%" stopColor="#f7d96f" />
                </linearGradient>
              </defs>

              {/* 6 Slices matching the reference image */}
              {OFFERS.map((offer, i) => {
                const cx = 200;
                const cy = 200;
                const r = 200;
                const round = (val) => Math.round(val * 100) / 100;
                const midDeg = i * 60;
                const midRad = ((midDeg - 90) * Math.PI) / 180;
                const startDeg = midDeg - 30;
                const endDeg = midDeg + 30;
                const startRad = ((startDeg - 90) * Math.PI) / 180;
                const endRad = ((endDeg - 90) * Math.PI) / 180;

                const x1 = round(cx + r * Math.cos(startRad));
                const y1 = round(cy + r * Math.sin(startRad));
                const x2 = round(cx + r * Math.cos(endRad));
                const y2 = round(cy + r * Math.sin(endRad));

                const textR = r * 0.63;
                const textX = round(cx + textR * Math.cos(midRad));
                const textY = round(cy + textR * Math.sin(midRad));
                const needsFlip = midDeg > 90 && midDeg < 270;
                const textRotation = needsFlip ? midDeg + 180 : midDeg;
                const lines = offer.label.includes(' ') ? offer.label.split(' ') : [offer.label];

                // Slices order: Teal, Coral, Yellow, Teal, Coral, Yellow
                const fill =
                  i === 0 || i === 3
                    ? 'url(#svgSliceTeal)'
                    : i === 1 || i === 4
                      ? 'url(#svgSliceCoral)'
                      : 'url(#svgSliceYellow)';

                const textFill = i === 2 || i === 5 ? '#31102f' : '#ffffff';

                return (
                  <g key={i}>
                    <path
                      d={`M ${cx} ${cy} L ${x1} ${y1} A ${r} ${r} 0 0 1 ${x2} ${y2} Z`}
                      fill={fill}
                      stroke="#fffaf0"
                      strokeWidth="3"
                      suppressHydrationWarning
                    />
                    {lines.length === 1 ? (
                      <text
                        x={textX}
                        y={textY}
                        fill={textFill}
                        fontSize="25"
                        fontWeight="900"
                        fontFamily="inherit"
                        textAnchor="middle"
                        dominantBaseline="middle"
                        transform={`rotate(${textRotation}, ${textX}, ${textY})`}
                        style={{ letterSpacing: '0.03em' }}
                      >
                        {lines[0]}
                      </text>
                    ) : (
                      <text
                        fill={textFill}
                        fontSize={offer.label === 'FREE SHIPPING' ? '18' : '22'}
                        fontWeight="900"
                        fontFamily="inherit"
                        textAnchor="middle"
                        dominantBaseline="middle"
                        transform={`rotate(${textRotation}, ${textX}, ${textY})`}
                        style={{ letterSpacing: '0.03em' }}
                      >
                        <tspan x={textX} y={textY - 12}>{lines[0]}</tspan>
                        <tspan x={textX} y={textY + 13}>{lines.slice(1).join(' ')}</tspan>
                      </text>
                    )}
                  </g>
                );
              })}

              {/* Dividing White Spokes */}
              {OFFERS.map((_, i) => {
                const startDeg = i * 60 - 30;
                const startRad = ((startDeg - 90) * Math.PI) / 180;
                const x = 200 + 200 * Math.cos(startRad);
                const y = 200 + 200 * Math.sin(startRad);
                return (
                  <line
                    key={`spoke-${i}`}
                    x1="200"
                    y1="200"
                    x2={x}
                    y2={y}
                    stroke="#fffaf0"
                    strokeWidth="3.5"
                  />
                );
              })}
            </svg>
          </div>

          {/* 3D Center Hub "SPIN" Button */}
          <button
            type="button"
            onClick={spinWheel}
            disabled={spinning}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 rounded-full border-[3.5px] border-white shadow-xl hover:scale-105 active:scale-95 transition-transform flex items-center justify-center text-white font-extrabold uppercase tracking-wider cursor-pointer"
            style={{
              width: '28%',
              height: '28%',
              background: '#31102f',
              boxShadow: '0 5px 15px rgba(49,16,47,0.35), inset 0 2px 4px rgba(255,255,255,0.2)',
            }}
            title="Click to Spin!"
          >
            <span className="text-[10px] sm:text-xs md:text-sm font-black tracking-wider drop-shadow-sm">
              SPIN
            </span>
          </button>
        </div>
      </div>

      {/* ─── 3. USER SUPPLIED ASSET: DOG + BOWL + INGREDIENTS (IN FRONT OF WHEEL, Z-20) ─── */}
      <div className="absolute right-[-6%] sm:right-[0%] md:right-[2%] bottom-0 h-[86%] sm:h-[92%] md:h-[98%] aspect-[1774/887] pointer-events-none z-20">
        <Image
          src="/images/border_collie_spin.png"
          alt="Happy smiling dog with FurBowl fresh dog food bowl, chicken, carrots, and sweet potato"
          fill
          priority
          sizes="(max-width: 768px) 95vw, 68vw"
          className="object-contain object-bottom drop-shadow-sm"
        />
      </div>


      {/* ─── 5. PURE LIVE HTML & CSS TYPOGRAPHY, BUTTONS & VALUE PROPS (LEFT COLUMN, Z-30) ─── */}
      <div className="relative z-30 w-full h-full flex items-center pointer-events-none px-3 sm:px-6 md:px-12 lg:px-[5.5%]">
        <div className="w-full max-w-[48%] sm:max-w-[45%] md:max-w-[43%] lg:max-w-[41%] flex flex-col items-start pointer-events-auto -translate-y-[1%] sm:-translate-y-[2%]">
          {/* Pill Badge */}
          <div className="inline-flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-0.5 sm:py-1 rounded-full bg-teal-50 border border-teal-300/40 text-teal-700 text-[8px] sm:text-xs font-bold uppercase tracking-wider mb-1 sm:mb-2 md:mb-3 shadow-xs">
            <Tag className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5" />
            <span>EXCLUSIVE OFFER</span>
          </div>

          {/* Headline: Spin to Save! */}
          <h2 className="text-xl sm:text-3xl md:text-[2.75rem] lg:text-[3.35rem] xl:text-[3.7rem] font-black text-[#31102f] leading-[0.95] tracking-tight">
            Spin to Save!
          </h2>

          {/* Subheading: Up to 25% OFF */}
          <div className="flex items-center gap-1.5 sm:gap-2 mt-0.5 sm:mt-1.5 md:mt-2">
            <span className="text-sm sm:text-xl md:text-[2.05rem] lg:text-[2.6rem] font-black text-[#31102f] uppercase tracking-tight leading-none">
              Up to <span className="text-[#f26a4f]">25% OFF</span>
            </span>
            <div className="flex flex-col gap-0.5 sm:gap-1 items-start ml-0.5">
              <span className="w-2.5 sm:w-4 h-0.5 sm:h-1 bg-[#f26a4f] rounded-full rotate-[20deg]" />
              <span className="w-1.5 sm:w-3 h-0.5 sm:h-1 bg-[#f26a4f] rounded-full -rotate-[20deg]" />
            </div>
          </div>

          {/* Description Paragraph */}
          <p className="text-[9px] sm:text-xs md:text-sm lg:text-[0.95rem] text-[#31102f]/80 font-medium mt-1 sm:mt-2 md:mt-3 leading-tight sm:leading-snug max-w-sm md:max-w-md">
            Every spin wins! Unlock exclusive discounts & free shipping.
          </p>

          {/* CTA Button & 100% Win Guarantee */}
          <div className="mt-2 sm:mt-3 md:mt-4 flex flex-col sm:flex-row items-start sm:items-center gap-1.5 sm:gap-2.5 md:gap-3.5">
            <button
              type="button"
              onClick={spinWheel}
              disabled={spinning}
              className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-5 md:px-7 py-1.5 sm:py-2.5 md:py-3.5 rounded-none bg-teal-600 hover:bg-teal-700 active:scale-95 text-white font-extrabold text-[9px] sm:text-xs md:text-sm uppercase tracking-wider transition-all shadow-md sm:shadow-lg shadow-teal-600/30 hover:shadow-xl hover:shadow-teal-600/40 cursor-pointer disabled:opacity-80"
              aria-label="Spin the wheel"
            >
              {spinning ? (
                <>
                  <RotateCcw className="w-3 h-3 sm:w-4 sm:h-4 animate-spin" />
                  <span>Spinning…</span>
                </>
              ) : (
                <>
                  <Gift className="w-3 h-3 sm:w-4 sm:h-4" />
                  <span>SPIN THE WHEEL</span>
                  <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4" />
                </>
              )}
            </button>

            <div className="inline-flex items-center gap-1 sm:gap-1.5 text-[8.5px] sm:text-xs font-bold text-[#31102f]/80">
              <ShieldCheck className="w-3 h-3 sm:w-4 sm:h-4 text-teal-600" />
              <span>100% Win Guarantee</span>
            </div>
          </div>

          {/* 4 Feature Badges row matching the reference image */}
          <div className="hidden md:grid mt-4 sm:mt-6 w-full grid-cols-4 gap-2 sm:gap-3">
            {/* 1. Human Grade Ingredients */}
            <div className="flex flex-col items-center text-center gap-1">
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#dff4d8] flex items-center justify-center shadow-xs">
                <svg viewBox="0 0 24 24" className="w-4 h-4 sm:w-5 sm:h-5 text-[#42a85f]" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 4c-8 .5-13 4-13 10 0 3 2 5 5 5 6 0 9-6 8-15Z" />
                  <path d="M4 21c2-5 6-8 11-10" />
                </svg>
              </div>
              <span className="text-[8px] sm:text-[9.5px] font-bold leading-tight text-[#31102f]">
                Human Grade<br />Ingredients
              </span>
            </div>

            {/* 2. Vet Approved Nutrition */}
            <div className="flex flex-col items-center text-center gap-1">
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#fff0c9] flex items-center justify-center shadow-xs">
                <svg viewBox="0 0 24 24" className="w-4 h-4 sm:w-5 sm:h-5 text-[#eea52b]" fill="currentColor">
                  <circle cx="8" cy="7" r="2.2" />
                  <circle cx="16" cy="7" r="2.2" />
                  <circle cx="5" cy="12" r="1.8" />
                  <circle cx="19" cy="12" r="1.8" />
                  <path d="M12 10c-3 0-5 2-5 5 0 2 2 3 5 3s5-1 5-3c0-3-2-5-5-5Z" />
                </svg>
              </div>
              <span className="text-[8px] sm:text-[9.5px] font-bold leading-tight text-[#31102f]">
                Vet Approved<br />Nutrition
              </span>
            </div>

            {/* 3. Free Shipping Above ₹499 */}
            <div className="flex flex-col items-center text-center gap-1">
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#dff4d8] flex items-center justify-center shadow-xs">
                <svg viewBox="0 0 24 24" className="w-4 h-4 sm:w-5 sm:h-5 text-teal-600" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 7h11v10H3zM14 10h4l3 3v4h-7z" />
                  <circle cx="7" cy="19" r="1.5" />
                  <circle cx="18" cy="19" r="1.5" />
                </svg>
              </div>
              <span className="text-[8px] sm:text-[9.5px] font-bold leading-tight text-[#31102f]">
                Free Shipping<br />Above ₹499
              </span>
            </div>

            {/* 4. Happier, Healthier Dogs */}
            <div className="flex flex-col items-center text-center gap-1">
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#ffe1d9] flex items-center justify-center shadow-xs">
                <svg viewBox="0 0 24 24" className="w-4 h-4 sm:w-5 sm:h-5 text-[#ff6e54]" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20.8 8.9c0 5.5-8.8 10.1-8.8 10.1S3.2 14.4 3.2 8.9A4.7 4.7 0 0 1 12 6.7a4.7 4.7 0 0 1 8.8 2.2Z" />
                </svg>
              </div>
              <span className="text-[8px] sm:text-[9.5px] font-bold leading-tight text-[#31102f]">
                Happier,<br />Healthier Dogs
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ─── 6. WINNING CELEBRATION MODAL (Z-100) ─── */}
      {wonOffer && (
        <div className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-300 pointer-events-auto">
          <div className="relative bg-white rounded-2xl p-5 sm:p-7 md:p-8 max-w-sm sm:max-w-md w-full shadow-2xl border-2 border-teal-500 text-center animate-in zoom-in-95 duration-300 max-h-[90vh] overflow-y-auto">
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setWonOffer(null)}
              className="absolute top-3 right-3 p-1 rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors cursor-pointer"
              aria-label="Close discount popup"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Winner Badge */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-50 text-teal-700 text-xs font-bold uppercase tracking-wider mb-2.5">
              <PartyPopper className="w-4 h-4 text-teal-600" />
              <span>Congratulations! Winner!</span>
            </div>

            {/* Headline */}
            <h3 className="text-2xl sm:text-3xl font-black text-plum-900 tracking-tight mb-1">
              You Won {wonOffer.label}!
            </h3>
            <p className="text-xs sm:text-sm text-gray-600 font-medium mb-4">
              Apply this exclusive code at checkout or shop now to save on your dog’s fresh meal plan.
            </p>

            {/* Coupon Box */}
            <div className="flex items-center justify-between bg-[#faf6ed] border-2 border-dashed border-teal-500/60 rounded-xl px-4 py-2.5 mb-4">
              <div className="text-left">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Promo Code</span>
                <span className="font-mono font-black text-lg sm:text-xl text-teal-700 tracking-wider">
                  {wonOffer.code}
                </span>
              </div>
              <button
                type="button"
                onClick={handleCopyCode}
                className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-white border border-gray-200 text-gray-800 text-xs font-bold hover:bg-teal-50 hover:text-teal-700 transition-all shadow-sm active:scale-95 cursor-pointer"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-teal-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied!' : 'Copy'}</span>
              </button>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-2.5">
              <button
                type="button"
                onClick={handleApplyToCart}
                className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs sm:text-sm uppercase tracking-wider shadow-lg shadow-teal-600/25 active:scale-95 transition-all cursor-pointer"
              >
                {applied ? <Check className="w-4 h-4" /> : <Tag className="w-4 h-4" />}
                <span>{applied ? 'Applied to Cart!' : 'Apply to Cart'}</span>
              </button>
              <Link
                href="/shop"
                className="flex items-center justify-center gap-1.5 py-3 px-5 rounded-xl bg-coral-500 hover:bg-coral-600 text-white font-bold text-xs sm:text-sm uppercase tracking-wider shadow-lg shadow-coral-500/25 active:scale-95 transition-all cursor-pointer"
              >
                <span>Shop Now</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Spin Again */}
            <button
              type="button"
              onClick={spinWheel}
              className="mt-3.5 inline-flex items-center gap-1.5 text-xs font-bold text-gray-500 hover:text-teal-700 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Spin Again</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
