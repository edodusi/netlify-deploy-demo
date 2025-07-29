import { storyblokApi } from "../lib/storyblok";
import { StoryblokStory } from "@storyblok/react/rsc";
import { notFound } from "next/navigation";

type StoryblokPageProps = {
  slug: string;
  isEnabled: boolean;
};

async function fetchData(slug: string, isEnabled: boolean) {
  const version = isEnabled ? "draft" : "published";
  try {
    const { data } = await storyblokApi().get(`cdn/stories/${slug}`, {
      version,
      cv: isEnabled ? Date.now() : undefined,
    });
    return data;
  } catch (error) {
    // The Storyblok API returns a 404 error when a story is not found,
    // which we catch here to return null.
    return null;
  }
}

export default async function StoryblokPage({
  slug,
  isEnabled,
}: StoryblokPageProps) {
  // In development, always fetch draft content.
  // In production, respect the isEnabled flag from draft mode.
  const isDraft = process.env.NODE_ENV === "development" || isEnabled;
  const data = await fetchData(slug, isDraft);

  if (!data?.story) {
    notFound();
  }

  return <StoryblokStory story={data.story} />;
}