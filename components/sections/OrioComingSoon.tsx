"use client";

import Image from "next/image";
import Link from "next/link";
import { SectionWrapper } from "../SectionWrapper";
import { CTAButton } from "../CTAButton";
import { motion, useReducedMotion } from "framer-motion";
import {
  Clock,
  CircleDashed,
  MessagesSquare,
  Search,
  Navigation,
  ArrowRight,
  Bell,
} from "lucide-react";
import orioHero from "@/assets/orio_hero_A.png";

// What Orio is asked to do, in the words a shopper would actually use.
const asks = [
  { icon: Search, label: "Find a product" },
  { icon: Navigation, label: "Get directions" },
  { icon: MessagesSquare, label: "Ask anything" },
];

// The photo materializes — blur and scale resolving together on a critically
// damped spring — rather than fading flat. Reduced motion neutralizes those two
// values (useReducedMotion is null on the first render, so a target missing
// them would strand them at their hidden values).
function OrioPhoto() {
  const reduceMotion = useReducedMotion();

  const hidden = {
    opacity: 0,
    scale: reduceMotion ? 1 : 1.06,
    filter: reduceMotion ? "blur(0px)" : "blur(16px)",
  };
  const shown = { opacity: 1, scale: 1, filter: "blur(0px)" };

  return (
    <motion.div
      initial={hidden}
      animate={shown}
      transition={{ type: "spring", bounce: 0, duration: 0.7, delay: 0.15 }}
      className="relative w-full aspect-[4/3] lg:aspect-[5/4] overflow-hidden rounded-2xl ring-1 ring-inset ring-offwhite/12 bg-carbon shadow-[0_32px_80px_-24px_rgba(0,0,0,0.75)]"
    >
      <Image
        src={orioHero}
        alt="Orio, a friendly wheeled assistant robot, waiting beside a shelf in a store aisle."
        placeholder="blur"
        priority
        quality={90}
        sizes="(min-width: 1024px) 560px, 95vw"
        className="absolute inset-0 w-full h-full object-cover object-[35%_center]"
      />

      {/* A shopper's question, floating in the empty aisle beside it */}
      <motion.div
        initial={{ opacity: 0, y: 8, scale: reduceMotion ? 1 : 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ type: "spring", bounce: 0, duration: 0.5, delay: 0.5 }}
        className="absolute right-4 top-4 max-w-[62%]"
      >
        <div className="rounded-2xl rounded-bl-md bg-carbon/90 backdrop-blur-md ring-1 ring-inset ring-offwhite/15 shadow-[0_16px_40px_-12px_rgba(0,0,0,0.6)] px-4 py-3">
          <p className="text-sm text-offwhite leading-snug">
            &ldquo;Where do you keep the olive oil?&rdquo;
          </p>
          <p className="mt-1.5 text-[10px] font-mono uppercase tracking-[0.16em] text-accent">
            Aisle 7 — I&apos;ll show you
          </p>
        </div>
      </motion.div>

      {/* Caption on a scrim, not a hard divider */}
      <div className="absolute bottom-0 inset-x-0 flex items-center justify-between gap-3 bg-gradient-to-t from-carbon via-carbon/75 to-transparent px-5 pt-12 pb-4">
        <p className="text-[10px] font-mono font-medium uppercase tracking-[0.16em] text-offwhite/85">
          Orio · in-store assistant
        </p>
        <span className="inline-flex items-center gap-1.5 flex-shrink-0">
          <span className="w-1.5 h-1.5 rounded-full bg-accent" />
          <span className="text-[10px] font-mono font-medium tracking-[0.16em] text-accent">
            CONCEPT
          </span>
        </span>
      </div>
    </motion.div>
  );
}

export function OrioComingSoon() {
  return (
    <SectionWrapper className="bg-carbon">
      <div className="grid lg:grid-cols-[1fr_1fr] gap-12 lg:gap-16 items-center">
        {/* Pitch */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-accent bg-accent/10 px-3 py-1 rounded-full border border-accent/25">
              <Clock size={12} />
              Coming soon
            </span>
            <span className="inline-flex items-center gap-1.5 text-xs text-mute bg-graphite border border-dashed border-steel rounded-full px-2.5 py-1">
              <CircleDashed size={11} />
              In development
            </span>
            <span className="text-xs text-mute">
              Powered by{" "}
              <span className="font-semibold text-offwhite">nex-ON</span>
            </span>
          </div>

          <h1 className="font-brand text-5xl md:text-6xl font-bold text-offwhite tracking-tight">
            Orio
          </h1>
          <p className="mt-4 text-xl md:text-2xl text-accent font-medium text-balance">
            The robot that helps the public.
          </p>

          <p className="mt-6 text-lg text-mute leading-relaxed max-w-xl">
            Omnicron puts a torch on the end of nex-ON. Orio gives it a face and
            a set of wheels — a mobile robot built for the places the public
            actually stands in: shops, supermarkets, stations, and lobbies,
            where the person who needs help is a customer, not an operator.
          </p>
          <p className="mt-4 text-mute leading-relaxed max-w-xl">
            Ask it where something is and it answers, then leads you to it. It
            runs on the same{" "}
            <span className="font-semibold text-offwhite">nex-ON</span> brain and
            the same tool loop that drives Omnicron — perception, reasoning, and
            motion, directed in plain language.
          </p>

          <div className="mt-7 flex flex-wrap gap-2">
            {asks.map((ask) => (
              <span
                key={ask.label}
                className="inline-flex items-center gap-1.5 text-xs text-offwhite/80 bg-graphite border border-steel rounded-full px-3 py-1.5"
              >
                <ask.icon size={12} className="text-accent" />
                {ask.label}
              </span>
            ))}
          </div>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <CTAButton href="#cta" variant="primary" className="text-sm px-6 py-3">
              <Bell size={15} />
              Notify me when it ships
            </CTAButton>
            <Link
              href="/#any-robot"
              className="inline-flex items-center gap-1.5 text-sm text-mute hover:text-accent transition-colors"
            >
              How one platform drives both
              <ArrowRight size={14} />
            </Link>
          </div>
        </motion.div>

        {/* Orio, on the shop floor */}
        <div className="lg:pl-6">
          <OrioPhoto />
        </div>
      </div>
    </SectionWrapper>
  );
}
