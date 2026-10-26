import Image from "next/image";
import Link from "next/link";
import { StatBar } from "@/components/site/ui";
import orioPrototype from "@/assets/orio_prototype.webp";

const facts = [
  { k: "Body", v: "Wheeled, indoor" },
  { k: "You talk to it in", v: "English · Hindi · German" },
  { k: "Pre-order", v: "Nothing charged today" },
  { k: "Delivery", v: "From Q1 2028" },
];

// The parts of the prototype the banner points at. x/y are percentages of the
// cutout, so the markers stay on the part at any size. Each note says only
// what that part already does, or that it is still pending.
const parts = [
  {
    n: "01",
    title: "Stereo depth camera",
    note: "How it sees the room and finds what you named, to the millimetre.",
    x: 49,
    y: 5.5,
  },
  {
    n: "02",
    title: "Screen face",
    note: "Where Orio looks back at you while you talk to it.",
    x: 50,
    y: 17,
  },
  {
    n: "03",
    title: "Wheeled base",
    note: "How it gets around. Moving between rooms is pending approval.",
    x: 83,
    y: 86,
  },
];

export function OrioHero() {
  return (
    <section id="orio" className="border-b border-hair">
      <div className="shell pb-[clamp(56px,8vw,88px)] pt-[clamp(28px,4vw,48px)]">
        {/* One banner: the pitch on the left, the prototype on the right with
            markers on the parts that matter. The photo is of the prototype,
            so the banner says so rather than passing it off as the product. */}
        <div className="relative grid overflow-hidden border border-line bg-mist md:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] md:grid-rows-[auto_1fr]">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-[linear-gradient(var(--color-hair)_1px,transparent_1px),linear-gradient(90deg,var(--color-hair)_1px,transparent_1px)] bg-[size:48px_48px] opacity-60"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_75%_38%,rgba(173,208,55,0.38),rgba(173,208,55,0)_40%)] max-md:hidden"
          />

          <div className="relative p-[clamp(26px,4vw,52px)] pb-0 md:pb-0">
            <div className="eyebrow flex items-center gap-3">
              <span className="h-1.5 w-1.5 rounded-full bg-lime" />
              <span>Orio · Companion OS · pre-orders open</span>
            </div>

            <h1 className="h-display mt-7 max-w-[14ch] text-balance md:text-[clamp(42px,4.8vw,76px)]">
              The companion robot for your home.
            </h1>

            <p className="lede mt-6 max-w-[50ch]">
              Orio is the robot you just talk to. Ask for something by name and
              it finds it and answers out loud. Carrying things between rooms,
              keeping watch while you&rsquo;re out and calling for help are
              planned, pending approval.
            </p>

            <div className="mt-9 flex flex-wrap gap-3">
              <Link href="/contact?intent=preorder" className="btn-primary">
                Pre-order Orio
              </Link>
              <Link href="#what-it-does" className="btn-ghost">
                What it does
              </Link>
            </div>
          </div>

          <figure className="relative m-0 flex flex-col items-center justify-start px-6 pt-10 max-md:bg-[radial-gradient(circle_at_50%_55%,rgba(173,208,55,0.38),rgba(173,208,55,0)_55%)] md:row-span-2 md:pt-20">
            <figcaption className="tag absolute left-1/2 top-5 flex -translate-x-1/2 items-center gap-2.5 whitespace-nowrap text-moss md:top-7">
              <span className="h-[7px] w-[7px] rounded-full bg-lime" />
              <span>Working prototype · in our lab</span>
            </figcaption>
            {/* Sized off the viewport height on desktop, so the whole robot is on
                screen with the headline however tall the text column runs. */}
            <div className="relative mb-8 mt-4 aspect-[882/1489] w-[min(58%,250px)] md:h-[min(66vh,600px)] md:w-auto md:max-w-[90%]">
              {/* The floor it stands on, as a hairline rather than a shadow. */}
              <span
                aria-hidden
                className="absolute bottom-0 left-1/2 w-[200%] -translate-x-1/2 border-t border-line-firm"
              />
              <Image
                src={orioPrototype}
                alt="Orio's working prototype: a black two-wheeled robot with a screen face showing two yellow eyes, a depth camera above the screen, and light strips at its base"
                fill
                sizes="(max-width: 768px) 250px, 380px"
                quality={90}
                preload
                className="object-contain"
              />
              {parts.map((part) => (
                <span
                  key={part.n}
                  aria-hidden
                  style={{ left: `${part.x}%`, top: `${part.y}%` }}
                  className="absolute flex h-6 w-6 -translate-x-1/2 -translate-y-1/2 items-center justify-center border border-paper bg-lime font-brand text-[10px] text-ink"
                >
                  {part.n}
                </span>
              ))}
            </div>
          </figure>

          <div className="relative p-[clamp(26px,4vw,52px)] pt-10 md:pt-12">
            <p className="meta max-w-[52ch]">
              Pictured: the prototype we test on, running Companion OS. The body
              you get is still being built, and will look different.
            </p>
            <ol className="m-0 mt-4 list-none border-t border-line p-0">
              {parts.map((part) => (
                <li
                  key={part.n}
                  className="flex gap-4 border-b border-line py-3.5 last:border-b-0"
                >
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center bg-lime font-brand text-[10px] text-ink">
                    {part.n}
                  </span>
                  <div>
                    <div className="text-[16.5px] leading-[1.25]">
                      {part.title}
                    </div>
                    <p className="copy-sm mt-1">{part.note}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
        <StatBar items={facts} attached />
      </div>
    </section>
  );
}
