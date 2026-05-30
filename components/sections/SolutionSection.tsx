"use client";

import { SectionWrapper } from "../SectionWrapper";
import { MotionReveal } from "../MotionReveal";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Eye, Cpu, Route, TrendingUp, Play } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: Eye,
    title: "Computer Vision",
    subtitle: "Seam Detection & Geometry Analysis",
    description:
      "Multi-sensor cameras scan the workpiece in real time. The system identifies seam geometry, orientation, surface condition, and material boundaries — with sub-millimeter precision.",
    color: "blue",
  },
  {
    number: "02",
    icon: Cpu,
    title: "Smart Parameter Prediction",
    subtitle: "AI-Driven Welding Config",
    description:
      "Trained on thousands of welds, the AI model predicts optimal voltage, wire feed speed, travel speed, and shielding gas flow — all tuned to your specific geometry.",
    color: "blue",
  },
  {
    number: "03",
    icon: Route,
    title: "Trajectory Planning",
    subtitle: "Collision-Safe Motion",
    description:
      "A motion planner generates smooth, collision-free robot trajectories. The system accounts for joint limits, workspace boundaries, and obstacle avoidance automatically.",
    color: "blue",
  },
  {
    number: "04",
    icon: TrendingUp,
    title: "Seam Optimization",
    subtitle: "Adaptive Path Correction",
    description:
      "During execution, real-time feedback continuously refines the weld path. If the seam deviates, the system adapts — maintaining quality across every pass.",
    color: "orange",
  },
  {
    number: "05",
    icon: Play,
    title: "Autonomous Execution",
    subtitle: "Zero-Code Operation",
    description:
      "No teach pendants. No offline programming. The robot programs itself from the scan. A factory operator loads the part, confirms the plan, and presses start.",
    color: "orange",
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

  const accent = step.color === "orange" ? "#e66100" : "#1a5fb4";
  const accentBg = step.color === "orange" ? "bg-orange-50" : "bg-blue-50";
  const accentBorder =
    step.color === "orange" ? "border-orange-100" : "border-blue-100";
  const accentText =
    step.color === "orange" ? "text-orange-600" : "text-[#1a5fb4]";

  return (
    <div ref={ref} className="flex gap-6 md:gap-8">
      {/* Left: number + line */}
      <div className="flex flex-col items-center">
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={isInView ? { scale: 1, opacity: 1 } : {}}
          transition={{ duration: 0.4, delay: index * 0.1 }}
          className={`w-10 h-10 rounded-full border-2 flex items-center justify-center font-bold text-sm flex-shrink-0`}
          style={{ borderColor: accent, color: accent }}
        >
          {step.number}
        </motion.div>
        {!isLast && (
          <motion.div
            initial={{ scaleY: 0 }}
            animate={isInView ? { scaleY: 1 } : {}}
            transition={{ duration: 0.6, delay: index * 0.1 + 0.3 }}
            className="w-px flex-1 mt-2 origin-top"
            style={{ backgroundColor: "#e2e8f0", minHeight: "40px" }}
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
          <div
            className={`w-10 h-10 rounded-lg ${accentBg} ${accentBorder} border flex items-center justify-center flex-shrink-0`}
          >
            <step.icon className={`w-5 h-5 ${accentText}`} />
          </div>
          <div>
            <p className={`text-sm font-semibold ${accentText}`}>
              {step.subtitle}
            </p>
            <h3 className="text-xl font-bold text-gray-900 mt-0.5">
              {step.title}
            </h3>
          </div>
        </div>
        <p className="mt-4 text-gray-500 leading-relaxed max-w-xl text-base">
          {step.description}
        </p>
      </motion.div>
    </div>
  );
}

export function SolutionSection() {
  return (
    <SectionWrapper id="solution">
      <div className="grid md:grid-cols-2 gap-16 items-start">
        {/* Left sticky label */}
        <div className="md:sticky md:top-24">
          <MotionReveal>
            <span className="text-xs font-semibold tracking-widest uppercase text-[#1a5fb4]">
              The Pipeline
            </span>
            <h2 className="mt-3 text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">
              From scan to weld,
              <br />
              fully automated.
            </h2>
            <p className="mt-4 text-gray-500 text-lg leading-relaxed">
              Five integrated stages work together to deliver consistent,
              high-quality welds — on any part, the first time.
            </p>

            <div className="mt-8 p-4 bg-gray-50 rounded-xl border border-gray-200">
              <p className="text-sm text-gray-500 font-medium mb-3">
                End-to-end cycle time
              </p>
              <div className="flex gap-4">
                {[
                  { label: "Scan", time: "~3s" },
                  { label: "Plan", time: "~2s" },
                  { label: "Weld", time: "Real-time" },
                ].map((item) => (
                  <div key={item.label} className="text-center">
                    <p className="text-lg font-bold text-gray-900">
                      {item.time}
                    </p>
                    <p className="text-xs text-gray-500">{item.label}</p>
                  </div>
                ))}
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
