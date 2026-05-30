"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { SectionWrapper } from "../SectionWrapper";
import { MotionReveal } from "../MotionReveal";
import { CTAButton } from "../CTAButton";
import {
  AlertCircle,
  CheckCircle2,
  Timer,
  TrendingUp,
  Layers,
  Repeat,
  Wrench,
  BarChart2,
} from "lucide-react";

// ── Workflow comparison data ───────────────────────────────────────────────────
const comparisons = [
  {
    challenge: "Long training cycles before welders are production-ready",
    improvement: "Faster deployment — system configures from part scan",
  },
  {
    challenge: "Weld quality varies between operators and across shifts",
    improvement: "Repeatable execution on every pass, every part",
  },
  {
    challenge: "Manual robot programming slows changeovers",
    improvement: "Zero-code workflow — no offline programming required",
  },
  {
    challenge: "Staffing limitations reduce operational continuity",
    improvement: "Higher operational continuity independent of shift constraints",
  },
  {
    challenge: "Rework and correction overhead increases production cost",
    improvement: "Optimised seam execution reduces defect-driven rework",
  },
  {
    challenge: "Scaling production requires additional specialised labour",
    improvement: "Easier replication across lines without proportional headcount",
  },
];

// ── Operational benefit cards ──────────────────────────────────────────────────
const benefits = [
  {
    icon: Timer,
    title: "Faster Task Deployment",
    body: "Parts are scanned, planned, and ready for execution without manual teach-in. Changeover time drops significantly.",
  },
  {
    icon: Repeat,
    title: "Reduced Weld Variability",
    body: "AI-predicted parameters and real-time seam tracking produce consistent results across operators, shifts, and part batches.",
  },
  {
    icon: Wrench,
    title: "Lower Programming Overhead",
    body: "Eliminates the need for specialist robot programmers during deployment or part changeovers.",
  },
  {
    icon: BarChart2,
    title: "Improved Operational Uptime",
    body: "Reduced reliance on highly specialised welding availability means fewer production interruptions.",
  },
  {
    icon: TrendingUp,
    title: "Scalable Across Lines",
    body: "The same intelligence layer can be replicated to additional cells or expanded to other industrial processes.",
  },
  {
    icon: Layers,
    title: "Operational Investment, Not Overhead",
    body: "A single deployment accumulates savings through reduced downtime, lower rework, and simplified ongoing operation.",
  },
];

// ── Timeline ──────────────────────────────────────────────────────────────────
const timeline = [
  {
    phase: "Deployment",
    period: "Days 1–14",
    description: "System installed, calibrated, and scanning live parts. No programming specialists required.",
    color: "#1a5fb4",
  },
  {
    phase: "Stabilisation",
    period: "Month 1–3",
    description: "Changeover times reduce. Teams adapt to zero-code workflow. Rework rates begin to fall.",
    color: "#3584e4",
  },
  {
    phase: "Efficiency Gains",
    period: "Month 3–12",
    description: "Operational continuity improves. Quality consistency becomes measurable. Programming overhead eliminated.",
    color: "#059669",
  },
  {
    phase: "Scale",
    period: "Month 12+",
    description: "Same system replicates to additional lines or tasks. Operational savings accumulate at scale.",
    color: "#7c3aed",
  },
];

// ── Comparison row ─────────────────────────────────────────────────────────────
function ComparisonRow({
  row,
  index,
}: {
  row: (typeof comparisons)[0];
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ duration: 0.4, delay: index * 0.06 }}
      className="grid grid-cols-1 md:grid-cols-2 border-b border-gray-100 last:border-b-0"
    >
      <div className="px-6 py-4 flex items-start gap-3">
        <AlertCircle size={14} className="text-gray-400 flex-shrink-0 mt-0.5" />
        <p className="text-sm text-gray-500 leading-relaxed">{row.challenge}</p>
      </div>
      <div className="px-6 py-4 flex items-start gap-3 bg-[#f8fbff] border-t md:border-t-0 md:border-l border-gray-100">
        <CheckCircle2 size={14} className="text-[#1a5fb4] flex-shrink-0 mt-0.5" />
        <p className="text-sm text-gray-700 leading-relaxed">{row.improvement}</p>
      </div>
    </motion.div>
  );
}

// ── Main section ──────────────────────────────────────────────────────────────
export function ROISection() {
  const timelineRef = useRef(null);
  const timelineInView = useInView(timelineRef, { once: true, margin: "-60px" });

  return (
    <SectionWrapper id="roi" className="bg-gray-50">

      {/* 1. Headline */}
      <MotionReveal>
        <div className="max-w-2xl mb-16">
          <span className="text-xs font-semibold tracking-widest uppercase text-gray-400">
            Operational Efficiency
          </span>
          <h2 className="mt-3 text-3xl md:text-4xl font-bold text-gray-900 tracking-tight leading-tight">
            Built for real
            <br />
            manufacturing constraints.
          </h2>
          <p className="mt-4 text-gray-500 text-lg leading-relaxed">
            Traditional welding operations are difficult to scale due to training
            requirements, inconsistent quality, downtime, and manual programming
            overhead. The autonomous system reduces operational complexity while
            maintaining repeatable performance.
          </p>
        </div>
      </MotionReveal>

      {/* 2. Workflow comparison */}
      <MotionReveal>
        <div className="mb-16 rounded-2xl border border-gray-200 overflow-hidden bg-white">
          {/* Table header */}
          <div className="grid grid-cols-1 md:grid-cols-2 bg-gray-50 border-b border-gray-200">
            <div className="px-6 py-4 flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-gray-400" />
              <span className="text-xs font-semibold tracking-widest uppercase text-gray-500">
                Traditional Workflow
              </span>
            </div>
            <div className="px-6 py-4 flex items-center gap-2 border-t md:border-t-0 md:border-l border-gray-200 bg-[#f8fbff]">
              <div className="w-2 h-2 rounded-full bg-[#1a5fb4]" />
              <span className="text-xs font-semibold tracking-widest uppercase text-[#1a5fb4]">
                Autonomous Workflow
              </span>
            </div>
          </div>

          {comparisons.map((row, i) => (
            <ComparisonRow key={i} row={row} index={i} />
          ))}
        </div>
      </MotionReveal>

      {/* 3. Operational improvement timeline */}
      <div ref={timelineRef} className="mb-16">
        <MotionReveal>
          <p className="text-xs font-semibold tracking-widest uppercase text-gray-400 mb-10">
            Operational improvement over time
          </p>
        </MotionReveal>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-0 md:gap-0 relative">
          {/* Connecting bar (desktop) */}
          <div className="absolute top-5 left-[12.5%] right-[12.5%] h-px bg-gray-200 hidden md:block" />

          {timeline.map((t, i) => (
            <motion.div
              key={t.phase}
              initial={{ opacity: 0, y: 20 }}
              animate={timelineInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              className="relative flex flex-col items-center md:items-start text-center md:text-left px-4 md:px-5 pb-8 md:pb-0"
            >
              {/* Node */}
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center z-10 mb-4 border-2 border-white shadow-sm"
                style={{ backgroundColor: t.color }}
              >
                <span className="text-white text-xs font-bold">{i + 1}</span>
              </div>
              {/* Content */}
              <div>
                <p className="text-xs font-mono text-gray-400 mb-0.5">{t.period}</p>
                <p className="text-sm font-semibold text-gray-900 mb-1.5">{t.phase}</p>
                <p className="text-xs text-gray-500 leading-relaxed">{t.description}</p>
              </div>
              {/* Vertical connector (mobile) */}
              {i < timeline.length - 1 && (
                <div className="md:hidden absolute bottom-0 left-1/2 -translate-x-1/2 w-px h-6 bg-gray-200" />
              )}
            </motion.div>
          ))}
        </div>
      </div>

      {/* 4. Operational benefits cards */}
      <div className="mb-16">
        <MotionReveal>
          <p className="text-xs font-semibold tracking-widest uppercase text-gray-400 mb-8">
            Factory-floor improvements
          </p>
        </MotionReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {benefits.map((b, i) => (
            <MotionReveal key={b.title} delay={i * 0.07}>
              <motion.div
                whileHover={{ y: -3 }}
                transition={{ duration: 0.18 }}
                className="bg-white rounded-xl border border-gray-200 hover:border-gray-300 hover:shadow-sm p-6 transition-all duration-200 h-full"
              >
                <div className="w-9 h-9 rounded-lg bg-gray-50 border border-gray-100 flex items-center justify-center mb-4">
                  <b.icon size={16} className="text-gray-600" />
                </div>
                <h3 className="font-semibold text-sm text-gray-900 mb-2">{b.title}</h3>
                <p className="text-xs text-gray-500 leading-relaxed">{b.body}</p>
              </motion.div>
            </MotionReveal>
          ))}
        </div>
      </div>

      {/* 5. Investment framing + CTA */}
      <MotionReveal>
        <div className="grid md:grid-cols-[1fr_auto] gap-8 items-center p-8 bg-white rounded-2xl border border-gray-200">
          <div className="max-w-xl">
            <p className="text-xs font-semibold tracking-widest uppercase text-gray-400 mb-2">
              The practical case
            </p>
            <p className="text-lg font-semibold text-gray-900 leading-snug">
              Operational savings accumulate through reduced downtime, improved
              consistency, and simplified deployment — not a single headline number.
            </p>
            <p className="mt-3 text-sm text-gray-500 leading-relaxed">
              A single deployment reduces recurring operational inefficiencies.
              The same system scales to additional lines without rebuilding from
              scratch.
            </p>
          </div>
          <div className="flex flex-col gap-3 flex-shrink-0">
            <CTAButton href="#cta" variant="primary" icon className="text-sm px-6 py-3">
              Discuss Deployment
            </CTAButton>
            <CTAButton href="#cta" variant="secondary" className="text-sm px-6 py-3">
              Book Technical Demo
            </CTAButton>
          </div>
        </div>
      </MotionReveal>

    </SectionWrapper>
  );
}
