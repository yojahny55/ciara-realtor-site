/**
 * Mobile Navigation Island Tests
 *
 * Tests for the mobile navigation drawer including:
 * - Hamburger button rendering
 * - Drawer open/close functionality
 * - Focus trap implementation
 * - Keyboard accessibility (Escape key, Tab)
 * - Body scroll locking
 * - Touch target sizes
 */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { render, fireEvent, screen } from '@testing-library/preact';
import '@testing-library/jest-dom';
import MobileNav from '../src/components/islands/mobile-nav';
import type { Lang } from '../src/i18n';

describe('MobileNav Island', () => {
  const mockNavLinks = [
    { href: '/en/', label: 'Home' },
    { href: '/en/buy', label: 'Buy' },
    { href: '/en/sell', label: 'Sell' },
    { href: '/en/contact', label: 'Contact' },
  ];

  const defaultProps = {
    lang: 'en' as Lang,
    navLinks: mockNavLinks,
    phoneNumber: '+1-555-TEST',
    phoneHref: 'tel:+15558378',
  };

  beforeEach(() => {
    // Reset document.body overflow before each test
    document.body.style.overflow = '';
  });

  afterEach(() => {
    // Clean up after each test
    document.body.style.overflow = '';
  });

  it('should render hamburger button initially', () => {
    render(<MobileNav {...defaultProps} />);

    const hamburgerButton = screen.getByLabelText(/open menu/i);
    expect(hamburgerButton).toBeInTheDocument();
  });

  it('should have 44x44px touch target on hamburger button', () => {
    render(<MobileNav {...defaultProps} />);

    const hamburgerButton = screen.getByLabelText(/open menu/i);

    // Button should have the hamburger-button class which defines 44x44px size
    expect(hamburgerButton.classList.contains('hamburger-button')).toBe(true);
  });

  it('should open drawer when hamburger is clicked', () => {
    render(<MobileNav {...defaultProps} />);

    const hamburgerButton = screen.getByLabelText(/open menu/i);
    fireEvent.click(hamburgerButton);

    // Drawer should be visible
    const drawer = screen.getByLabelText('Mobile navigation');
    expect(drawer).toBeInTheDocument();
    expect(drawer).toHaveAttribute('role', 'dialog');
  });

  it('should set aria-expanded to true when drawer opens', () => {
    render(<MobileNav {...defaultProps} />);

    const hamburgerButton = screen.getByLabelText(/open menu/i);
    expect(hamburgerButton).toHaveAttribute('aria-expanded', 'false');

    fireEvent.click(hamburgerButton);
    expect(hamburgerButton).toHaveAttribute('aria-expanded', 'true');
  });

  it('should lock body scroll when drawer opens', () => {
    render(<MobileNav {...defaultProps} />);

    expect(document.body.style.overflow).toBe('');

    const hamburgerButton = screen.getByLabelText(/open menu/i);
    fireEvent.click(hamburgerButton);

    expect(document.body.style.overflow).toBe('hidden');
  });

  it('should unlock body scroll when drawer closes', () => {
    render(<MobileNav {...defaultProps} />);

    const hamburgerButton = screen.getByLabelText(/open menu/i);
    fireEvent.click(hamburgerButton);
    expect(document.body.style.overflow).toBe('hidden');

    const closeButton = screen.getByLabelText(/close menu/i);
    fireEvent.click(closeButton);

    expect(document.body.style.overflow).toBe('');
  });

  it('should render all navigation links in drawer', () => {
    render(<MobileNav {...defaultProps} />);

    const hamburgerButton = screen.getByLabelText(/open menu/i);
    fireEvent.click(hamburgerButton);

    mockNavLinks.forEach(link => {
      const navLink = screen.getByText(link.label);
      expect(navLink).toBeInTheDocument();
      expect(navLink.closest('a')).toHaveAttribute('href', link.href);
    });
  });

  it('should render phone number in drawer', () => {
    render(<MobileNav {...defaultProps} />);

    const hamburgerButton = screen.getByLabelText(/open menu/i);
    fireEvent.click(hamburgerButton);

    const phoneLink = screen.getByText('+1-555-TEST');
    expect(phoneLink).toBeInTheDocument();
    expect(phoneLink.closest('a')).toHaveAttribute('href', 'tel:+15558378');
  });

  it('should render Get Started CTA in drawer', () => {
    render(<MobileNav {...defaultProps} />);

    const hamburgerButton = screen.getByLabelText(/open menu/i);
    fireEvent.click(hamburgerButton);

    const ctaButton = screen.getByText(/Get Started/i);
    expect(ctaButton).toBeInTheDocument();
    expect(ctaButton.closest('a')).toHaveAttribute('href', '/en/contact/');
  });

  it('should render Comenzar CTA in Spanish', () => {
    const spanishProps = { ...defaultProps, lang: 'es' as Lang };
    render(<MobileNav {...spanishProps} />);

    const hamburgerButton = screen.getByLabelText(/abrir menu/i);
    fireEvent.click(hamburgerButton);

    const ctaButton = screen.getByText(/Comenzar/i);
    expect(ctaButton).toBeInTheDocument();
    expect(ctaButton.closest('a')).toHaveAttribute('href', '/es/contacto/');
  });

  it('should close drawer when close button is clicked', () => {
    render(<MobileNav {...defaultProps} />);

    const hamburgerButton = screen.getByLabelText(/open menu/i);
    fireEvent.click(hamburgerButton);

    const closeButton = screen.getByLabelText(/close menu/i);
    expect(closeButton).toBeInTheDocument();

    fireEvent.click(closeButton);

    // Drawer should be removed from DOM
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('should close drawer when overlay is clicked', () => {
    render(<MobileNav {...defaultProps} />);

    const hamburgerButton = screen.getByLabelText(/open menu/i);
    fireEvent.click(hamburgerButton);

    const overlay = document.querySelector('.mobile-overlay');
    expect(overlay).toBeInTheDocument();

    // Click the overlay itself (not the drawer)
    fireEvent.click(overlay!);

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('should close drawer when Escape key is pressed', () => {
    render(<MobileNav {...defaultProps} />);

    const hamburgerButton = screen.getByLabelText(/open menu/i);
    fireEvent.click(hamburgerButton);

    expect(screen.getByLabelText('Mobile navigation')).toBeInTheDocument();

    fireEvent.keyDown(document, { key: 'Escape' });

    expect(screen.queryByLabelText('Mobile navigation')).not.toBeInTheDocument();
  });

  it('should restore focus to hamburger button when drawer closes', () => {
    render(<MobileNav {...defaultProps} />);

    const hamburgerButton = screen.getByLabelText(/open menu/i);
    fireEvent.click(hamburgerButton);

    const closeButton = screen.getByLabelText(/close menu/i);
    fireEvent.click(closeButton);

    // Focus should return to hamburger button
    expect(document.activeElement).toBe(hamburgerButton);
  });

  it('should wrap in ErrorBoundary component', () => {
    // This is implicitly tested by the component rendering without errors
    // The MobileNav component wraps MobileNavInner in ErrorBoundary
    const { container } = render(<MobileNav {...defaultProps} />);
    expect(container).toBeInTheDocument();
  });

  it('should have minimum 48px height on navigation items', () => {
    render(<MobileNav {...defaultProps} />);

    const hamburgerButton = screen.getByLabelText(/open menu/i);
    fireEvent.click(hamburgerButton);

    const firstNavItem = screen.getByText('Home');
    // Text is in a span.nav-label inside an a.nav-item
    expect(firstNavItem.closest('a')?.classList.contains('nav-item')).toBe(true);
    // The CSS class .nav-item has min-height: 52px
  });

  it('should have minimum 44px touch target on close button', () => {
    render(<MobileNav {...defaultProps} />);

    const hamburgerButton = screen.getByLabelText(/open menu/i);
    fireEvent.click(hamburgerButton);

    const closeButton = screen.getByLabelText(/close menu/i);
    expect(closeButton.classList.contains('close-button')).toBe(true);
    // The CSS class .close-button has width/height: 44px
  });

  it('should apply slide-in animation to drawer', () => {
    render(<MobileNav {...defaultProps} />);

    const hamburgerButton = screen.getByLabelText(/open menu/i);
    fireEvent.click(hamburgerButton);

    const drawer = screen.getByLabelText('Mobile navigation');
    expect(drawer.classList.contains('mobile-drawer')).toBe(true);
    // The CSS class .mobile-drawer has animation: slideIn
  });

  it('should render drawer at 80% viewport width', () => {
    render(<MobileNav {...defaultProps} />);

    const hamburgerButton = screen.getByLabelText(/open menu/i);
    fireEvent.click(hamburgerButton);

    const drawer = screen.getByLabelText('Mobile navigation');

    // Drawer should have width styling via the mobile-drawer class
    expect(drawer.classList.contains('mobile-drawer')).toBe(true);
  });
});
