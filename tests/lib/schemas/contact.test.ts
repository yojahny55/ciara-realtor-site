/**
 * Unit tests for contact form validation schema
 */
import { describe, expect, it } from 'vitest';

import { contactFormSchema } from '@lib/schemas';

describe('contactFormSchema', () => {
  it('validates correct contact form data', () => {
    const validData = {
      name: 'John Doe',
      email: 'john@example.com',
      subject: 'Property Inquiry',
      message: 'I am interested in your services.',
      language: 'en',
    };

    const result = contactFormSchema.safeParse(validData);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.name).toBe('John Doe');
      expect(result.data.subject).toBe('Property Inquiry');
    }
  });

  it('accepts optional phone and preferredContact', () => {
    const dataWithOptionals = {
      name: 'Jane Doe',
      email: 'jane@example.com',
      phone: '555-123-4567',
      subject: 'Question',
      message: 'This is my question about your services.',
      language: 'es',
      preferredContact: 'phone',
    };

    const result = contactFormSchema.safeParse(dataWithOptionals);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.phone).toBe('555-123-4567');
      expect(result.data.preferredContact).toBe('phone');
    }
  });

  it('rejects empty name', () => {
    const invalidData = {
      name: '',
      email: 'john@example.com',
      subject: 'Test',
      message: 'Test message here',
      language: 'en',
    };

    const result = contactFormSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.errors[0].message).toBe('Name is required');
    }
  });

  it('rejects empty subject', () => {
    const invalidData = {
      name: 'John',
      email: 'john@example.com',
      subject: '',
      message: 'Test message here',
      language: 'en',
    };

    const result = contactFormSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.errors[0].message).toBe('Subject is required');
    }
  });

  it('rejects message shorter than 10 characters', () => {
    const invalidData = {
      name: 'John',
      email: 'john@example.com',
      subject: 'Test',
      message: 'Short',
      language: 'en',
    };

    const result = contactFormSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.errors[0].message).toBe('Message must be at least 10 characters');
    }
  });

  it('rejects invalid email', () => {
    const invalidData = {
      name: 'John',
      email: 'invalid-email',
      subject: 'Test',
      message: 'Test message here',
      language: 'en',
    };

    const result = contactFormSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.errors[0].path).toContain('email');
    }
  });

  it('rejects invalid preferredContact value', () => {
    const invalidData = {
      name: 'John',
      email: 'john@example.com',
      subject: 'Test',
      message: 'Test message here',
      language: 'en',
      preferredContact: 'text',
    };

    const result = contactFormSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
  });

  it('enforces max length on subject', () => {
    const invalidData = {
      name: 'John',
      email: 'john@example.com',
      subject: 'a'.repeat(201),
      message: 'Test message here',
      language: 'en',
    };

    const result = contactFormSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
  });

  it('enforces max length on message', () => {
    const invalidData = {
      name: 'John',
      email: 'john@example.com',
      subject: 'Test',
      message: 'a'.repeat(2001),
      language: 'en',
    };

    const result = contactFormSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
  });

  it('trims whitespace from fields', () => {
    const dataWithWhitespace = {
      name: '  John Doe  ',
      email: 'john@example.com',
      subject: '  Test Subject  ',
      message: '  This is a test message  ',
      language: 'en',
    };

    const result = contactFormSchema.safeParse(dataWithWhitespace);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.name).toBe('John Doe');
      expect(result.data.subject).toBe('Test Subject');
      expect(result.data.message).toBe('This is a test message');
    }
  });
});
