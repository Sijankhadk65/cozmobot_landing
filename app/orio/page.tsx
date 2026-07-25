import type { Metadata } from "next";
import { OrioComingSoon } from "@/components/sections/OrioComingSoon";
import { CTASection } from "@/components/sections/CTASection";

export const metadata: Metadata = {
  title: "Orio — the robot that helps the public (coming soon)",
  description:
    "Orio is nex-ON on wheels, with a face: a mobile assistant for shops, stations, and lobbies. Ask where something is and it answers, then leads you to it. In development — powered by the same nex-ON brain that drives Omnicron.",
  openGraph: {
    title: "Orio — the robot that helps the public (coming soon)",
    description:
      "nex-ON on wheels, with a face — a mobile assistant for the places the public stands in. In development.",
    type: "website",
    siteName: "CozmoBot",
  },
};

// Orio is still in development, so its route is a focused coming-soon page: the
// pitch, the concept photo, and a way to be notified — then the shared contact
// CTA.
export default function OrioPage() {
  return (
    <main>
      <OrioComingSoon />
      <CTASection />
    </main>
  );
}
