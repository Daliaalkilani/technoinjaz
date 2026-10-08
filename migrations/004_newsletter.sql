-- Newsletter with double opt-in, one-click unsubscribe and a send log (2026-10).
-- Apply: npx wrangler d1 execute technoenjaz-db --remote --file migrations/004_newsletter.sql
-- Idempotent (IF NOT EXISTS / INSERT OR IGNORE). All *_at columns are unix epoch ms.

-- status: 'pending' (waiting for the confirmation click), 'active', 'unsubscribed'.
-- confirm_token: SHA-256 of the emailed confirmation token (raw token never stored).
-- unsub_token: random per-subscriber token placed in every newsletter's unsubscribe
--   link; it can only ever unsubscribe that address, so it is stored as-is.
CREATE TABLE IF NOT EXISTS newsletter_subscribers (
  id                 INTEGER PRIMARY KEY AUTOINCREMENT,
  email              TEXT    NOT NULL UNIQUE COLLATE NOCASE,
  lang               TEXT    NOT NULL DEFAULT 'ar',
  status             TEXT    NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'active', 'unsubscribed')),
  confirm_token      TEXT    NULL,
  confirm_expires_at INTEGER NULL,
  unsub_token        TEXT    NOT NULL,
  created_at         INTEGER NOT NULL,
  confirmed_at       INTEGER NULL,
  unsubscribed_at    INTEGER NULL
);
CREATE INDEX IF NOT EXISTS idx_newsletter_status ON newsletter_subscribers(status);
CREATE UNIQUE INDEX IF NOT EXISTS idx_newsletter_unsub ON newsletter_subscribers(unsub_token);
CREATE INDEX IF NOT EXISTS idx_newsletter_confirm ON newsletter_subscribers(confirm_token);

-- One row per newsletter (item announced) with delivery counters.
CREATE TABLE IF NOT EXISTS newsletter_sends (
  id          INTEGER PRIMARY KEY AUTOINCREMENT,
  item_type   TEXT    NOT NULL CHECK (item_type IN ('article', 'project')),
  item_slug   TEXT    NOT NULL,
  subject     TEXT    NOT NULL,
  sent_count  INTEGER NOT NULL DEFAULT 0,
  fail_count  INTEGER NOT NULL DEFAULT 0,
  total       INTEGER NOT NULL DEFAULT 0,
  created_by  TEXT    NOT NULL,
  created_at  INTEGER NOT NULL,
  finished_at INTEGER NULL
);
CREATE INDEX IF NOT EXISTS idx_newsletter_sends_item ON newsletter_sends(item_type, item_slug);

-- Addresses collected by the older endpoint (table `subscribers`, no confirmation):
-- carried over as pending, so they are only mailed after confirming.
INSERT OR IGNORE INTO newsletter_subscribers (email, status, unsub_token, created_at)
SELECT email, 'pending', lower(hex(randomblob(32))), COALESCE(created_at, unixepoch() * 1000)
  FROM subscribers;
