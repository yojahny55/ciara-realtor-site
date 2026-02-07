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

  // Footer
  'footer.brand.description': string;
  'footer.quickLinks': string;
  'footer.services': string;
  'footer.contact': string;
  'footer.buyHome': string;
  'footer.sellHome': string;
  'footer.homeValuation': string;
  'footer.relocation': string;
  'footer.clientReviews': string;
  'footer.neighborhoods': string;
  'footer.copyright': string;
  'footer.privacy': string;
  'footer.terms': string;
  'footer.equalHousing': string;
  'footer.followUs': string;

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

    // Footer
    'footer.brand.description': 'Your trusted partner in finding the perfect home in Tampa Bay\'s most desirable neighborhoods.',
    'footer.quickLinks': 'Quick Links',
    'footer.services': 'Services',
    'footer.contact': 'Contact',
    'footer.buyHome': 'Buy a Home',
    'footer.sellHome': 'Sell Your Home',
    'footer.homeValuation': 'Home Valuation',
    'footer.relocation': 'Relocation',
    'footer.clientReviews': 'Client Reviews',
    'footer.neighborhoods': 'Neighborhoods',
    'footer.copyright': '© {year} Ciara Ruiz Real Estate. All rights reserved.',
    'footer.privacy': 'Privacy Policy',
    'footer.terms': 'Terms of Service',
    'footer.equalHousing': 'Equal Housing Opportunity',
    'footer.followUs': 'Follow Us',

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

    // Footer
    'footer.brand.description': 'Su socia de confianza para encontrar el hogar perfecto en los vecindarios más deseados de Tampa Bay.',
    'footer.quickLinks': 'Enlaces Rápidos',
    'footer.services': 'Servicios',
    'footer.contact': 'Contacto',
    'footer.buyHome': 'Comprar una Casa',
    'footer.sellHome': 'Vender su Casa',
    'footer.homeValuation': 'Valuación de Casa',
    'footer.relocation': 'Reubicación',
    'footer.clientReviews': 'Reseñas de Clientes',
    'footer.neighborhoods': 'Vecindarios',
    'footer.copyright': '© {year} Ciara Ruiz Real Estate. Todos los derechos reservados.',
    'footer.privacy': 'Política de Privacidad',
    'footer.terms': 'Términos de Servicio',
    'footer.equalHousing': 'Igualdad de Oportunidades de Vivienda',
    'footer.followUs': 'Síguenos',

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
