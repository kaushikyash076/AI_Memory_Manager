'use client';

import { useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

export default function DashboardPage() {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user === null) {
      router.push('/login');
    }
  }, [user, router]);

  if (!user) {
    return (
      <div className="w-full h-full flex justify-center items-center">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      <h1 className="text-4xl font-bold text-slate-50 mb-4">Dashboard</h1>
      <p className="text-lg text-slate-400">
        Welcome back, <span className="text-cyan-400">{user.name}</span>.
      </p>
      <div className="mt-8 p-6 bg-black/20 backdrop-blur-md rounded-xl border border-white/10">
        <h2 className="text-2xl font-semibold text-slate-100">Quick Start</h2>
        <p className="mt-2 text-slate-300">
          Select an option from the sidebar to manage your memories or start a
          new search.
        </p>
      </div>
    </motion.div>
  );
}