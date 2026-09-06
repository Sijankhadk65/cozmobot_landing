"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Logo } from "./Logo";

const nav = [
  { label: "Editions", href: "/#editions" },
  { label: "Weld OS", href: "/omnicron" },
  { label: "Platform", href: "/platform" },
  { label: "Company", href: "/company" },
  { label: "Contact", href: "/contact" },
];

// A hash link only counts as the current page when we're already on the page
// it points into — otherwise "Editions" would light up on every route.
function isCurrent(href: string, pathname: string) {
  const [path] = href.split("#");
  const base = path === "" ? "/" : path;
  return base === "/" ? pathname === "/" : pathname.startsWith(base);
}

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [routeWhenOpened, setRouteWhenOpened] = useState(pathname);

  // The panel is a route-level overlay, so navigating closes it. Adjusting the
  // state during render rather than in an effect keeps it from painting the
  // new page with the old panel still over it.
  if (routeWhenOpened !== pathname) {
    setRouteWhenOpened(pathname);
    setOpen(false);
  }

  // While it is up, Escape closes it and the page behind it stops scrolling.

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKeyDown);
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previous;
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-50 border-b border-hair bg-paper/88 backdrop-blur-[14px]">
      <div className="flex min-h-16 items-center justify-between gap-6 px-[clamp(20px,3vw,32px)] py-3">
        <Logo />

        <nav className="hidden items-center gap-x-[18px] gap-y-2.5 font-brand text-[10.5px] uppercase tracking-[0.07em] text-body lg:flex">
          {nav.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              aria-current={isCurrent(link.href, pathname) ? "page" : undefined}
              className={
                isCurrent(link.href, pathname)
                  ? "text-moss"
                  : "transition-colors hover:text-moss"
              }
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <Link href="/contact" className="btn-outline hidden lg:inline-flex">
          Request pilot access
        </Link>

        {/* Below lg the five nav items plus the CTA can't share a row without
            wrapping into a stack, so they move behind a panel instead. */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="site-menu"
          className="relative z-10 -mr-2 flex h-11 w-11 items-center justify-center text-ink lg:hidden"
        >
          <span aria-hidden className="relative block h-[13px] w-[19px]">
            <span
              className={`absolute left-0 block h-px w-full bg-current transition-transform duration-300 ${
                open ? "top-1.5 rotate-45" : "top-0"
              }`}
            />
            <span
              className={`absolute left-0 top-1.5 block h-px w-full bg-current transition-opacity duration-200 ${
                open ? "opacity-0" : "opacity-100"
              }`}
            />
            <span
              className={`absolute left-0 block h-px w-full bg-current transition-transform duration-300 ${
                open ? "top-1.5 -rotate-45" : "top-3"
              }`}
            />
          </span>
        </button>
      </div>

      {open && (
        <div
          id="site-menu"
          className="fixed inset-x-0 bottom-0 top-16 z-40 overflow-y-auto border-t border-hair bg-paper lg:hidden"
        >
          <nav className="flex flex-col border-b border-line-soft">
            {nav.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                aria-current={isCurrent(link.href, pathname) ? "page" : undefined}
                className={`border-b border-line-soft px-[clamp(20px,3vw,32px)] py-5 font-brand text-[13px] uppercase tracking-[0.07em] ${
                  isCurrent(link.href, pathname) ? "text-moss" : "text-ink"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="px-[clamp(20px,3vw,32px)] py-8">
            <Link href="/contact" className="btn-primary w-full">
              Request pilot access
            </Link>
            <a
              href="mailto:business@cozmobot.com"
              className="meta mt-6 block text-center"
            >
              business@cozmobot.com
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
