-- Shared batch cursor of a newsletter send (2026-10): id of the last subscriber handed
-- to a batch, so the admin page and the cron never mail anyone twice. sendNextBatch()
-- also creates it on demand; this file only records it in the schema history.
-- Apply: npx wrangler d1 execute technoenjaz-db --remote --file migrations/006_newsletter_cursor.sql
-- Idempotent (IF NOT EXISTS): a no-op where the table already exists.
CREATE TABLE IF NOT EXISTS newsletter_auto_cursor (
  send_id  INTEGER PRIMARY KEY,
  after_id INTEGER NOT NULL
);

-- The cron looks for an unfinished send on every tick.
CREATE INDEX IF NOT EXISTS idx_newsletter_sends_unfinished ON newsletter_sends(finished_at);
