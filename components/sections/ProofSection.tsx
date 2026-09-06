import Image from "next/image";
import Link from "next/link";
import armMidPass from "@/assets/omnicron_welding_images/20.jpeg";
import seamDetail from "@/assets/omnicron_welding_images/12.jpeg";
import beadDetail from "@/assets/omnicron_welding_images/3.jpeg";

const proofPoints = [
  { k: "Seam-finding", v: "depth + image profile scan" },
  { k: "Dry-first", v: "identical motion, nothing energised" },
  { k: "4 weaves", v: "triangle · sine · circular · vertical" },
];

export function ProofSection() {
  return (
    <section id="omnicron" className="border-b border-hair bg-mist">
      <div className="shell band">
        <div className="eyebrow">06 / the proof point</div>

        <div className="mt-5 grid grid-cols-[repeat(auto-fit,minmax(360px,1fr))] items-center gap-14">
          <div>
            <h2 className="h-section">
              We proved the platform on the hardest near-term task: autonomous
              welding.
            </h2>
            <p className="copy mt-6">
              Welding demands everything at once — sub-millimetre perception,
              safe real-world actuation, and non-expert operability. Omnicron is
              Weld OS — nex-ON driving a collaborative arm: it finds the
              bare-metal seam inside an operator-drawn area, maps both endpoints
              into robot coordinates, and runs the stroke at a constant
              standoff. Weave patterns are specified the way welders specify
              them.
            </p>

            <div className="mt-9 grid grid-cols-[repeat(auto-fit,minmax(265px,1fr))] gap-6 border-t border-line pt-7">
              {proofPoints.map((point) => (
                <div key={point.k}>
                  <div className="text-[22px]">{point.k}</div>
                  <div className="meta mt-1.5 text-body">{point.v}</div>
                </div>
              ))}
            </div>

            <Link href="/omnicron" className="btn-ghost mt-9">
              See Omnicron
            </Link>
          </div>

          <div className="flex flex-col gap-3">
            <div className="relative aspect-[4/3] border border-line">
              <Image
                src={armMidPass}
                alt="The arc struck mid-pass over a clamped steel section on the welding table"
                fill
                sizes="(max-width: 900px) 100vw, 45vw"
                quality={90}
                className="object-cover"
              />
            </div>
            <div className="grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-3">
              <div className="relative aspect-[3/2] border border-line">
                <Image
                  src={seamDetail}
                  alt="A finished bead running the length of a box-section joint"
                  fill
                  sizes="(max-width: 900px) 50vw, 22vw"
                  className="object-cover"
                />
              </div>
              <div className="relative aspect-[3/2] border border-line">
                <Image
                  src={beadDetail}
                  alt="Close detail of the weld bead laid along a bare-metal seam"
                  fill
                  sizes="(max-width: 900px) 50vw, 22vw"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
