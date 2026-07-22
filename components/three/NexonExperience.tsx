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
        <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#141414]">
          Booting nex-ON
        </span>
        <span className="w-full h-px bg-[#1a1a1a]/20 overflow-hidden">
          <span
            className="block h-full bg-accent transition-[width] duration-200"
            style={{ width: `${progress}%` }}
          />
        </span>
        <span className="text-[10px] font-mono text-[#1a1a1a]/60 tabular-nums">
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

// A soft studio surface: a bright near-white radial wash (brighter up-left)
// under a faint blueprint grid of dark lines. Rendered as a DOM layer behind
// the transparent canvas, so it sits behind the box and the contact shadow
// reads against it.
const LIGHT_SURFACE: React.CSSProperties = {
  backgroundImage: [
    "linear-gradient(rgba(20,22,20,0.055) 1px, transparent 1px)",
    "linear-gradient(90deg, rgba(20,22,20,0.055) 1px, transparent 1px)",
    "radial-gradient(120% 120% at 45% 30%, #fbfbf8 0%, #f1f1ea 46%, #e5e5dd 100%)",
  ].join(","),
  backgroundSize: "54px 54px, 54px 54px, 100% 100%",
};

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
    <section ref={stageRef} className="relative bg-[#f1f1ea]" style={{ height: "600vh" }}>
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
        {/* Background, behind the transparent canvas: the light studio surface. */}
        <div aria-hidden className="absolute inset-0" style={LIGHT_SURFACE} />

        {mounted && (
          <Canvas
            className="absolute inset-0"
            dpr={[1, 2]}
            camera={{ position: [0, 0, 6], fov: 35 }}
            gl={{ antialias: true, powerPreference: "high-performance" }}
            // Drop shadow off the box's silhouette (canvas is transparent), lit
            // from upper-left so it falls down-right onto the studio surface.
            // Tracks the box automatically as it rotates through the scroll.
            style={{
              filter:
                "drop-shadow(0 16px 22px rgba(15,15,15,0.24)) drop-shadow(10px 30px 46px rgba(15,15,15,0.18))",
            }}
          >
            <Suspense fallback={<CanvasLoader />}>
              <NexonScene progress={scrollYProgress} />
            </Suspense>
          </Canvas>
        )}

        {/* ── HUD chrome ─────────────────────────────────────────────── */}
        {/* Near-black on the light studio surface. */}
        <div className="pointer-events-none absolute inset-0 select-none text-[#1a1a1a]/70">
          <div className="absolute top-20 left-6 lg:left-8 text-[10px] font-mono uppercase tracking-[0.18em]">
            nex-ON // hardware
          </div>
          <div className="absolute top-20 right-6 lg:right-8 text-[10px] font-mono uppercase tracking-[0.18em] text-right">
            edge unit · rev a
          </div>
          <div className="absolute bottom-6 right-6 lg:right-8 text-[10px] font-mono uppercase tracking-[0.18em] text-right leading-relaxed">
            pre-deployed nex-ON platform
            <br />
            voice · vision · motion · tooling
          </div>

          {/* Act rail + readout */}
          <div className="absolute bottom-6 left-6 lg:left-8 flex items-center gap-3">
            <div className="relative h-16 w-px bg-[#1a1a1a]/20 overflow-hidden">
              <motion.div
                style={{ scaleY: railScale }}
                className="absolute inset-0 origin-top bg-accent"
              />
            </div>
            <div className="text-[10px] font-mono uppercase tracking-[0.18em]">
              <span className="text-accent tabular-nums font-semibold">
                {String(act + 1).padStart(2, "0")}
              </span>
              <span className="text-[#1a1a1a]/40"> / {String(ACTS.length).padStart(2, "0")}</span>
              <br />
              <span className="text-[#1a1a1a]">{ACTS[act]}</span>
            </div>
          </div>
        </div>

        {/* ── Act 1 · hero ───────────────────────────────────────────── */}
        <Beat
          progress={scrollYProgress}
          range={[0, 0.02, 0.14, 0.19]}
          className="left-6 lg:left-8 bottom-24 max-w-2xl"
        >
          {/* Satoshi (not Orbitron — reserved for product names), dark on the
              light studio surface. */}
          <h1 className="text-5xl md:text-7xl font-black tracking-tight text-[#141414] leading-[0.95]">
            Robotics,
            <br />
            out of the box.
          </h1>
          <p className="mt-5 text-lg text-[#1a1a1a]/75 max-w-md">
            <span className="text-[#141414] font-semibold">nex-ON</span> — the
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
          <p className="text-3xl md:text-4xl font-bold text-[#141414] leading-tight tracking-tight">
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
          <p className="text-4xl md:text-5xl font-bold text-[#141414] leading-tight tracking-tight">
            Perceive. Reason. Act.
          </p>
          <p className="mt-4 text-[#1a1a1a]/75 leading-relaxed">
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
          <p className="text-4xl md:text-5xl font-bold text-[#141414] leading-tight tracking-tight">
            Plug in any robot.
          </p>
          <p className="mt-4 text-[#1a1a1a]/75 leading-relaxed">
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
          <p className="text-4xl md:text-5xl font-bold text-[#141414] leading-tight tracking-tight">
            One brain. Any body.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/omnicron"
              className="inline-flex items-center gap-2 rounded-full border border-accent/60 bg-accent/15 px-4 py-2 text-sm text-[#141414] hover:border-accent hover:bg-accent/25 transition-colors"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-accent" />
              Omnicron — welding, proven
              <ArrowRight size={14} className="text-[#141414]" />
            </Link>
            <Link
              href="/orio"
              className="inline-flex items-center gap-2 rounded-full border border-dashed border-[#1a1a1a]/35 px-4 py-2 text-sm text-[#1a1a1a]/70 hover:border-[#141414] hover:text-[#141414] transition-colors"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#1a1a1a]/50" />
              Orio — public assistant, soon
              <ArrowRight size={14} />
            </Link>
          </div>
        </Beat>

        {/* Scroll hint — only while the first act holds */}
        <Beat
          progress={scrollYProgress}
          range={[0, 0.01, 0.05, 0.1]}
          className="left-1/2 -translate-x-1/2 bottom-6 flex flex-col items-center gap-1 text-[#1a1a1a]/70"
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
