'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import ThemeToggle from '../common/ThemeToggle'; // Import the new component

const navLinks = [
    { name: 'Features', href: '#' },
    { name: 'Solutions', href: '#' },
    { name: 'Pricing', href: '#' },
    { name: 'About', href: '#' },
];

export default function Header() {
    return (
        <motion.header 
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.5 }}
            className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border"
        >
            <div className="max-w-7xl mx-auto px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <Link href="/" className="font-heading text-xl font-bold text-primary">
                            AI Memory
                        </Link>
                    </motion.div>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center gap-8">
                        {navLinks.map((link) => (
                            <motion.div key={link.name} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                                <Link href={link.href} className="font-sans text-text-secondary hover:text-text-primary transition-colors">
                                    {link.name}
                                </Link>
                            </motion.div>
                        ))}
                    </nav>

                    {/* Action Buttons */}
                    <div className="flex items-center gap-4">
                        <ThemeToggle /> {/* Add the toggle button here */}
                        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                            <Link href="/login" className="font-sans text-text-secondary hover:text-text-primary transition-colors">
                                Login
                            </Link>
                        </motion.div>
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                            <Link href="/register" className="font-heading block px-6 py-2 text-white bg-primary rounded-md hover:bg-primary-hover transition-colors duration-300">
                                Try It Free
                            </Link>
                        </motion.div>
                    </div>
                </div>
            </div>
        </motion.header>
    );
}
