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
  Cpu,
} from "lucide-react";

// Named, not explained. The list shows the breadth of what runs today; how any
// of it works belongs in a demo conversation, not on a public page.
const capabilities = [
  { icon: MessagesSquare, title: "Conversational Orchestration", highlight: true },
  { icon: Languages, title: "Multilingual Voice" },
  { icon: ScanEye, title: "Open-Vocabulary Vision" },
  { icon: Ruler, title: "Real-World Measurement" },
  { icon: Palette, title: "Color-Guided Pathing" },
  { icon: ShieldCheck, title: "Motion Safety" },
  { icon: Crosshair, title: "Hand-Eye Calibration" },
  { icon: Radio, title: "Sensor Integration" },
  { icon: Cpu, title: "On-Site Compute" },
];

export function CapabilitiesSection() {
  return (
    <SectionWrapper id="capabilities">
      <MotionReveal>
        <div className="text-center max-w-2xl mx-auto mb-6">
          <span className="text-xs font-semibold tracking-widest uppercase text-mute">
            Platform Capabilities
          </span>
          <h2 className="mt-3 text-3xl md:text-4xl font-bold text-offwhite tracking-tight">
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
              className={`relative h-full flex items-center gap-3.5 p-5 rounded-xl border transition-colors duration-200 ${
                c.highlight
                  ? "bg-accent text-ink border-accent"
                  : "bg-graphite border-steel hover:border-accent/40"
              }`}
            >
              <div
                className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 ${
                  c.highlight ? "bg-ink/10" : "bg-accent/10 border border-accent/20"
                }`}
              >
                <c.icon
                  className={c.highlight ? "text-ink" : "text-accent"}
                  size={18}
                />
              </div>
              <h3
                className={`font-semibold text-sm leading-snug ${
                  c.highlight ? "text-ink" : "text-offwhite"
                }`}
              >
                {c.title}
              </h3>
            </motion.div>
          </MotionReveal>
        ))}
      </div>
    </SectionWrapper>
  );
}
