"use client";

import { SectionWrapper } from "../SectionWrapper";
import { MotionReveal } from "../MotionReveal";
import { CTAButton } from "../CTAButton";
import { ArrowRight, Mail, Users } from "lucide-react";

export function CTASection() {
  return (
    <SectionWrapper id="cta" className="bg-gray-50">
      <MotionReveal>
        <div className="max-w-3xl mx-auto text-center">
          <span className="text-xs font-semibold tracking-widest uppercase text-[#1a5fb4]">
            Get Started
          </span>
          <h2 className="mt-3 text-3xl md:text-5xl font-bold text-gray-900 tracking-tight">
            Deploy autonomous
            <br />
            robotics today.
          </h2>
          <p className="mt-5 text-xl text-gray-500 leading-relaxed">
            Join manufacturers already running CozmoBot on the floor. We work
            with your existing robots, your team, and your timeline.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <CTAButton
              href="mailto:contact@cozmobot.ai"
              variant="primary"
              icon
              className="text-base px-8 py-4"
            >
              Book a Demo
            </CTAButton>
            <CTAButton
              href="mailto:partners@cozmobot.ai"
              variant="secondary"
              className="text-base px-8 py-4"
            >
              Partner With Us
            </CTAButton>
          </div>

          <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              {
                icon: ArrowRight,
                title: "Quick Integration",
                desc: "Works with your existing robot hardware in days, not months.",
              },
              {
                icon: Users,
                title: "Dedicated Support",
                desc: "Our engineering team guides deployment from day one.",
              },
              {
                icon: Mail,
                title: "Flexible Trials",
                desc: "Pilot on a single cell before scaling to your full line.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="p-5 bg-white rounded-xl border border-gray-200 text-left"
              >
                <div className="w-8 h-8 rounded-lg bg-[#e8f0fb] flex items-center justify-center mb-3">
                  <item.icon size={15} className="text-[#1a5fb4]" />
                </div>
                <p className="font-semibold text-sm text-gray-900">{item.title}</p>
                <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </MotionReveal>
    </SectionWrapper>
  );
}
