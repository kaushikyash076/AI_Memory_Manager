'use client';

import Link from 'next/link';
import { useAuth } from '../../context/AuthContext';
import { motion } from 'framer-motion';
import { usePathname } from 'next/navigation';

const navItems = [
  { name: 'Dashboard', href: '/dashboard', icon: '' },
  { name: 'Memories', href: '/dashboard/memories', icon: '' },
  { name: 'Search', href: '/dashboard/search', icon: '' },
];

export default function Sidebar() {
  const { user, logout } = useAuth();
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-black/30 backdrop-blur-lg p-6 flex flex-col justify-between border-r border-white/10">
      <div>
        <h1 className="text-2xl font-bold mb-10 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500">
          AI Memory
        </h1>
        <nav>
          <ul>
            {navItems.map((item) => {
               const isActive = pathname === item.href;
               return (
                <li key={item.name} className="mb-2">
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Link
                      href={item.href}
                      className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-colors duration-200 ${
                        isActive
                          ? 'bg-cyan-400/20 text-cyan-300'
                          : 'text-slate-300 hover:bg-white/10 hover:text-white'
                      }`}
                    >
                      <span>{item.icon}</span>
                      <span>{item.name}</span>
                    </Link>
                  </motion.div>
                </li>
               );
            })}
          </ul>
        </nav>
      </div>
      <div>
        {user && (
          <p className="text-sm text-slate-400 mb-4 truncate">
            Logged in as {user.name}
          </p>
        )}
        <motion.button
          onClick={logout}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-full px-4 py-2 font-bold text-white bg-gradient-to-r from-pink-500 to-red-500 rounded-lg hover:from-pink-600 hover:to-red-600"
        >
          Logout
        </motion.button>
      </div>
    </aside>
  );
}