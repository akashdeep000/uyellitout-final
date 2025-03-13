import { Toaster } from "@/components/ui/toaster";
import { ReactQueryProviders } from "@/providers/react-query";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "App",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <main>
          <ReactQueryProviders>
            {children}
          </ReactQueryProviders>
        </main>
        <Toaster />
      </body>
    </html>
  );
}
