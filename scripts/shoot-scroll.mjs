// node scripts/shoot-scroll.mjs <base> <out>: screenshots down the scroll page
import { chromium } from "playwright";
const [base, out] = process.argv.slice(2);
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
const errs = [];
p.on("pageerror", (e) => errs.push(String(e)));
p.on("console", (m) => m.type() === "error" && errs.push(m.text()));
await p.goto(base); await p.waitForTimeout(1500);
const turnTop = await p.$eval("#s-turn", (el) => el.offsetTop);
const shots = { "a-open": 0, "b-research": 900 * 2, "c-turn-20": turnTop + 0.2 * 1980, "d-turn-40": turnTop + 0.4 * 1980, "e-turn-60": turnTop + 0.6 * 1980, "f-turn-90": turnTop + 0.9 * 1980, "g-changes": turnTop + 2880 };
for (const [n, y] of Object.entries(shots)) {
  await p.mouse.wheel(0, 0); await p.evaluate((y) => scrollTo(0, y), y); await p.waitForTimeout(1300);
  await p.screenshot({ path: `${out}/${n}.png` });
}
console.log(errs.length ? errs.join("\n") : "no errors");
await b.close();
