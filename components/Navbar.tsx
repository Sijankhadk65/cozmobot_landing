"use client";

import { motion } from "framer-motion";
import { CTAButton } from "./CTAButton";
import { Bot } from "lucide-react";

const navLinks = [
  { label: "Solution", href: "#solution" },
  { label: "Features", href: "#features" },
  { label: "Architecture", href: "#architecture" },
  { label: "Industries", href: "#industries" },
];

export function Navbar() {
  return (
    <motion.header
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-200/80"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8 h-16 flex items-center justify-between">
        <a href="#" className="flex items-center gap-2 font-semibold text-gray-900 text-lg">
          <div className="w-7 h-7 bg-[#1a5fb4] rounded-md flex items-center justify-center">
            <Bot className="w-4 h-4 text-white" />
          </div>
          CozmoBot
        </a>

        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <CTAButton href="#cta" variant="primary" className="hidden sm:inline-flex text-xs px-4 py-2">
          Book Demo
        </CTAButton>
      </div>
    </motion.header>
  );
}
