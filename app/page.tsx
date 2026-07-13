import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/sections/HeroSection";
import { ProblemSection } from "@/components/sections/ProblemSection";
import { PlatformSection } from "@/components/sections/PlatformSection";
import { SolutionSection } from "@/components/sections/SolutionSection";
import { CapabilitiesSection } from "@/components/sections/CapabilitiesSection";
import { OmnicronSection } from "@/components/sections/OmnicronSection";
import { OrioSection } from "@/components/sections/OrioSection";
import { ArchitectureSection } from "@/components/sections/ArchitectureSection";
import { AnyRobotSection } from "@/components/sections/AnyRobotSection";
import { ROISection } from "@/components/sections/ROISection";
import { CTASection } from "@/components/sections/CTASection";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <ProblemSection />
        <PlatformSection />
        <SolutionSection />
        <CapabilitiesSection />
        <OmnicronSection />
        <OrioSection />
        <ArchitectureSection />
        <AnyRobotSection />
        <ROISection />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
