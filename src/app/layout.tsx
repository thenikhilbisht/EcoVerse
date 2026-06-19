import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
  weight: ["400", "500", "700"],
});

const BASE_URL = "https://ecoverse.earth";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "EcoVerse — Track. Reduce. Compete. Save Earth.",
    template: "%s | EcoVerse",
  },
  description:
    "Join EcoVerse — the world's most engaging sustainability challenge platform. Track your carbon footprint with AI, compete in eco challenges, earn rewards, and help save the planet.",
  keywords: [
    "carbon footprint tracker",
    "sustainability platform",
    "eco challenge",
    "climate action app",
    "green living",
    "AI carbon calculator",
    "environmental gamification",
    "eco warriors",
    "carbon offset",
    "climate tech",
  ],
  authors: [{ name: "EcoVerse Team", url: BASE_URL }],
  creator: "EcoVerse",
  publisher: "EcoVerse Inc.",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: "EcoVerse — Track. Reduce. Compete. Save Earth.",
    description:
      "The world's most engaging sustainability platform. AI-powered carbon tracking, eco challenges, and community competitions.",
    url: BASE_URL,
    siteName: "EcoVerse",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "EcoVerse — Save Earth Together",
    description:
      "Track your carbon footprint, compete in eco challenges, and make a real difference.",
    creator: "@EcoVerseHQ",
    site: "@EcoVerseHQ",
  },
  manifest: "/manifest.json",
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
    apple: [{ url: "/apple-touch-icon.svg", type: "image/svg+xml" }],
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "EcoVerse",
  },
  category: "technology",
};

export const viewport: Viewport = {
  themeColor: "#00ff88",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`scroll-smooth ${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable}`}
    >
      <body className="bg-eco-black text-[#e8ffe8] antialiased">
        <a href="#main-content" className="skip-to-content">
          Skip to main content
        </a>
        <div id="main-content">
          <ErrorBoundary>
            {children}
          </ErrorBoundary>
        </div>
      </body>
    </html>
  );
}
