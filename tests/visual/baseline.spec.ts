import { test } from '@playwright/test';
import path from 'node:path';

const URLS = [
  { name: 'home', hash: '#top', fullPage: false },
  { name: 'projects', hash: '#projects', fullPage: false },
  { name: 'project-detail', hash: '#project/virtual-board-hand-tracking', fullPage: true },
  { name: 'articles', hash: '#articles', fullPage: false },
  { name: 'article-detail', hash: '#article/digital-twin', fullPage: true },
  { name: 'videos', hash: '#videos', fullPage: false },
  { name: 'faq', hash: '#faq', fullPage: true },
  { name: 'about', hash: '#about', fullPage: false },
  { name: 'contact', hash: '#contact', fullPage: false },
  { name: 'profile-abdulghani', hash: '#profile-abdulghani', fullPage: false },
  { name: 'login', hash: '#login', fullPage: false },
];

const VIEWPORTS = [
  { name: 'mobile', width: 390, height: 844 },
  { name: 'tablet', width: 768, height: 1024 },
  { name: 'desktop', width: 1440, height: 900 },
];

const COMBINATIONS = [
  { theme: 'dark', lang: 'ar' },
  { theme: 'light', lang: 'ar' },
  { theme: 'dark', lang: 'en' },
  { theme: 'light', lang: 'en' },
];

test.describe('Baseline Visual Regression Capture', () => {
  for (const vp of VIEWPORTS) {
    for (const combo of COMBINATIONS) {
      for (const item of URLS) {
        test(`${item.name} - ${vp.name} - ${combo.theme} - ${combo.lang}`, async ({ page }) => {
          await page.setViewportSize({ width: vp.width, height: vp.height });
          await page.emulateMedia({ reducedMotion: 'reduce' });

          await page.addInitScript(({ theme, lang }) => {
            localStorage.setItem('techno_theme_manual', 'true');
            localStorage.setItem('theme', theme);
            localStorage.setItem('techno_theme', theme);
            localStorage.setItem('techno_lang', lang);
          }, combo);

          await page.goto('/' + item.hash);

          await page.addStyleTag({
            content: `
              #te-loader { display: none !important; }
              canvas { visibility: hidden !important; }
            `
          });

          await page.waitForFunction(() => document.fonts.ready);
          await page.waitForTimeout(1500);

          const fileName = `${item.name}__${vp.name}__${combo.theme}__${combo.lang}.png`;
          const filePath = path.join(process.cwd(), 'tests/visual/__baseline__', fileName);

          await page.screenshot({
            path: filePath,
            fullPage: item.fullPage,
          });
        });
      }
    }
  }
});
