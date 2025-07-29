import { renderRichText } from '@storyblok/js';

interface TeaserProps {
  headline?: string;
  text?: any;
}

export default function Teaser({ headline, text }: TeaserProps) {
  return (
    <div className="mb-4">
      {headline && (
        <h1 className="mb-3">
          {headline}
        </h1>
      )}
      {text && (
        <div 
          className="mb-2"
          dangerouslySetInnerHTML={{ __html: renderRichText(text) || '' }}
        />
      )}
    </div>
  );
}
