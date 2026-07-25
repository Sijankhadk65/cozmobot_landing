import { NexonExperience } from "@/components/three/NexonExperience";

// The home page is a single scroll-driven scene around the nex-ON edge unit:
// five acts told against the 3D model, ending on the Omnicron / Orio links in
// the final act. No contact CTA or footer here — it stays a pure, immersive
// experience. Contact lives on the deep routes (/platform, /omnicron, /orio),
// each of which carries the shared CTASection.
export default function Home() {
  return (
    <main>
      <NexonExperience />
    </main>
  );
}
