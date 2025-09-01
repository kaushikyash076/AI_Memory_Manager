'use client';

import Link from 'next/link';
import { useAuth } from '@/context/AuthContext'; // FIXED: Using path alias
import { motion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import ThemeToggle from '@/components/common/ThemeToggle'; // FIXED: Using path alias

const navItems = [
  { name: 'Dashboard', href: '/dashboard' },
  { name: 'Memories', href: '/dashboard/memories' },
  { name: 'Search', href: '/dashboard/search' },
];

export default function TopNav() {
  const { user, logout } = useAuth();
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40">
        <div className="bg-background-alt/50 backdrop-blur-lg border-b border-border p-4">
            <div className="max-w-7xl mx-auto flex justify-between items-center">
                {/* Logo and Main Navigation */}
                <div className="flex items-center gap-8">
                    <Link href="/dashboard" className="font-heading text-xl font-bold text-primary">
                        AI Memory
                    </Link>
                    <nav className="hidden md:flex items-center gap-6">
                        {navItems.map((item) => {
                           const isActive = pathname.startsWith(item.href);
                           return (
                            <Link
                              key={item.name}
                              href={item.href}
                              className={`font-sans text-sm font-semibold transition-colors duration-200 ${
                                isActive
                                  ? 'text-primary'
                                  : 'text-text-secondary hover:text-text-primary'
                              }`}
                            >
                              {item.name}
                            </Link>
                           );
                        })}
                    </nav>
                </div>

                {/* User Profile and Actions */}
                <div className="flex items-center gap-4">
                    <ThemeToggle />
                    {user && (
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center font-bold text-white">
                            {user.name.charAt(0).toUpperCase()}
                        </div>
                        <button onClick={logout} className="font-sans text-sm text-text-secondary hover:text-red-500 transition-colors">
                            Logout
                        </button>
                      </div>
                    )}
                </div>
            </div>
        </div>
    </header>
  );
}
