import { storyblokEditable } from "@storyblok/react/rsc";

const FeaturedArticles = ({ blok }: { blok: any }) => {
  return (
    <div
      {...storyblokEditable(blok)}
      className="py-8"
      data-test="featured-articles"
    >
      <div className="container mx-auto">
        <h2 className="text-2xl font-bold text-center mb-8">
          Featured Articles
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="border p-4 rounded-lg">
            <h3 className="text-xl font-bold mb-2">Static Article 1</h3>
            <p>
              This is a static placeholder for a featured article. You can
              replace this with dynamic content from Storyblok.
            </p>
          </div>
          <div className="border p-4 rounded-lg">
            <h3 className="text-xl font-bold mb-2">Static Article 2</h3>
            <p>
              This is another static placeholder. Edit this component to fetch
              and display real articles.
            </p>
          </div>
          <div className="border p-4 rounded-lg">
            <h3 className="text-xl font-bold mb-2">Static Article 3</h3>
            <p>
              This is the third static placeholder, demonstrating the layout for
              featured content.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedArticles;