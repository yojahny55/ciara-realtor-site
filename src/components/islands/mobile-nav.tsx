/**
 * Mobile Navigation Island
 *
 * Interactive hamburger menu with slide-in drawer for mobile devices.
 * Hydrates only on mobile screens via client:media directive.
 *
 * AC #2, #3: Mobile navigation drawer with accessibility features
 */

import { useState, useEffect, useRef } from 'preact/hooks';
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
        {/* Hamburger Icon (3 bars) */}
        <svg
          class="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>

      {/* Overlay + Drawer */}
      {isOpen && (
        <div
          class="mobile-overlay"
          onClick={handleOverlayClick as unknown as () => void}
          aria-hidden="true"
        >
          {/* Drawer */}
          <div
            ref={drawerRef}
            id="mobile-menu"
            role="dialog"
            aria-label="Mobile navigation"
            class="mobile-drawer"
          >
            {/* Close Button */}
            <div class="drawer-header">
              <button
                type="button"
                onClick={handleClose}
                aria-label={t('header.menuClose')}
                class="close-button"
              >
                {/* X Icon */}
                <svg
                  class="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* Navigation Links */}
            <nav class="drawer-nav" aria-label="Mobile navigation menu">
              <ul class="nav-list">
                {navLinks.map(link => (
                  <li key={link.href}>
                    <a href={link.href} class="nav-item">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>

              {/* Phone Number */}
              <a href={phoneHref} class="phone-item">
                <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                {phoneNumber}
              </a>
            </nav>

            {/* Sticky CTA at Bottom */}
            <div class="drawer-footer">
              <a href={contactUrl} class="cta-button-mobile">
                {t('header.contactCta')}
              </a>
            </div>
          </div>
        </div>
      )}

      <style>{`
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
          transition: color 0.15s ease;
        }

        .hamburger-button:hover {
          color: var(--color-primary);
        }

        .hamburger-button:focus {
          outline: 2px solid var(--color-primary);
          outline-offset: 2px;
          border-radius: 4px;
        }

        .mobile-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(0, 0, 0, 0.5);
          z-index: 100;
          animation: fadeIn 0.2s ease-out;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        .mobile-drawer {
          position: fixed;
          top: 0;
          right: 0;
          bottom: 0;
          width: 80vw;
          max-width: 320px;
          background-color: var(--color-cream-white);
          box-shadow: -4px 0 20px rgba(0, 0, 0, 0.15);
          display: flex;
          flex-direction: column;
          animation: slideIn 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          overflow-y: auto;
        }

        @keyframes slideIn {
          from {
            transform: translateX(100%);
          }
          to {
            transform: translateX(0);
          }
        }

        .drawer-header {
          display: flex;
          justify-content: flex-end;
          padding: 1rem;
          border-bottom: 1px solid var(--color-cream-mid);
        }

        .close-button {
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
          border-radius: 4px;
          transition: all 0.15s ease;
        }

        .close-button:hover {
          background-color: var(--color-cream-mid);
          color: var(--color-primary);
        }

        .close-button:focus {
          outline: 2px solid var(--color-primary);
          outline-offset: 2px;
        }

        .drawer-nav {
          flex: 1;
          padding: 1rem 0;
          overflow-y: auto;
        }

        .nav-list {
          list-style: none;
          margin: 0;
          padding: 0;
        }

        .nav-item {
          display: flex;
          align-items: center;
          width: 100%;
          min-height: 48px;
          padding: 0.75rem 1.5rem;
          font-family: var(--font-body);
          font-size: 1.125rem;
          font-weight: 500;
          color: var(--color-charcoal);
          text-decoration: none;
          transition: all 0.15s ease;
          border-left: 3px solid transparent;
        }

        .nav-item:hover {
          background-color: var(--color-cream-soft);
          border-left-color: var(--color-primary);
          color: var(--color-primary-dark);
        }

        .nav-item:focus {
          outline: 2px solid var(--color-primary);
          outline-offset: -2px;
        }

        .phone-item {
          display: flex;
          align-items: center;
          width: 100%;
          min-height: 48px;
          padding: 0.75rem 1.5rem;
          margin-top: 1rem;
          font-family: var(--font-body);
          font-size: 1rem;
          font-weight: 500;
          color: var(--color-charcoal);
          text-decoration: none;
          border-top: 1px solid var(--color-cream-mid);
          transition: color 0.15s ease;
        }

        .phone-item:hover {
          color: var(--color-primary);
        }

        .phone-item:focus {
          outline: 2px solid var(--color-primary);
          outline-offset: -2px;
        }

        .drawer-footer {
          padding: 1.5rem;
          border-top: 1px solid var(--color-cream-mid);
          background-color: var(--color-cream);
        }

        .cta-button-mobile {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          min-height: 48px;
          padding: 0.875rem 1.5rem;
          font-family: var(--font-body);
          font-size: 1rem;
          font-weight: 600;
          color: var(--color-white);
          background-color: var(--color-primary);
          text-decoration: none;
          border-radius: 9999px;
          transition: all 0.15s cubic-bezier(0.4, 0, 0.2, 1);
          box-shadow: 0 2px 8px rgba(183, 110, 121, 0.2);
        }

        .cta-button-mobile:hover {
          background-color: var(--color-primary-dark);
          box-shadow: 0 4px 12px rgba(183, 110, 121, 0.3);
          transform: translateY(-1px);
        }

        .cta-button-mobile:focus {
          outline: 2px solid var(--color-primary-dark);
          outline-offset: 2px;
        }

        .cta-button-mobile:active {
          transform: translateY(0);
        }

        /* Respect prefers-reduced-motion */
        @media (prefers-reduced-motion: reduce) {
          .mobile-overlay,
          .mobile-drawer {
            animation: none;
          }

          .cta-button-mobile:hover {
            transform: none;
          }
        }
      `}</style>
    </>
  );
}

// Wrap in ErrorBoundary per project conventions
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
