import { test, expect } from '@playwright/test';

const REDIRECT_CASES = [
  { from: '/#projects', to: '/projects' },
  { from: '/#articles', to: '/articles' },
  { from: '/#videos', to: '/videos' },
  { from: '/#about', to: '/about' },
  { from: '/#contact', to: '/contact' },
  { from: '/#faq', to: '/faq' },
  { from: '/#login', to: '/login' },
  { from: '/#register', to: '/register' },
  { from: '/#profile-abdulghani', to: '/team/abdulghani' },
  { from: '/#article/digital-twin', to: '/articles/digital-twin' },
  { from: '/#project/virtual-board-hand-tracking', to: '/projects/virtual-board-hand-tracking' }
];

test.describe('Legacy Hash Redirects', () => {
  for (const { from, to } of REDIRECT_CASES) {
    test(`redirects ${from} -> ${to}`, async ({ page }) => {
      await page.goto(from);
      await page.waitForURL((url) => url.pathname === to, { timeout: 10000 });
      expect(page.url()).toContain(to);
    });
  }
});
