"use client";

import { motion } from "framer-motion";
import { Mic, Eye, Ruler, Move3d, Wrench, Radio } from "lucide-react";

const ACCENT = "#add037";

const tools = [
  { icon: Eye, label: "Vision" },
  { icon: Ruler, label: "Measure" },
  { icon: Move3d, label: "Motion" },
  { icon: Wrench, label: "Tooling" },
  { icon: Radio, label: "Sensors" },
];

const bodies: {
  label: string;
  proven: boolean;
  note?: string;
  href?: string;
}[] = [
  { label: "Collaborative arm", proven: true, note: "Omnicron", href: "#omnicron" },
  { label: "AMR", proven: false, note: "Orio", href: "#orio" },
  { label: "Humanoid", proven: false },
  { label: "Fleet", proven: false },
];

// The live "console" view of the platform loop: a spoken command enters the
// reasoning brain, which composes modular tools and drives any body — all under
// a standing safety state. Extracted from the hero so it can anchor the
// "How It Works" section while the real-robot video leads the hero.
export function PlatformViz() {
  return (
    <div className="relative w-full rounded-2xl bg-graphite border border-steel/70 overflow-hidden p-6 md:p-8">
      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-40 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(to right, #323333 1px, transparent 1px), linear-gradient(to bottom, #323333 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      <div className="relative space-y-5">
        {/* 1. Spoken command */}
        <div>
          <p className="text-[10px] font-mono uppercase tracking-widest text-mute mb-2">
            Operator
          </p>
          <div className="flex items-center gap-3 bg-carbon rounded-xl border border-steel px-4 py-3">
            <div className="w-8 h-8 rounded-lg bg-accent/15 flex items-center justify-center flex-shrink-0">
              <Mic size={15} className="text-accent" />
            </div>
            <p className="text-sm text-offwhite flex-1">
              &ldquo;Find the metal tube and measure it.&rdquo;
            </p>
            {/* Waveform */}
            <div className="flex items-end gap-0.5 h-5">
              {[0, 1, 2, 3, 4, 5, 6].map((i) => (
                <motion.div
                  key={i}
                  className="w-0.5 bg-accent rounded-full"
                  animate={{ height: ["20%", "100%", "40%", "80%", "20%"] }}
                  transition={{
                    duration: 1.4,
                    repeat: Infinity,
                    delay: i * 0.09,
                    ease: "easeInOut",
                  }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Connector */}
        <div className="flex justify-center">
          <motion.div
            className="w-px h-4 bg-gradient-to-b from-steel to-accent"
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>

        {/* 2. The brain */}
        <motion.div
          className="rounded-xl bg-accent px-4 py-3 flex items-center justify-between"
          animate={{
            boxShadow: [
              "0 2px 8px rgba(173,208,55,0.15)",
              "0 4px 22px rgba(173,208,55,0.35)",
              "0 2px 8px rgba(173,208,55,0.15)",
            ],
          }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
        >
          <div>
            <p className="text-[10px] font-mono uppercase tracking-widest text-ink/80">
              Reasoning brain
            </p>
            <p className="text-sm font-semibold text-ink mt-0.5">
              nex-ON — agentic tool loop
            </p>
          </div>
          <motion.div
            className="w-2 h-2 rounded-full bg-ink"
            animate={{ opacity: [0.3, 1, 0.3], scale: [0.9, 1.15, 0.9] }}
            transition={{ duration: 1.6, repeat: Infinity }}
          />
        </motion.div>

        {/* 3. Tools */}
        <div>
          <p className="text-[10px] font-mono uppercase tracking-widest text-mute mb-2">
            Modular capabilities
          </p>
          <div className="grid grid-cols-5 gap-2">
            {tools.map((tool, i) => (
              <motion.div
                key={tool.label}
                className="flex flex-col items-center gap-1.5 bg-carbon rounded-lg border border-steel py-2.5 px-1"
                animate={{
                  borderColor: ["#323333", ACCENT, "#323333"],
                }}
                transition={{
                  duration: 1.2,
                  repeat: Infinity,
                  repeatDelay: 4,
                  delay: i * 0.55,
                  ease: "easeInOut",
                }}
              >
                <tool.icon size={14} className="text-accent" />
                <span className="text-[9px] text-mute font-medium leading-none text-center">
                  {tool.label}
                </span>
              </motion.div>
            ))}
          </div>
          <p className="text-[10px] text-mute mt-2 text-center font-mono">
            + register a new tool &rarr; a new skill
          </p>
        </div>

        {/* Connector */}
        <div className="flex justify-center">
          <motion.div
            className="w-px h-4 bg-gradient-to-b from-accent to-steel"
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 2, repeat: Infinity, delay: 0.6 }}
          />
        </div>

        {/* 4. Bodies */}
        <div>
          <p className="text-[10px] font-mono uppercase tracking-widest text-mute mb-2">
            Any body
          </p>
          <div className="flex flex-wrap gap-2">
            {bodies.map((body) => {
              const chip = (
                <>
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${
                      body.proven ? "bg-accent" : "bg-steel"
                    }`}
                  />
                  {body.label}
                  {/* The named applications carry their product name, so the
                      console says what nex-ON already drives without spending a
                      whole block on it. */}
                  {body.note && (
                    <>
                      <span className="text-mute/50">·</span>
                      <span className="text-accent font-medium">
                        {body.note}
                      </span>
                    </>
                  )}
                </>
              );

              const className = `flex items-center gap-1.5 rounded-full px-3 py-1.5 border text-xs ${
                body.proven
                  ? "bg-carbon border-accent/40 text-offwhite"
                  : "bg-carbon/40 border-dashed border-steel text-mute"
              }`;

              return body.href ? (
                <motion.a
                  key={body.label}
                  href={body.href}
                  whileHover={{ y: -2 }}
                  transition={{ type: "spring", bounce: 0, duration: 0.3 }}
                  className={`${className} hover:border-accent/70 transition-colors`}
                >
                  {chip}
                </motion.a>
              ) : (
                <div key={body.label} className={className}>
                  {chip}
                </div>
              );
            })}
          </div>
        </div>

        {/* Safety status bar */}
        <div className="flex items-center justify-between pt-3 border-t border-steel">
          <div className="flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-accent" />
            <span className="text-[10px] font-mono text-accent">
              DRY RUN — NOT ARMED
            </span>
          </div>
          <span className="text-[10px] font-mono text-mute">HAND-EYE CALIBRATED</span>
        </div>
      </div>
    </div>
  );
}
