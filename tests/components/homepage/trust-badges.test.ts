import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const tbSource = readFileSync(
  resolve(__dirname, '../../../src/components/homepage/trust-badges.astro'),
  'utf-8'
);

describe('TrustBadges component', () => {
  it('uses semantic section with aria-label', () => {
    expect(tbSource).toContain('<section');
    expect(tbSource).toContain('aria-label');
    expect(tbSource).toContain("trustBadges.ariaLabel");
  });

  it('references all 5 badge translation keys', () => {
    for (const key of [
      'trustBadges.heading',
      'trustBadges.homesSold',
      'trustBadges.bilingual',
      'trustBadges.topAgent',
      'trustBadges.narCertified',
      'trustBadges.localBoard',
    ]) {
      expect(tbSource).toContain(key);
    }
  });

  it('uses inline SVG, not astro-icon', () => {
    expect(tbSource).toContain('<svg');
    expect(tbSource).not.toContain('astro-icon');
  });

  it('does not hydrate (pure SSG)', () => {
    expect(tbSource).not.toMatch(/client:(load|visible|idle|media|only)/);
  });

  it('uses useTranslations and Lang from @/i18n', () => {
    expect(tbSource).toContain("from '@/i18n'");
    expect(tbSource).toContain('useTranslations');
    expect(tbSource).toContain('Lang');
  });

  it('declares lang prop of type Lang', () => {
    expect(tbSource).toContain('lang: Lang');
  });

  it('has explicit width and height on SVG icons', () => {
    expect(tbSource).toContain('width="48"');
    expect(tbSource).toContain('height="48"');
  });

  it('uses CSS custom properties for colors', () => {
    expect(tbSource).toContain('var(--color-secondary)');
    expect(tbSource).toContain('var(--color-charcoal');
  });

  it('honors prefers-reduced-motion', () => {
    expect(tbSource).toContain('prefers-reduced-motion');
  });
});
