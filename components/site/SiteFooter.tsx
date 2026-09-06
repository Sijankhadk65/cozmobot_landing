import Link from "next/link";
import { CozmobotMark } from "./Logo";

// Both footer variants print the same contact details, so they live here once.
const EMAIL = "business@cozmobot.com";
const PHONE = { label: "+49 176 8909 0940", href: "tel:+4917689090940" };
const ADDRESS = ["Goebenstrasse 31", "65195 Wiesbaden"];

const columns = [
  {
    heading: "Product",
    links: [
      { label: "Platform", href: "/platform" },
      { label: "Weld OS", href: "/omnicron" },
      { label: "Editions", href: "/#editions" },
      { label: "Capabilities", href: "/#capabilities" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "Company", href: "/company" },
      { label: "Positioning", href: "/#position" },
      { label: "Maturity", href: "/#maturity" },
      { label: "FAQ", href: "/#faq" },
    ],
  },
  {
    heading: "Contact",
    links: [
      { label: EMAIL, href: `mailto:${EMAIL}` },
      { label: PHONE.label, href: PHONE.href },
      { label: "Request pilot access", href: "/contact" },
    ],
    // Printed under the links rather than as a fourth link — it's where we
    // are, not somewhere to click.
    address: ADDRESS,
  },
];

const STANCE = "Software today · hardware on the roadmap";

// The home page closes on the full sitemap; the inner routes get the one-line
// rule so the CTA above them stays the last thing with any weight.
export function SiteFooter({
  variant = "compact",
}: {
  variant?: "full" | "compact";
}) {
  if (variant === "compact") {
    return (
      <footer className="border-t border-hair">
        <div className="shell flex flex-wrap items-center justify-between gap-x-6 gap-y-4 py-11 font-brand text-[10.5px] uppercase tracking-[0.06em] text-sage">
          <Link href="/" className="flex items-center gap-2.5 text-brandmark">
            <CozmobotMark className="block w-auto shrink-0" height={24} />
            <span className="font-brand text-[14.5px] font-semibold normal-case tracking-[0.05em] text-ink">
              COZMOBOT
            </span>
          </Link>
          <span>{STANCE}</span>
          {/* Address, phone and mail ride the rule as one group, dot-separated,
              so the row still reads as a single line and wraps as a block. */}
          <div className="flex flex-wrap items-center gap-x-3.5 gap-y-2">
            <address className="not-italic">{ADDRESS.join(", ")}</address>
            <span aria-hidden className="text-line-firm">
              ·
            </span>
            <a href={PHONE.href} className="transition-colors hover:text-moss">
              {PHONE.label}
            </a>
            <span aria-hidden className="text-line-firm">
              ·
            </span>
            <a
              href={`mailto:${EMAIL}`}
              className="transition-colors hover:text-moss"
            >
              {EMAIL}
            </a>
          </div>
        </div>
      </footer>
    );
  }

  return (
    <footer className="border-t border-hair">
      <div className="shell grid grid-cols-[repeat(auto-fit,minmax(210px,1fr))] gap-10 py-14">
        <div>
          <Link href="/" className="flex items-center gap-2.5 text-brandmark">
            <CozmobotMark className="block w-auto shrink-0" height={26} />
            <span className="font-brand text-[15px] font-semibold tracking-[0.05em] text-ink">
              COZMOBOT
            </span>
          </Link>
          <p className="mt-3 max-w-[30ch] text-[14.5px] leading-[1.5] text-body">
            nex-ON — the embodied OS. Any robot, any task, directed in plain
            language.
          </p>
        </div>

        {columns.map((column) => (
          <div
            key={column.heading}
            className="flex flex-col gap-3 text-[14.5px] text-body"
          >
            <div className="label text-sage">{column.heading}</div>
            {column.links.map((link) =>
              link.href.startsWith("mailto:") || link.href.startsWith("tel:") ? (
                <a
                  key={link.label}
                  href={link.href}
                  className="transition-colors hover:text-moss"
                >
                  {link.label}
                </a>
              ) : (
                <Link
                  key={link.label}
                  href={link.href}
                  className="transition-colors hover:text-moss"
                >
                  {link.label}
                </Link>
              ),
            )}
            {column.address && (
              <address className="mt-1 not-italic leading-[1.5] text-body">
                {column.address.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </address>
            )}
          </div>
        ))}
      </div>

      <div className="shell flex flex-wrap justify-between gap-3 pb-10 font-brand text-[10.5px] uppercase tracking-[0.06em] text-sage">
        <span>© 2026 CozmoBot</span>
        <span>{STANCE}</span>
      </div>
    </footer>
  );
}
