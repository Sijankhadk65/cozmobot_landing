"use client";

import Image from "next/image";
import { SectionWrapper } from "../SectionWrapper";
import { MotionReveal } from "../MotionReveal";
import {
  motion,
  useInView,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "framer-motion";
import { useRef } from "react";
import omnicronHero from "@/assets/omnicron-hero.png";
import {
  Flame,
  ShieldAlert,
  Gauge,
  LockKeyhole,
  ArrowRight,
  Zap,
  Ship,
  Cog,
  Plane,
  Car,
  Wrench,
} from "lucide-react";
import { CTAButton } from "../CTAButton";

// Omnicron sits on a Steel Gray slab so it reads as a distinct product
// surface. Neon Lime carries perception and structure; ARC is the one
// off-palette hue, reserved for the live weld itself — bead, tip, glow.
const ACCENT = "#add037";
const ARC = "#e66100";
const OFFWHITE = "#f5f3f0";
const CARBON = "#0f1112";

// ── Weld pass sequence ────────────────────────────────────────────────────────
const passSteps = [
  { label: "Approach lead-in", detail: "Move to the seam start at standoff height" },
  { label: "Strike arc", detail: "Energize — only if the arc was armed this session" },
  { label: "Weld start → end", detail: "Trace the seam at constant standoff, weave optional" },
  { label: "End arc", detail: "De-energize at the seam endpoint" },
  { label: "Retract", detail: "Withdraw to a safe positioning height" },
];

// ── Weave patterns ────────────────────────────────────────────────────────────
function TrianglePath() {
  return (
    <path
      d="M0,14 L12.5,4 L25,24 L37.5,4 L50,24 L62.5,4 L75,24 L87.5,4 L100,14"
      stroke={ACCENT}
      strokeWidth="1.75"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  );
}

function SinePath() {
  return (
    <path
      d="M0,14 Q6,2 12,14 T24,14 T36,14 T48,14 T60,14 T72,14 T84,14 T96,14"
      stroke={ACCENT}
      strokeWidth="1.75"
      fill="none"
      strokeLinecap="round"
    />
  );
}

function CircularPath() {
  return (
    <>
      <line x1="0" y1="14" x2="100" y2="14" stroke={ACCENT} strokeWidth="1.75" strokeLinecap="round" />
      {[12, 32, 52, 72, 92].map((cx) => (
        <circle key={cx} cx={cx} cy="14" r="7" stroke={ACCENT} strokeWidth="1.75" fill="none" />
      ))}
    </>
  );
}

function VerticalPath() {
  return (
    <>
      <line x1="0" y1="14" x2="100" y2="14" stroke={ACCENT} strokeWidth="1.75" strokeLinecap="round" />
      {[10, 25, 40, 55, 70, 85].map((x) => (
        <line key={x} x1={x} y1="4" x2={x} y2="24" stroke={ACCENT} strokeWidth="1.75" strokeLinecap="round" />
      ))}
    </>
  );
}

const weaves = [
  { name: "Triangle", Shape: TrianglePath },
  { name: "Sine", Shape: SinePath },
  { name: "Circular", Shape: CircularPath },
  { name: "Vertical", Shape: VerticalPath },
];

// ── Industries ────────────────────────────────────────────────────────────────
const industries = [
  {
    icon: Zap,
    name: "Energy",
    desc: "Pressure vessels, pipe spools, structural steelwork for power plants.",
  },
  {
    icon: Ship,
    name: "Shipbuilding",
    desc: "Hull panels, bulkheads, and structural welds in confined spaces.",
  },
  {
    icon: Cog,
    name: "Heavy Manufacturing",
    desc: "Complex fabrications and large-format structures, often high-mix and low-volume.",
  },
  {
    icon: Plane,
    name: "Aerospace",
    desc: "Precision structural welds where every joint must be accounted for.",
  },
  {
    icon: Car,
    name: "Automotive",
    desc: "Body-in-white, exhaust systems, and sub-frame fabrication.",
  },
  {
    icon: Wrench,
    name: "Industrial Fabrication",
    desc: "General steelwork, custom fabrications, repair, and maintenance.",
  },
];

// ── Safety pillars ────────────────────────────────────────────────────────────
const safety = [
  {
    icon: ShieldAlert,
    title: "Dry weld by default",
    body: "The motion is identical, but nothing is energized. Rehearse a full pass safely before committing to a live arc.",
  },
  {
    icon: LockKeyhole,
    title: "Live arc must be armed",
    body: "A live arc has to be deliberately armed each session. It never persists across restarts.",
  },
  {
    icon: Gauge,
    title: "Low speeds, checked moves",
    body: "Speeds default low. A dry-run reachability check reports feasibility before the arm moves at all.",
  },
];

// ── Animated seam trace ───────────────────────────────────────────────────────
function SeamTrace() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <div ref={ref} className="rounded-xl border border-offwhite/10 bg-carbon p-5">
      <div className="flex items-center justify-between mb-4">
        <p className="text-[10px] font-mono uppercase tracking-widest text-offwhite/65">
          Seam trace
        </p>
        <div className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-accent" />
          <span className="text-[10px] font-mono text-accent">DRY RUN</span>
        </div>
      </div>

      <svg viewBox="0 0 300 90" className="w-full">
        {/* Workpiece plates */}
        <rect x="10" y="52" width="130" height="18" rx="2" fill="#323333" />
        <rect x="160" y="52" width="130" height="18" rx="2" fill="#323333" />

        {/* The joint */}
        <rect x="140" y="52" width="20" height="18" fill={CARBON} />

        {/* Area of interest */}
        <motion.rect
          x="14"
          y="30"
          width="272"
          height="30"
          rx="3"
          stroke={ACCENT}
          strokeOpacity="0.55"
          strokeWidth="1"
          strokeDasharray="5 3"
          fill="none"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: [0.3, 0.9, 0.3] } : {}}
          transition={{ duration: 2.4, repeat: Infinity }}
        />

        {/* Standoff path */}
        <line
          x1="20"
          y1="45"
          x2="280"
          y2="45"
          stroke={OFFWHITE}
          strokeOpacity="0.22"
          strokeWidth="1"
          strokeDasharray="2 2"
        />

        {/* Weld bead filling in */}
        <motion.rect
          x="20"
          y="42"
          height="5"
          rx="2.5"
          fill={ARC}
          initial={{ width: 0 }}
          animate={inView ? { width: [0, 260, 260, 0] } : {}}
          transition={{ duration: 4, repeat: Infinity, times: [0, 0.6, 0.85, 1], ease: "easeInOut" }}
        />

        {/* Torch travelling */}
        <motion.g
          initial={{ x: 0 }}
          animate={inView ? { x: [0, 260, 260, 0] } : {}}
          transition={{ duration: 4, repeat: Infinity, times: [0, 0.6, 0.85, 1], ease: "easeInOut" }}
        >
          <polygon points="14,14 26,14 22,38 18,38" fill={OFFWHITE} fillOpacity="0.55" />
          <polygon points="18,38 22,38 20,44" fill={ARC} />
          <motion.circle
            cx="20"
            cy="45"
            r="4"
            fill={ARC}
            animate={{ opacity: [0.25, 0.9, 0.25], r: [3, 6, 3] }}
            transition={{ duration: 0.5, repeat: Infinity }}
          />
        </motion.g>

        {/* Endpoints */}
        <circle cx="20" cy="45" r="2.5" fill={ACCENT} />
        <circle cx="280" cy="45" r="2.5" fill={ACCENT} />
        <text x="14" y="82" fontSize="8" fill={OFFWHITE} fillOpacity="0.45" fontFamily="monospace">start</text>
        <text x="268" y="82" fontSize="8" fill={OFFWHITE} fillOpacity="0.45" fontFamily="monospace">end</text>
      </svg>

      <p className="text-xs text-offwhite/65 mt-3 leading-relaxed">
        Endpoints are mapped from the camera into the robot&apos;s coordinate
        frame, then traced at a constant standoff height above the joint.
      </p>
    </div>
  );
}

// ── The Omnicron photograph ───────────────────────────────────────────────────
// Treated as a physical object: it materializes (blur + scale resolving together,
// not a flat fade), catches light where the pointer is, and parallaxes against
// its frame. Every spring is critically damped — nothing here carries momentum
// from a gesture, so nothing should overshoot.
const SPRING = { stiffness: 220, damping: 30, mass: 0.6 };

function OmnicronPhoto() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const reduceMotion = useReducedMotion();

  // Pointer position, normalized to the frame (0–100%), tracked 1:1.
  const px = useMotionValue(50);
  const py = useMotionValue(50);
  const lit = useMotionValue(0);

  const sx = useSpring(px, SPRING);
  const sy = useSpring(py, SPRING);
  const sLit = useSpring(lit, SPRING);

  // Specular highlight — light catching the surface where the pointer is.
  const sheen = useMotionTemplate`radial-gradient(340px circle at ${sx}% ${sy}%, rgba(245,243,240,0.14), transparent 65%)`;
  // The subject drifts against the frame, opposite the pointer, for depth.
  const driftX = useSpring(useMotionValue(0), SPRING);
  const driftY = useSpring(useMotionValue(0), SPRING);

  function handlePointerMove(e: React.PointerEvent<HTMLDivElement>) {
    if (reduceMotion || e.pointerType === "touch") return;
    const r = e.currentTarget.getBoundingClientRect();
    const nx = ((e.clientX - r.left) / r.width) * 100;
    const ny = ((e.clientY - r.top) / r.height) * 100;
    px.set(nx);
    py.set(ny);
    driftX.set(((nx - 50) / 50) * -7);
    driftY.set(((ny - 50) / 50) * -7);
  }

  function handlePointerLeave() {
    lit.set(0);
    driftX.set(0);
    driftY.set(0);
  }

  // Enter: the surface arrives as a material — blur and scale resolve together.
  // Reduced motion neutralizes those two values rather than dropping the keys:
  // useReducedMotion() is null on the first render, so a target missing `scale`
  // and `filter` would strand them at their hidden values forever.
  const hidden = {
    opacity: 0,
    scale: reduceMotion ? 1 : 0.94,
    filter: reduceMotion ? "blur(0px)" : "blur(14px)",
  };
  const shown = { opacity: 1, scale: 1, filter: "blur(0px)" };

  return (
    <div className="relative mx-auto w-full max-w-[340px] lg:max-w-[440px]">
      {/* Ambient bounce from the subject's own backdrop */}
      <motion.div
        aria-hidden
        className="absolute -inset-8 rounded-[3rem] bg-accent/15 blur-3xl"
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ type: "spring", bounce: 0, duration: 0.9, delay: 0.1 }}
      />

      <motion.div
        ref={ref}
        onPointerMove={handlePointerMove}
        onPointerEnter={() => !reduceMotion && lit.set(1)}
        onPointerLeave={handlePointerLeave}
        initial={hidden}
        animate={inView ? shown : hidden}
        transition={{ type: "spring", bounce: 0, duration: 0.7 }}
        className="group relative rounded-2xl overflow-hidden bg-carbon shadow-[0_32px_80px_-24px_rgba(0,0,0,0.75)] ring-1 ring-inset ring-offwhite/12"
      >
        <motion.div style={reduceMotion ? undefined : { x: driftX, y: driftY }}>
          {/* `sizes` covers the 105% scale the drift needs, so the extra 5%
              is real pixels rather than an upscale. */}
          <Image
            src={omnicronHero}
            alt="Omnicron welding cobot — a Cozmobot arm with a MIG torch mounted at the wrist."
            placeholder="blur"
            quality={90}
            sizes="(min-width: 1024px) 480px, (min-width: 640px) 380px, 95vw"
            className="w-full h-auto scale-105"
          />
        </motion.div>

        {/* Specular highlight, tracking the pointer */}
        <motion.div
          aria-hidden
          className="absolute inset-0 pointer-events-none mix-blend-plus-lighter"
          style={{ backgroundImage: sheen, opacity: sLit }}
        />

        {/* Top edge catching light, the way a real panel does */}
        <div
          aria-hidden
          className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-offwhite/30 to-transparent pointer-events-none"
        />

        {/* Caption rides a scroll-edge scrim, not a hard divider */}
        <div className="absolute bottom-0 inset-x-0 flex items-center justify-between gap-3 bg-gradient-to-t from-carbon via-carbon/80 to-transparent px-4 pt-12 pb-4">
          <p className="text-[10px] font-mono font-medium uppercase tracking-[0.16em] text-offwhite/85">
            Omnicron · torch at the wrist
          </p>
          <span className="inline-flex items-center gap-1.5 flex-shrink-0">
            <span className="w-1.5 h-1.5 rounded-full bg-accent" />
            <span className="text-[10px] font-mono font-medium tracking-[0.16em] text-accent">
              ARC SAFE
            </span>
          </span>
        </div>
      </motion.div>
    </div>
  );
}

export function OmnicronSection() {
  return (
    <SectionWrapper id="omnicron" className="bg-steel">
      {/* Header */}
      <div className="grid lg:grid-cols-[1.05fr_0.95fr] gap-12 lg:gap-16 items-center mb-16">
        <MotionReveal>
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-accent bg-carbon px-3 py-1 rounded-full border border-accent/35">
                <Flame size={12} />
                Application
              </span>
              <span className="text-xs text-offwhite/70">Built on nex-ON</span>
            </div>

            <h2 className="font-brand text-4xl md:text-5xl font-bold text-offwhite tracking-tight leading-[1.1]">
              Omnicron
            </h2>
            <p className="mt-3 text-xl text-accent font-medium">
              The autonomous welding cobot.
            </p>
            <p className="mt-5 text-lg text-offwhite/70 leading-relaxed">
              Omnicron is what happens when you point nex-ON at the hardest
              near-term task in industrial robotics. It demands everything at
              once — sub-millimeter perception, safe real-world actuation, and
              operability by someone who has never programmed a robot.
            </p>
            <p className="mt-4 text-offwhite/60 leading-relaxed">
              It is one deployment of the platform, not the ceiling of it. The
              same brain, the same tools, a torch on the end.
            </p>
          </div>
        </MotionReveal>

        <OmnicronPhoto />
      </div>

      {/* Two-column: pass sequence + seam trace */}
      <div className="grid lg:grid-cols-2 gap-8 mb-16">
        <MotionReveal>
          <div className="h-full rounded-2xl border border-offwhite/10 bg-carbon p-6">
            <p className="text-xs font-semibold tracking-widest uppercase text-accent mb-6">
              A weld pass, step by step
            </p>
            <div className="space-y-1">
              {passSteps.map((step, i) => (
                <div key={step.label} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="w-7 h-7 rounded-full border border-accent/40 bg-accent/10 text-accent flex items-center justify-center text-[10px] font-bold flex-shrink-0">
                      {i + 1}
                    </div>
                    {i < passSteps.length - 1 && (
                      <div className="w-px flex-1 my-1 bg-offwhite/12 min-h-[18px]" />
                    )}
                  </div>
                  <div className="pb-5">
                    <p className="text-sm font-semibold text-offwhite">{step.label}</p>
                    <p className="text-xs text-offwhite/65 mt-0.5 leading-relaxed">
                      {step.detail}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </MotionReveal>

        <MotionReveal delay={0.1}>
          <SeamTrace />
        </MotionReveal>
      </div>

      {/* Weave patterns */}
      <MotionReveal>
        <div className="rounded-2xl border border-offwhite/10 bg-carbon p-6 md:p-8 mb-16">
          <div className="mb-8">
            <p className="text-xs font-semibold tracking-widest uppercase text-accent mb-2">
              Weld weave
            </p>
            <p className="text-offwhite/70 leading-relaxed max-w-xl">
              Oscillation patterns overlay the weld stroke — spaced either by a
              fixed pitch in millimeters per weave, or a set number of cycles
              across the seam. The parameters real welders specify.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {weaves.map((weave, i) => (
              <motion.div
                key={weave.name}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="rounded-xl border border-accent/15 bg-steel/40 p-4"
              >
                <svg viewBox="0 0 100 28" className="w-full h-10 mb-3">
                  <weave.Shape />
                </svg>
                <p className="text-xs font-medium text-offwhite/75 text-center">
                  {weave.name}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </MotionReveal>

      {/* Safety model */}
      <div className="mb-14">
        <MotionReveal>
          <div className="max-w-2xl mb-8">
            <p className="text-xs font-semibold tracking-widest uppercase text-accent mb-3">
              The safety model
            </p>
            <h3 className="text-2xl md:text-3xl font-bold text-offwhite tracking-tight">
              An arc is dangerous. So it is off until you say otherwise.
            </h3>
          </div>
        </MotionReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {safety.map((s, i) => (
            <MotionReveal key={s.title} delay={i * 0.1}>
              <div className="h-full rounded-xl border border-offwhite/10 bg-carbon p-6 hover:border-accent/40 transition-colors duration-200">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-4 border border-accent/25 bg-accent/10">
                  <s.icon size={18} className="text-accent" />
                </div>
                <h4 className="font-semibold text-offwhite mb-2">{s.title}</h4>
                <p className="text-sm text-offwhite/55 leading-relaxed">{s.body}</p>
              </div>
            </MotionReveal>
          ))}
        </div>
      </div>

      {/* Where it deploys */}
      <div className="mb-14">
        <MotionReveal>
          <div className="max-w-2xl mb-8">
            <p className="text-xs font-semibold tracking-widest uppercase text-accent mb-3">
              Where it deploys
            </p>
            <h3 className="text-2xl md:text-3xl font-bold text-offwhite tracking-tight">
              Where a shortage of welders meets work no integrator will quote.
            </h3>
            <p className="mt-4 text-offwhite/60 leading-relaxed">
              These are the sectors where high-mix, low-volume fabrication
              collides with a well-documented global shortage of skilled
              welders.
            </p>
          </div>
        </MotionReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {industries.map((ind, i) => (
            <MotionReveal key={ind.name} delay={i * 0.07}>
              <motion.div
                whileHover={{ y: -3 }}
                transition={{ duration: 0.2 }}
                className="h-full rounded-xl border border-offwhite/10 bg-carbon p-6 hover:border-accent/40 transition-colors duration-200"
              >
                <div className="flex items-center gap-4 mb-3">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center border border-accent/25 bg-accent/10">
                    <ind.icon size={18} className="text-accent" />
                  </div>
                  <h4 className="font-semibold text-offwhite">{ind.name}</h4>
                </div>
                <p className="text-sm text-offwhite/55 leading-relaxed">
                  {ind.desc}
                </p>
              </motion.div>
            </MotionReveal>
          ))}
        </div>
      </div>

      {/* Closing band */}
      <MotionReveal>
        <div className="rounded-2xl border border-accent/25 bg-gradient-to-r from-accent/12 to-carbon p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="max-w-xl">
            <p className="text-xl font-semibold text-offwhite leading-snug">
              &ldquo;Just tell Omnicron to weld.&rdquo;
            </p>
            <p className="mt-2 text-sm text-offwhite/55 leading-relaxed">
              The welder describes the joint. Omnicron finds it, measures it,
              rehearses the pass, and — once armed — runs it.
            </p>
          </div>
          <div className="flex items-center gap-3 flex-shrink-0">
            <CTAButton href="#cta" variant="primary" icon className="text-sm px-6 py-3">
              Book a welding demo
            </CTAButton>
            <a
              href="#any-robot"
              className="inline-flex items-center gap-1.5 text-sm text-offwhite/70 hover:text-accent transition-colors"
            >
              Beyond welding
              <ArrowRight size={14} />
            </a>
          </div>
        </div>
      </MotionReveal>
    </SectionWrapper>
  );
}
