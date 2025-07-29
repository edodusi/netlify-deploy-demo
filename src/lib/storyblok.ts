import { apiPlugin, storyblokInit } from "@storyblok/react/rsc";

// Component Imports
import Page from "@/components/Page";
import Feature from "@/components/Feature";
import Grid from "@/components/Grid";
import Teaser from "@/components/Teaser";
import FeaturedPosts from "@/components/FeaturedPosts";
import FeaturedArticles from "@/components/FeaturedArticles";

const components = {
  page: Page,
  feature: Feature,
  grid: Grid,
  teaser: Teaser,
  featured_posts: FeaturedPosts,
  "featured-articles": FeaturedArticles,
};

const STORYBLOK_TOKEN =
  process.env.STORYBLOK_ACCESS_TOKEN || process.env.STORYBLOK_PREVIEW_TOKEN;

if (!STORYBLOK_TOKEN) {
  throw new Error(
    "The STORYBLOK_ACCESS_TOKEN or STORYBLOK_PREVIEW_TOKEN environment variable is not set."
  );
}

/**
 * Initializes the Storyblok client and registers all components.
 */
export const storyblokApi = storyblokInit({
  accessToken: STORYBLOK_TOKEN,
  use: [apiPlugin],
  components,
  apiOptions: {
    // If your space is not in the US, change this to the correct region.
    // region: "eu",
  },
});
