import type { Metadata, Viewport } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://saichandu.ai"),
  title: "Sai Chandu | AI & ML Engineering Portfolio",
  description:
    "Explore the portfolio of Sai Chandu, an Artificial Intelligence and Machine Learning engineering student interested in programming, AI, emerging technologies and software development.",
  keywords: [
    "Sai Chandu",
    "Tadikamalla Venkata Sai Chandu",
    "Artificial Intelligence",
    "Machine Learning",
    "Deep Learning",
    "Generative AI",
    "B.Tech AIML",
    "Tirumala Engineering College",
    "Python Developer",
    "Next.js",
    "Three.js",
    "Vektra",
  ],
  authors: [{ name: "Tadikamalla Venkata Sai Chandu" }],
  creator: "Tadikamalla Venkata Sai Chandu",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://saichandu.ai",
    title: "Sai Chandu | AI & ML Engineering Portfolio",
    description:
      "Explore the portfolio of Sai Chandu, an Artificial Intelligence and Machine Learning engineering student interested in programming, AI, emerging technologies and software development.",
    siteName: "Sai Chandu Portfolio",
    images: [
      {
        url: "/images/og-preview.svg",
        width: 1200,
        height: 630,
        alt: "Tadikamalla Venkata Sai Chandu - AI & ML Engineering Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sai Chandu | AI & ML Engineering Portfolio",
    description:
      "Explore the portfolio of Sai Chandu, an Artificial Intelligence and Machine Learning engineering student interested in programming, AI, emerging technologies and software development.",
    images: ["/images/og-preview.svg"],
  },
  icons: {
    icon: "/icon.svg",
  },
};

export const viewport: Viewport = {
  themeColor: "#050706",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${inter.variable} scroll-smooth dark`}>
      <body className="bg-[#050706] text-[#F5FFF9] font-sans antialiased selection:bg-[#00E6A0] selection:text-[#050706] min-h-screen overflow-x-hidden relative">
        {children}
      </body>
    </html>
  );
}
