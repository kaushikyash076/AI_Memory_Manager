'use client';

import { useEffect, useRef } from 'react';
import anime from 'animejs';

export default function LoadingSpinner() {
  const animationRef = useRef(null);

  useEffect(() => {
    animationRef.current = anime({
      targets: '.loading-dot',
      translateY: [
        { value: -10, duration: 500, easing: 'easeOutSine' },
        { value: 0, duration: 500, easing: 'easeInSine' }
      ],
      delay: anime.stagger(150),
      loop: true,
    });
    
    return () => {
      if (animationRef.current) {
        animationRef.current.pause();
      }
    };
  }, []);

  return (
    <div className="flex justify-center items-center py-16">
      <div className="flex gap-2">
        <div className="loading-dot w-3 h-3 bg-primary rounded-full"></div>
        <div className="loading-dot w-3 h-3 bg-primary rounded-full"></div>
        <div className="loading-dot w-3 h-3 bg-primary rounded-full"></div>
      </div>
    </div>
  );
}
