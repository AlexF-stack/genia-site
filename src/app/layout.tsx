import type { Metadata } from "next";
import { Syne, DM_Sans } from "next/font/google";

import "./globals.css";

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  weight: ["500", "700", "800"],
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "GenIA | Formation IA Pratique au Bénin",
    template: "%s | GenIA",
  },
  description:
    "Maîtrisez ChatGPT, Claude, Gemini et les meilleurs outils d'IA. Une formation concrète pour créer, automatiser et lancer vos projets au Bénin.",
  keywords: [
    "formation IA",
    "intelligence artificielle",
    "ChatGPT",
    "Bénin",
    "automatisation",
    "digital",
  ],
  authors: [{ name: "GenIA" }],
  metadataBase: new URL("https://genia.vercel.app"),
  openGraph: {
    title: "GenIA | Formation IA Pratique au Bénin",
    description:
      "Apprenez à utiliser l'IA pour transformer vos idées en projets réels.",
    type: "website",
    locale: "fr_FR",
    siteName: "GenIA",
    url: "https://genia.vercel.app",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "GenIA - Formation IA",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "GenIA | Formation IA Pratique au Bénin",
    description: "Apprenez à maîtriser l'IA dès aujourd'hui.",
    images: ["/opengraph-image"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Course",
    name: "GenIA - Formation Pratique en Intelligence Artificielle",
    description: "Apprenez à utiliser ChatGPT, Claude, Gemini et des workflows IA pour créer, automatiser et lancer de vrais projets.",
    provider: {
      "@type": "Organization",
      name: "GenIA",
      url: "https://genia.vercel.app",
    },
    educationalLevel: "Débutant à intermédiaire",
    courseMode: "Présentiel et accompagnement pratique",
  };

  return (
    <html lang="fr" className={`${syne.variable} ${dmSans.variable}`}>
      <body className="antialiased font-sans">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}


