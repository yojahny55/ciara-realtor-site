/**
 * Design Tokens Test Component (demo8 - Glassmorphism)
 *
 * This component tests all configured design tokens:
 * - Tailwind color utilities (AC #1)
 * - Font utilities (AC #2)
 * - Glass utilities (AC #3, #7)
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
      <h1 className="heading-xl text-charcoal mb-8">Design Tokens Test (demo8)</h1>

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
          <div className="bg-primary p-4 rounded-lg shadow-glow">
            <p className="text-white font-body">Primary (Rose Gold)</p>
          </div>
          <div className="bg-primary-light p-4 rounded-lg shadow-md">
            <p className="text-charcoal font-body">Primary Light</p>
          </div>
          <div className="bg-primary-dark p-4 rounded-lg shadow-md">
            <p className="text-white font-body">Primary Dark</p>
          </div>
          <div className="bg-secondary p-4 rounded-lg shadow-md">
            <p className="text-charcoal font-body">Secondary (Gold)</p>
          </div>
          <div className="bg-charcoal p-4 rounded-lg shadow-lg">
            <p className="text-cream font-body">Charcoal</p>
          </div>
          <div className="bg-glass-white p-4 rounded-lg shadow-md">
            <p className="text-charcoal font-body">Glass White</p>
          </div>
        </div>
      </section>

      {/* Glass Effects Testing (AC #3, #7) */}
      <section className="mb-12">
        <h2 className="heading-md text-charcoal-soft mb-6">Glassmorphism Effects</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="glass p-6 rounded-lg">
            <p className="font-body text-charcoal font-semibold">.glass utility</p>
            <p className="text-sm text-charcoal-soft mt-2">
              Frosted glass effect with backdrop blur
            </p>
          </div>
          <div className="glass-strong p-6 rounded-lg">
            <p className="font-body text-charcoal font-semibold">.glass-strong utility</p>
            <p className="text-sm text-charcoal-soft mt-2">
              Stronger glass effect
            </p>
          </div>
          <div className="glass-dark p-6 rounded-lg">
            <p className="font-body text-white font-semibold">.glass-dark utility</p>
            <p className="text-sm text-cream-white mt-2">
              Dark glass panel
            </p>
          </div>
        </div>
      </section>

      {/* Typography Testing (AC #2, #4) */}
      <section className="mb-12">
        <h2 className="heading-md text-charcoal-soft mb-6">Typography</h2>
        <div className="space-y-4">
          <h1 className="heading-xl text-primary-dark">Heading XL (Fluid)</h1>
          <h2 className="heading-lg text-charcoal">Heading LG (Fluid)</h2>
          <h3 className="heading-md text-charcoal-soft">Heading MD (Fluid)</h3>
          <h4 className="heading-sm text-charcoal-soft">Heading SM (Fluid) - New in demo8</h4>
          <p className="font-body text-charcoal">
            Body text using Josefin Sans. This demonstrates the body font family with proper loading.
          </p>
          <p className="font-display text-xl text-primary text-gradient">
            Display text using Cinzel. This is the serif display font with gradient.
          </p>
          <p className="overline text-primary-dark">
            Overline Text Style
          </p>
        </div>
      </section>

      {/* Shadow Testing (AC #6) */}
      <section className="mb-12">
        <h2 className="heading-md text-charcoal-soft mb-6">Shadows (Rose Gold Tints)</h2>
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
          <div className="bg-white p-6 rounded-lg shadow-glow">
            <p className="font-body text-primary-dark">Shadow Glow</p>
          </div>
        </div>
      </section>

      {/* Motion Preference Testing (AC #8) */}
      <section className="mb-12">
        <h2 className="heading-md text-charcoal-soft mb-6">Motion Preference</h2>
        <div className="bg-cream-warm p-6 rounded-lg shadow-md">
          <button
            className="bg-primary text-white px-6 py-3 rounded-lg font-body transition-all hover:bg-primary-dark hover:shadow-glow"
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
            {`const bgColor = colors.cream; // '#F5EDE8'`}
            <br />
            {`const primary = colors.primary; // '#B76E79'`}
          </code>
        </div>
      </section>
    </div>
  );
}
