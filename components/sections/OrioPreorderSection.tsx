import Link from "next/link";

// No price on purpose: it isn't set yet, and a pre-order commits nobody to
// anything, so the terms are the whole offer.
const terms = [
  { k: "Charged at pre-order", v: "nothing" },
  { k: "Price", v: "not yet announced" },
  { k: "Delivery", v: "from Q1 2028" },
  { k: "Cancel before delivery", v: "any time" },
];

export function OrioPreorderSection() {
  return (
    <section id="reserve" className="border-b border-hair bg-mist">
      <div className="shell band">
        <div className="eyebrow">05 / pre-order</div>
        <h2 className="h-section mt-5 max-w-[22ch] text-balance">
          Hold your place now. Decide when it&rsquo;s real.
        </h2>

        <div className="mt-12 flex flex-wrap border border-limeline bg-[linear-gradient(135deg,rgba(173,208,55,0.22),rgba(173,208,55,0))]">
          <div className="flex-[1_1_420px] p-[clamp(30px,4vw,48px)]">
            <div className="tag flex items-center gap-2.5 text-moss">
              <span className="h-[7px] w-[7px] rounded-full bg-lime" />
              <span>Pre-orders open</span>
            </div>
            <div className="mt-6 text-[clamp(38px,4.6vw,62px)] font-medium leading-none tracking-[-0.035em]">
              Reserve an Orio
            </div>
            <p className="mt-6 max-w-[46ch] text-[17.5px] leading-[1.55] text-deep text-pretty">
              A pre-order puts your name in the queue. Nothing is charged today:
              no deposit and no card. We&rsquo;ll tell you the price before
              anything is due, and you can step back at any point before
              delivery by replying to us.
            </p>
            <Link
              href="/contact?intent=preorder"
              className="btn-primary mt-9 px-6.5"
            >
              Pre-order Orio
            </Link>
          </div>

          <div className="flex-[1_1_320px] border-l border-[rgba(140,170,40,0.3)]">
            {terms.map((row) => (
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
      </div>
    </section>
  );
}
