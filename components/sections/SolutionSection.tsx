"use client";

import { SectionWrapper } from "../SectionWrapper";
import { MotionReveal } from "../MotionReveal";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Mic, ShieldCheck, Play } from "lucide-react";

// Deliberately high level. This page is for buyers, not implementers — it says
// what the loop does, never how it is built.
const steps = [
  {
    number: "01",
    icon: Mic,
    title: "You say what you want",
    subtitle: "Plain language",
    description:
      "Describe the job the way you'd describe it to a colleague. No teach pendant, no program, no CAD model.",
  },
  {
    number: "02",
    icon: ShieldCheck,
    title: "It rehearses first",
    subtitle: "Nothing energized",
    description:
      "nex-ON looks at the real scene, works out the job, and runs it dry so you can watch the motion before anything is live.",
  },
  {
    number: "03",
    icon: Play,
    title: "You arm it, and it runs",
    subtitle: "Then tells you how it went",
    description:
      "Give the word and it does the work against what it actually sees — then reports back out loud.",
  },
];

function StepCard({
  step,
  index,
  isLast,
}: {
  step: (typeof steps)[0];
  index: number;
  isLast: boolean;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  const ACCENT = "#add037";

  return (
    <div ref={ref} className="flex gap-6 md:gap-8">
      {/* Left: number + line */}
      <div className="flex flex-col items-center">
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={isInView ? { scale: 1, opacity: 1 } : {}}
          transition={{ duration: 0.4, delay: index * 0.1 }}
          className="w-10 h-10 rounded-full border-2 flex items-center justify-center font-bold text-sm flex-shrink-0"
          style={{ borderColor: ACCENT, color: ACCENT }}
        >
          {step.number}
        </motion.div>
        {!isLast && (
          <motion.div
            initial={{ scaleY: 0 }}
            animate={isInView ? { scaleY: 1 } : {}}
            transition={{ duration: 0.6, delay: index * 0.1 + 0.3 }}
            className="w-px flex-1 mt-2 origin-top"
            style={{ backgroundColor: "#323333", minHeight: "40px" }}
          />
        )}
      </div>

      {/* Right: content */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.5, delay: index * 0.1 + 0.1 }}
        className="pb-12 flex-1"
      >
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-lg bg-accent/10 border border-accent/25 flex items-center justify-center flex-shrink-0">
            <step.icon className="w-5 h-5 text-accent" />
          </div>
          <div>
            <p className="text-sm font-semibold text-accent">
              {step.subtitle}
            </p>
            <h3 className="text-xl font-bold text-offwhite mt-0.5">
              {step.title}
            </h3>
          </div>
        </div>
        <p className="mt-4 text-mute leading-relaxed max-w-xl text-base">
          {step.description}
        </p>
      </motion.div>
    </div>
  );
}

export function SolutionSection() {
  return (
    <SectionWrapper id="how" className="bg-graphite">
      <div className="grid md:grid-cols-2 gap-16 items-start">
        {/* Left sticky label */}
        <div className="md:sticky md:top-24">
          <MotionReveal>
            <span className="text-xs font-semibold tracking-widest uppercase text-accent">
              How It Works
            </span>
            <h2 className="mt-3 text-3xl md:text-4xl font-bold text-offwhite tracking-tight">
              A conversation,
              <br />
              not a program.
            </h2>
            <p className="mt-4 text-mute text-lg leading-relaxed">
              You describe the outcome you want. nex-ON figures out the rest,
              rehearses it safely, and runs it once you say go.
            </p>
          </MotionReveal>
        </div>

        {/* Right: steps */}
        <div className="pt-2">
          {steps.map((step, i) => (
            <StepCard
              key={step.number}
              step={step}
              index={i}
              isLast={i === steps.length - 1}
            />
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
