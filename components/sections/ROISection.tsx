"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { SectionWrapper } from "../SectionWrapper";
import { MotionReveal } from "../MotionReveal";
import { CTAButton } from "../CTAButton";
import {
  MessagesSquare,
  Repeat,
  ShieldCheck,
  Layers,
  UserCheck,
  Blocks,
  X,
} from "lucide-react";

const BRAND = "#add037";

// ── The deployment path, before and after ─────────────────────────────────────
const before = [
  "Hire a specialist",
  "Model the part",
  "Write the program",
  "Jog the waypoints",
  "Test the cell",
  "Reprogram on change",
];

const after = ["Describe the goal", "Rehearse dry", "Arm and run"];

// ── Outcomes ──────────────────────────────────────────────────────────────────
const outcomes = [
  { icon: MessagesSquare, title: "No programming step" },
  { icon: UserCheck, title: "No specialist required" },
  { icon: Repeat, title: "Adapts to the real scene" },
  { icon: ShieldCheck, title: "Rehearse before you commit" },
  { icon: Blocks, title: "Low integration cost" },
  { icon: Layers, title: "Every tool compounds" },
];

// ── Step chip ─────────────────────────────────────────────────────────────────
function Chip({
  label,
  struck,
  index,
  inView,
}: {
  label: string;
  struck?: boolean;
  index: number;
  inView: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.35, delay: index * 0.07 }}
      className="flex items-center gap-1.5"
    >
      <div
        className={`relative flex items-center gap-2 rounded-lg border px-3 py-2 text-xs whitespace-nowrap ${
          struck
            ? "border-dashed border-steel bg-carbon text-mute"
            : "border-accent/40 bg-accent/10 text-accent font-medium"
        }`}
      >
        {struck && <X size={11} className="text-mute flex-shrink-0" />}
        <span className={struck ? "line-through decoration-steel" : ""}>
          {label}
        </span>
      </div>
    </motion.div>
  );
}

function Track({
  heading,
  steps,
  struck,
  count,
  note,
}: {
  heading: string;
  steps: string[];
  struck?: boolean;
  count: number;
  note: string;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <div ref={ref} className="flex-1">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span
            className={`w-2 h-2 rounded-full ${
              struck ? "bg-steel" : "bg-accent"
            }`}
          />
          <span
            className={`text-xs font-semibold tracking-widest uppercase ${
              struck ? "text-mute" : "text-accent"
            }`}
          >
            {heading}
          </span>
        </div>
        <span
          className={`text-xs ${struck ? "text-mute" : "text-accent"}`}
        >
          {note}
        </span>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        {steps.map((s, i) => (
          <Chip key={s} label={s} struck={struck} index={i} inView={inView} />
        ))}
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ delay: 0.5 }}
        className="mt-5 flex items-baseline gap-2"
      >
        <span
          className={`text-4xl font-bold ${
            struck ? "text-mute" : "text-accent"
          }`}
        >
          {count}
        </span>
        <span className="text-xs text-mute">steps to deploy</span>
      </motion.p>
    </div>
  );
}

export function ROISection() {
  return (
    <SectionWrapper id="operations">
      {/* Headline */}
      <MotionReveal>
        <div className="max-w-xl mb-14">
          <span className="text-xs font-semibold tracking-widest uppercase text-mute">
            Operations
          </span>
          <h2 className="mt-3 text-3xl md:text-4xl font-bold text-offwhite tracking-tight leading-tight">
            What actually changes
            <br />
            on the floor.
          </h2>
          <p className="mt-4 text-mute text-lg leading-relaxed">
            Steps disappear from the deployment path.
          </p>
        </div>
      </MotionReveal>

      {/* The two tracks */}
      <MotionReveal>
        <div className="rounded-2xl border border-steel bg-graphite p-6 md:p-10 mb-6">
          <div className="flex flex-col lg:flex-row gap-10 lg:gap-12">
            <Track
              heading="Program the robot"
              steps={before}
              struck
              count={before.length}
              note="Specialist required"
            />
            <div className="hidden lg:block w-px bg-steel" />
            <Track
              heading="Talk to the robot"
              steps={after}
              count={after.length}
              note="Any operator"
            />
          </div>
        </div>
      </MotionReveal>

      {/* Outcomes strip */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mb-16">
        {outcomes.map((o, i) => (
          <MotionReveal key={o.title} delay={i * 0.06}>
            <motion.div
              whileHover={{ y: -3 }}
              transition={{ duration: 0.18 }}
              className="h-full flex flex-col items-center text-center gap-3 rounded-xl border border-steel bg-graphite px-3 py-5 hover:border-accent/40 transition-all"
            >
              <div className="w-9 h-9 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center">
                <o.icon size={16} style={{ color: BRAND }} />
              </div>
              <p className="text-xs font-medium text-offwhite leading-snug">
                {o.title}
              </p>
            </motion.div>
          </MotionReveal>
        ))}
      </div>

      {/* Closing band */}
      <MotionReveal>
        <div className="grid md:grid-cols-[1fr_auto] gap-8 items-center p-8 bg-graphite rounded-2xl border border-steel">
          <p className="text-lg font-semibold text-offwhite leading-snug max-w-lg">
            Start with a single cell. The tools you register there are the same
            tools the next robot calls.
          </p>
          <div className="flex flex-col sm:flex-row md:flex-col gap-3 flex-shrink-0">
            <CTAButton href="#cta" variant="primary" icon className="text-sm px-6 py-3">
              Discuss Deployment
            </CTAButton>
            <CTAButton href="#cta" variant="secondary" className="text-sm px-6 py-3">
              Book Technical Demo
            </CTAButton>
          </div>
        </div>
      </MotionReveal>
    </SectionWrapper>
  );
}
