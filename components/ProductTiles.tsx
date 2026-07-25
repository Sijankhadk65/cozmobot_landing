"use client";

import Image, { type StaticImageData } from "next/image";
import { SectionWrapper } from "./SectionWrapper";
import { MotionReveal } from "./MotionReveal";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { CTAButton } from "./CTAButton";
import omnicronImg from "@/assets/omnicron-hero.png";
import orioImg from "@/assets/orio_hero_A.png";

// The "any body" story, made concrete and comparable before the reader reaches
// the long deep sections. Same tile shape for both applications so the platform
// reads as one system with two heads on it.
const products: {
  name: string;
  image: StaticImageData;
  thesis: string;
  blurb: string;
  status: { label: string; proven: boolean };
  href: string;
}[] = [
  {
    name: "Omnicron",
    image: omnicronImg,
    thesis: "The autonomous welding cobot.",
    blurb:
      "A MIG torch on the end of nex-ON. It finds the joint, measures it, rehearses the pass, and — once armed — runs a live weld.",
    status: { label: "Proven · welding live", proven: true },
    href: "#omnicron",
  },
  {
    name: "Orio",
    image: orioImg,
    thesis: "The robot that helps the public.",
    blurb:
      "The same brain on wheels, with a face. Built for shops, stations, and lobbies — where the person who needs help is a customer, not an operator.",
    status: { label: "In build", proven: false },
    href: "#orio",
  },
];

export function ProductTiles() {
  return (
    <SectionWrapper id="applications" className="bg-carbon">
      <MotionReveal>
        <div className="max-w-2xl mb-10">
          <span className="text-xs font-semibold tracking-widest uppercase text-accent">
            One platform, many bodies
          </span>
          <h2 className="mt-3 text-3xl md:text-4xl font-bold text-offwhite tracking-tight leading-tight">
            The same brain, a different job on the end.
          </h2>
          <p className="mt-4 text-mute text-lg leading-relaxed">
            nex-ON isn&apos;t one robot for one task. Here&apos;s what it already
            drives — one welding, one helping the public.
          </p>
        </div>
      </MotionReveal>

      <div className="grid md:grid-cols-2 gap-6">
        {products.map((p, i) => (
          <MotionReveal key={p.name} delay={i * 0.1}>
            <motion.article
              whileHover={{ y: -4 }}
              transition={{ duration: 0.2 }}
              className="group h-full flex flex-col overflow-hidden rounded-2xl border border-steel bg-graphite hover:border-accent/40 transition-colors"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-carbon">
                <Image
                  src={p.image}
                  alt={`${p.name} — a nex-ON application.`}
                  placeholder="blur"
                  quality={90}
                  sizes="(min-width: 768px) 50vw, 95vw"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                />
                <span className="absolute top-3 left-3 inline-flex items-center gap-1.5 rounded-full border border-steel bg-carbon/85 backdrop-blur-sm px-2.5 py-1">
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${
                      p.status.proven ? "bg-accent" : "bg-mute"
                    }`}
                  />
                  <span className="text-[10px] font-mono uppercase tracking-wider text-offwhite/85">
                    {p.status.label}
                  </span>
                </span>
              </div>

              <div className="flex flex-1 flex-col p-6">
                <h3 className="font-brand text-2xl font-bold text-offwhite">
                  {p.name}
                </h3>
                <p className="mt-1.5 text-accent font-medium">{p.thesis}</p>
                <p className="mt-3 text-sm text-mute leading-relaxed flex-1">
                  {p.blurb}
                </p>

                <div className="mt-6 flex items-center gap-3">
                  <CTAButton href={p.href} variant="secondary" className="text-sm">
                    Learn more
                  </CTAButton>
                  <a
                    href="#cta"
                    className="inline-flex items-center gap-1.5 text-sm text-mute hover:text-accent transition-colors"
                  >
                    Book a demo
                    <ArrowRight size={14} />
                  </a>
                </div>
              </div>
            </motion.article>
          </MotionReveal>
        ))}
      </div>
    </SectionWrapper>
  );
}
