/**
 * Barrel export for all utility functions
 * IMPORTANT: All exports are named exports (no default exports)
 */

// Assertions
export { assertDefined, assertServerSide } from './assertions';

// Date utilities
export { formatDate, formatDateTime, nowISO, timeAgo } from './dates';

// String utilities
export {
  capitalize,
  formatPhone,
  formatPrice,
  slugify,
  toKebabCase,
  truncate,
} from './strings';
