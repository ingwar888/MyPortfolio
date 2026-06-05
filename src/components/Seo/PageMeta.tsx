import { useEffect } from 'react';
import { SEO_KEYWORDS_STRING, SEO_SITE_NAME } from '../../entities/seo/seoConfig';

type PageMetaProps = {
  title: string;
  description: string;
  image?: string;
  path?: string;
  keywords?: string;
};

const DEFAULT_OG_IMAGE = '/images/person.svg';

function upsertMeta(attribute: 'name' | 'property', key: string, content: string) {
  const selector = `meta[${attribute}="${key}"]`;
  let element = document.querySelector(selector) as HTMLMetaElement | null;

  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attribute, key);
    document.head.appendChild(element);
  }

  element.content = content;
}

export default function PageMeta({
  title,
  description,
  image,
  path,
  keywords = SEO_KEYWORDS_STRING,
}: PageMetaProps) {
  useEffect(() => {
    const fullTitle = `${title} | ${SEO_SITE_NAME}`;
    const ogImage = image ?? DEFAULT_OG_IMAGE;
    const url = path
      ? `${window.location.origin}${path}`
      : window.location.href;

    document.title = fullTitle;
    upsertMeta('name', 'description', description);
    upsertMeta('name', 'keywords', keywords);
    upsertMeta('property', 'og:title', fullTitle);
    upsertMeta('property', 'og:description', description);
    upsertMeta('property', 'og:image', ogImage.startsWith('http') ? ogImage : `${window.location.origin}${ogImage}`);
    upsertMeta('property', 'og:url', url);
    upsertMeta('property', 'og:type', 'website');
    upsertMeta('name', 'twitter:card', 'summary_large_image');
    upsertMeta('name', 'twitter:title', fullTitle);
    upsertMeta('name', 'twitter:description', description);
  }, [title, description, image, path, keywords]);

  return null;
}
