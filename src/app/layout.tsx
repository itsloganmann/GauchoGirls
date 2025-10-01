import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Analytics } from "@vercel/analytics/react";
import { Toaster } from "react-hot-toast";
import { ThemeProvider } from "@/components/ThemeProvider";
import "./globals.css";

export const metadata: Metadata = {
  title: "GauchoGirls",
  description: "Anonymously rate your experience with Isla Vista women",
  keywords: ["UCSB", "Isla Vista", "ratings", "reviews"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body className="min-h-screen font-sans antialiased">
        <ThemeProvider attribute="class" defaultTheme="light">
          {children}
          <Toaster position="bottom-right" />
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
}
