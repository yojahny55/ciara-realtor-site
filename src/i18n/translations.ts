/**
 * Translation Strings
 *
 * UI string translations for English and Spanish.
 * All keys must exist in both languages.
 */

export interface Translations {
  // Navigation
  'nav.home': string;
  'nav.properties': string;
  'nav.about': string;
  'nav.guides': string;
  'nav.blog': string;
  'nav.contact': string;

  // Call-to-Actions
  'cta.search': string;
  'cta.value': string;
  'cta.schedule': string;
  'cta.download': string;

  // Common UI
  'common.readMore': string;
  'common.learnMore': string;
  'common.viewAll': string;
  'common.submit': string;

  // Errors
  'error.notFound': string;
  'error.generic': string;
}

export const translations: Record<'en' | 'es', Translations> = {
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.properties': 'Properties',
    'nav.about': 'About Ciara',
    'nav.guides': 'Guides',
    'nav.blog': 'Blog',
    'nav.contact': 'Contact',

    // Call-to-Actions
    'cta.search': 'Search Properties',
    'cta.value': 'Get Home Value',
    'cta.schedule': 'Schedule a Call',
    'cta.download': 'Download Guide',

    // Common UI
    'common.readMore': 'Read More',
    'common.learnMore': 'Learn More',
    'common.viewAll': 'View All',
    'common.submit': 'Submit',

    // Errors
    'error.notFound': 'Page Not Found',
    'error.generic': 'Something went wrong',
  },
  es: {
    // Navigation
    'nav.home': 'Inicio',
    'nav.properties': 'Propiedades',
    'nav.about': 'Sobre Ciara',
    'nav.guides': 'Guías',
    'nav.blog': 'Blog',
    'nav.contact': 'Contacto',

    // Call-to-Actions
    'cta.search': 'Buscar Propiedades',
    'cta.value': 'Valor de Tu Casa',
    'cta.schedule': 'Programar Llamada',
    'cta.download': 'Descargar Guía',

    // Common UI
    'common.readMore': 'Leer Más',
    'common.learnMore': 'Saber Más',
    'common.viewAll': 'Ver Todo',
    'common.submit': 'Enviar',

    // Errors
    'error.notFound': 'Página No Encontrada',
    'error.generic': 'Algo salió mal',
  },
};

export type TranslationKey = keyof Translations;
