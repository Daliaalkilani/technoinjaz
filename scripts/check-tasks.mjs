
import puppeteer from 'puppeteer-core';
async function test() {
  const browser = await puppeteer.launch({
    executablePath: '/usr/bin/google-chrome',
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1350, height: 940 });
  const client = await page.target().createCDPSession();
  await client.send('Emulation.setCPUThrottlingRate', { rate: 4 });
  await client.send('Profiler.enable');
  await client.send('Profiler.start');

  await page.evaluateOnNewDocument(() => {
    window.__longTasks = [];
    const obs = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        window.__longTasks.push({
          duration: entry.duration,
          startTime: entry.startTime,
          containerType: entry.attribution?.[0]?.containerType,
          containerSrc: entry.attribution?.[0]?.containerSrc,
          containerName: entry.attribution?.[0]?.containerName,
        });
      }
    });
    obs.observe({ type: 'longtask', buffered: true });
  });

  await page.goto('https://technoenjaz.com/about', { waitUntil: 'domcontentloaded', timeout: 60000 });
  await new Promise(r => setTimeout(r, 10000));

  const longTasks = await page.evaluate(() => window.__longTasks);
  const { profile } = await client.send('Profiler.stop');

  // Node lookup
  const nodeMap = new Map();
  for (const n of profile.nodes) nodeMap.set(n.id, n);

  // Profile timeline: startTime is in profile.startTime (microseconds)
  let curTime = profile.startTime; // in us
  const sampleTimes = []; // { timeUs, fn }
  for (let i = 0; i < profile.samples.length; i++) {
    const id = profile.samples[i];
    const delta = profile.timeDeltas[i];
    curTime += delta;
    const n = nodeMap.get(id);
    const fn = (n?.callFrame?.functionName || '(anon)') + ' @ ' + (n?.callFrame?.url ? n.callFrame.url.split('/').pop() : '') + ':' + n?.callFrame?.columnNumber;
    sampleTimes.push({ timeMs: (curTime - profile.startTime) / 1000, fn });
  }

  console.log('Total Long Tasks:', longTasks.length);
  for (const lt of longTasks) {
    const start = lt.startTime;
    const end = lt.startTime + lt.duration;
    // Find samples in this window
    const inWindow = sampleTimes.filter(s => s.timeMs >= start && s.timeMs <= end);
    const fnCounts = {};
    for (const s of inWindow) fnCounts[s.fn] = (fnCounts[s.fn] || 0) + 1;
    const topFns = Object.entries(fnCounts).sort((a,b)=>b[1]-a[1]).slice(0, 3).map(([f, c]) => f + ' (' + c + ')');
    console.log('LT ' + lt.duration.toFixed(1) + 'ms at ' + start.toFixed(1) + 'ms: ' + topFns.join(', '));
  }

  await browser.close();
}
test().catch(console.error);
