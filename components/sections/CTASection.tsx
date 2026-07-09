"use client";

import { SectionWrapper } from "../SectionWrapper";
import { MotionReveal } from "../MotionReveal";
import { CTAButton } from "../CTAButton";
import { Blocks, Users, ShieldCheck } from "lucide-react";

export function CTASection() {
  return (
    <SectionWrapper id="cta" className="bg-graphite">
      <MotionReveal>
        <div className="max-w-3xl mx-auto text-center">
          <span className="text-xs font-semibold tracking-widest uppercase text-accent">
            Get Started
          </span>
          <h2 className="mt-3 text-3xl md:text-5xl font-bold text-offwhite tracking-tight leading-[1.1]">
            Stop programming.
            <br />
            Start talking.
          </h2>
          <p className="mt-5 text-xl text-mute leading-relaxed">
            See <span className="font-semibold text-offwhite">nex-ON</span> find
            a part, measure it, and rehearse a full pass — directed entirely by
            voice. Then talk to us about the robot you want it to drive next.
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
                icon: Blocks,
                title: "Bring Your Own Robot",
                desc: "We're not a robot manufacturer. nex-ON is built to sit above hardware you already own.",
              },
              {
                icon: ShieldCheck,
                title: "Rehearse First",
                desc: "Every dangerous action runs dry by default. Nothing is energized until you arm it.",
              },
              {
                icon: Users,
                title: "Engineering-Led Pilots",
                desc: "Start on a single cell. Our team is in the loop from calibration to first live pass.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="p-5 bg-carbon rounded-xl border border-steel text-left"
              >
                <div className="w-8 h-8 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center mb-3">
                  <item.icon size={15} className="text-accent" />
                </div>
                <p className="font-semibold text-sm text-offwhite">{item.title}</p>
                <p className="text-xs text-mute mt-1 leading-relaxed">
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
