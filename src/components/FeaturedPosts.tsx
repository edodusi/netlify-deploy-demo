import { storyblokApi } from "../lib/storyblok";
import {
  storyblokEditable,
  type SbBlokData,
} from "@storyblok/react/rsc";
import Link from "next/link";

interface FeaturedPostsBlok extends SbBlokData {
  posts: string[];
}

// The Storyblok API response for a story
interface Story {
  id: number;
  uuid: string;
  name: string;
  slug: string;
  full_slug: string;
  // Add other story properties as needed
}

async function fetchFeaturedPosts(uuids: string[]): Promise<Story[]> {
  if (!uuids || uuids.length === 0) {
    return [];
  }

  try {
    const { data } = await storyblokApi().get("cdn/stories", {
      by_uuids: uuids.join(","),
      version: "published", // Or "draft" depending on context
    });
    return data.stories;
  } catch (error) {
    console.error("Error fetching featured posts:", error);
    return [];
  }
}

const FeaturedPosts = async ({ blok }: { blok: FeaturedPostsBlok }) => {
  const featuredPosts = await fetchFeaturedPosts(blok.posts);

  return (
    <div
      {...storyblokEditable(blok)}
      className="py-8"
    >
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">
          Featured Posts
        </h2>
        {featuredPosts.length > 0 ? (
          <ul className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredPosts.map((post) => (
              <li
                key={post.uuid}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
              >
                <Link href={`/${post.full_slug}`}>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-gray-800">
                      {post.name}
                    </h3>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center text-gray-500">No featured posts selected.</p>
        )}
      </div>
    </div>
  );
};

export default FeaturedPosts;