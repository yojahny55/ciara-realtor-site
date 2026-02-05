/**
 * Test endpoint to verify LEAD_QUEUE KV namespace binding
 * GET /api/test-kv - Tests KV write and read operations
 */

import type { APIRoute } from 'astro';

export const GET: APIRoute = async (context) => {
  try {
    const { locals } = context;
    const runtime = locals.runtime;

    // Debug: Check multiple possible locations for KV bindings
    const debugInfo = {
      hasRuntime: !!runtime,
      hasEnv: !!runtime?.env,
      runtimeKeys: runtime ? Object.keys(runtime) : [],
      envKeys: runtime?.env ? Object.keys(runtime.env) : [],
      localsKeys: Object.keys(locals),
      contextKeys: Object.keys(context),
      // Check if there's a platform object (Cloudflare Pages specific)
      hasPlatform: !!(context as any).platform,
      platformKeys: (context as any).platform ? Object.keys((context as any).platform) : [],
      platformEnvKeys: (context as any).platform?.env ? Object.keys((context as any).platform.env) : []
    };

    // Try multiple possible locations for KV bindings
    // 1. Via runtime.env (Workers standard)
    const kvFromRuntime = runtime?.env?.LEAD_QUEUE || runtime?.env?.LEAD_QUEUE_preview;

    // 2. Via context.platform.env (Cloudflare Pages specific)
    const platformEnv = (context as any).platform?.env;
    const kvFromPlatform = platformEnv?.LEAD_QUEUE || platformEnv?.LEAD_QUEUE_preview;

    // 3. Via context.env (alternative)
    const kvFromContext = (context as any).env?.LEAD_QUEUE || (context as any).env?.LEAD_QUEUE_preview;

    const kv = kvFromRuntime || kvFromPlatform || kvFromContext;

    // Determine which source worked
    let bindingSource = 'none';
    if (kvFromRuntime) bindingSource = 'runtime.env';
    else if (kvFromPlatform) bindingSource = 'platform.env';
    else if (kvFromContext) bindingSource = 'context.env';

    const environment = (runtime?.env?.LEAD_QUEUE_preview || platformEnv?.LEAD_QUEUE_preview) ? 'preview' : 'production';

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
      bindingSource: bindingSource,
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
