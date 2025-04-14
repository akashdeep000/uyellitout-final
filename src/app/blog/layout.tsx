import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "Blog | Uyellitout",
    template: "%s | Blog | Uyellitout",
  },
  description: "Explore expert insights on mental health, wellness tips, therapy guidance, and personal growth from Uyellitout. Stay informed, inspired, and emotionally empowered.",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://uyellitout.com/blog",
    title: "Blog | Uyellitout",
    description: "Explore expert insights on mental health, wellness tips, therapy guidance, and personal growth from Uyellitout. Stay informed, inspired, and emotionally empowered.",
    siteName: "Uyellitout",
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog | Uyellitout",
    description: "Explore expert insights on mental health, wellness tips, therapy guidance, and personal growth from Uyellitout. Stay informed, inspired, and emotionally empowered.",
  },
};


export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      {children}
    </div>
  );
}