/**
 * Layout Props Type Definitions
 *
 * Exported types for layout components to ensure consistency
 * and allow pages to type their props correctly.
 */

/** Base layout SEO props - used by all layouts */
export interface BaseLayoutProps {
  /** Page title (will be suffixed with site name) */
  title: string;
  /** Meta description for SEO (155-160 chars recommended) */
  description: string;
  /** OG image URL - absolute or relative to site root */
  image?: string;
  /** Canonical URL override */
  canonical?: string;
  /** Prevent search engine indexing */
  noindex?: boolean;
  /** Open Graph type */
  type?: 'website' | 'article';
}

/** Page layout props - extends Base with layout options */
export interface PageLayoutProps extends BaseLayoutProps {
  /** Container max-width */
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  /** Remove default padding (for full-bleed sections) */
  noPadding?: boolean;
}

/** Max-width value mapping for Tailwind classes */
export const maxWidthClasses = {
  sm: 'max-w-screen-sm',
  md: 'max-w-screen-md',
  lg: 'max-w-screen-lg',
  xl: 'max-w-screen-xl',
  full: 'max-w-full',
} as const;
