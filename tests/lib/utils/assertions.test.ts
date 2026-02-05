/**
 * Unit tests for assertion utilities
 */
import { describe, expect, it, vi } from 'vitest';

import { assertDefined, assertServerSide } from '@lib/utils';

describe('assertServerSide', () => {
  it('does not throw when window is undefined (server-side)', () => {
    // window is undefined in Node.js/Vitest by default
    expect(() => assertServerSide('testFunction')).not.toThrow();
  });

  it('throws when window is defined (browser-like)', () => {
    // Mock window to simulate browser environment
    vi.stubGlobal('window', {});

    expect(() => assertServerSide('testFunction')).toThrow(
      'testFunction must only be called server-side'
    );

    // Clean up
    vi.unstubAllGlobals();
  });

  it('includes function name in error message', () => {
    vi.stubGlobal('window', {});

    expect(() => assertServerSide('getSecretApiKey')).toThrow(
      'getSecretApiKey must only be called server-side'
    );

    vi.unstubAllGlobals();
  });
});

describe('assertDefined', () => {
  it('does not throw for defined values', () => {
    expect(() => assertDefined('value', 'message')).not.toThrow();
    expect(() => assertDefined(0, 'message')).not.toThrow();
    expect(() => assertDefined(false, 'message')).not.toThrow();
    expect(() => assertDefined('', 'message')).not.toThrow();
    expect(() => assertDefined([], 'message')).not.toThrow();
    expect(() => assertDefined({}, 'message')).not.toThrow();
  });

  it('throws for null', () => {
    expect(() => assertDefined(null, 'Value is required')).toThrow(
      'Value is required'
    );
  });

  it('throws for undefined', () => {
    expect(() => assertDefined(undefined, 'Value is required')).toThrow(
      'Value is required'
    );
  });

  it('uses provided error message', () => {
    expect(() => assertDefined(null, 'API key is missing')).toThrow(
      'API key is missing'
    );
  });

  it('narrows type after assertion', () => {
    const maybeString: string | null = 'hello';
    assertDefined(maybeString, 'String is required');
    // TypeScript now knows maybeString is string
    const length: number = maybeString.length;
    expect(length).toBe(5);
  });
});
