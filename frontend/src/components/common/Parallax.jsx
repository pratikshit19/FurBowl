'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * Parallax Component — Ultra-smooth, hardware-accelerated scroll parallax component.
 *
 * Uses requestAnimationFrame, translate3d, and IntersectionObserver for 60/120fps performance
 * with zero layout shifts or unnecessary renders.
 *
 * @param {Object} props
 * @param {React.ReactNode} props.children - Child elements to animate
 * @param {number} [props.speed=0.15] - Parallax factor. Positive = moves down (slower than scroll), Negative = moves up (floating effect)
 * @param {number} [props.rotate=0] - Optional max rotation degrees on scroll (e.g. 5, -8)
 * @param {number} [props.scale=1] - Optional scale factor on scroll (e.g. 1.05)
 * @param {'vertical'|'horizontal'|'both'} [props.direction='vertical'] - Axis of parallax shift
 * @param {string} [props.className=''] - Additional CSS classes
 * @param {Object} [props.style={}] - Additional inline styles
 */
export default function Parallax({
  children,
  speed = 0.15,
  rotate = 0,
  scale = 1,
  direction = 'vertical',
  className = '',
  style = {},
}) {
  const targetRef = useRef(null);
  const transformRef = useRef({ y: 0, x: 0, r: 0, s: 1 });
  const isIntersecting = useRef(false);

  useEffect(() => {
    // Respect user preference for reduced motion
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const el = targetRef.current;
    if (!el) return;

    let animFrameId = null;

    const updatePosition = () => {
      if (!el || !isIntersecting.current) return;

      const rect = el.getBoundingClientRect();
      const windowHeight = window.innerHeight || document.documentElement.clientHeight;

      // Calculate relative scroll position: 0 when element enters bottom, 1 when leaves top
      const targetCenter = rect.top + rect.height / 2;
      const viewportCenter = windowHeight / 2;
      const distanceFromCenter = targetCenter - viewportCenter;

      // Calculate parallax translation offset
      const translateY = distanceFromCenter * speed;
      const translateX = direction === 'horizontal' || direction === 'both' ? distanceFromCenter * (speed * 0.5) : 0;
      const rotation = rotate ? (distanceFromCenter / windowHeight) * rotate : 0;
      const scaleFactor = scale !== 1 ? 1 + (1 - Math.abs(distanceFromCenter / windowHeight)) * (scale - 1) : 1;

      // Apply hardware accelerated 3D transform
      el.style.transform = `translate3d(${translateX.toFixed(2)}px, ${translateY.toFixed(2)}px, 0px) rotate(${rotation.toFixed(2)}deg) scale(${scaleFactor.toFixed(3)})`;

      animFrameId = requestAnimationFrame(updatePosition);
    };

    const handleScroll = () => {
      if (!animFrameId && isIntersecting.current) {
        animFrameId = requestAnimationFrame(updatePosition);
      }
    };

    // IntersectionObserver to avoid background CPU load when off-screen
    const observer = new IntersectionObserver(
      ([entry]) => {
        isIntersecting.current = entry.isIntersecting;
        if (entry.isIntersecting) {
          updatePosition();
        } else if (animFrameId) {
          cancelAnimationFrame(animFrameId);
          animFrameId = null;
        }
      },
      { rootMargin: '100px 0px 100px 0px', threshold: 0 }
    );

    observer.observe(el);
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', updatePosition, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', updatePosition);
      if (animFrameId) cancelAnimationFrame(animFrameId);
    };
  }, [speed, rotate, scale, direction]);

  return (
    <div
      ref={targetRef}
      className={`will-change-transform ${className}`}
      style={{
        transition: 'transform 0.1s cubic-bezier(0.1, 0.9, 0.2, 1)',
        ...style,
      }}
    >
      {children}
    </div>
  );
}

/**
 * ParallaxFloat — Floating accent element that subtly bobs up/down on scroll.
 */
export function ParallaxFloat({
  children,
  speed = -0.2,
  rotate = 5,
  className = '',
  style = {},
}) {
  return (
    <Parallax speed={speed} rotate={rotate} className={className} style={style}>
      {children}
    </Parallax>
  );
}

/**
 * ParallaxBackground — Slow background parallax container.
 */
export function ParallaxBackground({
  children,
  speed = 0.1,
  className = '',
  style = {},
}) {
  return (
    <Parallax speed={speed} className={`pointer-events-none ${className}`} style={style}>
      {children}
    </Parallax>
  );
}
