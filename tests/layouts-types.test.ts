import { describe, it, expect } from 'vitest';
import { maxWidthClasses } from '../src/layouts/types';
import type { BaseLayoutProps, PageLayoutProps } from '../src/layouts/types';

describe('Layout Types', () => {
  describe('maxWidthClasses', () => {
    it('should export all required max-width mappings', () => {
      expect(maxWidthClasses.sm).toBe('max-w-screen-sm');
      expect(maxWidthClasses.md).toBe('max-w-screen-md');
      expect(maxWidthClasses.lg).toBe('max-w-screen-lg');
      expect(maxWidthClasses.xl).toBe('max-w-screen-xl');
      expect(maxWidthClasses.full).toBe('max-w-full');
    });

    it('should be a readonly object', () => {
      // TypeScript enforces this at compile time via `as const`
      // Runtime check that all expected keys exist
      const keys = Object.keys(maxWidthClasses);
      expect(keys).toContain('sm');
      expect(keys).toContain('md');
      expect(keys).toContain('lg');
      expect(keys).toContain('xl');
      expect(keys).toContain('full');
      expect(keys.length).toBe(5);
    });
  });

  describe('BaseLayoutProps type', () => {
    it('should allow valid BaseLayoutProps objects', () => {
      // Type-check only - if this compiles, the types are correct
      const validProps: BaseLayoutProps = {
        title: 'Test Page',
        description: 'Test description',
      };
      expect(validProps.title).toBe('Test Page');
    });

    it('should allow all optional properties', () => {
      const fullProps: BaseLayoutProps = {
        title: 'Test',
        description: 'Desc',
        image: '/og.jpg',
        canonical: 'https://example.com',
        noindex: true,
        type: 'article',
      };
      expect(fullProps.type).toBe('article');
    });
  });

  describe('PageLayoutProps type', () => {
    it('should extend BaseLayoutProps', () => {
      // Type-check: PageLayoutProps must include all Base properties
      const pageProps: PageLayoutProps = {
        title: 'Page Title',
        description: 'Page description',
        maxWidth: 'lg',
        noPadding: false,
      };
      expect(pageProps.maxWidth).toBe('lg');
    });

    it('should allow page-specific optional properties', () => {
      const pageProps: PageLayoutProps = {
        title: 'Title',
        description: 'Desc',
        maxWidth: 'xl',
        noPadding: true,
      };
      expect(pageProps.noPadding).toBe(true);
    });
  });
});
