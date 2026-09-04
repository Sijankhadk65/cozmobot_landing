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
import {
  ArrowRight,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  RotateCcw,
} from "lucide-react";
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
// progress that choreographs the unit, so copy and camera stay locked together.
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

// ── Shared overlay atoms ──────────────────────────────────────────────────────
// The software overlays are the subject of acts 2–4, so they are drawn as real
// diagrams rather than decoration: dark ink on the light studio surface, with
// the lime reserved for the nex-ON layer itself.

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-xs font-mono uppercase tracking-[0.2em] text-accent mb-4">
      {children}
    </p>
  );
}

function ActTitle({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#141414] leading-tight tracking-tight">
      {children}
    </p>
  );
}

function ActBody({ children }: { children: React.ReactNode }) {
  return (
    <p className="mt-4 text-[#1a1a1a]/75 leading-relaxed max-w-md">{children}</p>
  );
}

// ── Act widgets ──────────────────────────────────────────────────────────────
// One per act, each visualising that act's idea. They are instruments, not
// controls: everything animates on a loop, nothing responds to input, and they
// sit inside `pointer-events-none` beats so they can never take a click. Act 5
// has no widget — there the unit itself is the visual.
//
// All motion is transform/opacity only so it stays composited, and the loops are
// slow enough to read as a live readout rather than decoration.

// Shared instrument-panel chrome, so the four read as one family.
function Panel({
  label,
  meta,
  children,
}: {
  label: string;
  meta?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="w-full rounded-xl border border-[#1a1a1a]/15 bg-white/45 p-4 backdrop-blur-[1px]">
      <div className="mb-3.5 flex items-baseline justify-between gap-3">
        <span className="text-[10px] font-mono uppercase tracking-[0.18em] text-[#1a1a1a]/45">
          {label}
        </span>
        {meta && (
          <span className="text-[10px] font-mono uppercase tracking-[0.18em] text-[#1a1a1a]/35">
            {meta}
          </span>
        )}
      </div>
      {children}
    </div>
  );
}

function Chip({
  children,
  tone = "plain",
}: {
  children: React.ReactNode;
  tone?: "plain" | "accent" | "ghost";
}) {
  const base =
    "rounded border px-2 py-1.5 text-[10px] font-mono uppercase tracking-[0.1em] whitespace-nowrap";
  const tones = {
    plain: "border-[#1a1a1a]/20 bg-white/70 text-[#1a1a1a]/75",
    accent: "border-accent bg-accent/20 text-[#141414]",
    ghost: "border-dashed border-[#1a1a1a]/25 bg-transparent text-[#1a1a1a]/40",
  };
  return <span className={`${base} ${tones[tone]}`}>{children}</span>;
}

// Act 1 — the deployment path as it is today: a long chain of specialist steps,
// a run that never quite lands, and a loop back to the start the moment the
// real world moves. The dot crawling forward and snapping back IS the argument.
function ProblemPipeline() {
  const steps = ["Specialist", "CAD model", "Program", "Jog points", "Test"];
  return (
    <Panel label="Deployment path · today" meta="weeks">
      <div className="flex flex-wrap items-center gap-x-1.5 gap-y-2">
        {steps.map((step, i) => (
          <div key={step} className="flex items-center gap-1.5">
            <Chip>{step}</Chip>
            {/* Hidden on phones: the row wraps there, and a connector that
                lands at a wrap point dangles off the end of the line. */}
            {i < steps.length - 1 && (
              <span className="hidden h-px w-3 bg-[#1a1a1a]/20 sm:block" />
            )}
          </div>
        ))}
      </div>

      {/* The run: creeps forward, never reaches the end, snaps back. */}
      <div className="relative mt-5 h-px w-full bg-[#1a1a1a]/15">
        <motion.span
          className="absolute -top-[3px] block h-1.5 w-1.5 rounded-full bg-accent"
          animate={{ left: ["0%", "74%", "0%"] }}
          transition={{
            duration: 5.4,
            times: [0, 0.88, 1],
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </div>

      <motion.div
        className="mt-4 flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.14em] text-[#1a1a1a]/55"
        animate={{ opacity: [0.25, 1, 0.25] }}
        transition={{ duration: 5.4, times: [0, 0.9, 1], repeat: Infinity }}
      >
        <RotateCcw size={12} className="text-[#1a1a1a]/45" />
        The part moved — start again
      </motion.div>
    </Panel>
  );
}

// Act 2 — the stack, with traffic on it: a goal descends through the layers and
// a report comes back up. The middle row is the only lime one, because that is
// the only row we sell.
function OsStack() {
  const rows = [
    { label: "Applications", items: "any task you can describe", accent: false },
    {
      label: "nex-ON",
      items: "perception · reasoning · tooling · motion",
      accent: true,
    },
    { label: "Any body", items: "any robot you already own", accent: false },
  ];
  return (
    <Panel label="The stack" meta="one brain · any body">
      <div className="flex gap-3">
        {/* The rail: goal travelling down, report travelling back up. */}
        <div aria-hidden className="relative w-2 shrink-0">
          <div className="absolute left-1/2 top-1 h-[calc(100%-8px)] w-px -translate-x-1/2 bg-[#1a1a1a]/15" />
          <motion.span
            className="absolute left-1/2 block h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-accent"
            animate={{ top: ["2%", "94%"] }}
            transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.span
            className="absolute left-1/2 block h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-[#1a1a1a]/30"
            animate={{ top: ["94%", "2%"] }}
            transition={{
              duration: 2.8,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1.4,
            }}
          />
        </div>

        <div className="flex-1 space-y-1.5">
          {rows.map((r) => (
            <div
              key={r.label}
              className={`rounded-lg border px-3.5 py-2.5 ${
                r.accent
                  ? "border-accent bg-accent/20"
                  : "border-[#1a1a1a]/15 bg-white/55"
              }`}
            >
              <p
                className={`text-[10px] font-mono uppercase tracking-[0.18em] ${
                  r.accent ? "text-[#141414]" : "text-[#1a1a1a]/50"
                }`}
              >
                {r.label}
              </p>
              <p className="mt-0.5 text-sm text-[#1a1a1a]/80">{r.items}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-3 flex justify-between pl-5 text-[10px] font-mono uppercase tracking-[0.16em] text-[#1a1a1a]/40">
        <span>goal ↓</span>
        <span>↑ report</span>
      </div>
    </Panel>
  );
}

// Act 3 — the loop, drawn as a loop. An arc chases itself around the cycle
// (SMIL, so it costs no JS) while a call log ticks over beside it, and the
// standing safety state sits underneath where an operator would look for it.
function RuntimeLoop() {
  const calls = ["look(scene)", "measure(joint)", "plan(path)", "move(pose)"];
  return (
    <Panel label="The runtime" meta="tool-calling loop">
      <div className="flex items-center gap-4">
        <div aria-hidden className="relative h-[132px] w-[132px] shrink-0">
          <svg viewBox="0 0 100 100" className="h-full w-full">
            <circle
              cx="50"
              cy="50"
              r="36"
              fill="none"
              stroke="rgba(26,26,26,0.15)"
              strokeWidth="1"
            />
            <circle
              cx="50"
              cy="50"
              r="36"
              fill="none"
              stroke="#add037"
              strokeWidth="2"
              strokeLinecap="round"
              strokeDasharray="52 174"
            >
              <animateTransform
                attributeName="transform"
                type="rotate"
                from="0 50 50"
                to="360 50 50"
                dur="3.6s"
                repeatCount="indefinite"
              />
            </circle>
          </svg>
          <span className="absolute left-1/2 top-[6px] -translate-x-1/2 bg-white/70 px-1 text-[9px] font-mono uppercase tracking-[0.12em] text-[#141414]">
            Perceive
          </span>
          <span className="absolute bottom-[14px] right-[-6px] bg-white/70 px-1 text-[9px] font-mono uppercase tracking-[0.12em] text-[#141414]">
            Reason
          </span>
          <span className="absolute bottom-[14px] left-[-2px] bg-white/70 px-1 text-[9px] font-mono uppercase tracking-[0.12em] text-[#141414]">
            Act
          </span>
        </div>

        <div className="min-w-0 flex-1">
          <p className="mb-2 text-[10px] font-mono uppercase tracking-[0.16em] text-[#1a1a1a]/40">
            Calls
          </p>
          <div className="space-y-1.5">
            {calls.map((c, i) => (
              <motion.p
                key={c}
                className="truncate font-mono text-[11px] text-[#1a1a1a]/70"
                animate={{ opacity: [0.2, 1, 1, 0.2] }}
                transition={{
                  duration: 3.6,
                  times: [0, 0.12, 0.4, 0.6],
                  repeat: Infinity,
                  delay: i * 0.9,
                }}
              >
                {c}
              </motion.p>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-accent/50 bg-accent/15 px-3 py-1.5">
        <motion.span
          className="block h-1.5 w-1.5 rounded-full bg-accent"
          animate={{ opacity: [1, 0.25, 1] }}
          transition={{ duration: 1.8, repeat: Infinity }}
        />
        <span className="text-[10px] font-mono uppercase tracking-[0.18em] text-[#141414]">
          Dry run — not armed
        </span>
      </div>
    </Panel>
  );
}

// Act 4 — the OS as a backplane. Apps clip in above, drivers below, nex-ON is
// the bus between them; the dashed slots are the point — there is always
// another one, and it costs a driver rather than a rebuild.
function DriverBus() {
  const apps = [
    { label: "Welding", proven: true },
    { label: "Assembly", proven: false },
    { label: "Inspection", proven: false },
  ];
  const bodies = [
    { label: "Robot arm", proven: true },
    { label: "Mobile", proven: false },
    { label: "Humanoid", proven: false },
  ];

  const row = (
    items: { label: string; proven: boolean }[],
    caption: string,
  ) => (
    <div>
      <p className="mb-2 text-[10px] font-mono uppercase tracking-[0.16em] text-[#1a1a1a]/40">
        {caption}
      </p>
      <div className="flex flex-wrap items-center gap-1.5">
        {items.map((it) => (
          <span key={it.label} className="inline-flex items-center gap-1.5">
            {it.proven && <CheckCircle2 size={11} className="text-accent" />}
            <Chip tone={it.proven ? "plain" : "ghost"}>{it.label}</Chip>
          </span>
        ))}
        <motion.span
          animate={{ opacity: [0.3, 0.85, 0.3] }}
          transition={{ duration: 2.4, repeat: Infinity }}
        >
          <Chip tone="ghost">+</Chip>
        </motion.span>
      </div>
    </div>
  );

  return (
    <Panel label="Drivers & apps" meta="one platform">
      {row(apps, "apps · tasks")}

      {/* The bus. Ticks above and below stand for the slots clipping into it. */}
      <div aria-hidden className="my-3 flex items-center gap-2">
        <div className="h-3 w-px bg-[#1a1a1a]/20" />
        <div className="relative flex-1 overflow-hidden rounded-md border border-accent bg-accent/20 py-2 text-center">
          <span className="relative z-10 text-[10px] font-mono uppercase tracking-[0.2em] text-[#141414]">
            nex-ON
          </span>
          {/* a carrier running along the bus */}
          <motion.span
            className="absolute inset-y-0 z-0 w-16 bg-gradient-to-r from-transparent via-white/55 to-transparent"
            animate={{ left: ["-20%", "110%"] }}
            transition={{ duration: 3.2, repeat: Infinity, ease: "linear" }}
          />
        </div>
        <div className="h-3 w-px bg-[#1a1a1a]/20" />
      </div>

      {row(bodies, "drivers · bodies")}
    </Panel>
  );
}

const ACTS = [
  "The problem",
  "The OS",
  "The runtime",
  "Any body",
  "Install it",
];

// Phone copy for the horizontal filmstrip — the same five beats, trimmed to
// read on a narrow panel. The last act carries the product links.
const MOBILE_ACTS: {
  eyebrow: string;
  title: string;
  body?: string;
  links?: boolean;
  // The same widget as the desktop act, stacked above the copy. Act 5 has none
  // — there the unit is the visual.
  Widget?: () => React.JSX.Element;
}[] = [
  {
    eyebrow: "The problem",
    title: "Every robot needs a programmer.",
    body: "Putting a robot to work still means a specialist, a program, and a model of the world that reality keeps breaking.",
    Widget: ProblemPipeline,
  },
  {
    eyebrow: "The OS",
    title: "An operating system for robots.",
    body: "nex-ON is the layer between an AI that understands the goal and the machine that carries it out. One brain, any body.",
    Widget: OsStack,
  },
  {
    eyebrow: "The runtime",
    title: "Perceive. Reason. Act.",
    body: "A tool-calling loop decides what to look at, what to measure, and where to move — then says what it did. Nothing runs live until you arm it.",
    Widget: RuntimeLoop,
  },
  {
    eyebrow: "Any body",
    title: "Bodies are drivers. Tasks are apps.",
    body: "A new robot is a driver, not a rebuild — and every capability you add works for the next robot too.",
    Widget: DriverBus,
  },
  {
    eyebrow: "Install it",
    title: "Licensed software. Your robot, your compute.",
    body: "No fleet to buy and no machine to replace. Install it above the robots and the compute you already have.",
    links: true,
  },
];

// Each act's hold-center in progress terms — the unit's stops, the scroll-snap
// rulers, the compact act spring, and the filmstrip offsets all key off these.
const ACT_PROGRESS = [0.086, 0.323, 0.548, 0.785, 1];

// A soft studio surface: a bright near-white radial wash (brighter up-left)
// under a faint blueprint grid of dark lines. Rendered as a DOM layer behind
// the transparent canvas, so it sits behind the unit and the contact shadow
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

  // The unit is invisible until act 4, so there is no reason to run a WebGL
  // context — or hold the decoded GLB in memory — through the opening acts.
  // It mounts at 0.5, well before the fade starts at 0.8, so context
  // creation, the first render and the Suspense fallback all happen behind
  // opacity 0. Mounting closer to the fade put that work on screen as a hitch.
  // Never unmounts. (The model is preloaded at module scope by nexon-scene, so
  // this costs a mount, not a download.)
  const [unitMounted, setUnitMounted] = useState(false);
  useMotionValueEvent(progress, "change", (v) => {
    if (!unitMounted && v > 0.5) setUnitMounted(true);
  });

  const go = (dir: -1 | 1) =>
    setAct((a) => Math.min(ACTS.length - 1, Math.max(0, a + dir)));

  const railScale = useTransform(progress, [0, 1], [0, 1]);

  // The demotion, in the DOM half — and the whole reason the page no longer
  // reads as hardware. The unit is simply absent for the first three acts:
  // nex-ON is software, so the software gets the opening to itself, carried by
  // text and diagrams alone.
  //
  // A plain two-point ramp, not a per-act keyframe list: hidden through act 4's
  // hold-center (0.785), fully OPAQUE well before act 5. Landing on a partial
  // opacity left a dark object with the background grid showing through it — it
  // read as a ghost rather than a thing on a table. The demotion is carried by
  // how small it is, never by making it translucent.
  //
  // Acts 1–4 each have their own widget in the right column; the unit IS act
  // 5's widget, so it arrives exactly where those hand off and never shares the
  // column with one.
  const unitOpacity = useTransform(progress, [0.8, 0.92], [0, 1]);

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
  // off the same progress, so panel and unit move together — each act centering
  // a full panel. 20% = one panel of the 500vw track. On compact the act spring
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
      // so the whole stage — unit, text, and buttons — fits without scrolling.
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

        {mounted && unitMounted && (
          // The wrapper carries the recede: the unit is scenery by act 3, so
          // the whole canvas fades back rather than competing with the
          // diagrams for attention.
          <motion.div
            style={{ opacity: unitOpacity }}
            // Compact: confine the unit to the upper part of the stage so the
            // bottom stays clear for the act text and the buttons (no dark text
            // landing on the dark unit). Desktop: full-bleed.
            className={
              isCompact ? "absolute inset-x-0 top-0 h-[60svh]" : "absolute inset-0"
            }
          >
            <Canvas
              className="absolute inset-0"
              dpr={[1, 2]}
              camera={{ position: [0, 0, 6], fov: 35 }}
              gl={{ antialias: true, powerPreference: "high-performance" }}
              // Drop shadow off the unit's silhouette (canvas is transparent),
              // lit from upper-left so it falls down-right onto the studio
              // surface. Tracks the unit automatically as it moves and turns.
              style={{
                filter:
                  "drop-shadow(0 16px 22px rgba(15,15,15,0.24)) drop-shadow(10px 30px 46px rgba(15,15,15,0.18))",
              }}
            >
              <Suspense fallback={<CanvasLoader />}>
                <NexonScene progress={progress} />
              </Suspense>
            </Canvas>
          </motion.div>
        )}

        {/* ── HUD chrome ─────────────────────────────────────────────── */}
        {/* Near-black on the light studio surface. Says software, everywhere —
            this corner used to read "hardware" and "rev a". */}
        <div className="pointer-events-none absolute inset-0 select-none text-[#1a1a1a]/70">
          <div className="absolute top-20 left-6 lg:left-8 text-[10px] font-mono uppercase tracking-[0.18em]">
            nex-ON // robot operating system
          </div>
          {/* Hidden under xl: the left label alone fills a phone's HUD row, and
              these two ran into each other on narrow screens. */}
          <div className="absolute top-20 right-6 lg:right-8 text-[10px] font-mono uppercase tracking-[0.18em] text-right max-xl:hidden">
            licensed software · any body
          </div>
          <div className="absolute bottom-6 right-6 lg:right-8 text-[10px] font-mono uppercase tracking-[0.18em] text-right leading-relaxed max-xl:hidden">
            runs on the robot you own
            <br />
            and the compute you have
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

        {/* ── Mobile filmstrip (phones + tablets) ──────────────────────
            The desktop overlays below are hidden under xl; here the five acts
            ride a horizontal track that slides one panel left at each stop.
            The unit stays pinned behind, receding on the same progress. */}
        <motion.div
          style={{ x: trackX }}
          className="xl:hidden pointer-events-none absolute inset-0 flex w-[500vw]"
        >
          {MOBILE_ACTS.map((a, i) => (
            <div
              key={a.eyebrow}
              // Content grows upward from the bottom: the widget fills the
              // space the unit leaves empty on acts 1–4, and on act 5 the unit
              // is there instead and the copy simply sits under it.
              className={`flex h-full w-screen shrink-0 flex-col justify-end px-6 pb-28 ${
                a.links ? "pointer-events-auto" : ""
              }`}
            >
              {a.Widget && (
                <div className="mb-7 w-full max-w-sm">
                  <a.Widget />
                </div>
              )}
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
                    href="/platform"
                    className="inline-flex items-center gap-2 rounded-full border border-accent/60 bg-accent/15 px-4 py-2 text-sm text-[#141414]"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                    How the platform works
                    <ArrowRight size={14} className="text-[#141414]" />
                  </Link>
                  <Link
                    href="/omnicron"
                    className="inline-flex items-center gap-2 rounded-full border border-[#1a1a1a]/25 px-4 py-2 text-sm text-[#1a1a1a]/75"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-[#1a1a1a]/50" />
                    Omnicron — welding, proven
                    <ArrowRight size={14} />
                  </Link>
                </div>
              )}
            </div>
          ))}
        </motion.div>

        {/* ── Act 1 · the problem ──────────────────────────────────────
            One element: reveals on mount (present at first paint), fades and
            lifts out on scroll as act 2 takes over. The unit is large here, but
            the words are about the pain — it is scenery, not the pitch. */}
        <motion.div
          style={{ opacity: heroOpacity, y: heroY }}
          className="pointer-events-none absolute right-6 lg:right-8 top-1/2 w-[min(44vw,540px)] -translate-y-1/2 max-xl:hidden"
        >
          <ProblemPipeline />
        </motion.div>

        <motion.div
          style={{ opacity: heroOpacity, y: heroY }}
          className="pointer-events-none absolute left-6 lg:left-8 bottom-24 max-w-2xl max-xl:hidden"
        >
          {/* Satoshi (not Orbitron — reserved for product names), dark on the
              light studio surface. */}
          <p className="text-xs font-mono uppercase tracking-[0.2em] text-accent mb-4">
            The problem
          </p>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tight text-[#141414] leading-[0.95]">
            Every robot
            <br />
            needs a
            <br />
            programmer.
          </h1>
          <p className="mt-5 text-lg text-[#1a1a1a]/75 max-w-md">
            Putting a robot to work still means a specialist, a program, and a
            model of the world that reality keeps breaking.
          </p>
        </motion.div>

        {/* ── Act 2 · the OS ─────────────────────────────────────────── */}
        <Beat
          progress={progress}
          range={[0.215, 0.28, 0.366, 0.43]}
          className="left-6 lg:left-8 top-1/2 -translate-y-1/2 max-w-lg max-xl:hidden"
        >
          <Eyebrow>The OS</Eyebrow>
          <ActTitle>
            An operating system
            <br />
            for robots.
          </ActTitle>
          <ActBody>
            <span className="font-semibold text-[#141414]">nex-ON</span> is the
            layer between an AI that understands the goal and the machine that
            carries it out. One brain, any body.
          </ActBody>
        </Beat>

        <Beat
          progress={progress}
          range={[0.215, 0.28, 0.366, 0.43]}
          className="right-6 lg:right-8 top-1/2 -translate-y-1/2 w-[min(44vw,540px)] max-xl:hidden"
        >
          <OsStack />
        </Beat>

        {/* ── Act 3 · the runtime ────────────────────────────────────── */}
        <Beat
          progress={progress}
          range={[0.43, 0.495, 0.602, 0.667]}
          className="left-6 lg:left-8 top-1/2 -translate-y-1/2 max-w-lg max-xl:hidden"
        >
          <Eyebrow>The runtime</Eyebrow>
          <ActTitle>Perceive. Reason. Act.</ActTitle>
          <ActBody>
            A tool-calling loop decides what to look at, what to measure, and
            where to move — then says what it did. Nothing runs live until you
            arm it.
          </ActBody>
        </Beat>

        <Beat
          progress={progress}
          range={[0.43, 0.495, 0.602, 0.667]}
          className="right-6 lg:right-8 top-1/2 -translate-y-1/2 w-[min(44vw,540px)] max-xl:hidden"
        >
          <RuntimeLoop />
        </Beat>

        {/* ── Act 4 · any body ───────────────────────────────────────── */}
        <Beat
          progress={progress}
          range={[0.667, 0.731, 0.839, 0.882]}
          className="left-6 lg:left-8 top-1/2 -translate-y-1/2 max-w-lg max-xl:hidden"
        >
          <Eyebrow>Any body</Eyebrow>
          <ActTitle>
            Bodies are drivers.
            <br />
            Tasks are apps.
          </ActTitle>
          <ActBody>
            A new robot is a driver, not a rebuild. Every capability you add
            works for the next robot too — which is what an OS is for.
          </ActBody>
        </Beat>

        <Beat
          progress={progress}
          range={[0.667, 0.731, 0.839, 0.882]}
          className="right-6 lg:right-8 top-1/2 -translate-y-1/2 w-[min(44vw,540px)] max-xl:hidden"
        >
          <DriverBus />
        </Beat>

        {/* ── Act 5 · install it ───────────────────────────────────────
            The last thing on the page: fades in on the final beat and holds to
            the bottom (no fade-out), so its links stay reachable at rest. */}
        <motion.div
          style={{ opacity: act5Opacity, y: act5Y }}
          className="pointer-events-auto absolute left-6 lg:left-8 bottom-24 max-w-xl max-xl:hidden"
        >
          <Eyebrow>Install it</Eyebrow>
          <ActTitle>
            Licensed software.
            <br />
            Your robot, your compute.
          </ActTitle>
          <ActBody>
            No fleet to buy and no machine to replace. Install nex-ON above the
            robots and the compute you already have. The edge unit is just one
            optional way to run it.
          </ActBody>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/platform"
              className="inline-flex items-center gap-2 rounded-full border border-accent/60 bg-accent/15 px-4 py-2 text-sm text-[#141414] hover:border-accent hover:bg-accent/25 transition-colors"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-accent" />
              How the platform works
              <ArrowRight size={14} className="text-[#141414]" />
            </Link>
            <Link
              href="/omnicron"
              className="inline-flex items-center gap-2 rounded-full border border-[#1a1a1a]/25 px-4 py-2 text-sm text-[#1a1a1a]/75 hover:border-[#141414] hover:text-[#141414] transition-colors"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#1a1a1a]/50" />
              Omnicron — welding, proven
              <ArrowRight size={14} />
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

        {/* Act 5 · the unit, finally named — small, sharp, and explicitly
            optional. This label is the whole demotion said out loud. */}
        <motion.div
          style={{ opacity: act5Opacity }}
          className="pointer-events-none absolute right-6 lg:right-8 top-[61%] text-right max-xl:hidden"
        >
          <p className="text-[10px] font-mono uppercase tracking-[0.18em] text-[#1a1a1a]/70">
            nex-ON edge unit
          </p>
          <p className="text-[10px] font-mono uppercase tracking-[0.18em] text-[#1a1a1a]/40">
            optional · not the product
          </p>
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
