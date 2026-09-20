import "./globals.css";
import AuthModal from "@/components/auth/AuthModal";

export const metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://furbowl.co.in'),
  title: {
    default: "FurBowl — Real Food. Pure Love. | Fresh Dog Food India",
    template: "%s | FurBowl",
  },
  icons: {
    icon: [
      { url: '/icon.svg', type: 'image/svg+xml' },
      { url: '/images/LOGO2.png', type: 'image/png' },
    ],
    shortcut: '/icon.svg',
    apple: '/icon.svg',
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

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': 'https://furbowl.co.in/#organization',
      'name': 'FurBowl',
      'alternateName': ['Fur Bowl', 'FurBowl Fresh Dog Food', 'FurBowl India'],
      'url': 'https://furbowl.co.in',
      'logo': {
        '@type': 'ImageObject',
        'url': 'https://furbowl.co.in/images/LOGO2.png',
        'caption': 'FurBowl Logo',
      },
      'description': 'Fresh, ready-to-eat cooked dog food made with real human-grade ingredients in India.',
      'contactPoint': {
        '@type': 'ContactPoint',
        'contactType': 'customer support',
        'areaServed': 'IN',
        'availableLanguage': ['English', 'Hindi'],
      },
    },
    {
      '@type': 'WebSite',
      '@id': 'https://furbowl.co.in/#website',
      'url': 'https://furbowl.co.in',
      'name': 'FurBowl',
      'publisher': {
        '@id': 'https://furbowl.co.in/#organization',
      },
      'potentialAction': {
        '@type': 'SearchAction',
        'target': 'https://furbowl.co.in/shop?search={search_term_string}',
        'query-input': 'required name=search_term_string',
      },
    },
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full font-sans" data-scroll-behavior="smooth" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col antialiased font-sans" suppressHydrationWarning>
        {children}
        <AuthModal />
      </body>
    </html>
  );
}
