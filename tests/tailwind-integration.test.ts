/**
 * Tailwind CSS v4 Integration Tests
 *
 * Verifies Tailwind utilities are properly configured (AC #1, #2, #6)
 */

import { describe, it, expect } from 'vitest';
import * as fs from 'node:fs';
import * as path from 'node:path';

describe('Tailwind v4 Configuration', () => {
  describe('File Structure', () => {
    it('should have tailwind.css with @theme directive', () => {
      const tailwindPath = path.join(process.cwd(), 'src/styles/tailwind.css');
      const content = fs.readFileSync(tailwindPath, 'utf-8');

      expect(content).toContain('@import "tailwindcss"');
      expect(content).toContain('@theme');
    });

    it('should have tokens.css with CSS custom properties', () => {
      const tokensPath = path.join(process.cwd(), 'src/styles/tokens.css');
      const content = fs.readFileSync(tokensPath, 'utf-8');

      expect(content).toContain(':root');
      expect(content).toContain('--space-');
      expect(content).toContain('--font-');
      expect(content).toContain('--ease-');
      expect(content).toContain('--duration-');
    });

    it('should have fonts.css with @font-face declarations', () => {
      const fontsPath = path.join(process.cwd(), 'src/styles/fonts.css');
      const content = fs.readFileSync(fontsPath, 'utf-8');

      expect(content).toContain('@font-face');
      expect(content).toContain('Cormorant Garamond');
      expect(content).toContain('DM Sans');
      expect(content).toContain('font-display: swap');
    });

    it('should have global.css importing all stylesheets', () => {
      const globalPath = path.join(process.cwd(), 'src/styles/global.css');
      const content = fs.readFileSync(globalPath, 'utf-8');

      expect(content).toContain('@import "./fonts.css"');
      expect(content).toContain('@import "./tokens.css"');
      expect(content).toContain('@import "./tailwind.css"');
    });
  });

  describe('Color Tokens (AC #1)', () => {
    it('should define all color variables in tailwind.css', () => {
      const tailwindPath = path.join(process.cwd(), 'src/styles/tailwind.css');
      const content = fs.readFileSync(tailwindPath, 'utf-8');

      // Core Palette
      expect(content).toContain('--color-cream: #F5F5F0');
      expect(content).toContain('--color-cream-warm: #FAF8F5');

      // Gold Spectrum
      expect(content).toContain('--color-gold: #D4AF37');
      expect(content).toContain('--color-gold-soft: #E8D48A');
      expect(content).toContain('--color-gold-dark: #B8962E');
      expect(content).toContain('--color-gold-light: #F4E4BA');

      // Darks
      expect(content).toContain('--color-black: #1A1A1A');
      expect(content).toContain('--color-charcoal: #333333');
      expect(content).toContain('--color-charcoal-soft: #4A4A4A');

      // Terracotta
      expect(content).toContain('--color-terracotta: #C75B39');
      expect(content).toContain('--color-terracotta-light: #FDEEE8');

      // Whites
      expect(content).toContain('--color-off-white: #FAFAFA');
      expect(content).toContain('--color-white: #FFFFFF');
    });
  });

  describe('Typography Configuration (AC #2, #3, #4)', () => {
    it('should define font families in @theme', () => {
      const tailwindPath = path.join(process.cwd(), 'src/styles/tailwind.css');
      const content = fs.readFileSync(tailwindPath, 'utf-8');

      expect(content).toContain('--font-display:');
      expect(content).toContain('Cormorant Garamond');
      expect(content).toContain('--font-body:');
      expect(content).toContain('DM Sans');
    });

    it('should define fluid typography classes with clamp()', () => {
      const tailwindPath = path.join(process.cwd(), 'src/styles/tailwind.css');
      const content = fs.readFileSync(tailwindPath, 'utf-8');

      expect(content).toContain('.heading-xl');
      expect(content).toContain('clamp(2.5rem, 8vw, 5.5rem)');

      expect(content).toContain('.heading-lg');
      expect(content).toContain('clamp(2rem, 5vw, 3.5rem)');

      expect(content).toContain('.heading-md');
      expect(content).toContain('clamp(1.5rem, 3vw, 2.25rem)');
    });

    it('should use font-display: swap for all fonts', () => {
      const fontsPath = path.join(process.cwd(), 'src/styles/fonts.css');
      const content = fs.readFileSync(fontsPath, 'utf-8');

      const fontFaceCount = (content.match(/@font-face/g) || []).length;

      // Verify we have 9 font-face declarations (5 Cormorant + 4 DM Sans)
      expect(fontFaceCount).toBe(9);

      // Verify each @font-face block contains font-display: swap
      // (Note: comment may also contain the phrase, so we check count >= fontFaceCount)
      const fontDisplaySwapCount = (content.match(/font-display: swap/g) || []).length;
      expect(fontDisplaySwapCount).toBeGreaterThanOrEqual(fontFaceCount);
    });
  });

  describe('Spacing System (AC #5)', () => {
    it('should use 4px base unit', () => {
      const tokensPath = path.join(process.cwd(), 'src/styles/tokens.css');
      const content = fs.readFileSync(tokensPath, 'utf-8');

      // Verify multiples of 4px (as rem)
      expect(content).toContain('--space-xs: 0.5rem');   // 8px
      expect(content).toContain('--space-sm: 1rem');     // 16px
      expect(content).toContain('--space-md: 2rem');     // 32px
      expect(content).toContain('--space-lg: 4rem');     // 64px
      expect(content).toContain('--space-xl: 8rem');     // 128px
      expect(content).toContain('--space-2xl: 12rem');   // 192px
    });
  });

  describe('Shadow Tokens (AC #6)', () => {
    it('should define all shadow tokens in @theme', () => {
      const tailwindPath = path.join(process.cwd(), 'src/styles/tailwind.css');
      const content = fs.readFileSync(tailwindPath, 'utf-8');

      expect(content).toContain('--shadow-sm: 0 2px 8px rgba(0, 0, 0, 0.06)');
      expect(content).toContain('--shadow-md: 0 8px 30px rgba(0, 0, 0, 0.08)');
      expect(content).toContain('--shadow-lg: 0 20px 60px rgba(0, 0, 0, 0.12)');
      expect(content).toContain('--shadow-gold: 0 8px 40px rgba(212, 175, 55, 0.25)');
    });
  });

  describe('Motion Preference Support (AC #8)', () => {
    it('should include prefers-reduced-motion media query', () => {
      const tailwindPath = path.join(process.cwd(), 'src/styles/tailwind.css');
      const content = fs.readFileSync(tailwindPath, 'utf-8');

      expect(content).toContain('@media (prefers-reduced-motion: reduce)');
      expect(content).toContain('animation-duration: 0.01ms !important');
      expect(content).toContain('transition-duration: 0.01ms !important');
      expect(content).toContain('scroll-behavior: auto !important');
    });
  });

  describe('Transition Timing Tokens (AC #9)', () => {
    it('should define easing and duration variables', () => {
      const tokensPath = path.join(process.cwd(), 'src/styles/tokens.css');
      const content = fs.readFileSync(tokensPath, 'utf-8');

      expect(content).toContain('--ease-out-expo: cubic-bezier(0.16, 1, 0.3, 1)');
      expect(content).toContain('--ease-out-back: cubic-bezier(0.34, 1.56, 0.64, 1)');
      expect(content).toContain('--duration-fast: 0.2s');
      expect(content).toContain('--duration-normal: 0.4s');
      expect(content).toContain('--duration-slow: 0.8s');
    });
  });

  describe('Font Files (AC #2)', () => {
    it('should have all Cormorant Garamond font files', () => {
      const fontsDir = path.join(process.cwd(), 'public/fonts');

      expect(fs.existsSync(path.join(fontsDir, 'cormorant-garamond-300.woff2'))).toBe(true);
      expect(fs.existsSync(path.join(fontsDir, 'cormorant-garamond-400.woff2'))).toBe(true);
      expect(fs.existsSync(path.join(fontsDir, 'cormorant-garamond-500.woff2'))).toBe(true);
      expect(fs.existsSync(path.join(fontsDir, 'cormorant-garamond-600.woff2'))).toBe(true);
      expect(fs.existsSync(path.join(fontsDir, 'cormorant-garamond-400-italic.woff2'))).toBe(true);
    });

    it('should have all DM Sans font files', () => {
      const fontsDir = path.join(process.cwd(), 'public/fonts');

      expect(fs.existsSync(path.join(fontsDir, 'dm-sans-300.woff2'))).toBe(true);
      expect(fs.existsSync(path.join(fontsDir, 'dm-sans-400.woff2'))).toBe(true);
      expect(fs.existsSync(path.join(fontsDir, 'dm-sans-500.woff2'))).toBe(true);
      expect(fs.existsSync(path.join(fontsDir, 'dm-sans-600.woff2'))).toBe(true);
    });

    it('should have valid font files (not error pages)', () => {
      const fontsDir = path.join(process.cwd(), 'public/fonts');
      const fontFiles = [
        'cormorant-garamond-300.woff2',
        'cormorant-garamond-400.woff2',
        'cormorant-garamond-500.woff2',
        'cormorant-garamond-600.woff2',
        'cormorant-garamond-400-italic.woff2',
        'dm-sans-300.woff2',
        'dm-sans-400.woff2',
        'dm-sans-500.woff2',
        'dm-sans-600.woff2',
      ];

      for (const fontFile of fontFiles) {
        const fontPath = path.join(fontsDir, fontFile);
        const stats = fs.statSync(fontPath);

        // Real woff2 fonts are 10KB+, error pages are ~1.6KB
        expect(stats.size).toBeGreaterThan(10000);
      }
    });

    it('should have woff2 magic bytes (not HTML)', () => {
      const fontsDir = path.join(process.cwd(), 'public/fonts');
      const fontPath = path.join(fontsDir, 'dm-sans-400.woff2');
      const buffer = fs.readFileSync(fontPath);

      // woff2 files start with 'wOF2' magic bytes (0x774F4632)
      // HTML files start with '<!DO' (0x3C21444F)
      const magicBytes = buffer.slice(0, 4).toString('ascii');
      expect(magicBytes).toBe('wOF2');
    });
  });
});
