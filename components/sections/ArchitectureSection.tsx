"use client";

import { SectionWrapper } from "../SectionWrapper";
import { MotionReveal } from "../MotionReveal";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Camera, BrainCircuit, Navigation, Bot, RefreshCcw } from "lucide-react";

const pipeline = [
  {
    id: "vision",
    icon: Camera,
    label: "Vision",
    sub: "3D Scan & Seam Detection",
    color: "#3584e4",
    bg: "#e8f0fb",
  },
  {
    id: "ai",
    icon: BrainCircuit,
    label: "AI Analysis",
    sub: "Parameter Prediction",
    color: "#1a5fb4",
    bg: "#dbeafe",
  },
  {
    id: "planning",
    icon: Navigation,
    label: "Motion Planning",
    sub: "Trajectory Generation",
    color: "#7c3aed",
    bg: "#ede9fe",
  },
  {
    id: "robot",
    icon: Bot,
    label: "Robot Execution",
    sub: "Autonomous Operation",
    color: "#059669",
    bg: "#d1fae5",
  },
  {
    id: "feedback",
    icon: RefreshCcw,
    label: "Feedback Loop",
    sub: "Real-Time Adaptation",
    color: "#e66100",
    bg: "#fff7ed",
  },
];

function Arrow({ delay }: { delay: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scaleX: 0 }}
      animate={isInView ? { opacity: 1, scaleX: 1 } : {}}
      transition={{ duration: 0.4, delay }}
      className="hidden md:flex items-center flex-1 max-w-10 origin-left"
    >
      <div className="flex-1 h-px bg-gradient-to-r from-gray-300 to-gray-200" />
      <div className="w-0 h-0 border-t-[5px] border-t-transparent border-b-[5px] border-b-transparent border-l-[7px] border-l-gray-300" />
    </motion.div>
  );
}

export function ArchitectureSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <SectionWrapper id="architecture" className="bg-gray-50">
      <MotionReveal>
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-semibold tracking-widest uppercase text-gray-400">
            System Architecture
          </span>
          <h2 className="mt-3 text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">
            A closed-loop autonomous pipeline
          </h2>
          <p className="mt-4 text-gray-500">
            Each stage feeds the next. The system doesn&apos;t just execute — it
            learns and corrects.
          </p>
        </div>
      </MotionReveal>

      {/* Pipeline diagram */}
      <div ref={ref} className="bg-white rounded-2xl border border-gray-200 p-8 md:p-12">
        {/* Horizontal pipeline */}
        <div className="flex flex-col md:flex-row items-center gap-4 md:gap-2 justify-center">
          {pipeline.map((node, i) => (
            <div key={node.id} className="flex flex-col md:flex-row items-center gap-2 md:gap-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="flex flex-col items-center text-center w-36"
              >
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center mb-3 border"
                  style={{ backgroundColor: node.bg, borderColor: `${node.color}30` }}
                >
                  <node.icon size={22} style={{ color: node.color }} />
                </div>
                <p className="font-semibold text-sm text-gray-900">{node.label}</p>
                <p className="text-xs text-gray-400 mt-0.5 leading-tight">{node.sub}</p>
              </motion.div>
              {i < pipeline.length - 1 && <Arrow delay={i * 0.1 + 0.3} />}
            </div>
          ))}
        </div>

        {/* Feedback arc */}
        <div className="mt-10 pt-8 border-t border-gray-100">
          <div className="flex items-center justify-center gap-3">
            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.8, duration: 0.5 }}
              className="flex items-center gap-2 text-xs text-gray-400 bg-gray-50 rounded-full px-4 py-2 border border-gray-200"
            >
              <RefreshCcw size={12} className="text-orange-500" />
              <span>
                Feedback loop continuously refines parameters across all stages
              </span>
            </motion.div>
          </div>
        </div>

        {/* Specs */}
        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "Scan Latency", value: "<50ms" },
            { label: "Prediction Time", value: "<200ms" },
            { label: "Planning Time", value: "<2s" },
            { label: "Correction Rate", value: "100Hz" },
          ].map((spec) => (
            <MotionReveal key={spec.label}>
              <div className="text-center p-4 bg-gray-50 rounded-xl border border-gray-100">
                <p className="text-xl font-bold text-gray-900 font-mono">
                  {spec.value}
                </p>
                <p className="text-xs text-gray-400 mt-1">{spec.label}</p>
              </div>
            </MotionReveal>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
