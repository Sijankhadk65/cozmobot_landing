"use client";

import { motion } from "framer-motion";
import { CTAButton } from "./CTAButton";
import { Bot } from "lucide-react";

const navLinks = [
  { label: "Platform", href: "#platform" },
  { label: "Capabilities", href: "#capabilities" },
  { label: "Omnicron", href: "#omnicron" },
  { label: "Architecture", href: "#architecture" },
  { label: "Any Robot", href: "#any-robot" },
];

export function Navbar() {
  return (
    <motion.header
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 bg-carbon/90 backdrop-blur-md border-b border-steel/70"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8 h-16 flex items-center justify-between">
        <a href="#" className="flex items-center gap-2.5 text-offwhite">
          <div className="w-7 h-7 bg-accent rounded-md flex items-center justify-center">
            <Bot className="w-4 h-4 text-ink" />
          </div>
          <span className="font-semibold text-lg leading-none">CozmoBot</span>
          <span className="hidden lg:inline-block text-xs text-mute border-l border-steel pl-2.5 leading-none">
            makers of nex-ON
          </span>
        </a>

        <nav className="hidden md:flex items-center gap-7">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-mute hover:text-offwhite transition-colors"
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
