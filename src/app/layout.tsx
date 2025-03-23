import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { ReactQueryProviders } from "@/providers/react-query";
import type { Metadata } from "next";
import { Cabin, Quicksand } from "next/font/google";
import "./globals.css";

export const metadata: Metadata = {
  title: "App",
  description: "",
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
        <TooltipProvider>
          <main>
            <ReactQueryProviders>
              {children}
            </ReactQueryProviders>
          </main>
          <Toaster />
        </TooltipProvider>
      </body>
    </html>
  );
}
