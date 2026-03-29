import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import SplashCursor from "@/components/ui/SplashCursor";
import Preloader from "@/components/ui/Preloader";
import Curtain from "@/components/ui/Curtain";
import FloatingDock from "@/components/ui/FloatingDock";
import SmoothScroll from "@/components/ui/SmoothScroll";
import Noise from "@/components/ui/Noise";
import ScrollProgress from "@/components/ui/ScrollProgress";
import BackToTop from "@/components/ui/BackToTop";
import Terminal from "@/components/effects/Terminal";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://ayaskant.dev"), // Replace with actual domain
  title: "Ayaskant Sahoo | Portfolio",
  description: "Developer & Student Portfolio - Creative, Dark, Bold.",
  keywords: ["Ayaskant Sahoo", "Portfolio", "Developer", "Student", "Next.js", "React", "Creative Developer"],
  authors: [{ name: "Ayaskant Sahoo" }],
  icons: {
    icon: "/avatar.png", // Use avatar as favicon
  },
  openGraph: {
    title: "Ayaskant Sahoo | Portfolio",
    description: "Developer & Student Portfolio - Creative, Dark, Bold.",
    url: "https://ayaskant.dev",
    siteName: "Ayaskant Sahoo",
    images: [
      {
        url: "/avatar.png", // Fallback to avatar for now
        width: 1200,
        height: 630,
        alt: "Ayaskant Sahoo Portfolio",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ayaskant Sahoo | Portfolio",
    description: "Developer & Student Portfolio - Creative, Dark, Bold.",
    images: ["/avatar.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className={`${outfit.variable} antialiased bg-black text-white overflow-x-hidden`}
      >
        <div
          dangerouslySetInnerHTML={{
            __html: `<!-- \n\n\n\n\n\nSYMPHONY the hidden masterwork\n-->`,
          }}
          style={{ display: "none" }}
        />
        <Preloader />
        <Curtain />
        <ScrollProgress />
        <SplashCursor />
        {children}
        <BackToTop />
        <FloatingDock />
        <SmoothScroll />
        <Noise />
        <Terminal />
      </body>
    </html>
  );
}
