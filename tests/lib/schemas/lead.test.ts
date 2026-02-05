/**
 * Unit tests for lead validation schemas
 */
import { describe, expect, it } from 'vitest';

import { leadFormSchema, leadSchema, languageSchema, leadIntentSchema } from '@lib/schemas';

describe('leadFormSchema', () => {
  it('validates correct lead form data', () => {
    const validData = {
      name: 'John Doe',
      email: 'john@example.com',
      phone: '555-123-4567',
      message: 'Looking for a home',
      language: 'en',
    };

    const result = leadFormSchema.safeParse(validData);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.name).toBe('John Doe');
      expect(result.data.email).toBe('john@example.com');
    }
  });

  it('validates minimal required fields', () => {
    const minimalData = {
      name: 'Jane',
      email: 'jane@example.com',
      language: 'es',
    };

    const result = leadFormSchema.safeParse(minimalData);
    expect(result.success).toBe(true);
  });

  it('trims whitespace from name and message', () => {
    const dataWithWhitespace = {
      name: '  John Doe  ',
      email: 'john@example.com',
      message: '  Hello world  ',
      language: 'en',
    };

    const result = leadFormSchema.safeParse(dataWithWhitespace);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.name).toBe('John Doe');
      expect(result.data.message).toBe('Hello world');
    }
  });

  it('rejects empty name', () => {
    const invalidData = {
      name: '',
      email: 'john@example.com',
      language: 'en',
    };

    const result = leadFormSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.errors[0].message).toBe('Name is required');
    }
  });

  it('rejects invalid email', () => {
    const invalidData = {
      name: 'John',
      email: 'not-an-email',
      language: 'en',
    };

    const result = leadFormSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.errors[0].path).toContain('email');
    }
  });

  it('rejects invalid phone format', () => {
    const invalidData = {
      name: 'John',
      email: 'john@example.com',
      phone: 'abc-def-ghij',
      language: 'en',
    };

    const result = leadFormSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.errors[0].path).toContain('phone');
    }
  });

  it('accepts various phone formats', () => {
    const validPhones = [
      '555-123-4567',
      '(555) 123-4567',
      '+1 555 123 4567',
      '5551234567',
    ];

    validPhones.forEach((phone) => {
      const result = leadFormSchema.safeParse({
        name: 'John',
        email: 'john@example.com',
        phone,
        language: 'en',
      });
      expect(result.success).toBe(true);
    });
  });

  it('rejects invalid language', () => {
    const invalidData = {
      name: 'John',
      email: 'john@example.com',
      language: 'fr',
    };

    const result = leadFormSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
  });

  it('enforces max length on name', () => {
    const invalidData = {
      name: 'a'.repeat(101),
      email: 'john@example.com',
      language: 'en',
    };

    const result = leadFormSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
  });

  it('enforces max length on message', () => {
    const invalidData = {
      name: 'John',
      email: 'john@example.com',
      message: 'a'.repeat(1001),
      language: 'en',
    };

    const result = leadFormSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
  });
});

describe('leadSchema', () => {
  it('validates complete lead data', () => {
    const validLead = {
      id: '123e4567-e89b-12d3-a456-426614174000',
      name: 'John Doe',
      email: 'john@example.com',
      language: 'en',
      source: 'homepage_intent_buy',
      timestamp: '2026-01-30T12:00:00Z',
      type: 'contact',
      source_url: 'https://example.com/en',
      synced_to_crm: false,
      crm_sync_attempts: 0,
    };

    const result = leadSchema.safeParse(validLead);
    expect(result.success).toBe(true);
  });

  it('validates all lead sources', () => {
    const sources = [
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
    ];

    sources.forEach((source) => {
      const lead = {
        id: '123e4567-e89b-12d3-a456-426614174000',
        name: 'John',
        email: 'john@example.com',
        language: 'en',
        source,
        timestamp: '2026-01-30T12:00:00Z',
        type: 'contact',
        source_url: 'https://example.com',
        synced_to_crm: false,
        crm_sync_attempts: 0,
      };

      const result = leadSchema.safeParse(lead);
      expect(result.success).toBe(true);
    });
  });

  it('rejects invalid lead source', () => {
    const invalidLead = {
      id: '123e4567-e89b-12d3-a456-426614174000',
      name: 'John',
      email: 'john@example.com',
      language: 'en',
      source: 'invalid_source',
      timestamp: '2026-01-30T12:00:00Z',
      type: 'contact',
      source_url: 'https://example.com',
      synced_to_crm: false,
      crm_sync_attempts: 0,
    };

    const result = leadSchema.safeParse(invalidLead);
    expect(result.success).toBe(false);
  });
});

describe('languageSchema', () => {
  it('accepts en and es', () => {
    expect(languageSchema.safeParse('en').success).toBe(true);
    expect(languageSchema.safeParse('es').success).toBe(true);
  });

  it('rejects other languages', () => {
    expect(languageSchema.safeParse('fr').success).toBe(false);
    expect(languageSchema.safeParse('de').success).toBe(false);
    expect(languageSchema.safeParse('').success).toBe(false);
  });
});

describe('leadIntentSchema', () => {
  it('accepts all valid intents', () => {
    const intents = ['buy', 'sell', 'invest', 'rent'];

    intents.forEach((intent) => {
      const result = leadIntentSchema.safeParse(intent);
      expect(result.success).toBe(true);
    });
  });

  it('rejects invalid intents', () => {
    expect(leadIntentSchema.safeParse('browse').success).toBe(false);
    expect(leadIntentSchema.safeParse('other').success).toBe(false);
    expect(leadIntentSchema.safeParse('').success).toBe(false);
  });
});

describe('leadFormSchema with intent', () => {
  it('accepts lead form with intent', () => {
    const dataWithIntent = {
      name: 'John Doe',
      email: 'john@example.com',
      language: 'en',
      intent: 'buy',
    };

    const result = leadFormSchema.safeParse(dataWithIntent);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.intent).toBe('buy');
    }
  });

  it('accepts lead form without intent (optional)', () => {
    const dataWithoutIntent = {
      name: 'Jane Doe',
      email: 'jane@example.com',
      language: 'es',
    };

    const result = leadFormSchema.safeParse(dataWithoutIntent);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.intent).toBeUndefined();
    }
  });

  it('accepts all intent values in lead form', () => {
    const intents = ['buy', 'sell', 'invest', 'rent'];

    intents.forEach((intent) => {
      const result = leadFormSchema.safeParse({
        name: 'Test',
        email: 'test@example.com',
        language: 'en',
        intent,
      });
      expect(result.success).toBe(true);
    });
  });

  it('rejects invalid intent in lead form', () => {
    const dataWithInvalidIntent = {
      name: 'John',
      email: 'john@example.com',
      language: 'en',
      intent: 'browse',
    };

    const result = leadFormSchema.safeParse(dataWithInvalidIntent);
    expect(result.success).toBe(false);
  });
});
