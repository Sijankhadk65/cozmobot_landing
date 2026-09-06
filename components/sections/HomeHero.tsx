import Image from "next/image";
import Link from "next/link";
import { HeroReel } from "./HeroReel";
import heroBackground from "@/assets/omnicron_welding_images/9.jpeg";

export function HomeHero() {
  return (
    <section className="relative border-b border-hair">
      <div className="relative overflow-hidden">
        <Image
          src={heroBackground}
          alt=""
          fill
          sizes="100vw"
          quality={90}
          preload
          className="object-cover object-center"
        />
        {/* The photograph is a dark shop floor; the wash carries the page's
            cream across the left two-thirds so the headline has paper under it
            and the arc stays visible on the right. */}
        <div
          aria-hidden
          className="absolute inset-0 z-[1] bg-[linear-gradient(100deg,rgba(252,252,248,0.97)_0%,rgba(252,252,248,0.94)_40%,rgba(252,252,248,0.72)_56%,rgba(252,252,248,0.12)_72%,rgba(252,252,248,0)_100%)]"
        />

        <div className="relative z-[2] shell pb-[clamp(40px,5vw,72px)] pt-[clamp(56px,8vw,96px)]">
          <div className="eyebrow flex items-center gap-3">
            <span className="h-1.5 w-1.5 rounded-full bg-lime" />
            <span>nex-ON // software platform · v1 running on a live cobot</span>
          </div>

          <h1 className="h-display mt-7 max-w-[17ch] text-balance">
            Deploy any robot to do anything.
          </h1>

          <p className="lede mt-6 max-w-[56ch]">
            nex-ON is the embodied OS — a robot-agnostic deployment platform
            that sits between an AI brain and a robot body. Perception, tooling
            and motion become modular capabilities an LLM composes on the fly,
            delivered as an edition built for your industry — Weld OS first. You
            direct it by talking.
          </p>

          <div className="mt-10 flex flex-wrap gap-3">
            <Link href="/contact" className="btn-primary">
              Request pilot access
            </Link>
            <Link href="/platform" className="btn-ghost">
              How the platform works
            </Link>
          </div>
        </div>
      </div>

      <div className="shell pb-[clamp(56px,8vw,80px)] pt-[clamp(40px,5vw,64px)]">
        <HeroReel />
      </div>
    </section>
  );
}
