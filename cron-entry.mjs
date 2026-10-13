/**
 * Worker entry that adds a `scheduled` handler (cron triggers) on top of the
 * OpenNext fetch handler. Cron ticks invoke the auto-newsletter route in-process
 * (no public HTTP round-trip); normal fetch traffic is untouched.
 *
 * wrangler.jsonc points `main` at this file; it imports the OpenNext output that
 * the build command (wrangler.jsonc → build.command) regenerates before every deploy.
 */
import openNext from './.open-next/worker.js';

const handler = /** @type {{ fetch(r: Request, e: unknown, c: ExecutionContext): Promise<Response> }} */ (openNext);

export default {
  async fetch(request, env, ctx) {
    return handler.fetch(request, env, ctx);
  },
  async scheduled(_event, env, ctx) {
    ctx.waitUntil(
      (async () => {
        try {
          const req = new Request('https://cron.internal/api/cron/newsletter', {
            headers: { authorization: `Bearer ${env.CRON_SECRET ?? ''}` }
          });
          const res = await handler.fetch(req, env, ctx);
          console.log('newsletter cron:', await res.text());
        } catch (err) {
          console.error('newsletter cron tick failed', err instanceof Error ? err.message : err);
        }
      })()
    );
  }
};
