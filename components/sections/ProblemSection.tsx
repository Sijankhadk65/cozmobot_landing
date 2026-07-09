"use client";

import { SectionWrapper } from "../SectionWrapper";
import { MotionReveal } from "../MotionReveal";
import { Gamepad2, FileCode2, Users, Layers, Boxes } from "lucide-react";

const problems = [
  {
    icon: Gamepad2,
    title: "The Teach Pendant",
    description:
      "A specialist hand-jogs the machine, recording waypoints one by one. Slow, manual, and only as good as the person holding it.",
  },
  {
    icon: FileCode2,
    title: "Offline CAD Programming",
    description:
      "An engineer writes a program for every new part or task. Weeks of work that breaks the moment reality deviates from the model.",
  },
  {
    icon: Users,
    title: "Scarce Skilled Labor",
    description:
      "Both paths depend on specialist expertise that is hard to hire and harder to keep. The people who can deploy a robot are rarer than the robots.",
  },
  {
    icon: Layers,
    title: "High-Mix, Low-Volume Work",
    description:
      "Short runs and constant changeovers can rarely justify the cost of a robotics integrator. The robot sits idle; the work goes manual.",
  },
  {
    icon: Boxes,
    title: "Unstructured Environments",
    description:
      "Rigid programs trust a model file. When the real part sits a few millimeters off, the robot fails — which is exactly what blocks humanoids and mobile robots from the real world.",
  },
];

export function ProblemSection() {
  return (
    <SectionWrapper id="problem" className="bg-graphite">
      <MotionReveal>
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-semibold tracking-widest uppercase text-mute">
            The Challenge
          </span>
          <h2 className="mt-3 text-3xl md:text-4xl font-bold text-offwhite tracking-tight">
            Robots are powerful.
            <br />
            Deploying them is brutal.
          </h2>
          <p className="mt-4 text-mute text-lg">
            Putting a robot to work today means one of two slow, expensive
            paths — and neither adapts when the real world doesn&apos;t match
            the plan.
          </p>
        </div>
      </MotionReveal>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {problems.map((p, i) => (
          <MotionReveal key={p.title} delay={i * 0.08}>
            <div className="group relative h-full bg-carbon rounded-xl p-6 border border-steel hover:border-steel/60 hover:shadow-md transition-all duration-200">
              <div className="w-10 h-10 rounded-lg bg-steel/40 border border-steel flex items-center justify-center mb-4">
                <p.icon className="w-5 h-5 text-mute" />
              </div>
              <h3 className="font-semibold text-offwhite mb-2">{p.title}</h3>
              <p className="text-sm text-mute leading-relaxed">{p.description}</p>
            </div>
          </MotionReveal>
        ))}

        {/* Bridging card */}
        <MotionReveal delay={problems.length * 0.08}>
          <div className="h-full bg-accent rounded-xl p-6 text-ink flex flex-col justify-center min-h-[160px]">
            <p className="text-lg font-semibold leading-snug">
              So stop programming the robot.
            </p>
            <p className="text-sm text-ink/75 mt-2 leading-relaxed">
              <span className="font-semibold text-ink">nex-ON</span> replaces
              &ldquo;program the robot&rdquo; with{" "}
              <span className="font-semibold text-ink">
                &ldquo;talk to the robot.&rdquo;
              </span>{" "}
              It sees the actual scene in front of it — not a model file.
            </p>
          </div>
        </MotionReveal>
      </div>
    </SectionWrapper>
  );
}
