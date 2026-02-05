/**
 * Test endpoint to verify LEAD_QUEUE KV namespace binding
 * GET /api/test-kv - Tests KV write and read operations
 */

import type { APIRoute } from 'astro';

export const GET: APIRoute = async ({ locals }) => {
  try {
    const runtime = locals.runtime;

    // Check if KV binding exists
    if (!runtime?.env?.LEAD_QUEUE) {
      return Response.json({
        status: 'error',
        message: 'LEAD_QUEUE KV binding not found',
        hint: 'Check wrangler.jsonc configuration'
      }, { status: 500 });
    }

    const kv = runtime.env.LEAD_QUEUE;
    const testKey = 'test:deployment-verification';
    const testValue = {
      timestamp: new Date().toISOString(),
      message: 'KV binding test successful',
      deployment: 'cloudflare-pages'
    };

    // Test write operation
    await kv.put(testKey, JSON.stringify(testValue));

    // Test read operation
    const retrieved = await kv.get(testKey, 'text');

    if (!retrieved) {
      return Response.json({
        status: 'error',
        message: 'KV write succeeded but read failed'
      }, { status: 500 });
    }

    const parsedValue = JSON.parse(retrieved);

    // Clean up test key
    await kv.delete(testKey);

    return Response.json({
      status: 'success',
      message: 'LEAD_QUEUE KV binding is working correctly',
      test: {
        written: testValue,
        retrieved: parsedValue,
        match: JSON.stringify(testValue) === JSON.stringify(parsedValue)
      },
      binding: {
        name: 'LEAD_QUEUE',
        operations: ['put', 'get', 'delete']
      }
    }, {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    });

  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';

    return Response.json({
      status: 'error',
      message: 'KV binding test failed',
      error: errorMessage
    }, { status: 500 });
  }
};
