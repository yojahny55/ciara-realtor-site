/**
 * Lead type definitions for the realtor site
 * Source: architecture.md - Lead Source Tracking
 */

export type LeadSource =
  | 'homepage_intent_buy'
  | 'homepage_intent_sell'
  | 'homepage_intent_invest'
  | 'homepage_intent_rent'
  | 'homepage_sticky_cta'
  | 'homepage_chatbot'
  | 'property_inquiry'
  | 'property_schedule_tour'
  | 'guide_download'
  | 'newsletter_signup'
  | 'blog_cta'
  | 'calculator_results'
  | 'about_schedule'
  | 'contact_form';

export type LeadType = 'contact' | 'valuation' | 'guide_download' | 'property_inquiry';

export type SupportedLanguage = 'en' | 'es';

export interface Lead {
  id: string;
  source: LeadSource;
  timestamp: string; // ISO 8601
  type: LeadType;
  name: string;
  email: string;
  phone?: string;
  language: SupportedLanguage;
  source_url: string;
  message?: string;
  property_id?: string;
  guide_id?: string;
  synced_to_crm: boolean;
  crm_sync_attempts: number;
}
