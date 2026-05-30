"use client";

import { SectionWrapper } from "../SectionWrapper";
import { MotionReveal } from "../MotionReveal";
import { Users, AlertTriangle, Code, Layers, Clock } from "lucide-react";

const problems = [
  {
    icon: Users,
    title: "Skilled Labor Shortage",
    description:
      "Certified welders are increasingly scarce. Dependency on rare expertise creates production bottlenecks.",
  },
  {
    icon: AlertTriangle,
    title: "Inconsistent Quality",
    description:
      "Manual welding varies by operator fatigue, skill, and environment — causing costly rework and defects.",
  },
  {
    icon: Code,
    title: "Complex Programming",
    description:
      "Traditional robot programming requires weeks of specialized expertise, halting production during changeovers.",
  },
  {
    icon: Layers,
    title: "Unstructured Environments",
    description:
      "Real factory floors have variation. Rigid robots fail when workpieces shift or geometry deviates slightly.",
  },
  {
    icon: Clock,
    title: "Costly Downtime",
    description:
      "Every hour of unplanned downtime costs thousands. Brittle systems amplify this risk.",
  },
];

export function ProblemSection() {
  return (
    <SectionWrapper id="problem" className="bg-gray-50">
      <MotionReveal>
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-semibold tracking-widest uppercase text-gray-400">
            The Challenge
          </span>
          <h2 className="mt-3 text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">
            Industrial welding is broken
          </h2>
          <p className="mt-4 text-gray-500 text-lg">
            Five challenges that make traditional welding automation expensive,
            fragile, and inaccessible.
          </p>
        </div>
      </MotionReveal>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {problems.map((p, i) => (
          <MotionReveal key={p.title} delay={i * 0.08}>
            <div className="group relative bg-white rounded-xl p-6 border border-gray-200 hover:border-gray-300 hover:shadow-md transition-all duration-200">
              <div className="w-10 h-10 rounded-lg bg-red-50 border border-red-100 flex items-center justify-center mb-4">
                <p.icon className="w-5 h-5 text-red-500" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">{p.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{p.description}</p>
            </div>
          </MotionReveal>
        ))}

        {/* Bridging card */}
        <MotionReveal delay={problems.length * 0.08}>
          <div className="bg-[#1a5fb4] rounded-xl p-6 text-white flex flex-col justify-between min-h-[160px]">
            <p className="text-lg font-semibold leading-snug">
              There is a better way.
            </p>
            <p className="text-sm text-blue-200 mt-2">
              CozmoBot replaces fragile manual workflows with an intelligent,
              adaptive autonomous system.
            </p>
          </div>
        </MotionReveal>
      </div>
    </SectionWrapper>
  );
}
