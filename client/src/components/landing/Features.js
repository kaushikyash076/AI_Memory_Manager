'use client';

import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { motion } from 'framer-motion';
// We will import anime.js dynamically inside useEffect

gsap.registerPlugin(ScrollTrigger);

// --- Main Feature Data for the 4-column layout ---
const features = [
  {
    title: 'Semantic Search',
    description: 'Ask questions, get answers. Find memories based on meaning, not just keywords.',
    icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-primary">
          <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
        </svg>
    ),
  },
  {
    title: 'Shared Context',
    description: 'Collaborate in a shared space where your AI remembers everything for both of you.',
    icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-primary">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 0 1-.923 1.785A5.969 5.969 0 0 0 6 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337Z" />
        </svg>
    ),
  },
  {
    title: 'Instant Summaries',
    description: 'Distill long notes into clear, concise points automatically.',
    icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-primary">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12" />
        </svg>
    ),
  },
  {
    title: 'Build Your Knowledge Base',
    description: 'Turn your collective memories into a powerful, interconnected resource.',
    icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-primary">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582" />
        </svg>
    ),
  },
];

// Reusable Feature Card component with Anime.js hover effect
const FeatureCard = ({ title, description, icon }) => {
  const iconRef = useRef(null);
  const animationRef = useRef(null);

  // Set up the animation initially
useEffect(() => {
  const initAnime = async () => {
    try {
      // eslint-disable-next-line @next/next/no-assign-module-variable
      const module = await import('animejs/lib/anime.es.js');
const anime = module.default;

      if (iconRef.current) {
        const paths = iconRef.current.querySelectorAll('path');
        paths.forEach(path => {
          const length = path.getTotalLength();
          path.style.strokeDasharray = length;
          path.style.strokeDashoffset = length;
        });

        animationRef.current = anime({
          targets: paths,
          strokeDashoffset: 0,
          easing: 'easeInOutSine',
          duration: 1000,
          delay: (el, i) => i * 200,
          autoplay: false,
        });
      }
    } catch (err) {
      console.error('Failed to load animejs:', err);
    }
  };

  initAnime();
}, [icon]);



  const handleMouseEnter = () => {
    if (animationRef.current) {
      animationRef.current.restart();
    }
  };

  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className="group relative rounded-2xl overflow-hidden shadow-2xl border border-border feature-card bg-background-alt p-8 h-full"
      onMouseEnter={handleMouseEnter}
    >
      <div className="relative z-10 text-white">
        <div ref={iconRef} className="mb-4">
            {icon}
        </div>
        <h3 className="font-heading font-bold text-2xl text-text-primary">{title}</h3>
        <p className="font-sans text-text-secondary mt-2">{description}</p>
      </div>
    </motion.div>
  );
};

// Main Features Section component
export default function Features() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.feature-card',
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
          },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section 
        ref={sectionRef} 
        className="relative py-24 bg-background"
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
            <h2 className="font-heading text-4xl font-extrabold text-text-primary">AI Memory, reimagined</h2>
            <p className="max-w-2xl mx-auto mt-4 text-text-secondary">
                We understand the challenge of retaining information. That's why we built a tool that streamlines your workflow, eliminates friction, and empowers you to focus on what you do best: thinking.
            </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </div>
      </div>
    </section>
  );
}
