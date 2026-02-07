/**
 * Footer Accordion Island Tests
 *
 * Tests interactive accordion behavior using @testing-library/preact.
 */

import { describe, it, expect } from 'vitest';
import { render, fireEvent } from '@testing-library/preact';
import FooterAccordion from '@/components/islands/footer-accordion';

const mockSections = [
  {
    id: 'quick-links',
    title: 'Quick Links',
    items: [
      { href: '/en/properties/', label: 'Properties' },
      { href: '/en/about/', label: 'About Ciara' },
    ],
  },
  {
    id: 'contact',
    title: 'Contact',
    items: [
      { href: 'tel:+18135551234', label: '(813) 555-1234' },
      { href: '#', label: '123 Harbor Drive, Suite 100', addressLine2: 'Tampa, FL 33602' },
    ],
  },
];

describe('FooterAccordion', () => {
  it('renders all section titles', () => {
    const { getByText } = render(<FooterAccordion sections={mockSections} />);
    expect(getByText('Quick Links')).toBeDefined();
    expect(getByText('Contact')).toBeDefined();
  });

  it('sections start collapsed (aria-expanded=false)', () => {
    const { getAllByRole } = render(<FooterAccordion sections={mockSections} />);
    const buttons = getAllByRole('button');
    expect(buttons).toHaveLength(2);
    buttons.forEach((btn) => {
      expect(btn.getAttribute('aria-expanded')).toBe('false');
    });
  });

  it('toggles section open on click', () => {
    const { getByText } = render(<FooterAccordion sections={mockSections} />);
    const quickLinksButton = getByText('Quick Links').closest('button')!;

    fireEvent.click(quickLinksButton);
    expect(quickLinksButton.getAttribute('aria-expanded')).toBe('true');

    fireEvent.click(quickLinksButton);
    expect(quickLinksButton.getAttribute('aria-expanded')).toBe('false');
  });

  it('renders links with correct hrefs', () => {
    const { getByText } = render(<FooterAccordion sections={mockSections} />);
    const propertiesLink = getByText('Properties').closest('a');
    expect(propertiesLink?.getAttribute('href')).toBe('/en/properties/');
  });

  it('renders address items as text spans (not links)', () => {
    const { container } = render(<FooterAccordion sections={mockSections} />);
    const addressSpan = container.querySelector('.accordion-address');
    expect(addressSpan).not.toBeNull();
    expect(addressSpan!.tagName).toBe('SPAN');
    expect(addressSpan!.textContent).toContain('123 Harbor Drive');
    expect(addressSpan!.textContent).toContain('Tampa, FL 33602');
  });

  it('renders address with a br element instead of dangerouslySetInnerHTML', () => {
    const { container } = render(<FooterAccordion sections={mockSections} />);
    const addressSpan = container.querySelector('.accordion-address');
    expect(addressSpan).not.toBeNull();
    // Should contain a <br> element (from JSX <br />) not injected HTML
    const brElements = addressSpan!.querySelectorAll('br');
    expect(brElements.length).toBe(1);
  });

  it('has aria-controls linking buttons to content panels', () => {
    const { getAllByRole } = render(<FooterAccordion sections={mockSections} />);
    const buttons = getAllByRole('button');
    buttons.forEach((btn) => {
      const controlsId = btn.getAttribute('aria-controls');
      expect(controlsId).toBeTruthy();
      expect(controlsId).toMatch(/^accordion-content-/);
    });
  });

  it('allows multiple sections to be open simultaneously', () => {
    const { getByText } = render(<FooterAccordion sections={mockSections} />);
    const quickLinksButton = getByText('Quick Links').closest('button')!;
    const contactButton = getByText('Contact').closest('button')!;

    fireEvent.click(quickLinksButton);
    fireEvent.click(contactButton);

    expect(quickLinksButton.getAttribute('aria-expanded')).toBe('true');
    expect(contactButton.getAttribute('aria-expanded')).toBe('true');
  });
});
