'use client';

import { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  const formRef = useRef(null);
  const animationRef = useRef(null);

  // Initialize mo.js animation only on the client-side
  useEffect(() => {
    const initMojs = async () => {
      const mojs = (await import('@mojs/core')).default;
      if (formRef.current) {
        animationRef.current = new mojs.Burst({
          parent: formRef.current,
          radius: { 100: 300 },
          count: 20,
          children: {
            shape: ['circle', 'polygon'],
            fill: ['var(--color-primary)', 'white'],
            angle: { 0: 180 },
            duration: 2000,
            delay: 'stagger(0, 50)',
            easing: 'cubic.out',
          }
        });
      }
    };
    initMojs();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        'https://memento-e6sp.onrender.com/api/users/register',
        { name, email, password }
      );
      
      if (animationRef.current) {
        animationRef.current.play();
      }
      
      setTimeout(() => {
        alert('Registration successful! Please log in.');
        router.push('/login');
      }, 800);

    } catch (error) {
      alert(
        'Registration failed: ' +
          (error.response?.data?.message || 'Please try again.')
      );
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-background text-text-light p-4">
      <div 
        ref={formRef} 
        className="w-full max-w-md p-8 space-y-6 bg-background-alt/50 backdrop-blur-lg rounded-2xl shadow-2xl border border-border"
      >
        <div className="text-center">
            <h1 className="font-heading text-3xl font-bold text-text-primary">
            Create an Account
            </h1>
            <p className="text-text-secondary mt-2">Start your journey with AI Memory.</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="text-sm font-medium text-text-secondary">
              Name
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full px-4 py-3 mt-1 text-text-primary bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <div>
            <label htmlFor="email" className="text-sm font-medium text-text-secondary">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 mt-1 text-text-primary bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <div>
            <label htmlFor="password" className="text-sm font-medium text-text-secondary">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-3 mt-1 text-text-primary bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-3 font-bold text-white bg-primary rounded-lg hover:bg-primary-hover transition-colors duration-300"
          >
            Create Account
          </button>
        </form>
        <p className="text-sm text-center text-text-secondary">
          Already have an account?{' '}
          <Link href="/login" className="font-medium text-primary hover:underline">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}
