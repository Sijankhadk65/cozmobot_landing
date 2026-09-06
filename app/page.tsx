import { HomeHero } from "@/components/sections/HomeHero";
import { FactsSection } from "@/components/sections/FactsSection";
import { EditionsSection } from "@/components/sections/EditionsSection";
import { BottleneckSection } from "@/components/sections/BottleneckSection";
import { AgentLoopSection } from "@/components/sections/AgentLoopSection";
import { PlatformLayersSection } from "@/components/sections/PlatformLayersSection";
import { CapabilitiesSection } from "@/components/sections/CapabilitiesSection";
import { ProofSection } from "@/components/sections/ProofSection";
import { PositioningSection } from "@/components/sections/PositioningSection";
import { MaturitySection } from "@/components/sections/MaturitySection";
// The team section is held back until we have real names and portraits —
// re-enable this import and the <TeamSection /> below to bring it back.
// import { TeamSection } from "@/components/sections/TeamSection";
import { FaqSection } from "@/components/sections/FaqSection";
import { PilotCTA } from "@/components/site/ui";
import { SiteFooter } from "@/components/site/SiteFooter";

// The home page runs the full argument in nine numbered movements: what nex-ON
// is, the editions built on it, why deployment is the bottleneck, how the loop
// works, the three-layer stack, what ships today, the welding proof point,
// where we sit against everyone else, what is honestly unshipped, and the
// questions we get asked — then the pilot ask. Who builds it is held back
// until the real names and portraits land.
export default function Home() {
  return (
    <main>
      <HomeHero />
      <FactsSection />
      <EditionsSection />
      <BottleneckSection />
      <AgentLoopSection />
      <PlatformLayersSection />
      <CapabilitiesSection />
      <ProofSection />
      <PositioningSection />
      <MaturitySection />
      {/* <TeamSection eyebrow="09 / team" /> */}
      <FaqSection />
      <PilotCTA
        eyebrow="Pilot programme · limited slots"
        heading="Bring us a part. Talk to it."
        copy="We deploy nex-ON on a robot you already have, on a task you already run, and you direct it in plain language on day one."
        secondary={{ label: "Read the technical brief", href: "/platform" }}
      />
      <SiteFooter variant="full" />
    </main>
  );
}
