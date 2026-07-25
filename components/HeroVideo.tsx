"use client";

import Image from "next/image";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import poster from "@/assets/omnicron_video/hero-poster.jpg";

// The hero's proof: Omnicron striking a live arc on our own floor. Framed as a
// contained object (the source is only 848px wide — never let it go full-bleed
// or it upscales), it materializes like the Omnicron photo does elsewhere:
// blur + scale resolving together, not a flat fade. Under reduced-motion we
// show the poster still instead of autoplaying.
export function HeroVideo() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const reduceMotion = useReducedMotion();

  const hidden = {
    opacity: 0,
    scale: reduceMotion ? 1 : 0.96,
    filter: reduceMotion ? "blur(0px)" : "blur(12px)",
  };
  const shown = { opacity: 1, scale: 1, filter: "blur(0px)" };

  return (
    <div className="relative mx-auto w-full max-w-[440px] lg:max-w-[560px]">
      {/* Ambient bounce from the arc's own light */}
      <motion.div
        aria-hidden
        className="absolute -inset-8 rounded-[3rem] bg-accent/15 blur-3xl"
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ type: "spring", bounce: 0, duration: 0.9, delay: 0.1 }}
      />

      <motion.div
        ref={ref}
        initial={hidden}
        animate={inView ? shown : hidden}
        transition={{ type: "spring", bounce: 0, duration: 0.7 }}
        className="relative rounded-2xl overflow-hidden bg-carbon shadow-[0_32px_80px_-24px_rgba(0,0,0,0.75)] ring-1 ring-inset ring-offwhite/12"
      >
        {reduceMotion ? (
          <Image
            src={poster}
            alt="Omnicron, a Cozmobot arm with a MIG torch, striking a live weld arc on the shop floor."
            placeholder="blur"
            quality={90}
            sizes="(min-width: 1024px) 560px, (min-width: 640px) 440px, 95vw"
            className="w-full h-auto"
          />
        ) : (
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            poster="/omnicron_video/hero-poster.jpg"
            aria-label="Omnicron welding: a Cozmobot arm strikes a live arc, sparks flying, on the shop floor."
            className="w-full h-auto block"
          >
            <source src="/omnicron_video/hero.webm" type="video/webm" />
            <source src="/omnicron_video/hero.mp4" type="video/mp4" />
          </video>
        )}

        {/* Top edge catching light, the way a real panel does */}
        <div
          aria-hidden
          className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-offwhite/30 to-transparent pointer-events-none"
        />

        {/* Caption rides a scroll-edge scrim */}
        <div className="absolute bottom-0 inset-x-0 flex items-center justify-between gap-3 bg-gradient-to-t from-carbon via-carbon/80 to-transparent px-4 pt-12 pb-4 pointer-events-none">
          <p className="text-[10px] font-mono font-medium uppercase tracking-[0.16em] text-offwhite/85">
            Omnicron · live arc, our floor
          </p>
          <span className="inline-flex items-center gap-1.5 flex-shrink-0">
            <span className="w-1.5 h-1.5 rounded-full bg-accent" />
            <span className="text-[10px] font-mono font-medium tracking-[0.16em] text-accent">
              REC
            </span>
          </span>
        </div>
      </motion.div>
    </div>
  );
}
