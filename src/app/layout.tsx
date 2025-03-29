import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { ReactQueryProviders } from "@/providers/react-query";
import type { Metadata } from "next";
import { Cabin, Quicksand } from "next/font/google";
import NextTopLoader from "nextjs-toploader";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://uyellitout.com"),
  title: {
    template: "%s | Uyellitout",
    default: "Uyellitout - Your Safe Therapy Space"
  },
  description: "Professional mental health support from a qualified psychologist. Get expert therapy sessions for anxiety, depression, stress, relationships, and personal growth. Confidential, compassionate, and tailored to your needs. Book your session today for better mental well-being!",
  keywords: ["therapy", "mental health", "counseling", "psychologist", "anxiety", "depression", "stress management", "online therapy", "mental wellness"],
  authors: [{ name: "Srishti Singh" }],
  creator: "Srishti Singh",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://uyellitout.com",
    title: "Uyellitout - Your Safe Therapy Space",
    description: "Professional mental health support from a qualified psychologist. Get expert therapy sessions for anxiety, depression, stress, relationships, and personal growth.",
    siteName: "Uyellitout"
  },
  twitter: {
    card: "summary_large_image",
    title: "Uyellitout - Your Safe Therapy Space",
    description: "Professional mental health support from a qualified psychologist. Get expert therapy sessions for anxiety, depression, stress, relationships, and personal growth."
  }
};

const dMSans = Quicksand({ subsets: ["latin"], variable: "--font-sans", weight: ["400", "700"] });
const dMCabin = Cabin({ subsets: ["latin"], variable: "--font-cabin", weight: ["400", "700"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn(dMSans.variable, dMCabin.variable)}>
        <NextTopLoader />
        <TooltipProvider>
          <main>
            <ReactQueryProviders>
              {children}
            </ReactQueryProviders>
          </main>
          <Toaster />
          <Sonner />
        </TooltipProvider>
      </body>
    </html>
  );
}
