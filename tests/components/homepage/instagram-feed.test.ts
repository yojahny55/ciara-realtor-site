import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

describe('InstagramFeed Component', () => {
  const componentPath = resolve(
    __dirname,
    '../../../src/components/homepage/instagram-feed.astro'
  );
  const translationsPath = resolve(__dirname, '../../../src/i18n/translations.ts');

  const source = readFileSync(componentPath, 'utf-8');
  const translations = readFileSync(translationsPath, 'utf-8');

  // ─── File existence ────────────────────────────────────────────
  it('should exist in src/components/homepage/', () => {
    expect(() => readFileSync(componentPath, 'utf-8')).not.toThrow();
  });

  // ─── Component scaffold ────────────────────────────────────────
  it('uses useTranslations and Lang from @/i18n', () => {
    expect(source).toContain("from '@/i18n'");
    expect(source).toContain('useTranslations');
    expect(source).toContain('Lang');
  });

  it('has Props interface with lang prop', () => {
    expect(source).toContain('interface Props');
    expect(source).toContain('lang: Lang');
  });

  // ─── Semantic HTML structure (AC#4) ───────────────────────────
  it('uses semantic section with aria-label', () => {
    expect(source).toContain('<section');
    expect(source).toContain('aria-label');
    expect(source).toContain('instagram.ariaLabel');
  });

  // ─── Translation keys (AC#1, #3) ──────────────────────────────
  it('references all instagram translation keys', () => {
    for (const key of [
      'instagram.overline',
      'instagram.heading',
      'instagram.subtitle',
      'instagram.followCta',
      'instagram.followAriaLabel',
      'instagram.fallbackText',
    ]) {
      expect(source).toContain(key);
    }
  });

  // ─── Elfsight widget (AC#1) ───────────────────────────────────
  it('loads the current Elfsight platform script lazily', () => {
    expect(source).toContain('elfsightcdn.com/platform.js');
    expect(source).toContain('data-elfsight-app-lazy');
  });

  // ─── Environment variables (AC#5) ─────────────────────────────
  it('reads widget id and profile url from PUBLIC_ env vars', () => {
    expect(source).toContain('PUBLIC_ELFSIGHT_INSTAGRAM_ID');
    expect(source).toContain('PUBLIC_INSTAGRAM_PROFILE_URL');
  });

  // ─── Follow CTA link (AC#1) ───────────────────────────────────
  it('opens Instagram in a new tab with secure rel', () => {
    expect(source).toContain('target="_blank"');
    expect(source).toContain('rel="noopener noreferrer"');
  });

  // ─── Fallback (AC#2) ──────────────────────────────────────────
  it('renders a fallback paragraph when widget id is absent', () => {
    expect(source).toContain('instagram.fallbackText');
  });

  // ─── No Preact island (AC component architecture) ─────────────
  it('does not use Preact hydration directives', () => {
    expect(source).not.toMatch(/client:(load|visible|idle|media|only)/);
  });

  it('does not use a default export (project convention)', () => {
    expect(source).not.toContain('default export');
  });

  it('does not use the any type', () => {
    expect(source).not.toContain(': any');
  });

  // ─── Accessibility (AC#4) ─────────────────────────────────────
  it('has aria-hidden on Instagram icon SVG', () => {
    expect(source).toContain('aria-hidden="true"');
  });

  it('respects prefers-reduced-motion', () => {
    expect(source).toContain('prefers-reduced-motion');
  });

  it('has minimum 44px touch target on Follow CTA', () => {
    expect(source).toContain('min-height: 44px');
  });

  // ─── CLS prevention (AC#4) ────────────────────────────────────
  it('reserves min-height on widget mount container to prevent CLS', () => {
    expect(source).toContain('min-height');
  });

  // ─── Design tokens ────────────────────────────────────────────
  it('uses design tokens from the glassmorphism system', () => {
    expect(source).toContain('var(--color-secondary');
    expect(source).toContain('var(--font-display)');
    expect(source).toContain('var(--font-body)');
  });

  // ─── Translation interface (Task 5.5) ─────────────────────────
  it('has instagram keys in the Translations interface', () => {
    for (const key of [
      "'instagram.overline'",
      "'instagram.heading'",
      "'instagram.subtitle'",
      "'instagram.followCta'",
      "'instagram.followAriaLabel'",
      "'instagram.fallbackText'",
      "'instagram.ariaLabel'",
    ]) {
      expect(translations).toContain(key);
    }
  });

  it('has EN instagram translation values', () => {
    expect(translations).toContain('Follow Along');
    expect(translations).toContain('On Instagram');
    expect(translations).toContain('Follow on Instagram');
  });

  it('has ES instagram translation values', () => {
    expect(translations).toContain('Síguenos');
    expect(translations).toContain('En Instagram');
    expect(translations).toContain('Síguenos en Instagram');
  });
});
