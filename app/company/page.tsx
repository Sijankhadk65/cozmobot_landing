import type { Metadata } from "next";
// Held back until we have real names and portraits. Re-enable this import
// and the <TeamSection /> below to bring it back.
// import { TeamSection } from "@/components/sections/TeamSection";
import { PilotCTA } from "@/components/site/ui";
import { SiteFooter } from "@/components/site/SiteFooter";

export const metadata: Metadata = {
  title: "Company",
  description:
    "CozmoBot makes Orio, the companion robot for your home, and nex-ON, the embodied OS it runs on. Our bet is that people shouldn't have to program a robot to get help from it: they should be able to just talk to it.",
  openGraph: {
    title: "Company · CozmoBot",
    description:
      "The company building Orio. How we work, where we are going, and who is building it.",
    type: "website",
    siteName: "CozmoBot",
  },
};

const principles = [
  {
    n: "01",
    title: "Talk, don't program",
    body: "No app to learn and no commands to memorise. If you can say what you want, you can ask Orio for it.",
  },
  {
    n: "02",
    title: "Interpretable over impressive",
    body: "Orio works through discrete, inspectable steps instead of an opaque policy. If you ask why it did something, there is an answer we can show you.",
  },
  {
    n: "03",
    title: "Approval before features",
    body: "Anything that sends Orio from one room to another or calls out on your behalf waits for approval before it ships. Until then, it is marked as pending.",
  },
  {
    n: "04",
    title: "Honest about maturity",
    body: "We separate what runs today, what is still being built and what is pending approval, on the site and in every conversation with you.",
  },
];

// Keyed by title, not phase: two things are happening "Now".
const roadmap = [
  {
    phase: "Now",
    title: "Building Orio",
    body: "The software underneath Orio already runs in our lab today. The wheeled body is in development, and which kinds of items it can carry is still being defined.",
  },
  {
    phase: "Now",
    title: "nex-ON pilots for business",
    body: "The same platform deployed on robots businesses already own, running their own tasks.",
  },
  {
    phase: "Pending approval",
    title: "Moving, watching, calling",
    body: "Carrying things between rooms, remote driving and the watch mode, and alerts to the contacts you choose are planned. Each ships once it is approved.",
  },
  {
    phase: "From Q1 2028",
    title: "Orio in your home",
    body: "Deliveries begin. Pre-orders are open now; nothing is charged at pre-order, and you can cancel any time before delivery.",
  },
  {
    phase: "Then",
    title: "More bodies, more editions",
    body: "Humanoids and AMRs behind the same motion abstraction, and MechFab and Med editions on the shared core, each starting as a pilot.",
  },
];

export default function CompanyPage() {
  return (
    <main>
      <section className="border-b border-hair">
        <div className="shell band">
          <div className="eyebrow">Company</div>
          <h1 className="mt-6 max-w-[20ch] text-[clamp(36px,5.2vw,82px)] font-medium leading-[0.99] tracking-[-0.035em]">
            Robots you can just talk to.
          </h1>
          <p className="lede mt-6 max-w-[60ch]">
            CozmoBot makes Orio, the companion robot for your home, and nex-ON,
            the embodied OS it runs on. Our bet is that the hard part of a
            robot was never the machine: it was the programming between owning
            one and getting any help out of it. We remove that step by letting
            people talk to it.
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
            Building Orio, on software that already runs.
          </h2>
          <div className="mt-11 border border-line">
            {roadmap.map((phase) => (
              <div
                key={phase.title}
                className="grid grid-cols-[repeat(auto-fit,minmax(min(280px,100%),1fr))] gap-x-7 gap-y-2 border-b border-line-soft px-[clamp(20px,3vw,28px)] py-6.5 last:border-b-0"
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
            We are explicit about the line between what runs today, what is
            still being built and what is pending approval. Anyone putting
            their name on an Orio deserves to know which is which.
          </p>
        </div>
      </section>

      {/* <TeamSection eyebrow="03 / team" tinted /> */}

      <PilotCTA
        heading="Put your name on an Orio."
        copy="Or, if you run robots at work, ask us about a nex-ON pilot."
        secondary={{ label: "Pilot programme", href: "/contact?intent=pilot" }}
      />
      <SiteFooter />
    </main>
  );
}
