import { NextResponse } from 'next/server';
import { getCloudflareContext } from '@opennextjs/cloudflare';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const email = body?.email ? String(body.email).trim().toLowerCase() : '';

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, message: 'Invalid email address provided.' },
        { status: 400 }
      );
    }

    const { env } = await getCloudflareContext();
    const db = (env as { DB?: { prepare(q: string): { bind(...v: unknown[]): { run(): Promise<{ meta?: { changes?: number } }> } } } }).DB;
    if (!db) {
      return NextResponse.json(
        { success: false, message: 'Storage not configured.' },
        { status: 500 }
      );
    }

    const result = await db
      .prepare(
        'INSERT INTO subscribers (email) VALUES (?1) ON CONFLICT(email) DO NOTHING'
      )
      .bind(email)
      .run();

    const inserted = (result.meta?.changes ?? 0) > 0;
    return NextResponse.json({
      success: true,
      message: inserted
        ? 'Subscribed successfully.'
        : 'This email is already subscribed.',
      alreadySubscribed: !inserted,
    });
  } catch {
    return NextResponse.json(
      { success: false, message: 'Subscription failed. Please try again.' },
      { status: 500 }
    );
  }
}
