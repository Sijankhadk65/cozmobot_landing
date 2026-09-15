import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PilotCTA, StatBar } from "@/components/site/ui";
import { SiteFooter } from "@/components/site/SiteFooter";
import orioHero from "@/assets/orio_hero_A.png";

export const metadata: Metadata = {
  title: "Companion OS",
  description:
    "Companion OS is the nex-ON edition for everyday life, and Orio is the robot it runs on: a wheeled companion that carries things to you, fetches what you ask for, watches the place when you're out and calls for help if something is wrong. Pre-orders open now, delivery from Q1 2028.",
  openGraph: {
    title: "Companion OS · meet Orio",
    description:
      "A wheeled robot that moves things for you, goes places for you, stands watch and calls for help. First 100 pre-orders at €450 a month, shipping Q1 2028.",
    type: "website",
    siteName: "CozmoBot",
  },
};

const facts = [
  { k: "Body", v: "Wheeled, indoor" },
  { k: "Direction", v: "Plain language" },
  { k: "Pre-order", v: "€450 / month" },
  { k: "Delivery", v: "From Q1 2028" },
];

// The asks people actually put to a companion robot, in the order they come
// up: how you ask at all, the two that move things, the two that stand in for
// you, and the one that matters at three in the morning.
const jobs = [
  {
    n: "01",
    title: "Ask in plain words",
    body: "No app to learn and no command list to memorise. The same voice orchestration that runs our welding cell, pointed at errands instead.",
  },
  {
    n: "02",
    title: "Move things",
    body: "Laundry to the machine, stock to the bench, a crate from one room to the next. You say where it goes; Orio takes it and comes back.",
  },
  {
    n: "03",
    title: "Bring things to you",
    body: "Ask for the thing rather than the shelf it lives on. Open-vocabulary vision means it finds objects nobody trained it on.",
  },
  {
    n: "04",
    title: "Go places for you",
    body: "Send it to the door, the workshop or the far end of the yard. It maps the route once and keeps it.",
  },
  {
    n: "05",
    title: "Stand watch",
    body: "Take the wheel from anywhere and drive it through the building: a patrol you steer yourself rather than a camera fixed to a wall.",
  },
  {
    n: "06",
    title: "Call for help",
    body: "One spoken word, or a fall it sees by itself, and Orio raises an SOS with your contacts and where in the building it happened.",
  },
];

const teleop = [
  { k: "Drive from", v: "phone or browser" },
  { k: "Live view", v: "camera and audio" },
  { k: "Speak through it", v: "two-way" },
  { k: "Hand back to autonomy", v: "any time" },
];

// The honest column. The orchestration is real and running; the body is not
// built yet, and the page says so rather than letting the render imply it.
const built = [
  "Voice orchestration, in and out, three languages",
  "Open-vocabulary vision with no per-class training",
  "Millimetre measurement from fused depth",
  "The tool registry our own frontier model composes capabilities from",
];

const toCome = [
  "The wheeled body itself, in development",
  "Indoor mapping and route memory",
  "Teleoperation and the watch mode",
  "SOS escalation to your own contacts",
];

const priceRows = [
  { k: "First 100 orders", v: "€450 / month" },
  { k: "Orders after that", v: "not yet announced" },
  { k: "Charged at pre-order", v: "nothing" },
  { k: "Delivery", v: "from Q1 2028" },
  { k: "Cancel before delivery", v: "any time" },
];

export default function CompanionPage() {
  return (
    <main>
      <section className="border-b border-hair">
        <div className="shell pt-[clamp(56px,8vw,88px)]">
          <div className="eyebrow flex items-center gap-3">
            <span className="h-1.5 w-1.5 rounded-full bg-lime" />
            <span>Companion OS · edition 02 · pre-orders open</span>
          </div>
          <h1 className="h-page mt-6 max-w-[16ch]">
            A robot that goes and gets it.
          </h1>
          <p className="lede mt-6 max-w-[58ch]">
            Companion OS is nex-ON for everyday life, and Orio is the robot it
            runs on. A wheeled body that carries things where you point it,
            fetches what you ask for by name, stands watch when you are out and
            calls for help when something is wrong, directed the same way
            everything on this platform is directed: by talking to it.
          </p>

          <div className="mt-14 flex flex-wrap gap-3">
            <Link
              href="/contact?intent=preorder"
              className="btn-primary px-7 py-[15px]"
            >
              Pre-order Orio
            </Link>
            <Link href="#orio" className="btn-ghost px-7 py-[15px]">
              What it costs
            </Link>
          </div>

          <figure className="m-0">
            <div className="relative mt-11 aspect-[16/9] border border-line">
              <Image
                src={orioHero}
                alt="Orio, a compact white two-wheeled robot with a screen face, two gripper arms and a rear castor, standing in a bright room beside a shelf of containers"
                fill
                sizes="100vw"
                quality={90}
                preload
                className="object-cover"
              />
            </div>
            {/* Every photograph elsewhere on this site was shot on our own
                floor. This one can't be (the body isn't built) so it is
                labelled rather than passed off. */}
            <figcaption className="meta border border-t-0 border-line px-5.5 py-3.5">
              Design render: Orio is in development, not yet a photograph.
            </figcaption>
          </figure>
          <StatBar items={facts} attached />

          <div className="h-22" />
        </div>
      </section>

      <section className="border-b border-hair bg-mist">
        <div className="shell band-sm">
          <div className="eyebrow">01 / what you ask it to do</div>
          <h2 className="h-sub mb-11 mt-4.5 max-w-[24ch]">
            Errands, in the words you&rsquo;d use for a person.
          </h2>
          <div className="grid-hair grid grid-cols-[repeat(auto-fit,minmax(265px,1fr))]">
            {jobs.map((job) => (
              <div
                key={job.n}
                className="min-h-[170px] bg-paper px-6.5 pb-8.5 pt-7.5"
              >
                <div className="font-brand text-[10.5px] tracking-[0.09em] text-moss">
                  {job.n}
                </div>
                <div className="mt-3.5 text-[19px] leading-[1.25]">
                  {job.title}
                </div>
                <p className="copy-sm mt-3">{job.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-hair">
        <div className="shell band-sm grid grid-cols-[repeat(auto-fit,minmax(min(360px,100%),1fr))] items-start gap-14">
          <div>
            <div className="eyebrow">02 / take the wheel</div>
            <h2 className="h-sub mt-4.5">
              A guard you can drive from anywhere.
            </h2>
            <p className="mt-5 text-[17.5px] leading-[1.55] text-body text-pretty">
              A fixed camera shows you one corner of one room. Orio goes and
              looks. Take manual control from your phone, walk it through the
              building, speak through it, then hand it back to autonomy when
              you&rsquo;re satisfied.
            </p>
            <div className="mt-8 border border-line">
              {teleop.map((row) => (
                <div
                  key={row.k}
                  className="flex items-center justify-between border-b border-hair px-5.5 py-5 last:border-b-0"
                >
                  <span className="text-[16.5px]">{row.k}</span>
                  <span className="font-brand text-[12px] text-muted">
                    {row.v}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <div className="eyebrow">03 / when something goes wrong</div>
            <h2 className="h-sub mt-4.5">It calls someone.</h2>
            <p className="mt-5 text-[17.5px] leading-[1.55] text-body text-pretty">
              Say the word and Orio raises an SOS to the contacts you nominate,
              with the room it happened in and a live view they can open. It can
              also raise one unprompted: a fall it sees, a person who
              doesn&rsquo;t get up.
            </p>
            <p className="mt-5 text-[17.5px] leading-[1.55] text-body text-pretty">
              This is the part of a companion robot that has to work when nobody
              is watching, so it is the part we will hold longest before calling
              it done.
            </p>
            <div className="mt-8 border border-limeline bg-[rgba(173,208,55,0.1)] px-5.5 py-5">
              <div className="tag text-moss">Not a medical device</div>
              <p className="copy-sm mt-2.5">
                Orio escalates to the people you choose. It is not a monitored
                alarm service and does not replace one.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="orio" className="border-b border-hair bg-mist">
        <div className="shell band-sm">
          <div className="eyebrow">04 / pre-order</div>
          <h2 className="h-sub mt-4.5 max-w-[22ch]">
            The first hundred set the price.
          </h2>

          <div className="mt-11 flex flex-wrap border border-limeline bg-[linear-gradient(135deg,rgba(173,208,55,0.22),rgba(173,208,55,0))]">
            <div className="flex-[1_1_420px] p-[clamp(30px,4vw,48px)]">
              <div className="tag flex items-center gap-2.5 text-moss">
                <span className="h-[7px] w-[7px] rounded-full bg-lime" />
                <span>Founding hundred · open now</span>
              </div>
              <div className="mt-6 flex items-baseline gap-3">
                <span className="text-[clamp(38px,4.6vw,62px)] font-medium leading-none tracking-[-0.035em]">
                  &euro;450
                </span>
                <span className="font-brand text-[13px] uppercase tracking-[0.06em] text-muted">
                  / month
                </span>
              </div>
              <div className="mt-2.5 font-brand text-[12px] uppercase tracking-[0.06em] text-muted">
                For the first 100 orders
              </div>
              <p className="mt-6 max-w-[46ch] text-[17.5px] leading-[1.55] text-deep text-pretty">
                Pre-ordering holds a build slot and fixes your rate at the
                founding-hundred price. Nothing is charged today (no deposit,
                no card) and you can stand down at any point before delivery by
                replying to us.
              </p>
              <Link
                href="/contact?intent=preorder"
                className="btn-primary mt-9 px-6.5"
              >
                Pre-order Orio
              </Link>
            </div>

            <div className="flex-[1_1_320px] border-l border-[rgba(140,170,40,0.3)]">
              {priceRows.map((row) => (
                <div
                  key={row.k}
                  className="flex items-center justify-between gap-4 border-b border-[rgba(140,170,40,0.3)] px-[clamp(22px,3vw,32px)] py-[19px] last:border-b-0"
                >
                  <span className="text-[16.5px] text-deep">{row.k}</span>
                  <span className="text-right font-brand text-[12px] text-moss">
                    {row.v}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <p className="meta mt-5">
            Pricing beyond the first hundred is genuinely undecided, so we
            won&rsquo;t quote a number we might not hold.
          </p>
        </div>
      </section>

      <section className="border-b border-hair">
        <div className="shell band-sm">
          <div className="eyebrow">05 / built vs. being built</div>
          <h2 className="h-sub mt-4.5 max-w-[26ch]">
            What Orio inherits, and what we still owe you.
          </h2>
          <p className="lede mt-6 max-w-[62ch]">
            Companion OS is a new body on a platform that already runs. The
            orchestration below it (hearing you, finding the thing, planning
            the motion) is the same code welding steel on a cobot in our cell
            today. The wheeled body is not built yet, and the date on this page
            is a target, not a promise we have already kept.
          </p>

          <div className="grid-hair mt-12 grid grid-cols-[repeat(auto-fit,minmax(285px,1fr))]">
            <div className="bg-mist px-7.5 py-8.5">
              <div className="flex items-center gap-2.5">
                <span className="h-1.5 w-1.5 rounded-full bg-lime" />
                <span className="font-brand text-[11px] uppercase tracking-[0.09em] text-moss">
                  Running today, on other bodies
                </span>
              </div>
              <ul className="mt-5 flex flex-col gap-3 text-base leading-[1.45] text-deep">
                {built.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>

            <div className="bg-mist px-7.5 py-8.5">
              <div className="flex items-center gap-2.5">
                <span className="h-1.5 w-1.5 rounded-full border border-olive" />
                <span className="font-brand text-[11px] uppercase tracking-[0.09em] text-olive">
                  In development for Q1 2028
                </span>
              </div>
              <ul className="mt-5 flex flex-col gap-3 text-base leading-[1.45] text-muted">
                {toCome.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <p className="mt-5.5 text-[14.5px] leading-[1.5] text-body text-pretty">
                We would rather you pre-order knowing this than find it out
                later.
              </p>
            </div>
          </div>
        </div>
      </section>

      <PilotCTA
        eyebrow="Founding hundred · €450 a month"
        heading="Put your name on the first hundred."
        copy="Pre-orders are open for delivery from Q1 2028. Nothing is charged today, and the founding-hundred rate is held for the life of your subscription."
        primary={{ label: "Pre-order Orio", href: "/contact?intent=preorder" }}
        secondary={{ label: "How the platform works", href: "/platform" }}
        id="preorder"
      />
      <SiteFooter />
    </main>
  );
}
