// @ts-check
import eslint from '@eslint/js';
import { defineConfig } from 'eslint/config';
import tseslint from 'typescript-eslint';

export default defineConfig(
  // Base ESLint recommended rules
  eslint.configs.recommended,

  // TypeScript-ESLint recommended rules
  tseslint.configs.recommended,

  // Custom rules for this project
  {
    rules: {
      // Enforce no any - CRITICAL for this project
      '@typescript-eslint/no-explicit-any': 'error',
      // Allow unused vars with underscore prefix
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      // Enforce consistent type imports
      '@typescript-eslint/consistent-type-imports': ['error', { prefer: 'type-imports' }],
    },
  },

  // Files to ignore
  {
    ignores: ['dist/**', 'node_modules/**', '.astro/**', '*.config.*'],
  },
);
