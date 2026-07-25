"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { CTAButton } from "./CTAButton";
import { Asterisk, Menu, X } from "lucide-react";
import logo from "@/assets/site-logo-lockup.png";

const navLinks: { label: string; href: string; soon?: boolean }[] = [
  { label: "Platform", href: "#platform" },
  { label: "Capabilities", href: "#capabilities" },
  { label: "Omnicron", href: "#omnicron" },
  { label: "Orio", href: "#orio", soon: true },
  { label: "Architecture", href: "#architecture" },
  { label: "Any Robot", href: "#any-robot" },
  { label: "FAQ", href: "#faq" },
];

// The neon asterisk that flags a not-yet-shipped link. A text `*` renders as a
// speck; the icon carries real stroke weight, and the layered drop-shadow is
// the glow. Shared by the desktop bar and the mobile sheet.
function SoonMark() {
  return (
    <>
      <Asterisk
        aria-hidden
        size={14}
        strokeWidth={3}
        className="text-accent"
        style={{
          filter:
            "drop-shadow(0 0 3px rgba(173,208,55,0.95)) drop-shadow(0 0 8px rgba(173,208,55,0.6))",
        }}
      />
      <span className="sr-only"> — coming soon</span>
    </>
  );
}

export function Navbar() {
  const [open, setOpen] = useState(false);

  // Close on Escape and lock body scroll while the sheet is open — same
  // approach as the Omnicron lightbox, restoring the prior overflow value.
  useEffect(() => {
    if (!open) return;

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKeyDown);

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

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
                <span className="absolute -top-1.5 -right-3.5">
                  <SoonMark />
                </span>
              )}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <CTAButton
            href="#cta"
            variant="primary"
            className="hidden sm:inline-flex text-xs px-4 py-2"
          >
            Book Demo
          </CTAButton>

          {/* Mobile toggle — the desktop nav is hidden below md, so without this
              phones would have no navigation at all. */}
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-nav"
            className="md:hidden inline-flex items-center justify-center w-10 h-10 -mr-2 rounded-lg text-offwhite hover:bg-steel/40 transition-colors"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <>
            {/* Scrim over the page below the bar */}
            <motion.button
              type="button"
              aria-hidden
              tabIndex={-1}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setOpen(false)}
              className="md:hidden fixed inset-x-0 top-16 bottom-0 -z-10 bg-carbon/70 backdrop-blur-sm cursor-default"
            />

            <motion.nav
              id="mobile-nav"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="md:hidden border-t border-steel/70 bg-carbon/95 backdrop-blur-md"
            >
              <ul className="max-w-7xl mx-auto px-6 py-4 flex flex-col">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className="flex items-center gap-1 py-3 text-base text-offwhite/90 hover:text-accent border-b border-steel/40 transition-colors"
                    >
                      {link.label}
                      {link.soon && <SoonMark />}
                    </a>
                  </li>
                ))}
                <li className="pt-4">
                  <CTAButton
                    href="#cta"
                    variant="primary"
                    icon
                    onClick={() => setOpen(false)}
                    className="w-full justify-center text-sm"
                  >
                    Book a Demo
                  </CTAButton>
                </li>
              </ul>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
