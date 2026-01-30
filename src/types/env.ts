/**
 * Cloudflare environment type definitions
 * Source: architecture.md - Environment Types
 */

export interface Env {
  // Secrets (Cloudflare Workers)
  BRIDGE_API_KEY: string;
  RESEND_API_KEY: string;

  // KV Namespaces
  LEAD_QUEUE: KVNamespace;

  // Public config
  SITE_URL?: string;
}

// Augment Astro locals for runtime environment access
// Note: Using module augmentation with declare global is the standard
// pattern for extending third-party types in TypeScript
/* eslint-disable @typescript-eslint/no-namespace */
declare global {
  namespace App {
    interface Locals {
      runtime: {
        env: Env;
      };
    }
  }
}
/* eslint-enable @typescript-eslint/no-namespace */

// Export empty object to make this a module
export {};
