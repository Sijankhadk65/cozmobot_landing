"use client";

import { motion } from "framer-motion";
import { CTAButton } from "../CTAButton";
import { ArrowRight, ChevronDown } from "lucide-react";

function AnimatedPipelineViz() {
  return (
    <div className="relative w-full h-80 md:h-96 rounded-2xl bg-gradient-to-br from-slate-50 to-blue-50/40 border border-gray-200/80 overflow-hidden">
      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            "linear-gradient(to right, #e2e8f0 1px, transparent 1px), linear-gradient(to bottom, #e2e8f0 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      {/* Central visualization */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative">
          {/* Robot arm SVG */}
          <svg width="320" height="260" viewBox="0 0 320 260" fill="none">
            {/* Base */}
            <rect x="130" y="220" width="60" height="16" rx="4" fill="#1e293b" />
            <rect x="142" y="200" width="36" height="24" rx="4" fill="#334155" />

            {/* Arm segments */}
            <motion.g
              animate={{ rotate: [-2, 2, -2] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              style={{ transformOrigin: "160px 200px" }}
            >
              <rect x="153" y="130" width="14" height="74" rx="5" fill="#475569" />
              <circle cx="160" cy="128" r="10" fill="#1a5fb4" />

              {/* Upper arm */}
              <motion.g
                animate={{ rotate: [-3, 3, -3] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                style={{ transformOrigin: "160px 128px" }}
              >
                <rect
                  x="156"
                  y="60"
                  width="8"
                  height="70"
                  rx="4"
                  fill="#64748b"
                  transform="rotate(-10 160 128)"
                />
                <circle cx="152" cy="62" r="8" fill="#3584e4" transform="rotate(-10 160 128) translate(-8,68)" />

                {/* Weld head */}
                <motion.g
                  animate={{ rotate: [0, 5, 0, -5, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                  style={{ transformOrigin: "145px 55px" }}
                >
                  <polygon points="138,42 152,42 148,58 134,58" fill="#1a5fb4" transform="rotate(-10 160 128) translate(-8,68)" />
                </motion.g>
              </motion.g>
            </motion.g>

            {/* Welding sparks */}
            {[0, 1, 2, 3, 4].map((i) => (
              <motion.circle
                key={i}
                cx={88 + i * 8}
                cy={74}
                r={1.5}
                fill="#e66100"
                animate={{
                  opacity: [0, 1, 0],
                  y: [0, -8 - i * 3, -16 - i * 4],
                  x: [0, (i % 2 === 0 ? 1 : -1) * (i + 1) * 2, (i % 2 === 0 ? 2 : -2) * (i + 1)],
                }}
                transition={{
                  duration: 0.8,
                  repeat: Infinity,
                  delay: i * 0.15,
                  ease: "easeOut",
                }}
              />
            ))}

            {/* Workpiece / seam */}
            <rect x="50" y="75" width="90" height="18" rx="4" fill="#94a3b8" />
            <motion.rect
              x="50"
              y="82"
              width="0"
              height="4"
              rx="2"
              fill="#e66100"
              animate={{ width: [0, 90, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            />

            {/* Vision overlay boxes */}
            <motion.rect
              x="46"
              y="71"
              width="98"
              height="26"
              rx="4"
              stroke="#3584e4"
              strokeWidth="1.5"
              strokeDasharray="6 3"
              fill="none"
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />

            {/* Path trajectory dots */}
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <motion.circle
                key={`dot-${i}`}
                cx={55 + i * 16}
                cy={84}
                r={2}
                fill="#1a5fb4"
                animate={{ opacity: [0.2, 1, 0.2], scale: [0.8, 1.2, 0.8] }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: i * 0.2,
                }}
              />
            ))}

            {/* Data labels */}
            <text x="200" y="100" fontSize="9" fill="#64748b" fontFamily="monospace">
              SEAM DETECTED
            </text>
            <text x="200" y="114" fontSize="9" fill="#1a5fb4" fontFamily="monospace">
              CONF: 98.4%
            </text>
            <text x="200" y="128" fontSize="9" fill="#64748b" fontFamily="monospace">
              VOLTAGE: 24.2V
            </text>
            <text x="200" y="142" fontSize="9" fill="#64748b" fontFamily="monospace">
              SPEED: 8mm/s
            </text>
            <text x="200" y="156" fontSize="9" fill="#e66100" fontFamily="monospace">
              AUTO-OPTIMIZED
            </text>

            {/* Scanning line */}
            <motion.line
              x1="46"
              y1="71"
              x2="144"
              y2="71"
              stroke="#3584e4"
              strokeWidth="1"
              animate={{ y1: [71, 97, 71], y2: [71, 97, 71] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
          </svg>
        </div>
      </div>

      {/* Status chips */}
      <motion.div
        className="absolute top-4 left-4 flex items-center gap-1.5 bg-white/90 backdrop-blur rounded-full px-3 py-1 border border-green-200 shadow-sm"
        animate={{ opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-2 h-2 rounded-full bg-green-500" />
        <span className="text-xs font-medium text-green-700">System Active</span>
      </motion.div>

      <div className="absolute top-4 right-4 bg-white/90 backdrop-blur rounded-full px-3 py-1 border border-blue-200 shadow-sm">
        <span className="text-xs font-medium text-blue-700">Zero-Code Mode</span>
      </div>

      <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur rounded-lg px-3 py-2 border border-gray-200 shadow-sm">
        <p className="text-xs text-gray-500 font-mono">TRAJ_PLAN</p>
        <p className="text-xs font-semibold text-gray-900 font-mono">247 points / 3.2s</p>
      </div>

      <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur rounded-lg px-3 py-2 border border-orange-200 shadow-sm">
        <p className="text-xs text-gray-500 font-mono">WELD_QUALITY</p>
        <p className="text-xs font-semibold text-orange-700 font-mono">99.1% ↑</p>
      </div>
    </div>
  );
}

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex flex-col justify-center pt-16 overflow-hidden bg-white">
      {/* Subtle background */}
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 50%, #e8f0fb 0%, transparent 50%), radial-gradient(circle at 80% 20%, #fff7ed 0%, transparent 40%)",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-16 md:py-20 grid md:grid-cols-2 gap-12 items-center">
        {/* Left: Copy */}
        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-[#1a5fb4] bg-[#e8f0fb] px-3 py-1 rounded-full border border-[#1a5fb4]/20">
              <span className="w-1.5 h-1.5 rounded-full bg-[#1a5fb4] inline-block" />
              AI-Powered Industrial Robotics
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight text-gray-900"
          >
            Autonomous
            <br />
            <span className="text-[#1a5fb4]">Welding.</span>
            <br />
            Zero Code.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="text-lg text-gray-500 leading-relaxed max-w-lg"
          >
            Computer vision detects the seam. AI optimizes parameters. The robot
            plans and executes — all without a single line of code.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="flex flex-wrap gap-3 pt-2"
          >
            <CTAButton href="#cta" variant="primary" icon className="text-base px-7 py-3.5">
              Book a Demo
            </CTAButton>
            <CTAButton href="#solution" variant="secondary" className="text-base px-7 py-3.5">
              See How It Works
            </CTAButton>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.7 }}
            className="flex items-center gap-6 pt-4 border-t border-gray-100"
          >
            {[
              { value: "98%+", label: "Weld accuracy" },
              { value: "10×", label: "Faster setup" },
              { value: "Zero", label: "Robot programming" },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="text-xl font-bold text-gray-900">{stat.value}</p>
                <p className="text-xs text-gray-500">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Right: Visualization */}
        <motion.div
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          <AnimatedPipelineViz />
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-gray-400"
        animate={{ y: [0, 6, 0] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
      >
        <span className="text-xs tracking-widest uppercase">Scroll</span>
        <ChevronDown className="w-4 h-4" />
      </motion.div>
    </section>
  );
}
