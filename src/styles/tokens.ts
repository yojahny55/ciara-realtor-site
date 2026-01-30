/**
 * Design Token Exports (TypeScript)
 *
 * AC #7: TypeScript token export with type inference
 *
 * These tokens are exported as const for type inference and tree-shaking.
 * Follows project rule: Named exports only (no default exports).
 *
 * Usage:
 * import { colors, fonts, shadows } from '@/styles/tokens';
 * const bgColor = colors.cream;
 */

/* ═══════════════════════════════════════════════════════════════
   COLOR PALETTE
   Source: demo6 design system
═══════════════════════════════════════════════════════════════ */

export const colors = {
  // Core Palette
  white: '#FFFFFF',
  offWhite: '#FAFAFA',
  cream: '#F5F5F0',
  creamWarm: '#FAF8F5',

  // Gold Spectrum
  gold: '#D4AF37',
  goldSoft: '#E8D48A',
  goldLight: '#F4E4BA',
  goldDark: '#B8962E',

  // Darks
  black: '#1A1A1A',
  charcoal: '#333333',
  charcoalSoft: '#4A4A4A',

  // Warmth Accent
  terracotta: '#C75B39',
  terracottaLight: '#FDEEE8',
} as const;

/* ═══════════════════════════════════════════════════════════════
   FONT FAMILIES
═══════════════════════════════════════════════════════════════ */

export const fonts = {
  display: "'Cormorant Garamond', Georgia, serif",
  body: "'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif",
} as const;

/* ═══════════════════════════════════════════════════════════════
   SPACING SCALE
   Base unit: 4px
═══════════════════════════════════════════════════════════════ */

export const spacing = {
  xs: '0.5rem',   // 8px
  sm: '1rem',     // 16px
  md: '2rem',     // 32px
  lg: '4rem',     // 64px
  xl: '8rem',     // 128px
  '2xl': '12rem', // 192px
} as const;

/* ═══════════════════════════════════════════════════════════════
   SHADOW TOKENS
═══════════════════════════════════════════════════════════════ */

export const shadows = {
  sm: '0 2px 8px rgba(0, 0, 0, 0.06)',
  md: '0 8px 30px rgba(0, 0, 0, 0.08)',
  lg: '0 20px 60px rgba(0, 0, 0, 0.12)',
  gold: '0 8px 40px rgba(212, 175, 55, 0.25)',
} as const;

/* ═══════════════════════════════════════════════════════════════
   TRANSITION TIMING
═══════════════════════════════════════════════════════════════ */

export const easing = {
  outExpo: 'cubic-bezier(0.16, 1, 0.3, 1)',
  outBack: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
} as const;

export const duration = {
  fast: '0.2s',
  normal: '0.4s',
  slow: '0.8s',
} as const;

/* ═══════════════════════════════════════════════════════════════
   TYPE EXPORTS FOR AUTOCOMPLETE
═══════════════════════════════════════════════════════════════ */

export type ColorKey = keyof typeof colors;
export type FontKey = keyof typeof fonts;
export type SpacingKey = keyof typeof spacing;
export type ShadowKey = keyof typeof shadows;
export type EasingKey = keyof typeof easing;
export type DurationKey = keyof typeof duration;
