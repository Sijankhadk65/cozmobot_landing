"use client";

import { SectionWrapper } from "../SectionWrapper";
import { MotionReveal } from "../MotionReveal";
import { motion } from "framer-motion";
import { BrainCircuit, Blocks, Bot, ArrowDown, ArrowRight } from "lucide-react";

const layers = [
  {
    icon: BrainCircuit,
    label: "The Brain",
    detail:
      "A large language model reasons about the goal and orchestrates the work — deciding when to look, what to measure, and where to act.",
  },
  {
    icon: Blocks,
    label: "The Capabilities",
    detail:
      "Modular, swappable tools the brain can call: vision models, measurement, motion, manipulation, sensor feeds. Register a new tool, gain a new skill.",
  },
  {
    icon: Bot,
    label: "The Body",
    detail:
      "Any robot. Today it drives a collaborative arm. The same platform is architected to drive a humanoid, an AMR, or a fleet of mixed robots.",
  },
];

export function PlatformSection() {
  return (
    <SectionWrapper id="platform">
      <div className="grid md:grid-cols-2 gap-16 items-start">
        {/* Left: sticky narrative */}
        <div className="md:sticky md:top-24">
          <MotionReveal>
            <span className="text-xs font-semibold text-eyebrow uppercase text-accent">
              The Platform Vision
            </span>
            <h2 className="mt-3 text-3xl md:text-4xl font-bold text-offwhite text-title">
              Most robotics companies
              <br />
              build one robot for one job.
            </h2>
            <p className="mt-5 text-mute text-lg leading-relaxed">
              <span className="font-semibold text-offwhite">nex-ON</span>{" "}
              inverts that. It sits between an AI brain and a robot body — the
              layer that turns &ldquo;understand the goal&rdquo; into{" "}
              <span className="text-offwhite">
                &ldquo;perceive the world, pick the right tool, and act.&rdquo;
              </span>
            </p>
            <p className="mt-4 text-mute leading-relaxed">
              Because perception, tooling, and control are{" "}
              <span className="font-medium text-offwhite">
                interfaces rather than fixed implementations
              </span>
              , adding a new robot or a new skill means registering a new tool —
              not rebuilding the system.
            </p>

            <div className="mt-8 p-5 bg-accent/8 rounded-xl border border-accent/25">
              <p className="text-xs font-semibold text-eyebrow uppercase text-accent mb-2">
                Beachhead first, platform underneath
              </p>
              <p className="text-sm text-mute leading-relaxed">
                We prove the platform on the hardest, most valuable near-term
                task we could find — one that demands everything at once:
                sub-millimeter perception, safe real-world actuation, and
                non-expert operability. Nail that, and the same platform
                generalizes outward.
              </p>
              <a
                href="#omnicron"
                className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-accent hover:gap-2.5 transition-all"
              >
                See the first deployment
                <ArrowRight size={14} />
              </a>
            </div>
          </MotionReveal>
        </div>

        {/* Right: the three-layer stack */}
        <div className="space-y-3">
          {layers.map((layer, i) => (
            <div key={layer.label}>
              <MotionReveal delay={i * 0.12}>
                <motion.div
                  whileHover={{ y: -2 }}
                  transition={{ duration: 0.2 }}
                  className="bg-graphite rounded-2xl border border-steel p-6 hover:border-accent/40 transition-colors"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 border border-accent/25 bg-accent/10">
                      <layer.icon size={20} className="text-accent" />
                    </div>
                    <div>
                      <h3 className="font-bold text-offwhite text-lg">
                        {layer.label}
                      </h3>
                      <p className="mt-1.5 text-sm text-mute leading-relaxed">
                        {layer.detail}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </MotionReveal>

              {i < layers.length - 1 && (
                <MotionReveal delay={i * 0.12 + 0.08}>
                  <div className="flex justify-center py-1">
                    <ArrowDown size={16} className="text-steel" />
                  </div>
                </MotionReveal>
              )}
            </div>
          ))}

          <MotionReveal delay={0.4}>
            <div className="mt-6 rounded-2xl border border-dashed border-steel bg-graphite/50 p-6 text-center">
              <p className="text-sm text-mute leading-relaxed">
                In principle,{" "}
                <span className="font-semibold text-offwhite">any robot</span>{" "}
                plus{" "}
                <span className="font-semibold text-offwhite">
                  the right tools
                </span>{" "}
                equals{" "}
                <span className="font-semibold text-offwhite">any task</span> —
                all directed through natural conversation.
              </p>
            </div>
          </MotionReveal>
        </div>
      </div>
    </SectionWrapper>
  );
}
