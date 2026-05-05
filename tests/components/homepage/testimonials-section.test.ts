/**
 * Testimonials Section Component Tests
 *
 * File-based string matching tests following the intent-cards.test.ts pattern.
 * Covers structure, translations, accessibility, design system, and responsive layout.
 */

import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

describe('TestimonialsSection Component', () => {
  const componentPath = resolve(
    __dirname,
    '../../../src/components/homepage/testimonials-section.astro'
  );
  const translationsPath = resolve(__dirname, '../../../src/i18n/translations.ts');

  const source = readFileSync(componentPath, 'utf-8');
  const translations = readFileSync(translationsPath, 'utf-8');

  // ─── File existence ────────────────────────────────────────────
  it('should exist in src/components/homepage/', () => {
    expect(() => readFileSync(componentPath, 'utf-8')).not.toThrow();
  });

  // ─── Component scaffold ────────────────────────────────────────
  it('should have Props interface with lang prop', () => {
    expect(source).toContain('interface Props');
    expect(source).toContain('lang: Lang');
  });

  it('should import useTranslations from i18n', () => {
    expect(source).toContain("import { useTranslations } from '@/i18n'");
  });

  it('should import Lang type from i18n', () => {
    expect(source).toContain("import type { Lang } from '@/i18n'");
  });

  it('should import getTestimonials from @lib/content', () => {
    expect(source).toContain("import { getTestimonials } from '@lib/content'");
  });

  it('should call getTestimonials with lang prop', () => {
    expect(source).toContain('getTestimonials(lang)');
  });

  // ─── Semantic HTML structure (AC#4) ───────────────────────────
  it('should have a section element', () => {
    expect(source).toContain('<section');
  });

  it('should have aria-label on section element', () => {
    expect(source).toContain('aria-label');
    expect(source).toContain("t('testimonials.ariaLabel')");
  });

  it('should use blockquote element for quotes (AC#4)', () => {
    expect(source).toContain('<blockquote');
  });

  it('should use cite element for client name attribution (AC#4)', () => {
    expect(source).toContain('<cite');
  });

  it('should use article element for each testimonial card', () => {
    expect(source).toContain('<article');
  });

  // ─── Section header with overline + subtitle (demo8 match) ────
  it('should have overline element for "Client Stories" label', () => {
    expect(source).toContain('class="overline"');
    expect(source).toContain("t('testimonials.overline')");
  });

  it('should have subtitle paragraph below heading', () => {
    expect(source).toContain("t('testimonials.subtitle')");
  });

  // ─── Gold stars (demo8 match) ──────────────────────────────────
  it('should render 5-star rating SVGs', () => {
    expect(source).toContain('testimonial-stars');
    expect(source).toContain('viewBox="0 0 24 24"');
    expect(source).toContain('polygon');
  });

  // ─── Translation key usage (AC#1) ─────────────────────────────
  it('should use testimonials.heading translation key', () => {
    expect(source).toContain("t('testimonials.heading')");
  });

  it('should use testimonials.ariaLabel translation key', () => {
    expect(source).toContain("t('testimonials.ariaLabel')");
  });

  // ─── Avatar: image and initials fallback (AC#1) ───────────────
  it('should render initials fallback when image is missing', () => {
    expect(source).toContain('testimonial-initials');
  });

  it('should extract initials from name by splitting on spaces', () => {
    expect(source).toContain(".split(' ')");
    expect(source).toContain('.toUpperCase()');
  });

  it('should render image when present', () => {
    expect(source).toContain('testimonial-avatar');
    expect(source).toContain('testimonial.data.image');
  });

  it('should not contain client:load or client:only hydration directives (AC#5)', () => {
    expect(source).not.toContain('client:load');
    expect(source).not.toContain('client:only');
    expect(source).not.toContain('client:idle');
  });

  // ─── Responsive grid (AC#2, #3) ───────────────────────────────
  it('should have grid-template-columns for responsive layout', () => {
    expect(source).toContain('grid-template-columns');
  });

  it('should have 3-column desktop grid', () => {
    expect(source).toContain('repeat(3, 1fr)');
  });

  it('should have tablet 2-column breakpoint at 1023px (AC#3)', () => {
    expect(source).toContain('max-width: 1023px');
    expect(source).toContain('repeat(2, 1fr)');
  });

  it('should have mobile breakpoint collapsing to 1 column (AC#3)', () => {
    expect(source).toContain('max-width: 767px');
    expect(source).toContain('grid-template-columns: 1fr');
  });

  // ─── Quote truncation + Read more (AC#2) ──────────────────────
  it('should have -webkit-line-clamp for quote truncation (AC#2)', () => {
    expect(source).toContain('-webkit-line-clamp: 4');
  });

  it('should have testimonial-read-more element (AC#2)', () => {
    expect(source).toContain('testimonial-read-more');
    expect(source).toContain("t('testimonials.readMore')");
  });

  // ─── cite inside blockquote footer (AC#4) ─────────────────────
  it('should have cite inside blockquote footer (AC#4)', () => {
    // cite and footer must both appear inside blockquote
    const blockquoteStart = source.indexOf('<blockquote');
    const blockquoteEnd = source.indexOf('</blockquote>', blockquoteStart);
    const blockquoteContent = source.slice(blockquoteStart, blockquoteEnd);
    expect(blockquoteContent).toContain('<footer');
    expect(blockquoteContent).toContain('<cite');
  });

  // ─── Glassmorphism design system (AC#4) ───────────────────────
  it('should use backdrop-filter for glassmorphism effect', () => {
    expect(source).toContain('backdrop-filter: blur');
  });

  it('should use --color-primary design token', () => {
    expect(source).toContain('var(--color-primary');
  });

  it('should use --color-charcoal design token', () => {
    expect(source).toContain('var(--color-charcoal');
  });

  it('should use --font-display for heading', () => {
    expect(source).toContain('var(--font-display)');
  });

  it('should use --font-body for quote text', () => {
    expect(source).toContain('var(--font-body)');
  });

  it('should use demo8 glass card styling with rgba white background', () => {
    expect(source).toContain('rgba(255, 255, 255, 0.18)');
  });

  // ─── Accessibility (AC#4) ─────────────────────────────────────
  it('should have prefers-reduced-motion media query', () => {
    expect(source).toContain('prefers-reduced-motion');
  });

  it('should disable hover transforms in reduced motion', () => {
    expect(source).toContain('transform: none');
  });

  it('should have aria-hidden on initials avatar (name is in cite)', () => {
    expect(source).toContain('aria-hidden="true"');
  });

  // ─── Hover interaction (AC#4) ─────────────────────────────────
  it('should have hover state on testimonial cards', () => {
    expect(source).toContain('.testimonial-card:hover');
    expect(source).toContain('translateY(-5px)');
  });

  // ─── Testimonial type/role display (AC#1) ─────────────────────
  it('should render transaction type from testimonial data', () => {
    expect(source).toContain('testimonial-role');
    expect(source).toContain('testimonial.data.type');
  });

  // ─── Translation keys in Translations interface ────────────────
  it('should have testimonials.overline in Translations interface', () => {
    expect(translations).toContain("'testimonials.overline'");
  });

  it('should have testimonials.heading in Translations interface', () => {
    expect(translations).toContain("'testimonials.heading'");
  });

  it('should have testimonials.subtitle in Translations interface', () => {
    expect(translations).toContain("'testimonials.subtitle'");
  });

  it('should have testimonials.readMore in Translations interface', () => {
    expect(translations).toContain("'testimonials.readMore'");
  });

  it('should have testimonials.ariaLabel in Translations interface', () => {
    expect(translations).toContain("'testimonials.ariaLabel'");
  });

  it('should have EN heading value "What Clients Say"', () => {
    expect(translations).toContain("'testimonials.heading': 'What Clients Say'");
  });

  it('should have EN overline value "Client Stories"', () => {
    expect(translations).toContain("'testimonials.overline': 'Client Stories'");
  });

  it('should have EN readMore value "Read more"', () => {
    expect(translations).toContain("'testimonials.readMore': 'Read more'");
  });

  it('should have EN ariaLabel value', () => {
    expect(translations).toContain('Customer testimonials and reviews');
  });

  it('should have ES heading value "Lo Que Dicen Nuestros Clientes"', () => {
    expect(translations).toContain('Lo Que Dicen Nuestros Clientes');
  });

  it('should have ES readMore value "Leer más"', () => {
    expect(translations).toContain("'testimonials.readMore': 'Leer más'");
  });

  it('should have ES ariaLabel value', () => {
    expect(translations).toContain('Testimonios y reseñas de clientes');
  });
});
