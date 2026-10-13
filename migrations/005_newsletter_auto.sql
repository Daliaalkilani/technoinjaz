-- Auto newsletter (2026-10): tracks when a new article/project is first observed so the
-- cron can hold a 60-minute grace window before announcing, and lets the admin pin an
-- item so it is never auto-announced. All *_at columns are unix epoch ms.
-- Apply: npx wrangler d1 execute technoenjaz-db --remote --file migrations/005_newsletter_auto.sql
CREATE TABLE IF NOT EXISTS newsletter_auto (
  item_type  TEXT    NOT NULL CHECK (item_type IN ('article', 'project')),
  item_slug  TEXT    NOT NULL,
  -- 'seen' = observed, waiting out the grace window; 'hold' = admin pinned, never auto-send.
  state      TEXT    NOT NULL DEFAULT 'seen' CHECK (state IN ('seen', 'hold')),
  first_seen_at INTEGER NOT NULL,
  updated_at INTEGER NULL,
  PRIMARY KEY (item_type, item_slug)
);
