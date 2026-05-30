import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/sections/HeroSection";
import { ProblemSection } from "@/components/sections/ProblemSection";
import { SolutionSection } from "@/components/sections/SolutionSection";
import { FeaturesSection } from "@/components/sections/FeaturesSection";
import { ExpandabilitySection } from "@/components/sections/ExpandabilitySection";
import { ArchitectureSection } from "@/components/sections/ArchitectureSection";
import { IndustriesSection } from "@/components/sections/IndustriesSection";
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
        <SolutionSection />
        <FeaturesSection />
        <ExpandabilitySection />
        <ArchitectureSection />
        <IndustriesSection />
        <ROISection />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
