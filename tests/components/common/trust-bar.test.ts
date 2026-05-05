/**
 * Trust Bar Component Tests
 *
 * File-based string matching tests (intent-cards.test.ts pattern).
 * Covers structure, translations, accessibility, design system, and responsive layout.
 */

import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

describe('Trust Bar Component', () => {
  const componentPath = resolve(__dirname, '../../../src/components/common/trust-bar.astro');
  const translationsPath = resolve(__dirname, '../../../src/i18n/translations.ts');

  const content = readFileSync(componentPath, 'utf-8');
  const translations = readFileSync(translationsPath, 'utf-8');

  // ─── File existence ───────────────────────────────────────────
  it('should exist in src/components/common/', () => {
    expect(() => readFileSync(componentPath, 'utf-8')).not.toThrow();
  });

  // ─── Component scaffold (6.12) ───────────────────────────────
  it('should have Props interface with lang prop', () => {
    expect(content).toContain('interface Props');
    expect(content).toContain('lang: Lang');
  });

  // ─── Semantic structure (AC#4, 6.3) ──────────────────────────
  it('should have section element', () => {
    expect(content).toContain('<section');
  });

  it('should have ul with role="list" (AC#4, 6.3)', () => {
    expect(content).toContain('<ul');
    expect(content).toContain('role="list"');
  });

  // ─── Translation key references (6.4) ────────────────────────
  it('should reference trust keys via template literal pattern', () => {
    expect(content).toContain('trust.${item.key}');
  });

  it('should have all 4 trust item key values in trustItems array', () => {
    expect(content).toContain("key: 'licensed'");
    expect(content).toContain("key: 'responseTime'");
    expect(content).toContain("key: 'privacy'");
    expect(content).toContain("key: 'bilingual'");
  });

  // ─── Accessibility (AC#4, 6.5) ────────────────────────────────
  it('should use translated aria-label on section', () => {
    expect(content).toContain("t('trust.ariaLabel')");
  });

  it('should have aria-hidden="true" for decorative icons', () => {
    expect(content).toContain('aria-hidden="true"');
  });

  // ─── Inline SVG icons (6.6) ───────────────────────────────────
  it('should have inline svg elements', () => {
    expect(content).toContain('<svg');
  });

  // ─── Design system tokens (6.7) ───────────────────────────────
  it('should use --color-secondary for gold icon color', () => {
    expect(content).toContain('--color-secondary');
  });

  // ─── Background transparent (lets page-level orb backdrop show through) ─
  it('should use transparent background to expose the AnimatedBackground orbs', () => {
    expect(content).toMatch(/\.trust-bar\s*\{[^}]*background:\s*transparent/);
  });

  // ─── Font body token (6.9) ────────────────────────────────────
  it('should reference --font-body in styles', () => {
    expect(content).toContain('var(--font-body)');
  });

  // ─── Responsive layout (6.10) ─────────────────────────────────
  it('should have flex-wrap or media query for responsive layout', () => {
    const hasResponsive = content.includes('flex-wrap') || content.includes('@media');
    expect(hasResponsive).toBe(true);
  });

  // ─── Translation keys in translations.ts (6.11) ───────────────
  it('should have trust.ariaLabel key in Translations interface', () => {
    expect(translations).toContain("'trust.ariaLabel'");
  });

  it('should have trust.licensed key in Translations interface', () => {
    expect(translations).toContain("'trust.licensed'");
  });

  it('should have trust.responseTime key in Translations interface', () => {
    expect(translations).toContain("'trust.responseTime'");
  });

  it('should have trust.privacy key in Translations interface', () => {
    expect(translations).toContain("'trust.privacy'");
  });

  it('should have trust.bilingual key in Translations interface', () => {
    expect(translations).toContain("'trust.bilingual'");
  });

  it('should have EN trust.licensed value in translations', () => {
    expect(translations).toContain('Licensed Florida Realtor');
  });

  it('should have EN trust.responseTime value in translations', () => {
    expect(translations).toContain('Responds within 2 hours');
  });

  it('should have EN trust.privacy value in translations', () => {
    expect(translations).toContain('Your information stays private');
  });

  it('should have EN trust.bilingual value in translations', () => {
    expect(translations).toContain('Bilingual: English & Español');
  });

  it('should have ES trust.licensed value in translations', () => {
    expect(translations).toContain('Agente Inmobiliario Licenciado en Florida');
  });

  it('should have ES trust.responseTime value in translations', () => {
    expect(translations).toContain('Responde en menos de 2 horas');
  });

  it('should have ES trust.privacy value in translations', () => {
    expect(translations).toContain('Tu información es confidencial');
  });

  it('should have ES trust.bilingual value in translations', () => {
    expect(translations).toContain('Bilingüe: English & Español');
  });
});
