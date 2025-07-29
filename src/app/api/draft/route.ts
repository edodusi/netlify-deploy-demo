import { draftMode } from "next/headers";
import { redirect } from "next/navigation";
import { storyblokApi } from "../../../lib/storyblok";

/**
 * This Route Handler enables Next.js Draft Mode.
 * It's triggered by the preview URL set in Storyblok.
 *
 * @see https://nextjs.org/docs/app/api-reference/functions/draft-mode
 */
export async function GET(request: Request) {
  // 1. Parse query string parameters from the request URL
  const { searchParams } = new URL(request.url);
  const secret = searchParams.get("secret");
  const slug = searchParams.get("slug");

  // 2. Validate the secret token
  // This should be a secret environment variable to prevent unauthorized access.
  const DRAFT_SECRET = process.env.STORYBLOK_PREVIEW_SECRET;
  if (!DRAFT_SECRET) {
    return new Response(
      "Draft Mode secret is not configured. Please set STORYBLOK_PREVIEW_SECRET.",
      { status: 500 }
    );
  }
  if (secret !== DRAFT_SECRET) {
    return new Response("Invalid secret token.", { status: 401 });
  }

  // 3. Ensure a slug is provided
  if (!slug) {
    return new Response("Slug parameter is missing.", { status: 400 });
  }

  // 4. Fetch the story from Storyblok to ensure it exists.
  // This is a crucial security measure to prevent open redirect vulnerabilities.
  try {
    const { data } = await storyblokApi().get(`cdn/stories/${slug}`, {
      version: "draft", // Must fetch draft version to check existence
    });

    if (!data.story) {
      return new Response(`Story with slug "${slug}" not found.`, {
        status: 404,
      });
    }
  } catch (error) {
    // Handle potential errors from the Storyblok API
    return new Response("Error fetching story from Storyblok.", { status: 500 });
  }

  // 5. Enable Draft Mode by setting the Next.js preview cookie
  (await draftMode()).enable();

  // 6. Redirect to the page slug from the request
  // The existence of the story has been verified, so this is safe.
  redirect(`/${slug}`);
}
