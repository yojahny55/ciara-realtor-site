import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

describe('Page.astro Layout', () => {
  const pageLayoutPath = resolve(__dirname, '../src/layouts/Page.astro');

  it('should exist in src/layouts/', () => {
    expect(() => readFileSync(pageLayoutPath, 'utf-8')).not.toThrow();
  });

  it('should import and use Base.astro layout', () => {
    const content = readFileSync(pageLayoutPath, 'utf-8');

    expect(content).toContain("import Base from './Base.astro'");
    expect(content).toContain('<Base');
  });

  it('should import and extend PageLayoutProps from types.ts', () => {
    const content = readFileSync(pageLayoutPath, 'utf-8');

    // Check for type imports
    expect(content).toContain("import type { PageLayoutProps } from './types'");
    expect(content).toContain("import { maxWidthClasses } from './types'");
    expect(content).toContain('interface Props extends PageLayoutProps');
  });

  it('should include named slot for header', () => {
    const content = readFileSync(pageLayoutPath, 'utf-8');

    expect(content).toContain('<slot name="header"');
  });

  it('should include named slot for footer', () => {
    const content = readFileSync(pageLayoutPath, 'utf-8');

    expect(content).toContain('<slot name="footer"');
  });

  it('should have semantic main element with id for skip link', () => {
    const content = readFileSync(pageLayoutPath, 'utf-8');

    expect(content).toContain('<main');
    expect(content).toContain('id="main-content"');
  });

  it('should have main content area with max-width container via imported classes', () => {
    const content = readFileSync(pageLayoutPath, 'utf-8');

    // Max-width classes are now imported from types.ts
    expect(content).toContain('maxWidthClasses[maxWidth]');
    expect(content).toContain('containerClass');
  });

  it('should apply responsive padding using design tokens', () => {
    const content = readFileSync(pageLayoutPath, 'utf-8');

    // Check for padding classes
    expect(content).toContain('px-4 md:px-6 lg:px-8');
  });

  it('should build class list without trailing spaces (filter empty strings)', () => {
    const content = readFileSync(pageLayoutPath, 'utf-8');

    // Check that classes are built using filter to avoid trailing spaces
    expect(content).toContain('.filter(Boolean).join');
  });

  it('should support dynamic maxWidth prop values', () => {
    const content = readFileSync(pageLayoutPath, 'utf-8');

    // Should handle maxWidth prop logic
    expect(content).toContain('maxWidth');
  });

  it('should have default slot for main content', () => {
    const content = readFileSync(pageLayoutPath, 'utf-8');

    expect(content).toContain('<slot />');
  });
});
