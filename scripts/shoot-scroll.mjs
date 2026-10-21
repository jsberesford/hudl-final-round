// node scripts/shoot-scroll.mjs <base> <out>: screenshots at scene positions (s units)
import { chromium } from "playwright";
const [base, out] = process.argv.slice(2);
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
const errs = [];
p.on("pageerror", (e) => errs.push(String(e)));
p.on("console", (m) => m.type() === "error" && errs.push(m.text()));
await p.goto(base); await p.waitForTimeout(1200);
const unit = 900 * 1.15;
for (const s of [0, 0.75, 1.0, 4.8, 6.0, 7.3, 8.0, 8.6, 9.6, 10.0, 13.0]) {
  await p.evaluate((y) => window.scrollTo(0, y), s * unit);
  await p.waitForTimeout(1800);
  await p.screenshot({ path: `${out}/s-${String(s).padStart(4, "0")}.png` });
}
console.log(errs.length ? errs.join("\n") : "no errors");
await b.close();
