/**
 * Runtime assertions for server-side code
 * Source: architecture.md - Server-Side Only patterns
 */

/**
 * Asserts that the function is being called server-side only
 * Throws an error if called in a browser environment
 *
 * @param fnName - Name of the function being called (for error message)
 * @throws Error if called client-side
 *
 * @example
 * export function getSecretApiKey(): string {
 *   assertServerSide('getSecretApiKey');
 *   return process.env.API_KEY;
 * }
 */
export function assertServerSide(fnName: string): void {
  if (typeof window !== 'undefined') {
    throw new Error(`${fnName} must only be called server-side`);
  }
}

/**
 * Asserts that a value is defined (not null or undefined)
 * Provides TypeScript narrowing after the check
 *
 * @param value - Value to check
 * @param message - Error message if value is null/undefined
 * @throws Error if value is null or undefined
 */
export function assertDefined<T>(
  value: T | null | undefined,
  message: string
): asserts value is T {
  if (value === null || value === undefined) {
    throw new Error(message);
  }
}
