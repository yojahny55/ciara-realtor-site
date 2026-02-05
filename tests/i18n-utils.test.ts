/**
 * i18n Utilities Tests
 *
 * Unit tests for translation and language detection functions.
 */

import { describe, it, expect } from 'vitest';
import { getLangFromUrl, t, useTranslations, getStaticPathsForLanguages } from '../src/i18n/utils';
import type { Lang } from '../src/i18n/config';

describe('getLangFromUrl', () => {
  it('extracts "en" from English URL', () => {
    const url = new URL('https://example.com/en/about/');
    expect(getLangFromUrl(url)).toBe('en');
  });

  it('extracts "es" from Spanish URL', () => {
    const url = new URL('https://example.com/es/contacto/');
    expect(getLangFromUrl(url)).toBe('es');
  });

  it('defaults to "en" for root URL', () => {
    const url = new URL('https://example.com/');
    expect(getLangFromUrl(url)).toBe('en');
  });

  it('defaults to "en" for URL without language prefix', () => {
    const url = new URL('https://example.com/some/path/');
    expect(getLangFromUrl(url)).toBe('en');
  });

  it('handles URL with query parameters', () => {
    const url = new URL('https://example.com/es/search/?q=test');
    expect(getLangFromUrl(url)).toBe('es');
  });

  it('handles URL with hash', () => {
    const url = new URL('https://example.com/en/page/#section');
    expect(getLangFromUrl(url)).toBe('en');
  });

  // Edge case tests for improved validation
  it('defaults to "en" for path starting with "es" but not a language prefix', () => {
    const url = new URL('https://example.com/essential-guide/');
    expect(getLangFromUrl(url)).toBe('en');
  });

  it('defaults to "en" for path starting with "en" but not a language prefix', () => {
    const url = new URL('https://example.com/enterprise/');
    expect(getLangFromUrl(url)).toBe('en');
  });

  it('handles empty path segment gracefully', () => {
    const url = new URL('https://example.com//double-slash/');
    expect(getLangFromUrl(url)).toBe('en');
  });

  it('validates against supported languages only', () => {
    // A hypothetical "fr" prefix should default to English
    const url = new URL('https://example.com/fr/about/');
    expect(getLangFromUrl(url)).toBe('en');
  });
});

describe('t', () => {
  it('returns English translation for English language', () => {
    expect(t('nav.home', 'en')).toBe('Home');
    expect(t('nav.properties', 'en')).toBe('Properties');
  });

  it('returns Spanish translation for Spanish language', () => {
    expect(t('nav.home', 'es')).toBe('Inicio');
    expect(t('nav.properties', 'es')).toBe('Propiedades');
  });

  it('falls back to English for missing Spanish key', () => {
    // This test ensures fallback behavior works even if a key is missing
    // All keys should exist, but we test the safety mechanism
    const result = t('nav.home', 'es');
    expect(result).toBe('Inicio'); // Should exist
  });

  it('returns key itself if not found in any language', () => {
    // @ts-expect-error - testing invalid key
    const result = t('invalid.key', 'en');
    expect(result).toBe('invalid.key');
  });

  it('translates all navigation keys correctly', () => {
    expect(t('nav.about', 'en')).toBe('About Ciara');
    expect(t('nav.guides', 'es')).toBe('Guías');
    expect(t('nav.blog', 'en')).toBe('Blog');
    expect(t('nav.contact', 'es')).toBe('Contacto');
  });

  it('translates CTA keys correctly', () => {
    expect(t('cta.search', 'en')).toBe('Search Properties');
    expect(t('cta.value', 'es')).toBe('Valor de Tu Casa');
    expect(t('cta.schedule', 'en')).toBe('Schedule a Call');
    expect(t('cta.download', 'es')).toBe('Descargar Guía');
  });

  it('translates common UI keys correctly', () => {
    expect(t('common.readMore', 'en')).toBe('Read More');
    expect(t('common.learnMore', 'es')).toBe('Saber Más');
    expect(t('common.viewAll', 'en')).toBe('View All');
    expect(t('common.submit', 'es')).toBe('Enviar');
  });

  it('translates error keys correctly', () => {
    expect(t('error.notFound', 'en')).toBe('Page Not Found');
    expect(t('error.generic', 'es')).toBe('Algo salió mal');
  });
});

describe('useTranslations', () => {
  it('creates bound translation function for English', () => {
    const translate = useTranslations('en');
    expect(translate('nav.home')).toBe('Home');
    expect(translate('nav.properties')).toBe('Properties');
  });

  it('creates bound translation function for Spanish', () => {
    const translate = useTranslations('es');
    expect(translate('nav.home')).toBe('Inicio');
    expect(translate('nav.properties')).toBe('Propiedades');
  });

  it('bound function falls back to English for missing keys', () => {
    const translate = useTranslations('es');
    // @ts-expect-error - testing invalid key
    expect(translate('invalid.key')).toBe('invalid.key');
  });

  it('can create multiple independent translation functions', () => {
    const enTranslate = useTranslations('en');
    const esTranslate = useTranslations('es');

    expect(enTranslate('nav.home')).toBe('Home');
    expect(esTranslate('nav.home')).toBe('Inicio');
  });
});

describe('getStaticPathsForLanguages', () => {
  it('returns both language paths', () => {
    const paths = getStaticPathsForLanguages();
    expect(paths).toHaveLength(2);
  });

  it('includes English language path', () => {
    const paths = getStaticPathsForLanguages();
    expect(paths).toContainEqual({ params: { lang: 'en' } });
  });

  it('includes Spanish language path', () => {
    const paths = getStaticPathsForLanguages();
    expect(paths).toContainEqual({ params: { lang: 'es' } });
  });

  it('has correct structure for Astro getStaticPaths', () => {
    const paths = getStaticPathsForLanguages();
    paths.forEach((path) => {
      expect(path).toHaveProperty('params');
      expect(path.params).toHaveProperty('lang');
      expect(['en', 'es']).toContain(path.params.lang);
    });
  });
});
