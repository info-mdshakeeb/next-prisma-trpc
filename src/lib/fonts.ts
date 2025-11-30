import {
  Geist_Mono as FontMono,
  Geist as FontSans,
  Inter,
  Space_Grotesk as SpaceGrotesk,
} from "next/font/google";

import { cn } from "@/lib/utils";

const spaceGrotesk = SpaceGrotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
});

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});
const fontMono = FontMono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400"],
})

const fontInter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

export const fontVariables = cn(
  spaceGrotesk.variable,
  fontSans.variable,
  fontMono.variable,
  fontInter.variable,
)
