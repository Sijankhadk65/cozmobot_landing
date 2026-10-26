import type { Metadata } from "next";
import { JetBrains_Mono, Orbitron } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { SiteHeader } from "@/components/site/SiteHeader";

// Satoshi sets everything readable. Orbitron is a display face, reserved for
// uppercase micro-labels, nav and buttons: never body copy, never a full
// headline. JetBrains Mono appears only inside the session transcript.
const satoshi = localFont({
  src: "./fonts/Satoshi-Variable.woff2",
  variable: "--font-satoshi",
  weight: "300 900",
  display: "swap",
});

const orbitron = Orbitron({
  variable: "--font-orbitron",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://cozmobot.com"),
  title: {
    default: "CozmoBot · Orio, the companion robot for your home",
    // Child pages set a short title; this appends the brand.
    template: "%s · CozmoBot",
  },
  description:
    "Orio is the companion robot for your home. You just talk to it, and it finds things by name. Pre-orders open, delivery from Q1 2028, nothing charged today.",
  keywords: [
    "companion robot",
    "home robot",
    "Orio",
    "embodied OS",
    "robot-agnostic software",
    "embodied AI",
    "natural language robotics",
    "home assistant robot",
    "open-vocabulary vision",
  ],
  openGraph: {
    title: "CozmoBot · Orio, the companion robot for your home",
    description:
      "A companion robot you just talk to. Pre-orders open, delivery from Q1 2028, nothing charged today.",
    type: "website",
    siteName: "CozmoBot",
  },
  twitter: {
    card: "summary_large_image",
    title: "CozmoBot · Orio, the companion robot for your home",
    description:
      "A companion robot you just talk to. Pre-orders open, nothing charged today.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${satoshi.variable} ${orbitron.variable} ${jetbrainsMono.variable} h-full`}
    >
      <body className="flex min-h-full flex-col overflow-x-hidden">
        <SiteHeader />
        {/* Each page carries its own footer variant: full sitemap on the home
            page, the one-line rule on the inner routes. */}
        {children}
      </body>
    </html>
  );
}
