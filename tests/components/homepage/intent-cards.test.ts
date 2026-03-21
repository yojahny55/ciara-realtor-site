/**
 * Intent Cards Component Tests
 *
 * File-based string matching tests (hero-section.test.ts pattern).
 * Covers structure, translations, accessibility, design system, and responsive layout.
 */

import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

describe('Intent Cards Component', () => {
  const componentPath = resolve(__dirname, '../../../src/components/homepage/intent-cards.astro');
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

  // ─── Section ID for anchor (AC#1, #5) ────────────────────────
  it('should have id="intent-selection" for hero CTA anchor link (6.2)', () => {
    expect(content).toContain('id="intent-selection"');
  });

  // ─── Section heading (AC#1) ───────────────────────────────────
  it('should use intent.heading translation key for section heading (6.3)', () => {
    expect(content).toContain("t('intent.heading')");
  });

  // ─── Card links (AC#2) ────────────────────────────────────────
  it('should have buyer link href containing en/buyers (6.4)', () => {
    expect(content).toContain('en/buyers');
  });

  it('should have seller link href containing en/sellers (6.4)', () => {
    expect(content).toContain('en/sellers');
  });

  it('should have renter link href containing en/renters (6.4)', () => {
    expect(content).toContain('en/renters');
  });

  it('should have investor link href containing en/investors (6.4)', () => {
    expect(content).toContain('en/investors');
  });

  // ─── Card titles and descriptions (AC#1) ─────────────────────
  // Component uses a data array + template literals: `intent.${card.key}Title`
  it('should reference intent card title keys via template literal pattern (6.5)', () => {
    expect(content).toContain('`intent.${card.key}Title`');
  });

  it('should reference intent card description keys via template literal pattern (6.5)', () => {
    expect(content).toContain('`intent.${card.key}Desc`');
  });

  it('should have all 4 card key values in cards data array (6.5)', () => {
    expect(content).toContain("key: 'buy'");
    expect(content).toContain("key: 'sell'");
    expect(content).toContain("key: 'rent'");
    expect(content).toContain("key: 'invest'");
  });

  // ─── Navigation role (AC#5) ───────────────────────────────────
  it('should have nav element or role="navigation" (6.6)', () => {
    const hasNav = content.includes('<nav') || content.includes('role="navigation"');
    expect(hasNav).toBe(true);
  });

  it('should use intent.ariaLabel translation key for aria-label (6.7)', () => {
    expect(content).toContain("'intent.ariaLabel'");
  });

  // ─── Card class (AC#1) ────────────────────────────────────────
  it('should use intent-card class on cards (6.8)', () => {
    expect(content).toContain('intent-card');
  });

  // ─── Glassmorphism design (AC#1) ──────────────────────────────
  it('should use backdrop-filter for glassmorphism effect (6.9)', () => {
    expect(content).toContain('backdrop-filter: blur');
  });

  // ─── Gold hover color (AC#1) ──────────────────────────────────
  it('should reference --color-secondary (gold) in hover styles (6.10)', () => {
    expect(content).toContain('var(--color-secondary)');
  });

  // ─── Reduced motion (AC#1) ────────────────────────────────────
  it('should have prefers-reduced-motion media query (6.11)', () => {
    expect(content).toContain('prefers-reduced-motion');
  });

  // ─── Responsive grid (AC#3, #4) ───────────────────────────────
  it('should have grid-template-columns for responsive layout (6.12)', () => {
    expect(content).toContain('grid-template-columns');
  });

  // ─── Focus-visible accessibility (AC#1) ──────────────────────
  it('should have focus-visible styles for keyboard accessibility (6.13)', () => {
    expect(content).toContain('focus-visible');
    expect(content).toContain('outline');
  });

  // ─── Translation keys in translations.ts (6.14) ──────────────
  it('should have intent.heading key in Translations interface', () => {
    expect(translations).toContain("'intent.heading'");
  });

  it('should have intent.ariaLabel key in Translations interface', () => {
    expect(translations).toContain("'intent.ariaLabel'");
  });

  it('should have all intent card title keys in Translations interface', () => {
    expect(translations).toContain("'intent.buyTitle'");
    expect(translations).toContain("'intent.sellTitle'");
    expect(translations).toContain("'intent.rentTitle'");
    expect(translations).toContain("'intent.investTitle'");
  });

  it('should have all intent card description keys in Translations interface', () => {
    expect(translations).toContain("'intent.buyDesc'");
    expect(translations).toContain("'intent.sellDesc'");
    expect(translations).toContain("'intent.rentDesc'");
    expect(translations).toContain("'intent.investDesc'");
  });

  it('should have correct EN heading in translations', () => {
    expect(translations).toContain('How can I help you today?');
  });

  it('should have correct ES heading in translations', () => {
    expect(translations).toContain('¿Cómo puedo ayudarte hoy?');
  });

  it('should have EN card titles in translations', () => {
    expect(translations).toContain("'intent.buyTitle': 'Buy'");
    expect(translations).toContain("'intent.sellTitle': 'Sell'");
    expect(translations).toContain("'intent.rentTitle': 'Rent'");
    expect(translations).toContain("'intent.investTitle': 'Invest'");
  });

  it('should have ES card titles in translations', () => {
    expect(translations).toContain("'intent.buyTitle': 'Comprar'");
    expect(translations).toContain("'intent.sellTitle': 'Vender'");
    expect(translations).toContain("'intent.rentTitle': 'Alquilar'");
    expect(translations).toContain("'intent.investTitle': 'Invertir'");
  });
});
