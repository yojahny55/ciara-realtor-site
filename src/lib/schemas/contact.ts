/**
 * Contact form validation schema
 * Source: architecture.md - Input Validation Standards
 */
import { z } from 'zod';

/**
 * Contact form schema for general inquiries
 */
export const contactFormSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100).trim(),
  email: z.string().email('Invalid email address'),
  phone: z
    .string()
    .regex(/^[\d\s\-+()]*$/, 'Invalid phone number format')
    .max(20)
    .optional(),
  subject: z.string().min(1, 'Subject is required').max(200).trim(),
  message: z.string().min(10, 'Message must be at least 10 characters').max(2000).trim(),
  language: z.enum(['en', 'es'] as const),
  preferredContact: z.enum(['email', 'phone'] as const).optional(),
});

/**
 * Inferred type from contact form schema
 */
export type ContactFormInput = z.infer<typeof contactFormSchema>;
