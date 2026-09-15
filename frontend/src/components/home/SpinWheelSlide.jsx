'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Gift, RotateCcw, Check, Copy, ArrowRight, Tag } from 'lucide-react';
import useCartStore from '@/store/cartStore';

const OFFERS = [
  { label: '10% OFF', code: 'FUR10', type: 'PERCENTAGE', value: 10 },
  { label: '15% OFF', code: 'FUR15', type: 'PERCENTAGE', value: 15 },
  { label: '20% OFF', code: 'FUR20', type: 'PERCENTAGE', value: 20 },
  { label: '25% OFF', code: 'FUR25', type: 'PERCENTAGE', value: 25 },
  { label: '5% OFF', code: 'FUR5', type: 'PERCENTAGE', value: 5 },
  { label: 'FREE SHIP', code: 'FREESHIP', type: 'FLAT', value: 49 },
];

export default function SpinWheelSlide({ onSpinStateChange }) {
  const [rotation, setRotation] = useState(0);
  const [spinning, setSpinning] = useState(false);
  const [wonOffer, setWonOffer] = useState(null);
  const [copied, setCopied] = useState(false);
  const [applied, setApplied] = useState(false);
  const currentRotationRef = useRef(0);

  const { setCoupon } = useCartStore();

  const spinWheel = () => {
    if (spinning) return;

    setSpinning(true);
    setWonOffer(null);
    setCopied(false);
    setApplied(false);
    if (onSpinStateChange) onSpinStateChange(true);

    // Pick random target slice index (0 to 5)
    const targetIndex = Math.floor(Math.random() * OFFERS.length);
    const chosen = OFFERS[targetIndex];

    // Target angle so targetIndex aligns with top pointer (12 o'clock)
    const targetAngle = (360 - targetIndex * 60) % 360;
    const current = currentRotationRef.current;
    const currentNormalized = current % 360;
    let delta = targetAngle - currentNormalized;
    if (delta <= 0) {
      delta += 360;
    }
    const totalSpins = 360 * 5; // 5 full revolutions
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
    <div className="relative w-full h-full overflow-hidden bg-[#faf6ed] select-none">
      {/* 1. Full-Bleed Studio Background with Dog on the Right */}
      <Image
        src="/images/spin-wheel-banner-bg.jpg"
        alt="FurBowl Discount Wheel"
        fill
        priority
        className="object-cover object-right sm:object-center w-full h-full"
        sizes="100vw"
      />

      {/* 2. 3-Column Layout: Left (Text), Center (Wheel), Right (Dog space) */}
      <div className="absolute inset-0 z-10 grid grid-cols-1 md:grid-cols-12 items-center px-8 sm:px-14 lg:px-20">
        
        {/* Column 1 (Left, 5 cols): Headline, Subhead & Action */}
        <div className="md:col-span-5 flex flex-col items-start justify-center pl-6 sm:pl-10 md:pl-8 lg:pl-12 z-20">
          <span className="inline-block px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/25 text-teal-700 text-xs sm:text-sm font-black uppercase tracking-widest mb-2 sm:mb-3">
            DISCOUNT WHEEL
          </span>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black text-plum-900 leading-none tracking-tight uppercase">
            SPIN TO SAVE!
          </h2>

          <div className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-black text-teal-600 mt-2 uppercase tracking-tight">
            UP TO 25% OFF
          </div>

          {/* Won Card vs Spin Action Button */}
          {wonOffer ? (
            <div className="mt-3 bg-white/95 backdrop-blur-md rounded-2xl p-3 sm:p-4 border-2 border-teal-500 shadow-xl shadow-teal-500/15 max-w-xs w-full animate-fade-in text-left">
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] font-black text-teal-600 uppercase tracking-wider flex items-center gap-1">
                  <Gift className="w-3 h-3 text-teal-500" />
                  DISCOUNT UNLOCKED!
                </span>
                <button
                  type="button"
                  onClick={spinWheel}
                  className="text-[11px] font-bold text-plum-900/50 hover:text-plum-900 flex items-center gap-1 transition-colors cursor-pointer"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Spin Again</span>
                </button>
              </div>

              <div className="text-lg sm:text-xl font-black text-plum-900 mb-1.5 leading-tight">
                {wonOffer.label}
              </div>

              {/* Coupon Code Box */}
              <div className="flex items-center justify-between bg-[#faf6ed] border border-plum-900/15 rounded-xl px-3 py-1.5 mb-2">
                <span className="font-mono font-black text-sm sm:text-base text-teal-600 tracking-wider">
                  {wonOffer.code}
                </span>
                <button
                  type="button"
                  onClick={handleCopyCode}
                  className="text-[11px] font-bold px-2 py-0.5 rounded-lg bg-white border border-plum-900/15 text-plum-900 hover:bg-teal-500 hover:text-white transition-all cursor-pointer flex items-center gap-1"
                >
                  {copied ? <Check className="w-3 h-3 text-teal-600" /> : <Copy className="w-3 h-3" />}
                  <span>{copied ? 'Copied' : 'Copy'}</span>
                </button>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-1.5">
                <button
                  type="button"
                  onClick={handleApplyToCart}
                  className="flex-1 flex items-center justify-center gap-1 py-2 px-2.5 rounded-xl bg-teal-500 hover:bg-teal-600 text-white text-[11px] font-black tracking-wider uppercase transition-all shadow-md shadow-teal-500/20 active:scale-95 cursor-pointer"
                >
                  {applied ? <Check className="w-3 h-3" /> : <Tag className="w-3 h-3" />}
                  <span>{applied ? 'Applied!' : 'Apply to Cart'}</span>
                </button>

                <Link
                  href="/shop"
                  className="flex items-center justify-center gap-1 py-2 px-3 rounded-xl bg-peach-500 hover:bg-peach-600 text-white text-[11px] font-black tracking-wider uppercase transition-all shadow-md shadow-peach-500/20 active:scale-95 cursor-pointer"
                >
                  <span>Shop</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          ) : (
            <button
              type="button"
              onClick={spinWheel}
              disabled={spinning}
              className="mt-4 sm:mt-6 px-7 sm:px-10 py-3.5 sm:py-4 rounded-xl bg-teal-500 hover:bg-teal-600 active:scale-95 text-white font-black text-sm sm:text-base lg:text-lg uppercase tracking-wider transition-all shadow-lg shadow-teal-500/30 disabled:opacity-75 disabled:cursor-not-allowed cursor-pointer flex items-center gap-2.5"
            >
              {spinning ? (
                <>
                  <RotateCcw className="w-5 h-5 animate-spin text-white" />
                  <span>Spinning…</span>
                </>
              ) : (
                <>
                  <Gift className="w-5 h-5" />
                  <span>Spin The Wheel</span>
                </>
              )}
            </button>
          )}
        </div>

        {/* Column 2 (Center, 4 cols): The Perfectly Centered Spinning Wheel */}
        <div className="md:col-span-4 flex items-center justify-center z-20 my-2 md:my-0">
          <div className="relative w-[230px] h-[230px] sm:w-[300px] sm:h-[300px] md:w-[340px] md:h-[340px] lg:w-[400px] lg:h-[400px] flex items-center justify-center rounded-full">
            
            {/* Top Indicator Pointer (Fixed, does not rotate) */}
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-30 pointer-events-none drop-shadow-md">
              <svg width="28" height="34" viewBox="0 0 28 34" fill="none">
                <path
                  d="M14 32L3 10C1.5 6.5 4 2 8 2H20C24 2 26.5 6.5 25 10L14 32Z"
                  fill="#ff7a59"
                  stroke="#ffffff"
                  strokeWidth="2.5"
                  strokeLinejoin="round"
                />
                <circle cx="14" cy="11" r="3.5" fill="#ffffff" />
              </svg>
            </div>

            {/* Rotating Wheel — no border/shadow here so they never go oval */}
            <div
              className="w-full h-full rounded-full overflow-hidden cursor-pointer"
              onClick={spinWheel}
              style={{
                transform: `rotate(${rotation}deg)`,
                transformOrigin: '50% 50%',
                transition: spinning ? 'transform 4500ms cubic-bezier(0.17, 0.97, 0.25, 1)' : 'none',
              }}
            >
              <svg viewBox="0 0 400 400" className="w-full h-full block">
                {/* 6 Slices — each slice is 60°, centered so slice 0 starts at -30° from top */}
                {OFFERS.map((offer, i) => {
                  const isTeal = i % 2 === 0;
                  const cx = 200, cy = 200, r = 195;

                  // Mid-angle of this slice in degrees, measured from the top (12 o'clock = 0°)
                  const midDeg = i * 60; // degrees from top, clockwise
                  const midRad = ((midDeg - 90) * Math.PI) / 180; // standard math angle

                  // Start and end angles for arc
                  const startDeg = midDeg - 30;
                  const endDeg = midDeg + 30;
                  const startRad = ((startDeg - 90) * Math.PI) / 180;
                  const endRad = ((endDeg - 90) * Math.PI) / 180;

                  const x1 = cx + r * Math.cos(startRad);
                  const y1 = cy + r * Math.sin(startRad);
                  const x2 = cx + r * Math.cos(endRad);
                  const y2 = cy + r * Math.sin(endRad);

                  // Text position: 60% along the radius from center
                  const textR = r * 0.60;
                  const textX = cx + textR * Math.cos(midRad);
                  const textY = cy + textR * Math.sin(midRad);

                  // Text reads from outside rim inward:
                  // Top half (0-90°, 270-360°): rotate by midDeg so text points outward and is upright
                  // Bottom half (90-270°): flip 180° so it's not upside-down
                  const needsFlip = midDeg > 90 && midDeg < 270;
                  const textRotation = needsFlip ? midDeg + 180 : midDeg;

                  // Two-line support for "FREE SHIP" → "FREE" and "SHIP"
                  const lines = offer.label.includes(' ')
                    ? offer.label.split(' ')
                    : [offer.label];

                  return (
                    <g key={i}>
                      <path
                        d={`M ${cx} ${cy} L ${x1} ${y1} A ${r} ${r} 0 0 1 ${x2} ${y2} Z`}
                        fill={isTeal ? '#15aec0' : '#ff7a59'}
                        stroke="#ffffff"
                        strokeWidth="3"
                        strokeLinejoin="round"
                      />
                      {lines.length === 1 ? (
                        <text
                          x={textX}
                          y={textY}
                          fill="#ffffff"
                          fontSize="26"
                          fontWeight="900"
                          fontFamily="'Inter', sans-serif"
                          textAnchor="middle"
                          dominantBaseline="middle"
                          transform={`rotate(${textRotation}, ${textX}, ${textY})`}
                          style={{ letterSpacing: '0.04em' }}
                        >
                          {lines[0]}
                        </text>
                      ) : (
                        <text
                          fill="#ffffff"
                          fontSize="22"
                          fontWeight="900"
                          fontFamily="'Inter', sans-serif"
                          textAnchor="middle"
                          dominantBaseline="middle"
                          transform={`rotate(${textRotation}, ${textX}, ${textY})`}
                          style={{ letterSpacing: '0.04em' }}
                        >
                          <tspan x={textX} y={textY - 13}>{lines[0]}</tspan>
                          <tspan x={textX} y={textY + 13}>{lines[1]}</tspan>
                        </text>
                      )}
                    </g>
                  );
                })}
              </svg>
            </div>

            {/* Fixed Center SPIN Button Hub (Always upright, never wobbles) */}
            <button
              type="button"
              onClick={spinWheel}
              disabled={spinning}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 rounded-full bg-teal-500 hover:bg-teal-600 active:scale-95 text-white font-black text-sm sm:text-base border-4 border-white shadow-xl shadow-teal-500/30 flex items-center justify-center cursor-pointer transition-transform"
              title="Click to Spin"
            >
              SPIN
            </button>

          </div>
        </div>

        {/* Column 3 (Right, 3 cols): Dedicated Space for the Excited Dog */}
        <div className="hidden md:block md:col-span-3 pointer-events-none" />

      </div>
    </div>
  );
}
