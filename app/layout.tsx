import type { Metadata } from "next";
import { Geist_Mono, Orbitron } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

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
  title: "nex-ON by CozmoBot — Deploy Any Robot, Just by Talking to It",
  description:
    "nex-ON is a robot-agnostic AI deployment platform. Perception, tooling, and sensor integration let an AI brain deploy any robot to do any task, directed in plain human language. Proven on Omnicron, our autonomous welding cobot.",
  keywords: [
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
    title: "nex-ON by CozmoBot — Deploy Any Robot, Just by Talking to It",
    description:
      "A robot-agnostic AI deployment platform. Any robot, any task, directed in plain language. Proven on Omnicron, our autonomous welding cobot.",
    type: "website",
    siteName: "CozmoBot",
  },
  twitter: {
    card: "summary_large_image",
    title: "nex-ON by CozmoBot — Deploy Any Robot, Just by Talking to It",
    description:
      "A robot-agnostic AI deployment platform. Any robot, any task, directed in plain language.",
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
        {children}
      </body>
    </html>
  );
}
