"use client";
import { useState } from 'react';
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";
import { GithubIcon, LinkIcon } from "lucide-react"; // or use heroicons equivalents
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from 'framer-motion';

export default function HeaderBar() {
    const pathname = usePathname();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    return (
        <div className="relative">
            <div className="flex items-center justify-between mb-8 px-4">
                {/* Left: Logo */}
                <h1 className="text-3xl font-bold font-luckiest">PC</h1>

                {/* Center: Nav Links (hidden on mobile) */}
                <div className="hidden md:flex gap-8">
                    {[
                        { path: '/', name: 'HOME' },
                        { path: '/pantry', name: 'PANTRY' },
                        { path: '/recipes', name: 'RECIPES' },
                        { path: '/about', name: 'ABOUT' }
                    ].map((link) => (
                        <Link
                            key={link.path}
                            href={link.path}
                            className={`relative cursor-pointer hover:text-gray-600 ${pathname === link.path ? 'text-black' : ''
                                }`}
                        >
                            {link.name}
                            {pathname === link.path && (
                                <div className="absolute bottom-[-6px] left-0 right-0 h-[2px] bg-black mx-auto w-4/5"></div>
                            )}
                        </Link>
                    ))}
                </div>

                {/* Right: Icons */}
                <div className="flex items-center gap-4">
                    {/* GitHub and Link icons (desktop) */}
                    <div className="hidden md:flex gap-4">
                        <a href="https://github.com/yourusername/pantrychef" target="_blank" rel="noopener noreferrer">
                            <GithubIcon className="w-6 h-6 cursor-pointer hover:text-gray-600" />
                        </a>
                        <a href="https://your-deployed-app.com" target="_blank" rel="noopener noreferrer">
                            <LinkIcon className="w-6 h-6 cursor-pointer hover:text-gray-600" />
                        </a>
                    </div>

                    {/* Mobile menu button (hidden on desktop) */}
                    <button
                        onClick={toggleMobileMenu}
                        className="md:hidden p-1 focus:outline-none"
                        aria-label="Toggle menu"
                    >
                        <AnimatePresence mode="wait">
                            {isMobileMenuOpen ? (
                                <motion.div
                                    key="close"
                                    initial={{ rotate: 90, opacity: 0 }}
                                    animate={{ rotate: 0, opacity: 1 }}
                                    exit={{ rotate: -90, opacity: 0 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <XMarkIcon className="w-6 h-6" />
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="menu"
                                    initial={{ rotate: -90, opacity: 0 }}
                                    animate={{ rotate: 0, opacity: 1 }}
                                    exit={{ rotate: 90, opacity: 0 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <Bars3Icon className="w-6 h-6" />
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </button>
                </div>
            </div>

            {/* Mobile Menu (shown when isMobileMenuOpen is true) */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                        className="md:hidden overflow-hidden"
                    >
                        <div className="flex flex-col gap-4 px-4 pb-4">
                            {[
                                { path: '/', name: 'HOME' },
                                { path: '/recipes', name: 'RECIPES' },
                                { path: '/about', name: 'ABOUT' }
                            ].map((link) => (
                                <Link
                                    key={link.path}
                                    href={link.path}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className={`py-2 px-3 rounded hover:bg-gray-100 ${pathname === link.path ? 'font-bold text-black' : 'text-gray-700'
                                        }`}
                                >
                                    {link.name}
                                </Link>
                            ))}
                            <div className="flex gap-4 pt-2">
                                <a href="https://github.com/yourusername/pantrychef" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-gray-700 hover:text-black">
                                    <GithubIcon className="w-5 h-5" />
                                    GitHub
                                </a>
                                <a href="https://your-deployed-app.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-gray-700 hover:text-black">
                                    <LinkIcon className="w-5 h-5" />
                                    Live Demo
                                </a>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}