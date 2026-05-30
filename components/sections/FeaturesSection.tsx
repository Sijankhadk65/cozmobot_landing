"use client";

import { SectionWrapper } from "../SectionWrapper";
import { MotionReveal } from "../MotionReveal";
import { motion } from "framer-motion";
import {
  Code2,
  Zap,
  ScanEye,
  BrainCircuit,
  Navigation,
  Crosshair,
  GitMerge,
  Factory,
} from "lucide-react";

const features = [
  {
    icon: Code2,
    title: "Zero-Code Interface",
    description:
      "Load a part, confirm the scan, press start. No programming, no teach pendants, no offline planning.",
    highlight: true,
  },
  {
    icon: Zap,
    title: "Adaptive Welding",
    description:
      "Parameters adjust in real time as geometry, material, and heat input conditions change.",
  },
  {
    icon: ScanEye,
    title: "Multi-Sensor Vision",
    description:
      "Structured light, depth cameras, and vision models triangulate seam position with sub-mm accuracy.",
  },
  {
    icon: BrainCircuit,
    title: "AI Parameter Optimization",
    description:
      "Trained models predict optimal welding conditions before the arc even starts.",
  },
  {
    icon: Navigation,
    title: "Real-Time Path Correction",
    description:
      "Closed-loop feedback updates trajectory mid-weld to compensate for distortion and drift.",
  },
  {
    icon: Crosshair,
    title: "Precision Seam Tracking",
    description:
      "Continuous vision tracking ensures the torch follows the seam with mechanical accuracy.",
  },
  {
    icon: GitMerge,
    title: "Cross-Robot Compatible",
    description:
      "Works with FANUC, Yaskawa, ABB, Kuka, and Universal Robots via a unified motion abstraction layer.",
  },
  {
    icon: Factory,
    title: "Industrial Deployment Ready",
    description:
      "Built for the floor: dustproof sensors, ruggedized enclosures, plant-network connectivity.",
  },
];

export function FeaturesSection() {
  return (
    <SectionWrapper id="features" className="bg-gray-50">
      <MotionReveal>
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-semibold tracking-widest uppercase text-gray-400">
            Platform Capabilities
          </span>
          <h2 className="mt-3 text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">
            Everything needed for
            <br />
            autonomous operation
          </h2>
        </div>
      </MotionReveal>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {features.map((f, i) => (
          <MotionReveal key={f.title} delay={i * 0.06}>
            <motion.div
              whileHover={{ y: -4, boxShadow: "0 8px 24px rgba(0,0,0,0.08)" }}
              transition={{ duration: 0.2 }}
              className={`relative h-full p-5 rounded-xl border transition-colors duration-200 ${
                f.highlight
                  ? "bg-[#1a5fb4] text-white border-[#1550a0]"
                  : "bg-white border-gray-200 hover:border-gray-300"
              }`}
            >
              <div
                className={`w-9 h-9 rounded-lg flex items-center justify-center mb-4 ${
                  f.highlight ? "bg-white/15" : "bg-gray-50 border border-gray-100"
                }`}
              >
                <f.icon
                  className={`w-4.5 h-4.5 ${
                    f.highlight ? "text-white" : "text-[#1a5fb4]"
                  }`}
                  size={18}
                />
              </div>
              <h3
                className={`font-semibold text-sm mb-1.5 ${
                  f.highlight ? "text-white" : "text-gray-900"
                }`}
              >
                {f.title}
              </h3>
              <p
                className={`text-xs leading-relaxed ${
                  f.highlight ? "text-blue-200" : "text-gray-500"
                }`}
              >
                {f.description}
              </p>
            </motion.div>
          </MotionReveal>
        ))}
      </div>
    </SectionWrapper>
  );
}
