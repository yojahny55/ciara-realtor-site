/**
 * i18n Configuration
 *
 * Language configuration constants for the realtor-site application.
 */

export const languages = {
  en: 'English',
  es: 'Español',
} as const;

export const defaultLang = 'en' as const;

export type Lang = keyof typeof languages;
