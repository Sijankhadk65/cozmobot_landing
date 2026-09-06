import Link from "next/link";

// A slot the design leaves open — team portraits, the diagnostics screenshot.
// Hatched rather than blank so it reads as "nothing here yet" rather than as a
// broken image, and captioned with what belongs in it.
export function Hatch({
  ratio,
  label,
  note,
  align = "center",
  className = "",
}: {
  ratio: string;
  label: string;
  note?: string;
  align?: "center" | "end";
  className?: string;
}) {
  return (
    <div
      style={{ aspectRatio: ratio }}
      className={`hatch flex border border-line p-4 ${
        align === "center"
          ? "items-center justify-center text-center"
          : "items-end"
      } ${className}`}
    >
      <div>
        <div className="font-brand text-[10.5px] uppercase tracking-[0.08em] text-body">
          {label}
        </div>
        {note && (
          <div className="mt-2 font-brand text-[11px] text-sage">{note}</div>
        )}
      </div>
    </div>
  );
}

// The strip of headline facts that hangs off the bottom of a hero image.
// `attached` drops its top border so it butts against the frame above.
export function StatBar({
  items,
  attached = false,
}: {
  items: { k: string; v: string }[];
  attached?: boolean;
}) {
  return (
    <div
      className={`flex flex-wrap border border-line ${attached ? "border-t-0" : ""}`}
    >
      {items.map((item, i) => (
        <div
          key={item.k}
          className={`flex-[1_1_200px] px-6 py-[22px] ${
            i < items.length - 1 ? "border-r border-line" : ""
          }`}
        >
          <div className="label">{item.k}</div>
          <div className="mt-2 text-base">{item.v}</div>
        </div>
      ))}
    </div>
  );
}

// The closing panel every page ends on. Lime wash inside a lime hairline —
// the only place on the site where a surface is tinted rather than ruled.
export function PilotCTA({
  eyebrow,
  heading,
  copy,
  secondary,
  id = "pilot",
}: {
  eyebrow?: string;
  heading: string;
  copy?: string;
  secondary: { label: string; href: string };
  id?: string;
}) {
  return (
    <section id={id}>
      <div className="shell band-lg">
        <div className="border border-limeline bg-[linear-gradient(180deg,rgba(173,208,55,0.18),rgba(173,208,55,0))] px-[clamp(22px,4vw,48px)] py-[clamp(40px,6vw,72px)] text-center">
          {eyebrow && <div className="eyebrow">{eyebrow}</div>}
          <h2 className={`h-cta mx-auto max-w-[22ch] ${eyebrow ? "mt-6" : ""}`}>
            {heading}
          </h2>
          {copy && (
            <p className="copy mx-auto mt-6 max-w-[54ch]">{copy}</p>
          )}
          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <Link href="/contact" className="btn-primary px-7 py-[15px]">
              Request pilot access
            </Link>
            <Link href={secondary.href} className="btn-ghost px-7 py-[15px]">
              {secondary.label}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
