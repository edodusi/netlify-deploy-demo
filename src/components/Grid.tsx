import { storyblokEditable, StoryblokServerComponent } from "@storyblok/react/rsc";
import { type SbBlokData } from "@storyblok/react/rsc";

interface GridBlok extends SbBlokData {
  columns: SbBlokData[];
}

const Grid = ({ blok }: { blok: GridBlok }) => (
  <div {...storyblokEditable(blok)} className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6">
    {blok.columns.map((nestedBlok) => (
      <StoryblokServerComponent blok={nestedBlok} key={nestedBlok._uid} />
    ))}
  </div>
);

export default Grid;