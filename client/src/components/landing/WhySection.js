// src/components/landing/WhySection.js
'use client';

import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Particle system component
function Particles() {
  const pointsRef = useRef();
  const count = 5000;
  const positions = new Float32Array(count * 3);

  for (let i = 0; i < count * 3; i++) {
    positions[i] = (Math.random() - 0.5) * 20;
  }

  useFrame(({ clock }) => {
    const time = clock.getElapsedTime();
    pointsRef.current.rotation.y = time * 0.05;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#ffffff"
        size={0.02}
        sizeAttenuation
        transparent
        opacity={0.7}
      />
    </points>
  );
}

export default function WhySection() {
  const textRef = useRef(null);
  const [texts] = useState([
    'Why Choose Us?',
    'Seamless Integration',
    'Lightning Fast',
    'AI-Powered Experience',
    'Join Us Today'
  ]);

  useEffect(() => {
    const sections = gsap.utils.toArray('.why-text');

    sections.forEach((section, i) => {
      gsap.fromTo(
        section,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          scrollTrigger: {
            trigger: section,
            start: 'top center',
            end: 'bottom center',
            scrub: true
          }
        }
      );
    });
  }, []);

  return (
    <section className="relative w-full h-screen overflow-hidden">
      {/* Background Canvas */}
      <Canvas
        camera={{ position: [0, 0, 5] }}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 0
        }}
      >
        <Particles />
      </Canvas>

      {/* Text Overlay */}
      <div
        ref={textRef}
        className="absolute inset-0 flex flex-col items-center justify-center text-center z-10"
      >
        {texts.map((text, i) => (
          <h1
            key={i}
            className="why-text text-white text-4xl md:text-6xl font-bold mb-6 drop-shadow-lg"
          >
            {text}
          </h1>
        ))}
      </div>
    </section>
  );
}
