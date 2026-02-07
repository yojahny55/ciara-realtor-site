/**
 * Language Detection Middleware
 *
 * Implements automatic language detection and redirection for root route (/).
 * Priority: Cookie preference > Accept-Language header > Default (en)
 *
 * Features:
 * - Detects browser language via Accept-Language header
 * - Persists preference in preferredLanguage cookie
 * - Only intercepts root route (/) - language-prefixed routes pass through
 * - Uses 302 temporary redirect
 */

import { defineMiddleware } from 'astro:middleware';
import { detectLanguage } from '@/lib/language-detection';

export const onRequest = defineMiddleware(async (context, next) => {
  const { pathname } = context.url;

  // Only root route needs language detection; skip early for all other
  // routes to avoid accessing request.headers on prerendered pages.
  if (pathname !== '/') {
    return next();
  }

  const cookies = context.cookies;
  const savedLang = cookies.get('preferredLanguage')?.value;
  const acceptLang = context.request.headers.get('Accept-Language') || '';

  const result = detectLanguage(pathname, savedLang, acceptLang);

  // detectLanguage returns null for non-root routes (already guarded above)
  if (!result) return next();

  // Set cookie if needed (first-time detection)
  if (result.shouldSetCookie) {
    cookies.set('preferredLanguage', result.lang, {
      path: '/',
      maxAge: 60 * 60 * 24 * 365, // 1 year in seconds
      sameSite: 'lax',
    });
  }

  // Redirect to detected language route
  return context.redirect(`/${result.lang}/`, 302);
});
