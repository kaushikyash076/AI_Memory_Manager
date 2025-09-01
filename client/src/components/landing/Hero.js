'use client';

import { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import Link from 'next/link';
import NET from 'vanta/dist/vanta.net.min';
// We will import mojs dynamically inside useEffect

export default function Hero() {
  const heroContentRef = useRef(null);
  const vantaRef = useRef(null);
  const [vantaEffect, setVantaEffect] = useState(null);
  const buttonRef = useRef(null);
  const animationRef = useRef(null); // Ref to store the mo.js animation

  // Initialize Vanta.js
  useEffect(() => {
    let effect = vantaEffect;
    if (!effect && vantaRef.current && window.THREE) {
      effect = NET({
        el: vantaRef.current,
        THREE: window.THREE,
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        minHeight: 200.0,
        minWidth: 200.0,
        scale: 1.0,
        scaleMobile: 1.0,
        color: '#3B82F6',
        backgroundColor: '#1A1A1A',
        points: 12.0,
        maxDistance: 22.0,
        spacing: 16.0,
      });
      setVantaEffect(effect);
    }
    return () => {
      if (effect) effect.destroy();
    };
  }, [vantaEffect]);

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

  // FIXED: Initialize mo.js animation on the client-side using dynamic import
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

  // mo.js click handler
  const handleButtonClick = () => {
    if (animationRef.current) {
      animationRef.current.replay();
    }
  };

  return (
    <div className="relative w-full h-screen mx-auto">
      <div 
        ref={vantaRef} 
        className="absolute inset-0 z-0" 
      />
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
