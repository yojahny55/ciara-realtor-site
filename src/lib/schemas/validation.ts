/**
 * Validation helper utilities for Zod schemas
 * Source: architecture.md - Use .safeParse() instead of .parse()
 */
import type { ZodSchema, ZodError } from 'zod';

export interface ValidationResult<T> {
  success: boolean;
  data?: T;
  errors?: Array<{
    path: string;
    message: string;
  }>;
}

/**
 * Safely validates data against a Zod schema without throwing
 * Returns a normalized result object with success flag and either data or errors
 */
export function safeValidate<T>(
  schema: ZodSchema<T>,
  data: unknown
): ValidationResult<T> {
  const result = schema.safeParse(data);

  if (result.success) {
    return {
      success: true,
      data: result.data,
    };
  }

  return {
    success: false,
    errors: formatZodErrors(result.error),
  };
}

/**
 * Validates data and throws if invalid
 * Use sparingly - prefer safeValidate for better error handling
 */
export function validateOrThrow<T>(
  schema: ZodSchema<T>,
  data: unknown
): T {
  return schema.parse(data);
}

/**
 * Formats Zod errors into a simpler array format
 */
function formatZodErrors(error: ZodError): Array<{ path: string; message: string }> {
  return error.errors.map((err) => ({
    path: err.path.join('.'),
    message: err.message,
  }));
}
