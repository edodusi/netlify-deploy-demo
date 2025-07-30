import { draftMode } from "next/headers";

/**
 * Asynchronously determines the Storyblok content version to fetch.
 *
 * This function centralizes the logic for deciding whether to request
 * the 'draft' or 'published' version of a story from the Storyblok API.
 *
 * In a development environment (`NODE_ENV === 'development'`), it always
 * returns 'draft' to ensure developers see the latest content without
 * needing to manually enable preview mode.
 *
 * In other environments (like production), it respects the status of
 * Next.js Draft Mode.
 *
 * @returns A promise that resolves to either 'draft' or 'published'.
 */
export async function getStoryblokVersion(): Promise<"draft" | "published"> {
  if (process.env.NODE_ENV === "development") {
    return "draft";
  }

  const { isEnabled } = await draftMode();
  return isEnabled ? "draft" : "published";
}