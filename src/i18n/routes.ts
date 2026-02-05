/**
 * URL Slug Translation Map
 *
 * Maps English URL paths to their Spanish equivalents.
 * Used for generating alternate language URLs with proper slugs.
 */

import type { Lang } from './config';

/**
 * English to Spanish URL slug mapping
 * Add new routes here as pages are created
 */
export const routeMap: Record<string, string> = {
  '/about': '/sobre-ciara',
  '/contact': '/contacto',
  '/properties': '/propiedades',
  '/guides': '/guias',
  '/neighborhoods': '/vecindarios',
  '/calculators': '/calculadoras',
  '/blog': '/blog',
};

/**
 * Get the alternate language URL for a given path
 *
 * @param path - Current URL path (with language prefix)
 * @param fromLang - Current language
 * @param toLang - Target language
 * @returns Translated URL path with correct language prefix and slug
 *
 * @example
 * getAlternateUrl('/en/about/', 'en', 'es') // '/es/sobre-ciara/'
 * getAlternateUrl('/es/propiedades/', 'es', 'en') // '/en/properties/'
 */
export function getAlternateUrl(path: string, fromLang: Lang, toLang: Lang): string {
  // Strip language prefix and trailing slash for matching
  const pathWithoutLang = path.replace(/^\/(en|es)/, '').replace(/\/$/, '');

  // Handle root path (empty after stripping)
  if (!pathWithoutLang || pathWithoutLang === '/') {
    return `/${toLang}/`;
  }

  if (fromLang === 'en' && toLang === 'es') {
    // English to Spanish - find Spanish slug
    const spanishSlug = routeMap[pathWithoutLang] ?? pathWithoutLang;
    return `/es${spanishSlug}/`;
  } else {
    // Spanish to English - reverse lookup
    const entry = Object.entries(routeMap).find(([, es]) => es === pathWithoutLang);
    const englishSlug = entry ? entry[0] : pathWithoutLang;
    return `/en${englishSlug}/`;
  }
}

/**
 * Get the English equivalent URL for any path
 * Used for x-default hreflang generation
 *
 * @param path - Current URL path (with language prefix)
 * @returns English URL path
 */
export function getEnglishUrl(path: string): string {
  const pathWithoutLang = path.replace(/^\/(en|es)/, '').replace(/\/$/, '');

  // Handle root path (empty after stripping)
  if (!pathWithoutLang || pathWithoutLang === '/') {
    return '/en/';
  }

  // If path is already English structure, return as-is
  if (routeMap[pathWithoutLang]) {
    return `/en${pathWithoutLang}/`;
  }

  // Check if it's a Spanish slug that needs reverse mapping
  const entry = Object.entries(routeMap).find(([, es]) => es === pathWithoutLang);
  if (entry) {
    return `/en${entry[0]}/`;
  }

  // No mapping found, assume path is language-neutral
  return `/en${pathWithoutLang}/`;
}
