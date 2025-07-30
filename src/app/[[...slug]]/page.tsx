import StoryblokPage from "../../components/StoryblokPage";
import type { Metadata } from "next";
import { storyblokApi } from "../../lib/storyblok";

type PageProps = {
  params: { slug?: string[] };
};

type StaticParams = {
  slug: string[];
};

/**
 * Fetches the story data for metadata generation.
 * This function remains static and fetches the published version for SEO.
 */
async function getStoryForMetadata(params: any) {
  const pageParams = await params;
  const slug = pageParams.slug?.join("/") || "home";
  try {
    const { data } = await storyblokApi().get(`cdn/stories/${slug}`, {
      version: "published",
    });
    return data.story;
  }
 catch (error) {
    return null;
  }
}

/**
 * Generates metadata for a given page.
 */
export async function generateMetadata(props: {
  params: any;
}): Promise<Metadata> {
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

/**
 * The main page component. It resolves the slug from the route parameters
 * and delegates rendering to the StoryblokPage component.
 */
export default async function Page(props: { params: any }) {
  const pageParams = await props.params;
  const slug = pageParams.slug?.join("/") || "home";

  return <StoryblokPage slug={slug} />;
}

/**
 * Generates static paths for all pages at build time.
 */
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