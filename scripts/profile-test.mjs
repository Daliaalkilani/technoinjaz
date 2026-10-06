import puppeteer from 'puppeteer-core';
import fs from 'fs';

async function run() {
  const browser = await puppeteer.launch({
    executablePath: '/usr/bin/google-chrome',
    headless: true,
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
      '--host-rules=MAP technoenjaz.com 127.0.0.1:3456',
      '--ignore-certificate-errors',
    ]
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1350, height: 940 });

  const client = await page.target().createCDPSession();
  await client.send('Emulation.setCPUThrottlingRate', { rate: 4 });
  await client.send('Profiler.enable');
  await client.send('Profiler.start');

  await page.goto('http://technoenjaz.com/about', { waitUntil: 'domcontentloaded', timeout: 60000 });
  await new Promise(r => setTimeout(r, 8000));

  const { profile } = await client.send('Profiler.stop');

  // Aggregate time per function
  const functionTimes = {};
  const { nodes, samples, timeDeltas } = profile;
  const nodeMap = new Map();
  for (const n of nodes) {
    nodeMap.set(n.id, n);
  }

  for (let i = 0; i < samples.length; i++) {
    const nodeId = samples[i];
    const delta = timeDeltas[i]; // in microseconds
    const node = nodeMap.get(nodeId);
    if (!node) continue;
    const key = `${node.callFrame.functionName || '(anonymous)'} @ ${node.callFrame.url}:${node.callFrame.lineNumber}`;
    functionTimes[key] = (functionTimes[key] || 0) + delta;
  }

  const sorted = Object.entries(functionTimes)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 25);

  console.log('Top CPU-consuming functions (in ms):');
  for (const [fn, timeUs] of sorted) {
    console.log(`${(timeUs / 1000).toFixed(1)} ms : ${fn}`);
  }

  await browser.close();
}

run().catch(console.error);
