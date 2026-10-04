-- Accounts + engagement schema (2026-10).
-- Apply: npx wrangler d1 execute technoenjaz-db --remote --file migrations/001_accounts_engagement.sql
-- Idempotent (IF NOT EXISTS everywhere) so it is safe to re-run.
-- All *_at columns are unix epoch milliseconds.

CREATE TABLE IF NOT EXISTS users (
  id             INTEGER PRIMARY KEY AUTOINCREMENT,
  email          TEXT    NOT NULL UNIQUE COLLATE NOCASE,
  name           TEXT    NOT NULL,
  password_hash  TEXT    NOT NULL,
  email_verified INTEGER NOT NULL DEFAULT 0,
  created_at     INTEGER NOT NULL
);

-- `token` holds the SHA-256 hex of the session cookie value, never the raw token,
-- so a leaked database dump cannot be replayed as live sessions.
CREATE TABLE IF NOT EXISTS sessions (
  token      TEXT    PRIMARY KEY,
  user_id    INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  expires_at INTEGER NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_sessions_user ON sessions(user_id);

-- Same hashing rule as sessions: only the SHA-256 of the emailed token is stored.
CREATE TABLE IF NOT EXISTS email_verification_tokens (
  token      TEXT    PRIMARY KEY,
  user_id    INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  expires_at INTEGER NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_email_verif_user ON email_verification_tokens(user_id);

CREATE TABLE IF NOT EXISTS comments (
  id           INTEGER PRIMARY KEY AUTOINCREMENT,
  article_slug TEXT    NOT NULL,
  user_id      INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  parent_id    INTEGER NULL REFERENCES comments(id) ON DELETE CASCADE,
  body         TEXT    NOT NULL,
  created_at   INTEGER NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_comments_article ON comments(article_slug, created_at);
CREATE INDEX IF NOT EXISTS idx_comments_user ON comments(user_id, created_at);
CREATE INDEX IF NOT EXISTS idx_comments_parent ON comments(parent_id);

CREATE TABLE IF NOT EXISTS comment_likes (
  comment_id INTEGER NOT NULL REFERENCES comments(id) ON DELETE CASCADE,
  user_id    INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  created_at INTEGER NOT NULL,
  UNIQUE (comment_id, user_id)
);
CREATE INDEX IF NOT EXISTS idx_comment_likes_user ON comment_likes(user_id);

CREATE TABLE IF NOT EXISTS article_likes (
  article_slug TEXT    NOT NULL,
  user_id      INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  created_at   INTEGER NOT NULL,
  UNIQUE (article_slug, user_id)
);

-- `meta` is an optional JSON snapshot (title, image, description…) taken when the
-- item was saved, so the profile page can render cards without a content lookup.
CREATE TABLE IF NOT EXISTS saved_items (
  user_id    INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  item_type  TEXT    NOT NULL CHECK (item_type IN ('project', 'video', 'article')),
  item_slug  TEXT    NOT NULL,
  meta       TEXT    NULL,
  created_at INTEGER NOT NULL,
  UNIQUE (user_id, item_type, item_slug)
);
CREATE INDEX IF NOT EXISTS idx_saved_user ON saved_items(user_id, created_at);
