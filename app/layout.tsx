import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
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
      className={`${geistSans.variable} ${geistMono.variable} h-full`}
    >
      <body className="min-h-full flex flex-col bg-carbon text-offwhite">
        {children}
      </body>
    </html>
  );
}
