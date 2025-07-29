import StoryblokProvider from "../components/StoryblokProvider";
import "./globals.css";
import { Geist, Geist_Mono } from "next/font/google";
import type { Metadata } from "next";
import { draftMode } from "next/headers";
import DraftToolbar from "../components/DraftToolbar";

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
  const isStoryblokPreview = (await draftMode()).isEnabled;

  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {isStoryblokPreview ? (
          <>
            <DraftToolbar />
            <StoryblokProvider>{children}</StoryblokProvider>
          </>
        ) : (
          children
        )}
      </body>
    </html>
  );
}
