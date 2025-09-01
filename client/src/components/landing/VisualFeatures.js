'use client';

import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import Image from 'next/image';

gsap.registerPlugin(ScrollTrigger);

// Reusable component for a single visual feature section
const FeatureRow = ({ title, description, imageUrl, reverse = false }) => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
        const section = sectionRef.current;
        // Animate the text and image separately for a nicer effect
        gsap.fromTo(
          section.querySelector('.text-content'), { opacity: 0, x: reverse ? 50 : -50 },
          {
            opacity: 1, x: 0, duration: 1, ease: 'power3.out',
            scrollTrigger: { trigger: section, start: 'top 80%' }
          }
        );
        gsap.fromTo(
          section.querySelector('.image-content'), { opacity: 0, scale: 0.9 },
          {
            opacity: 1, scale: 1, duration: 1, ease: 'power3.out',
            scrollTrigger: { trigger: section, start: 'top 80%' }
          }
        );
    }, sectionRef);
    return () => ctx.revert();
  }, [reverse]);

  return (
    <div ref={sectionRef} className={`flex flex-col md:flex-row items-center gap-12 ${reverse ? 'md:flex-row-reverse' : ''}`}>
      {/* Text Content */}
      <div className="md:w-1/2 text-content">
        <h3 className="font-heading text-3xl font-bold text-text-primary mb-4">
          {title}
        </h3>
        <p className="font-sans text-text-secondary leading-relaxed">
          {description}
        </p>
      </div>
      {/* Image Content */}
      <div className="md:w-1/2 image-content">
        <Image
          src={imageUrl}
          alt={title}
          width={600}
          height={400}
          className="rounded-2xl shadow-2xl w-full h-auto object-cover aspect-video  border-border"
        />
      </div>
    </div>
  );
};

// Main component that orchestrates the feature rows
export default function VisualFeatures() {
  return (
    <section className="py-24 bg-background">
      <div className="max-w-6xl mx-auto px-4 space-y-24">
        <FeatureRow
          title="Find Memories by Asking Questions."
          description="Instead of trying to remember the exact words you used, simply ask a question like 'What was our decision on the Q3 budget?' and let our AI find the most relevant conversations and notes instantly."
          imageUrl="/images/visual-feature-1.jpg"
        />

        <FeatureRow
          title="A Shared Brain, in Real-Time."
          description="Collaborate with a partner or teammate in a shared memory space. All notes, tasks, and reminders are synced instantly, ensuring you're both always on the same page."
          imageUrl="/images/visual-feature-2.jpg"
          reverse={true}
        />
      </div>
    </section>
  );
}
