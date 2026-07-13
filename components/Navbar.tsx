"use client";

import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { useState } from "react";
import { CTAButton } from "./CTAButton";
import { Bot } from "lucide-react";
import { spring } from "@/lib/motion";

const navLinks = [
  { label: "Platform", href: "#platform" },
  { label: "Capabilities", href: "#capabilities" },
  { label: "Omnicron", href: "#omnicron" },
  { label: "Architecture", href: "#architecture" },
  { label: "Any Robot", href: "#any-robot" },
];

export function Navbar() {
  // The bar floats over the hero as near-clear glass, then materializes into a
  // heavier, more opaque surface once content begins scrolling underneath it —
  // a scroll edge, not a hard 1px divider that's always on.
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  useMotionValueEvent(scrollY, "change", (y) => setScrolled(y > 24));

  return (
    <motion.header
      initial={{ opacity: 0, y: -14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={spring}
      className="fixed top-0 left-0 right-0 z-50"
    >
      <motion.div
        className="glass"
        // Bright top edge = light catching a real material; the shadow only
        // arrives with the material, keeping the flow uninterrupted at rest.
        animate={{
          backgroundColor: scrolled
            ? "rgba(15,17,18,0.72)"
            : "rgba(15,17,18,0.28)",
          boxShadow: scrolled
            ? "inset 0 1px 0 rgba(245,243,240,0.07), 0 8px 30px rgba(0,0,0,0.35)"
            : "inset 0 1px 0 rgba(245,243,240,0.04), 0 0 0 rgba(0,0,0,0)",
        }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        style={{
          backdropFilter: "blur(20px) saturate(180%)",
          WebkitBackdropFilter: "blur(20px) saturate(180%)",
        }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8 h-16 flex items-center justify-between">
          <a href="#" className="flex items-center gap-2.5 text-offwhite">
            <div className="w-7 h-7 bg-accent rounded-md flex items-center justify-center">
              <Bot className="w-4 h-4 text-ink" />
            </div>
            <span className="font-semibold text-lg leading-none tracking-[-0.01em]">
              CozmoBot
            </span>
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

          <CTAButton
            href="#cta"
            variant="primary"
            className="hidden sm:inline-flex text-xs px-4 py-2"
          >
            Book Demo
          </CTAButton>
        </div>
      </motion.div>
    </motion.header>
  );
}
