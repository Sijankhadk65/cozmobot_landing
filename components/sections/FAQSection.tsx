"use client";

import { SectionWrapper } from "../SectionWrapper";
import { MotionReveal } from "../MotionReveal";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { Plus } from "lucide-react";

// Answers the objections a buyer actually arrives with. Facts are the user's
// own; the NVIDIA Jetson model names are pending final confirmation.
const faqs: { q: string; a: React.ReactNode }[] = [
  {
    q: "Which robots does nex-ON support?",
    a: (
      <>
        nex-ON is robot-agnostic by design. Today it runs on a{" "}
        <span className="text-offwhite font-medium">FAIRINO FR5</span>{" "}
        collaborative arm — that pairing is Omnicron, our welding application.
        Orio, the mobile application, is built on{" "}
        <span className="text-offwhite font-medium">
          NVIDIA edge AI hardware
        </span>{" "}
        (Jetson Thor / Orin and DGX Spark). Because perception, tooling, and
        control are interfaces rather than fixed implementations, the same stack
        is architected to drop onto other arms and bodies.
      </>
    ),
  },
  {
    q: "How hard is it to set up on a new cell?",
    a: (
      <>
        About{" "}
        <span className="text-offwhite font-medium">50 minutes to an hour</span>
        . You don&apos;t need a robotics background — if you can follow a manual
        and set up a computer, you can do it. Setup is physical: connect the
        robot to the AI computer, attach the camera and peripherals, and
        you&apos;re running.
      </>
    ),
  },
  {
    q: "Does it need the cloud?",
    a: (
      <>
        No. The entire nex-ON stack runs on a{" "}
        <span className="text-offwhite font-medium">
          local AI computer in your facility
        </span>
        . Nothing has to leave the building — it keeps working without an
        internet connection, and your operation&apos;s data stays yours.
      </>
    ),
  },
  {
    q: "Is it safe to run a live arc?",
    a: (
      <>
        Safety is built in, not bolted on. Every dangerous action runs{" "}
        <span className="text-offwhite font-medium">dry by default</span> — the
        motion is identical, but nothing is energized. A live arc must be
        deliberately armed each session and never persists across restarts.
        Speeds default low, and a dry-run reachability check reports feasibility
        before the arm moves at all.
      </>
    ),
  },
  {
    q: "What does it cost?",
    a: (
      <>
        Pricing isn&apos;t public yet — we&apos;re running early pilots. Book a
        demo and we&apos;ll talk through specifics for your cell and workload.
      </>
    ),
  },
];

function FaqItem({
  faq,
  isOpen,
  onToggle,
}: {
  faq: (typeof faqs)[number];
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="border border-steel rounded-xl bg-carbon overflow-hidden transition-colors hover:border-accent/40">
      <h3>
        <button
          type="button"
          onClick={onToggle}
          aria-expanded={isOpen}
          className="w-full flex items-center justify-between gap-4 text-left px-5 py-4 md:px-6 md:py-5 cursor-pointer"
        >
          <span className="text-base md:text-lg font-semibold text-offwhite">
            {faq.q}
          </span>
          <motion.span
            aria-hidden
            animate={{ rotate: isOpen ? 45 : 0 }}
            transition={{ duration: 0.2 }}
            className="flex-shrink-0 text-accent"
          >
            <Plus size={20} />
          </motion.span>
        </button>
      </h3>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.25, 0.1, 0.25, 1] }}
            className="overflow-hidden"
          >
            <p className="px-5 pb-5 md:px-6 md:pb-6 text-mute leading-relaxed max-w-2xl">
              {faq.a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function FAQSection() {
  // Single-open accordion; first item starts open so the section never reads
  // as an empty list of buttons.
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <SectionWrapper id="faq">
      <div className="grid lg:grid-cols-[0.8fr_1.2fr] gap-10 lg:gap-16 items-start">
        <MotionReveal>
          <div className="lg:sticky lg:top-24">
            <span className="text-xs font-semibold tracking-widest uppercase text-accent">
              FAQ
            </span>
            <h2 className="mt-3 text-3xl md:text-4xl font-bold text-offwhite tracking-tight leading-tight">
              The questions
              <br />
              buyers actually ask.
            </h2>
            <p className="mt-4 text-mute leading-relaxed">
              Straight answers on hardware, setup, safety, and where the AI runs.
              Something not covered here?{" "}
              <a href="#cta" className="text-accent hover:underline">
                Ask us directly.
              </a>
            </p>
          </div>
        </MotionReveal>

        <MotionReveal delay={0.1}>
          <div className="flex flex-col gap-3">
            {faqs.map((faq, i) => (
              <FaqItem
                key={faq.q}
                faq={faq}
                isOpen={openIndex === i}
                onToggle={() => setOpenIndex(openIndex === i ? null : i)}
              />
            ))}
          </div>
        </MotionReveal>
      </div>
    </SectionWrapper>
  );
}
