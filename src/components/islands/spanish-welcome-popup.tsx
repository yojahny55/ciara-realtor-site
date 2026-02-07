/**
 * Spanish Welcome Popup Island
 *
 * Interactive popup that appears for first-time Spanish-speaking visitors
 * auto-detected by language middleware. Shows welcome message with agent intro.
 *
 * Architecture:
 * - Preact island with createPortal (escapes backdrop-filter containing blocks)
 * - Wrapped in ErrorBoundary per project conventions
 * - Glassmorphism design system (demo8 tokens)
 * - Respects prefers-reduced-motion
 * - Focus trap and keyboard accessibility
 *
 * Story: 2.4 - Create Spanish Welcome Popup
 * AC #1, #2, #3: Show logic, localStorage tracking, manual toggle detection
 */

import { useState, useEffect, useRef } from 'preact/hooks';
import { createPortal } from 'preact/compat';
import type { Lang } from '@/i18n';
import { ErrorBoundary } from '@/components/error-boundary';
import { useTranslations } from '@/i18n';

interface SpanishWelcomePopupProps {
  lang: Lang;
}

export function SpanishWelcomePopupInner({ lang }: SpanishWelcomePopupProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [shouldShow, setShouldShow] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const previousFocusRef = useRef<Element | null>(null);
  const t = useTranslations(lang);

  // Determine if popup should show based on conditions
  useEffect(() => {
    // Only show for Spanish pages
    if (lang !== 'es') {
      setShouldShow(false);
      return;
    }

    // Check if user has already seen the popup
    const alreadySeen = localStorage.getItem('spanishWelcomeSeen') === 'true';
    if (alreadySeen) {
      setShouldShow(false);
      return;
    }

    // Check if user manually toggled language.
    // window.__hadPreferredLang is set by an inline script in Base.astro
    // BEFORE the sync script runs, capturing whether localStorage.preferredLanguage
    // existed before this page load (set by toggle click handler = manual toggle).
    // Middleware auto-detection only sets a cookie, not localStorage.
    const wasManualToggle = !!(window as unknown as Record<string, unknown>).__hadPreferredLang;
    if (wasManualToggle) {
      setShouldShow(false);
      return;
    }

    // All conditions met - show popup after delay
    setShouldShow(true);
  }, [lang]);

  // Show popup after 2-second delay if shouldShow is true
  useEffect(() => {
    if (!shouldShow) return;

    const timer = setTimeout(() => {
      previousFocusRef.current = document.activeElement;
      setIsVisible(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, [shouldShow]);

  // Handle escape key to close popup
  useEffect(() => {
    if (!isVisible) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isVisible]);

  // Lock body scroll when popup is visible
  useEffect(() => {
    if (isVisible) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isVisible]);

  // Focus trap within popup
  useEffect(() => {
    if (!isVisible || !dialogRef.current) return;

    // Focus the button when popup appears
    buttonRef.current?.focus();

    const dialog = dialogRef.current;
    const handleTab = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;

      const focusableElements = dialog.querySelectorAll<HTMLElement>(
        'button:not([disabled]), [tabindex]:not([tabindex="-1"])'
      );
      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          e.preventDefault();
          lastElement?.focus();
        }
      } else {
        if (document.activeElement === lastElement) {
          e.preventDefault();
          firstElement?.focus();
        }
      }
    };

    dialog.addEventListener('keydown', handleTab as EventListener);
    return () => dialog.removeEventListener('keydown', handleTab as EventListener);
  }, [isVisible]);

  const handleClose = () => {
    localStorage.setItem('spanishWelcomeSeen', 'true');
    setIsVisible(false);
    // Restore focus to previously focused element
    if (previousFocusRef.current instanceof HTMLElement) {
      previousFocusRef.current.focus();
    }
  };

  const handleOverlayClick = (e: MouseEvent) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  // Don't render anything if conditions not met
  if (!shouldShow || !isVisible) {
    return null;
  }

  // Detect prefers-reduced-motion
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  return createPortal(
    <div
      class={`popup-overlay ${prefersReducedMotion ? 'no-motion' : ''}`}
      onClick={handleOverlayClick as unknown as () => void}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-label={t('welcome.title')}
        class={`popup-card ${prefersReducedMotion ? 'no-motion' : ''}`}
      >
        {/* Badge above photo */}
        <div class="popup-badge">
          Ciara Ruiz · Tampa
        </div>

        {/* Photo placeholder */}
        <div class="popup-photo-container">
          <img
            src="/images/maria-rodriguez.jpg"
            alt="Ciara Ruiz, Tampa Real Estate Agent"
            class="popup-photo"
            width="100"
            height="100"
          />
        </div>

        {/* Welcome Message */}
        <h2 class="popup-title">{t('welcome.title')}</h2>
        <p class="popup-message">{t('welcome.message')}</p>

        {/* Agent Intro */}
        <p class="popup-intro">{t('welcome.agentIntro')}</p>

        {/* Continuar Button */}
        <button
          ref={buttonRef}
          type="button"
          onClick={handleClose}
          class="popup-button"
        >
          {t('welcome.continue')}
        </button>
      </div>

      <style>{`
        /* ━━━ Overlay - Light, elegant, barely-there ━━━ */
        .popup-overlay {
          position: fixed;
          inset: 0;
          background: rgba(245, 237, 232, 0.75);
          backdrop-filter: blur(12px) saturate(1.2);
          -webkit-backdrop-filter: blur(12px) saturate(1.2);
          z-index: 9999;
          display: flex;
          align-items: center;
          justify-content: center;
          animation: overlayFadeIn var(--duration-normal) var(--ease-smooth);
        }

        .popup-overlay.no-motion {
          animation: none;
        }

        @keyframes overlayFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        /* ━━━ Popup Card - Bright, elegant glass with depth ━━━ */
        .popup-card {
          position: relative;
          width: 90%;
          max-width: 420px;
          padding: 3rem 2.5rem 2.5rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          gap: 1.25rem;

          background: linear-gradient(
            135deg,
            rgba(255, 255, 255, 0.95) 0%,
            rgba(255, 250, 248, 0.9) 100%
          );
          backdrop-filter: blur(40px) saturate(1.3);
          -webkit-backdrop-filter: blur(40px) saturate(1.3);

          border: 1px solid rgba(183, 110, 121, 0.15);
          border-top: 2px solid rgba(255, 255, 255, 0.9);
          border-radius: 24px;

          box-shadow:
            0 8px 32px rgba(183, 110, 121, 0.08),
            0 2px 8px rgba(183, 110, 121, 0.04),
            inset 0 1px 0 rgba(255, 255, 255, 1),
            0 32px 64px rgba(42, 42, 42, 0.04);

          animation: popupEnter var(--duration-normal) var(--ease-smooth);
        }

        .popup-card.no-motion {
          animation: none;
        }

        @keyframes popupEnter {
          from {
            opacity: 0;
            transform: translateY(24px) scale(0.96);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        /* ━━━ Badge above photo ━━━ */
        .popup-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.5rem 1rem;
          margin-bottom: -0.5rem;

          font-family: var(--font-body);
          font-size: 0.75rem;
          font-weight: 600;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          color: #8B4D57;

          background: linear-gradient(135deg, rgba(183, 110, 121, 0.08), rgba(201, 168, 124, 0.06));
          border: 1px solid rgba(183, 110, 121, 0.2);
          border-radius: 100px;

          box-shadow: 0 2px 8px rgba(183, 110, 121, 0.06);
        }

        /* ━━━ Photo - Professional with elegant frame ━━━ */
        .popup-photo-container {
          position: relative;
          margin-bottom: 0.25rem;
        }

        .popup-photo {
          width: 100px;
          height: 100px;
          border-radius: 50%;
          object-fit: cover;

          border: 4px solid rgba(255, 255, 255, 1);
          outline: 2px solid rgba(183, 110, 121, 0.3);
          outline-offset: -2px;

          box-shadow:
            0 4px 16px rgba(183, 110, 121, 0.15),
            0 2px 4px rgba(0, 0, 0, 0.05),
            inset 0 0 0 1px rgba(255, 255, 255, 0.5);

          filter: brightness(1.02) contrast(1.02) saturate(1.05);
        }

        /* ━━━ Typography - Elegant hierarchy ━━━ */
        .popup-title {
          font-family: var(--font-display);
          font-size: 2rem;
          font-weight: 500;
          line-height: 1.1;
          letter-spacing: 0.01em;

          background: linear-gradient(135deg, #2A2A2A 0%, #4A4A4A 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;

          margin: 0;
          margin-top: 0.25rem;
        }

        .popup-message {
          font-family: var(--font-body);
          font-size: 1.125rem;
          font-weight: 400;
          line-height: 1.5;
          color: #4A4A4A;
          margin: 0;
          max-width: 320px;
        }

        .popup-intro {
          font-family: var(--font-body);
          font-size: 0.9375rem;
          font-weight: 400;
          line-height: 1.6;
          color: #6B6B6B;
          font-style: italic;
          margin: 0;
          max-width: 300px;

          padding-top: 1rem;
          border-top: 1px solid rgba(183, 110, 121, 0.1);
        }

        /* ━━━ Continuar Button - Refined rose gold elegance ━━━ */
        .popup-button {
          margin-top: 0.75rem;
          min-height: 48px;
          min-width: 180px;
          padding: 0 2.5rem;

          font-family: var(--font-body);
          font-size: 1rem;
          font-weight: 500;
          letter-spacing: 0.03em;
          color: #FFFFFF;

          background: linear-gradient(135deg,
            #B76E79 0%,
            #C98595 50%,
            #B76E79 100%
          );
          background-size: 200% 100%;

          border: none;
          border-radius: 100px;
          cursor: pointer;

          box-shadow:
            0 4px 16px rgba(183, 110, 121, 0.25),
            0 2px 4px rgba(183, 110, 121, 0.15),
            inset 0 1px 0 rgba(255, 255, 255, 0.25);

          transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          overflow: hidden;
        }

        .popup-button::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 255, 255, 0.2),
            transparent
          );
          transition: left 0.5s ease;
        }

        .popup-button:hover {
          background-position: 100% 0;
          box-shadow:
            0 6px 24px rgba(183, 110, 121, 0.35),
            0 3px 8px rgba(183, 110, 121, 0.2),
            inset 0 1px 0 rgba(255, 255, 255, 0.3);
          transform: translateY(-1px);
        }

        .popup-button:hover::before {
          left: 100%;
        }

        .popup-button:active {
          transform: translateY(0) scale(0.98);
        }

        .popup-button:focus {
          outline: 2px solid rgba(183, 110, 121, 0.5);
          outline-offset: 3px;
        }

        /* ━━━ Reduced Motion ━━━ */
        @media (prefers-reduced-motion: reduce) {
          .popup-overlay,
          .popup-card {
            animation: none;
          }

          .popup-button:hover {
            transform: none;
          }

          .popup-button::before {
            display: none;
          }
        }

        /* ━━━ Responsive refinements ━━━ */
        @media (max-width: 480px) {
          .popup-card {
            padding: 2.5rem 2rem 2rem;
            width: 94%;
            max-width: 360px;
          }

          .popup-title {
            font-size: 1.75rem;
          }

          .popup-message {
            font-size: 1.0625rem;
          }

          .popup-intro {
            font-size: 0.875rem;
          }

          .popup-button {
            min-width: 160px;
            font-size: 0.9375rem;
          }
        }
      `}</style>
    </div>,
    document.body
  );
}

// Wrap in ErrorBoundary per project conventions
// NOTE: Default export required by Astro island hydration (client:load directive)
export default function SpanishWelcomePopup(props: SpanishWelcomePopupProps) {
  return (
    <ErrorBoundary
      fallback={
        <div style={{ display: 'none' }}>
          {/* Silent failure for welcome popup - not critical to UX */}
        </div>
      }
    >
      <SpanishWelcomePopupInner {...props} />
    </ErrorBoundary>
  );
}
