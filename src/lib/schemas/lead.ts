/**
 * Lead form validation schema
 * Source: architecture.md - Input Validation Standards
 */
import { z } from 'zod';

import type { LeadSource, LeadType, SupportedLanguage } from '@types/lead';

/**
 * User intent options for lead forms (AC #4 requirement)
 */
export const leadIntentSchema = z.enum(['buy', 'sell', 'invest', 'rent'] as const);
export type LeadIntent = z.infer<typeof leadIntentSchema>;

/**
 * Base lead form schema for user input validation
 */
export const leadFormSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100).trim(),
  email: z.string().email('Invalid email address'),
  phone: z
    .string()
    .regex(/^[\d\s\-+()]*$/, 'Invalid phone number format')
    .max(20)
    .optional(),
  message: z.string().max(1000).trim().optional(),
  language: z.enum(['en', 'es'] as const),
  intent: leadIntentSchema.optional(),
});

/**
 * Full lead schema including server-generated fields
 */
export const leadSchema = leadFormSchema.extend({
  id: z.string().uuid(),
  source: z.enum([
    'homepage_intent_buy',
    'homepage_intent_sell',
    'homepage_intent_invest',
    'homepage_intent_rent',
    'homepage_sticky_cta',
    'homepage_chatbot',
    'property_inquiry',
    'property_schedule_tour',
    'guide_download',
    'newsletter_signup',
    'blog_cta',
    'calculator_results',
    'about_schedule',
    'contact_form',
  ] as const satisfies readonly LeadSource[]),
  timestamp: z.string().datetime(),
  type: z.enum(['contact', 'valuation', 'guide_download', 'property_inquiry'] as const satisfies readonly LeadType[]),
  source_url: z.string().url(),
  property_id: z.string().optional(),
  guide_id: z.string().optional(),
  synced_to_crm: z.boolean(),
  crm_sync_attempts: z.number().int().min(0),
});

/**
 * Inferred types from schemas
 */
export type LeadFormInput = z.infer<typeof leadFormSchema>;
export type LeadData = z.infer<typeof leadSchema>;

/**
 * Supported language schema for reuse
 */
export const languageSchema = z.enum(['en', 'es'] as const satisfies readonly SupportedLanguage[]);
