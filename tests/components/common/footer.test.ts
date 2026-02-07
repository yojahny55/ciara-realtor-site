/**
 * Footer Component Tests
 *
 * Uses file-based string matching (consistent with header test pattern).
 * Does NOT use DOM rendering.
 */

import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const footerPath = resolve(__dirname, '../../../src/components/common/footer.astro');
const footerSource = readFileSync(footerPath, 'utf-8');

describe('Footer component', () => {
  it('should have role="contentinfo" landmark', () => {
    expect(footerSource).toContain('role="contentinfo"');
  });

  it('should have footer navigation with aria-label', () => {
    expect(footerSource).toContain('aria-label="Footer navigation"');
  });

  it('should contain brand column with logo and description', () => {
    expect(footerSource).toContain('footer-brand');
    expect(footerSource).toContain('logo-signature');
    expect(footerSource).toContain('/images/logo-signature.webp');
    expect(footerSource).toContain('footer-tagline');
    expect(footerSource).toContain('footer.brand.description');
  });

  it('should contain Quick Links column', () => {
    expect(footerSource).toContain('footer.quickLinks');
    expect(footerSource).toContain('nav.properties');
    expect(footerSource).toContain('footer.neighborhoods');
    expect(footerSource).toContain('nav.about');
    expect(footerSource).toContain('footer.clientReviews');
  });

  it('should contain Services column', () => {
    expect(footerSource).toContain('footer.services');
    expect(footerSource).toContain('footer.buyHome');
    expect(footerSource).toContain('footer.sellHome');
    expect(footerSource).toContain('footer.homeValuation');
    expect(footerSource).toContain('footer.relocation');
  });

  it('should contain Contact column with tel: and mailto: links', () => {
    expect(footerSource).toContain('footer.contact');
    expect(footerSource).toContain('tel:+18135551234');
    expect(footerSource).toContain('mailto:ciara@tamparealestate.com');
    expect(footerSource).toContain('123 Harbor Drive');
    expect(footerSource).toContain('Tampa, FL 33602');
  });

  it('should contain copyright with dynamic year', () => {
    expect(footerSource).toContain('footer.copyright');
    expect(footerSource).toContain('currentYear');
  });

  it('should contain Equal Housing Opportunity text', () => {
    expect(footerSource).toContain('footer.equalHousing');
  });

  it('should contain social media links with aria-labels', () => {
    expect(footerSource).toContain('aria-label="Facebook"');
    expect(footerSource).toContain('aria-label="Instagram"');
    expect(footerSource).toContain('aria-label="LinkedIn"');
    expect(footerSource).toContain('aria-label="YouTube"');
  });

  it('should contain privacy and terms links', () => {
    expect(footerSource).toContain('footer.privacy');
    expect(footerSource).toContain('footer.terms');
  });

  it('should have glassmorphism background styles', () => {
    expect(footerSource).toContain('rgba(255, 255, 255, 0.55)');
    expect(footerSource).toContain('backdrop-filter: blur(50px)');
  });

  it('should have responsive grid layout', () => {
    expect(footerSource).toContain('grid-template-columns: 1.5fr repeat(3, 1fr)');
  });

  it('should have visible focus states', () => {
    expect(footerSource).toContain('outline: 2px solid var(--color-primary)');
    expect(footerSource).toContain('outline-offset: 2px');
  });

  it('should support prefers-reduced-motion', () => {
    expect(footerSource).toContain('@media (prefers-reduced-motion: reduce)');
  });

  it('should have mobile responsive breakpoints with accordion', () => {
    expect(footerSource).toContain('@media (max-width: 600px)');
    expect(footerSource).toContain('display: block'); // footer-mobile becomes visible
    expect(footerSource).toContain('FooterAccordion'); // Uses accordion component
  });
});
