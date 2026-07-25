"use client";

import { SectionWrapper } from "../SectionWrapper";
import { MotionReveal } from "../MotionReveal";
import { motion } from "framer-motion";
import {
  Bot,
  Flame,
  PersonStanding,
  Truck,
  Network,
  Wrench,
  ScanLine,
  PackageOpen,
  Hand,
  CheckCircle2,
  CircleDashed,
  ArrowRight,
} from "lucide-react";

const bodies = [
  { icon: Bot, label: "Collaborative arm", proven: true },
  {
    icon: Flame,
    label: "Welding cobot",
    proven: true,
    note: "Omnicron",
    href: "#omnicron",
  },
  { icon: PersonStanding, label: "Humanoid", proven: false },
  {
    icon: Truck,
    label: "Autonomous mobile robot",
    proven: false,
    note: "Orio",
    href: "#orio",
  },
  { icon: Network, label: "Mixed fleet", proven: false },
];

const tasks = [
  {
    icon: Flame,
    label: "Welding",
    proven: true,
    note: "Omnicron",
    href: "#omnicron",
  },
  { icon: Wrench, label: "Assembly", proven: false },
  { icon: ScanLine, label: "Inspection", proven: false },
  { icon: PackageOpen, label: "Material handling", proven: false },
  { icon: Hand, label: "Mobile manipulation", proven: false },
];

const positioning = [
  {
    versus: "vs. task-specific robotics",
    them: "Single-process systems and no-code programming tools solve one job on one class of machine.",
    us: "nex-ON isn't tied to one process or to one kind of arm. It's horizontal. Our first application is one deployment, not the ceiling.",
  },
  {
    versus: "vs. embodied-AI & general robotics",
    them: "Humanoid and robot-foundation-model companies build robot bodies or end-to-end learned control policies — capital-intensive, hardware-heavy, often single-embodiment.",
    us: "We are not a robot manufacturer and not a monolithic learned policy. We sit above any body and compose proven perception and motion tools under an LLM's reasoning.",
  },
];

const differentiators = [
  "Works with robots that already exist, from many vendors.",
  "Interpretable and controllable — discrete tool calls with safety gates and dry runs, not an opaque neural policy.",
  "Swappable by design — a better detector or a new sensor drops in without a rewrite.",
];

function Matrix({
  title,
  items,
}: {
  title: string;
  items: {
    icon: React.ElementType;
    label: string;
    proven: boolean;
    note?: string;
    href?: string;
  }[];
}) {
  return (
    <div className="rounded-2xl border border-steel bg-graphite overflow-hidden h-full">
      <div className="px-5 py-3.5 border-b border-steel bg-carbon">
        <p className="text-xs font-semibold tracking-widest uppercase text-mute">
          {title}
        </p>
      </div>
      <div className="divide-y divide-steel/60">
        {items.map((item, i) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, x: -8 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.35, delay: i * 0.06 }}
            className="flex items-center gap-3 px-5 py-3.5"
          >
            <div
              className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 border ${
                item.proven
                  ? "bg-accent/12 border-accent/25"
                  : "bg-carbon border-steel"
              }`}
            >
              <item.icon
                size={15}
                className={item.proven ? "text-accent" : "text-mute"}
              />
            </div>

            <div className="flex-1 min-w-0">
              <p
                className={`text-sm font-medium ${
                  item.proven ? "text-offwhite" : "text-mute"
                }`}
              >
                {item.label}
              </p>
              {item.note &&
                (item.href ? (
                  <a
                    href={item.href}
                    className="inline-flex items-center gap-1 text-xs text-offwhite/80 mt-0.5 hover:text-offwhite hover:gap-1.5 transition-all"
                  >
                    {item.note}
                    <ArrowRight size={10} />
                  </a>
                ) : (
                  <p className="text-xs text-offwhite/80 mt-0.5">{item.note}</p>
                ))}
            </div>

            {item.proven ? (
              <span className="inline-flex items-center gap-1.5 text-xs font-medium text-accent bg-accent/10 border border-accent/30 rounded-full px-2.5 py-1 flex-shrink-0">
                <CheckCircle2 size={11} />
                Proven today
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 text-xs text-mute bg-carbon border border-dashed border-steel rounded-full px-2.5 py-1 flex-shrink-0">
                <CircleDashed size={11} />
                Architected
              </span>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export function AnyRobotSection() {
  return (
    <SectionWrapper id="any-robot">
      <MotionReveal>
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-semibold tracking-widest uppercase text-accent">
            Any Robot, Any Task
          </span>
          <h2 className="mt-3 text-3xl md:text-4xl font-bold text-offwhite tracking-tight">
            One platform.
            <br />
            Any body.
          </h2>
          <p className="mt-4 text-mute text-lg leading-relaxed">
            We are precise about what ships today and what the architecture is
            built for. The modularity is real in the codebase. The additional
            robot bodies are the roadmap.
          </p>
        </div>
      </MotionReveal>

      {/* Matrices */}
      <div className="grid md:grid-cols-2 gap-6 mb-16">
        <MotionReveal>
          <Matrix title="Bodies" items={bodies} />
        </MotionReveal>
        <MotionReveal delay={0.1}>
          <Matrix title="Tasks" items={tasks} />
        </MotionReveal>
      </div>

      {/* Maturity honesty band */}
      <MotionReveal>
        <div className="rounded-2xl border border-steel bg-graphite p-6 md:p-8 mb-16">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <CheckCircle2 size={15} className="text-accent" />
                <p className="text-xs font-semibold tracking-widest uppercase text-accent">
                  Proven today
                </p>
              </div>
              <p className="text-sm text-mute leading-relaxed">
                The full stack running on a real collaborative arm — voice
                orchestration, open-vocabulary vision, real-world measurement,
                safe dry- and live-gated actuation, color-guided pathing, and
                hand-eye calibration — proven end to end as Omnicron.
              </p>
            </div>
            <div>
              <div className="flex items-center gap-2 mb-3">
                <CircleDashed size={15} className="text-mute" />
                <p className="text-xs font-semibold tracking-widest uppercase text-mute">
                  Architected for, not yet shipped
                </p>
              </div>
              <p className="text-sm text-mute leading-relaxed">
                The same orchestration and tool interfaces extending to
                humanoids, AMRs, and additional end-effectors and sensors. The
                swappable detector, tool-based capabilities, and abstracted
                motion exist today. The additional bodies do not — yet.
              </p>
            </div>
          </div>
        </div>
      </MotionReveal>

      {/* Positioning */}
      <MotionReveal>
        <p className="text-xs font-semibold tracking-widest uppercase text-mute mb-6">
          Where we sit
        </p>
      </MotionReveal>

      <div className="grid md:grid-cols-2 gap-5 mb-10">
        {positioning.map((p, i) => (
          <MotionReveal key={p.versus} delay={i * 0.1}>
            <div className="h-full rounded-2xl border border-steel bg-graphite p-6">
              <p className="text-sm font-semibold text-offwhite mb-4">
                {p.versus}
              </p>
              <p className="text-sm text-mute leading-relaxed pb-4 mb-4 border-b border-steel/60">
                {p.them}
              </p>
              <p className="text-sm text-offwhite/85 leading-relaxed">
                <span className="font-semibold text-accent">Our edge: </span>
                {p.us}
              </p>
            </div>
          </MotionReveal>
        ))}
      </div>

      <MotionReveal>
        <div className="grid sm:grid-cols-3 gap-4 mb-14">
          {differentiators.map((d) => (
            <div
              key={d}
              className="rounded-xl border border-steel bg-graphite p-5"
            >
              <p className="text-sm text-mute leading-relaxed">{d}</p>
            </div>
          ))}
        </div>
      </MotionReveal>

      {/* Positioning line */}
      <MotionReveal>
        <div className="rounded-2xl bg-accent p-8 md:p-12 text-center">
          <p className="text-xl md:text-2xl font-semibold text-ink leading-snug max-w-3xl mx-auto text-balance">
            Everyone else is building the robot&apos;s body or its reflexes.
            <br className="hidden md:block" />{" "}
            <span className="text-ink/80">
              nex-ON is the deployment platform that lets any body do any job.
            </span>
          </p>
        </div>
      </MotionReveal>
    </SectionWrapper>
  );
}
