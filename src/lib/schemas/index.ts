/**
 * Barrel export for all validation schemas
 * IMPORTANT: All exports are named exports (no default exports)
 */

// Lead schemas
export { leadFormSchema, leadSchema, languageSchema, leadIntentSchema } from './lead';
export type { LeadFormInput, LeadData, LeadIntent } from './lead';

// Contact schemas
export { contactFormSchema } from './contact';
export type { ContactFormInput } from './contact';

// Search schemas
export { searchParamsSchema, searchParamsWithRefinement } from './search';
export type { SearchParams } from './search';

// Validation utilities
export { safeValidate, validateOrThrow } from './validation';
export type { ValidationResult } from './validation';
