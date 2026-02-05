/**
 * i18n Utility Functions
 *
 * Translation and language detection utilities.
 */

import { languages } from './config';
import { translations } from './translations';
import type { Lang } from './config';
import type { TranslationKey } from './translations';

/**
 * Supported language codes for validation
 */
const supportedLangs = Object.keys(languages) as Lang[];

/**
 * Extract language from URL path
 *
 * Validates that the extracted segment is a supported language.
 * Returns 'en' (default) for invalid or missing language prefixes.
 *
 * @param url - The URL object
 * @returns The detected language ('en' or 'es'), defaults to 'en'
 *
 * @example
 * getLangFromUrl(new URL('https://example.com/es/about/')) // 'es'
 * getLangFromUrl(new URL('https://example.com/en/contact/')) // 'en'
 * getLangFromUrl(new URL('https://example.com/')) // 'en' (default)
 * getLangFromUrl(new URL('https://example.com/essential/')) // 'en' (not a valid lang prefix)
 */
export function getLangFromUrl(url: URL): Lang {
  const [, segment] = url.pathname.split('/');

  // Validate segment is a supported language
  if (segment && supportedLangs.includes(segment as Lang)) {
    return segment as Lang;
  }

  return 'en'; // Default to English for invalid or missing prefix
}

/**
 * Get translated string directly
 *
 * @param key - Translation key (e.g., 'nav.home')
 * @param lang - Language code ('en' or 'es')
 * @returns Translated string, with fallback to English or key itself
 *
 * @example
 * t('nav.home', 'es') // 'Inicio'
 * t('nav.home', 'en') // 'Home'
 */
export function t(key: TranslationKey, lang: Lang): string {
  return translations[lang][key] || translations['en'][key] || key;
}

/**
 * Create a translation function bound to a specific language
 *
 * @param lang - Language code ('en' or 'es')
 * @returns A function that takes a translation key and returns translated string
 *
 * @example
 * const translate = useTranslations('es');
 * translate('nav.home') // 'Inicio'
 */
export function useTranslations(lang: Lang) {
  return function translate(key: TranslationKey): string {
    return translations[lang][key] || translations['en'][key] || key;
  };
}

/**
 * Helper function for static path generation
 *
 * @returns Array of static path objects for both languages
 *
 * @example
 * export function getStaticPaths() {
 *   return getStaticPathsForLanguages();
 * }
 */
export function getStaticPathsForLanguages() {
  return [
    { params: { lang: 'en' } },
    { params: { lang: 'es' } },
  ];
}
