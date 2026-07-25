import Image from "next/image";
import Link from "next/link";
import logo from "@/assets/site-logo-lockup.png";

// Section links resolve against the home page (`/#…`); the products have their
// own routes.
const columns = [
  {
    heading: "nex-ON",
    links: [
      { label: "Platform", href: "/platform" },
      { label: "How it works", href: "/platform#how" },
      { label: "Capabilities", href: "/platform#capabilities" },
      { label: "Any Robot, Any Task", href: "/platform#any-robot" },
    ],
  },
  {
    heading: "Applications",
    links: [
      { label: "Omnicron — welding cobot", href: "/omnicron" },
      { label: "Orio — public assistant", href: "/orio" },
      { label: "Deployment", href: "/platform#operations" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "Book a Demo", href: "/platform#cta" },
      { label: "Partner With Us", href: "/platform#cta" },
      { label: "Contact", href: "mailto:info@cozmobot.com" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="bg-carbon border-t border-steel/60">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          <div className="md:col-span-2">
            <Link href="/" aria-label="CozmoBot — home" className="inline-block mb-4">
              <Image
                src={logo}
                alt="CozmoBot"
                sizes="150px"
                className="h-7 w-auto"
              />
            </Link>
            <p className="text-sm text-mute leading-relaxed max-w-xs">
              We build <span className="font-medium text-offwhite">nex-ON</span>,
              the robot-agnostic AI deployment platform — and{" "}
              <span className="font-medium text-offwhite">Omnicron</span>, the
              autonomous welding cobot it runs on today.
            </p>
          </div>

          {columns.map((col) => (
            <div key={col.heading}>
              <p className="text-xs font-semibold tracking-widest uppercase text-mute mb-4">
                {col.heading}
              </p>
              <ul className="space-y-2 text-sm text-mute">
                {col.links.map((link) => (
                  <li key={link.label}>
                    {link.href.startsWith("mailto:") ? (
                      <a
                        href={link.href}
                        className="hover:text-accent transition-colors"
                      >
                        {link.label}
                      </a>
                    ) : (
                      <Link
                        href={link.href}
                        className="hover:text-accent transition-colors"
                      >
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-steel/60 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-mute">
            © 2026 CozmoBot. All rights reserved.
          </p>
          <p className="text-xs text-mute">
            Deploy any robot to do anything — just by talking to it.
          </p>
        </div>
      </div>
    </footer>
  );
}
