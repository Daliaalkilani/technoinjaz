-- Tables used by /api/contact and /api/newsletter/subscribe that were never captured
-- in a migration file (2026-10). Columns mirror the INSERT statements in those routes.
-- Apply: npx wrangler d1 execute technoenjaz-db --remote --file migrations/002_contact_newsletter.sql
-- Idempotent (IF NOT EXISTS): a no-op where the tables already exist.

CREATE TABLE IF NOT EXISTS contact_messages (
  id             INTEGER PRIMARY KEY AUTOINCREMENT,
  name           TEXT    NOT NULL,
  specialization TEXT    NULL,
  university     TEXT    NULL,
  email          TEXT    NULL,
  phone          TEXT    NULL,
  inquiry        TEXT    NOT NULL,
  lang           TEXT    NOT NULL DEFAULT 'ar',
  ip             TEXT    NULL,
  user_agent     TEXT    NULL,
  email_sent     INTEGER NOT NULL DEFAULT 0,
  wa_sent        INTEGER NOT NULL DEFAULT 0,
  created_at     INTEGER NOT NULL DEFAULT (unixepoch() * 1000)
);
CREATE INDEX IF NOT EXISTS idx_contact_messages_created ON contact_messages(created_at);

CREATE TABLE IF NOT EXISTS subscribers (
  id         INTEGER PRIMARY KEY AUTOINCREMENT,
  email      TEXT    NOT NULL UNIQUE COLLATE NOCASE,
  created_at INTEGER NOT NULL DEFAULT (unixepoch() * 1000)
);
