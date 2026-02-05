// src/content.config.ts
// Content Collections configuration using Astro 5 Content Layer API
import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// Blog Collection - date-prefixed posts in en/ and es/ subdirs
const blog = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/blog' }),
  schema: z.object({
    title: z.string().min(1).max(100),
    description: z.string().min(1).max(160), // SEO meta description limit
    date: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    author: z.string().default('Ciara Ruiz'),
    image: z.string().optional(), // Path to hero image
    imageAlt: z.string().optional(), // Alt text for accessibility
    category: z.enum([
      'market-update',
      'buyer-tips',
      'seller-tips',
      'investment',
      'community',
    ]),
    tags: z.array(z.string()).default([]),
    relatedContent: z.array(z.string()).default([]), // Slugs of related posts
    draft: z.boolean().default(false),
    lang: z.enum(['en', 'es']),
  }),
});

// Guides Collection - buyer/seller/investor/renter guides
const guides = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/guides' }),
  schema: z.object({
    title: z.string().min(1).max(100),
    description: z.string().min(1).max(160),
    type: z.enum(['buyer', 'seller', 'investor', 'renter']),
    downloadUrl: z.string().optional(), // Path to PDF download
    relatedContent: z.array(z.string()).default([]),
    featured: z.boolean().default(false),
    lang: z.enum(['en', 'es']),
  }),
});

// Neighborhoods Collection - Tampa Bay area guides
const neighborhoods = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/neighborhoods' }),
  schema: z.object({
    name: z.string().min(1).max(100),
    slug: z.string(), // URL slug (e.g., "south-tampa")
    description: z.string().min(1).max(300),
    lifestyle: z.string(), // Vibe description
    walkability: z.number().min(0).max(100), // Walk score
    amenities: z.array(z.string()).default([]),
    image: z.string().optional(),
    imageAlt: z.string().optional(),
    lang: z.enum(['en', 'es']),
  }),
});

// Testimonials Collection - client success stories
const testimonials = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/testimonials' }),
  schema: z.object({
    name: z.string().min(1).max(100),
    quote: z.string().min(10).max(500),
    type: z.string().optional(), // "First-Time Buyer", "Seller", etc.
    date: z.coerce.date(),
    image: z.string().optional(), // Client photo path
    imageAlt: z.string().optional(),
    featured: z.boolean().default(false),
    lang: z.enum(['en', 'es']),
  }),
});

// Export all collections - keys MUST match directory names
export const collections = { blog, guides, neighborhoods, testimonials };
