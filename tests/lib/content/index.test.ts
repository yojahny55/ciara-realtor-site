import { describe, it, expect, vi, beforeEach } from 'vitest';
import { getBlogPosts, getGuides, getNeighborhoods, getTestimonials } from '@/lib/content';
import type { CollectionEntry } from 'astro:content';

// Mock astro:content module
vi.mock('astro:content', () => ({
  getCollection: vi.fn(),
}));

// Import the mocked function
import { getCollection } from 'astro:content';
const mockedGetCollection = vi.mocked(getCollection);

describe('getBlogPosts', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // Set default to development mode
    vi.stubEnv('PROD', false);
  });

  it('filters posts by language (EN)', async () => {
    const mockPosts = [
      {
        id: 'en/2026-01-30-post1.mdx',
        data: { date: new Date('2026-01-30'), draft: false },
      },
      {
        id: 'es/2026-01-30-post2.mdx',
        data: { date: new Date('2026-01-29'), draft: false },
      },
    ] as unknown as CollectionEntry<'blog'>[];

    mockedGetCollection.mockImplementation(async (_collection, filter) => {
      if (!filter) return mockPosts;
      return mockPosts.filter(filter as (entry: CollectionEntry<'blog'>) => boolean);
    });

    const result = await getBlogPosts('en');
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe('en/2026-01-30-post1.mdx');
  });

  it('filters posts by language (ES)', async () => {
    const mockPosts = [
      {
        id: 'en/2026-01-30-post1.mdx',
        data: { date: new Date('2026-01-30'), draft: false },
      },
      {
        id: 'es/2026-01-30-post2.mdx',
        data: { date: new Date('2026-01-29'), draft: false },
      },
    ] as unknown as CollectionEntry<'blog'>[];

    mockedGetCollection.mockImplementation(async (_collection, filter) => {
      if (!filter) return mockPosts;
      return mockPosts.filter(filter as (entry: CollectionEntry<'blog'>) => boolean);
    });

    const result = await getBlogPosts('es');
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe('es/2026-01-30-post2.mdx');
  });

  it('excludes drafts in production mode', async () => {
    vi.stubEnv('PROD', true);

    const mockPosts = [
      {
        id: 'en/2026-01-30-published.mdx',
        data: { date: new Date('2026-01-30'), draft: false },
      },
      {
        id: 'en/2026-01-29-draft.mdx',
        data: { date: new Date('2026-01-29'), draft: true },
      },
    ] as unknown as CollectionEntry<'blog'>[];

    mockedGetCollection.mockImplementation(async (_collection, filter) => {
      if (!filter) return mockPosts;
      return mockPosts.filter(filter as (entry: CollectionEntry<'blog'>) => boolean);
    });

    const result = await getBlogPosts('en');
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe('en/2026-01-30-published.mdx');
  });

  it('includes drafts in development mode', async () => {
    vi.stubEnv('PROD', false);

    const mockPosts = [
      {
        id: 'en/2026-01-30-published.mdx',
        data: { date: new Date('2026-01-30'), draft: false },
      },
      {
        id: 'en/2026-01-29-draft.mdx',
        data: { date: new Date('2026-01-29'), draft: true },
      },
    ] as unknown as CollectionEntry<'blog'>[];

    mockedGetCollection.mockImplementation(async (_collection, filter) => {
      if (!filter) return mockPosts;
      return mockPosts.filter(filter as (entry: CollectionEntry<'blog'>) => boolean);
    });

    const result = await getBlogPosts('en');
    expect(result).toHaveLength(2);
  });

  it('sorts posts by date descending (newest first)', async () => {
    const mockPosts = [
      {
        id: 'en/2026-01-15-old.mdx',
        data: { date: new Date('2026-01-15'), draft: false },
      },
      {
        id: 'en/2026-01-30-new.mdx',
        data: { date: new Date('2026-01-30'), draft: false },
      },
      {
        id: 'en/2026-01-20-middle.mdx',
        data: { date: new Date('2026-01-20'), draft: false },
      },
    ] as unknown as CollectionEntry<'blog'>[];

    mockedGetCollection.mockImplementation(async (_collection, filter) => {
      if (!filter) return mockPosts;
      return mockPosts.filter(filter as (entry: CollectionEntry<'blog'>) => boolean);
    });

    const result = await getBlogPosts('en');
    expect(result).toHaveLength(3);
    expect(result[0].id).toBe('en/2026-01-30-new.mdx');
    expect(result[1].id).toBe('en/2026-01-20-middle.mdx');
    expect(result[2].id).toBe('en/2026-01-15-old.mdx');
  });
});

describe('getGuides', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('filters guides by language (EN)', async () => {
    const mockGuides = [
      {
        id: 'en/buyer-guide.mdx',
        data: { title: 'Buyer Guide' },
      },
      {
        id: 'es/guia-comprador.mdx',
        data: { title: 'Guía del Comprador' },
      },
    ] as unknown as CollectionEntry<'guides'>[];

    mockedGetCollection.mockImplementation(async (_collection, filter) => {
      if (!filter) return mockGuides;
      return mockGuides.filter(filter as (entry: CollectionEntry<'guides'>) => boolean);
    });

    const result = await getGuides('en');
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe('en/buyer-guide.mdx');
  });

  it('filters guides by language (ES)', async () => {
    const mockGuides = [
      {
        id: 'en/buyer-guide.mdx',
        data: { title: 'Buyer Guide' },
      },
      {
        id: 'es/guia-comprador.mdx',
        data: { title: 'Guía del Comprador' },
      },
    ] as unknown as CollectionEntry<'guides'>[];

    mockedGetCollection.mockImplementation(async (_collection, filter) => {
      if (!filter) return mockGuides;
      return mockGuides.filter(filter as (entry: CollectionEntry<'guides'>) => boolean);
    });

    const result = await getGuides('es');
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe('es/guia-comprador.mdx');
  });

  it('sorts guides alphabetically by title', async () => {
    const mockGuides = [
      {
        id: 'en/seller-guide.mdx',
        data: { title: 'Seller Guide' },
      },
      {
        id: 'en/buyer-guide.mdx',
        data: { title: 'Buyer Guide' },
      },
      {
        id: 'en/investor-guide.mdx',
        data: { title: 'Investor Guide' },
      },
    ] as unknown as CollectionEntry<'guides'>[];

    mockedGetCollection.mockImplementation(async (_collection, filter) => {
      if (!filter) return mockGuides;
      return mockGuides.filter(filter as (entry: CollectionEntry<'guides'>) => boolean);
    });

    const result = await getGuides('en');
    expect(result).toHaveLength(3);
    expect(result[0].data.title).toBe('Buyer Guide');
    expect(result[1].data.title).toBe('Investor Guide');
    expect(result[2].data.title).toBe('Seller Guide');
  });
});

describe('getNeighborhoods', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('filters neighborhoods by language (EN)', async () => {
    const mockNeighborhoods = [
      {
        id: 'en/south-tampa.mdx',
        data: { name: 'South Tampa' },
      },
      {
        id: 'es/sur-de-tampa.mdx',
        data: { name: 'Sur de Tampa' },
      },
    ] as unknown as CollectionEntry<'neighborhoods'>[];

    mockedGetCollection.mockImplementation(async (_collection, filter) => {
      if (!filter) return mockNeighborhoods;
      return mockNeighborhoods.filter(
        filter as (entry: CollectionEntry<'neighborhoods'>) => boolean
      );
    });

    const result = await getNeighborhoods('en');
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe('en/south-tampa.mdx');
  });

  it('filters neighborhoods by language (ES)', async () => {
    const mockNeighborhoods = [
      {
        id: 'en/south-tampa.mdx',
        data: { name: 'South Tampa' },
      },
      {
        id: 'es/sur-de-tampa.mdx',
        data: { name: 'Sur de Tampa' },
      },
    ] as unknown as CollectionEntry<'neighborhoods'>[];

    mockedGetCollection.mockImplementation(async (_collection, filter) => {
      if (!filter) return mockNeighborhoods;
      return mockNeighborhoods.filter(
        filter as (entry: CollectionEntry<'neighborhoods'>) => boolean
      );
    });

    const result = await getNeighborhoods('es');
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe('es/sur-de-tampa.mdx');
  });

  it('sorts neighborhoods alphabetically by name', async () => {
    const mockNeighborhoods = [
      {
        id: 'en/south-tampa.mdx',
        data: { name: 'South Tampa' },
      },
      {
        id: 'en/hyde-park.mdx',
        data: { name: 'Hyde Park' },
      },
      {
        id: 'en/riverview.mdx',
        data: { name: 'Riverview' },
      },
    ] as unknown as CollectionEntry<'neighborhoods'>[];

    mockedGetCollection.mockImplementation(async (_collection, filter) => {
      if (!filter) return mockNeighborhoods;
      return mockNeighborhoods.filter(
        filter as (entry: CollectionEntry<'neighborhoods'>) => boolean
      );
    });

    const result = await getNeighborhoods('en');
    expect(result).toHaveLength(3);
    expect(result[0].data.name).toBe('Hyde Park');
    expect(result[1].data.name).toBe('Riverview');
    expect(result[2].data.name).toBe('South Tampa');
  });
});

describe('getTestimonials', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('filters testimonials by language (EN)', async () => {
    const mockTestimonials = [
      {
        id: 'en/john-doe.mdx',
        data: { date: new Date('2026-01-15'), featured: true },
      },
      {
        id: 'es/juan-perez.mdx',
        data: { date: new Date('2026-01-14'), featured: true },
      },
    ] as unknown as CollectionEntry<'testimonials'>[];

    mockedGetCollection.mockImplementation(async (_collection, filter) => {
      if (!filter) return mockTestimonials;
      return mockTestimonials.filter(
        filter as (entry: CollectionEntry<'testimonials'>) => boolean
      );
    });

    const result = await getTestimonials('en');
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe('en/john-doe.mdx');
  });

  it('filters testimonials by language (ES)', async () => {
    const mockTestimonials = [
      {
        id: 'en/john-doe.mdx',
        data: { date: new Date('2026-01-15'), featured: true },
      },
      {
        id: 'es/juan-perez.mdx',
        data: { date: new Date('2026-01-14'), featured: true },
      },
    ] as unknown as CollectionEntry<'testimonials'>[];

    mockedGetCollection.mockImplementation(async (_collection, filter) => {
      if (!filter) return mockTestimonials;
      return mockTestimonials.filter(
        filter as (entry: CollectionEntry<'testimonials'>) => boolean
      );
    });

    const result = await getTestimonials('es');
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe('es/juan-perez.mdx');
  });

  it('returns all testimonials when featuredOnly is false', async () => {
    const mockTestimonials = [
      {
        id: 'en/featured.mdx',
        data: { date: new Date('2026-01-15'), featured: true },
      },
      {
        id: 'en/not-featured.mdx',
        data: { date: new Date('2026-01-14'), featured: false },
      },
    ] as unknown as CollectionEntry<'testimonials'>[];

    mockedGetCollection.mockImplementation(async (_collection, filter) => {
      if (!filter) return mockTestimonials;
      return mockTestimonials.filter(
        filter as (entry: CollectionEntry<'testimonials'>) => boolean
      );
    });

    const result = await getTestimonials('en', false);
    expect(result).toHaveLength(2);
  });

  it('returns only featured testimonials when featuredOnly is true', async () => {
    const mockTestimonials = [
      {
        id: 'en/featured.mdx',
        data: { date: new Date('2026-01-15'), featured: true },
      },
      {
        id: 'en/not-featured.mdx',
        data: { date: new Date('2026-01-14'), featured: false },
      },
    ] as unknown as CollectionEntry<'testimonials'>[];

    mockedGetCollection.mockImplementation(async (_collection, filter) => {
      if (!filter) return mockTestimonials;
      return mockTestimonials.filter(
        filter as (entry: CollectionEntry<'testimonials'>) => boolean
      );
    });

    const result = await getTestimonials('en', true);
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe('en/featured.mdx');
  });

  it('sorts testimonials by date descending (newest first)', async () => {
    const mockTestimonials = [
      {
        id: 'en/old.mdx',
        data: { date: new Date('2026-01-10'), featured: false },
      },
      {
        id: 'en/new.mdx',
        data: { date: new Date('2026-01-30'), featured: false },
      },
      {
        id: 'en/middle.mdx',
        data: { date: new Date('2026-01-20'), featured: false },
      },
    ] as unknown as CollectionEntry<'testimonials'>[];

    mockedGetCollection.mockImplementation(async (_collection, filter) => {
      if (!filter) return mockTestimonials;
      return mockTestimonials.filter(
        filter as (entry: CollectionEntry<'testimonials'>) => boolean
      );
    });

    const result = await getTestimonials('en');
    expect(result).toHaveLength(3);
    expect(result[0].id).toBe('en/new.mdx');
    expect(result[1].id).toBe('en/middle.mdx');
    expect(result[2].id).toBe('en/old.mdx');
  });
});
