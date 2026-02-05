/**
 * i18n Routes Tests
 *
 * Unit tests for URL slug translation and alternate URL generation.
 */

import { describe, it, expect } from 'vitest';
import { routeMap, getAlternateUrl, getEnglishUrl } from '../src/i18n/routes';

describe('routeMap', () => {
  it('contains expected route mappings', () => {
    expect(routeMap['/about']).toBe('/sobre-ciara');
    expect(routeMap['/contact']).toBe('/contacto');
    expect(routeMap['/properties']).toBe('/propiedades');
    expect(routeMap['/guides']).toBe('/guias');
  });

  it('has consistent structure (all values are strings)', () => {
    Object.entries(routeMap).forEach(([en, es]) => {
      expect(typeof en).toBe('string');
      expect(typeof es).toBe('string');
      expect(en.startsWith('/')).toBe(true);
      expect(es.startsWith('/')).toBe(true);
    });
  });
});

describe('getAlternateUrl', () => {
  describe('English to Spanish translation', () => {
    it('translates mapped English path to Spanish', () => {
      expect(getAlternateUrl('/en/about/', 'en', 'es')).toBe('/es/sobre-ciara/');
      expect(getAlternateUrl('/en/contact/', 'en', 'es')).toBe('/es/contacto/');
      expect(getAlternateUrl('/en/properties/', 'en', 'es')).toBe('/es/propiedades/');
    });

    it('preserves unmapped paths', () => {
      expect(getAlternateUrl('/en/blog/', 'en', 'es')).toBe('/es/blog/');
      expect(getAlternateUrl('/en/some-page/', 'en', 'es')).toBe('/es/some-page/');
    });

    it('handles root/index path', () => {
      expect(getAlternateUrl('/en/', 'en', 'es')).toBe('/es/');
    });
  });

  describe('Spanish to English translation', () => {
    it('translates mapped Spanish path to English', () => {
      expect(getAlternateUrl('/es/sobre-ciara/', 'es', 'en')).toBe('/en/about/');
      expect(getAlternateUrl('/es/contacto/', 'es', 'en')).toBe('/en/contact/');
      expect(getAlternateUrl('/es/propiedades/', 'es', 'en')).toBe('/en/properties/');
    });

    it('preserves unmapped paths', () => {
      expect(getAlternateUrl('/es/blog/', 'es', 'en')).toBe('/en/blog/');
      expect(getAlternateUrl('/es/otra-pagina/', 'es', 'en')).toBe('/en/otra-pagina/');
    });
  });

  describe('edge cases', () => {
    it('handles paths without trailing slash', () => {
      expect(getAlternateUrl('/en/about', 'en', 'es')).toBe('/es/sobre-ciara/');
    });

    it('handles nested paths (preserves structure)', () => {
      expect(getAlternateUrl('/en/guides/buying/', 'en', 'es')).toBe('/es/guides/buying/');
    });
  });
});

describe('getEnglishUrl', () => {
  it('returns English path for English input', () => {
    expect(getEnglishUrl('/en/about/')).toBe('/en/about/');
    expect(getEnglishUrl('/en/contact/')).toBe('/en/contact/');
  });

  it('translates Spanish path to English', () => {
    expect(getEnglishUrl('/es/sobre-ciara/')).toBe('/en/about/');
    expect(getEnglishUrl('/es/contacto/')).toBe('/en/contact/');
    expect(getEnglishUrl('/es/propiedades/')).toBe('/en/properties/');
  });

  it('preserves unmapped paths', () => {
    expect(getEnglishUrl('/es/blog/')).toBe('/en/blog/');
    expect(getEnglishUrl('/en/unmapped/')).toBe('/en/unmapped/');
  });

  it('handles root path', () => {
    expect(getEnglishUrl('/en/')).toBe('/en/');
    expect(getEnglishUrl('/es/')).toBe('/en/');
  });
});
