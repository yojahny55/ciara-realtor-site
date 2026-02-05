/**
 * Unit tests for search params validation schema
 */
import { describe, expect, it } from 'vitest';

import { searchParamsSchema, searchParamsWithRefinement } from '@lib/schemas';

describe('searchParamsSchema', () => {
  it('validates empty search params', () => {
    const result = searchParamsSchema.safeParse({});
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.page).toBe(1); // default value
    }
  });

  it('validates complete search params', () => {
    const validParams = {
      location: 'Miami, FL',
      minPrice: 200000,
      maxPrice: 500000,
      beds: 3,
      baths: 2,
      propertyType: 'single-family',
      sort: 'price-asc',
      page: 2,
    };

    const result = searchParamsSchema.safeParse(validParams);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.location).toBe('Miami, FL');
      expect(result.data.minPrice).toBe(200000);
      expect(result.data.propertyType).toBe('single-family');
    }
  });

  it('coerces string numbers to numbers', () => {
    const stringParams = {
      minPrice: '100000',
      maxPrice: '300000',
      beds: '3',
      baths: '2',
      page: '5',
    };

    const result = searchParamsSchema.safeParse(stringParams);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.minPrice).toBe(100000);
      expect(result.data.maxPrice).toBe(300000);
      expect(result.data.beds).toBe(3);
      expect(result.data.baths).toBe(2);
      expect(result.data.page).toBe(5);
    }
  });

  it('validates all property types', () => {
    const types = ['single-family', 'condo', 'townhouse', 'multi-family'];

    types.forEach((propertyType) => {
      const result = searchParamsSchema.safeParse({ propertyType });
      expect(result.success).toBe(true);
    });
  });

  it('validates all sort orders', () => {
    const sorts = ['price-asc', 'price-desc', 'newest'];

    sorts.forEach((sort) => {
      const result = searchParamsSchema.safeParse({ sort });
      expect(result.success).toBe(true);
    });
  });

  it('rejects invalid property type', () => {
    const result = searchParamsSchema.safeParse({
      propertyType: 'mansion',
    });
    expect(result.success).toBe(false);
  });

  it('rejects invalid sort order', () => {
    const result = searchParamsSchema.safeParse({
      sort: 'random',
    });
    expect(result.success).toBe(false);
  });

  it('rejects negative prices', () => {
    const result = searchParamsSchema.safeParse({
      minPrice: -100,
    });
    expect(result.success).toBe(false);
  });

  it('rejects beds out of range', () => {
    const result = searchParamsSchema.safeParse({
      beds: 15,
    });
    expect(result.success).toBe(false);
  });

  it('rejects baths out of range', () => {
    const result = searchParamsSchema.safeParse({
      baths: 11,
    });
    expect(result.success).toBe(false);
  });

  it('rejects page less than 1', () => {
    const result = searchParamsSchema.safeParse({
      page: 0,
    });
    expect(result.success).toBe(false);
  });

  it('enforces max length on location', () => {
    const result = searchParamsSchema.safeParse({
      location: 'a'.repeat(101),
    });
    expect(result.success).toBe(false);
  });
});

describe('searchParamsWithRefinement', () => {
  it('allows minPrice less than maxPrice', () => {
    const result = searchParamsWithRefinement.safeParse({
      minPrice: 100000,
      maxPrice: 200000,
    });
    expect(result.success).toBe(true);
  });

  it('allows minPrice equal to maxPrice', () => {
    const result = searchParamsWithRefinement.safeParse({
      minPrice: 100000,
      maxPrice: 100000,
    });
    expect(result.success).toBe(true);
  });

  it('rejects minPrice greater than maxPrice', () => {
    const result = searchParamsWithRefinement.safeParse({
      minPrice: 300000,
      maxPrice: 100000,
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.errors[0].message).toBe(
        'Minimum price cannot be greater than maximum price'
      );
    }
  });

  it('allows only minPrice without maxPrice', () => {
    const result = searchParamsWithRefinement.safeParse({
      minPrice: 100000,
    });
    expect(result.success).toBe(true);
  });

  it('allows only maxPrice without minPrice', () => {
    const result = searchParamsWithRefinement.safeParse({
      maxPrice: 500000,
    });
    expect(result.success).toBe(true);
  });
});
