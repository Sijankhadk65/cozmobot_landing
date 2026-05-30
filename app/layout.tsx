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
  title: "CozmoBot — Autonomous Industrial Robotics",
  description:
    "End-to-end AI welding automation powered by computer vision, smart parameter prediction, and zero-code robot programming. The future of industrial automation.",
  keywords: [
    "autonomous welding",
    "AI robotics",
    "industrial automation",
    "robotic welding",
    "computer vision robotics",
    "zero-code robotics",
    "adaptive manufacturing",
  ],
  openGraph: {
    title: "CozmoBot — Autonomous Industrial Robotics",
    description:
      "End-to-end AI welding automation. Computer vision + AI parameter prediction + trajectory planning.",
    type: "website",
    siteName: "CozmoBot",
  },
  twitter: {
    card: "summary_large_image",
    title: "CozmoBot — Autonomous Industrial Robotics",
    description:
      "End-to-end AI welding automation. Zero-code robot programming for industrial workflows.",
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
      <body className="min-h-full flex flex-col bg-white text-gray-900">
        {children}
      </body>
    </html>
  );
}
