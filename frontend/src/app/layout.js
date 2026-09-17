import "./globals.css";

export const metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://furbowl.in'),
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
    images: [{ url: '/images/carousel_1.png', width: 1200, height: 675, alt: 'FurBowl fresh dog food' }],
  },
  twitter: {
    card: "summary_large_image",
  },
  alternates: { canonical: '/' },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full font-sans" data-scroll-behavior="smooth" suppressHydrationWarning>
      <body className="min-h-full flex flex-col antialiased font-sans" suppressHydrationWarning>{children}</body>
    </html>
  );
}
