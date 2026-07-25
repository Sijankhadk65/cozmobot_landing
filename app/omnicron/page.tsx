import type { Metadata } from "next";
import { OmnicronSection } from "@/components/sections/OmnicronSection";
import { CTASection } from "@/components/sections/CTASection";

export const metadata: Metadata = {
  title: "Omnicron — the autonomous welding cobot",
  description:
    "Omnicron is nex-ON pointed at welding: a MIG torch on a collaborative arm that finds the joint, measures it, rehearses the pass, and — once armed — runs a live weld. Real welds from our shop floor, and a safety model where the arc is off until you say otherwise.",
  openGraph: {
    title: "Omnicron — the autonomous welding cobot",
    description:
      "nex-ON pointed at welding. It finds the joint, measures it, rehearses the pass, and runs a live weld once armed. Real welds from our shop floor.",
    type: "website",
    siteName: "CozmoBot",
  },
};

// The welding application gets its own route so the home page can stay on the
// nex-ON platform. Everything welding-specific lives in OmnicronSection; the
// page frames it with the shared contact CTA.
export default function OmnicronPage() {
  return (
    <main>
      <OmnicronSection />
      <CTASection />
    </main>
  );
}
