/**
 * Hero Section Component Tests
 *
 * File-based string matching tests (header.test.ts pattern).
 * Covers structure, translations, accessibility, design system, and demo8 aesthetic.
 */

import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

describe('Hero Section Component', () => {
  const componentPath = resolve(__dirname, '../../../src/components/homepage/hero-section.astro');
  const translationsPath = resolve(__dirname, '../../../src/i18n/translations.ts');

  const content = readFileSync(componentPath, 'utf-8');
  const translations = readFileSync(translationsPath, 'utf-8');

  // ─── File existence ───────────────────────────────────────────
  it('should exist in src/components/homepage/', () => {
    expect(() => readFileSync(componentPath, 'utf-8')).not.toThrow();
  });

  // ─── Component scaffold ───────────────────────────────────────
  it('should have Props interface with lang prop', () => {
    expect(content).toContain('interface Props');
    expect(content).toContain('lang: Lang');
  });

  it('should import useTranslations and Lang from i18n', () => {
    expect(content).toContain("import { useTranslations } from '@/i18n'");
    expect(content).toContain("import type { Lang } from '@/i18n'");
  });

  // ─── Translation keys (AC#1) ──────────────────────────────────
  it('should use hero.headline translation key', () => {
    expect(content).toContain("t('hero.headline')");
  });

  it('should use hero.subheadline translation key', () => {
    expect(content).toContain("t('hero.subheadline')");
  });

  it('should use hero.ctaBuying translation key', () => {
    expect(content).toContain("t('hero.ctaBuying')");
  });

  it('should use hero.ctaSelling translation key', () => {
    expect(content).toContain("t('hero.ctaSelling')");
  });

  // ─── Translation values (AC#1) ────────────────────────────────
  it('should have correct English headline in translations', () => {
    expect(translations).toContain("Buying a home is scary. We've got you.");
  });

  it('should have correct Spanish headline in translations', () => {
    expect(translations).toContain('Comprar una casa da miedo. Estamos contigo.');
  });

  it('should have correct English CTA text in translations', () => {
    expect(translations).toContain("I'm Buying");
    expect(translations).toContain("I'm Selling");
  });

  it('should have correct Spanish CTA text in translations', () => {
    expect(translations).toContain('Estoy Comprando');
    expect(translations).toContain('Estoy Vendiendo');
  });

  it('should have all hero translation keys in Translations interface', () => {
    expect(translations).toContain("'hero.headline'");
    expect(translations).toContain("'hero.subheadline'");
    expect(translations).toContain("'hero.ctaBuying'");
    expect(translations).toContain("'hero.ctaSelling'");
    expect(translations).toContain("'hero.eyebrow'");
    expect(translations).toContain("'hero.cardLabel'");
    expect(translations).toContain("'hero.stat1Label'");
    expect(translations).toContain("'hero.stat2Label'");
  });

  it('should use hero.eyebrow translation key', () => {
    expect(content).toContain("t('hero.eyebrow')");
  });

  it('should use hero.cardLabel translation key', () => {
    expect(content).toContain("t('hero.cardLabel')");
  });

  it('should use hero.stat1Label translation key', () => {
    expect(content).toContain("t('hero.stat1Label')");
  });

  it('should use hero.stat2Label translation key', () => {
    expect(content).toContain("t('hero.stat2Label')");
  });

  // ─── Semantic HTML / accessibility (AC#3) ────────────────────
  it('should have semantic section with aria-label', () => {
    expect(content).toContain('<section');
    expect(content).toContain('aria-label');
  });

  it('should use h1 for the main headline', () => {
    expect(content).toContain('<h1');
  });

  it('should have id="hero" for anchor linking', () => {
    expect(content).toContain('id="hero"');
  });

  // ─── CTA links (AC#5) ─────────────────────────────────────────
  it('should link CTAs to #intent-selection anchor', () => {
    expect(content).toContain('#intent-selection');
    expect(content).toContain('href=');
  });

  // ─── Minimum touch targets (AC#2) ────────────────────────────
  it('should have min-height 48px on CTA buttons', () => {
    expect(content).toContain('min-height: 48px');
  });

  // ─── Property images (visual update) ─────────────────────────
  it('should use property images, not agent photo, for hero visual', () => {
    expect(content).toContain('unsplash.com');
    expect(content).toContain('<img');
  });

  it('should have main and secondary property images', () => {
    expect(content).toContain('img-main');
    expect(content).toContain('img-secondary');
  });

  it('should have explicit width and height on images for CLS prevention (AC#2)', () => {
    expect(content).toContain('width="800"');
    expect(content).toContain('height="600"');
  });

  it('should use eager loading on above-fold hero image (AC#4)', () => {
    expect(content).toContain('loading="eager"');
  });

  // ─── Design system tokens (AC#1) ─────────────────────────────
  it('should use cream-warm design token in background', () => {
    expect(content).toContain('var(--color-cream-warm)');
  });

  it('should use display font token', () => {
    expect(content).toContain('var(--font-display)');
  });

  it('should use body font token', () => {
    expect(content).toContain('var(--font-body)');
  });

  it('should use primary color token for filled CTA', () => {
    expect(content).toContain('var(--color-primary)');
  });

  it('should use white text on primary CTA (demo8 style)', () => {
    expect(content).toContain("color: #fff");
  });

  // ─── demo8 aesthetic ──────────────────────────────────────────
  it('should use full border-radius pill buttons (demo8 style)', () => {
    expect(content).toContain('var(--radius-full)');
  });

  it('should use backdrop-filter on glass elements', () => {
    expect(content).toContain('backdrop-filter: blur');
  });

  it('should have two-column grid layout for desktop', () => {
    expect(content).toContain('grid-template-columns: 1fr 1fr');
  });

  it('should have eyebrow badge element', () => {
    expect(content).toContain('hero-eyebrow');
  });

  it('should have floating glass card on image stack', () => {
    expect(content).toContain('floating-card');
  });

  it('should have decorative image stack elements (ring + dots)', () => {
    expect(content).toContain('accent-ring');
    expect(content).toContain('accent-dots');
  });

  // ─── Responsive (AC#2) ────────────────────────────────────────
  it('should have tablet responsive breakpoint at 768px', () => {
    expect(content).toContain('@media (min-width: 768px)');
  });

  it('should hide visual on mobile', () => {
    expect(content).toContain('display: none');
  });

  // ─── Container width ──────────────────────────────────────────
  it('should have 1400px max-width container', () => {
    expect(content).toContain('1400px');
  });

  // ─── Reduced motion (AC#2) ────────────────────────────────────
  it('should respect prefers-reduced-motion', () => {
    expect(content).toContain('prefers-reduced-motion');
  });

  // ─── Focus accessibility ──────────────────────────────────────
  it('should have focus-visible styles for keyboard navigation', () => {
    expect(content).toContain('focus-visible');
    expect(content).toContain('outline');
  });
});
