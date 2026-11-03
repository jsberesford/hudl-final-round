// Screenshot every scene: node scripts/shoot-all.mjs <baseUrl> <outDir> [w] [h]
import { chromium } from "playwright";
const [base, out, w = "1440", h = "900"] = process.argv.slice(2);
const ids = ["outcome","problem","goal","hypotheses","prioritization","research","delivery","results-i","stats-i","turn","changes","product","rollout-ii","differently","now","close","a-role","a-metrics"];
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: +w, height: +h } });
const errs = [];
p.on("console", (m) => m.type() === "error" && errs.push(m.text()));
p.on("pageerror", (e) => errs.push(String(e)));
p.on("requestfailed", (r) => errs.push("FAILED " + r.url()));
p.on("request", (r) => { if (!r.url().startsWith(base)) errs.push("EXTERNAL " + r.url()); });
await p.goto(`${base}/#/outcome`);
for (const [k, id] of ids.entries()) {
  await p.evaluate((id) => (location.hash = "/" + id), id);
  await p.waitForTimeout(id === "turn" ? 3800 : 2000);
  await p.screenshot({ path: `${out}/${String(k + 1).padStart(2, "0")}-${id}.png` });
}
console.log(errs.length ? errs.join("\n") : "no console errors / external requests");
await b.close();
