'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// FAQ data
const faqData = [
  {
    question: 'How does the AI search work?',
    answer: 'Our AI uses advanced semantic search. Instead of matching keywords, it understands the contextual meaning of your question to find the most relevant memories, even if they use different wording.',
  },
  {
    question: 'Is my data secure?',
    answer: 'Absolutely. All data is encrypted both in transit and at rest. We use industry-standard security protocols to ensure your memories are safe and private.',
  },
  {
    question: 'Can I collaborate with more than one person?',
    answer: 'Currently, our collaboration feature is designed for two users in a shared space, perfect for co-founders, partners, or small teams. We are exploring options for larger teams in the future.',
  },
  {
    question: 'What kind of information can I save?',
    answer: 'You can save anything! Meeting notes, brainstorming sessions, important conversations, project details, personal reminders, and any other text-based information you want to remember.',
  },
];

// Reusable Accordion Item component with enhanced animations
const AccordionItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
      }}
      className="border-b border-border py-6"
    >
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center text-left"
        whileHover={{ x: 5 }}
        transition={{ type: 'spring', stiffness: 400, damping: 10 }}
      >
        <h3 className={`font-heading text-lg font-semibold transition-colors ${isOpen ? 'text-primary' : 'text-text-primary'}`}>{question}</h3>
        <motion.div
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6 text-primary">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
        </motion.div>
      </motion.button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ type: 'spring', duration: 0.5, bounce: 0.2 }}
            className="overflow-hidden"
          >
            <p className="font-sans text-text-secondary pt-4">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

// Main FAQ Section component
export default function Faq() {
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
                    start: 'top 80%',
                },
            }
        );
    }, []);

    // Stagger animation for the list of questions
    const listVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.3,
            },
        },
    };

  return (
    <section ref={sectionRef} className="py-24 bg-background">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-heading text-4xl font-extrabold text-text-primary">
            Frequently Asked Questions
          </h2>
          <p className="max-w-2xl mx-auto mt-4 text-text-secondary">
            Have questions? We've got answers. If you can't find what you're looking for, feel free to contact us.
          </p>
        </div>
        <motion.div
            variants={listVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
        >
          {faqData.map((faq, index) => (
            <AccordionItem key={index} {...faq} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
