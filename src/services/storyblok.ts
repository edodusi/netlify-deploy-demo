import StoryblokClient from "storyblok-js-client";

class StoryblokService {
  private client: StoryblokClient;

  constructor() {
    this.client = new StoryblokClient({
      accessToken: process.env.STORYBLOK_PREVIEW_TOKEN!,
    });
  }

  async getStory(slug: string, options?: any) {
    return this.client.get(`cdn/stories/${slug}`, {
      version: "draft",
      ...options
    });
  }

  async getStories(options?: any) {
    return this.client.get("cdn/stories", {
      version: "draft",
      ...options
    });
  }

  async getStoriesByUuids(uuids: string[], options?: any) {
    return this.client.get("cdn/stories", {
      version: "draft",
      by_uuids: uuids.join(','),
      ...options
    });
  }
}

// Export a factory function instead of a singleton
export function getStoryblokService() {
  return new StoryblokService();
}
