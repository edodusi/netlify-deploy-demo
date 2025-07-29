import StoryblokClient from "storyblok-js-client";

class StoryblokService {
  private client: StoryblokClient | null = null;

  private getClient() {
    if (!this.client) {
      this.client = new StoryblokClient({
        accessToken: process.env.STORYBLOK_PREVIEW_TOKEN!,
      });
    }
    return this.client;
  }

  async getStory(slug: string, options?: any) {
    const client = this.getClient();
    return client.get(`cdn/stories/${slug}`, {
      version: "draft",
      ...options,
    });
  }

  async getStories(options?: any) {
    const client = this.getClient();
    return client.get("cdn/stories", {
      version: "draft",
      ...options,
    });
  }

  async getStoriesByUuids(uuids: string[], options?: any) {
    const client = this.getClient();
    return client.get("cdn/stories", {
      version: "draft",
      by_uuids: uuids.join(","),
      ...options,
    });
  }
}

export function getStoryblokService() {
  return new StoryblokService();
}
