/**
 * Unit tests for validation helper utilities
 */
import { describe, expect, it } from 'vitest';
import { z } from 'zod';

import { safeValidate, validateOrThrow } from '@lib/schemas';

// Test schema for validation utilities
const testSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  age: z.number().min(0, 'Age must be positive'),
  email: z.string().email('Invalid email'),
});

describe('safeValidate', () => {
  it('returns success true with data for valid input', () => {
    const validData = { name: 'John', age: 30, email: 'john@example.com' };
    const result = safeValidate(testSchema, validData);

    expect(result.success).toBe(true);
    expect(result.data).toEqual(validData);
    expect(result.errors).toBeUndefined();
  });

  it('returns success false with errors for invalid input', () => {
    const invalidData = { name: '', age: -5, email: 'not-an-email' };
    const result = safeValidate(testSchema, invalidData);

    expect(result.success).toBe(false);
    expect(result.data).toBeUndefined();
    expect(result.errors).toBeDefined();
    expect(result.errors!.length).toBeGreaterThan(0);
  });

  it('formats errors with path and message', () => {
    const invalidData = { name: '', age: 30, email: 'john@example.com' };
    const result = safeValidate(testSchema, invalidData);

    expect(result.success).toBe(false);
    expect(result.errors).toContainEqual({
      path: 'name',
      message: 'Name is required',
    });
  });

  it('handles nested path errors', () => {
    const nestedSchema = z.object({
      user: z.object({
        profile: z.object({
          name: z.string().min(1, 'Name required'),
        }),
      }),
    });

    const result = safeValidate(nestedSchema, { user: { profile: { name: '' } } });

    expect(result.success).toBe(false);
    expect(result.errors).toContainEqual({
      path: 'user.profile.name',
      message: 'Name required',
    });
  });

  it('handles multiple validation errors', () => {
    const invalidData = { name: '', age: -1, email: 'bad' };
    const result = safeValidate(testSchema, invalidData);

    expect(result.success).toBe(false);
    expect(result.errors!.length).toBe(3);
  });

  it('handles missing required fields', () => {
    const result = safeValidate(testSchema, {});

    expect(result.success).toBe(false);
    expect(result.errors!.length).toBeGreaterThan(0);
  });

  it('handles null input', () => {
    const result = safeValidate(testSchema, null);

    expect(result.success).toBe(false);
    expect(result.errors).toBeDefined();
  });

  it('handles undefined input', () => {
    const result = safeValidate(testSchema, undefined);

    expect(result.success).toBe(false);
    expect(result.errors).toBeDefined();
  });

  it('handles array index in path', () => {
    const arraySchema = z.object({
      items: z.array(z.string().min(1, 'Item required')),
    });

    const result = safeValidate(arraySchema, { items: ['valid', ''] });

    expect(result.success).toBe(false);
    expect(result.errors).toContainEqual({
      path: 'items.1',
      message: 'Item required',
    });
  });

  it('returns empty path for root-level errors', () => {
    const stringSchema = z.string().min(1, 'Required');
    const result = safeValidate(stringSchema, '');

    expect(result.success).toBe(false);
    expect(result.errors).toContainEqual({
      path: '',
      message: 'Required',
    });
  });
});

describe('validateOrThrow', () => {
  it('returns validated data for valid input', () => {
    const validData = { name: 'John', age: 30, email: 'john@example.com' };
    const result = validateOrThrow(testSchema, validData);

    expect(result).toEqual(validData);
  });

  it('throws ZodError for invalid input', () => {
    const invalidData = { name: '', age: -5, email: 'not-an-email' };

    expect(() => validateOrThrow(testSchema, invalidData)).toThrow();
  });

  it('throws error with validation details', () => {
    const invalidData = { name: '', age: 30, email: 'john@example.com' };

    try {
      validateOrThrow(testSchema, invalidData);
      expect.fail('Should have thrown');
    } catch (error) {
      expect(error).toBeInstanceOf(z.ZodError);
      const zodError = error as z.ZodError;
      expect(zodError.errors.length).toBeGreaterThan(0);
      expect(zodError.errors[0].path).toContain('name');
    }
  });

  it('applies schema transformations', () => {
    const transformSchema = z.object({
      name: z.string().trim(),
    });

    const result = validateOrThrow(transformSchema, { name: '  John  ' });
    expect(result.name).toBe('John');
  });

  it('throws for null input', () => {
    expect(() => validateOrThrow(testSchema, null)).toThrow();
  });

  it('throws for undefined input', () => {
    expect(() => validateOrThrow(testSchema, undefined)).toThrow();
  });
});
