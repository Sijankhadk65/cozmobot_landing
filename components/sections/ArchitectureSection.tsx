"use client";

import { SectionWrapper } from "../SectionWrapper";
import { MotionReveal } from "../MotionReveal";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  Eye,
  Radio,
  Move3d,
  Wrench,
  Plus,
  BrainCircuit,
  Mic,
} from "lucide-react";

const tools = [
  { icon: Eye, label: "Vision", sub: "Detection", color: "#add037" },
  { icon: Radio, label: "Sensors", sub: "Integration", color: "#add037" },
  { icon: Move3d, label: "Motion", sub: "IK & control", color: "#add037" },
  { icon: Wrench, label: "Tooling", sub: "End-effector", color: "#add037" },
  { icon: Plus, label: "New tool", sub: "Extensible", color: "#8c8c89", dashed: true },
];

const bodies = [
  { label: "Collaborative arm", proven: true },
  { label: "Humanoid", proven: false },
  { label: "AMR", proven: false },
  { label: "Fleet", proven: false },
];

export function ArchitectureSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <SectionWrapper id="architecture" className="bg-graphite">
      <MotionReveal>
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-semibold tracking-widest uppercase text-mute">
            System Architecture
          </span>
          <h2 className="mt-3 text-3xl md:text-4xl font-bold text-offwhite tracking-tight">
            Interfaces, not fixed
            <br />
            implementations
          </h2>
          <p className="mt-4 text-mute">
            The brain calls modular tools. The tools drive any body. Swap a
            detector, add an end-effector, register a robot — the platform
            compounds instead of being rebuilt.
          </p>
        </div>
      </MotionReveal>

      {/* Diagram */}
      <div
        ref={ref}
        className="bg-carbon rounded-2xl border border-steel p-6 md:p-12"
      >
        {/* Human ↔ brain */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-3 rounded-xl border border-steel bg-graphite px-4 py-3"
          >
            <Mic size={16} className="text-mute" />
            <div>
              <p className="text-sm font-semibold text-offwhite">Human goal</p>
              <p className="text-xs text-mute">Plain language</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="flex items-center gap-1 text-steel"
          >
            <span className="text-[10px] font-mono text-mute">voice</span>
            <div className="w-8 h-px bg-steel md:w-12" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="flex items-center gap-3 rounded-xl bg-accent px-5 py-3.5 shadow-md"
          >
            <BrainCircuit size={18} className="text-ink" />
            <div>
              <p className="text-sm font-semibold text-ink">nex-ON</p>
              <p className="text-xs text-ink/80">The reasoning brain</p>
            </div>
          </motion.div>
        </div>

        {/* Fan-out connector */}
        <div className="flex justify-center py-6">
          <motion.div
            initial={{ scaleY: 0 }}
            animate={isInView ? { scaleY: 1 } : {}}
            transition={{ duration: 0.4, delay: 0.45 }}
            className="w-px h-8 bg-steel origin-top"
          />
        </div>

        <p className="text-center text-[10px] font-mono uppercase tracking-widest text-mute mb-5">
          calls modular tools
        </p>

        {/* Tools row */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mb-6">
          {tools.map((tool, i) => (
            <motion.div
              key={tool.label}
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.5 + i * 0.08 }}
              className={`flex flex-col items-center text-center rounded-xl p-4 border ${
                tool.dashed
                  ? "border-dashed border-steel bg-graphite/50"
                  : "border-steel bg-graphite"
              }`}
            >
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center mb-2.5 border"
                style={{
                  backgroundColor: `${tool.color}14`,
                  borderColor: `${tool.color}33`,
                }}
              >
                <tool.icon size={18} style={{ color: tool.color }} />
              </div>
              <p className="font-semibold text-sm text-offwhite">{tool.label}</p>
              <p className="text-xs text-mute mt-0.5">{tool.sub}</p>
            </motion.div>
          ))}
        </div>

        {/* Converge connector */}
        <div className="flex justify-center pb-6">
          <motion.div
            initial={{ scaleY: 0 }}
            animate={isInView ? { scaleY: 1 } : {}}
            transition={{ duration: 0.4, delay: 0.9 }}
            className="w-px h-8 bg-steel origin-top"
          />
        </div>

        {/* Bodies */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 1 }}
          className="rounded-xl border border-steel bg-graphite px-5 py-5"
        >
          <p className="text-center text-[10px] font-mono uppercase tracking-widest text-mute mb-4">
            any body
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2.5">
            {bodies.map((body) => (
              <div
                key={body.label}
                className={`flex items-center gap-2 rounded-full px-3.5 py-1.5 border text-sm ${
                  body.proven
                    ? "bg-carbon border-accent/40 text-offwhite"
                    : "bg-carbon/50 border-dashed border-steel text-mute"
                }`}
              >
                <span
                  className={`w-1.5 h-1.5 rounded-full ${
                    body.proven ? "bg-accent" : "bg-steel"
                  }`}
                />
                {body.label}
              </div>
            ))}
          </div>
          <p className="text-center text-xs text-mute mt-4">
            <span className="inline-flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-accent inline-block" />
              Proven today
            </span>
            <span className="mx-3 text-mute">·</span>
            <span className="inline-flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-steel inline-block" />
              Architected, on the roadmap
            </span>
          </p>
        </motion.div>
      </div>
    </SectionWrapper>
  );
}
