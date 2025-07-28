import StoryblokClient from "storyblok-js-client";

class StoryblokService {
  private client: StoryblokClient;

  constructor() {
    this.client = new StoryblokClient({
      accessToken: process.env.STORYBLOK_PREVIEW_TOKEN!,
    });
  }

  async getStory(slug: string, options?: any) {
    try {
      const response = await this.client.get(`cdn/stories/${slug}`, {
        version: "draft",
        ...options
      });
      return response;
    } catch (error) {
      console.error(`Error fetching story ${slug}:`, error);
      return null;
    }
  }

  async getStories(options?: any) {
    try {
      const response = await this.client.get("cdn/stories", {
        version: "draft",
        ...options
      });
      return response;
    } catch (error) {
      console.error("Error fetching stories:", error);
      return null;
    }
  }

  async getStoriesByUuids(uuids: string[], options?: any) {
    try {
      const response = await this.client.get("cdn/stories", {
        version: "draft",
        by_uuids: uuids.join(','),
        ...options
      });
      return response;
    } catch (error) {
      console.error("Error fetching stories by UUIDs:", error);
      return null;
    }
  }
}

// Export a singleton instance
export const storyblokService = new StoryblokService();