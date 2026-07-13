"use client";

import { SectionWrapper } from "../SectionWrapper";
import { MotionReveal } from "../MotionReveal";
import { motion } from "framer-motion";
import {
  MessagesSquare,
  Languages,
  ScanEye,
  Ruler,
  Palette,
  ShieldCheck,
  Crosshair,
  Radio,
  Terminal,
} from "lucide-react";

const capabilities = [
  {
    icon: MessagesSquare,
    title: "Conversational Orchestration",
    description:
      "nex-ON runs an agentic tool-calling loop — choosing mid-conversation when to look, move, and act, then narrating the result.",
    highlight: true,
  },
  {
    icon: Languages,
    title: "Voice In and Out, Multilingual",
    description:
      "Push-to-talk recognition and streamed speech. Lock a session to a single language so background chatter can't hijack it. Optional barge-in to interrupt.",
  },
  {
    icon: ScanEye,
    title: "Open-Vocabulary Vision",
    description:
      "Ask for any object in plain words — no per-class training. The detection backend is a swappable interface.",
  },
  {
    icon: Ruler,
    title: "Real-World Measurement",
    description:
      "Fuses image, aligned depth, and camera intrinsics to estimate a part's length, width, and distance in millimeters.",
  },
  {
    icon: Palette,
    title: "Color-Guided Pathing",
    description:
      "Detects red markers, dots, and drawn or taped lines by color, then moves to or traces them — including shortest-path multi-target routes.",
  },
  {
    icon: ShieldCheck,
    title: "Motion Safety Throughout",
    description:
      "Separate working and positioning speeds, per-axis motion locks, and a dry-run reachability check before the arm moves.",
  },
  {
    icon: Crosshair,
    title: "Hand-Eye Calibration",
    description:
      "A calibrated camera-to-robot transform turns the pixel it sees into the exact 3D point to move to.",
  },
  {
    icon: Radio,
    title: "Sensor Integration",
    description:
      "Depth and image streams register as tools the reasoning loop can call. New sensors join the same way.",
  },
  {
    icon: Terminal,
    title: "Operator-Friendly Runtime",
    description:
      "The terminal shows only the clean conversation. All diagnostics stream to timestamped logs.",
  },
];

export function CapabilitiesSection() {
  return (
    <SectionWrapper id="capabilities">
      <MotionReveal>
        <div className="text-center max-w-2xl mx-auto mb-6">
          <span className="text-xs font-semibold text-eyebrow uppercase text-mute">
            Platform Capabilities
          </span>
          <h2 className="mt-3 text-3xl md:text-4xl font-bold text-offwhite text-title">
            Everything below
            <br />
            is running today
          </h2>
        </div>
      </MotionReveal>

      <MotionReveal delay={0.1}>
        <div className="flex justify-center mb-16">
          <div className="inline-flex items-center gap-2 text-xs bg-accent/10 text-accent border border-accent/30 rounded-full px-4 py-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-accent" />
            Implemented and proven on a real collaborative arm
          </div>
        </div>
      </MotionReveal>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {capabilities.map((c, i) => (
          <MotionReveal key={c.title} delay={i * 0.05}>
            <motion.div
              whileHover={{ y: -4, boxShadow: "0 8px 24px rgba(0,0,0,0.45)" }}
              transition={{ duration: 0.2 }}
              className={`relative h-full p-5 rounded-xl border transition-colors duration-200 ${
                c.highlight
                  ? "bg-accent text-ink border-accent"
                  : "bg-graphite border-steel hover:border-accent/40"
              }`}
            >
              <div
                className={`w-9 h-9 rounded-lg flex items-center justify-center mb-4 ${
                  c.highlight ? "bg-ink/10" : "bg-accent/10 border border-accent/20"
                }`}
              >
                <c.icon
                  className={c.highlight ? "text-ink" : "text-accent"}
                  size={18}
                />
              </div>
              <h3
                className={`font-semibold text-sm mb-1.5 ${
                  c.highlight ? "text-ink" : "text-offwhite"
                }`}
              >
                {c.title}
              </h3>
              <p
                className={`text-xs leading-relaxed ${
                  c.highlight ? "text-ink/80" : "text-mute"
                }`}
              >
                {c.description}
              </p>
            </motion.div>
          </MotionReveal>
        ))}
      </div>
    </SectionWrapper>
  );
}
