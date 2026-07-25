"use client";

import { usePathname } from "next/navigation";
import { Footer } from "./Footer";

// The home page is a full-bleed 3D scroll experience that ends on the contact
// CTA — no footer there. Every other route (platform, products, anything added
// later) gets the shared footer automatically.
export function ConditionalFooter() {
  const pathname = usePathname();
  if (pathname === "/") return null;
  return <Footer />;
}
