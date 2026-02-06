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
  'nav.buy': string;
  'nav.sell': string;
  'nav.rent': string;
  'nav.about': string;
  'nav.guides': string;
  'nav.blog': string;
  'nav.contact': string;

  // Header
  'header.contactCta': string;
  'header.phone': string;
  'header.menuOpen': string;
  'header.menuClose': string;
  'header.skipToContent': string;

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
    'nav.buy': 'Buy',
    'nav.sell': 'Sell',
    'nav.rent': 'Rent',
    'nav.about': 'About Ciara',
    'nav.guides': 'Guides',
    'nav.blog': 'Blog',
    'nav.contact': 'Contact',

    // Header
    'header.contactCta': 'Contact Maria',
    'header.phone': 'Call us',
    'header.menuOpen': 'Open menu',
    'header.menuClose': 'Close menu',
    'header.skipToContent': 'Skip to content',

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
    'nav.buy': 'Comprar',
    'nav.sell': 'Vender',
    'nav.rent': 'Alquilar',
    'nav.about': 'Sobre Ciara',
    'nav.guides': 'Guías',
    'nav.blog': 'Blog',
    'nav.contact': 'Contacto',

    // Header
    'header.contactCta': 'Contactar a Maria',
    'header.phone': 'Llamenos',
    'header.menuOpen': 'Abrir menu',
    'header.menuClose': 'Cerrar menu',
    'header.skipToContent': 'Saltar al contenido',

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
