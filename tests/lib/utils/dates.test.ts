/**
 * Unit tests for date utilities
 */
import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest';

import { formatDate, formatDateTime, timeAgo, nowISO } from '@lib/utils';

describe('formatDate', () => {
  it('formats date correctly for English', () => {
    const result = formatDate('2026-01-30T12:00:00Z', 'en');
    expect(result).toBe('January 30, 2026');
  });

  it('formats date correctly for Spanish', () => {
    const result = formatDate('2026-01-30T12:00:00Z', 'es');
    expect(result).toBe('30 de enero de 2026');
  });

  it('handles different months', () => {
    expect(formatDate('2026-06-15T12:00:00Z', 'en')).toBe('June 15, 2026');
    expect(formatDate('2026-12-25T12:00:00Z', 'en')).toBe('December 25, 2026');
  });

  it('handles different years', () => {
    // Using noon UTC to avoid timezone edge cases
    expect(formatDate('2024-01-15T12:00:00Z', 'en')).toBe('January 15, 2024');
    expect(formatDate('2030-12-15T12:00:00Z', 'en')).toBe('December 15, 2030');
  });
});

describe('formatDateTime', () => {
  it('formats date and time for English', () => {
    const result = formatDateTime('2026-01-30T14:30:00Z', 'en');
    // Result includes time component
    expect(result).toMatch(/January 30, 2026/);
    expect(result).toMatch(/\d{1,2}:\d{2}/);
  });

  it('formats date and time for Spanish', () => {
    const result = formatDateTime('2026-01-30T14:30:00Z', 'es');
    expect(result).toMatch(/30 de enero de 2026/);
    expect(result).toMatch(/\d{1,2}:\d{2}/);
  });
});

describe('timeAgo', () => {
  beforeEach(() => {
    // Mock Date.now() to a fixed time
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2026-01-30T12:00:00Z'));
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('returns relative time for days ago in English', () => {
    const result = timeAgo('2026-01-27T12:00:00Z', 'en');
    expect(result).toBe('3 days ago');
  });

  it('returns relative time for days ago in Spanish', () => {
    const result = timeAgo('2026-01-27T12:00:00Z', 'es');
    expect(result).toBe('hace 3 días');
  });

  it('handles yesterday', () => {
    const result = timeAgo('2026-01-29T12:00:00Z', 'en');
    expect(result).toBe('yesterday');
  });

  it('handles hours ago', () => {
    const result = timeAgo('2026-01-30T09:00:00Z', 'en');
    expect(result).toBe('3 hours ago');
  });

  it('handles minutes ago', () => {
    const result = timeAgo('2026-01-30T11:30:00Z', 'en');
    expect(result).toBe('30 minutes ago');
  });

  it('handles weeks ago', () => {
    const result = timeAgo('2026-01-16T12:00:00Z', 'en');
    expect(result).toBe('2 weeks ago');
  });

  it('handles months ago', () => {
    const result = timeAgo('2025-12-01T12:00:00Z', 'en');
    // Approximately 2 months ago
    expect(result).toMatch(/month/);
  });
});

describe('nowISO', () => {
  it('returns current time as ISO string', () => {
    const result = nowISO();
    // Check format matches ISO 8601
    expect(result).toMatch(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/);
  });

  it('returns parseable date string', () => {
    const result = nowISO();
    const date = new Date(result);
    expect(date.toString()).not.toBe('Invalid Date');
  });

  it('returns current time (within tolerance)', () => {
    const before = Date.now();
    const result = nowISO();
    const after = Date.now();

    const resultMs = new Date(result).getTime();
    expect(resultMs).toBeGreaterThanOrEqual(before);
    expect(resultMs).toBeLessThanOrEqual(after);
  });
});
