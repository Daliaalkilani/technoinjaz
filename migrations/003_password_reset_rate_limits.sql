-- Password reset tokens + D1-backed rate limiting (2026-10).
-- Apply: npx wrangler d1 execute technoenjaz-db --remote --file migrations/003_password_reset_rate_limits.sql
-- Idempotent (IF NOT EXISTS). All *_at columns are unix epoch milliseconds.

-- Same rule as sessions / verification: only the SHA-256 of the emailed token is stored.
CREATE TABLE IF NOT EXISTS password_reset_tokens (
  token      TEXT    PRIMARY KEY,
  user_id    INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  expires_at INTEGER NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_password_reset_user ON password_reset_tokens(user_id);

-- One row per bucket ("login:ip:1.2.3.4", "forgot:email:x@y.z", ...), fixed window.
CREATE TABLE IF NOT EXISTS rate_limits (
  key      TEXT    PRIMARY KEY,
  count    INTEGER NOT NULL,
  reset_at INTEGER NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_rate_limits_reset ON rate_limits(reset_at);
