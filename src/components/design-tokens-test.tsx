/**
 * Design Tokens Test Component
 *
 * This component tests all configured design tokens:
 * - Tailwind color utilities (AC #1)
 * - Font utilities (AC #2)
 * - Shadow utilities (AC #6)
 * - Fluid typography classes (AC #4)
 * - Motion preference support (AC #8)
 *
 * Usage:
 * <DesignTokensTest client:visible />
 */

export function DesignTokensTest() {
  return (
    <div className="container mx-auto p-8">
      <h1 className="heading-xl text-charcoal mb-8">Design Tokens Test</h1>

      {/* Color Palette Testing (AC #1) */}
      <section className="mb-12">
        <h2 className="heading-md text-charcoal-soft mb-6">Color Palette</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-cream p-4 rounded-lg shadow-sm">
            <p className="text-charcoal font-body">Cream</p>
          </div>
          <div className="bg-cream-warm p-4 rounded-lg shadow-sm">
            <p className="text-charcoal font-body">Cream Warm</p>
          </div>
          <div className="bg-gold p-4 rounded-lg shadow-gold">
            <p className="text-white font-body">Gold</p>
          </div>
          <div className="bg-gold-soft p-4 rounded-lg shadow-md">
            <p className="text-charcoal font-body">Gold Soft</p>
          </div>
          <div className="bg-gold-light p-4 rounded-lg shadow-md">
            <p className="text-charcoal font-body">Gold Light</p>
          </div>
          <div className="bg-gold-dark p-4 rounded-lg shadow-md">
            <p className="text-white font-body">Gold Dark</p>
          </div>
          <div className="bg-charcoal p-4 rounded-lg shadow-lg">
            <p className="text-cream font-body">Charcoal</p>
          </div>
          <div className="bg-terracotta p-4 rounded-lg shadow-md">
            <p className="text-white font-body">Terracotta</p>
          </div>
        </div>
      </section>

      {/* Typography Testing (AC #2, #4) */}
      <section className="mb-12">
        <h2 className="heading-md text-charcoal-soft mb-6">Typography</h2>
        <div className="space-y-4">
          <h1 className="heading-xl text-gold-dark">Heading XL (Fluid)</h1>
          <h2 className="heading-lg text-charcoal">Heading LG (Fluid)</h2>
          <h3 className="heading-md text-charcoal-soft">Heading MD (Fluid)</h3>
          <p className="font-body text-charcoal">
            Body text using DM Sans. This demonstrates the body font family with proper loading.
          </p>
          <p className="font-display text-xl text-gold">
            Display text using Cormorant Garamond. This is the serif display font.
          </p>
        </div>
      </section>

      {/* Shadow Testing (AC #6) */}
      <section className="mb-12">
        <h2 className="heading-md text-charcoal-soft mb-6">Shadows</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <p className="font-body text-charcoal">Shadow SM</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <p className="font-body text-charcoal">Shadow MD</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <p className="font-body text-charcoal">Shadow LG</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-gold">
            <p className="font-body text-gold-dark">Shadow Gold</p>
          </div>
        </div>
      </section>

      {/* Motion Preference Testing (AC #8) */}
      <section className="mb-12">
        <h2 className="heading-md text-charcoal-soft mb-6">Motion Preference</h2>
        <div className="bg-cream-warm p-6 rounded-lg shadow-md">
          <button
            className="bg-gold text-white px-6 py-3 rounded-lg font-body transition-all hover:bg-gold-dark hover:shadow-gold"
          >
            Hover Me (Animated)
          </button>
          <p className="mt-4 text-sm text-charcoal-soft font-body">
            ⚠️ If you have "Reduce Motion" enabled in your OS, animations will be disabled.
          </p>
        </div>
      </section>

      {/* TypeScript Token Export Test */}
      <section className="mb-12">
        <h2 className="heading-md text-charcoal-soft mb-6">TypeScript Tokens</h2>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <p className="font-body text-charcoal mb-2">
            Import tokens from <code className="bg-cream px-2 py-1 rounded">@/styles/tokens</code>
          </p>
          <code className="block bg-charcoal text-cream p-4 rounded-lg font-mono text-sm">
            {`import { colors, fonts } from '@/styles/tokens';`}
            <br />
            {`const bgColor = colors.cream; // '#F5F5F0'`}
          </code>
        </div>
      </section>
    </div>
  );
}
