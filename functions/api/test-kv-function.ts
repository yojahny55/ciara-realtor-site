/**
 * Native Cloudflare Pages Function to test KV bindings
 * This bypasses Astro and directly uses Pages Functions API
 */

interface Env {
  LEAD_QUEUE: KVNamespace;
  LEAD_QUEUE_preview: KVNamespace;
  BRIDGE_API_URL: string;
  BRIDGE_API_KEY: string;
  RESEND_API_KEY: string;
}

export async function onRequest(context: EventContext<Env, any, any>) {
  try {
    const { env } = context;

    // Debug: Show what's available
    const debugInfo = {
      hasEnv: !!env,
      envKeys: env ? Object.keys(env) : [],
      hasLEAD_QUEUE: !!env?.LEAD_QUEUE,
      hasLEAD_QUEUE_preview: !!env?.LEAD_QUEUE_preview,
      CF_PAGES_BRANCH: env?.CF_PAGES_BRANCH || 'unknown'
    };

    // Try to access KV binding
    const kv = env.LEAD_QUEUE_preview || env.LEAD_QUEUE;
    const environment = env.LEAD_QUEUE_preview ? 'preview' : 'production';

    if (!kv) {
      return Response.json({
        status: 'error',
        message: 'No KV binding found in Pages Function',
        debug: debugInfo
      }, { status: 500 });
    }

    // Test KV operations
    const testKey = 'test:pages-function-verification';
    const testValue = {
      timestamp: new Date().toISOString(),
      message: 'KV binding test from Pages Function',
      environment
    };

    await kv.put(testKey, JSON.stringify(testValue));
    const retrieved = await kv.get(testKey, 'text');
    await kv.delete(testKey);

    return Response.json({
      status: 'success',
      message: 'KV binding works in Pages Function!',
      environment,
      bindingSource: 'pages-function',
      test: {
        written: testValue,
        retrieved: retrieved ? JSON.parse(retrieved) : null
      },
      debug: debugInfo
    }, { status: 200 });

  } catch (error) {
    return Response.json({
      status: 'error',
      message: 'Error testing KV binding',
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
