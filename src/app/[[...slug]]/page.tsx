import { draftMode } from "next/headers";
import StoryblokPage from "../../components/StoryblokPage";
import type { Metadata } from "next";
import { storyblokApi } from "../../lib/storyblok";

export const revalidate = 3600;

// Define the shape of the object returned by generateStaticParams
type StaticParams = {
  slug: string[];
};

// Helper function to fetch data for metadata.
// It uses your fix: `await params` to correctly handle the deferred value.
async function getStoryForMetadata(params: any) {
  const pageParams = await params;
  const slug = pageParams.slug?.join("/") || "home";
  try {
    const { data } = await storyblokApi().get(`cdn/stories/${slug}`, {
      version: "published",
    });
    return data.story;
  } catch (error) {
    return null;
  }
}

// generateMetadata uses the helper and your fix pattern.
export async function generateMetadata(props: { params: any }): Promise<Metadata> {
  const story = await getStoryForMetadata(props.params);

  if (!story) {
    return {
      title: "Not Found",
      description: "This page could not be found.",
    };
  }

  return {
    title: story.name,
    description: story.content?.meta_description,
  };
}

// The main Page component uses your fix: `await props.params`.
export default async function Page(props: { params: any }) {
  const pageParams = await props.params;
  const slug = pageParams.slug?.join("/") || "home";
  const { isEnabled } = await draftMode();

  return <StoryblokPage slug={slug} isEnabled={isEnabled} />;
}

// generateStaticParams has the explicit return type to fix the build error.
export async function generateStaticParams(): Promise<StaticParams[]> {
  const { data } = await storyblokApi().get("cdn/links/", {
    version: "published",
  });

  const paths: StaticParams[] = [];
  for (const link of Object.values(data.links as any[])) {
    if (link.is_folder) {
      continue;
    }

    const slugArray = link.slug === "home" ? [] : link.slug.split("/");
    paths.push({ slug: slugArray });
  }

  return paths;
}