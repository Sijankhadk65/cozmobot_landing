"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Fragment, useEffect, useState } from "react";
import { AnimatePresence, motion, type Variants } from "framer-motion";
import { Asterisk } from "lucide-react";

// The site is a full-bleed experience with no bar, so navigation lives behind a
// single floating toggle: the button stays visible, and opening it takes over
// the whole screen with the product names set large. Just the two routes for now.
const links: { label: string; href: string; soon?: boolean }[] = [
  { label: "Platform", href: "/platform" },
  { label: "Omnicron", href: "/omnicron" },
  { label: "Orio", href: "/orio", soon: true },
];

// Neon asterisk flagging a not-yet-shipped link — a leading superscript (`*Orio`)
// sitting at the top of the big display line.
function SoonMark() {
  return (
    <>
      <Asterisk
        aria-hidden
        size={22}
        strokeWidth={3}
        // em-based so the superscript stays proportional to the link text at
        // every breakpoint, sitting just below the cap-top.
        className="text-accent mt-[0.15em] mr-1 shrink-0 w-[0.4em] h-[0.4em]"
        style={{
          filter:
            "drop-shadow(0 0 4px rgba(173,208,55,0.95)) drop-shadow(0 0 12px rgba(173,208,55,0.6))",
        }}
      />
      <span className="sr-only"> — coming soon</span>
    </>
  );
}

// Stagger the big items in after the overlay lands.
const list: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07, delayChildren: 0.08 } },
};
const item: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: "easeOut" } },
};

export function Menu() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // While open: close on Escape and lock background scroll, restoring the prior
  // overflow on close.
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
    <>
      {/* Trigger sits above the overlay so it can also close it. Its own dark
          chip keeps it legible on both the light hero and the dark overlay. */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        aria-controls="fullscreen-menu"
        className="fixed top-4 right-4 z-[60] flex items-center justify-center w-11 h-11 rounded-full border border-steel/60 bg-carbon/85 backdrop-blur-md text-offwhite hover:border-accent/70 transition-colors"
      >
        {/* Three bars that morph into an X: the outer bars slide to the centre
            and cross, the middle bar collapses away. */}
        <span aria-hidden className="relative block h-4 w-[18px]">
          <motion.span
            className="absolute left-0 top-0 block h-0.5 w-full rounded-full bg-current"
            animate={open ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
          />
          <motion.span
            className="absolute left-0 top-[7px] block h-0.5 w-full rounded-full bg-current"
            animate={open ? { opacity: 0, scaleX: 0.3 } : { opacity: 1, scaleX: 1 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
          />
          <motion.span
            className="absolute left-0 top-[14px] block h-0.5 w-full rounded-full bg-current"
            animate={open ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
          />
        </span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            id="fullscreen-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            // Frosted glass in the hero's light tone: semi-transparent so the
            // page behind blurs through.
            style={{ backgroundColor: "rgba(244,244,238,0.7)" }}
            className="fixed inset-0 z-50 backdrop-blur-2xl"
          >
            <div className="flex h-full w-full items-center justify-center px-6">
              {/* fit-content, so the column (and the full-width dividers) is as
                  wide as the widest item. */}
              <motion.nav
                variants={list}
                initial="hidden"
                animate="show"
                className="flex w-fit flex-col items-center gap-4 md:gap-6"
              >
                {links.map((link, i) => {
                  const active =
                    pathname === link.href ||
                    pathname.startsWith(`${link.href}/`);
                  return (
                  <Fragment key={link.href}>
                    <motion.div variants={item}>
                      <Link
                        href={link.href}
                        onClick={() => setOpen(false)}
                        aria-current={active ? "page" : undefined}
                        className={`inline-flex items-start font-brand text-5xl sm:text-6xl md:text-7xl xl:text-8xl font-bold uppercase tracking-tight transition-colors ${
                          active
                            ? "text-accent"
                            : "text-[#141414] hover:text-accent"
                        }`}
                      >
                        {link.soon && <SoonMark />}
                        {link.label}
                      </Link>
                    </motion.div>
                    {i < links.length - 1 && (
                      <motion.div
                        variants={item}
                        aria-hidden
                        className="h-px w-full bg-[#141414]/15"
                      />
                    )}
                  </Fragment>
                  );
                })}
              </motion.nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
