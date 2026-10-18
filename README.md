<div align="center">
  <img src="public/images/brand/techno-logo.png" alt="Techno Enjaz logo" width="96" />
  <h1>Techno Enjaz · تكنو إنجاز</h1>
  <p><strong>Official website of Techno Enjaz, an engineering office in Hama, Syria.</strong><br/>
  AI, embedded systems, robotics, IoT and software projects, technical articles and the team behind them.</p>
  <p><a href="https://technoenjaz.com">technoenjaz.com</a></p>
</div>

---

## Table of contents

1. [Overview](#overview)
2. [Tech stack](#tech-stack)
3. [Repository layout](#repository-layout)
4. [Getting started](#getting-started)
5. [Build and deployment](#build-and-deployment)
6. [Configuration: bindings, variables and secrets](#configuration-bindings-variables-and-secrets)
7. [Database (Cloudflare D1)](#database-cloudflare-d1)
8. [Scheduled jobs (cron)](#scheduled-jobs-cron)
9. [HTTP API](#http-api)
10. [Security model](#security-model)
11. [SEO, GEO and structured data](#seo-geo-and-structured-data)
12. [Content management](#content-management)
13. [Internationalisation (Arabic / English)](#internationalisation-arabic--english)
14. [Quality checks and testing](#quality-checks-and-testing)
15. [Contributing](#contributing)
16. [License](#license)

---

## Overview

The site is a bilingual (Arabic-first, English toggle) Next.js application deployed as a single **Cloudflare Worker**. It has:

| Area | Routes | Notes |
| --- | --- | --- |
| Home | `/` | 3D hero, project spiral, video deck, team section |
| Projects | `/projects`, `/projects/[slug]` | 44 documented engineering projects (Markdown, AR + EN) with PDF reports |
| Articles | `/articles`, `/articles/[slug]` | 13 long-form technical articles, likes and threaded comments |
| Videos | `/videos` | Engineering demo videos and live-platform reels |
| Library | `/library` | 3D bookcase and flipbook viewer for technical files |
| Team | `/about`, `/team/[id]` | About page with a WebGL team carousel; one profile page per member |
| FAQ / Contact / Privacy | `/faq`, `/contact`, `/privacy-policy` | Contact form delivers by email, WhatsApp bridge and a D1 archive |
| Accounts | `/register`, `/login`, `/account`, `/reset-password` | Email + password accounts, saved items, comment history |
| Newsletter | `/newsletter` | Subscribe, one-click unsubscribe; automatic announcements of new content |
| Admin | `/admin/messages`, `/admin/subscribers` | Owner-only views of contact messages, subscribers and newsletter sends |
| Machine-readable | `/sitemap.xml`, `/robots.txt`, `/feed.xml`, `/llms.txt`, `/llms-full.txt`, `/manifest.webmanifest` | Generated at build time |

Every content page is **prerendered at build time** (`force-static` + `generateStaticParams`) and served from Workers static assets. Only `/api/*` routes and the middleware execute per request.

## Tech stack

| Layer | Technology |
| --- | --- |
| Framework | Next.js 15 (App Router), React 19, TypeScript 6 |
| Runtime / hosting | Cloudflare Workers via [`@opennextjs/cloudflare`](https://opennext.js.org/cloudflare) |
| Database | Cloudflare D1 (SQLite), binding `DB` |
| Email | Workers `send_email` binding (`SEND_EMAIL`) through Cloudflare Email Routing, sender `info@technoenjaz.com` |
| Scheduling | Workers Cron Triggers (`*/15 * * * *`) |
| Graphics / motion | OGL and gl-matrix (WebGL), GSAP, Framer Motion, page-flip |
| Content | Markdown rendered with `marked`, math with KaTeX |
| Images | `sharp` pipeline (`scripts/optimize-images.mjs`): AVIF + WebP at several widths, SSIM-gated quality |
| Tooling | oxlint, `tsc`, Playwright (+ axe-core), wrangler |

## Repository layout

```
.
├── cron-entry.mjs            Worker entry: OpenNext fetch handler + scheduled() for cron
├── wrangler.jsonc            Worker config: bindings, cron trigger, build command
├── open-next.config.ts       OpenNext config (static-assets incremental cache)
├── next.config.ts            Security headers, redirects, build options
├── migrations/               D1 schema, applied in order (001…007)
├── public/                   Static assets; public/_img/ holds generated responsive images (committed)
├── scripts/                  Image optimiser, site verification, URL inventory, OG image generator
├── tests/                    Playwright specs (redirects, no-JS rendering, visual baseline)
├── docs/                     Reports, SEO notes, reference material
└── src/
    ├── app/                  Routes (pages, API route handlers, sitemap/robots/llms/feed)
    ├── features/             Page-level UI grouped by section (home, projects, team, …)
    ├── components/           Shared UI, layout, effects (WebGL, 3D), error views
    ├── content/              Markdown sources: articles, articles-en, projects, projects-en
    ├── data/                 Typed content data: team, projects, articles, videos, FAQ, Q&A
    ├── lib/                  Client helpers; lib/server/ = D1, auth, mail, newsletter, rate limiting
    ├── seo/                  Metadata builders, JSON-LD schemas, team SEO helpers
    ├── config/site.ts        Canonical URL, organisation details, founder profiles
    ├── locales/              UI translations
    ├── context/              Theme / language and loader providers
    └── middleware.ts         Canonical-host 301 redirect
```

## Getting started

### Prerequisites

- Node.js 22 LTS and npm
- A Cloudflare account with access to the `technoenjaz` Worker and the `technoenjaz-db` D1 database (only needed for deployment and remote D1 work)

### Install and run

```bash
npm ci
npm run dev          # http://localhost:3000
```

`next dev` calls `initOpenNextCloudflareForDev()`, which provides the Worker bindings locally through wrangler (a local D1 database and a stubbed `SEND_EMAIL`). To exercise the API routes locally, create the local schema once:

```bash
for f in migrations/*.sql; do npx wrangler d1 execute technoenjaz-db --local --file "$f"; done
```

Local secrets go in `.dev.vars` (git-ignored). See [Configuration](#configuration-bindings-variables-and-secrets) for the names; never commit real values.

To run the production Worker locally after a build:

```bash
npx opennextjs-cloudflare build
npm run preview      # wrangler dev
```

Requests from `localhost`, `127.0.0.1` and `[::1]` are not redirected by the canonical-host middleware, so local servers stay local.

## Build and deployment

```bash
npm run build        # optimise images, then `next build`
npm run deploy       # wrangler deploy
```

`wrangler deploy` runs the build command declared in `wrangler.jsonc`:

```
npx opennextjs-cloudflare build && npx opennextjs-cloudflare populateCache local
```

so every deploy rebuilds from the current source and copies the prerendered pages into the uploaded assets. Two consequences:

- **Never deploy a stale `.open-next/` folder.** It ships old pages.
- **Do not skip `populateCache`.** Without it every `/articles/*`, `/projects/*` and `/team/*` page returns 404.

`cron-entry.mjs` is the Worker `main`. It imports `.open-next/worker.js` (regenerated by the build) and adds the `scheduled()` handler.

Generated responsive images in `public/_img/` are committed. The optimiser is incremental (content-hashed), so a deploy only encodes new or changed images.

### Custom domain

`technoenjaz.com` is attached as a Workers custom domain and `workers_dev` is disabled. `src/middleware.ts` 301-redirects every other host (including `www` and any `*.workers.dev` address) to the apex domain, keeping one indexable copy of each page. `/api/cron` is excluded from the middleware because the cron handler calls it in-process.

## Configuration: bindings, variables and secrets

Bindings are declared in `wrangler.jsonc`. Secrets are set with `wrangler secret put <NAME>` (production) or in `.dev.vars` (local). **No secret value belongs in the repository, in docs or in logs.**

| Name | Kind | Required | Purpose |
| --- | --- | --- | --- |
| `DB` | D1 binding | Yes | Database `technoenjaz-db` (accounts, comments, contact archive, newsletter, rate limits) |
| `SEND_EMAIL` | send_email binding | Yes | Outgoing mail from `info@technoenjaz.com` (verification, reset, contact, newsletter) |
| `ASSETS` | assets binding | Yes | Static assets / prerendered pages (`.open-next/assets`) |
| `CRON_SECRET` | Secret | Yes (for newsletter automation) | Bearer token for `/api/cron/newsletter`. Without it the route always answers 401 |
| `ADMIN_EMAILS` | Variable | No | Comma-separated owner emails allowed into `/admin/*`. Defaults to the list in `src/lib/server/admin.ts` |
| `WA_BRIDGE_URL` | Secret | No | Self-hosted WhatsApp bridge endpoint. Contact messages are also sent there when set |
| `WA_BRIDGE_KEY` | Secret | No | API key sent to the WhatsApp bridge (`X-Notify-Key` header) |
| `BASE_URL` | Shell env (scripts only) | No | Target for `npm run verify` when checking a deployed site |

Admin access requires both an email listed in `ADMIN_EMAILS` (or the default list) **and** a verified email on that account.

## Database (Cloudflare D1)

Schema files live in `migrations/` and are idempotent (`IF NOT EXISTS`). Apply new ones in order:

```bash
npx wrangler d1 execute technoenjaz-db --remote --file migrations/00X_name.sql
```

All `*_at` columns are Unix epoch **milliseconds**.

| Table | Migration | Purpose |
| --- | --- | --- |
| `users` | 001 | Accounts. `email` is unique and case-insensitive. `password_hash` uses PBKDF2-SHA256, 100k iterations |
| `sessions` | 001, 007 | Session tokens, stored as **SHA-256 of the cookie value**. 30-day lifetime |
| `email_verification_tokens` | 001 | Hashed verification tokens (48 h) |
| `comments` | 001 | Article comments; replies nest one level (`parent_id`) |
| `comment_likes` / `article_likes` | 001, 007 | One like per user per comment or article |
| `saved_items` | 001 | User bookmarks (`project` / `video` / `article`) with a small JSON snapshot |
| `contact_messages` | 002 | Archive of every contact-form submission and its delivery flags |
| `subscribers` | 002 | Legacy newsletter table, migrated into `newsletter_subscribers` by 004 |
| `password_reset_tokens` | 003 | Hashed, single-use reset tokens (1 h) |
| `rate_limits` | 003 | Fixed-window counters (`bucket:id` → count, reset time) |
| `newsletter_subscribers` | 004 | `pending` / `active` / `unsubscribed`, per-subscriber language and unsubscribe token |
| `newsletter_sends` | 004, 006 | One row per announcement with sent / failed counters |
| `newsletter_auto` | 005 | Auto-newsletter state per item: `seen` (grace window running) or `hold` (never auto-announced) |
| `newsletter_auto_cursor` | 006 | Shared batch cursor so the cron and the admin page never mail anyone twice |

> **Operational note:** rows with `state = 'hold'` in `newsletter_auto` are intentional. They pin content that existed before the automation went live, so it is never announced. Do not delete them. An empty `newsletter_auto` table is treated as a first run and would re-hold every item.

Inspect production data read-only, for example:

```bash
npx wrangler d1 execute technoenjaz-db --remote --command "SELECT state, COUNT(*) FROM newsletter_auto GROUP BY state"
```

## Scheduled jobs (cron)

`wrangler.jsonc` → `triggers.crons = ["*/15 * * * *"]`. Every 15 minutes `cron-entry.mjs` calls `GET /api/cron/newsletter` in-process with `Authorization: Bearer $CRON_SECRET`.

Each tick does one of the following:

1. **Continue** an unfinished send by mailing its next batch of 25 active subscribers. The send is done when a batch comes back short.
2. **Detect** new articles or projects (present in the content data, never announced, not on hold). A new item is recorded as `seen`, then announced after a **60-minute grace window**. That window is the owner's chance to hold or fix it.
3. **Idle** when there is nothing to do or no active subscribers.

Owners can hold, release or send manually from `/admin/subscribers` (via `/api/admin/newsletter`). Holding is also available to automation through `POST /api/cron/newsletter` with the same bearer secret. Cron results are logged to Workers observability (`newsletter cron: <status> …`).

## HTTP API

All routes live under `src/app/api/` and are dynamic (never cached: `Cache-Control: no-store`). Errors are JSON `{ ok: false, error: "<code>" }` with a stable machine code that the UI maps to Arabic or English text.

| Method & path | Auth | Description |
| --- | --- | --- |
| `GET /api/health` | none | Liveness probe |
| `POST /api/auth/register` | none | Create account and send verification email (rate limited per IP) |
| `POST /api/auth/login` | none | Sign in, set `te_session` cookie (rate limited per IP and per email) |
| `POST /api/auth/logout` | session | Destroy the current session |
| `GET /api/auth/me` | optional | Current user, or `null` (includes `isAdmin`) |
| `POST /api/auth/verify-email` | token / session | Confirm email (`{ token }`) or resend (`{ resend: true }`) |
| `POST /api/auth/forgot-password` | none | Email a reset link. Same answer whether the email exists or not |
| `POST /api/auth/reset-password` | token | Set new password, revoke all sessions, issue a new one |
| `POST /api/auth/change-password` | session | Change password, revoke other sessions |
| `DELETE /api/auth/account` | session + password | Erase the account and all related data |
| `GET/POST/DELETE /api/saved` | session | List, add and remove saved items |
| `GET/POST /api/articles/[slug]/comments` | optional / verified session | List or post comments |
| `GET/POST/DELETE /api/articles/[slug]/like` | optional / session | Article like state and toggle |
| `POST/DELETE /api/comments/[id]/like` | session | Comment like toggle |
| `DELETE /api/comments/[id]` | author or admin | Delete a comment and its replies |
| `GET /api/comments/mine` | session | The user's own comments |
| `POST /api/contact` | none | Contact form: email + WhatsApp + D1 archive (5 / hour / IP) |
| `POST /api/newsletter/subscribe` | none | Subscribe (single opt-in) and send welcome email |
| `POST /api/newsletter/confirm` | token | Confirm a legacy pending subscription |
| `POST /api/newsletter/unsubscribe` | token | Unsubscribe. Supports RFC 8058 one-click (`?token=` + `List-Unsubscribe=One-Click`) |
| `GET /api/admin/messages` | admin | Contact messages (paged with `?before=<id>`) |
| `GET /api/admin/subscribers` | admin | Subscriber list and counts. `?format=csv` downloads all rows |
| `GET/POST /api/admin/newsletter` | admin | Items, send history, test / start / continue / hold |
| `GET/POST /api/cron/newsletter` | `CRON_SECRET` bearer | Cron tick, and hold / release |

## Security model

- **Sessions:** 32-byte random token in an `HttpOnly; Secure; SameSite=Lax` cookie. Only its SHA-256 is stored. Password change or reset revokes other sessions.
- **Passwords:** PBKDF2-SHA256 (100k iterations, per-user salt) with constant-time comparison. Unknown-email logins burn the same CPU to resist timing enumeration.
- **CSRF:** every state-changing route rejects requests whose `Origin` does not match the host (`isSameOrigin`), on top of `SameSite=Lax`. The one-click unsubscribe is deliberately cross-origin and is authorised by its unguessable token.
- **Rate limiting:** D1 fixed windows on login, register, password flows, verification resend, comments, contact and newsletter. The limiter fails open so a D1 hiccup never locks users out.
- **Email safety:** links in emails always use the canonical `SITE_URL`, never the request `Host`. Header values are CR/LF-stripped and subjects RFC 2047-encoded. Reset links are never logged.
- **Admin:** allow-listed **and** verified email. Subscriber CSV export neutralises spreadsheet formulas.
- **Headers** (`next.config.ts`): HSTS (preload), `X-Frame-Options: SAMEORIGIN`, COOP, `nosniff`, strict referrer policy, Permissions-Policy, and a CSP with `require-trusted-types-for 'script'`, `object-src 'none'`, `base-uri 'self'` and `frame-ancestors 'self'`.
- **Cron:** header-only bearer secret with a length-independent comparison. Query-string secrets are refused because they would end up in logs.

Report vulnerabilities privately to `info@technoenjaz.com` rather than opening a public issue.

## SEO, GEO and structured data

| Concern | Where |
| --- | --- |
| Root metadata, title template, OpenGraph / Twitter defaults, `googleBot` preview directives | `src/seo/metadata.ts` (`buildRootMetadata`, `pageMetadata`) |
| Canonical URL + `hreflang` (`ar`, `en`, `x-default`) on every page | `pageMetadata()` |
| JSON-LD graph: `Organization`/`ProfessionalService`, `WebSite`, `WebPage`, `BreadcrumbList`, `BlogPosting`, `CreativeWork`, `FAQPage`, `ProfilePage` + `Person` | `src/seo/schemas.ts`, rendered by `src/seo/JsonLd.tsx` |
| Team profile titles, descriptions, share images | `src/seo/team.ts` |
| Sitemap with `lastmod` from git history, image and video entries | `src/app/sitemap.ts` |
| Robots rules (private / transactional routes disallowed) | `src/app/robots.ts` |
| RSS feed of articles | `src/app/feed.xml/route.ts` |
| Canonical host redirect | `src/middleware.ts` |

**Generative Engine Optimization (GEO).** Content is published in forms that AI crawlers and answer engines can use directly:

- `/llms.txt` gives a concise index: identity, main sections, team (Arabic and English names), articles, projects, live platforms, videos.
- `/llms-full.txt` is the full knowledge base: team bios and skills in both languages, article summaries with Q&A pairs, project overviews with technologies and PDF report links, video metadata, the FAQ and founder details.
- Per-page Q&A (`src/data/qa/*`) is rendered visibly and emitted as `FAQPage` JSON-LD in both languages. `speakable` selectors cover articles and projects.
- Every page is prerendered HTML that works without JavaScript (covered by `tests/no-js.spec.ts`).

**Conventions when adding pages:**

- Build metadata with `pageMetadata({ title, description, path, image })`. Do not hand-roll `openGraph`: a page-level `openGraph` replaces the root one entirely, losing `og:locale` and `og:site_name`.
- When a page sets `robots`, repeat `GOOGLE_BOT_PREVIEW`, since Next replaces `robots` wholesale.
- Use JPEG or PNG for `og:image`. Facebook, WhatsApp and LinkedIn do not render AVIF.
- Every `<img>` needs a meaningful `alt` (or `alt=""` when decorative) and explicit `width`/`height`.
- New indexable routes must be added to `sitemap.ts`, and private ones to `robots.ts`.

## Content management

| Content | Source of truth |
| --- | --- |
| Articles | `src/content/articles/<slug>.md` (AR) + `src/content/articles-en/<slug>.md` (EN), metadata in `src/data/blogArticlesData.ts` |
| Projects | `src/content/projects/<slug>.md` + `src/content/projects-en/<slug>.md`, metadata in `src/data/projectsData.ts`, PDF in `public/docs/projects/<slug>.pdf` |
| Article / project Q&A | `src/data/qa/articles.ts`, `src/data/qa/projects.ts` |
| Team | `src/data/teamData.js` |
| Videos / reels | `src/data/videosData.ts`, `src/data/projectReelsData.ts` |
| FAQ | `src/data/faqData.ts` |

**Adding a team member:**

1. Add a square photo (≥ 640 px) to `public/images/team/` as `<name>.640.avif` **and** `<name>.jpg`. The JPEG is used for `og:image`, `Person.image` and the image sitemap. Use a new filename when replacing a photo, so caches are busted.
2. Add an entry to `teamMembers` in `src/data/teamData.js`, with both language variants of every field (`name`/`nameEn`, `role`/`roleEn`, `bio`/`bioEn`, `skills`/`skillsEn`, …) and `link: '/team/<id>'`.
3. If the photo is a stand-in, set `photoPending: true`. The visible avatar stays, but it is not published as the person's picture in metadata.
4. The profile page, sitemap entry, About-page directory link, JSON-LD and `llms*.txt` entries are generated automatically.

**Publishing an article or project** announces it to newsletter subscribers about 60–75 minutes after the deploy (grace window + cron interval), unless it is put on hold from the admin page within that window.

## Internationalisation (Arabic / English)

- Arabic is the default (`<html lang="ar" dir="rtl">`). English is a client-side toggle stored in `localStorage` (`techno_lang`). A boot script applies it before first paint, and `lang`/`dir` are updated on `<html>`.
- Both languages share one URL, which is why `hreflang` lists the same URL for `ar`, `en` and `x-default`. Server-rendered HTML is Arabic. English copy is present in data files, JSON-LD (`alternateName`, `alternativeHeadline`, bilingual Q&A) and `llms*.txt`.
- UI strings live in `src/locales/translations.ts`. Content fields use the `xxx` / `xxxEn` convention.

## Quality checks and testing

```bash
npm run typecheck    # tsc --noEmit
npm run lint         # oxlint
npm run build        # must pass before every push
npm run test:e2e     # Playwright: legacy redirects, no-JS rendering, visual baseline
npm run verify       # scripts/verify-site.mjs (set BASE_URL to check a deployed site)
```

Reports from previous audits live in `docs/reports/`.

## Contributing

This is a private, proprietary codebase (see [License](#license)). Contributions are by invitation from the Techno Enjaz team.

1. **Branching:** branch from `main` and keep each change focused. Commit messages use an area prefix: `SEO: …`, `Perf: …`, `Security: …`, `Team: …`, `Newsletter: …`, `UX: …`, `A11y: …`, `DB: …`, `Deps: …`.
2. **Before pushing,** run `typecheck`, `lint` and `build`, and check the affected pages in both languages and both themes (dark and light).
3. **Stage files explicitly** (`git add <paths>`, not `git add -A`), so unrelated work in a shared checkout is not swept into your commit.
4. **Database:** schema changes go in a new numbered, idempotent migration file. Never edit an applied migration, and never delete production rows as part of a code change.
5. **Secrets:** never commit `.env*`, `.dev.vars*` or any key, token or password. Use `wrangler secret put`.
6. **Deployment** is performed by the site owners. Do not deploy from a feature branch or a stale build.
7. **Style:** match the surrounding code. Keep comments short and focused on *why*. Keep Arabic and English copy in sync.

## License

Copyright © 2026 Techno Enjaz (تكنو إنجاز). All rights reserved. See [`LICENSE`](LICENSE). The source code, content, images and brand assets are proprietary and may not be copied, redistributed or reused without written permission.
