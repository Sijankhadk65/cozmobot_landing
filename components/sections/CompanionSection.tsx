import Image from "next/image";
import Link from "next/link";
import orioHero from "@/assets/orio_hero_A.png";

const jobs = [
  "Carries things where you point it",
  "Fetches what you ask for by name",
  "Stands watch, drive it yourself from anywhere",
  "Raises an SOS to the contacts you nominate",
];

// Deliberately unnumbered. The home page runs a numbered argument from 01 to
// 09 about the platform; Orio is the one thing on it you can actually buy, so
// it sits between the editions and the bottleneck as an aside rather than
// taking a number and pushing every section after it along by one.
export function CompanionSection() {
  return (
    <section id="orio" className="border-b border-hair">
      <div className="shell band-lg">
        <div className="flex flex-wrap border border-line">
          <div className="relative min-h-[300px] flex-[1_1_380px]">
            <Image
              src={orioHero}
              alt="Orio, a compact white two-wheeled robot with a screen face and two gripper arms, in a bright room beside a shelf of containers"
              fill
              sizes="(max-width: 900px) 100vw, 45vw"
              quality={90}
              className="object-cover object-[30%_center]"
            />
            <span className="meta absolute bottom-0 left-0 border-r border-t border-line bg-paper px-3.5 py-2">
              Design render
            </span>
          </div>

          <div className="flex-[1_1_440px] border-l border-line bg-mist p-[clamp(30px,4vw,52px)]">
            <div className="eyebrow flex items-center gap-3">
              <span className="h-1.5 w-1.5 rounded-full bg-lime" />
              <span>Companion OS · pre-orders open</span>
            </div>
            <h2 className="mt-6 max-w-[16ch] text-[clamp(32px,3.8vw,52px)] font-medium leading-[1.02] tracking-[-0.035em]">
              Meet Orio.
            </h2>
            <p className="copy mt-5 max-w-[46ch]">
              The same orchestration, on a wheeled body built for everyday life
              rather than a shop floor. Orio is the first Companion OS robot,
              and the first thing we sell you outright.
            </p>

            <ul className="mt-7 flex flex-col gap-3">
              {jobs.map((job) => (
                <li key={job} className="flex items-baseline gap-3">
                  <span className="font-brand text-[11px] text-moss">▸</span>
                  <span className="text-base leading-[1.4] text-deep">
                    {job}
                  </span>
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-wrap items-baseline gap-x-3 gap-y-1 border-t border-line-soft pt-6">
              <span className="text-[26px] leading-none tracking-[-0.02em]">
                &euro;450
              </span>
              <span className="font-brand text-[11px] uppercase tracking-[0.06em] text-muted">
                / month · first 100 orders · delivery from Q1 2028
              </span>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/companion" className="btn-primary">
                Meet Orio
              </Link>
              <Link href="/contact?intent=preorder" className="btn-ghost">
                Pre-order
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
