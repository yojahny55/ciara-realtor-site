/**
 * Test endpoint to verify LEAD_QUEUE KV namespace binding
 * GET /api/test-kv - Tests KV write and read operations
 */

import type { APIRoute } from 'astro';

export const GET: APIRoute = async ({ locals }) => {
  try {
    const runtime = locals.runtime;

    // Debug: Log what's available
    const debugInfo = {
      hasRuntime: !!runtime,
      hasEnv: !!runtime?.env,
      runtimeKeys: runtime ? Object.keys(runtime) : [],
      envKeys: runtime?.env ? Object.keys(runtime.env) : [],
      localsKeys: Object.keys(locals)
    };

    // Determine environment and select appropriate KV binding
    // Preview environments use LEAD_QUEUE_preview, production uses LEAD_QUEUE
    const kvProduction = runtime?.env?.LEAD_QUEUE;
    const kvPreview = runtime?.env?.LEAD_QUEUE_preview;

    const kv = kvPreview || kvProduction;
    const environment = kvPreview ? 'preview' : 'production';

    // Check if any KV binding exists
    if (!kv) {
      return Response.json({
        status: 'error',
        message: 'No LEAD_QUEUE KV binding found',
        hint: 'Check wrangler.jsonc configuration and Cloudflare Pages environment variables',
        debug: debugInfo
      }, { status: 500 });
    }
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
      environment: environment,
      test: {
        written: testValue,
        retrieved: parsedValue,
        match: JSON.stringify(testValue) === JSON.stringify(parsedValue)
      },
      binding: {
        name: environment === 'preview' ? 'LEAD_QUEUE_preview' : 'LEAD_QUEUE',
        namespace: environment === 'preview' ? 'realtor-site-lead-queue-preview' : 'realtor-site-lead-queue',
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
