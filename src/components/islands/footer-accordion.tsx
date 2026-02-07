/**
 * Footer Accordion Island - Mobile Navigation
 *
 * Collapsible accordion sections for mobile footer.
 * Only hydrates on mobile devices (<600px).
 */

import { h } from 'preact';
import { useState } from 'preact/hooks';
import type { JSX } from 'preact';
import { ErrorBoundary } from '@/components/error-boundary';

interface AccordionSection {
  id: string;
  title: string;
  items: AccordionItem[];
}

interface AccordionItem {
  href: string;
  label: string;
  addressLine2?: string;
}

interface Props {
  sections: AccordionSection[];
}

function FooterAccordionInner({ sections }: Props): JSX.Element {
  const [openSections, setOpenSections] = useState<Set<string>>(new Set());

  const toggleSection = (id: string): void => {
    setOpenSections((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  return (
    <div class="footer-accordion">
      {sections.map((section) => {
        const isOpen = openSections.has(section.id);

        return (
          <div
            key={section.id}
            class={`accordion-section ${isOpen ? 'is-open' : ''}`}
          >
            <button
              type="button"
              class="accordion-header"
              onClick={() => toggleSection(section.id)}
              aria-expanded={isOpen}
              aria-controls={`accordion-content-${section.id}`}
            >
              <span class="accordion-title">{section.title}</span>
              <svg
                class="accordion-chevron"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>

            <div
              id={`accordion-content-${section.id}`}
              class="accordion-content"
              aria-hidden={!isOpen}
            >
              <ul class="accordion-list">
                {section.items.map((item, index) => (
                  <li
                    key={index}
                    class="accordion-item"
                    style={{ animationDelay: `${index * 0.05}s` }}
                  >
                    {item.addressLine2 ? (
                      <span class="accordion-address">
                        {item.label}
                        <br />
                        {item.addressLine2}
                      </span>
                    ) : (
                      <a href={item.href} class="accordion-link">
                        {item.label}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        );
      })}
    </div>
  );
}

// Wrap in ErrorBoundary per project conventions
// NOTE: Default export required by Astro island hydration (client:media directive)
export default function FooterAccordion(props: Props): JSX.Element {
  return (
    <ErrorBoundary>
      <FooterAccordionInner {...props} />
    </ErrorBoundary>
  );
}
