"use client";

import { storyblokInit, apiPlugin } from "@storyblok/react/rsc";
import { ReactNode } from "react";
import Teaser from "./Teaser";

const components = {
  teaser: Teaser,
  // Add other Storyblok components here
};

/**
 * Initializes the Storyblok client for the Visual Editor.
 * This needs to be a client component.
 */
storyblokInit({
  accessToken: process.env.NEXT_PUBLIC_STORYBLOK_PREVIEW_TOKEN,
  use: [apiPlugin],
  components,
});

export default function StoryblokProvider({ children }: { children: ReactNode }) {
  return children;
}