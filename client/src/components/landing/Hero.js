'use client';

import { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import Link from 'next/link';
import dynamic from 'next/dynamic';

// This is the key: we are dynamically importing our VantaBackground,
// and telling Next.js to NEVER render it on the server (ssr: false).
const VantaBackground = dynamic(() => import('./VantaBackground'), {
  ssr: false,
});

export default function Hero() {
  const heroContentRef = useRef(null);
  const buttonRef = useRef(null);
  const animationRef = useRef(null);

  // Animate the text content
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        heroContentRef.current.children,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1, ease: 'power3.out', stagger: 0.2, delay: 0.5 }
      );
    });
    return () => ctx.revert();
  }, []);

  // Initialize mo.js animation
  useEffect(() => {
    const initMojs = async () => {
        const mojs = (await import('@mojs/core')).default;
        if (buttonRef.current) {
          animationRef.current = new mojs.Burst({
            parent: buttonRef.current,
            radius: { 0: 100 },
            count: 10,
            children: {
                shape: 'circle',
                fill: ['var(--color-primary)', 'var(--color-secondary)', 'white'],
                radius: { 20: 5 },
                duration: 2000,
                easing: 'cubic.out',
            }
          });
        }
    };
    initMojs();
  }, []);

  const handleButtonClick = () => {
    if (animationRef.current) {
      animationRef.current.replay();
    }
  };

  return (
    <div className="relative w-full h-screen mx-auto">
      <VantaBackground />
      <div
        ref={heroContentRef}
        className="relative z-10 flex flex-col justify-center items-start text-left px-8 md:px-16 lg:px-24 h-full max-w-7xl mx-auto"
      >
        <h1 className="font-heading text-5xl md:text-7xl font-extrabold leading-tight text-text-primary">
          Never Forget a Thought Again.
        </h1>
        <p className="font-sans mt-4 text-lg md:text-xl max-w-xl text-text-secondary">
          Your AI partner for capturing, connecting, and recalling every important detail.
        </p>
        <div className="mt-8 flex items-center gap-4">
          <Link
            href="/register"
            ref={buttonRef}
            onClick={handleButtonClick}
            className="font-heading px-6 py-3 text-lg font-bold text-white bg-primary rounded-md hover:bg-primary-hover transition-colors duration-300"
          >
            Try It Free
          </Link>
          <Link
            href="#"
            className="font-heading px-6 py-3 text-lg font-bold text-primary border-2 border-primary rounded-md hover:bg-primary hover:text-white transition-colors duration-300"
          >
            See It in Action
          </Link>
        </div>
      </div>
    </div>
  );
}
