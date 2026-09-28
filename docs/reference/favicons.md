# Favicons Audit & Manifest Configuration

Source Directory: `C:\Users\PC\Downloads\favicons`

| File Name | Dimensions | Size (Bytes) | Format |
| :--- | :--- | :--- | :--- |
| `android-chrome-192x192.png` | 192x192 | 21835 | png |
| `android-chrome-512x512.png` | 512x512 | 70520 | png |
| `apple-touch-icon-180x180.png` | 180x180 | 18810 | png |
| `apple-touch-icon.png` | 180x180 | 18810 | png |
| `favicon-16x16.png` | 16x16 | 773 | png |
| `favicon-32x32.png` | 32x32 | 2106 | png |
| `favicon-48x48.png` | 48x48 | 3717 | png |
| `favicon.ico` | 16x16, 32x32, 48x48 (multi) | 33310 | ico |
| `manifest.webmanifest` | N/A | 571 | webmanifest |

## App Router Mappings

- `src/app/favicon.ico` <- `favicon.ico`
- `src/app/icon.png` <- `android-chrome-192x192.png` (192x192)
- `src/app/apple-icon.png` <- `apple-touch-icon-180x180.png` (180x180)
- `public/web-app-manifest-192x192.png` <- `android-chrome-192x192.png`
- `public/web-app-manifest-512x512.png` <- `android-chrome-512x512.png`
- `src/app/manifest.ts` -> Route handler generating `/manifest.webmanifest`
