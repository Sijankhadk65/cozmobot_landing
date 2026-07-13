"use client";

import { SectionWrapper } from "../SectionWrapper";
import { MotionReveal } from "../MotionReveal";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Mic, BrainCircuit, Eye, ShieldCheck, Play, Volume2 } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: Mic,
    title: "You speak the goal",
    subtitle: "Voice or text, hands-free",
    description:
      "Push to talk, in your own language. The session can be locked to one language so background chatter can't hijack it. An optional barge-in mode lets you interrupt the robot just by starting to talk.",
  },
  {
    number: "02",
    icon: BrainCircuit,
    title: "nex-ON reasons and chooses",
    subtitle: "Agentic tool-calling loop",
    description:
      "The model decides, mid-conversation, when to look through the camera, what to measure, when to move, and when to act. It composes the tools it needs rather than following a fixed script.",
  },
  {
    number: "03",
    icon: Eye,
    title: "It perceives the real scene",
    subtitle: "Open-vocabulary vision & measurement",
    description:
      "Ask for any object in plain words — “metal tube,” “flange,” “plate” — with no per-class training. nex-ON fuses the image with aligned depth to estimate real length, width, and distance in millimeters.",
  },
  {
    number: "04",
    icon: ShieldCheck,
    title: "It checks before it moves",
    subtitle: "Safety by construction",
    description:
      "A dry-run reachability check reports whether a move is feasible before the arm moves. Dangerous actions must be deliberately armed. Speeds default low, and per-axis motion locks constrain what can change.",
  },
  {
    number: "05",
    icon: Play,
    title: "It acts",
    subtitle: "Perception mapped to motion",
    description:
      "A calibrated hand-eye transform turns “the pixel I see” into “the exact 3D point to move to.” The robot executes against what it actually observed — not a model file.",
  },
  {
    number: "06",
    icon: Volume2,
    title: "It tells you what happened",
    subtitle: "Spoken back, immediately",
    description:
      "Replies start speaking after the first sentence while later sentences are still being generated, so it stays responsive even on long answers. The terminal shows only the conversation; diagnostics go to logs.",
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
            <span className="text-xs font-semibold text-eyebrow uppercase text-accent">
              How It Works
            </span>
            <h2 className="mt-3 text-3xl md:text-4xl font-bold text-offwhite text-title">
              A conversation,
              <br />
              not a program.
            </h2>
            <p className="mt-4 text-mute text-lg leading-relaxed">
              The operator speaks. The model decides when to look, what to
              measure, where to act, and how to move — then does it and reports
              back out loud.
            </p>

            <div className="mt-8 p-5 bg-carbon rounded-xl border border-steel">
              <p className="text-xs font-semibold text-eyebrow uppercase text-mute mb-3">
                The loop
              </p>
              <div className="space-y-2.5 font-mono text-xs">
                <div className="flex items-center gap-2 text-mute">
                  <span className="text-accent">you</span>
                  <span className="text-mute">──voice / text──▶</span>
                  <span className="text-offwhite font-semibold">nex-ON</span>
                </div>
                <div className="flex items-center gap-2 text-mute pl-4">
                  <span className="text-mute">└─ calls</span>
                  <span className="text-mute">
                    camera · robot · task logic
                  </span>
                </div>
                <div className="flex items-center gap-2 text-mute">
                  <span className="text-offwhite font-semibold">nex-ON</span>
                  <span className="text-mute">──speaks back──▶</span>
                  <span className="text-accent">you</span>
                </div>
              </div>
            </div>
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
