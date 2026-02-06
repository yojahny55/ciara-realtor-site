/**
 * Design Tokens Unit Tests (demo8 - Glassmorphism)
 *
 * Tests TypeScript token exports (AC #6)
 */

import { describe, it, expect } from 'vitest';
import { colors, fonts, spacing, shadows, borderRadius, easing, duration } from '../src/styles/tokens';

describe('Design Tokens (demo8)', () => {
  describe('Color Palette (AC #1)', () => {
    it('should export primary rose gold colors', () => {
      expect(colors.primary).toBe('#B76E79');
      expect(colors.primaryLight).toBe('#D4A5A5');
      expect(colors.primaryDark).toBe('#8B4D57');
    });

    it('should export secondary gold colors', () => {
      expect(colors.secondary).toBe('#C9A87C');
      expect(colors.secondaryLight).toBe('#E0C9A6');
    });

    it('should export cream colors', () => {
      expect(colors.cream).toBe('#F5EDE8');
      expect(colors.creamMid).toBe('#E8DCD4');
      expect(colors.creamSoft).toBe('#DDD0C6');
      expect(colors.creamWarm).toBe('#F0E6E0');
      expect(colors.creamWhite).toBe('#FFFAF8');
    });

    it('should export dark colors', () => {
      expect(colors.black).toBe('#1A1A1A');
      expect(colors.charcoal).toBe('#2A2A2A');
      expect(colors.charcoalSoft).toBe('#4A4A4A');
    });

    it('should export white', () => {
      expect(colors.white).toBe('#FFFFFF');
    });

    it('should export glass colors', () => {
      expect(colors.glassWhite).toBe('rgba(255, 255, 255, 0.25)');
      expect(colors.glassStrong).toBe('rgba(255, 255, 255, 0.4)');
      expect(colors.glassBorder).toBe('rgba(255, 255, 255, 0.3)');
    });

    it('should export glow colors', () => {
      expect(colors.primaryGlow).toBe('rgba(212, 165, 165, 0.3)');
      expect(colors.primaryDarkGlow).toBe('rgba(183, 110, 121, 0.2)');
    });
  });

  describe('Typography (AC #2)', () => {
    it('should export Cinzel as display font', () => {
      expect(fonts.display).toContain('Cinzel');
      expect(fonts.display).toContain('Georgia');
      expect(fonts.display).toContain('serif');
    });

    it('should export Josefin Sans as body font', () => {
      expect(fonts.body).toContain('Josefin Sans');
      expect(fonts.body).toContain('-apple-system');
      expect(fonts.body).toContain('sans-serif');
    });
  });

  describe('Spacing Scale (AC #5)', () => {
    it('should use 4px base unit', () => {
      expect(spacing['1']).toBe('0.25rem'); // 4px (base unit)
      expect(spacing['2']).toBe('0.5rem');  // 8px (2 * 4px)
      expect(spacing['4']).toBe('1rem');    // 16px (4 * 4px)
      expect(spacing['8']).toBe('2rem');    // 32px (8 * 4px)
    });

    it('should define numbered spacing tokens', () => {
      expect(spacing).toHaveProperty('1');
      expect(spacing).toHaveProperty('2');
      expect(spacing).toHaveProperty('3');
      expect(spacing).toHaveProperty('4');
      expect(spacing).toHaveProperty('5');
      expect(spacing).toHaveProperty('6');
      expect(spacing).toHaveProperty('8');
      expect(spacing).toHaveProperty('10');
      expect(spacing).toHaveProperty('12');
      expect(spacing).toHaveProperty('16');
    });

    it('should define named spacing tokens (demo8 adjusted)', () => {
      expect(spacing).toHaveProperty('xs');
      expect(spacing).toHaveProperty('sm');
      expect(spacing).toHaveProperty('md');
      expect(spacing).toHaveProperty('lg');
      expect(spacing.xl).toBe('6rem');   // 96px (reduced from demo6's 128px)
      expect(spacing['2xl']).toBe('10rem'); // 160px (reduced from demo6's 192px)
    });
  });

  describe('Shadow Tokens with Rose Gold Tints (AC #1, #6)', () => {
    it('should define shadow-sm with rose gold tint', () => {
      expect(shadows.sm).toBe('0 2px 10px rgba(183, 110, 121, 0.08)');
    });

    it('should define shadow-md with rose gold tint', () => {
      expect(shadows.md).toBe('0 8px 30px rgba(183, 110, 121, 0.12)');
    });

    it('should define shadow-lg with rose gold tint', () => {
      expect(shadows.lg).toBe('0 20px 50px rgba(183, 110, 121, 0.15)');
    });

    it('should define shadow-glow', () => {
      expect(shadows.glow).toBe('0 0 40px rgba(212, 165, 165, 0.3)');
    });
  });

  describe('Border Radius Tokens (AC #3)', () => {
    it('should define glass border radius values', () => {
      expect(borderRadius.sm).toBe('12px');
      expect(borderRadius.md).toBe('20px');
      expect(borderRadius.lg).toBe('28px');
      expect(borderRadius.full).toBe('100px');
    });
  });

  describe('Transition Timing (demo8)', () => {
    it('should define easing functions', () => {
      expect(easing.smooth).toBe('cubic-bezier(0.4, 0, 0.2, 1)');
      expect(easing.bounce).toBe('cubic-bezier(0.34, 1.56, 0.64, 1)');
    });

    it('should define duration tokens', () => {
      expect(duration.fast).toBe('0.2s');
      expect(duration.normal).toBe('0.4s');
      expect(duration.slow).toBe('0.8s');
    });
  });

  describe('TypeScript Type Safety (AC #6)', () => {
    it('should export tokens as const for type inference', () => {
      // This test verifies that tokens are readonly
      // TypeScript compiler will catch any mutation attempts
      const testColors: Readonly<typeof colors> = colors;
      expect(testColors).toBe(colors);
    });

    it('should have proper type exports', () => {
      // These type checks happen at compile time
      // If types are missing, TypeScript build will fail
      const colorKey: keyof typeof colors = 'primary';
      const fontKey: keyof typeof fonts = 'display';
      const radiusKey: keyof typeof borderRadius = 'md';
      expect(colorKey).toBe('primary');
      expect(fontKey).toBe('display');
      expect(radiusKey).toBe('md');
    });
  });
});
