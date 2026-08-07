"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Canvas } from "@react-three/fiber";
import { Html, useProgress } from "@react-three/drei";
import {
  animate,
  motion,
  useMotionValue,
  useMotionTemplate,
  useScroll,
  useTransform,
  useMotionValueEvent,
  type MotionValue,
} from "framer-motion";
import { ArrowRight, ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
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

// Phone copy for the horizontal filmstrip — the same five beats, trimmed to
// read on a narrow panel. The last act carries the product links.
const MOBILE_ACTS: {
  eyebrow: string;
  title: string;
  body?: string;
  links?: boolean;
}[] = [
  {
    eyebrow: "Edge unit",
    title: "Robotics, out of the box.",
    body: "nex-ON — the embodied OS. One edge unit between an AI brain and any robot body.",
  },
  {
    eyebrow: "The layer",
    title: "Perceive, choose a tool, and act.",
    body: "nex-ON sits between an AI brain and a robot body — turning “understand the goal” into action.",
  },
  {
    eyebrow: "The agent loop",
    title: "Perceive. Reason. Act.",
    body: "A tool-calling loop decides when to look, what to measure, and where to move — then narrates it. Dry by default until you arm it.",
  },
  {
    eyebrow: "Any body plugs in",
    title: "Plug in any robot.",
    body: "Perception, tooling, and control are interfaces — not fixed wiring. A new arm or sensor is a port on the back, not a rebuild.",
  },
  {
    eyebrow: "One platform",
    title: "One brain. Any body.",
    links: true,
  },
];

// Each act's hold-center in progress terms — the box's stops, the scroll-snap
// rulers, the compact act spring, and the filmstrip offsets all key off these.
const ACT_PROGRESS = [0.086, 0.323, 0.548, 0.785, 1];

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
  // Compact = phones + tablets (below the xl desktop breakpoint). There the
  // scroll experience is disabled and the acts are stepped through with
  // prev/next buttons instead — vertical scroll driving horizontal movement was
  // awkward on touch.
  const [isCompact, setIsCompact] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 1279px)");
    const apply = () => setIsCompact(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  // Compact: the stage is exactly one small-viewport tall and scroll is disabled,
  // so lock body scroll to stop the mobile browser chrome from leaving a
  // scrollable gap below it. Only mounts on the home page, so other routes still
  // scroll normally.
  useEffect(() => {
    if (!isCompact) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [isCompact]);

  const { scrollYProgress } = useScroll({
    target: stageRef,
    offset: ["start start", "end end"],
  });

  // One progress value drives the whole scene, overlays, and filmstrip. On
  // desktop it mirrors the scroll; on compact a spring eases it between the
  // per-act stops as the buttons change `act`.
  const progress = useMotionValue(0);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    if (isCompact) return;
    progress.set(v);
    setAct(Math.min(ACTS.length - 1, Math.floor(v * ACTS.length)));
  });

  useEffect(() => {
    if (!isCompact) return;
    const controls = animate(progress, ACT_PROGRESS[act], {
      type: "spring",
      stiffness: 180,
      damping: 26,
      mass: 0.9,
    });
    return () => controls.stop();
  }, [act, isCompact, progress]);

  // Entering desktop (mount, or resizing up from compact): align progress with
  // the actual scroll position so nothing lags a frame or lands mid-page stale.
  useEffect(() => {
    if (!isCompact) progress.set(scrollYProgress.get());
  }, [isCompact, progress, scrollYProgress]);

  const go = (dir: -1 | 1) =>
    setAct((a) => Math.min(ACTS.length - 1, Math.max(0, a + dir)));

  const railScale = useTransform(progress, [0, 1], [0, 1]);

  // Act 1 and the scroll hint must be on screen at first paint, so their
  // entrance is a one-shot mount reveal (0 → 1, animated in the effect below)
  // rather than a scroll fade-in; scroll then drives their exit. Reveal and exit
  // are folded into single opacity/offset values so each overlay stays ONE
  // motion element. (Nesting a mount-animated child under a scroll-driven parent
  // left the hero stuck at full opacity in Chrome — it never composited the
  // parent's fade.)
  const heroReveal = useMotionValue(0);
  const hintReveal = useMotionValue(0);
  useEffect(() => {
    const h = animate(heroReveal, 1, {
      duration: 0.7,
      ease: [0.4, 0, 0.2, 1],
      delay: 0.2,
    });
    const s = animate(hintReveal, 1, { duration: 0.6, delay: 0.5 });
    return () => {
      h.stop();
      s.stop();
    };
  }, [heroReveal, hintReveal]);

  const heroExit = useTransform(progress, [0.15, 0.204], [1, 0]);
  const heroExitY = useTransform(progress, [0.15, 0.204], [0, -24]);
  const heroOpacity = useTransform(() => heroReveal.get() * heroExit.get());
  const heroY = useTransform(() => (1 - heroReveal.get()) * 24 + heroExitY.get());

  const hintExit = useTransform(progress, [0.054, 0.108], [1, 0]);
  const hintOpacity = useTransform(() => hintReveal.get() * hintExit.get());

  // Act 5 fades in on the last beat, then holds to the end.
  const act5Opacity = useTransform(progress, [0.882, 0.946, 1], [0, 1, 1]);
  const act5Y = useTransform(progress, [0.882, 0.946, 1], [24, 0, 0]);

  // Compact filmstrip: the five acts ride a horizontal track whose offset keys
  // off the same progress, so panel and box move together — each act centering a
  // full panel. 20% = one panel of the 500vw track. On compact the act spring
  // eases progress between stops, so each button press slides one panel over.
  const trackXNum = useTransform(progress, ACT_PROGRESS, [0, -20, -40, -60, -80]);
  const trackX = useMotionTemplate`${trackXNum}%`;

  return (
    // 5.6 viewport-heights of scroll distance drives the 5 acts; the canvas and
    // overlays are pinned inside while the page scrolls past. The last act lands
    // at the section bottom, so there's no empty scroll past it.
    // Desktop: a tall (560vh) scroll section drives the acts. Compact: a fixed
    // 100vh stage with no scroll — the buttons step through the acts instead.
    <section
      ref={stageRef}
      className="relative bg-[#f1f1ea]"
      // Compact: the small-viewport height (excludes the mobile browser chrome)
      // so the whole stage — box, text, and buttons — fits without scrolling.
      style={{ height: isCompact ? "100svh" : "560vh" }}
    >
      {/* ── Scroll-snap steps (desktop only) ─────────────────────────────
          A zero-height ruler at each act's hold-center. The 560vh section
          pins a 100vh canvas, so its scrollable run is 460vh and a ruler at
          `p · 460vh` sits exactly where progress === p — the moment each view
          is fully composed. CSS scroll-snap (set on <html>) rests the page on
          these, so scrolling settles view-to-view instead of scrubbing. */}
      {!isCompact &&
        ACT_PROGRESS.map((p) => (
          <div
            key={p}
            aria-hidden
            className="absolute left-0 h-px w-px snap-start"
            style={{ top: `${p * 460}vh` }}
          />
        ))}

      <div
        className={`w-full overflow-hidden ${
          isCompact ? "relative h-[100svh]" : "sticky top-0 h-screen"
        }`}
      >
        {/* Background, behind the transparent canvas: the light studio surface. */}
        <div aria-hidden className="absolute inset-0" style={LIGHT_SURFACE} />

        {mounted && (
          <Canvas
            // Compact: confine the box to the upper part of the stage so the
            // bottom stays clear for the act text and the buttons (no dark text
            // landing on the dark box). Desktop: full-bleed.
            className={
              isCompact ? "absolute inset-x-0 top-0 h-[60svh]" : "absolute inset-0"
            }
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
              <NexonScene progress={progress} />
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
          <div className="absolute bottom-6 right-6 lg:right-8 text-[10px] font-mono uppercase tracking-[0.18em] text-right leading-relaxed max-xl:hidden">
            pre-deployed nex-ON platform
            <br />
            voice · vision · motion · tooling
          </div>

          {/* Act rail + readout — desktop only (compact shows dots below) */}
          <div className="absolute bottom-6 left-6 lg:left-8 flex items-center gap-3 max-xl:hidden">
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

        {/* ── Mobile filmstrip (phones only) ───────────────────────────
            The desktop overlays above are hidden below md; here the five acts
            ride a horizontal track that slides one panel left at each stop,
            driven by the same vertical scroll. The box stays pinned behind. */}
        <motion.div
          style={{ x: trackX }}
          className="xl:hidden pointer-events-none absolute inset-0 flex w-[500vw]"
        >
          {MOBILE_ACTS.map((a, i) => (
            <div
              key={a.eyebrow}
              className={`flex h-full w-screen shrink-0 flex-col justify-end px-6 pb-28 ${
                a.links ? "pointer-events-auto" : ""
              }`}
            >
              <p className="mb-3 text-[11px] font-mono uppercase tracking-[0.2em] text-accent">
                {a.eyebrow}
              </p>
              <h2
                className={`font-black tracking-tight text-[#141414] leading-[1.05] ${
                  i === 0 ? "text-4xl" : "text-3xl"
                }`}
              >
                {a.title}
              </h2>
              {a.body && (
                <p className="mt-4 max-w-sm text-base leading-relaxed text-[#1a1a1a]/75">
                  {a.body}
                </p>
              )}
              {a.links && (
                <div className="mt-6 flex flex-col items-start gap-3">
                  <Link
                    href="/omnicron"
                    className="inline-flex items-center gap-2 rounded-full border border-accent/60 bg-accent/15 px-4 py-2 text-sm text-[#141414]"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                    Omnicron — welding, proven
                    <ArrowRight size={14} className="text-[#141414]" />
                  </Link>
                  <Link
                    href="/orio"
                    className="inline-flex items-center gap-2 rounded-full border border-dashed border-[#1a1a1a]/35 px-4 py-2 text-sm text-[#1a1a1a]/70"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-[#1a1a1a]/50" />
                    Orio — public assistant, soon
                    <ArrowRight size={14} />
                  </Link>
                </div>
              )}
            </div>
          ))}
        </motion.div>

        {/* ── Act 1 · hero ─────────────────────────────────────────────
            One element: reveals on mount (present at first paint), fades and
            lifts out on scroll as act 2 takes over. */}
        <motion.div
          style={{ opacity: heroOpacity, y: heroY }}
          className="pointer-events-none absolute left-6 lg:left-8 bottom-24 max-w-2xl max-xl:hidden"
        >
          {/* Satoshi (not Orbitron — reserved for product names), dark on the
              light studio surface. */}
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tight text-[#141414] leading-[0.95]">
            Robotics,
            <br />
            out of the box.
          </h1>
          <p className="mt-5 text-lg text-[#1a1a1a]/75 max-w-md">
            <span className="text-[#141414] font-semibold">nex-ON</span> — the
            embodied OS. One edge unit between an AI brain and any robot body.
          </p>
        </motion.div>

        {/* ── Act 2 · thesis ─────────────────────────────────────────── */}
        <Beat
          progress={progress}
          range={[0.215, 0.28, 0.366, 0.43]}
          className="left-6 lg:left-8 top-1/2 -translate-y-1/2 max-w-lg max-xl:hidden"
        >
          <p className="text-xs font-mono uppercase tracking-[0.2em] text-accent mb-4">
            The layer
          </p>
          <p className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#141414] leading-tight tracking-tight">
            It sits between an AI brain and a robot body — and turns
            &ldquo;understand the goal&rdquo; into{" "}
            <span className="text-accent">perceive, choose a tool, and act.</span>
          </p>
        </Beat>

        {/* ── Act 3 · top / vents / the loop ─────────────────────────── */}
        <Beat
          progress={progress}
          range={[0.43, 0.495, 0.602, 0.667]}
          className="right-6 lg:right-8 top-1/2 -translate-y-1/2 max-w-md text-right max-xl:hidden"
        >
          <p className="text-xs font-mono uppercase tracking-[0.2em] text-accent mb-4">
            The agent loop
          </p>
          <p className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#141414] leading-tight tracking-tight">
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
          progress={progress}
          range={[0.667, 0.731, 0.839, 0.882]}
          className="left-6 lg:left-8 top-1/2 -translate-y-1/2 max-w-md max-xl:hidden"
        >
          <p className="text-xs font-mono uppercase tracking-[0.2em] text-accent mb-4">
            Any body plugs in
          </p>
          <p className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#141414] leading-tight tracking-tight">
            Plug in any robot.
          </p>
          <p className="mt-4 text-[#1a1a1a]/75 leading-relaxed">
            Perception, tooling, and control are interfaces — not fixed wiring.
            A new arm or a new sensor is a port on the back, not a rebuild.
          </p>
        </Beat>

        {/* ── Act 5 · one platform, any body ───────────────────────────
            The last thing on the page: fades in on the final beat and holds to
            the bottom (no fade-out), so its links stay reachable at rest. */}
        <motion.div
          style={{ opacity: act5Opacity, y: act5Y }}
          className="pointer-events-auto absolute left-6 lg:left-8 bottom-24 max-w-xl max-xl:hidden"
        >
          <p className="text-xs font-mono uppercase tracking-[0.2em] text-accent mb-4">
            One platform
          </p>
          <p className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#141414] leading-tight tracking-tight">
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
        </motion.div>

        {/* Scroll hint — desktop only (scroll is disabled on compact). Present
            on load, fades out once you start scrolling. Opacity-only (no
            transform) so the -translate-x centering survives. */}
        <motion.div
          style={{ opacity: hintOpacity }}
          className="pointer-events-none absolute left-1/2 -translate-x-1/2 bottom-6 flex flex-col items-center gap-1 text-[#1a1a1a]/70 max-xl:hidden"
        >
          <span className="text-[10px] font-mono uppercase tracking-[0.2em]">
            Scroll
          </span>
          <ChevronDown size={16} />
        </motion.div>

        {/* ── Compact controls (below xl) ──────────────────────────────
            Scroll is disabled here, so prev/next (and the dots) step through
            the acts, easing `progress` between stops. */}
        <div className="xl:hidden pointer-events-auto absolute bottom-7 left-1/2 -translate-x-1/2 flex items-center gap-3">
          <button
            type="button"
            onClick={() => go(-1)}
            disabled={act === 0}
            aria-label="Previous"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-[#141414]/20 bg-white/70 text-[#141414] backdrop-blur transition-colors hover:border-accent disabled:pointer-events-none disabled:opacity-30"
          >
            <ChevronLeft size={18} />
          </button>

          <div className="flex items-center gap-1.5">
            {ACTS.map((label, i) => (
              <button
                key={label}
                type="button"
                onClick={() => setAct(i)}
                aria-label={`Go to ${label}`}
                aria-current={i === act}
                className={`h-1.5 rounded-full transition-all ${
                  i === act ? "w-5 bg-accent" : "w-1.5 bg-[#141414]/25"
                }`}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={() => go(1)}
            disabled={act === ACTS.length - 1}
            aria-label="Next"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-[#141414]/20 bg-white/70 text-[#141414] backdrop-blur transition-colors hover:border-accent disabled:pointer-events-none disabled:opacity-30"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </section>
  );
}
