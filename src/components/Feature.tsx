import { storyblokEditable } from "@storyblok/react/rsc";
import { type SbBlokData } from "@storyblok/react/rsc";

interface FeatureBlok extends SbBlokData {
  name: string;
}

const Feature = ({ blok }: { blok: FeatureBlok }) => (
  <div {...storyblokEditable(blok)} className="w-full p-12 bg-[#f7f6fd] rounded-[5px] text-center">
    <h3 className="text-2xl text-[#1d243d] font-bold">{blok.name}</h3>
  </div>
);

export default Feature;