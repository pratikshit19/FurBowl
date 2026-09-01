import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: {
    default: "FurBowl — Real Food. Pure Love. | Fresh Dog Food India",
    template: "%s | FurBowl",
  },
  description:
    "Fresh, ready-to-eat dog food made with real, human-grade ingredients. No fillers, no preservatives — just honest nutrition for your dog. Shop FurBowl.",
  keywords: [
    "dog food",
    "fresh dog food",
    "pet food india",
    "natural dog food",
    "furbowl",
    "ready to eat dog food",
    "human grade dog food",
  ],
  authors: [{ name: "FurBowl" }],
  creator: "FurBowl",
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: "FurBowl",
    title: "FurBowl — Real Food. Pure Love.",
    description:
      "Fresh, ready-to-eat dog food made with real, human-grade ingredients.",
  },
  twitter: {
    card: "summary_large_image",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} h-full`} data-scroll-behavior="smooth">
      <body className="min-h-full flex flex-col antialiased">{children}</body>
    </html>
  );
}
