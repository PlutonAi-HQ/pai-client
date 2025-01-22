import { Outfit, Lora, IBM_Plex_Mono } from "next/font/google";
import localFont from "next/font/local";

const outfitSans = Outfit({
  variable: "--font-outfit-sans",
  subsets: ["latin", "latin-ext"],
  style: ["normal"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

const loraSerif = Lora({
  variable: "--font-lora-serif",
  style: ["normal", "italic"],
  subsets: ["latin", "latin-ext", "vietnamese"],
  weight: ["400", "500", "600", "700"],
});

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-ibm-plex-mono",
  style: ["normal", "italic"],
  subsets: ["latin", "latin-ext", "vietnamese"],
  weight: ["100", "200", "300", "400", "500", "600", "700"],
});

const ethnocentric = localFont({
  src: "./ethnocentric.otf",
  variable: "--font-ethnocentric",
});

export { outfitSans, loraSerif, ibmPlexMono, ethnocentric };
