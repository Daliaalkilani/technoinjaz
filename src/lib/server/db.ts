import 'server-only';
import { NextResponse } from 'next/server';
import { getCloudflareContext } from '@opennextjs/cloudflare';

// Minimal D1 surface used by the accounts/engagement API (no workers-types dep).
export interface D1Result<T = Record<string, unknown>> {
  results?: T[];
  meta?: { changes?: number; last_row_id?: number };
}
export interface D1Stmt {
  bind(...values: unknown[]): D1Stmt;
  first<T = Record<string, unknown>>(): Promise<T | null>;
  all<T = Record<string, unknown>>(): Promise<D1Result<T>>;
  run(): Promise<D1Result>;
}
export interface D1 {
  prepare(query: string): D1Stmt;
  batch(statements: D1Stmt[]): Promise<D1Result[]>;
}

export async function getDB(): Promise<D1> {
  const { env } = await getCloudflareContext({ async: true });
  const db = (env as { DB?: D1 }).DB;
  if (!db) throw new Error('D1 binding "DB" is not configured');
  return db;
}

/** JSON error response with a stable machine code the client maps to AR/EN text. */
export function apiError(status: number, code: string) {
  return NextResponse.json({ ok: false, error: code }, { status, headers: { 'Cache-Control': 'no-store' } });
}

export function apiOk<T extends Record<string, unknown>>(data: T, init?: { status?: number }) {
  return NextResponse.json({ ok: true, ...data }, { status: init?.status ?? 200, headers: { 'Cache-Control': 'no-store' } });
}

/**
 * CSRF guard for state-changing requests: the session cookie is SameSite=Lax, and
 * on top of that any request carrying an Origin header must come from this host.
 */
export function isSameOrigin(request: Request): boolean {
  const origin = request.headers.get('origin');
  if (!origin) return true;
  try {
    const host = request.headers.get('host');
    return new URL(origin).host === host;
  } catch {
    return false;
  }
}

export async function readJson(request: Request): Promise<Record<string, unknown> | null> {
  try {
    const body = await request.json();
    return body && typeof body === 'object' && !Array.isArray(body) ? (body as Record<string, unknown>) : null;
  } catch {
    return null;
  }
}

export const SLUG_RE = /^[A-Za-z0-9][A-Za-z0-9_-]{0,159}$/;
