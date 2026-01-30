/**
 * Property search params validation schema
 * Source: architecture.md - Search Params
 */
import { z } from 'zod';

import type { PropertySortOrder, PropertyType } from '@types/property';

/**
 * Property search params schema with coercion for URL query params
 */
export const searchParamsSchema = z.object({
  location: z.string().max(100).optional(),
  minPrice: z.coerce.number().min(0).optional(),
  maxPrice: z.coerce.number().min(0).optional(),
  beds: z.coerce.number().min(0).max(10).optional(),
  baths: z.coerce.number().min(0).max(10).optional(),
  propertyType: z
    .enum(['single-family', 'condo', 'townhouse', 'multi-family'] as const satisfies readonly PropertyType[])
    .optional(),
  sort: z
    .enum(['price-asc', 'price-desc', 'newest'] as const satisfies readonly PropertySortOrder[])
    .optional(),
  page: z.coerce.number().int().min(1).optional().default(1),
});

/**
 * Inferred type from search params schema
 */
export type SearchParams = z.infer<typeof searchParamsSchema>;

/**
 * Refinement to ensure minPrice <= maxPrice when both are provided
 */
export const searchParamsWithRefinement = searchParamsSchema.refine(
  (data) => {
    if (data.minPrice !== undefined && data.maxPrice !== undefined) {
      return data.minPrice <= data.maxPrice;
    }
    return true;
  },
  {
    message: 'Minimum price cannot be greater than maximum price',
    path: ['minPrice'],
  }
);
