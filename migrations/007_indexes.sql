-- Missing secondary indexes (2026-10).
-- Apply: npx wrangler d1 execute technoenjaz-db --remote --file migrations/007_indexes.sql
-- Idempotent (IF NOT EXISTS); adds indexes only, no data change.

-- Account deletion runs `DELETE FROM article_likes WHERE user_id = ?`; the only index
-- was UNIQUE(article_slug, user_id), which cannot serve a user_id-only lookup.
CREATE INDEX IF NOT EXISTS idx_article_likes_user ON article_likes(user_id);

-- Lets a periodic `DELETE FROM sessions WHERE expires_at < ?` (expired sessions of
-- users who never sign in again are otherwise kept forever) use an index.
CREATE INDEX IF NOT EXISTS idx_sessions_expires ON sessions(expires_at);
