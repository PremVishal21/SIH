import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "FLOATX — Agentic Ocean Intelligence Platform (MoES SIH25040)",
  description: "Conversational AI platform for discovering, querying, analyzing, visualizing, and explaining ARGO oceanographic data.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=Manrope:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="bg-[#F5F1E8] text-[#252824] antialiased">
        {children}
      </body>
    </html>
  );
}
