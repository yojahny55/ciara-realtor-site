/**
 * Tests for Footer Translation Keys
 *
 * Validates that all footer-related translation keys exist in both EN and ES.
 */

import { describe, it, expect } from 'vitest';
import { translations } from '@/i18n/translations';

describe('Footer translations', () => {
  it('should have all footer keys in English', () => {
    const t = translations.en;

    // Footer brand
    expect(t['footer.brand.tagline']).toBe('Tampa Bay Real Estate');
    expect(t['footer.brand.description']).toBeDefined();
    expect(t['footer.brand.description']).toContain('trusted partner');

    // Footer section headings
    expect(t['footer.quickLinks']).toBe('Quick Links');
    expect(t['footer.services']).toBe('Services');
    expect(t['footer.contact']).toBe('Contact');

    // Footer services
    expect(t['footer.buyHome']).toBe('Buy a Home');
    expect(t['footer.sellHome']).toBe('Sell Your Home');
    expect(t['footer.homeValuation']).toBe('Home Valuation');
    expect(t['footer.relocation']).toBe('Relocation');

    // Footer quick links
    expect(t['footer.clientReviews']).toBe('Client Reviews');
    expect(t['footer.neighborhoods']).toBe('Neighborhoods');

    // Footer bottom
    expect(t['footer.copyright']).toBeDefined();
    expect(t['footer.copyright']).toContain('{year}');
    expect(t['footer.privacy']).toBe('Privacy Policy');
    expect(t['footer.terms']).toBe('Terms of Service');
    expect(t['footer.equalHousing']).toBe('Equal Housing Opportunity');
    expect(t['footer.followUs']).toBe('Follow Us');
  });

  it('should have all footer keys in Spanish', () => {
    const t = translations.es;

    // Footer brand
    expect(t['footer.brand.tagline']).toBe('Bienes Raíces en Tampa Bay');
    expect(t['footer.brand.description']).toBeDefined();
    expect(t['footer.brand.description']).toContain('socia de confianza');

    // Footer section headings
    expect(t['footer.quickLinks']).toBe('Enlaces Rápidos');
    expect(t['footer.services']).toBe('Servicios');
    expect(t['footer.contact']).toBe('Contacto');

    // Footer services
    expect(t['footer.buyHome']).toBe('Comprar una Casa');
    expect(t['footer.sellHome']).toBe('Vender su Casa');
    expect(t['footer.homeValuation']).toBe('Valuación de Casa');
    expect(t['footer.relocation']).toBe('Reubicación');

    // Footer quick links
    expect(t['footer.clientReviews']).toBe('Reseñas de Clientes');
    expect(t['footer.neighborhoods']).toBe('Vecindarios');

    // Footer bottom
    expect(t['footer.copyright']).toBeDefined();
    expect(t['footer.copyright']).toContain('{year}');
    expect(t['footer.privacy']).toBe('Política de Privacidad');
    expect(t['footer.terms']).toBe('Términos de Servicio');
    expect(t['footer.equalHousing']).toBe('Igualdad de Oportunidades de Vivienda');
    expect(t['footer.followUs']).toBe('Síguenos');
  });
});
