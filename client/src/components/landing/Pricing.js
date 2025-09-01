'use client';

import { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { motion } from 'framer-motion';
import Link from 'next/link';

gsap.registerPlugin(ScrollTrigger);

const pricingPlans = [
  {
    name: 'Personal',
    price: '$0',
    frequency: '/ month',
    description: 'Perfect for individuals starting out.',
    features: ['50 Memories', 'AI-Powered Search', 'Automated Summaries', '1 Collaboration Space'],
    isFeatured: false,
  },
  {
    name: 'Pro',
    price: '$12',
    frequency: '/ month',
    description: 'For power users and small teams.',
    features: ['Unlimited Memories', 'Advanced AI Search', 'Automated Summaries & Tasks', '5 Collaboration Spaces', 'Priority Support'],
    isFeatured: true,
  },
  {
    name: 'Enterprise',
    price: 'Contact Us',
    frequency: '',
    description: 'For large organizations with custom needs.',
    features: ['Everything in Pro', 'Advanced Security & SSO', 'Dedicated Account Manager', 'Custom Integrations'],
    isFeatured: false,
  },
];

const PricingCard = ({ plan, mojs }) => {
  const handleHover = (e) => {
    if (!mojs) return; // Prevent running before mojs is loaded
    new mojs.Burst({
      parent: e.currentTarget,
      radius: { 40: 90 },
      count: 5,
      children: {
        shape: 'cross',
        stroke: 'var(--color-primary)',
        strokeWidth: { 4: 0 },
        angle: { 360: 0 },
        radius: { 15: 5 },
        duration: 600,
        easing: 'cubic.out',
      },
    }).play();
  };

  return (
    <motion.div
      whileHover={{ y: -10 }}
      transition={{ type: 'spring', stiffness: 300 }}
      className={`relative flex flex-col p-8 rounded-2xl border shadow-lg h-full ${
        plan.isFeatured ? 'bg-primary text-white border-blue-400' : 'bg-background-alt border-border'
      }`}
      style={plan.isFeatured ? { boxShadow: '0 0 25px rgba(59, 130, 246, 0.3)' } : {}}
    >
      {plan.isFeatured && (
        <div className="absolute top-0 -translate-y-1/2 left-1/2 -translate-x-1/2">
          <span className="px-4 py-1 text-sm font-semibold text-primary bg-background rounded-full border border-border">
            Most Popular
          </span>
        </div>
      )}
      <h3 className={`font-heading text-2xl font-bold ${plan.isFeatured ? 'text-white' : 'text-text-primary'}`}>{plan.name}</h3>
      <p className={`mt-2 ${plan.isFeatured ? 'text-slate-300' : 'text-text-secondary'}`}>{plan.description}</p>
      <div className="mt-6">
        <span className={`text-4xl font-bold ${plan.isFeatured ? 'text-white' : 'text-text-primary'}`}>{plan.price}</span>
        <span className={`${plan.isFeatured ? 'text-slate-300' : 'text-text-secondary'}`}>{plan.frequency}</span>
      </div>
      <ul className="mt-8 space-y-4 flex-grow">
        {plan.features.map((feature, index) => (
          <li key={index} className="flex items-center gap-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className={`w-5 h-5 ${plan.isFeatured ? 'text-white' : 'text-primary'}`}
            >
              <path
                fillRule="evenodd"
                d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z"
                clipRule="evenodd"
              />
            </svg>
            <span className={`${plan.isFeatured ? 'text-slate-300' : 'text-text-secondary'}`}>{feature}</span>
          </li>
        ))}
      </ul>
      <Link
        href="/register"
        onMouseEnter={handleHover}
        className={`block w-full mt-8 text-center px-6 py-3 font-semibold rounded-lg transition-colors ${
          plan.isFeatured ? 'bg-white text-primary hover:bg-gray-200' : 'bg-primary text-white hover:bg-primary-hover'
        }`}
      >
        Get Started
      </Link>
    </motion.div>
  );
};

export default function Pricing() {
  const sectionRef = useRef(null);
  const [mojsLib, setMojsLib] = useState(null);

  useEffect(() => {
    // Load mojs only on client
    import('@mojs/core').then((mod) => {
      setMojsLib(mod.default);
    });

    const section = sectionRef.current;
    gsap.fromTo(
      section,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: { trigger: section, start: 'top 80%' },
      }
    );
  }, []);

  return (
    <section ref={sectionRef} className="py-24 bg-background">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-heading text-4xl font-extrabold text-text-primary">
            Choose the Plan That's Right for You
          </h2>
          <p className="max-w-2xl mx-auto mt-4 text-text-secondary">
            Start for free and scale as you grow. No credit card required.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {pricingPlans.map((plan, index) => (
            <PricingCard key={index} plan={plan} mojs={mojsLib} />
          ))}
        </div>
      </div>
    </section>
  );
}
