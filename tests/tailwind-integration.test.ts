/**
 * Tailwind CSS v4 Integration Tests (demo8 - Glassmorphism)
 *
 * Verifies Tailwind utilities are properly configured (AC #1, #2, #3, #6)
 */

import { describe, it, expect } from 'vitest';
import * as fs from 'node:fs';
import * as path from 'node:path';

describe('Tailwind v4 Configuration (demo8)', () => {
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
      expect(content).toContain('--glass-');
      expect(content).toContain('--radius-');
    });

    it('should have fonts.css with demo8 font declarations', () => {
      const fontsPath = path.join(process.cwd(), 'src/styles/fonts.css');
      const content = fs.readFileSync(fontsPath, 'utf-8');

      expect(content).toContain('@font-face');
      expect(content).toContain('Cinzel');
      expect(content).toContain('Josefin Sans');
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
    it('should define primary rose gold colors in tailwind.css', () => {
      const tailwindPath = path.join(process.cwd(), 'src/styles/tailwind.css');
      const content = fs.readFileSync(tailwindPath, 'utf-8');

      expect(content).toContain('--color-primary: #B76E79');
      expect(content).toContain('--color-primary-light: #D4A5A5');
      expect(content).toContain('--color-primary-dark: #8B4D57');
    });

    it('should define secondary gold colors', () => {
      const tailwindPath = path.join(process.cwd(), 'src/styles/tailwind.css');
      const content = fs.readFileSync(tailwindPath, 'utf-8');

      expect(content).toContain('--color-secondary: #C9A87C');
      expect(content).toContain('--color-secondary-light: #E0C9A6');
    });

    it('should define cream palette', () => {
      const tailwindPath = path.join(process.cwd(), 'src/styles/tailwind.css');
      const content = fs.readFileSync(tailwindPath, 'utf-8');

      expect(content).toContain('--color-cream: #F5EDE8');
      expect(content).toContain('--color-cream-mid: #E8DCD4');
      expect(content).toContain('--color-cream-soft: #DDD0C6');
      expect(content).toContain('--color-cream-warm: #F0E6E0');
      expect(content).toContain('--color-cream-white: #FFFAF8');
    });

    it('should define dark colors', () => {
      const tailwindPath = path.join(process.cwd(), 'src/styles/tailwind.css');
      const content = fs.readFileSync(tailwindPath, 'utf-8');

      expect(content).toContain('--color-black: #1A1A1A');
      expect(content).toContain('--color-charcoal: #2A2A2A');
      expect(content).toContain('--color-charcoal-soft: #4A4A4A');
    });

    it('should define glass colors', () => {
      const tailwindPath = path.join(process.cwd(), 'src/styles/tailwind.css');
      const content = fs.readFileSync(tailwindPath, 'utf-8');

      expect(content).toContain('--color-glass-white');
      expect(content).toContain('--color-glass-strong');
      expect(content).toContain('--color-glass-border');
    });
  });

  describe('Font Tokens (AC #2)', () => {
    it('should define Cinzel as display font', () => {
      const tailwindPath = path.join(process.cwd(), 'src/styles/tailwind.css');
      const content = fs.readFileSync(tailwindPath, 'utf-8');

      expect(content).toContain("--font-display: 'Cinzel'");
      expect(content).toContain('Georgia');
      expect(content).toContain('serif');
    });

    it('should define Josefin Sans as body font', () => {
      const tailwindPath = path.join(process.cwd(), 'src/styles/tailwind.css');
      const content = fs.readFileSync(tailwindPath, 'utf-8');

      expect(content).toContain("--font-body: 'Josefin Sans'");
      expect(content).toContain('-apple-system');
      expect(content).toContain('sans-serif');
    });
  });

  describe('Glass Utilities (AC #3, #7)', () => {
    it('should define .glass utility class', () => {
      const tailwindPath = path.join(process.cwd(), 'src/styles/tailwind.css');
      const content = fs.readFileSync(tailwindPath, 'utf-8');

      expect(content).toContain('.glass');
      expect(content).toContain('backdrop-filter: blur(25px)');
      expect(content).toContain('-webkit-backdrop-filter: blur(25px)');
      expect(content).toContain('rgba(255, 255, 255, 0.15)');
    });

    it('should define .glass-strong utility class', () => {
      const tailwindPath = path.join(process.cwd(), 'src/styles/tailwind.css');
      const content = fs.readFileSync(tailwindPath, 'utf-8');

      expect(content).toContain('.glass-strong');
      expect(content).toContain('backdrop-filter: blur(30px)');
      expect(content).toContain('-webkit-backdrop-filter: blur(30px)');
      expect(content).toContain('rgba(255, 255, 255, 0.25)');
    });

    it('should define .glass-dark utility class', () => {
      const tailwindPath = path.join(process.cwd(), 'src/styles/tailwind.css');
      const content = fs.readFileSync(tailwindPath, 'utf-8');

      expect(content).toContain('.glass-dark');
      expect(content).toContain('rgba(183, 110, 121, 0.7)');
    });

    it('should define .text-gradient utility class', () => {
      const tailwindPath = path.join(process.cwd(), 'src/styles/tailwind.css');
      const content = fs.readFileSync(tailwindPath, 'utf-8');

      expect(content).toContain('.text-gradient');
      expect(content).toContain('linear-gradient');
      expect(content).toContain('-webkit-background-clip: text');
      expect(content).toContain('-webkit-text-fill-color: transparent');
    });
  });

  describe('Shadow Tokens (AC #6)', () => {
    it('should define rose gold tinted shadows', () => {
      const tailwindPath = path.join(process.cwd(), 'src/styles/tailwind.css');
      const content = fs.readFileSync(tailwindPath, 'utf-8');

      expect(content).toContain('--shadow-sm: 0 2px 10px rgba(183, 110, 121, 0.08)');
      expect(content).toContain('--shadow-md: 0 8px 30px rgba(183, 110, 121, 0.12)');
      expect(content).toContain('--shadow-lg: 0 20px 50px rgba(183, 110, 121, 0.15)');
      expect(content).toContain('--shadow-glow: 0 0 40px rgba(212, 165, 165, 0.3)');
    });
  });

  describe('Border Radius Tokens (AC #3)', () => {
    it('should define glass border radius values', () => {
      const tailwindPath = path.join(process.cwd(), 'src/styles/tailwind.css');
      const content = fs.readFileSync(tailwindPath, 'utf-8');

      expect(content).toContain('--radius-glass-sm: 12px');
      expect(content).toContain('--radius-glass-md: 20px');
      expect(content).toContain('--radius-glass-lg: 28px');
    });
  });

  describe('Easing Tokens', () => {
    it('should define smooth and bounce easing', () => {
      const tailwindPath = path.join(process.cwd(), 'src/styles/tailwind.css');
      const content = fs.readFileSync(tailwindPath, 'utf-8');

      expect(content).toContain('--ease-smooth: cubic-bezier(0.4, 0, 0.2, 1)');
      expect(content).toContain('--ease-bounce: cubic-bezier(0.34, 1.56, 0.64, 1)');
    });
  });

  describe('Fluid Typography (AC #2, #4)', () => {
    it('should define demo8 heading utilities', () => {
      const tailwindPath = path.join(process.cwd(), 'src/styles/tailwind.css');
      const content = fs.readFileSync(tailwindPath, 'utf-8');

      expect(content).toContain('.heading-xl');
      expect(content).toContain('clamp(2.5rem, 7vw, 4.5rem)');
      expect(content).toContain('.heading-lg');
      expect(content).toContain('clamp(2rem, 5vw, 3rem)');
      expect(content).toContain('.heading-md');
      expect(content).toContain('clamp(1.5rem, 3vw, 2rem)');
      expect(content).toContain('.heading-sm');
      expect(content).toContain('clamp(1.25rem, 2vw, 1.5rem)');
    });

    it('should define .heading-display utility', () => {
      const tailwindPath = path.join(process.cwd(), 'src/styles/tailwind.css');
      const content = fs.readFileSync(tailwindPath, 'utf-8');

      expect(content).toContain('.heading-display');
      expect(content).toContain('letter-spacing: 0.02em');
    });

    it('should define .overline utility', () => {
      const tailwindPath = path.join(process.cwd(), 'src/styles/tailwind.css');
      const content = fs.readFileSync(tailwindPath, 'utf-8');

      expect(content).toContain('.overline');
      expect(content).toContain('text-transform: uppercase');
      expect(content).toContain('letter-spacing: 0.2em');
    });
  });

  describe('Reduced Motion Support (AC #8)', () => {
    it('should disable animations for prefers-reduced-motion', () => {
      const tailwindPath = path.join(process.cwd(), 'src/styles/tailwind.css');
      const content = fs.readFileSync(tailwindPath, 'utf-8');

      expect(content).toContain('@media (prefers-reduced-motion: reduce)');
      expect(content).toContain('animation-duration: 0.01ms !important');
      expect(content).toContain('transition-duration: 0.01ms !important');
    });
  });
});

describe('Animated Background Component (AC #8)', () => {
  it('should exist at the correct path', () => {
    const componentPath = path.join(process.cwd(), 'src/components/common/animated-background.astro');
    expect(fs.existsSync(componentPath)).toBe(true);
  });

  it('should contain liquid orb animations', () => {
    const componentPath = path.join(process.cwd(), 'src/components/common/animated-background.astro');
    const content = fs.readFileSync(componentPath, 'utf-8');

    expect(content).toContain('bg-orb');
    expect(content).toContain('liquidOrbFloat');
    expect(content).toContain('filter: blur(80px)');
    expect(content).toContain('20s ease-in-out infinite');
  });

  it('should respect prefers-reduced-motion', () => {
    const componentPath = path.join(process.cwd(), 'src/components/common/animated-background.astro');
    const content = fs.readFileSync(componentPath, 'utf-8');

    expect(content).toContain('@media (prefers-reduced-motion: reduce)');
    expect(content).toContain('animation: none');
  });

  it('should use rose gold gradient colors', () => {
    const componentPath = path.join(process.cwd(), 'src/components/common/animated-background.astro');
    const content = fs.readFileSync(componentPath, 'utf-8');

    expect(content).toContain('#B76E79');
    expect(content).toContain('#D4A5A5');
  });
});

describe('Font Files (AC #2, #4)', () => {
  it('should have Cinzel font files', () => {
    const fontWeights = ['400', '500', '600', '700'];
    fontWeights.forEach(weight => {
      const fontPath = path.join(process.cwd(), `public/fonts/cinzel-${weight}.woff2`);
      expect(fs.existsSync(fontPath)).toBe(true);

      // Verify file is not empty and is valid woff2 (>10KB)
      const stats = fs.statSync(fontPath);
      expect(stats.size).toBeGreaterThan(10000);

      // Verify woff2 magic bytes
      const buffer = fs.readFileSync(fontPath);
      expect(buffer[0]).toBe(0x77); // 'w'
      expect(buffer[1]).toBe(0x4F); // 'O'
      expect(buffer[2]).toBe(0x46); // 'F'
      expect(buffer[3]).toBe(0x32); // '2'
    });
  });

  it('should have Josefin Sans font files', () => {
    const fontWeights = ['300', '400', '500', '600', '700'];
    fontWeights.forEach(weight => {
      const fontPath = path.join(process.cwd(), `public/fonts/josefin-sans-${weight}.woff2`);
      expect(fs.existsSync(fontPath)).toBe(true);

      // Verify file is not empty and is valid woff2 (>10KB)
      const stats = fs.statSync(fontPath);
      expect(stats.size).toBeGreaterThan(10000);

      // Verify woff2 magic bytes
      const buffer = fs.readFileSync(fontPath);
      expect(buffer[0]).toBe(0x77); // 'w'
      expect(buffer[1]).toBe(0x4F); // 'O'
      expect(buffer[2]).toBe(0x46); // 'F'
      expect(buffer[3]).toBe(0x32); // '2'
    });
  });

  it('should have removed old demo6 font files', () => {
    const oldFonts = [
      'cormorant-garamond-300.woff2',
      'cormorant-garamond-400.woff2',
      'cormorant-garamond-400-italic.woff2',
      'cormorant-garamond-500.woff2',
      'cormorant-garamond-600.woff2',
      'dm-sans-300.woff2',
      'dm-sans-400.woff2',
      'dm-sans-500.woff2',
      'dm-sans-600.woff2',
    ];

    oldFonts.forEach(font => {
      const fontPath = path.join(process.cwd(), `public/fonts/${font}`);
      expect(fs.existsSync(fontPath)).toBe(false);
    });
  });
});
