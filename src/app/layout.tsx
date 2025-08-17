import type { Metadata } from "next";
import "./globals.css";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/ThemeProvider";
import { redirect } from "next/navigation";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "CoverBook - Master Any Subject with Smart Learning",
    template: "%s | CoverBook",
  },

  description:
    "CoverBook combines flashcards, AI-powered simulations, practice exams, and analytics to create the most effective learning experience for any subject.",
  keywords: [
    "learning",
    "education",
    "flashcards",
    "spaced repetition",
    "simulations",
    "exam prep",
    "study app",
    "German learning",
  ],
  authors: [{ name: "CoverBook Team", url: "https://coverbook.id" }],
  creator: "CoverBook Team",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://coverbook.id",
    title: "CoverBook - Master Any Subject with Smart Learning",
    description:
      "The ultimate learning platform with flashcards, simulations, and analytics.",
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
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
