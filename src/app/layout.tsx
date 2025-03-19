import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ReactQueryProviders } from "@/providers/react-query";
import type { Metadata } from "next";
import { Quicksand } from "next/font/google";
import "./globals.css";

export const metadata: Metadata = {
  title: "App",
  description: "",
};

const dMSans = Quicksand({ subsets: ["latin"], variable: "--font-sans", weight: ["400", "700"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={dMSans.variable}>
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
