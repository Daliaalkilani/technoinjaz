import { test, expect } from '@playwright/test';

const CORE_PATHS = [
  '/',
  '/projects',
  '/projects/virtual-board-hand-tracking',
  '/articles',
  '/articles/digital-twin',
  '/videos',
  '/about',
  '/contact',
  '/faq'
];

test.describe('No-JavaScript Static HTML Rendering', () => {
  test.use({ javaScriptEnabled: false });

  for (const p of CORE_PATHS) {
    test(`renders static content for ${p} without JS`, async ({ page }) => {
      const response = await page.goto(p);
      expect(response?.status()).toBe(200);

      // Verify single H1 exists
      const h1Count = await page.locator('h1').count();
      expect(h1Count).toBe(1);

      // Verify main content is populated
      const mainText = await page.locator('main').textContent();
      expect((mainText || '').length).toBeGreaterThan(100);

      // Verify canonical link
      const canonical = await page.locator('link[rel="canonical"]').getAttribute('href');
      expect(canonical).toContain('https://technoenjaz.com');
    });
  }
});
