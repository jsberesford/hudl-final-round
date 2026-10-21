// Browser checks for navigation + transition behaviour.
// Usage: node scripts/check-deck.mjs <baseUrl> <screenshotDir>
import { chromium } from "playwright";
const [base, out] = process.argv.slice(2);
const b = await chromium.launch();
let fails = 0;
const ok = (cond, msg) => { console.log(`${cond ? "PASS" : "FAIL"}  ${msg}`); if (!cond) fails++; };
const page = async (opts = {}) => {
  const ctx = await b.newContext({ viewport: { width: 1440, height: 900 }, ...opts });
  const p = await ctx.newPage();
  p.errs = [];
  p.on("pageerror", (e) => p.errs.push(String(e)));
  p.on("console", (m) => m.type() === "error" && p.errs.push(m.text()));
  return p;
};
const attr = (p, a) => p.$eval(".deck", (el, a) => el.getAttribute(a), a);
const hash = (p) => p.evaluate(() => location.hash);
const wait = (p, ms) => p.waitForTimeout(ms);

// 1. forward step into the turn plays it; capture mid-states
let p = await page();
await p.goto(`${base}/?view=deck#/results-i`); await wait(p, 1800);
await p.keyboard.press("ArrowRight");
ok((await hash(p)) === "#/turn", "→ from scene 7 lands on #/turn");
ok((await attr(p, "data-turn")) === "play", "turn plays on forward step");
for (const ms of [150, 650, 900, 1300]) { await wait(p, ms); await p.screenshot({ path: `${out}/turn-${ms}.png` }); }
await wait(p, 1200);
ok((await attr(p, "data-turn")) === "idle", "turn settles by ~3.4s");
ok((await attr(p, "data-world")) === "festival", "world is festival after turn");

// 2. back restores casino; going forward again does not replay
await p.keyboard.press("ArrowLeft"); await wait(p, 300);
ok((await hash(p)) === "#/results-i" && (await attr(p, "data-world")) === "casino", "← restores casino scene 7");
await wait(p, 1500); await p.keyboard.press("ArrowRight"); await wait(p, 100);
ok((await attr(p, "data-turn")) === "idle", "second pass does not replay the cinematic");
await wait(p, 1700);
ok(!!(await p.$("text=Replay ↺")), "replay button offered on the turn scene");

// 3. browser back/forward
await p.goBack(); await wait(p, 300);
ok((await hash(p)) === "#/results-i", "browser back works");
await p.goForward(); await wait(p, 300);
ok((await hash(p)) === "#/turn", "browser forward works");
ok(p.errs.length === 0, `no console errors (${p.errs.join(" | ")})`);

// 4. skip mid-transition lands on a valid final frame
p = await page();
await p.goto(`${base}/?view=deck#/results-i`); await wait(p, 1800);
await p.keyboard.press("ArrowRight"); await wait(p, 900);
await p.keyboard.press("s"); await wait(p, 700);
ok((await attr(p, "data-turn")) === "idle", "S skips the turn");
await p.screenshot({ path: `${out}/turn-skipped.png` });
const flip = await p.$eval(".tn-flip", (el) => getComputedStyle(el).transform);
ok(flip !== "none", `skipped turn shows the pass (transform ${flip.slice(0, 30)}…)`);

// 5. deep link + refresh straight into the turn
p = await page();
await p.goto(`${base}/?view=deck#/turn`); await wait(p, 200);
ok((await attr(p, "data-turn")) === "idle" && (await attr(p, "data-world")) === "festival", "deep link to #/turn is final state, no cinematic");
await p.reload(); await wait(p, 200);
ok((await hash(p)) === "#/turn", "refresh keeps the scene");

// 6. overview, typing safety, key repeat
await p.keyboard.press("o"); await wait(p, 100);
ok(!!(await p.$(".ov")), "O opens overview");
await p.keyboard.press("Escape"); await wait(p, 100);
ok(!(await p.$(".ov")), "Esc closes overview");
await p.keyboard.press("o"); await p.click(".ov-cols button >> text=Build, borrow, or stitch?"); await wait(p, 300);
ok((await hash(p)) === "#/prioritization" && (await attr(p, "data-world")) === "casino", "overview jump across the boundary restores casino");
await p.evaluate(() => { const i = document.createElement("input"); i.id = "probe"; document.body.append(i); i.focus(); });
await p.keyboard.press("ArrowRight"); await p.keyboard.press(" "); await wait(p, 200);
ok((await hash(p)) === "#/prioritization", "arrow/space ignored while typing in an input");
await p.evaluate(() => document.getElementById("probe").remove());
await wait(p, 1700);
await p.evaluate(() => { for (let k = 0; k < 5; k++) dispatchEvent(new KeyboardEvent("keydown", { key: "ArrowRight", repeat: k > 0 })); });
await wait(p, 200);
ok((await hash(p)) === "#/delivery", "held key (repeat) advances only one scene");
await p.mouse.wheel(0, 3000); await wait(p, 300);
ok((await hash(p)) === "#/delivery", "trackpad/wheel does not navigate");

// 7. reduced motion (OS preference)
p = await page({ reducedMotion: "reduce" });
await p.goto(`${base}/?view=deck#/results-i`); await wait(p, 300);
await p.keyboard.press("ArrowRight"); await wait(p, 100);
ok((await attr(p, "data-turn")) === "idle", "reduced motion: no cinematic");
ok(await p.$eval(".deck", (el) => el.classList.contains("reduced")), "reduced class applied from OS setting");
await wait(p, 400); await p.screenshot({ path: `${out}/turn-reduced.png` });

// 8. viewports
for (const [w, h, id] of [[1366, 768, "research"], [1366, 768, "changes"], [1920, 1080, "outcome"], [1280, 600, "prioritization"]]) {
  p = await page({ viewport: { width: w, height: h } });
  await p.goto(`${base}/?view=deck#/${id}`); await wait(p, 2000);
  await p.screenshot({ path: `${out}/vp-${w}x${h}-${id}.png` });
}

// 9. phone reading view + print PDF
p = await page({ viewport: { width: 390, height: 844 }, isMobile: true });
await p.goto(`${base}/`); await wait(p, 800);
ok((await p.evaluate(() => document.documentElement.dataset.view)) === "read", "phones get the reading view");
const overflow = await p.evaluate(() => document.documentElement.scrollWidth - innerWidth);
ok(overflow <= 1, `no horizontal scroll on phone (overflow ${overflow}px)`);
await p.screenshot({ path: `${out}/phone-top.png` });
await p.evaluate(() => scrollTo(0, document.getElementById("decision")?.offsetTop ?? document.querySelector('[data-layout="decision"]').offsetTop)); await wait(p, 200);
await p.screenshot({ path: `${out}/phone-decision.png` });

p = await page();
await p.goto(`${base}/?view=print`); await wait(p, 1200);
await p.emulateMedia({ media: "print" });
await p.pdf({ path: `${out}/deck.pdf`, width: "1600px", height: "900px", printBackground: true });
const pages = await p.$$eval(".page", (els) => els.length);
ok(pages === 19, `print view renders ${pages} pages (12 scenes + 7 appendix)`);

console.log(fails ? `\n${fails} FAILED` : "\nall checks passed");
await b.close();
process.exit(fails ? 1 : 0);
