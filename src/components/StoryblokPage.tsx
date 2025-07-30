import { storyblokApi } from "../lib/storyblok";
import { StoryblokStory } from "@storyblok/react/rsc";
import { notFound } from "next/navigation";
import { getStoryblokVersion } from "../lib/utils/storyblok";

type StoryblokPageProps = {
  slug: string;
};

/**
 * Fetches the data for a given slug from Storyblok, using the
 * centralized version helper to determine whether to get draft or published content.
 */
async function fetchData(slug: string) {
  const version = await getStoryblokVersion();
  try {
    const { data } = await storyblokApi().get(`cdn/stories/${slug}`, {
      version,
      cv: version === "draft" ? Date.now() : undefined,
    });
    return data;
  } catch (error) {
    // The Storyblok API returns a 404 error when a story is not found,
    // which we catch here to return null.
    return null;
  }
}

/**
 * This component is responsible for fetching and rendering a single page
 * from Storyblok. It no longer needs to know about draft mode directly,
 * as that logic is handled by the getStoryblokVersion helper.
 */
export default async function StoryblokPage({ slug }: StoryblokPageProps) {
  const data = await fetchData(slug);

  if (!data?.story) {
    notFound();
  }

  return <StoryblokStory story={data.story} />;
}