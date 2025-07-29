import { storyblokEditable, StoryblokServerComponent } from "@storyblok/react/rsc";
import { type SbBlokData } from "@storyblok/react/rsc";

interface PageBlok extends SbBlokData {
  body: SbBlokData[];
}

const Page = ({ blok }: { blok: PageBlok }) => {
  return (
    <main {...storyblokEditable(blok)} className="container mx-auto px-4">
      {blok.body?.map((nestedBlok) => (
        <StoryblokServerComponent blok={nestedBlok} key={nestedBlok._uid} />
      ))}
    </main>
  );
};

export default Page;