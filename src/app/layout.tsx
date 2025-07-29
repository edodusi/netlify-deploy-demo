import StoryblokProvider from "../components/StoryblokProvider";
import "./globals.css";
import { Geist, Geist_Mono } from "next/font/google";
import type { Metadata } from "next";
import { headers } from "next/headers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Storyblok Next.js App Router",
  description: "A Next.js and Storyblok app using the App Router",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Use the `headers` function to check for the referer.
  // This is the correct server-side approach for layouts.
  const headersList = await headers();
  const referer = headersList.get("referer");
  const isStoryblokPreview = referer ? referer.includes("_storyblok_tk") : false;

  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {isStoryblokPreview ? (
          <StoryblokProvider>{children}</StoryblokProvider>
        ) : (
          children
        )}
      </body>
    </html>
  );
}