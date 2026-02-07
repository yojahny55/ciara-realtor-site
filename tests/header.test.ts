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

  it('should have fixed positioning with high z-index for glassmorphism pill', () => {
    expect(content).toContain('position: fixed');
    expect(content).toContain('z-index: 1000');
  });

  it('should apply glassmorphism effect with backdrop-filter', () => {
    expect(content).toContain('backdrop-filter: blur(25px)');
    expect(content).toContain('rgba(255, 255, 255, 0.25)');
  });

  it('should have nav element with Main navigation aria-label', () => {
    expect(content).toContain('<nav');
    expect(content).toContain('aria-label="Main navigation"');
  });

  it('should not have redundant role="navigation" on nav element', () => {
    expect(content).not.toContain('role="navigation"');
  });

  it('should render logo with proper aria-label', () => {
    expect(content).toContain('logo-container');
    expect(content).toContain('aria-label=');
    expect(content).toContain('Ciara Ruiz Real Estate');
  });

  it('should build navLinks array using translation keys', () => {
    expect(content).toContain('const navLinks');
    expect(content).toContain("t('nav.home')");
    expect(content).toContain("t('nav.buy')");
    expect(content).toContain("t('nav.sell')");
    expect(content).toContain("t('nav.rent')");
    expect(content).toContain("t('nav.about')");
    expect(content).toContain("t('nav.contact')");
  });

  it('should include language prefix in all nav link hrefs', () => {
    // All links should start with /${lang}/
    expect(content).toContain('`/${lang}/`');
    expect(content).toContain("`/${lang}/${lang === 'en' ? 'properties' : 'propiedades'}/`");
    expect(content).toContain("`/${lang}/${lang === 'en' ? 'about' : 'sobre-ciara'}/`");
    expect(content).toContain("`/${lang}/${lang === 'en' ? 'contact' : 'contacto'}/`");
  });

  it('should handle English and Spanish routes', () => {
    expect(content).toContain('properties');
    expect(content).toContain('propiedades');
    expect(content).toContain('sobre-ciara');
    expect(content).toContain('contacto');
  });

  it('should render desktop navigation hidden on mobile via scoped CSS', () => {
    expect(content).toContain('desktop-nav');
    // Uses scoped CSS media query instead of Tailwind utility classes
    expect(content).toContain('@media (min-width: 1024px)');
  });

  it('should render phone link with tel: href', () => {
    expect(content).toContain('phone-icon');
    expect(content).toContain('tel:');
    expect(content).toContain('phoneHref');
  });

  it('should render CTA button with Get Started label', () => {
    expect(content).toContain('cta-button');
    expect(content).toContain("'Get Started'");
    expect(content).toContain("'Comenzar'");
  });

  it('should render mobile navigation with proper hydration directive', () => {
    expect(content).toContain('<MobileNav');
    expect(content).toContain('lang={lang}');
    expect(content).toContain('navLinks={navLinks}');
    expect(content).toContain('client:media="(max-width: 1023px)"');
  });

  it('should use CSS custom properties for design tokens', () => {
    expect(content).toContain('var(--color-primary)');
    expect(content).toContain('var(--color-charcoal)');
    expect(content).toContain('var(--font-body)');
    expect(content).toContain('logo-signature'); // Uses image logo now
  });

  it('should have hover states for nav links via scoped CSS', () => {
    expect(content).toContain('.nav-link:hover');
    expect(content).toContain('transition');
  });

  it('should support active link indication', () => {
    expect(content).toContain('aria-current');
    expect(content).toContain('isActive');
  });

  it('should integrate language toggle with correct props', () => {
    expect(content).toContain('<LanguageToggle');
    expect(content).toContain('currentLang={lang}');
    expect(content).toContain('currentPath={currentPath}');
  });

  it('should show language toggle in both desktop and mobile action areas', () => {
    // Language toggle should appear in desktop-actions and mobile-actions
    const toggleMatches = content.match(/<LanguageToggle/g);
    expect(toggleMatches).not.toBeNull();
    expect(toggleMatches!.length).toBe(2);
  });

  it('should have focus states for keyboard accessibility', () => {
    expect(content).toContain('.logo-container:focus');
    expect(content).toContain('.nav-link:focus');
    expect(content).toContain('.cta-button:focus');
    expect(content).toContain('outline');
  });

  it('should have responsive breakpoint at 1024px', () => {
    expect(content).toContain('@media (min-width: 1024px)');
    expect(content).toContain('@media (max-width: 1023px)');
  });
});
