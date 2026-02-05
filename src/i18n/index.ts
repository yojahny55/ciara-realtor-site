/**
 * i18n Module - Barrel Export
 *
 * Central export point for all i18n functionality.
 */

export { languages, defaultLang } from './config';
export type { Lang } from './config';

export { translations } from './translations';
export type { Translations, TranslationKey } from './translations';

export { getLangFromUrl, t, useTranslations, getStaticPathsForLanguages } from './utils';

export { routeMap, getAlternateUrl, getEnglishUrl } from './routes';
