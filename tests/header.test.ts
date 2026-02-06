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
import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import Header from '../src/components/common/header.astro';

describe('Header Component', () => {
  it('should render with required lang prop', async () => {
    const container = await AstroContainer.create();
    const result = await container.renderToString(Header, {
      props: { lang: 'en' },
    });

    expect(result).toBeTruthy();
    expect(result).toContain('header');
  });

  it('should render logo linking to home page', async () => {
    const container = await AstroContainer.create();
    const result = await container.renderToString(Header, {
      props: { lang: 'en' },
    });

    expect(result).toContain('/en/');
    expect(result).toMatch(/aria-label=".*Home.*"/i);
  });

  it('should render all navigation links in English', async () => {
    const container = await AstroContainer.create();
    const result = await container.renderToString(Header, {
      props: { lang: 'en' },
    });

    expect(result).toContain('Home');
    expect(result).toContain('Buy');
    expect(result).toContain('Sell');
    expect(result).toContain('Rent');
    expect(result).toContain('About');
    expect(result).toContain('Contact');
  });

  it('should render all navigation links in Spanish', async () => {
    const container = await AstroContainer.create();
    const result = await container.renderToString(Header, {
      props: { lang: 'es' },
    });

    expect(result).toContain('Inicio');
    expect(result).toContain('Comprar');
    expect(result).toContain('Vender');
    expect(result).toContain('Alquilar');
    expect(result).toContain('Sobre Ciara');
    expect(result).toContain('Contacto');
  });

  it('should render click-to-call phone number with tel: href', async () => {
    const container = await AstroContainer.create();
    const result = await container.renderToString(Header, {
      props: { lang: 'en' },
    });

    expect(result).toContain('tel:');
    expect(result).toMatch(/aria-label=".*Call.*"/i);
  });

  it('should render Contact Maria CTA button', async () => {
    const container = await AstroContainer.create();
    const result = await container.renderToString(Header, {
      props: { lang: 'en' },
    });

    expect(result).toContain('Contact Maria');
    expect(result).toContain('/en/contact');
  });

  it('should render Contact Maria CTA in Spanish', async () => {
    const container = await AstroContainer.create();
    const result = await container.renderToString(Header, {
      props: { lang: 'es' },
    });

    expect(result).toContain('Contactar a Maria');
    expect(result).toContain('/es/contacto');
  });

  it('should have sticky positioning', async () => {
    const container = await AstroContainer.create();
    const result = await container.renderToString(Header, {
      props: { lang: 'en' },
    });

    expect(result).toContain('sticky');
    expect(result).toContain('top-0');
    expect(result).toContain('z-50');
  });

  it('should render semantic HTML with proper ARIA', async () => {
    const container = await AstroContainer.create();
    const result = await container.renderToString(Header, {
      props: { lang: 'en' },
    });

    expect(result).toContain('<header');
    expect(result).toContain('<nav');
    expect(result).toContain('aria-label="Main navigation"');
  });

  it('should render mobile hamburger button with proper attributes', async () => {
    const container = await AstroContainer.create();
    const result = await container.renderToString(Header, {
      props: { lang: 'en' },
    });

    expect(result).toContain('aria-expanded');
    expect(result).toContain('aria-controls');
    expect(result).toMatch(/aria-label=".*menu.*"/i);
  });

  it('should integrate language toggle component', async () => {
    const container = await AstroContainer.create();
    const result = await container.renderToString(Header, {
      props: { lang: 'en' },
    });

    // Language toggle renders EN/ES or similar
    expect(result).toMatch(/EN|ENGLISH/i);
  });

  it('should use correct URL routes for English', async () => {
    const container = await AstroContainer.create();
    const result = await container.renderToString(Header, {
      props: { lang: 'en' },
    });

    expect(result).toContain('/en/');
    expect(result).toContain('/en/about');
    expect(result).toContain('/en/contact');
  });

  it('should use correct URL routes for Spanish', async () => {
    const container = await AstroContainer.create();
    const result = await container.renderToString(Header, {
      props: { lang: 'es' },
    });

    expect(result).toContain('/es/');
    expect(result).toContain('/es/sobre-ciara');
    expect(result).toContain('/es/contacto');
  });

  it('should apply design token colors via Tailwind classes', async () => {
    const container = await AstroContainer.create();
    const result = await container.renderToString(Header, {
      props: { lang: 'en' },
    });

    // Check for design token classes (cream, charcoal, gold, etc.)
    expect(result).toMatch(/bg-(cream|white|off-white)/);
    expect(result).toMatch(/text-(charcoal|black|gold)/);
  });
});
