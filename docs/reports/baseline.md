# Baseline Metrics (Pre-Migration)

**Date:** 2026-09-28
**Commit:** `3c92b59` + initial baseline prep
**Stack:** React 19.2.8 + Vite 8.3.0 + TypeScript 6.0.2

## Bundle Sizes (Vite Production Build)

- `dist/index.html`: 10.71 kB (gzip: 3.27 kB)
- `dist/assets/index-C8Lzul0n.js`: 1,250.38 kB (gzip: 401.59 kB)
- `dist/assets/index-CN88vdLu.css`: 117.86 kB (gzip: 20.89 kB)

### Lazy-loaded Chunks
- `ProjectsCatalogSection`: 178.29 kB (gzip: 40.69 kB)
- `ThemeLanguageContext`: 32.07 kB (gzip: 11.19 kB)
- `UserProfilePage`: 21.08 kB (gzip: 6.70 kB)
- `AuthPage`: 19.46 kB (gzip: 6.54 kB)
- `FaqSection`: 17.53 kB (gzip: 6.37 kB)
- `LiveProjectsShowcase`: 15.11 kB (gzip: 4.30 kB)
- `ContactPage`: 13.15 kB (gzip: 3.92 kB)
- `ProfilePage`: 3.95 kB (gzip: 1.48 kB)

## Lint Metrics (oxlint)
- Errors: 0
- Warnings: 62

## URL Inventory
- Articles: 12 (`docs/url-inventory.json`)
- Projects: 14 (`docs/url-inventory.json`)
- Team Members: 7 (`docs/url-inventory.json`)
