import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

// In-memory set for active session tracking
const activeSubscribers = new Set<string>();

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

    activeSubscribers.add(email);

    return NextResponse.json({
      success: true,
      message: 'Subscription confirmed. Platform notifications are active.',
      email,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Failed to process subscription request.' },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    status: 'active',
    endpoint: 'Techno Enjaz Newsletter & Notifications Subscription Gateway',
    count: activeSubscribers.size
  });
}
