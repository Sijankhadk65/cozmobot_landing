import { OrioHero } from "@/components/sections/OrioHero";
import { OrioJobsSection } from "@/components/sections/OrioJobsSection";
import { OrioFeaturesSection } from "@/components/sections/OrioFeaturesSection";
import { OrioWatchSection } from "@/components/sections/OrioWatchSection";
import { OrioPreorderSection } from "@/components/sections/OrioPreorderSection";
import { PoweredBySection } from "@/components/sections/PoweredBySection";
import { FaqSection } from "@/components/sections/FaqSection";
import { PilotCTA } from "@/components/site/ui";
import { SiteFooter } from "@/components/site/SiteFooter";

// The home page is Orio's: what it does, the basics up close on the
// prototype, standing in for you when you're out, how the pre-order works,
// the software underneath and what is honestly still being built, then the
// questions people ask before they put their name down.
// The platform argument for industry lives on /platform.
export default function Home() {
  return (
    <main>
      <OrioHero />
      <OrioJobsSection />
      <OrioFeaturesSection />
      <OrioWatchSection />
      <OrioPreorderSection />
      <PoweredBySection />
      <FaqSection />
      <PilotCTA
        eyebrow="Pre-orders open · delivery from Q1 2028"
        heading="Put your name on one."
        copy="Nothing is charged today, and you can cancel any time before delivery."
        secondary={{ label: "How the platform works", href: "/platform" }}
        id="preorder"
      />
      <SiteFooter variant="full" />
    </main>
  );
}
