import Teaser from "../../components/Teaser";
import { getStoryblokService } from "../../services/storyblok";

async function getHomepageData() {
  const storyblokService = getStoryblokService();
  return await storyblokService.getStory("home");
}

async function getFeaturedPosts(postUuids: string[]) {
  try {
    const storyblokService = getStoryblokService();
    const response = await storyblokService.getStoriesByUuids(postUuids);
    return response?.data?.stories || [];
  } catch (error) {
    return [];
  }
}

export default async function Home() {
  const homepageData = await getHomepageData();
  
  // Extract teaser component from body array
  const teaserComponent = homepageData?.data?.story?.content?.body?.find((comp: any) => comp.component === 'teaser');
  
  // Extract featured posts component and fetch the posts
  const featuredPostsComponent = homepageData?.data?.story?.content?.body?.find((comp: any) => comp.component === 'featured_posts');
  const featuredPosts = featuredPostsComponent?.posts ? await getFeaturedPosts(featuredPostsComponent.posts) : [];

  return (
    <div className="container">
      <div className="text-center">
        {teaserComponent && (
          <Teaser 
            headline={teaserComponent.headline}
            text={teaserComponent.text}
          />
        )}
        
        {featuredPosts.length > 0 && (
          <div className="mt-6">
            <h2 className="text-center mb-3">
              Featured Stories
            </h2>
            <ul className="space-y-1">
              {featuredPosts.map((post: any) => (
                <li key={post.id}>
                  <a href={`/${post.full_slug}`}>
                    {post.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}