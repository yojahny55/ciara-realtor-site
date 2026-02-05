/**
 * String helper utilities
 */

/**
 * Truncates a string to a maximum length, adding ellipsis if needed
 *
 * @param str - String to truncate
 * @param maxLength - Maximum length (including ellipsis)
 * @returns Truncated string
 *
 * @example
 * truncate('Hello World', 8); // "Hello..."
 */
export function truncate(str: string, maxLength: number): string {
  if (str.length <= maxLength) {
    return str;
  }
  return str.slice(0, maxLength - 3) + '...';
}

/**
 * Capitalizes the first letter of a string
 *
 * @param str - String to capitalize
 * @returns Capitalized string
 */
export function capitalize(str: string): string {
  if (!str) return str;
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * Converts a string to kebab-case
 *
 * @param str - String to convert
 * @returns kebab-case string
 *
 * @example
 * toKebabCase('Hello World'); // "hello-world"
 * toKebabCase('camelCase'); // "camel-case"
 */
export function toKebabCase(str: string): string {
  return str
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/[\s_]+/g, '-')
    .toLowerCase();
}

/**
 * Formats a phone number for display (US format)
 *
 * @param phone - Phone number string with digits only
 * @returns Formatted phone string or original if can't format
 *
 * @example
 * formatPhone('5551234567'); // "(555) 123-4567"
 */
export function formatPhone(phone: string): string {
  const digits = phone.replace(/\D/g, '');

  if (digits.length === 10) {
    return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
  }

  if (digits.length === 11 && digits.startsWith('1')) {
    return `+1 (${digits.slice(1, 4)}) ${digits.slice(4, 7)}-${digits.slice(7)}`;
  }

  return phone;
}

/**
 * Formats a price as USD currency
 *
 * @param price - Price in dollars
 * @param locale - Locale for formatting ('en' or 'es')
 * @returns Formatted price string
 *
 * @example
 * formatPrice(450000, 'en'); // "$450,000"
 */
export function formatPrice(price: number, locale: 'en' | 'es' = 'en'): string {
  return new Intl.NumberFormat(locale === 'en' ? 'en-US' : 'es-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(price);
}

/**
 * Slugifies a string for URL-safe paths
 *
 * @param str - String to slugify
 * @returns URL-safe slug
 *
 * @example
 * slugify('Hello World!'); // "hello-world"
 */
export function slugify(str: string): string {
  return str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Remove diacritics
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}
