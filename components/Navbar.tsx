"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { CTAButton } from "./CTAButton";
import { Asterisk } from "lucide-react";
import logo from "@/assets/site-logo-lockup.png";

const navLinks: { label: string; href: string; soon?: boolean }[] = [
  { label: "Platform", href: "#platform" },
  { label: "Capabilities", href: "#capabilities" },
  { label: "Omnicron", href: "#omnicron" },
  { label: "Orio", href: "#orio", soon: true },
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
        {/* The lockup already carries the wordmark, so no text beside it. */}
        <a href="#" className="flex items-center gap-2.5 text-offwhite">
          <Image
            src={logo}
            alt="CozmoBot"
            priority
            sizes="140px"
            className="h-7 w-auto"
          />
          <span className="hidden lg:inline-block text-xs text-mute border-l border-steel pl-2.5 leading-none">
            makers of nex-ON
          </span>
        </a>

        <nav className="hidden md:flex items-center gap-5 lg:gap-7">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="relative text-sm text-mute hover:text-offwhite transition-colors"
            >
              {link.label}
              {link.soon && (
                <>
                  {/* A text `*` renders as a speck at 1×; the icon carries real
                      stroke weight, and the layered drop-shadow is the neon. */}
                  <Asterisk
                    aria-hidden
                    size={14}
                    strokeWidth={3}
                    className="absolute -top-1.5 -right-3.5 text-accent"
                    style={{
                      filter:
                        "drop-shadow(0 0 3px rgba(173,208,55,0.95)) drop-shadow(0 0 8px rgba(173,208,55,0.6))",
                    }}
                  />
                  <span className="sr-only"> — coming soon</span>
                </>
              )}
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
