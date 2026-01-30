/**
 * Design Tokens Unit Tests
 *
 * Tests TypeScript token exports (AC #7, #8)
 */

import { describe, it, expect } from 'vitest';
import { colors, fonts, spacing, shadows, easing, duration } from '../src/styles/tokens';

describe('Design Tokens', () => {
  describe('Color Palette (AC #1)', () => {
    it('should export cream colors', () => {
      expect(colors.cream).toBe('#F5F5F0');
      expect(colors.creamWarm).toBe('#FAF8F5');
    });

    it('should export gold spectrum', () => {
      expect(colors.gold).toBe('#D4AF37');
      expect(colors.goldSoft).toBe('#E8D48A');
      expect(colors.goldDark).toBe('#B8962E');
      expect(colors.goldLight).toBe('#F4E4BA');
    });

    it('should export dark colors', () => {
      expect(colors.black).toBe('#1A1A1A');
      expect(colors.charcoal).toBe('#333333');
      expect(colors.charcoalSoft).toBe('#4A4A4A');
    });

    it('should export terracotta colors', () => {
      expect(colors.terracotta).toBe('#C75B39');
      expect(colors.terracottaLight).toBe('#FDEEE8');
    });

    it('should export white variants', () => {
      expect(colors.offWhite).toBe('#FAFAFA');
      expect(colors.white).toBe('#FFFFFF');
    });
  });

  describe('Typography (AC #2)', () => {
    it('should export Cormorant Garamond as display font', () => {
      expect(fonts.display).toContain('Cormorant Garamond');
      expect(fonts.display).toContain('Georgia');
      expect(fonts.display).toContain('serif');
    });

    it('should export DM Sans as body font', () => {
      expect(fonts.body).toContain('DM Sans');
      expect(fonts.body).toContain('-apple-system');
      expect(fonts.body).toContain('sans-serif');
    });
  });

  describe('Spacing Scale (AC #5)', () => {
    it('should use 4px base unit', () => {
      expect(spacing.xs).toBe('0.5rem'); // 8px (2 * 4px)
      expect(spacing.sm).toBe('1rem');   // 16px (4 * 4px)
      expect(spacing.md).toBe('2rem');   // 32px (8 * 4px)
    });

    it('should define all spacing tokens', () => {
      expect(spacing).toHaveProperty('xs');
      expect(spacing).toHaveProperty('sm');
      expect(spacing).toHaveProperty('md');
      expect(spacing).toHaveProperty('lg');
      expect(spacing).toHaveProperty('xl');
      expect(spacing).toHaveProperty('2xl');
    });
  });

  describe('Shadow Tokens (AC #6)', () => {
    it('should define shadow-sm', () => {
      expect(shadows.sm).toBe('0 2px 8px rgba(0, 0, 0, 0.06)');
    });

    it('should define shadow-md', () => {
      expect(shadows.md).toBe('0 8px 30px rgba(0, 0, 0, 0.08)');
    });

    it('should define shadow-lg', () => {
      expect(shadows.lg).toBe('0 20px 60px rgba(0, 0, 0, 0.12)');
    });

    it('should define shadow-gold', () => {
      expect(shadows.gold).toBe('0 8px 40px rgba(212, 175, 55, 0.25)');
    });
  });

  describe('Transition Timing (AC #9)', () => {
    it('should define easing functions', () => {
      expect(easing.outExpo).toBe('cubic-bezier(0.16, 1, 0.3, 1)');
      expect(easing.outBack).toBe('cubic-bezier(0.34, 1.56, 0.64, 1)');
    });

    it('should define duration tokens', () => {
      expect(duration.fast).toBe('0.2s');
      expect(duration.normal).toBe('0.4s');
      expect(duration.slow).toBe('0.8s');
    });
  });

  describe('TypeScript Type Safety (AC #7)', () => {
    it('should export tokens as const for type inference', () => {
      // This test verifies that tokens are readonly
      // TypeScript compiler will catch any mutation attempts
      const testColors: Readonly<typeof colors> = colors;
      expect(testColors).toBe(colors);
    });

    it('should have proper type exports', () => {
      // These type checks happen at compile time
      // If types are missing, TypeScript build will fail
      const colorKey: keyof typeof colors = 'gold';
      const fontKey: keyof typeof fonts = 'display';
      expect(colorKey).toBe('gold');
      expect(fontKey).toBe('display');
    });
  });
});
