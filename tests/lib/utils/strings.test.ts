/**
 * Unit tests for string utilities
 */
import { describe, expect, it } from 'vitest';

import {
  truncate,
  capitalize,
  toKebabCase,
  formatPhone,
  formatPrice,
  slugify,
} from '@lib/utils';

describe('truncate', () => {
  it('returns original string if shorter than max length', () => {
    expect(truncate('Hello', 10)).toBe('Hello');
  });

  it('returns original string if equal to max length', () => {
    expect(truncate('Hello', 5)).toBe('Hello');
  });

  it('truncates with ellipsis if longer than max length', () => {
    expect(truncate('Hello World', 8)).toBe('Hello...');
  });

  it('handles empty string', () => {
    expect(truncate('', 5)).toBe('');
  });

  it('handles very short max length', () => {
    expect(truncate('Hello', 4)).toBe('H...');
  });
});

describe('capitalize', () => {
  it('capitalizes first letter', () => {
    expect(capitalize('hello')).toBe('Hello');
  });

  it('keeps rest of string unchanged', () => {
    expect(capitalize('hello world')).toBe('Hello world');
  });

  it('handles already capitalized string', () => {
    expect(capitalize('Hello')).toBe('Hello');
  });

  it('handles empty string', () => {
    expect(capitalize('')).toBe('');
  });

  it('handles single character', () => {
    expect(capitalize('a')).toBe('A');
  });
});

describe('toKebabCase', () => {
  it('converts spaces to hyphens', () => {
    expect(toKebabCase('Hello World')).toBe('hello-world');
  });

  it('converts camelCase', () => {
    expect(toKebabCase('camelCase')).toBe('camel-case');
  });

  it('converts PascalCase', () => {
    expect(toKebabCase('PascalCase')).toBe('pascal-case');
  });

  it('converts underscores to hyphens', () => {
    expect(toKebabCase('snake_case')).toBe('snake-case');
  });

  it('handles multiple spaces', () => {
    expect(toKebabCase('Hello   World')).toBe('hello-world');
  });

  it('handles already kebab-case', () => {
    expect(toKebabCase('already-kebab')).toBe('already-kebab');
  });
});

describe('formatPhone', () => {
  it('formats 10-digit phone number', () => {
    expect(formatPhone('5551234567')).toBe('(555) 123-4567');
  });

  it('formats 11-digit phone number with country code', () => {
    expect(formatPhone('15551234567')).toBe('+1 (555) 123-4567');
  });

  it('strips non-digits before formatting', () => {
    expect(formatPhone('(555) 123-4567')).toBe('(555) 123-4567');
  });

  it('returns original if cannot format', () => {
    expect(formatPhone('123')).toBe('123');
    expect(formatPhone('12345678901234')).toBe('12345678901234');
  });

  it('handles various input formats', () => {
    expect(formatPhone('555-123-4567')).toBe('(555) 123-4567');
    expect(formatPhone('555.123.4567')).toBe('(555) 123-4567');
    expect(formatPhone('+1 555 123 4567')).toBe('+1 (555) 123-4567');
  });
});

describe('formatPrice', () => {
  it('formats price in English locale', () => {
    expect(formatPrice(450000, 'en')).toBe('$450,000');
  });

  it('formats price in Spanish locale', () => {
    // Spanish US locale uses same format
    expect(formatPrice(450000, 'es')).toBe('$450,000');
  });

  it('removes decimal places', () => {
    expect(formatPrice(450000.99, 'en')).toBe('$450,001');
  });

  it('formats zero', () => {
    expect(formatPrice(0, 'en')).toBe('$0');
  });

  it('formats millions', () => {
    expect(formatPrice(1500000, 'en')).toBe('$1,500,000');
  });

  it('defaults to English locale', () => {
    expect(formatPrice(100000)).toBe('$100,000');
  });
});

describe('slugify', () => {
  it('converts to lowercase', () => {
    expect(slugify('Hello World')).toBe('hello-world');
  });

  it('removes special characters', () => {
    expect(slugify('Hello! World?')).toBe('hello-world');
  });

  it('removes diacritics', () => {
    expect(slugify('Café résumé')).toBe('cafe-resume');
  });

  it('handles multiple spaces', () => {
    expect(slugify('Hello   World')).toBe('hello-world');
  });

  it('removes leading and trailing hyphens', () => {
    expect(slugify('--Hello World--')).toBe('hello-world');
  });

  it('handles numbers', () => {
    expect(slugify('123 Main St')).toBe('123-main-st');
  });

  it('handles Spanish characters', () => {
    expect(slugify('Casa de España')).toBe('casa-de-espana');
  });
});
