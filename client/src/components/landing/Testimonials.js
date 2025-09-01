'use client';

import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import Image from 'next/image';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';

gsap.registerPlugin(ScrollTrigger);

// Placeholder testimonial data - now with more content
const testimonials = [
  {
    quote: "This is a game-changer for our team. We've cut down on 'what did we discuss?' meetings by half. The AI search is incredibly accurate.",
    name: 'Sarah Johnson',
    title: 'Project Manager, TechCorp',
    avatar: 'https://i.pravatar.cc/150?img=1',
  },
  {
    quote: "As a co-founder, staying aligned with my partner is critical. AI Memory Manager acts as our shared brain. It's brilliant.",
    name: 'David Chen',
    title: 'Co-founder, Innovate LLC',
    avatar: 'https://i.pravatar.cc/150?img=32',
  },
  {
    quote: "I was skeptical at first, but the automated summaries are a lifesaver. I can catch up on a whole week of discussions in minutes.",
    name: 'Maria Garcia',
    title: 'Freelance Consultant',
    avatar: 'https://i.pravatar.cc/150?img=31',
  },
  {
    quote: "The semantic search is mind-blowing. It understands what I mean, not just what I type. It's saved me countless hours.",
    name: 'Alex Rivera',
    title: 'Lead Developer, Startly',
    avatar: 'https://i.pravatar.cc/150?img=52',
  },
  {
    quote: "Our productivity has skyrocketed. Having a shared, intelligent context means we never have to repeat ourselves.",
    name: 'Emily White',
    title: 'Operations Head, SyncUp',
    avatar: 'https://i.pravatar.cc/150?img=25',
  },
  {
    quote: "Finally, a tool that works like my brain does. I can just dump my thoughts and trust that the AI will connect the dots for me later.",
    name: 'Michael Brown',
    title: 'Creative Director, Visionary Inc.',
    avatar: 'https://i.pravatar.cc/150?img=60',
  },
  {
    quote: "The best part is the shared context feature. My co-founder and I are always on the same page, which is priceless for a startup.",
    name: 'Jessica Lee',
    title: 'CTO, BuildFast',
    avatar: 'https://i.pravatar.cc/150?img=45',
  },
  {
    quote: "I use it for everything from meeting notes to personal journaling. The ability to search my own life's context is incredible.",
    name: 'Kevin Harris',
    title: 'Entrepreneur',
    avatar: 'https://i.pravatar.cc/150?img=68',
  },
];

// Reusable Testimonial Card component
const TestimonialCard = ({ quote, name, title, avatar }) => {
  return (
    // Embla requires a flex basis for each slide
    <div className="flex-[0_0_90%] md:flex-[0_0_30%] mx-4">
        <div className="bg-background-alt p-8 rounded-2xl shadow-lg border border-border flex flex-col h-full">
          <p className="font-sans text-text-secondary flex-grow">"{quote}"</p>
          <div className="flex items-center mt-6">
            <Image 
                src={avatar} 
                alt={name} 
                width={48} 
                height={48} 
                className="w-12 h-12 rounded-full object-cover" 
            />
            <div className="ml-4">
              <p className="font-heading font-semibold text-text-primary">{name}</p>
              <p className="font-sans text-sm text-text-secondary">{title}</p>
            </div>
          </div>
        </div>
    </div>
  );
};

// Main Testimonials Section component
export default function Testimonials() {
  const sectionRef = useRef(null);
  const [emblaRef] = useEmblaCarousel({ loop: true, align: 'start' }, [
      Autoplay({ delay: 4000, stopOnInteraction: true })
  ]);

  useEffect(() => {
    const section = sectionRef.current;
    gsap.fromTo(
      section,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
        },
      }
    );
  }, []);

  return (
    <section ref={sectionRef} className="py-24 bg-background">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <h2 className="font-heading text-4xl font-extrabold text-text-primary mb-4">
          From Cluttered Notes to Crystal Clarity
        </h2>
        <p className="max-w-2xl mx-auto text-text-secondary mb-12">
            Thousands of users have transformed their workflow with their new digital brain. Here's what they have to say.
        </p>
      </div>

      {/* Embla Carousel Viewport */}
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={index} {...testimonial} />
          ))}
        </div>
      </div>
    </section>
  );
}
