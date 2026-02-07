/**
 * Spanish Welcome Popup Island Tests
 *
 * Tests the Spanish welcome popup island component that appears
 * for first-time auto-detected Spanish visitors.
 *
 * Story: 2.4 - Create Spanish Welcome Popup
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, cleanup } from '@testing-library/preact';
import { act } from 'preact/test-utils';
import SpanishWelcomePopup from '@/components/islands/spanish-welcome-popup';

// Helper: advance timers and flush effects so the popup is visible
async function showPopup() {
  await act(async () => {
    vi.advanceTimersByTime(2000);
  });
  await act(async () => {});
}

describe('SpanishWelcomePopup', () => {
  let originalMatchMedia: typeof window.matchMedia;
  let setItemSpy: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    // Mock matchMedia (default: no reduced-motion preference)
    originalMatchMedia = window.matchMedia;
    window.matchMedia = vi.fn().mockImplementation((query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }));

    // Clear real localStorage (happy-dom localStorage ignores Storage.prototype mocks)
    localStorage.clear();

    // Spy on setItem to verify localStorage writes
    setItemSpy = vi.spyOn(Storage.prototype, 'setItem');

    // Default: auto-detected visitor (no manual toggle)
    (window as Record<string, unknown>).__hadPreferredLang = false;

    // Mock timers
    vi.useFakeTimers();
  });

  afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
    vi.clearAllTimers();
    vi.useRealTimers();
    window.matchMedia = originalMatchMedia;
    delete (window as Record<string, unknown>).__hadPreferredLang;
    document.body.style.overflow = '';
    localStorage.clear();
  });

  // ── Negative tests ──

  it('should NOT render popup when lang is en', async () => {
    render(<SpanishWelcomePopup lang="en" />);
    await act(async () => { vi.advanceTimersByTime(2000); });
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('should NOT render popup when spanishWelcomeSeen is true', async () => {
    localStorage.setItem('spanishWelcomeSeen', 'true');

    render(<SpanishWelcomePopup lang="es" />);
    await act(async () => { vi.advanceTimersByTime(2000); });
    await act(async () => {});

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('should NOT show popup when user manually toggled language', async () => {
    (window as Record<string, unknown>).__hadPreferredLang = true;
    render(<SpanishWelcomePopup lang="es" />);
    await act(async () => { vi.advanceTimersByTime(2000); });
    await act(async () => {});
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  // ── Positive tests ──

  it('should render popup only when lang is es', async () => {
    render(<SpanishWelcomePopup lang="es" />);
    await showPopup();
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });

  it('should appear after 2-second delay', async () => {
    render(<SpanishWelcomePopup lang="es" />);
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();

    await act(async () => { vi.advanceTimersByTime(1000); });
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();

    await act(async () => { vi.advanceTimersByTime(1000); });
    await act(async () => {});
    expect(screen.queryByRole('dialog')).toBeInTheDocument();
  });

  it('should display welcome message and Ciara intro text', async () => {
    render(<SpanishWelcomePopup lang="es" />);
    await showPopup();

    expect(screen.getByText('¡Bienvenido!')).toBeInTheDocument();
    expect(screen.getByText('Este sitio fue creado para ti.')).toBeInTheDocument();
    const ciaraMatches = screen.getAllByText(/Ciara Ruiz/);
    expect(ciaraMatches.length).toBeGreaterThanOrEqual(2);
  });

  it('should display Continuar button', async () => {
    render(<SpanishWelcomePopup lang="es" />);
    await showPopup();
    expect(screen.getByRole('button', { name: /Continuar/i })).toBeInTheDocument();
  });

  it('should set spanishWelcomeSeen and close popup when Continuar is clicked', async () => {
    render(<SpanishWelcomePopup lang="es" />);
    await showPopup();

    const button = screen.getByRole('button', { name: /Continuar/i });
    await act(async () => { fireEvent.click(button); });

    expect(localStorage.getItem('spanishWelcomeSeen')).toBe('true');
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('should close popup when Escape key is pressed', async () => {
    render(<SpanishWelcomePopup lang="es" />);
    await showPopup();

    await act(async () => {
      document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
    });
    await act(async () => {});

    expect(localStorage.getItem('spanishWelcomeSeen')).toBe('true');
  });

  it('should close popup when overlay is clicked', async () => {
    render(<SpanishWelcomePopup lang="es" />);
    await showPopup();

    const dialogs = document.body.querySelectorAll('[role="dialog"]');
    const currentDialog = dialogs[dialogs.length - 1];
    const overlay = currentDialog.parentElement!;
    await act(async () => { fireEvent.click(overlay); });
    await act(async () => {});

    expect(localStorage.getItem('spanishWelcomeSeen')).toBe('true');
  });

  it('should skip animation when prefers-reduced-motion is set', async () => {
    window.matchMedia = vi.fn().mockImplementation((query: string) => ({
      matches: query === '(prefers-reduced-motion: reduce)',
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }));

    render(<SpanishWelcomePopup lang="es" />);
    await showPopup();

    const dialog = screen.getByRole('dialog');
    expect(dialog.className).toContain('no-motion');
  });

  it('should have proper aria attributes', async () => {
    render(<SpanishWelcomePopup lang="es" />);
    await showPopup();

    const dialog = screen.getByRole('dialog');
    expect(dialog).toHaveAttribute('aria-modal', 'true');
    expect(dialog).toHaveAttribute('aria-label');
  });

  it('should focus Continuar button when popup appears', async () => {
    render(<SpanishWelcomePopup lang="es" />);
    await showPopup();

    const button = screen.getByRole('button', { name: /Continuar/i });
    expect(document.activeElement).toBe(button);
  });

  it('should have popup-button class for minimum touch target styling', async () => {
    render(<SpanishWelcomePopup lang="es" />);
    await showPopup();

    const button = screen.getByRole('button', { name: /Continuar/i });
    expect(button.className).toContain('popup-button');
  });
});
