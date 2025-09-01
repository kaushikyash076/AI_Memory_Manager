'use client';

import { motion } from 'framer-motion';

// This component creates the two-column layout for our auth pages
export default function AuthLayout({ children }) {
  return (
    <div className="flex items-center justify-center min-h-screen bg-background text-text-primary p-4 md:p-8">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 bg-background-alt rounded-2xl shadow-2xl border border-border overflow-hidden"
      >
        {/* Left Column: Form Content */}
        <div className="p-8 md:p-12">
          {children}
        </div>

        {/* Right Column: Visual Element */}
        <div className="hidden md:flex flex-col items-center justify-center p-12 bg-background relative overflow-hidden">
            <div className="absolute inset-0 opacity-20" style={{backgroundImage: 'radial-gradient(var(--color-border) 1px, transparent 1px)', backgroundSize: '20px 20px'}}></div>
            <div className="relative z-10 text-center">
                <div className="relative w-48 h-48 mx-auto mb-8">
                    <div className="absolute inset-0 bg-primary rounded-full opacity-30 blur-2xl"></div>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-48 h-48 text-primary animate-pulse">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 0 0 1.5-.189m-1.5.189a6.01 6.01 0 0 1-1.5-.189m3.75 7.478a12.06 12.06 0 0 1-4.5 0m3.75 2.311a7.5 7.5 0 0 1-7.5 0c-1.255 0-2.45-.29-3.516-.82a9.75 9.75 0 0 1 14.532 0c-1.066.53-2.261.82-3.516-.82Z" />
                    </svg>
                </div>
                <blockquote className="text-lg text-text-primary">
                    &quot;This tool is like a second brain. The AI-powered search has saved me countless hours trying to find that one specific note from weeks ago.&quot;
                </blockquote>
                <p className="mt-4 text-text-secondary">- Alex Rivera, Lead Developer</p>
            </div>
        </div>
      </motion.div>
    </div>
  );
}
