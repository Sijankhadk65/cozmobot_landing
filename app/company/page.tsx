import type { Metadata } from "next";
// Held back until we have real names and portraits — re-enable this import
// and the <TeamSection /> below to bring it back.
// import { TeamSection } from "@/components/sections/TeamSection";
import { PilotCTA } from "@/components/site/ui";
import { SiteFooter } from "@/components/site/SiteFooter";

export const metadata: Metadata = {
  title: "Company",
  description:
    "CozmoBot builds nex-ON, the embodied OS. Our bet is that the constraint on industrial robotics is not the arm — it is the weeks of specialist programming between buying one and getting work out of it.",
  openGraph: {
    title: "Company — CozmoBot",
    description:
      "The robots exist. We make them deployable. How we work, where we are going, and who is building it.",
    type: "website",
    siteName: "CozmoBot",
  },
};

const principles = [
  {
    n: "01",
    title: "Interpretable over impressive",
    body: "Discrete, inspectable tool calls instead of an opaque policy. If a customer asks why the robot did that, there is an answer in the log.",
  },
  {
    n: "02",
    title: "Dry before live",
    body: "Anything dangerous is rehearsed with nothing energised and armed deliberately. Safety is a property of the platform, not of a demo.",
  },
  {
    n: "03",
    title: "Robots you already own",
    body: "We meet factories where they are — existing arms, existing vendors, existing tasks. No rip-and-replace to get value.",
  },
  {
    n: "04",
    title: "Honest about maturity",
    body: "We separate what runs on a real arm today from what is architected and unshipped, on the site and in the room.",
  },
];

const roadmap = [
  {
    phase: "Now",
    title: "Weld OS in pilots",
    body: "nex-ON with the welding edition deployed on collaborative arms in high-mix, low-volume shops, judged on time-to-deploy against teach-pendant and CAD/CAM routes.",
  },
  {
    phase: "Next",
    title: "More bodies under the same brain",
    body: "Humanoids and AMRs behind the existing motion abstraction, so a new body is an integration rather than a rebuild.",
  },
  {
    phase: "Then",
    title: "Companion, MechFab and Med editions",
    body: "Domain vocabulary, tooling and interlocks per trade on top of the shared core, each starting as a pilot.",
  },
  {
    phase: "Later",
    title: "First-party hardware",
    body: "Purpose-built machines once the software layer is proven across editions. Near-term roadmap — not what we sell today.",
  },
];

export default function CompanyPage() {
  return (
    <main>
      <section className="border-b border-hair">
        <div className="shell band">
          <div className="eyebrow">Company</div>
          <h1 className="mt-6 max-w-[20ch] text-[clamp(36px,5.2vw,82px)] font-medium leading-[0.99] tracking-[-0.035em]">
            The robots exist. We make them deployable.
          </h1>
          <p className="lede mt-6 max-w-[60ch]">
            CozmoBot builds nex-ON, the embodied OS. Our bet is that the
            constraint on industrial robotics is not the arm — it is the weeks
            of specialist programming between buying an arm and getting work out
            of it. We remove that step by letting people talk to the machine.
          </p>
        </div>
      </section>

      <section className="border-b border-hair bg-mist">
        <div className="shell band-sm">
          <div className="eyebrow">01 / how we work</div>
          <h2 className="h-sub mb-11 mt-4.5 max-w-[24ch]">
            Four commitments we hold ourselves to.
          </h2>
          <div className="grid-hair flex flex-wrap">
            {principles.map((principle) => (
              <div
                key={principle.n}
                className="min-h-[200px] flex-[1_1_250px] bg-paper px-6.5 pb-8.5 pt-7.5"
              >
                <div className="font-brand text-[10.5px] tracking-[0.09em] text-moss">
                  {principle.n}
                </div>
                <div className="mt-4 text-[20px] leading-[1.2]">
                  {principle.title}
                </div>
                <p className="copy-sm mt-3.5">{principle.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-hair">
        <div className="shell band-sm">
          <div className="eyebrow">02 / where we are going</div>
          <h2 className="h-sub mt-4.5 max-w-[24ch]">
            Software first. Editions next. Hardware after that.
          </h2>
          <div className="mt-11 border border-line">
            {roadmap.map((phase) => (
              <div
                key={phase.phase}
                className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-x-7 gap-y-2 border-b border-line-soft px-[clamp(20px,3vw,28px)] py-6.5 last:border-b-0"
              >
                <div>
                  <div className="tag">{phase.phase}</div>
                  <div className="mt-2.5 text-[21px] leading-[1.2]">
                    {phase.title}
                  </div>
                </div>
                <p className="self-center text-base leading-[1.5] text-muted text-pretty">
                  {phase.body}
                </p>
              </div>
            ))}
          </div>
          <p className="mt-5.5 max-w-[62ch] text-[15px] leading-[1.55] text-body text-pretty">
            We are explicit about the line between what runs today and what is
            architected but unshipped. Investors and customers both deserve to
            know which is which.
          </p>
        </div>
      </section>

      {/* <TeamSection eyebrow="03 / team" tinted /> */}

      <PilotCTA
        heading="Talk to us about a pilot."
        secondary={{ label: "Platform brief", href: "/platform" }}
      />
      <SiteFooter />
    </main>
  );
}
