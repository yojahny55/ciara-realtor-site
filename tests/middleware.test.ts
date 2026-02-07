import { describe, it, expect } from 'vitest';
import { detectLanguage, parseAcceptLanguage } from '@/lib/language-detection';

/**
 * Middleware Tests - Language Detection Logic
 *
 * Tests for detectLanguage() and parseAcceptLanguage() which implement:
 * - Browser language detection via Accept-Language header with q-value parsing
 * - Cookie-based preference persistence
 * - Redirect logic from root / to /{lang}/
 */

describe('parseAcceptLanguage', () => {
  it('returns "es" for simple "es" header', () => {
    expect(parseAcceptLanguage('es')).toBe('es');
  });

  it('returns "es" for "es-MX" header', () => {
    expect(parseAcceptLanguage('es-MX')).toBe('es');
  });

  it('returns "en" for simple "en" header', () => {
    expect(parseAcceptLanguage('en')).toBe('en');
  });

  it('returns "en" for "en-US" header', () => {
    expect(parseAcceptLanguage('en-US')).toBe('en');
  });

  it('returns "en" for empty header', () => {
    expect(parseAcceptLanguage('')).toBe('en');
  });

  it('returns "en" for unsupported language only', () => {
    expect(parseAcceptLanguage('fr-FR')).toBe('en');
  });

  it('returns "en" when en has higher q-value than es', () => {
    // en-US has implicit q=1.0, es has q=0.9 → English preferred
    expect(parseAcceptLanguage('en-US,es;q=0.9')).toBe('en');
  });

  it('returns "es" when es has higher q-value than en', () => {
    expect(parseAcceptLanguage('es;q=0.9,en;q=0.8')).toBe('es');
  });

  it('returns "en" when en-GB has implicit q=1.0 and es-MX has q=0.8', () => {
    expect(parseAcceptLanguage('en-GB,es-MX;q=0.8,en;q=0.6')).toBe('en');
  });

  it('returns "es" when es has q=0.9 and en has q=0.8', () => {
    expect(parseAcceptLanguage('en;q=0.8,es;q=0.9')).toBe('es');
  });

  it('returns "es" when es-MX is the first supported language at equal q', () => {
    expect(parseAcceptLanguage('fr;q=1.0,es-MX;q=1.0,en;q=0.5')).toBe('es');
  });

  it('returns "en" when only en appears among supported languages', () => {
    expect(parseAcceptLanguage('fr-FR,de-DE,en-US;q=0.5')).toBe('en');
  });
});

describe('Middleware - Language Detection', () => {
  describe('AC #1: Spanish browser detection redirects to /es/', () => {
    it('should detect Spanish when Accept-Language is "es"', () => {
      const result = detectLanguage('/', undefined, 'es');

      expect(result).toEqual({
        lang: 'es',
        shouldSetCookie: true,
      });
    });

    it('should detect Spanish when Accept-Language is "es-MX"', () => {
      const result = detectLanguage('/', undefined, 'es-MX');

      expect(result).toEqual({
        lang: 'es',
        shouldSetCookie: true,
      });
    });

    it('should detect Spanish when Accept-Language is "es-ES"', () => {
      const result = detectLanguage('/', undefined, 'es-ES');

      expect(result).toEqual({
        lang: 'es',
        shouldSetCookie: true,
      });
    });

    it('should detect English when es is secondary with lower q-value', () => {
      // en-US (q=1.0) > es (q=0.9) → English is primary
      const result = detectLanguage('/', undefined, 'en-US,es;q=0.9');

      expect(result).toEqual({
        lang: 'en',
        shouldSetCookie: true,
      });
    });

    it('should detect Spanish when es has higher q-value than en', () => {
      const result = detectLanguage('/', undefined, 'es;q=0.9,en;q=0.7');

      expect(result).toEqual({
        lang: 'es',
        shouldSetCookie: true,
      });
    });
  });

  describe('AC #2: English browser detection redirects to /en/', () => {
    it('should detect English when Accept-Language is "en"', () => {
      const result = detectLanguage('/', undefined, 'en');

      expect(result).toEqual({
        lang: 'en',
        shouldSetCookie: true,
      });
    });

    it('should detect English when Accept-Language is "en-US"', () => {
      const result = detectLanguage('/', undefined, 'en-US');

      expect(result).toEqual({
        lang: 'en',
        shouldSetCookie: true,
      });
    });

    it('should default to English when Accept-Language is empty', () => {
      const result = detectLanguage('/', undefined, '');

      expect(result).toEqual({
        lang: 'en',
        shouldSetCookie: true,
      });
    });

    it('should default to English when Accept-Language is unsupported language (fr)', () => {
      const result = detectLanguage('/', undefined, 'fr-FR');

      expect(result).toEqual({
        lang: 'en',
        shouldSetCookie: true,
      });
    });

    it('should default to English when Accept-Language is unsupported language (de)', () => {
      const result = detectLanguage('/', undefined, 'de-DE');

      expect(result).toEqual({
        lang: 'en',
        shouldSetCookie: true,
      });
    });

    it('should detect English when en-GB is primary despite es-MX secondary', () => {
      const result = detectLanguage('/', undefined, 'en-GB,es-MX;q=0.8,en;q=0.6');

      expect(result).toEqual({
        lang: 'en',
        shouldSetCookie: true,
      });
    });
  });

  describe('AC #4: Cookie preference takes priority over browser detection', () => {
    it('should use cookie value "en" even when Accept-Language is "es"', () => {
      const result = detectLanguage('/', 'en', 'es');

      expect(result).toEqual({
        lang: 'en',
        shouldSetCookie: false,
      });
    });

    it('should use cookie value "es" even when Accept-Language is "en"', () => {
      const result = detectLanguage('/', 'es', 'en');

      expect(result).toEqual({
        lang: 'es',
        shouldSetCookie: false,
      });
    });

    it('should NOT set cookie when using existing valid cookie', () => {
      const result = detectLanguage('/', 'en', 'es');

      expect(result?.shouldSetCookie).toBe(false);
    });

    it('should fallback to Accept-Language when cookie value is invalid', () => {
      const result = detectLanguage('/', 'invalid', 'es');

      expect(result).toEqual({
        lang: 'es',
        shouldSetCookie: true,
      });
    });

    it('should fallback to Accept-Language when cookie value is undefined', () => {
      const result = detectLanguage('/', undefined, 'es-MX');

      expect(result).toEqual({
        lang: 'es',
        shouldSetCookie: true,
      });
    });
  });

  describe('Middleware only intercepts root route', () => {
    it('should return null for /en/ route', () => {
      const result = detectLanguage('/en/', undefined, 'es');

      expect(result).toBeNull();
    });

    it('should return null for /es/ route', () => {
      const result = detectLanguage('/es/', 'en', 'es');

      expect(result).toBeNull();
    });

    it('should return null for /en/about route', () => {
      const result = detectLanguage('/en/about', undefined, 'es');

      expect(result).toBeNull();
    });

    it('should return null for /es/contacto route', () => {
      const result = detectLanguage('/es/contacto', 'en', 'en-US');

      expect(result).toBeNull();
    });

    it('should return null for /some-other-page route', () => {
      const result = detectLanguage('/some-other-page', undefined, 'es');

      expect(result).toBeNull();
    });
  });

  describe('Edge cases', () => {
    it('should handle cookie with extra whitespace as invalid', () => {
      const result = detectLanguage('/', ' es ', 'en');

      // Extra whitespace makes cookie invalid, should fallback to Accept-Language
      expect(result).toEqual({
        lang: 'en',
        shouldSetCookie: true,
      });
    });

    it('should handle Accept-Language with quality values respecting priority', () => {
      const result = detectLanguage('/', undefined, 'en;q=0.8,es;q=0.9');

      expect(result).toEqual({
        lang: 'es',
        shouldSetCookie: true,
      });
    });

    it('should process root route "/"', () => {
      const result = detectLanguage('/', undefined, 'es');

      expect(result).not.toBeNull();
    });
  });
});
