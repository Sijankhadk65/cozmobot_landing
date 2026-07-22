"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Canvas } from "@react-three/fiber";
import { Html, useProgress } from "@react-three/drei";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
  type MotionValue,
} from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";
import { NexonScene } from "./nexon-scene";

// ── In-canvas load indicator ──────────────────────────────────────────────────
function CanvasLoader() {
  const { progress } = useProgress();
  return (
    <Html center>
      <div className="flex flex-col items-center gap-3 text-center w-40">
        <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-accent">
          Booting nex-ON
        </span>
        <span className="w-full h-px bg-steel overflow-hidden">
          <span
            className="block h-full bg-accent transition-[width] duration-200"
            style={{ width: `${progress}%` }}
          />
        </span>
        <span className="text-[10px] font-mono text-mute tabular-nums">
          {Math.round(progress)}%
        </span>
      </div>
    </Html>
  );
}

// ── A scroll-timed text beat ──────────────────────────────────────────────────
// Fades + lifts in over its `range` and back out, driven by the same scroll
// progress that choreographs the box, so copy and camera stay locked together.
function Beat({
  progress,
  range,
  className = "",
  children,
}: {
  progress: MotionValue<number>;
  range: [number, number, number, number];
  className?: string;
  children: React.ReactNode;
}) {
  const [inStart, inEnd, outStart, outEnd] = range;
  const opacity = useTransform(
    progress,
    [inStart, inEnd, outStart, outEnd],
    [0, 1, 1, 0],
  );
  const y = useTransform(
    progress,
    [inStart, inEnd, outStart, outEnd],
    [24, 0, 0, -24],
  );
  return (
    <motion.div
      style={{ opacity, y }}
      className={`pointer-events-none absolute ${className}`}
    >
      {children}
    </motion.div>
  );
}

const ACTS = [
  "Edge unit",
  "The layer",
  "The agent loop",
  "Any body plugs in",
  "One platform",
];

export function NexonExperience() {
  const stageRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const [act, setAct] = useState(0);

  useEffect(() => setMounted(true), []);

  const { scrollYProgress } = useScroll({
    target: stageRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const i = Math.min(ACTS.length - 1, Math.floor(v * ACTS.length));
    setAct(i);
  });

  const railScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    // 6 viewport-heights of scroll distance drives the 5 acts; the canvas and
    // overlays are pinned inside while the page scrolls past.
    <section ref={stageRef} className="relative bg-carbon" style={{ height: "600vh" }}>
      {/* ── Scroll-snap steps ────────────────────────────────────────────
          A zero-height ruler at each act's hold-center. The 600vh section
          pins a 100vh canvas, so its scrollable run is 500vh and a ruler at
          `p · 500vh` sits exactly where progress === p — the moment each view
          is fully composed. CSS scroll-snap (set on <html>) rests the page on
          these, so scrolling settles view-to-view instead of scrubbing. Purely
          positional: the choreography and beat timings are untouched. */}
      {[0.08, 0.3, 0.51, 0.73, 0.93].map((p) => (
        <div
          key={p}
          aria-hidden
          className="absolute left-0 h-px w-px snap-start"
          style={{ top: `${p * 500}vh` }}
        />
      ))}

      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {mounted && (
          <Canvas
            className="absolute inset-0"
            dpr={[1, 2]}
            camera={{ position: [0, 0, 6], fov: 35 }}
            gl={{ antialias: true, powerPreference: "high-performance" }}
          >
            <Suspense fallback={<CanvasLoader />}>
              <NexonScene progress={scrollYProgress} />
            </Suspense>
          </Canvas>
        )}

        {/* ── HUD chrome ─────────────────────────────────────────────── */}
        <div className="pointer-events-none absolute inset-0 select-none">
          <div className="absolute top-20 left-6 lg:left-8 text-[10px] font-mono uppercase tracking-[0.18em] text-mute">
            nex-ON // hardware
          </div>
          <div className="absolute top-20 right-6 lg:right-8 text-[10px] font-mono uppercase tracking-[0.18em] text-mute text-right">
            edge unit · rev a
          </div>
          <div className="absolute bottom-6 right-6 lg:right-8 text-[10px] font-mono uppercase tracking-[0.18em] text-mute text-right leading-relaxed">
            pre-deployed nex-ON platform
            <br />
            voice · vision · motion · tooling
          </div>

          {/* Act rail + readout */}
          <div className="absolute bottom-6 left-6 lg:left-8 flex items-center gap-3">
            <div className="relative h-16 w-px bg-steel overflow-hidden">
              <motion.div
                style={{ scaleY: railScale }}
                className="absolute inset-0 origin-top bg-accent"
              />
            </div>
            <div className="text-[10px] font-mono uppercase tracking-[0.18em] text-mute">
              <span className="text-accent tabular-nums">
                {String(act + 1).padStart(2, "0")}
              </span>
              <span className="text-steel"> / {String(ACTS.length).padStart(2, "0")}</span>
              <br />
              {ACTS[act]}
            </div>
          </div>
        </div>

        {/* ── Act 1 · hero ───────────────────────────────────────────── */}
        <Beat
          progress={scrollYProgress}
          range={[0, 0.02, 0.14, 0.19]}
          className="left-6 lg:left-8 bottom-24 max-w-2xl"
        >
          <h1 className="font-brand text-5xl md:text-7xl font-bold tracking-tight text-offwhite leading-[0.95]">
            Robotics,
            <br />
            out of the box.
          </h1>
          <p className="mt-5 text-lg text-mute max-w-md">
            <span className="text-offwhite font-semibold">nex-ON</span> — the
            embodied agentic OS. One edge unit between an AI brain and any robot
            body.
          </p>
        </Beat>

        {/* ── Act 2 · thesis ─────────────────────────────────────────── */}
        <Beat
          progress={scrollYProgress}
          range={[0.2, 0.26, 0.34, 0.4]}
          className="left-6 lg:left-8 top-1/2 -translate-y-1/2 max-w-lg"
        >
          <p className="text-xs font-mono uppercase tracking-[0.2em] text-accent mb-4">
            The layer
          </p>
          <p className="text-3xl md:text-4xl font-bold text-offwhite leading-tight tracking-tight">
            It sits between an AI brain and a robot body — and turns
            &ldquo;understand the goal&rdquo; into{" "}
            <span className="text-accent">perceive, choose a tool, and act.</span>
          </p>
        </Beat>

        {/* ── Act 3 · top / vents / the loop ─────────────────────────── */}
        <Beat
          progress={scrollYProgress}
          range={[0.4, 0.46, 0.56, 0.62]}
          className="right-6 lg:right-8 top-1/2 -translate-y-1/2 max-w-md text-right"
        >
          <p className="text-xs font-mono uppercase tracking-[0.2em] text-accent mb-4">
            The agent loop
          </p>
          <p className="text-4xl md:text-5xl font-bold text-offwhite leading-tight tracking-tight">
            Perceive. Reason. Act.
          </p>
          <p className="mt-4 text-mute leading-relaxed">
            An agentic tool-calling loop decides when to look, what to measure,
            and where to move — then narrates what it did. Dry by default; the
            arc is off until you arm it.
          </p>
        </Beat>

        {/* ── Act 4 · back / ports / any body ────────────────────────── */}
        <Beat
          progress={scrollYProgress}
          range={[0.62, 0.68, 0.78, 0.82]}
          className="left-6 lg:left-8 top-1/2 -translate-y-1/2 max-w-md"
        >
          <p className="text-xs font-mono uppercase tracking-[0.2em] text-accent mb-4">
            Any body plugs in
          </p>
          <p className="text-4xl md:text-5xl font-bold text-offwhite leading-tight tracking-tight">
            Plug in any robot.
          </p>
          <p className="mt-4 text-mute leading-relaxed">
            Perception, tooling, and control are interfaces — not fixed wiring.
            A new arm or a new sensor is a port on the back, not a rebuild.
          </p>
        </Beat>

        {/* ── Act 5 · one platform, any body ─────────────────────────── */}
        <Beat
          progress={scrollYProgress}
          range={[0.82, 0.88, 0.99, 1]}
          className="left-6 lg:left-8 bottom-24 max-w-xl pointer-events-auto"
        >
          <p className="text-xs font-mono uppercase tracking-[0.2em] text-accent mb-4">
            One platform
          </p>
          <p className="text-4xl md:text-5xl font-bold text-offwhite leading-tight tracking-tight">
            One brain. Any body.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/omnicron"
              className="inline-flex items-center gap-2 rounded-full border border-accent/40 bg-accent/10 px-4 py-2 text-sm text-offwhite hover:border-accent transition-colors"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-accent" />
              Omnicron — welding, proven
              <ArrowRight size={14} className="text-accent" />
            </Link>
            <Link
              href="/orio"
              className="inline-flex items-center gap-2 rounded-full border border-dashed border-steel bg-carbon/60 px-4 py-2 text-sm text-mute hover:border-accent/50 hover:text-offwhite transition-colors"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-mute" />
              Orio — public assistant, soon
              <ArrowRight size={14} />
            </Link>
          </div>
        </Beat>

        {/* Scroll hint — only while the first act holds */}
        <Beat
          progress={scrollYProgress}
          range={[0, 0.01, 0.05, 0.1]}
          className="left-1/2 -translate-x-1/2 bottom-6 flex flex-col items-center gap-1 text-mute"
        >
          <span className="text-[10px] font-mono uppercase tracking-[0.2em]">
            Scroll
          </span>
          <ChevronDown size={16} />
        </Beat>
      </div>
    </section>
  );
}
