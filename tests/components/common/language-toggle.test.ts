import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';

/**
 * Language Toggle Component Tests
 *
 * Following the file-based testing pattern established in header/footer tests.
 * Verifies that the language toggle component includes persistence logic.
 */

const languageToggleSource = readFileSync(
  'src/components/common/language-toggle.astro',
  'utf-8'
);

describe('Language Toggle Component', () => {
  describe('Component structure', () => {
    it('contains alternate language link', () => {
      expect(languageToggleSource).toContain('class="alternate-lang"');
    });

    it('includes data-target-lang attribute for persistence', () => {
      expect(languageToggleSource).toContain('data-target-lang={alternateLang}');
    });

    it('includes current language display', () => {
      expect(languageToggleSource).toContain('class="current-lang"');
    });
  });

  describe('Persistence logic (Task 2: AC #3, #4)', () => {
    it('includes script tag for persistence', () => {
      expect(languageToggleSource).toContain('<script>');
    });

    it('sets localStorage on click', () => {
      expect(languageToggleSource).toContain('localStorage.setItem');
      expect(languageToggleSource).toContain('preferredLanguage');
    });

    it('sets cookie on click', () => {
      expect(languageToggleSource).toContain('document.cookie');
      expect(languageToggleSource).toContain('preferredLanguage=');
    });

    it('sets cookie with correct attributes', () => {
      expect(languageToggleSource).toContain('path=/');
      expect(languageToggleSource).toContain('max-age=31536000');
      expect(languageToggleSource).toContain('SameSite=Lax');
    });

    it('uses data-target-lang attribute to get target language', () => {
      expect(languageToggleSource).toContain('data-target-lang');
      expect(languageToggleSource).toContain('getAttribute');
    });

    it('validates target language is "en" or "es"', () => {
      // Should have validation logic checking for valid lang values
      expect(languageToggleSource).toMatch(/targetLang === ['"]en['"]/);
      expect(languageToggleSource).toMatch(/targetLang === ['"]es['"]/);
    });
  });

  describe('Accessibility', () => {
    it('includes aria-label for language toggle link', () => {
      expect(languageToggleSource).toContain('aria-label={ariaLabel}');
    });

    it('includes hreflang attribute', () => {
      expect(languageToggleSource).toContain('hreflang={alternateLang}');
    });

    it('includes aria-current for current language', () => {
      expect(languageToggleSource).toContain('aria-current="page"');
    });
  });

  describe('Styling', () => {
    it('includes scoped styles', () => {
      expect(languageToggleSource).toContain('<style>');
      expect(languageToggleSource).toContain('.language-toggle');
    });

    it('styles current language', () => {
      expect(languageToggleSource).toContain('.current-lang');
    });

    it('styles alternate language link', () => {
      expect(languageToggleSource).toContain('.alternate-lang');
    });

    it('includes hover styles', () => {
      expect(languageToggleSource).toContain(':hover');
    });

    it('includes focus styles for keyboard navigation', () => {
      expect(languageToggleSource).toContain(':focus');
      expect(languageToggleSource).toContain('outline');
    });
  });
});
