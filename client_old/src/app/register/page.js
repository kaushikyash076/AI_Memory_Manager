'use client';

import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        'http://localhost:5000/api/users/register',
        { name, email, password }
      );
      console.log('Registration successful:', response.data);
      alert('Registration successful! Please log in.');
      router.push('/login');
    } catch (error) {
      console.error(
        'Registration failed:',
        error.response?.data?.message || error.message
      );
      alert(
        'Registration failed: ' +
          (error.response?.data?.message || 'Please try again.')
      );
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-background-dark text-text-light">
      <div className="w-full max-w-md p-8 space-y-6 bg-black/20 backdrop-blur-md rounded-xl border border-white/10">
        <h1 className="font-heading text-3xl font-bold text-center">
          Create Your Account
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="name"
              className="text-sm font-medium text-slate-300"
            >
              Name
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full px-3 py-2 mt-1 text-white bg-gray-700/50 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="text-sm font-medium text-slate-300"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-3 py-2 mt-1 text-white bg-gray-700/50 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="text-sm font-medium text-slate-300"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-3 py-2 mt-1 text-white bg-gray-700/50 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-3 font-bold text-white bg-primary rounded-lg hover:bg-blue-700 transition-all duration-300 shadow-lg shadow-blue-500/30"
          >
            Register
          </button>
        </form>
        <p className="text-sm text-center text-slate-400">
          Already have an account?{' '}
          <Link href="/login" className="font-medium text-primary hover:underline">
            Log In
          </Link>
        </p>
      </div>
    </div>
  );
}
