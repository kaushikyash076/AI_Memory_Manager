'use client';

import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import Link from 'next/link';

gsap.registerPlugin(ScrollTrigger);

export default function FinalVisual() {
  const sectionRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    // GSAP text animation
    const section = sectionRef.current;
    gsap.fromTo(
      section.querySelector('.content-wrapper'),
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1.5,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
        },
      }
    );

    // Shooting stars animation
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const stars = [];
    const shootingStars = [];

    // Create stars
    for (let i = 0; i < 200; i++) {
      stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 1.5,
      });
    }

    function createShootingStar() {
      shootingStars.push({
        x: Math.random() * width,
        y: Math.random() * height * 0.5,
        length: Math.random() * 80 + 10,
        speed: Math.random() * 6 + 6,
        size: Math.random() * 2 + 1,
      });
    }

    function drawStars() {
      ctx.fillStyle = 'white';
      stars.forEach((star) => {
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fill();
      });
    }

    function drawShootingStars() {
      for (let i = 0; i < shootingStars.length; i++) {
        const s = shootingStars[i];
        const grad = ctx.createLinearGradient(s.x, s.y, s.x + s.length, s.y);
        grad.addColorStop(0, 'white');
        grad.addColorStop(1, 'rgba(255,255,255,0)');
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillRect(s.x, s.y, s.length, s.size);

        s.x += s.speed;
        s.y += s.speed * 0.3; // diagonal downwards

        if (s.x > width || s.y > height) {
          shootingStars.splice(i, 1);
          i--;
        }
      }
    }

    function animate() {
      ctx.clearRect(0, 0, width, height);
      drawStars();
      drawShootingStars();

      if (Math.random() < 0.02) {
        createShootingStar();
      }

      requestAnimationFrame(animate);
    }

    animate();

    // Resize handler
    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative h-[80vh] bg-background text-white overflow-hidden"
    >
      {/* Shooting stars canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-0"
      ></canvas>

      {/* Gradient overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent z-10"></div>

      {/* Content */}
      <div className="content-wrapper relative z-20 flex flex-col justify-center items-center text-center p-8 h-full">
        <h2
          className="font-heading text-5xl md:text-6xl font-extrabold"
          style={{ textShadow: '2px 2px 8px rgba(0,0,0,0.7)' }}
        >
          How good ideas get into the universe.
        </h2>
        <p
          className="max-w-6xl mx-auto mt-4 font-extrabold text-text-secondary"
          style={{ textShadow: '1px 1px 6px rgba(0,0,0,0.7)' }}
        >
          From a fleeting thought to a shared masterpiece, AI Memory Manager is
          where your best work begins.
        </p>
        <div className="mt-8">
          <Link
            href="/register"
            className="font-heading inline-block px-8 py-4 text-lg font-bold text-white bg-primary rounded-md hover:bg-primary-hover transition-colors duration-300"
          >
            Start for Free
          </Link>
        </div>
      </div>
    </section>
  );
}
