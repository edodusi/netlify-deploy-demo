import { storyblokService } from "../../../services/storyblok";

async function getStoryData(slug: string) {
  const response = await storyblokService.getStory(`posts/${slug}`);
  return response;
}

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  const storyData = await getStoryData(slug);
  
  if (!storyData) {
    return <div>Story not found</div>;
  }

  return (
    <div>
      <h1>{storyData.data.story.name}</h1>
      <pre>{JSON.stringify(storyData.data.story.content, null, 2)}</pre>
    </div>
  );
}