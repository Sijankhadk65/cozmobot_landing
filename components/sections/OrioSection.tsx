"use client";

import Image from "next/image";
import { SectionWrapper } from "../SectionWrapper";
import { MotionReveal } from "../MotionReveal";
import { CTAButton } from "../CTAButton";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import {
  Clock,
  CircleDashed,
  MessagesSquare,
  Search,
  Navigation,
  ArrowRight,
} from "lucide-react";
import orioHero from "@/assets/orio_hero_A.png";

// What Orio is asked to do, in the words a shopper would actually use.
const asks = [
  { icon: Search, label: "Find a product" },
  { icon: Navigation, label: "Get directions" },
  { icon: MessagesSquare, label: "Ask anything" },
];

// Orio's photo gets the same entrance as the Omnicron one: the surface
// materializes — blur and scale resolving together on a critically damped
// spring — rather than fading flat. Reduced motion neutralizes those two
// values instead of dropping the keys (useReducedMotion is null on the first
// render, so a target missing them would strand them at their hidden values).
function OrioPhoto() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const reduceMotion = useReducedMotion();

  const hidden = {
    opacity: 0,
    scale: reduceMotion ? 1 : 1.06,
    filter: reduceMotion ? "blur(0px)" : "blur(16px)",
  };
  const shown = { opacity: 1, scale: 1, filter: "blur(0px)" };

  return (
    <motion.div
      ref={ref}
      initial={hidden}
      animate={inView ? shown : hidden}
      transition={{ type: "spring", bounce: 0, duration: 0.7 }}
      className="relative h-full flex items-center p-5 xl:block xl:p-0 xl:min-h-[440px]"
    >
      {/* Below xl the column is narrow and tall; cropping a 16:9 source to fill
          it would zoom past Orio's head. So the photo is a contained 4:3 card
          there, and only goes full-bleed at xl, where the panel is near-square. */}
      <div className="relative w-full aspect-[4/3] overflow-hidden rounded-xl xl:absolute xl:inset-0 xl:aspect-auto xl:h-full xl:rounded-none">
        {/* `sizes` must describe the pixels the crop needs, not the box width:
            object-cover on a 16:9 source scales to the box's *height*, so it
            needs ~height × 1.78 of image width. */}
        <Image
          src={orioHero}
          alt="Orio, a friendly humanoid assistant robot, waiting beside a shelf in a store aisle."
          placeholder="blur"
          quality={90}
          sizes="(min-width: 1280px) 1000px, 640px"
          className="absolute inset-0 w-full h-full object-cover object-[32%_center] xl:object-[38%_center]"
        />

        {/* A shopper's question, floating in the empty aisle beside it */}
        <motion.div
          initial={{ opacity: 0, y: 8, scale: reduceMotion ? 1 : 0.96 }}
          animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ type: "spring", bounce: 0, duration: 0.5, delay: 0.35 }}
          className="absolute right-4 top-4 max-w-[56%] xl:right-5 xl:top-12 xl:max-w-[62%]"
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
      </div>
    </motion.div>
  );
}

export function OrioSection() {
  return (
    <SectionWrapper id="orio" tight>
      <MotionReveal>
        <div className="rounded-2xl border border-steel bg-graphite overflow-hidden">
          <div className="grid md:grid-cols-[0.95fr_1.05fr]">
            {/* Pitch */}
            <div className="p-8 md:p-10 order-2">
              <div className="flex flex-wrap items-center gap-3 mb-5">
                <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-accent bg-accent/10 px-3 py-1 rounded-full border border-accent/25">
                  <Clock size={12} />
                  Coming soon
                </span>
                <span className="inline-flex items-center gap-1.5 text-xs text-mute bg-carbon border border-dashed border-steel rounded-full px-2.5 py-1">
                  <CircleDashed size={11} />
                  In development
                </span>
                <span className="text-xs text-mute">
                  Powered by{" "}
                  <span className="font-semibold text-offwhite">nex-ON</span>
                </span>
              </div>

              <h2 className="font-brand text-3xl md:text-4xl font-bold text-offwhite tracking-tight">
                Orio
              </h2>
              <p className="mt-3 text-xl text-accent font-medium text-balance">
                The humanoid that helps the public.
              </p>

              <p className="mt-5 text-mute leading-relaxed">
                Omnicron puts a torch on the end of nex-ON. Orio puts a face on
                it. A humanoid built for the places the public actually stands
                in — shops, supermarkets, stations, lobbies — where the person
                who needs help is a customer, not an operator.
              </p>
              <p className="mt-4 text-mute leading-relaxed">
                Ask it where something is and it answers, points, and walks you
                there. It runs on the same{" "}
                <span className="font-semibold text-offwhite">nex-ON</span>{" "}
                brain and the same tool loop that drives Omnicron — perception,
                reasoning, and motion, directed in plain language.
              </p>

              <div className="mt-6 flex flex-wrap gap-2">
                {asks.map((ask) => (
                  <span
                    key={ask.label}
                    className="inline-flex items-center gap-1.5 text-xs text-offwhite/80 bg-carbon border border-steel rounded-full px-3 py-1.5"
                  >
                    <ask.icon size={12} className="text-accent" />
                    {ask.label}
                  </span>
                ))}
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <CTAButton href="#cta" variant="primary" icon className="text-sm px-6 py-3">
                  Talk to us about Orio
                </CTAButton>
                <a
                  href="#any-robot"
                  className="inline-flex items-center gap-1.5 text-sm text-mute hover:text-accent transition-colors"
                >
                  How one platform drives both
                  <ArrowRight size={14} />
                </a>
              </div>
            </div>

            {/* Orio, on the shop floor */}
            <div className="order-1 border-b md:border-b-0 md:border-r border-steel">
              <OrioPhoto />
            </div>
          </div>
        </div>
      </MotionReveal>
    </SectionWrapper>
  );
}
