import { NexonExperience } from "@/components/three/NexonExperience";
import { CTASection } from "@/components/sections/CTASection";

// The home page is a single scroll-driven scene around the nex-ON edge unit:
// five acts told against the 3D model, then the contact CTA. The deep product
// stories live on their own routes (/omnicron, /orio), reached from the final
// act.
export default function Home() {
  return (
    <main>
      <NexonExperience />
      <CTASection />
    </main>
  );
}
