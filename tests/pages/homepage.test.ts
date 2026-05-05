import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const enSource = readFileSync(
  resolve(__dirname, '../../src/pages/en/index.astro'),
  'utf-8'
);
const esSource = readFileSync(
  resolve(__dirname, '../../src/pages/es/index.astro'),
  'utf-8'
);
const schemaSource = readFileSync(
  resolve(__dirname, '../../src/components/common/homepage-schema.astro'),
  'utf-8'
);
const heroSource = readFileSync(
  resolve(__dirname, '../../src/components/homepage/hero-section.astro'),
  'utf-8'
);

const expectedImportOrder = [
  'import HeroSection',
  'import IntentCards',
  'import TrustBar',
  'import TestimonialsSection',
  'import InstagramFeed',
];

const expectedSectionOrder = [
  '<HeroSection',
  '<IntentCards',
  '<TrustBar',
  '<TestimonialsSection',
  '<InstagramFeed',
];

describe('Homepage assembly', () => {
  for (const [label, src] of [['EN', enSource], ['ES', esSource]] as const) {
    it(`${label} homepage imports all 6 sections in AC order`, () => {
      let lastIdx = -1;
      for (const imp of expectedImportOrder) {
        const idx = src.indexOf(imp);
        expect(idx, `${imp} should appear in ${label} homepage`).toBeGreaterThan(-1);
        expect(idx, `${imp} should appear after the prior import in ${label}`).toBeGreaterThan(lastIdx);
        lastIdx = idx;
      }
    });

    it(`${label} homepage renders all 6 sections in the AC order`, () => {
      let lastIdx = -1;
      for (const tag of expectedSectionOrder) {
        const idx = src.indexOf(tag);
        expect(idx, `${tag} should appear in ${label} homepage`).toBeGreaterThan(-1);
        expect(idx, `${tag} should appear after the prior section in ${label}`).toBeGreaterThan(lastIdx);
        lastIdx = idx;
      }
    });

    it(`${label} homepage passes lang={lang} to every section`, () => {
      const matches = src.match(/<(HeroSection|IntentCards|TrustBar|TestimonialsSection|InstagramFeed)\s+lang=\{lang\}\s*\/>/g);
      expect(matches?.length).toBe(5);
    });

    it(`${label} homepage passes title, description, image to <Page>`, () => {
      expect(src).toMatch(/<Page[\s\S]*title=/);
      expect(src).toMatch(/<Page[\s\S]*description=/);
      expect(src).toMatch(/<Page[\s\S]*image=/);
    });

    it(`${label} homepage includes HomepageSchema`, () => {
      expect(src).toContain('HomepageSchema');
      expect(src).toContain('<HomepageSchema');
    });

    it(`${label} homepage wraps sections with section-bg glass/clear classes`, () => {
      expect(src).toContain('section-bg-glass');
      expect(src).toContain('section-bg-clear');
    });
  }
});

describe('HomepageSchema component', () => {
  it('contains RealEstateAgent schema type', () => {
    expect(schemaSource).toContain('RealEstateAgent');
  });

  it('contains WebSite schema type', () => {
    expect(schemaSource).toContain('WebSite');
  });

  it('contains BreadcrumbList schema type', () => {
    expect(schemaSource).toContain('BreadcrumbList');
  });

  it('uses application/ld+json script type', () => {
    expect(schemaSource).toContain('application/ld+json');
  });

  it('references Astro.site (not a bare hardcoded domain)', () => {
    expect(schemaSource).toContain('Astro.site');
    // Fallback string is acceptable in ?? expression; bare assignment would not be
    expect(schemaSource).not.toMatch(/siteUrl\s*=\s*['"`]https:\/\/ciararuiz\.com['"`]/);
  });

  it('uses seo.agentDescription translation key', () => {
    expect(schemaSource).toContain('seo.agentDescription');
  });
});

describe('Hero LCP image optimization', () => {
  it('has fetchpriority="high" on the eager LCP image', () => {
    expect(heroSource).toContain('fetchpriority="high"');
  });

  it('has loading="eager" on the LCP image', () => {
    expect(heroSource).toContain('loading="eager"');
  });

  it('does NOT have loading="lazy" on the img-main LCP element', () => {
    const imgMainBlock = heroSource.match(/class="img-main"[\s\S]*?<\/div>/)?.[0] ?? '';
    expect(imgMainBlock).not.toContain('loading="lazy"');
  });

  it('has decoding="async" on hero images', () => {
    expect(heroSource).toContain('decoding="async"');
  });
});

describe('Section background alternation in homepage', () => {
  for (const [label, src] of [['EN', enSource], ['ES', esSource]] as const) {
    it(`${label} alternates glass/clear wrappers around sections`, () => {
      const glassCount = (src.match(/section-bg-glass\b/g) ?? []).length;
      const clearCount = (src.match(/section-bg-clear\b/g) ?? []).length;
      expect(glassCount).toBeGreaterThanOrEqual(2);
      expect(clearCount).toBeGreaterThanOrEqual(2);
    });
  }
});
