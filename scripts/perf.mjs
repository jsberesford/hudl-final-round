// node scripts/perf.mjs <url> — frame-time stats while gliding through every scene
import { chromium } from "playwright";
const [url] = process.argv.slice(2);
const b = await chromium.launch({ args: ["--enable-gpu-rasterization", "--ignore-gpu-blocklist"] });
const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
const errs = []; p.on("pageerror", (e) => errs.push(String(e)));
await p.goto(url); await p.waitForTimeout(1200);
await p.evaluate(() => { window.__f = []; let t0 = performance.now(); const tick = (t) => { window.__f.push(t - t0); t0 = t; requestAnimationFrame(tick); }; requestAnimationFrame(tick); });
for (let k = 0; k < 13; k++) { await p.keyboard.press("ArrowRight"); await p.waitForTimeout(1000); }
const f = await p.evaluate(() => window.__f.slice(2));
f.sort((a, z) => a - z);
const pct = (q) => f[Math.floor(f.length * q)].toFixed(1);
console.log(`frames ${f.length}  median ${pct(0.5)}ms  p95 ${pct(0.95)}ms  p99 ${pct(0.99)}ms  max ${f[f.length - 1].toFixed(1)}ms  >33ms: ${f.filter((x) => x > 33).length}`);
console.log("ended at", await p.evaluate(() => location.hash), errs.length ? errs : "no errors");
await b.close();
