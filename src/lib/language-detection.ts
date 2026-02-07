/**
 * Language Detection Utility
 *
 * Pure language detection logic extracted for testability.
 * Used by middleware and can be tested independently without Astro runtime.
 */

import type { Lang } from '@/i18n';

export interface LanguageDetectionResult {
  lang: Lang;
  shouldSetCookie: boolean;
}

/**
 * Parse Accept-Language header and return the best supported language.
 *
 * Respects q-value weighting so that a low-priority "es;q=0.1" doesn't
 * override a high-priority "en;q=0.9". Only 'en' and 'es' are supported;
 * unsupported languages are skipped.
 *
 * @param acceptLanguage - Raw Accept-Language header value
 * @returns Best matching supported language, defaults to 'en'
 */
export function parseAcceptLanguage(acceptLanguage: string): Lang {
  if (!acceptLanguage) return 'en';

  const entries = acceptLanguage.split(',').map((entry) => {
    const parts = entry.trim().split(';');
    const tag = parts[0].trim().toLowerCase();
    const qMatch = parts[1]?.match(/q=([\d.]+)/);
    const q = qMatch ? parseFloat(qMatch[1]) : 1.0;
    return { tag, q };
  });

  // Sort by q-value descending (stable sort preserves header order for ties)
  entries.sort((a, b) => b.q - a.q);

  // Return the first supported language by priority
  for (const { tag } of entries) {
    if (tag === 'es' || tag.startsWith('es-')) return 'es';
    if (tag === 'en' || tag.startsWith('en-')) return 'en';
  }

  return 'en';
}

/**
 * Core language detection logic (pure function for testability)
 *
 * @param pathname - The URL pathname
 * @param cookieValue - Value of preferredLanguage cookie (if exists)
 * @param acceptLanguage - Value of Accept-Language header
 * @returns Object with lang and shouldSetCookie, or null if not root route
 *
 * Priority:
 * 1. Valid cookie value (en|es) -> use it, don't set cookie
 * 2. No valid cookie -> detect from Accept-Language header, set cookie
 * 3. Default to 'en' if neither present
 *
 * Only processes root route '/'. Returns null for all other routes.
 */
export function detectLanguage(
  pathname: string,
  cookieValue: string | undefined,
  acceptLanguage: string
): LanguageDetectionResult | null {
  // Only process root route
  if (pathname !== '/') {
    return null;
  }

  // Priority 1: Check for existing cookie preference
  if (cookieValue === 'en' || cookieValue === 'es') {
    return { lang: cookieValue, shouldSetCookie: false };
  }

  // Priority 2: Detect language from Accept-Language header with q-value parsing
  const detectedLang = parseAcceptLanguage(acceptLanguage);

  return { lang: detectedLang, shouldSetCookie: true };
}
