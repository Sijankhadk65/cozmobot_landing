"use client";

import { motion } from "framer-motion";
import { Cpu, MessagesSquare, Flame, CircuitBoard } from "lucide-react";

// Honest above-the-fold credibility. No partner logos exist yet, so this leans
// entirely on true, checkable facts about the stack and what it already runs on.
// TODO: replace / augment with partner logos once pilots land.
const facts: {
  icon: typeof Cpu;
  lead: string;
  detail: string;
  href?: string;
}[] = [
  {
    icon: CircuitBoard,
    lead: "FAIRINO FR5",
    detail: "Proven on a real cobot",
  },
  {
    icon: Cpu,
    lead: "NVIDIA Jetson / DGX",
    detail: "Orio runs on the edge",
  },
  {
    icon: MessagesSquare,
    lead: "Plain language",
    detail: "Zero lines of robot code",
  },
  {
    icon: Flame,
    lead: "Live welds",
    detail: "On our own shop floor",
    href: "#omnicron",
  },
];

export function CredibilityStrip() {
  return (
    <section
      aria-label="What nex-ON runs on today"
      className="border-y border-steel/60 bg-graphite/40"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-5">
        <ul className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-5 md:divide-x md:divide-steel/50">
          {facts.map((fact, i) => {
            const inner = (
              <>
                <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg border border-accent/25 bg-accent/10">
                  <fact.icon size={16} className="text-accent" />
                </span>
                <span className="min-w-0">
                  <span className="block text-sm font-semibold text-offwhite leading-tight truncate">
                    {fact.lead}
                  </span>
                  <span className="block text-[11px] font-mono uppercase tracking-wider text-mute mt-0.5">
                    {fact.detail}
                  </span>
                </span>
              </>
            );

            return (
              <motion.li
                key={fact.lead}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="md:px-6 md:first:pl-0 md:last:pr-0"
              >
                {fact.href ? (
                  <a
                    href={fact.href}
                    className="flex items-center gap-3 group"
                  >
                    {inner}
                  </a>
                ) : (
                  <div className="flex items-center gap-3">{inner}</div>
                )}
              </motion.li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
