import puppeteer from 'puppeteer-core';
import fs from 'fs';
import path from 'path';

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const screenshotsDir = path.resolve('test-screenshots');

if (!fs.existsSync(screenshotsDir)) {
  fs.mkdirSync(screenshotsDir, { recursive: true });
}

async function runTests() {
  console.log('--- STARTING SCROLLEXPAND VERIFICATION ---');
  const browser = await puppeteer.launch({
    executablePath: chromePath,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  // 1. Initial State
  console.log('\n[TEST 1] Loading prototype at initial state (scrollY = 0)...');
  await page.goto('http://localhost:5173/', { waitUntil: 'networkidle0' });
  await page.waitForSelector('.scroll-expand__frame');

  const initialState = await page.evaluate(() => {
    const frame = document.querySelector('.scroll-expand__frame');
    const title = document.querySelector('.scroll-expand__title');
    const hint = document.querySelector('.scroll-expand__hint');
    const overlay = document.querySelector('.scroll-expand__overlay');
    const media = document.querySelector('.scroll-expand__media');

    return {
      clipPath: window.getComputedStyle(frame).clipPath,
      titleOpacity: window.getComputedStyle(title).opacity,
      hintOpacity: window.getComputedStyle(hint).opacity,
      overlayOpacity: window.getComputedStyle(overlay).opacity,
      mediaTransform: window.getComputedStyle(media).transform,
      scrollY: window.scrollY,
    };
  });

  console.log('Initial State Evaluated:', initialState);
  await page.screenshot({ path: path.join(screenshotsDir, '01_initial_desktop.png') });

  // 2. Scroll Down (Partial Expansion)
  console.log('\n[TEST 2] Scrolling down by 450px...');
  await page.evaluate(() => window.scrollTo(0, 450));
  await new Promise((r) => setTimeout(r, 400));

  const expandingState = await page.evaluate(() => {
    const frame = document.querySelector('.scroll-expand__frame');
    const title = document.querySelector('.scroll-expand__title');
    const hint = document.querySelector('.scroll-expand__hint');
    const overlay = document.querySelector('.scroll-expand__overlay');

    return {
      clipPath: window.getComputedStyle(frame).clipPath,
      titleOpacity: window.getComputedStyle(title).opacity,
      hintOpacity: window.getComputedStyle(hint).opacity,
      overlayOpacity: window.getComputedStyle(overlay).opacity,
      scrollY: window.scrollY,
    };
  });
  console.log('Expanding State Evaluated:', expandingState);
  await page.screenshot({ path: path.join(screenshotsDir, '02_expanding_desktop.png') });

  // 3. Full-Bleed State
  console.log('\n[TEST 3] Scrolling to Full-Bleed state (~990px)...');
  await page.evaluate(() => window.scrollTo(0, 990));
  await new Promise((r) => setTimeout(r, 400));

  const fullBleedState = await page.evaluate(() => {
    const frame = document.querySelector('.scroll-expand__frame');
    const overlay = document.querySelector('.scroll-expand__overlay');
    const title = document.querySelector('.scroll-expand__title');
    const media = document.querySelector('.scroll-expand__media');
    const ctas = document.querySelectorAll('.cta-button');

    return {
      clipPath: window.getComputedStyle(frame).clipPath,
      titleOpacity: window.getComputedStyle(title).opacity,
      overlayOpacity: window.getComputedStyle(overlay).opacity,
      mediaTransform: window.getComputedStyle(media).transform,
      ctaCount: ctas.length,
      cta1Text: ctas[0]?.textContent?.trim(),
      cta2Text: ctas[1]?.textContent?.trim(),
      scrollY: window.scrollY,
    };
  });
  console.log('Full-Bleed State Evaluated:', fullBleedState);
  await page.screenshot({ path: path.join(screenshotsDir, '03_fullbleed_desktop.png') });

  // 4. Hold Phase
  console.log('\n[TEST 4] Scrolling into Hold Phase (~1200px)...');
  await page.evaluate(() => window.scrollTo(0, 1200));
  await new Promise((r) => setTimeout(r, 400));

  const holdState = await page.evaluate(() => {
    const frame = document.querySelector('.scroll-expand__frame');
    const stage = document.querySelector('.scroll-expand__stage');
    const stageRect = stage.getBoundingClientRect();

    return {
      clipPath: window.getComputedStyle(frame).clipPath,
      stageTop: stageRect.top,
      stageSticky: window.getComputedStyle(stage).position,
      scrollY: window.scrollY,
    };
  });
  console.log('Hold State Evaluated:', holdState);
  await page.screenshot({ path: path.join(screenshotsDir, '04_hold_phase_desktop.png') });

  // 5. Scroll Past Track (Natural Unpin)
  console.log('\n[TEST 5] Scrolling to Track End / Unpin (~1400px)...');
  await page.evaluate(() => window.scrollTo(0, 1400));
  await new Promise((r) => setTimeout(r, 400));

  const unpinState = await page.evaluate(() => {
    const stage = document.querySelector('.scroll-expand__stage');
    const stageRect = stage.getBoundingClientRect();
    return {
      stageTop: stageRect.top,
      scrollY: window.scrollY,
    };
  });
  console.log('Unpin State Evaluated:', unpinState);
  await page.screenshot({ path: path.join(screenshotsDir, '05_unpin_desktop.png') });

  // 6. Reverse Scroll Up
  console.log('\n[TEST 6] Scrolling UP back to 0 (Testing Reversibility)...');
  await page.evaluate(() => window.scrollTo(0, 0));
  await new Promise((r) => setTimeout(r, 500));

  const reversedState = await page.evaluate(() => {
    const frame = document.querySelector('.scroll-expand__frame');
    const title = document.querySelector('.scroll-expand__title');
    const hint = document.querySelector('.scroll-expand__hint');
    const overlay = document.querySelector('.scroll-expand__overlay');

    return {
      clipPath: window.getComputedStyle(frame).clipPath,
      titleOpacity: window.getComputedStyle(title).opacity,
      hintOpacity: window.getComputedStyle(hint).opacity,
      overlayOpacity: window.getComputedStyle(overlay).opacity,
      scrollY: window.scrollY,
    };
  });
  console.log('Reversed State Evaluated (back at top):', reversedState);
  await page.screenshot({ path: path.join(screenshotsDir, '06_reversed_top_desktop.png') });

  // 7. Mobile Viewport Test (390x844)
  console.log('\n[TEST 7] Testing Mobile Viewport (390x844)...');
  await page.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true });
  await page.goto('http://localhost:5173/', { waitUntil: 'networkidle0' });
  await page.evaluate(() => window.scrollTo(0, 0));
  await new Promise((r) => setTimeout(r, 400));

  const mobileInitial = await page.evaluate(() => {
    const ctaGroup = document.querySelector('.cta-group');
    const frame = document.querySelector('.scroll-expand__frame');
    return {
      clipPath: window.getComputedStyle(frame).clipPath,
      hasHorizontalOverflow: document.documentElement.scrollWidth > window.innerWidth,
      ctaFlexDirection: window.getComputedStyle(ctaGroup).flexDirection,
    };
  });
  console.log('Mobile Initial Evaluated:', mobileInitial);
  await page.screenshot({ path: path.join(screenshotsDir, '07_mobile_initial.png') });

  // Scroll mobile to full bleed (~500px)
  await page.evaluate(() => window.scrollTo(0, 520));
  await new Promise((r) => setTimeout(r, 400));
  await page.screenshot({ path: path.join(screenshotsDir, '08_mobile_fullbleed.png') });

  // 8. Reduced Motion Test
  console.log('\n[TEST 8] Testing prefers-reduced-motion: reduce...');
  await page.emulateMediaFeatures([{ name: 'prefers-reduced-motion', value: 'reduce' }]);
  await page.goto('http://localhost:5173/', { waitUntil: 'networkidle0' });
  await new Promise((r) => setTimeout(r, 400));

  const reducedMotionState = await page.evaluate(() => {
    const stage = document.querySelector('.scroll-expand__stage');
    const frame = document.querySelector('.scroll-expand__frame');
    const hint = document.querySelector('.scroll-expand__hint');
    return {
      stagePosition: window.getComputedStyle(stage).position,
      frameClipPath: window.getComputedStyle(frame).clipPath,
      hintDisplay: window.getComputedStyle(hint).display,
    };
  });
  console.log('Reduced Motion State Evaluated:', reducedMotionState);
  await page.screenshot({ path: path.join(screenshotsDir, '09_reduced_motion.png') });

  await browser.close();
  console.log('\n--- ALL VERIFICATION TESTS COMPLETED SUCCESSFULLY ---');
}

runTests().catch((err) => {
  console.error('Test execution error:', err);
  process.exit(1);
});
