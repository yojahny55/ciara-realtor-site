/**
 * Header Component Tests
 *
 * Tests for the main header component including:
 * - Props interface validation
 * - Desktop navigation rendering
 * - Mobile hamburger visibility
 * - Language toggle integration
 * - Phone number and CTA rendering
 */

import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

describe('Header Component', () => {
  const headerPath = resolve(__dirname, '../src/components/common/header.astro');
  const content = readFileSync(headerPath, 'utf-8');

  it('should exist in src/components/common/', () => {
    expect(() => readFileSync(headerPath, 'utf-8')).not.toThrow();
  });

  it('should have Props interface with lang prop', () => {
    expect(content).toContain('interface Props');
    expect(content).toContain('lang: Lang');
  });

  it('should import useTranslations and Lang from i18n', () => {
    expect(content).toContain("import { useTranslations } from '@/i18n'");
    expect(content).toContain("import type { Lang } from '@/i18n'");
  });

  it('should import LanguageToggle component', () => {
    expect(content).toContain("import LanguageToggle from './language-toggle.astro'");
  });

  it('should import MobileNav island component', () => {
    expect(content).toContain("import MobileNav from '@/components/islands/mobile-nav'");
  });

  it('should render semantic header with banner role', () => {
    expect(content).toContain('<header role="banner"');
  });

  it('should have sticky positioning with z-index', () => {
    expect(content).toContain('position: sticky');
    expect(content).toContain('top: 0');
    expect(content).toContain('z-index: 50');
  });

  it('should apply glassmorphism frosted effect', () => {
    expect(content).toContain('backdrop-filter: blur(30px)');
    expect(content).toContain('rgba(255, 255, 255, 0.25)');
  });

  it('should have nav element with Main navigation aria-label', () => {
    expect(content).toContain('<nav');
    expect(content).toContain('aria-label="Main navigation"');
  });

  it('should render logo with proper aria-label', () => {
    expect(content).toContain('logo-link');
    expect(content).toContain('aria-label=');
  });

  it('should build navLinks array from translation keys', () => {
    expect(content).toContain('const navLinks');
    expect(content).toContain("t('nav.home')");
    expect(content).toContain("t('nav.properties')");
    expect(content).toContain("t('nav.about')");
    expect(content).toContain("t('nav.guides')");
    expect(content).toContain("t('nav.blog')");
    expect(content).toContain("t('nav.contact')");
  });

  it('should handle English and Spanish routes', () => {
    expect(content).toContain('properties');
    expect(content).toContain('propiedades');
    expect(content).toContain('sobre-ciara');
    expect(content).toContain('guias');
    expect(content).toContain('blog');
    expect(content).toContain('contacto');
  });

  it('should render desktop navigation (hidden on mobile)', () => {
    expect(content).toContain('desktop-nav');
    expect(content).toContain('hidden lg:flex');
  });

  it('should render phone link with tel: href', () => {
    expect(content).toContain('phone-link');
    expect(content).toContain('tel:');
  });

  it('should render Contact Maria CTA button', () => {
    expect(content).toContain('cta-button');
    expect(content).toContain("t('header.contactCta')");
  });

  it('should render mobile navigation with proper hydration directive', () => {
    expect(content).toContain('<MobileNav');
    expect(content).toContain('lang={lang}');
    expect(content).toContain('navLinks={navLinks}');
    expect(content).toContain('client:media="(max-width: 1023px)"');
  });

  it('should apply responsive design tokens via Tailwind classes', () => {
    expect(content).toMatch(/text-(charcoal|black|primary|white)/);
    expect(content).toMatch(/bg-primary/);
    expect(content).toContain('hover:text-primary');
  });

  it('should have hover states for nav links', () => {
    expect(content).toContain('hover:text-primary');
    expect(content).toContain('transition-colors');
  });

  it('should support active link indication', () => {
    expect(content).toContain('aria-current');
    expect(content).toContain('isActive');
  });

  it('should integrate language toggle with currentPath', () => {
    expect(content).toContain('<LanguageToggle');
    expect(content).toContain('currentLang={lang}');
    expect(content).toContain('currentPath={currentPath}');
  });

  it('should have focus states for keyboard accessibility', () => {
    expect(content).toContain('.logo-link:focus');
    expect(content).toContain('.nav-link:focus');
    expect(content).toContain('outline');
  });

  it('should have responsive height (56px mobile, 80px desktop)', () => {
    expect(content).toContain('min-height: 56px');
    expect(content).toContain('min-height: 80px');
    expect(content).toContain('@media (min-width: 1024px)');
  });

  it('should use design tokens for styling', () => {
    expect(content).toContain('var(--color-');
  });
});
