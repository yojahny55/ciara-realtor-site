import { describe, it, expect } from 'vitest';
import { readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const projectRoot = join(__dirname, '..');

describe('Project Setup Validation', () => {
  describe('Configuration Files', () => {
    it('should have astro.config.mjs configured correctly', () => {
      const configPath = join(projectRoot, 'astro.config.mjs');
      expect(existsSync(configPath)).toBe(true);

      const config = readFileSync(configPath, 'utf-8');
      expect(config).toContain('@astrojs/cloudflare');
      expect(config).toContain('@astrojs/preact');
      expect(config).toContain('platformProxy: { enabled: true }');
      expect(config).toContain("site: 'https://ciararuiz.com'");
    });

    it('should have tsconfig.json with strict mode', () => {
      const tsconfigPath = join(projectRoot, 'tsconfig.json');
      expect(existsSync(tsconfigPath)).toBe(true);

      const tsconfig = JSON.parse(readFileSync(tsconfigPath, 'utf-8'));
      expect(tsconfig.extends).toBe('astro/tsconfigs/strict');
      expect(tsconfig.compilerOptions.jsxImportSource).toBe('preact');
    });

    it('should have wrangler.jsonc configured', () => {
      const wranglerPath = join(projectRoot, 'wrangler.jsonc');
      expect(existsSync(wranglerPath)).toBe(true);

      const wrangler = readFileSync(wranglerPath, 'utf-8');
      expect(wrangler).toContain('"name": "realtor-site"');
      expect(wrangler).toContain('"compatibility_date": "2026-01-30"');
      expect(wrangler).toContain('"binding": "LEAD_QUEUE"');
      expect(wrangler).toContain('"BRIDGE_API_URL"');
    });

    it('should have package.json with required dependencies', () => {
      const packagePath = join(projectRoot, 'package.json');
      expect(existsSync(packagePath)).toBe(true);

      const pkg = JSON.parse(readFileSync(packagePath, 'utf-8'));

      // Core dependencies
      expect(pkg.dependencies).toHaveProperty('astro');
      expect(pkg.dependencies).toHaveProperty('@astrojs/cloudflare');
      expect(pkg.dependencies).toHaveProperty('@astrojs/preact');
      expect(pkg.dependencies).toHaveProperty('preact');

      // Additional integrations
      expect(pkg.dependencies).toHaveProperty('@astrojs/sitemap');
      expect(pkg.dependencies).toHaveProperty('@astrojs/rss');
      expect(pkg.dependencies).toHaveProperty('astro-icon');
      expect(pkg.dependencies).toHaveProperty('astro-i18n-aut');
      expect(pkg.dependencies).toHaveProperty('zod');
      expect(pkg.dependencies).toHaveProperty('tailwindcss');
    });
  });

  describe('Project Structure', () => {
    it('should have src/pages directory', () => {
      const pagesPath = join(projectRoot, 'src', 'pages');
      expect(existsSync(pagesPath)).toBe(true);
    });

    it('should have src/components directory', () => {
      const componentsPath = join(projectRoot, 'src', 'components');
      expect(existsSync(componentsPath)).toBe(true);
    });

    it('should have index.astro page', () => {
      const indexPath = join(projectRoot, 'src', 'pages', 'index.astro');
      expect(existsSync(indexPath)).toBe(true);
    });

    it('should have all required src directories', () => {
      const requiredDirs = ['layouts', 'content', 'lib', 'i18n', 'types'];
      for (const dir of requiredDirs) {
        const dirPath = join(projectRoot, 'src', dir);
        expect(existsSync(dirPath), `Missing directory: src/${dir}`).toBe(true);
      }
    });

    it('should have test island component', () => {
      const testIslandPath = join(projectRoot, 'src', 'components', 'test-island.tsx');
      expect(existsSync(testIslandPath)).toBe(true);

      const content = readFileSync(testIslandPath, 'utf-8');
      expect(content).toContain('export function TestIsland');
      expect(content).toContain('useState');
    });

    it('should have error boundary component', () => {
      const errorBoundaryPath = join(projectRoot, 'src', 'components', 'error-boundary.tsx');
      expect(existsSync(errorBoundaryPath)).toBe(true);

      const content = readFileSync(errorBoundaryPath, 'utf-8');
      expect(content).toContain('export class ErrorBoundary');
      expect(content).toContain('getDerivedStateFromError');
    });

    it('should have public directory', () => {
      const publicPath = join(projectRoot, 'public');
      expect(existsSync(publicPath)).toBe(true);
    });

    it('should have .assetsignore file for Cloudflare', () => {
      const assetsIgnorePath = join(projectRoot, 'public', '.assetsignore');
      expect(existsSync(assetsIgnorePath)).toBe(true);
    });
  });

  describe('Build Output Verification', () => {
    it('should have dist directory after build', () => {
      const distPath = join(projectRoot, 'dist');
      // This will be true after running build
      if (existsSync(distPath)) {
        expect(existsSync(join(distPath, 'index.html'))).toBe(true);
        expect(existsSync(join(distPath, '_worker.js'))).toBe(true);
        expect(existsSync(join(distPath, '_routes.json'))).toBe(true);
      }
    });
  });
});
