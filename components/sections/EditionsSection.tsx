import Image from "next/image";
import Link from "next/link";
import weldCell from "@/assets/omnicron_welding_images/17.jpeg";

const weldOsPoints = [
  "Seam finding from a depth-and-image profile scan",
  "Four weave patterns, specified the way welders specify them",
  "Dry-first arc interlocks that never persist across a restart",
];

const editions = [
  {
    name: "Companion OS",
    trade: "Humanoid robots · service and assistive",
    status: "In design",
    body: "The same orchestration on a humanoid body: everyday tasks alongside people — fetching, handing over and tidying — directed conversationally by whoever is in the room.",
  },
  {
    name: "MechFab OS",
    trade: "Mechanical fabrication",
    status: "In design",
    body: "Cutting, drilling, fitting and fastening across high-mix fabrication work — part identification, alignment and force-aware contact.",
  },
  {
    name: "Med OS",
    trade: "Clinical and lab settings",
    status: "In design",
    body: "Precise, auditable handling for clinical and laboratory environments, where every action is logged and nothing acts unprompted.",
  },
  {
    name: "Your trade",
    trade: "Tell us what you run",
    status: "Open",
    body: "Bring us the task your integrators quote in weeks. Editions start as a pilot on a robot you already own.",
  },
];

export function EditionsSection() {
  return (
    <section id="editions" className="border-b border-hair bg-mist">
      <div className="shell band-lg">
        <div className="eyebrow">01 / industry editions</div>
        <h2 className="h-major mt-6 max-w-[22ch] text-balance">
          One OS core. A purpose-built edition for every industry.
        </h2>
        <p className="lede mt-6 max-w-[66ch]">
          nex-ON is the horizontal layer. On top of it we build vertical
          editions — each carrying the vocabulary, tolerances, tooling and
          safety interlocks of a specific trade, so an operator in that trade
          can direct a robot in their own words. Every edition inherits the same
          brain, the same tool registry and the same safety model.
        </p>

        {/* The live edition gets the tinted panel; the rest are hairline cells
            below it, so what ships today is never mistaken for what's drawn. */}
        <div className="mt-13 flex flex-wrap border border-limeline bg-[linear-gradient(135deg,rgba(173,208,55,0.22),rgba(173,208,55,0))]">
          <div className="flex-[1_1_420px] p-[clamp(30px,4vw,48px)]">
            <div className="tag flex items-center gap-2.5 text-moss">
              <span className="h-[7px] w-[7px] rounded-full bg-lime" />
              <span>Edition 01 · live today · shipping as Omnicron</span>
            </div>
            <div className="mt-6 text-[clamp(38px,4.6vw,62px)] font-medium leading-none tracking-[-0.035em]">
              Weld OS
            </div>
            <div className="mt-2.5 font-brand text-[12px] uppercase tracking-[0.06em] text-muted">
              For the welding industry
            </div>
            <p className="mt-6 max-w-[46ch] text-[17.5px] leading-[1.55] text-deep text-pretty">
              We proved the platform on the hardest near-term task. Weld OS
              finds the bare-metal seam in front of it, measures the part,
              rehearses the pass with the arc off, and welds it when you arm it
              — directed by voice, with no teach pendant and no CAD program.
            </p>
            <ul className="mt-7 flex flex-col gap-3">
              {weldOsPoints.map((point) => (
                <li key={point} className="flex items-baseline gap-3">
                  <span className="font-brand text-[11px] text-moss">▸</span>
                  <span className="text-base leading-[1.4] text-deep">
                    {point}
                  </span>
                </li>
              ))}
            </ul>
            <Link href="/omnicron" className="btn-primary mt-9 px-6.5">
              Inside Weld OS
            </Link>
          </div>
          <div className="relative min-h-[340px] flex-[1_1_340px] border-l border-[rgba(140,170,40,0.3)]">
            <Image
              src={weldCell}
              alt="A collaborative arm running a weld pass in the CozmoBot cell, operator watching through a shield"
              fill
              sizes="(max-width: 900px) 100vw, 40vw"
              quality={90}
              className="object-cover object-center"
            />
          </div>
        </div>

        <div className="mt-14 flex flex-wrap items-baseline justify-between gap-4">
          <div className="font-brand text-[11px] uppercase tracking-[0.06em] text-olive">
            Next editions · in design
          </div>
          <div className="meta">
            the platform is built, the domain layer is what we add
          </div>
        </div>

        <div className="grid-hair mt-[18px] flex flex-wrap">
          {editions.map((edition) => (
            <div
              key={edition.name}
              className="flex min-h-[230px] flex-[1_1_250px] flex-col bg-paper px-6.5 pb-8 pt-7.5 transition-colors hover:bg-hatch"
            >
              <div className="tag flex items-center gap-2.5 text-olive">
                <span className="h-1.5 w-1.5 rounded-full border border-olive" />
                <span>{edition.status}</span>
              </div>
              <div className="mt-4.5 text-[26px] leading-[1.1] tracking-[-0.02em]">
                {edition.name}
              </div>
              <div className="meta mt-2 text-body">{edition.trade}</div>
              <p className="copy-sm mt-4">{edition.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
