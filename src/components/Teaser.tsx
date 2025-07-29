import { storyblokEditable } from "@storyblok/react/rsc";
import { type SbBlokData } from "@storyblok/react/rsc";

interface TeaserBlok extends SbBlokData {
  headline: string;
}

const Teaser = ({ blok }: { blok: TeaserBlok }) => {
  return (
    <div {...storyblokEditable(blok)} className="py-32 text-center">
      <h1 className="text-7xl text-[#50b0ae] font-bold">{blok.headline}</h1>
    </div>
  );
};

export default Teaser;