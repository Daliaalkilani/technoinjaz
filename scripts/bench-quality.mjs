
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
    // Benchmark imageSmoothingQuality impact
    const c = document.createElement('canvas');
    c.width = 512; c.height = 512;
    const x = c.getContext('2d');
    x.fillStyle = 'blue'; x.fillRect(0,0,512,512);

    const target = document.createElement('canvas');
    target.width = 1350; target.height = 846;
    const tx = target.getContext('2d');

    // Test 'high' vs 'low'
    for (const q of ['high', 'medium', 'low']) {
      tx.imageSmoothingQuality = q;
      const t0 = performance.now();
      for (let i = 0; i < 24; i++) {
        tx.setTransform(0.5, 0.1, -0.1, 0.5, 500, 400);
        tx.drawImage(c, -256, -256, 512, 512);
      }
      const dt = performance.now() - t0;
      console.log('24 draws with ' + q + ': ' + dt.toFixed(2) + 'ms');
    }
  });

  page.on('console', msg => console.log('PAGE:', msg.text()));
  await page.goto('http://technoenjaz.com/about', { waitUntil: 'load', timeout: 30000 });
  await browser.close();
}
test().catch(console.error);
