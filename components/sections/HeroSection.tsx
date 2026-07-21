"use client";

import { motion } from "framer-motion";
import { CTAButton } from "../CTAButton";
import { HeroVideo } from "../HeroVideo";
import { ChevronDown } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative flex flex-col justify-center pt-16 overflow-hidden bg-carbon">
      {/* Subtle background */}
      <div
        className="absolute inset-0 opacity-60"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 50%, rgba(173,208,55,0.07) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(50,51,51,0.6) 0%, transparent 45%)",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-16 md:py-24 grid md:grid-cols-2 gap-12 lg:gap-16 items-center">
        {/* Left: Copy */}
        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-accent bg-accent/10 px-3 py-1 rounded-full border border-accent/25">
              <span className="w-1.5 h-1.5 rounded-full bg-accent inline-block" />
              Robot-agnostic AI deployment platform
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.08] tracking-tight text-offwhite"
          >
            Deploy any robot
            <br />
            to do anything.
            <br />
            <span className="text-accent">Just by talking to it.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="text-lg text-mute leading-relaxed max-w-lg"
          >
            <span className="font-semibold text-offwhite">nex-ON</span> is the
            layer between an AI brain and a robot body. It perceives the real
            scene, picks the right tool, and acts — directed entirely in plain
            human language. No teach pendant. No CAD programming.
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
            <CTAButton href="#how" variant="secondary" className="text-base px-7 py-3.5">
              See how it works
            </CTAButton>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.7 }}
            className="flex flex-wrap items-center gap-x-8 gap-y-4 pt-5 border-t border-steel/60"
          >
            {[
              { value: "Any", label: "Robot body" },
              { value: "Zero", label: "Lines of code" },
              { value: "Multilingual", label: "Voice in and out" },
              { value: "Dry-run", label: "Safe by default" },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="text-xl font-bold text-offwhite">{stat.value}</p>
                <p className="text-xs text-mute">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Right: the real robot, mid-weld */}
        <motion.div
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          <HeroVideo />
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="relative mx-auto flex flex-col items-center gap-1 text-mute pb-8"
        animate={{ y: [0, 6, 0] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
      >
        <span className="text-xs tracking-widest uppercase">Scroll</span>
        <ChevronDown className="w-4 h-4" />
      </motion.div>
    </section>
  );
}
