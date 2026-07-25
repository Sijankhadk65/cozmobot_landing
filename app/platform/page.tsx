import type { Metadata } from "next";
import Link from "next/link";
import { ProblemSection } from "@/components/sections/ProblemSection";
import { PlatformSection } from "@/components/sections/PlatformSection";
import { SolutionSection } from "@/components/sections/SolutionSection";
import { CapabilitiesSection } from "@/components/sections/CapabilitiesSection";
import { ArchitectureSection } from "@/components/sections/ArchitectureSection";
import { AnyRobotSection } from "@/components/sections/AnyRobotSection";
import { ROISection } from "@/components/sections/ROISection";
import { FAQSection } from "@/components/sections/FAQSection";
import { CTASection } from "@/components/sections/CTASection";

export const metadata: Metadata = {
  title: "nex-ON — the robot-agnostic AI deployment platform",
  description:
    "The depth behind the nex-ON platform: why deploying robots is brutal today, the brain-capabilities-body model, the agentic loop, every capability running now, the architecture, and how any robot maps to any task.",
  openGraph: {
    title: "nex-ON — the robot-agnostic AI deployment platform",
    description:
      "Why deploying robots is brutal today, the brain-capabilities-body model, the agentic loop, and how any robot maps to any task.",
    type: "website",
    siteName: "CozmoBot",
  },
};

// The home page is the cinematic 3D scroll; this route carries the full platform
// substance. Each section keeps its own anchor id (#problem, #platform, #how,
// #capabilities, #architecture, #any-robot, #operations, #faq) so the menu and
// footer can link straight into it (/platform#capabilities, etc.). Ends on the
// shared contact CTA.
export default function PlatformPage() {
  return (
    <main>
      {/* Page intro — orients the reader arriving from the home experience,
          without re-running the home hero. */}
      <section className="w-full bg-carbon pt-32 pb-16 md:pt-40 md:pb-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-accent bg-accent/10 px-3 py-1 rounded-full border border-accent/25">
            <span className="w-1.5 h-1.5 rounded-full bg-accent inline-block" />
            The platform, in full
          </span>
          <h1 className="mt-5 text-4xl md:text-6xl font-bold leading-[1.05] tracking-tight text-offwhite max-w-3xl">
            One layer between an AI brain and any robot body.
          </h1>
          <p className="mt-5 text-lg text-mute leading-relaxed max-w-2xl">
            <span className="font-semibold text-offwhite">nex-ON</span> perceives
            the real scene, picks the right tool, and acts — directed entirely in
            plain human language. Below is everything running today, and the
            architecture that lets it drive any robot next.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/omnicron"
              className="inline-flex items-center gap-2 rounded-full border border-accent/60 bg-accent/15 px-4 py-2 text-sm text-offwhite hover:border-accent hover:bg-accent/25 transition-colors"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-accent" />
              See it welding — Omnicron
            </Link>
            <Link
              href="#cta"
              className="inline-flex items-center gap-2 rounded-full border border-steel px-4 py-2 text-sm text-mute hover:border-offwhite hover:text-offwhite transition-colors"
            >
              Book a demo
            </Link>
          </div>
        </div>
      </section>

      <ProblemSection />
      <PlatformSection />
      <SolutionSection />
      <CapabilitiesSection />
      <ArchitectureSection />
      <AnyRobotSection />
      <ROISection />
      <FAQSection />
      <CTASection />
    </main>
  );
}
