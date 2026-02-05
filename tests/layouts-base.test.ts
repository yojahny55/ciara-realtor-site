import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

/**
 * Helper to test hreflang URL generation logic
 * Mirrors the logic in Base.astro for unit testing
 */
function generateHreflangUrls(currentPath: string) {
  const siteUrl = 'https://ciararuiz.com';
  const stripLangPrefix = (path: string): string => {
    return path.replace(/^\/(en|es)\//, '/');
  };
  const basePath = stripLangPrefix(currentPath);
  const enPath = `/en${basePath}`;
  const esPath = `/es${basePath}`;
  return {
    enUrl: `${siteUrl}${enPath}`,
    esUrl: `${siteUrl}${esPath}`,
    defaultUrl: `${siteUrl}/en/`,
  };
}

describe('Hreflang URL Generation Logic', () => {
  it('should generate correct URLs for path without language prefix', () => {
    const result = generateHreflangUrls('/about/');
    expect(result.enUrl).toBe('https://ciararuiz.com/en/about/');
    expect(result.esUrl).toBe('https://ciararuiz.com/es/about/');
  });

  it('should generate correct URLs for path with /en/ prefix', () => {
    const result = generateHreflangUrls('/en/about/');
    expect(result.enUrl).toBe('https://ciararuiz.com/en/about/');
    expect(result.esUrl).toBe('https://ciararuiz.com/es/about/');
  });

  it('should generate correct URLs for path with /es/ prefix', () => {
    const result = generateHreflangUrls('/es/contacto/');
    expect(result.enUrl).toBe('https://ciararuiz.com/en/contacto/');
    expect(result.esUrl).toBe('https://ciararuiz.com/es/contacto/');
  });

  it('should handle root path correctly', () => {
    const result = generateHreflangUrls('/');
    expect(result.enUrl).toBe('https://ciararuiz.com/en/');
    expect(result.esUrl).toBe('https://ciararuiz.com/es/');
  });

  it('should handle nested paths correctly', () => {
    const result = generateHreflangUrls('/en/properties/123/');
    expect(result.enUrl).toBe('https://ciararuiz.com/en/properties/123/');
    expect(result.esUrl).toBe('https://ciararuiz.com/es/properties/123/');
  });
});

describe('Base.astro Layout', () => {
  const baseLayoutPath = resolve(__dirname, '../src/layouts/Base.astro');

  it('should exist in src/layouts/', () => {
    expect(() => readFileSync(baseLayoutPath, 'utf-8')).not.toThrow();
  });

  it('should import and extend BaseLayoutProps from types.ts', () => {
    const content = readFileSync(baseLayoutPath, 'utf-8');

    // Check for type import and Props interface
    expect(content).toContain("import type { BaseLayoutProps } from './types'");
    expect(content).toContain('interface Props extends BaseLayoutProps');
  });

  it('should have HTML5 document structure', () => {
    const content = readFileSync(baseLayoutPath, 'utf-8');

    expect(content).toContain('<!DOCTYPE html>');
    expect(content).toContain('<html');
    expect(content).toContain('<head>');
    expect(content).toContain('<body>');
  });

  it('should dynamically set lang attribute from Astro.currentLocale', () => {
    const content = readFileSync(baseLayoutPath, 'utf-8');

    expect(content).toContain('Astro.currentLocale');
    expect(content).toContain('<html lang={');
  });

  it('should include meta charset and viewport tags', () => {
    const content = readFileSync(baseLayoutPath, 'utf-8');

    expect(content).toContain('charset="utf-8"');
    expect(content).toContain('viewport');
    expect(content).toContain('width=device-width');
  });

  it('should import global.css stylesheet', () => {
    const content = readFileSync(baseLayoutPath, 'utf-8');

    expect(content).toContain("import '../styles/global.css'");
  });

  it('should include font preload links with crossorigin', () => {
    const content = readFileSync(baseLayoutPath, 'utf-8');

    expect(content).toContain('rel="preload"');
    expect(content).toContain('as="font"');
    expect(content).toContain('type="font/woff2"');
    expect(content).toContain('crossorigin');
    expect(content).toContain('cormorant-garamond');
    expect(content).toContain('dm-sans');
  });

  it('should include SEO meta tags (title, description, OG, Twitter)', () => {
    const content = readFileSync(baseLayoutPath, 'utf-8');

    // Title tag
    expect(content).toContain('<title>');
    expect(content).toContain('Ciara Ruiz Real Estate');

    // Meta description
    expect(content).toContain('name="description"');

    // Open Graph
    expect(content).toContain('property="og:title"');
    expect(content).toContain('property="og:description"');
    expect(content).toContain('property="og:image"');
    expect(content).toContain('property="og:url"');
    expect(content).toContain('property="og:type"');

    // Twitter Card
    expect(content).toContain('name="twitter:card"');
    expect(content).toContain('name="twitter:title"');
    expect(content).toContain('name="twitter:description"');
    expect(content).toContain('name="twitter:image"');
  });

  it('should include canonical URL tag', () => {
    const content = readFileSync(baseLayoutPath, 'utf-8');

    expect(content).toContain('rel="canonical"');
  });

  it('should include hreflang tags for bilingual SEO', () => {
    const content = readFileSync(baseLayoutPath, 'utf-8');

    expect(content).toContain('rel="alternate"');
    expect(content).toContain('hreflang="en"');
    expect(content).toContain('hreflang="es"');
    expect(content).toContain('hreflang="x-default"');
    expect(content).toContain('https://ciararuiz.com');
  });

  it('should include skip-to-content link for accessibility', () => {
    const content = readFileSync(baseLayoutPath, 'utf-8');

    expect(content).toContain('skip');
    expect(content).toContain('#main-content');
  });

  it('should have a slot for page content', () => {
    const content = readFileSync(baseLayoutPath, 'utf-8');

    expect(content).toContain('<slot');
  });
});
