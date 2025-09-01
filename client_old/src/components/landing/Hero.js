'use client';

import { useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as random from 'maath/random/dist/maath-random.esm';
import gsap from 'gsap';
import Link from 'next/link';

// 3D Particle Background Component
function Particles(props) {
  const ref = useRef();
  const [sphere] = random.inSphere(new Float32Array(5000), { radius: 1.5 });

  useFrame((state, delta) => {
    ref.current.rotation.x -= delta / 15;
    ref.current.rotation.y -= delta / 20;
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled {...props}>
        <PointMaterial
          transparent
          color="EB49A8" // Primary blue particles
          size={0.008}
          sizeAttenuation={true}
          depthWrite={false}
        />
      </Points>
    </group>
  );
}

// Main Hero Component
export default function Hero() {
  const heroRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      heroRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }
    );
  }, []);

  return (
    <div className="relative w-full h-screen mx-auto bg-background">
      <div className="absolute inset-0 z-0 opacity-50">
        <Canvas camera={{ position: [0, 0, 1] }}>
          <Particles />
        </Canvas>
      </div>
      <div
        ref={heroRef}
        className="relative z-10 flex flex-col justify-center items-center text-center px-4 h-full"
      >
        <h1 className="font-heading text-5xl md:text-7xl font-extrabold leading-tight text-text-primary">
          Bring Your Memories to Life
        </h1>
        <p className="font-sans mt-4 text-lg md:text-xl max-w-2xl text-text-secondary">
          Your intelligent partner for effortless presentations, documents, and shared knowledge.
        </p>
        <div className="mt-8">
          <Link
            href="/register"
            className="font-heading px-8 py-4 text-lg font-bold text-white bg-primary rounded-full hover:bg-blue-700 transition-all duration-300 shadow-lg shadow-blue-500/30"
          >
            Start for Free
          </Link>
        </div>
      </div>
    </div>
  );
}
