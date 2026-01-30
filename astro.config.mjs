// @ts-check
import { defineConfig } from 'astro/config';

import cloudflare from '@astrojs/cloudflare';
import preact from '@astrojs/preact';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';


// https://astro.build/config
export default defineConfig({
   site: 'https://ciararuiz.com', // Update with actual domain

  // NOTE: In Astro 5, 'static' is the default and works like old 'hybrid'
  // Pages prerender by default; use `export const prerender = false` for SSR pages
  // Only set output: 'server' if MOST pages need SSR

  adapter: cloudflare({
    platformProxy: { enabled: true }  // Enables local dev with CF bindings
  }),

  integrations: [
    preact({ compat: true }),  // Enable React compatibility
    sitemap({
      i18n: {
        defaultLocale: 'en',
        locales: { en: 'en-US', es: 'es-US' }
      }
    })
  ],

  i18n: {
    locales: ['en', 'es'],
    defaultLocale: 'en',
    routing: {
      prefixDefaultLocale: true,
      redirectToDefaultLocale: false
    }
  },

  vite: {
    plugins: [tailwindcss()]
  }
});