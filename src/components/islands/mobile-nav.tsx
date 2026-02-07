/**
 * Mobile Navigation Island
 *
 * Interactive hamburger menu with slide-in drawer for mobile devices.
 * Hydrates only on mobile screens via client:media directive.
 *
 * AC #2, #3: Mobile navigation drawer with accessibility features
 */

import { useState, useEffect, useRef } from 'preact/hooks';
import { createPortal } from 'preact/compat';
import type { Lang } from '@/i18n';
import { ErrorBoundary } from '@/components/error-boundary';
import { useTranslations } from '@/i18n';

interface NavLink {
  href: string;
  label: string;
}

interface MobileNavProps {
  lang: Lang;
  navLinks: NavLink[];
  phoneNumber: string;
  phoneHref: string;
}

export function MobileNavInner({ lang, navLinks, phoneNumber, phoneHref }: MobileNavProps) {
  const [isOpen, setIsOpen] = useState(false);
  const drawerRef = useRef<HTMLDivElement>(null);
  const hamburgerRef = useRef<HTMLButtonElement>(null);
  const t = useTranslations(lang);

  // Handle escape key to close drawer
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
        hamburgerRef.current?.focus();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }
  }, [isOpen]);

  // Lock body scroll when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Focus trap within drawer
  useEffect(() => {
    if (!isOpen || !drawerRef.current) return;

    const drawer = drawerRef.current;
    const focusableElements = drawer.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
    );
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    const handleTab = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;

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

    drawer.addEventListener('keydown', handleTab as EventListener);
    firstElement?.focus();

    return () => {
      drawer.removeEventListener('keydown', handleTab as EventListener);
    };
  }, [isOpen]);

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
    hamburgerRef.current?.focus();
  };

  const handleOverlayClick = (e: MouseEvent) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  const contactUrl = `/${lang}/${lang === 'en' ? 'contact' : 'contacto'}/`;

  return (
    <>
      {/* Hamburger Button */}
      <button
        ref={hamburgerRef}
        type="button"
        onClick={handleOpen}
        aria-expanded={isOpen}
        aria-controls="mobile-menu"
        aria-label={t('header.menuOpen')}
        class="hamburger-button"
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
          <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      {/* Overlay + Drawer — portaled to document.body to escape header's backdrop-filter containing block */}
      {isOpen && createPortal(
        <div
          class="mobile-overlay"
          onClick={handleOverlayClick as unknown as () => void}
          aria-hidden="true"
        >
          <div
            ref={drawerRef}
            id="mobile-menu"
            role="dialog"
            aria-label="Mobile navigation"
            class="mobile-drawer"
          >
            {/* ── Header ── */}
            <div class="drawer-header">
              <div class="drawer-brand">
                <div class="drawer-brand-icon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
                    <polyline points="9 22 9 12 15 12 15 22" />
                  </svg>
                </div>
                <div class="drawer-brand-text">
                  <span class="drawer-brand-name">Ciara Ruiz</span>
                  <span class="drawer-brand-sub">REAL ESTATE</span>
                </div>
              </div>
              <button
                type="button"
                onClick={handleClose}
                aria-label={t('header.menuClose')}
                class="close-button"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* ── Decorative rose-gold accent line ── */}
            <div class="accent-line" aria-hidden="true" />

            {/* ── Navigation ── */}
            <nav class="drawer-nav" aria-label="Mobile navigation menu">
              <ul class="nav-list">
                {navLinks.map((link, i) => (
                  <li key={link.href} style={{ animationDelay: `${0.05 + i * 0.04}s` }} class="nav-item-wrap">
                    <a href={link.href} class="nav-item">
                      <span class="nav-label">{link.label}</span>
                      <svg class="nav-arrow" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
                      </svg>
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            {/* ── Footer ── */}
            <div class="drawer-footer">
              {/* CTA */}
              <a href={contactUrl} class="cta-button-mobile">
                <span>{lang === 'en' ? 'Get Started' : 'Comenzar'}</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>

              {/* Divider */}
              <div class="footer-divider" aria-hidden="true">
                <div class="divider-line" />
                <span class="divider-dot" />
                <div class="divider-line" />
              </div>

              {/* Phone + Social row */}
              <div class="footer-contact">
                <a href={phoneHref} class="phone-link">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span>{phoneNumber}</span>
                </a>

                <div class="social-icons">
                  <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" class="social-link" aria-label="Instagram">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                    </svg>
                  </a>
                  <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" class="social-link" aria-label="Facebook">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                  </a>
                  <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" class="social-link" aria-label="TikTok">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>,
        document.body
      )}

      <style>{`
        /* ━━━ Hamburger ━━━ */
        .hamburger-button {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 44px;
          height: 44px;
          padding: 0;
          background: transparent;
          border: none;
          color: var(--color-charcoal);
          cursor: pointer;
          transition: color 0.2s ease;
        }
        .hamburger-button:hover { color: var(--color-primary); }
        .hamburger-button:focus {
          outline: 2px solid var(--color-primary);
          outline-offset: 2px;
          border-radius: 4px;
        }

        /* ━━━ Overlay ━━━ */
        .mobile-overlay {
          position: fixed;
          inset: 0;
          background: rgba(26, 26, 26, 0.45);
          backdrop-filter: blur(6px);
          -webkit-backdrop-filter: blur(6px);
          z-index: 9999;
          animation: overlayIn 0.3s ease-out;
        }
        @keyframes overlayIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }

        /* ━━━ Drawer ━━━ */
        .mobile-drawer {
          position: fixed;
          top: 0;
          right: 0;
          bottom: 0;
          width: 82vw;
          max-width: 360px;
          z-index: 10000;
          display: flex;
          flex-direction: column;
          animation: drawerIn 0.35s cubic-bezier(0.16, 1, 0.3, 1);

          /* Frosted glass panel */
          background:
            linear-gradient(175deg, rgba(255,250,248,0.92) 0%, rgba(245,237,232,0.96) 60%, rgba(232,220,212,0.98) 100%);
          backdrop-filter: blur(40px) saturate(1.4);
          -webkit-backdrop-filter: blur(40px) saturate(1.4);
          border-left: 1px solid rgba(255,255,255,0.45);
          box-shadow:
            -12px 0 60px rgba(183,110,121,0.1),
            -1px 0 0 rgba(255,255,255,0.7),
            inset 2px 0 20px rgba(255,255,255,0.15);
        }
        @keyframes drawerIn {
          from { transform: translateX(100%); opacity: 0.5; }
          to   { transform: translateX(0);    opacity: 1; }
        }

        /* ━━━ Header ━━━ */
        .drawer-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1.5rem 1.5rem 1.25rem;
        }
        .drawer-brand {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }
        .drawer-brand-icon {
          width: 38px;
          height: 38px;
          background: linear-gradient(135deg, #B76E79 0%, #C9A87C 100%);
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          flex-shrink: 0;
          box-shadow: 0 2px 8px rgba(183,110,121,0.2);
        }
        .drawer-brand-text {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }
        .drawer-brand-name {
          font-family: var(--font-display);
          font-size: 1.05rem;
          font-weight: 600;
          color: #1A1A1A;
          letter-spacing: 0.04em;
          line-height: 1.1;
        }
        .drawer-brand-sub {
          font-family: var(--font-body);
          font-size: 0.6rem;
          font-weight: 400;
          color: #B76E79;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          line-height: 1;
        }
        .close-button {
          width: 44px;
          height: 44px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: transparent;
          border: none;
          color: #8B8B8B;
          cursor: pointer;
          border-radius: 50%;
          transition: all 0.2s ease;
          flex-shrink: 0;
        }
        .close-button:hover {
          color: #B76E79;
          background: rgba(183,110,121,0.06);
        }
        .close-button:focus {
          outline: 2px solid var(--color-primary);
          outline-offset: 2px;
        }

        /* ━━━ Accent line ━━━ */
        .accent-line {
          height: 1px;
          margin: 0 1.5rem;
          background: linear-gradient(90deg,
            transparent 0%,
            rgba(183,110,121,0.25) 20%,
            rgba(201,168,124,0.3) 50%,
            rgba(183,110,121,0.25) 80%,
            transparent 100%
          );
        }

        /* ━━━ Navigation ━━━ */
        .drawer-nav {
          flex: 1;
          padding: 0.75rem 0;
          overflow-y: auto;
        }
        .nav-list {
          list-style: none;
          margin: 0;
          padding: 0;
        }
        .nav-item-wrap {
          animation: navFadeIn 0.4s ease-out both;
        }
        @keyframes navFadeIn {
          from { opacity: 0; transform: translateX(12px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        .nav-item {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
          min-height: 52px;
          padding: 0 1.75rem;
          text-decoration: none;
          transition: all 0.2s ease;
          cursor: pointer;
        }
        .nav-label {
          font-family: var(--font-body);
          font-size: 1.05rem;
          font-weight: 400;
          color: #2A2A2A;
          letter-spacing: 0.01em;
          transition: color 0.2s ease;
        }
        .nav-arrow {
          color: transparent;
          transition: all 0.25s ease;
          transform: translateX(-4px);
        }
        .nav-item:hover .nav-label {
          color: #8B4D57;
        }
        .nav-item:hover .nav-arrow {
          color: #B76E79;
          transform: translateX(0);
        }
        .nav-item:focus {
          outline: 2px solid var(--color-primary);
          outline-offset: -2px;
          border-radius: 2px;
        }

        /* ━━━ Footer ━━━ */
        .drawer-footer {
          padding: 1.25rem 1.5rem 2rem;
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        /* CTA button — refined luxury pill */
        .cta-button-mobile {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.625rem;
          width: 100%;
          min-height: 52px;
          padding: 0 2rem;
          font-family: var(--font-body);
          font-size: 0.95rem;
          font-weight: 500;
          letter-spacing: 0.06em;
          color: white;
          text-decoration: none;
          border-radius: 100px;
          cursor: pointer;
          position: relative;
          overflow: hidden;

          background: linear-gradient(135deg, #B76E79 0%, #9E5562 50%, #8B4D57 100%);
          box-shadow:
            0 4px 20px rgba(183,110,121,0.3),
            0 1px 3px rgba(0,0,0,0.1),
            inset 0 1px 0 rgba(255,255,255,0.15);
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .cta-button-mobile:hover {
          box-shadow:
            0 8px 30px rgba(183,110,121,0.4),
            0 2px 6px rgba(0,0,0,0.1),
            inset 0 1px 0 rgba(255,255,255,0.2);
          transform: translateY(-1px);
        }
        .cta-button-mobile:active {
          transform: translateY(0);
        }
        .cta-button-mobile:focus {
          outline: 2px solid #8B4D57;
          outline-offset: 3px;
        }

        /* Decorative divider */
        .footer-divider {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.25rem 0;
        }
        .divider-line {
          flex: 1;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(183,110,121,0.15), transparent);
        }
        .divider-dot {
          width: 4px;
          height: 4px;
          border-radius: 50%;
          background: rgba(183,110,121,0.25);
          flex-shrink: 0;
        }

        /* Phone + Social row */
        .footer-contact {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .phone-link {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-family: var(--font-body);
          font-size: 0.8rem;
          font-weight: 400;
          color: #6B6B6B;
          text-decoration: none;
          transition: color 0.2s ease;
          cursor: pointer;
          min-height: 44px;
        }
        .phone-link:hover { color: #B76E79; }
        .phone-link:focus {
          outline: 2px solid var(--color-primary);
          outline-offset: 2px;
          border-radius: 4px;
        }

        .social-icons {
          display: flex;
          align-items: center;
          gap: 0;
        }
        .social-link {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          color: #9B9B9B;
          text-decoration: none;
          transition: all 0.25s ease;
          cursor: pointer;
        }
        .social-link:hover {
          color: #B76E79;
          transform: translateY(-1px);
        }
        .social-link:focus {
          outline: 2px solid var(--color-primary);
          outline-offset: 2px;
        }

        /* ━━━ Reduced motion ━━━ */
        @media (prefers-reduced-motion: reduce) {
          .mobile-overlay,
          .mobile-drawer,
          .nav-item-wrap {
            animation: none;
          }
          .cta-button-mobile:hover,
          .social-link:hover {
            transform: none;
          }
        }
      `}</style>
    </>
  );
}

// Wrap in ErrorBoundary per project conventions
// NOTE: Default export required by Astro island hydration (client:media directive)
export default function MobileNav(props: MobileNavProps) {
  return (
    <ErrorBoundary
      fallback={
        <div style={{ padding: '0.5rem', color: 'var(--color-charcoal)' }}>
          <span>Menu unavailable</span>
        </div>
      }
    >
      <MobileNavInner {...props} />
    </ErrorBoundary>
  );
}
