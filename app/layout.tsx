import type { Metadata } from "next";
import { JetBrains_Mono, Orbitron } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { SiteHeader } from "@/components/site/SiteHeader";

// Satoshi sets everything readable. Orbitron is a display face, reserved for
// uppercase micro-labels, nav and buttons — never body copy, never a full
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
    default: "CozmoBot — nex-ON, the embodied OS for any robot",
    // Child pages set a short title; this appends the brand.
    template: "%s · CozmoBot",
  },
  description:
    "nex-ON is the embodied OS — a robot-agnostic deployment platform between an AI brain and a robot body. Perception, tooling and motion become modular capabilities an LLM composes on the fly, delivered as an edition built for your industry. Weld OS first. You direct it by talking.",
  keywords: [
    "embodied OS",
    "robot deployment platform",
    "robot-agnostic software",
    "embodied AI",
    "natural language robotics",
    "autonomous welding",
    "collaborative robots",
    "open-vocabulary vision",
    "humanoid robotics",
  ],
  openGraph: {
    title: "CozmoBot — nex-ON, the embodied OS for any robot",
    description:
      "The robot-agnostic deployment platform between an AI brain and a robot body. One OS core, a purpose-built edition for every industry — Weld OS first.",
    type: "website",
    siteName: "CozmoBot",
  },
  twitter: {
    card: "summary_large_image",
    title: "CozmoBot — nex-ON, the embodied OS for any robot",
    description:
      "Deploy any robot to do anything. One OS core, an edition per industry — Weld OS live today.",
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
        {/* Each page carries its own footer variant — full sitemap on the home
            page, the one-line rule on the inner routes. */}
        {children}
      </body>
    </html>
  );
}
