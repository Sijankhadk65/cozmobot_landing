import type { Metadata } from "next";
import { Geist_Mono, Orbitron } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { Menu } from "@/components/Menu";
import { BrandHome } from "@/components/BrandHome";
import { ConditionalFooter } from "@/components/ConditionalFooter";

// Satoshi carries all text; Geist Mono stays on the instrument-panel readouts;
// Orbitron is display-only, reserved for the product names via `font-brand`.
const satoshi = localFont({
  src: "./fonts/Satoshi-Variable.woff2",
  variable: "--font-satoshi",
  weight: "300 900",
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const orbitron = Orbitron({
  variable: "--font-orbitron",
  subsets: ["latin"],
  weight: ["700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://cozmobot.com"),
  title: {
    default: "nex-ON by CozmoBot — Robot Deployment Software. Any Robot, Just by Talking to It",
    // Child pages set a short title; this appends the brand.
    template: "%s · CozmoBot",
  },
  description:
    "nex-ON is licensed, robot-agnostic AI software for deploying robots you already own. Perception, tooling, and sensor integration let an AI brain put any robot to any task, directed in plain human language. No teach pendant, no CAD programming, no new hardware. Proven on Omnicron, our autonomous welding cobot.",
  keywords: [
    "robot deployment software",
    "robot-agnostic platform",
    "embodied AI",
    "natural language robotics",
    "AI robot deployment",
    "autonomous welding",
    "collaborative robots",
    "open-vocabulary vision",
    "humanoid robotics",
  ],
  openGraph: {
    title: "nex-ON by CozmoBot — Robot Deployment Software",
    description:
      "Licensed, robot-agnostic AI software. Deploy the robots you already own to any task, directed in plain language. Proven on Omnicron, our autonomous welding cobot.",
    type: "website",
    siteName: "CozmoBot",
  },
  twitter: {
    card: "summary_large_image",
    title: "nex-ON by CozmoBot — Robot Deployment Software",
    description:
      "Licensed, robot-agnostic AI software. Deploy the robots you already own, directed in plain language.",
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
      className={`${satoshi.variable} ${geistMono.variable} ${orbitron.variable} h-full`}
    >
      <body className="min-h-full flex flex-col bg-carbon text-offwhite">
        <BrandHome />
        <Menu />
        {children}
        <ConditionalFooter />
      </body>
    </html>
  );
}
