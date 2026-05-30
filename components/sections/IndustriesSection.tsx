"use client";

import { SectionWrapper } from "../SectionWrapper";
import { MotionReveal } from "../MotionReveal";
import { motion } from "framer-motion";
import { Zap, Ship, Cog, Plane, Car, Wrench } from "lucide-react";

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
    desc: "Complex fabrications, large-format structures, and high-volume production.",
  },
  {
    icon: Plane,
    name: "Aerospace",
    desc: "Precision structural welds with full traceability and quality records.",
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

export function IndustriesSection() {
  return (
    <SectionWrapper id="industries">
      <MotionReveal>
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-semibold tracking-widest uppercase text-gray-400">
            Industries
          </span>
          <h2 className="mt-3 text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">
            Built for where
            <br />
            steel meets deadline
          </h2>
          <p className="mt-4 text-gray-500 text-lg">
            CozmoBot deploys across every industry that depends on metal joining
            — from shipyards to aerospace facilities.
          </p>
        </div>
      </MotionReveal>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {industries.map((ind, i) => (
          <MotionReveal key={ind.name} delay={i * 0.07}>
            <motion.div
              whileHover={{ y: -3 }}
              transition={{ duration: 0.2 }}
              className="group p-6 bg-white rounded-xl border border-gray-200 hover:border-[#1a5fb4]/40 hover:shadow-lg transition-all duration-200"
            >
              <div className="flex items-center gap-4 mb-3">
                <div className="w-10 h-10 rounded-lg bg-[#e8f0fb] border border-[#1a5fb4]/20 flex items-center justify-center">
                  <ind.icon size={18} className="text-[#1a5fb4]" />
                </div>
                <h3 className="font-semibold text-gray-900">{ind.name}</h3>
              </div>
              <p className="text-sm text-gray-500 leading-relaxed">{ind.desc}</p>
            </motion.div>
          </MotionReveal>
        ))}
      </div>
    </SectionWrapper>
  );
}
