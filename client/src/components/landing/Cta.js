'use client';

import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import Link from 'next/link';
import { motion } from 'framer-motion';

gsap.registerPlugin(ScrollTrigger);

// Updated Mockup: Showing a dashboard preview
const UIMockup = () => {
    return (
        <div className="relative w-full h-64 bg-background rounded-lg border border-border p-4 shadow-2xl">
            {/* Top Bar */}
            <div className="flex items-center justify-between mb-4">
                <div className="w-1/3 h-3 bg-primary/50 rounded-full"></div>
                <div className="w-8 h-8 bg-background-alt rounded-full border border-border"></div>
            </div>
            {/* Graph Section */}
            <div className="w-full h-28 bg-background-alt rounded-md border border-border p-2 mb-4">
                <div className="w-3/4 h-3 bg-border rounded-full mb-2"></div>
                <div className="w-1/2 h-3 bg-border rounded-full"></div>
            </div>
            {/* Stats Row */}
            <div className="flex gap-2">
                <div className="flex-1 h-12 bg-background-alt rounded-md"></div>
                <div className="flex-1 h-12 bg-background-alt rounded-md"></div>
                <div className="flex-1 h-12 bg-background-alt rounded-md"></div>
            </div>
        </div>
    );
};

export default function Cta() {
    const sectionRef = useRef(null);

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
                    start: 'top 85%',
                },
            }
        );
    }, []);

    return (
        <section className="py-24 bg-background">
            <div className="max-w-6xl mx-auto px-4">
                <div
                    ref={sectionRef}
                    className="relative rounded-2xl overflow-hidden bg-background-alt border border-border"
                >
                    <div
                        className="absolute inset-0 opacity-20"
                        style={{
                            backgroundImage:
                                'radial-gradient(var(--color-border) 1px, transparent 1px)',
                            backgroundSize: '20px 20px',
                        }}
                    ></div>

                    <div className="relative z-10 flex flex-col md:flex-row items-center p-12 gap-8">
                        {/* Left Column: Text */}
                        <div className="md:w-1/2 text-center md:text-left">
                            <h2 className="font-heading text-4xl font-extrabold text-text-primary">
                                Visualize Your Ideas in Real Time
                            </h2>
                            <p className="max-w-md mx-auto md:mx-0 mt-4 text-text-secondary">
                                Watch your concepts transform into beautiful dashboards and
                                organized insights instantly — no design skills required.
                            </p>

                            <div className="mt-8">
                                <motion.div whileHover="hover" className="inline-block">
                                    <Link
                                        href="/register"
                                        className="font-heading group inline-flex items-center gap-3 px-8 py-4 text-lg font-bold text-white bg-primary rounded-md hover:bg-primary-hover transition-colors duration-300"
                                    >
                                        <span>Try the Live Demo</span>
                                        <motion.div
                                            variants={{ hover: { x: 5 } }}
                                            transition={{
                                                type: 'spring',
                                                stiffness: 400,
                                                damping: 10,
                                            }}
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                strokeWidth={2}
                                                stroke="currentColor"
                                                className="w-6 h-6"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3"
                                                />
                                            </svg>
                                        </motion.div>
                                    </Link>
                                </motion.div>
                                <p className="text-xs text-text-secondary mt-4">
                                    Experience your data in motion.
                                </p>
                            </div>
                        </div>

                        {/* Right Column: Updated Mockup */}
                        <div className="w-full md:w-1/2">
                            <UIMockup />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
