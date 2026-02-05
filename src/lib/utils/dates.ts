/**
 * Date formatting utilities using Intl (no external libraries)
 * Source: architecture.md - ISO 8601 for all dates, use Intl for display
 */

import type { SupportedLanguage } from '@types/lead';

const LOCALE_MAP: Record<SupportedLanguage, string> = {
  en: 'en-US',
  es: 'es-US',
};

/**
 * Formats an ISO 8601 date string for display
 *
 * @param isoString - ISO 8601 date string
 * @param locale - Language code ('en' or 'es')
 * @returns Formatted date string (e.g., "January 30, 2026")
 *
 * @example
 * formatDate('2026-01-30T12:00:00Z', 'en'); // "January 30, 2026"
 * formatDate('2026-01-30T12:00:00Z', 'es'); // "30 de enero de 2026"
 */
export function formatDate(isoString: string, locale: SupportedLanguage): string {
  return new Intl.DateTimeFormat(LOCALE_MAP[locale], {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(isoString));
}

/**
 * Formats an ISO 8601 date string with time
 *
 * @param isoString - ISO 8601 date string
 * @param locale - Language code ('en' or 'es')
 * @returns Formatted date and time string
 */
export function formatDateTime(isoString: string, locale: SupportedLanguage): string {
  return new Intl.DateTimeFormat(LOCALE_MAP[locale], {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  }).format(new Date(isoString));
}

/**
 * Returns a relative time string (e.g., "3 days ago")
 *
 * @param isoString - ISO 8601 date string
 * @param locale - Language code ('en' or 'es')
 * @returns Relative time string
 *
 * @example
 * timeAgo('2026-01-27T12:00:00Z', 'en'); // "3 days ago"
 * timeAgo('2026-01-27T12:00:00Z', 'es'); // "hace 3 días"
 */
export function timeAgo(isoString: string, locale: SupportedLanguage): string {
  const rtf = new Intl.RelativeTimeFormat(LOCALE_MAP[locale], { numeric: 'auto' });
  const date = new Date(isoString);
  const now = Date.now();
  const diffMs = date.getTime() - now;

  // Convert to the most appropriate unit
  const diffSeconds = Math.round(diffMs / 1000);
  const diffMinutes = Math.round(diffMs / (1000 * 60));
  const diffHours = Math.round(diffMs / (1000 * 60 * 60));
  const diffDays = Math.round(diffMs / (1000 * 60 * 60 * 24));
  const diffWeeks = Math.round(diffMs / (1000 * 60 * 60 * 24 * 7));
  const diffMonths = Math.round(diffMs / (1000 * 60 * 60 * 24 * 30));

  if (Math.abs(diffSeconds) < 60) {
    return rtf.format(diffSeconds, 'second');
  }
  if (Math.abs(diffMinutes) < 60) {
    return rtf.format(diffMinutes, 'minute');
  }
  if (Math.abs(diffHours) < 24) {
    return rtf.format(diffHours, 'hour');
  }
  if (Math.abs(diffDays) < 7) {
    return rtf.format(diffDays, 'day');
  }
  if (Math.abs(diffWeeks) < 4) {
    return rtf.format(diffWeeks, 'week');
  }
  return rtf.format(diffMonths, 'month');
}

/**
 * Gets the current timestamp in ISO 8601 format
 *
 * @returns Current timestamp as ISO string
 */
export function nowISO(): string {
  return new Date().toISOString();
}
