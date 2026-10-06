
import puppeteer from 'puppeteer-core';
async function test() {
  const browser = await puppeteer.launch({
    executablePath: '/usr/bin/google-chrome',
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--host-rules=MAP technoenjaz.com 127.0.0.1:3456']
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1350, height: 940 });
  const client = await page.target().createCDPSession();
  await client.send('Emulation.setCPUThrottlingRate', { rate: 4 });

  await page.evaluateOnNewDocument(() => {
    let clipCount = 0;
    const origClip = CanvasRenderingContext2D.prototype.clip;
    CanvasRenderingContext2D.prototype.clip = function(...args) {
      clipCount++;
      return origClip.apply(this, args);
    };
    window.__getClipCount = () => clipCount;
  });

  await page.goto('http://technoenjaz.com/about', { waitUntil: 'load', timeout: 30000 });
  await new Promise(r => setTimeout(r, 6000));

  const clipCount = await page.evaluate(() => window.__getClipCount());
  console.log('Total clip() calls in 6s:', clipCount);

  await browser.close();
}
test().catch(console.error);
