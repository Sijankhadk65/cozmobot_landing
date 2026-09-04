import { NexonExperience } from "@/components/three/NexonExperience";

// The home page is a single scroll-driven scene told in five acts: the problem,
// the OS, the runtime, any body, install it. nex-ON is licensed software, so
// the edge unit is deliberately NOT the subject — it opens large, then shrinks
// and drifts aside act by act while the software overlays take the frame, and
// returns at the end labelled as one optional way to run it.
//
// No contact CTA or footer here — it stays a pure, immersive experience, and
// act 5 hands off to the deep routes. Contact lives on those (/platform,
// /omnicron, /orio), each of which carries the shared CTASection.
export default function Home() {
  return (
    <main>
      <NexonExperience />
    </main>
  );
}
