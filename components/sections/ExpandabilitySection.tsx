"use client";

import { SectionWrapper } from "../SectionWrapper";
import { MotionReveal } from "../MotionReveal";
import { motion } from "framer-motion";
import { Flame, Drill, Disc, Scissors, PaintRoller, ScanLine } from "lucide-react";

const tasks = [
  {
    icon: Flame,
    label: "Welding",
    status: "live",
    desc: "Fully autonomous TIG/MIG/MAG",
  },
  {
    icon: Drill,
    label: "Drilling",
    status: "roadmap",
    desc: "Adaptive drilling & hole finishing",
  },
  {
    icon: Disc,
    label: "Grinding",
    status: "roadmap",
    desc: "Surface preparation & burr removal",
  },
  {
    icon: PaintRoller,
    label: "Buffing",
    status: "roadmap",
    desc: "Polish and surface treatment",
  },
  {
    icon: Scissors,
    label: "Cutting",
    status: "roadmap",
    desc: "Plasma and laser profile cutting",
  },
  {
    icon: ScanLine,
    label: "Inspection",
    status: "roadmap",
    desc: "Automated quality verification",
  },
];

export function ExpandabilitySection() {
  return (
    <SectionWrapper id="platform">
      <div className="grid md:grid-cols-2 gap-16 items-center">
        {/* Left */}
        <MotionReveal>
          <span className="text-xs font-semibold tracking-widest uppercase text-[#e66100]">
            Platform Vision
          </span>
          <h2 className="mt-3 text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">
            The intelligence layer
            <br />
            is task-agnostic.
          </h2>
          <p className="mt-4 text-gray-500 text-lg leading-relaxed">
            The same computer vision, AI reasoning, and motion planning stack
            that masters welding can be directed to any unstructured industrial
            task — without rebuilding from scratch.
          </p>
          <div className="mt-6 p-4 bg-[#fff7ed] rounded-xl border border-orange-200">
            <p className="text-sm font-medium text-orange-800">
              "Teach the system one task. The architecture scales to many."
            </p>
          </div>
        </MotionReveal>

        {/* Right: task grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {tasks.map((task, i) => (
            <MotionReveal key={task.label} delay={i * 0.07}>
              <motion.div
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.15 }}
                className={`p-4 rounded-xl border text-center ${
                  task.status === "live"
                    ? "bg-[#1a5fb4] border-[#1550a0] text-white"
                    : "bg-white border-gray-200 hover:border-gray-300"
                }`}
              >
                <div
                  className={`w-10 h-10 rounded-lg mx-auto mb-3 flex items-center justify-center ${
                    task.status === "live"
                      ? "bg-white/20"
                      : "bg-gray-50 border border-gray-100"
                  }`}
                >
                  <task.icon
                    size={18}
                    className={
                      task.status === "live" ? "text-white" : "text-gray-600"
                    }
                  />
                </div>
                <p
                  className={`font-semibold text-sm ${
                    task.status === "live" ? "text-white" : "text-gray-900"
                  }`}
                >
                  {task.label}
                </p>
                <p
                  className={`text-xs mt-1 ${
                    task.status === "live" ? "text-blue-200" : "text-gray-400"
                  }`}
                >
                  {task.desc}
                </p>
                {task.status === "live" ? (
                  <span className="mt-2 inline-block text-xs bg-white/20 text-white px-2 py-0.5 rounded-full">
                    Live
                  </span>
                ) : (
                  <span className="mt-2 inline-block text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">
                    Roadmap
                  </span>
                )}
              </motion.div>
            </MotionReveal>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
