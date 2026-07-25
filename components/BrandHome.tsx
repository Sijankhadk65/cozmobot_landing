"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import logo from "@/assets/site-logo-lockup.png";

// A persistent way home. The home page is a full-bleed 3D scene with its own
// brand HUD, so this only shows on the inner routes — mirroring the menu button
// in the opposite corner. Sits below the menu overlay (z-40) so opening the menu
// covers it cleanly.
export function BrandHome() {
  const pathname = usePathname();
  if (pathname === "/") return null;

  return (
    <Link
      href="/"
      aria-label="CozmoBot — home"
      className="fixed top-4 left-4 z-40 inline-flex items-center h-11 rounded-full border border-steel/60 bg-carbon/85 px-4 backdrop-blur-md hover:border-accent/70 transition-colors"
    >
      <Image src={logo} alt="CozmoBot" sizes="120px" className="h-4 w-auto" priority />
    </Link>
  );
}
