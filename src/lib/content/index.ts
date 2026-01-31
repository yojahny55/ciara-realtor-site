import { getCollection } from 'astro:content';
import type { CollectionEntry } from 'astro:content';

export type Lang = 'en' | 'es';
export type BlogPost = CollectionEntry<'blog'>;
export type Guide = CollectionEntry<'guides'>;
export type Neighborhood = CollectionEntry<'neighborhoods'>;
export type Testimonial = CollectionEntry<'testimonials'>;

/**
 * Get blog posts filtered by language, sorted by date (newest first)
 * Excludes drafts in production
 *
 * NOTE: Astro 5 Content Layer API - sort order from getCollection() is
 * non-deterministic, so we MUST sort manually after fetching.
 */
export async function getBlogPosts(lang: Lang): Promise<BlogPost[]> {
  const posts = await getCollection('blog', ({ id, data }) => {
    // id includes path: "en/2026-01-30-post.mdx" or "es/2026-01-30-post.mdx"
    const isCorrectLang = id.startsWith(`${lang}/`);
    const isPublished = import.meta.env.PROD ? !data.draft : true;
    return isCorrectLang && isPublished;
  });

  // CRITICAL: Must sort manually - getCollection() order is non-deterministic in Astro 5
  return posts.sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
}

/**
 * Get guides filtered by language
 */
export async function getGuides(lang: Lang): Promise<Guide[]> {
  const guides = await getCollection('guides', ({ id }) => id.startsWith(`${lang}/`));
  // Sort alphabetically by title for consistent ordering
  return guides.sort((a, b) => a.data.title.localeCompare(b.data.title));
}

/**
 * Get neighborhoods filtered by language
 */
export async function getNeighborhoods(lang: Lang): Promise<Neighborhood[]> {
  const neighborhoods = await getCollection('neighborhoods', ({ id }) => id.startsWith(`${lang}/`));
  // Sort alphabetically by name for consistent ordering
  return neighborhoods.sort((a, b) => a.data.name.localeCompare(b.data.name));
}

/**
 * Get testimonials filtered by language, optionally featured only
 */
export async function getTestimonials(
  lang: Lang,
  featuredOnly = false
): Promise<Testimonial[]> {
  const testimonials = await getCollection('testimonials', ({ id, data }) => {
    const isCorrectLang = id.startsWith(`${lang}/`);
    const isFeatured = featuredOnly ? data.featured : true;
    return isCorrectLang && isFeatured;
  });

  // Sort by date descending (newest first)
  return testimonials.sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
}
