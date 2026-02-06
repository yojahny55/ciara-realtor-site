/**
 * Design Token Exports (TypeScript)
 *
 * AC #6: TypeScript token export with type inference
 *
 * These tokens are exported as const for type inference and tree-shaking.
 * Follows project rule: Named exports only (no default exports).
 *
 * Usage:
 * import { colors, fonts, shadows } from '@/styles/tokens';
 * const bgColor = colors.cream;
 */

/* ═══════════════════════════════════════════════════════════════
   COLOR PALETTE (demo8 - Glassmorphism)
   Source: demo8 design system with Rose Gold + Warm Neutrals
═══════════════════════════════════════════════════════════════ */

export const colors = {
  // Core Palette - Rose Gold + Elegant Neutrals
  primary: '#B76E79',
  primaryLight: '#D4A5A5',
  primaryDark: '#8B4D57',
  secondary: '#C9A87C',
  secondaryLight: '#E0C9A6',

  // Backgrounds - Warm Creams
  cream: '#F5EDE8',
  creamMid: '#E8DCD4',
  creamSoft: '#DDD0C6',
  creamWarm: '#F0E6E0',
  creamWhite: '#FFFAF8',

  // Darks
  black: '#1A1A1A',
  charcoal: '#2A2A2A',
  charcoalSoft: '#4A4A4A',

  // White
  white: '#FFFFFF',

  // Glass Effects (RGBA for overlays)
  glassWhite: 'rgba(255, 255, 255, 0.25)',
  glassStrong: 'rgba(255, 255, 255, 0.4)',
  glassBorder: 'rgba(255, 255, 255, 0.3)',

  // Glow Effects
  primaryGlow: 'rgba(212, 165, 165, 0.3)',
  primaryDarkGlow: 'rgba(183, 110, 121, 0.2)',
} as const;

/* ═══════════════════════════════════════════════════════════════
   FONT FAMILIES
═══════════════════════════════════════════════════════════════ */

export const fonts = {
  display: "'Cinzel', Georgia, serif",
  body: "'Josefin Sans', -apple-system, sans-serif",
} as const;

/* ═══════════════════════════════════════════════════════════════
   SPACING SCALE
   Base unit: 4px
═══════════════════════════════════════════════════════════════ */

export const spacing = {
  // Numbered scale (4px base unit)
  '1': '0.25rem',   // 4px - base unit
  '2': '0.5rem',    // 8px
  '3': '0.75rem',   // 12px
  '4': '1rem',      // 16px
  '5': '1.25rem',   // 20px
  '6': '1.5rem',    // 24px
  '8': '2rem',      // 32px
  '10': '2.5rem',   // 40px
  '12': '3rem',     // 48px
  '16': '4rem',     // 64px

  // Named scale (semantic aliases) - demo8 adjusted
  xs: '0.5rem',   // 8px
  sm: '1rem',     // 16px
  md: '2rem',     // 32px
  lg: '4rem',     // 64px
  xl: '6rem',     // 96px (reduced from 128px)
  '2xl': '10rem', // 160px (reduced from 192px)
} as const;

/* ═══════════════════════════════════════════════════════════════
   SHADOW TOKENS (Rose Gold Tints)
═══════════════════════════════════════════════════════════════ */

export const shadows = {
  sm: '0 2px 10px rgba(183, 110, 121, 0.08)',
  md: '0 8px 30px rgba(183, 110, 121, 0.12)',
  lg: '0 20px 50px rgba(183, 110, 121, 0.15)',
  glow: '0 0 40px rgba(212, 165, 165, 0.3)',
} as const;

/* ═══════════════════════════════════════════════════════════════
   BORDER RADIUS TOKENS
═══════════════════════════════════════════════════════════════ */

export const borderRadius = {
  sm: '12px',
  md: '20px',
  lg: '28px',
  full: '100px',
} as const;

/* ═══════════════════════════════════════════════════════════════
   GLASS EFFECT COMPOSITES
   Complete glass effect property sets for programmatic usage
═══════════════════════════════════════════════════════════════ */

export const glassEffects = {
  glass: {
    background: 'rgba(255, 255, 255, 0.15)',
    backdropFilter: 'blur(25px)',
    webkitBackdropFilter: 'blur(25px)',
    border: '1px solid rgba(255, 255, 255, 0.3)',
    borderTop: '1px solid rgba(255, 255, 255, 0.5)',
    boxShadow: '0 8px 32px rgba(183, 110, 121, 0.1), inset 0 1px 2px rgba(255, 255, 255, 0.4)',
  },
  glassStrong: {
    background: 'rgba(255, 255, 255, 0.25)',
    backdropFilter: 'blur(30px)',
    webkitBackdropFilter: 'blur(30px)',
    border: '1px solid rgba(255, 255, 255, 0.4)',
    borderTop: '2px solid rgba(255, 255, 255, 0.7)',
    boxShadow: '0 8px 40px rgba(183, 110, 121, 0.15), inset 0 2px 6px rgba(255, 255, 255, 0.6)',
  },
  glassDark: {
    background: 'rgba(183, 110, 121, 0.7)',
    backdropFilter: 'blur(30px)',
    webkitBackdropFilter: 'blur(30px)',
    border: '1px solid rgba(255, 255, 255, 0.15)',
    borderTop: '1px solid rgba(255, 255, 255, 0.25)',
    boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.2)',
  },
} as const;

/* ═══════════════════════════════════════════════════════════════
   TRANSITION TIMING
═══════════════════════════════════════════════════════════════ */

export const easing = {
  smooth: 'cubic-bezier(0.4, 0, 0.2, 1)',
  bounce: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
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
export type BorderRadiusKey = keyof typeof borderRadius;
export type EasingKey = keyof typeof easing;
export type DurationKey = keyof typeof duration;
export type GlassEffectKey = keyof typeof glassEffects;
