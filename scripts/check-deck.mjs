// Browser checks for navigation, fit, and reliability.
// Usage: node scripts/check-deck.mjs <baseUrl> <screenshotDir>
import { chromium } from "playwright";
const [base, out] = process.argv.slice(2);
const b = await chromium.launch();
let fails = 0;
const ok = (cond, msg) => { console.log(`${cond ? "PASS" : "FAIL"}  ${msg}`); if (!cond) fails++; };
const page = async (opts = {}) => {
  const ctx = await b.newContext({ viewport: { width: 1600, height: 900 }, ...opts });
  const p = await ctx.newPage();
  p.errs = [];
  p.on("pageerror", (e) => p.errs.push(String(e)));
  p.on("console", (m) => m.type() === "error" && p.errs.push(m.text()));
  return p;
};
const hash = (p) => p.evaluate(() => location.hash);
const wait = (p, ms) => p.waitForTimeout(ms);
const MAIN = ["outcome","problem","goal","hypotheses","prioritization","research","delivery","results-i","stats-i","turn","changes","product","rollout-ii","differently","now","close"];
const APPX = ["a-role","a-research","a-priorities","a-metrics","a-rollout","a-delta","a-next"];

// Every element must sit inside the stage and clear the HUD; no text may be clipped by its box.
const overflow = (p) => p.evaluate(() => {
  const stage = document.querySelector(".stage").getBoundingClientRect();
  const k = stage.width / 1600;
  const bad = [];
  document.querySelectorAll(".scene p, .scene h1, .scene h2, .scene h3, .scene li, .scene span, .scene dd, .scene b").forEach((e) => {
    if (e.closest("[aria-hidden='true']")) return;
    if (!e.matches(".flow-row > span") && e.scrollWidth > e.clientWidth + 2 && getComputedStyle(e).display !== "inline") bad.push("clip:" + e.textContent.slice(0, 30));
    const r = e.getBoundingClientRect();
    if (!r.width) return;
    if (r.bottom > stage.bottom - 42 * k || r.right > stage.right + 1 || r.left < stage.left - 1 || r.top < stage.top - 1) bad.push(e.textContent.slice(0, 40));
  });
  return bad;
});

// 1. fit at each presentation size, all 19 slides
for (const [w, h] of [[1920, 1080], [1600, 900], [1366, 768], [1280, 720], [2560, 1080], [1024, 768], [900, 900]]) {
  const p = await page({ viewport: { width: w, height: h } });
  for (const id of [...MAIN, ...APPX]) {
    await p.goto(`${base}/#/${id}`);
    await p.reload(); await wait(p, 150);
    const bad = await overflow(p);
    if (bad.length) ok(false, `${w}x${h} ${id} overflows: ${bad.slice(0, 3).join(" | ")}`);
    if (w !== 1600) await p.screenshot({ path: `${out}/${w}-${id}.png` });
    const sc = await p.evaluate(() => [document.documentElement.scrollHeight - innerHeight, document.documentElement.scrollWidth - innerWidth, scrollY]);
    if (sc[0] > 0 || sc[1] > 0 || sc[2] !== 0) ok(false, `${w}x${h} ${id} page scrolls ${sc}`);
  }
  ok(p.errs.length === 0, `${w}x${h}: fit pass, no console errors ${p.errs.join(" | ")}`);
}

// 2. keyboard through the whole deck, then back
let p = await page();
await p.goto(`${base}/`); await wait(p, 300);
for (const id of MAIN.slice(1)) {
  await p.keyboard.press("ArrowRight"); await wait(p, 60);
  if (id === "changes") { /* the press after the turn first completed it */ await p.keyboard.press("ArrowRight"); await wait(p, 60); }
  if ((await hash(p)) !== `#/${id}`) ok(false, `→ should land on ${id}, got ${await hash(p)}`);
}
ok((await hash(p)) === "#/close", "→ walks every main slide");
await p.keyboard.press("ArrowRight"); await wait(p, 60);
ok((await hash(p)) === "#/close", "→ stops at the last slide");
for (let k = 0; k < 12; k++) await p.keyboard.press("ArrowLeft");
await wait(p, 100);
ok((await hash(p)) === "#/outcome", "rapid ← returns to the cover");
await p.keyboard.press(" "); await wait(p, 60);
ok((await hash(p)) === "#/problem", "Space advances");
await p.keyboard.press("End"); await wait(p, 60);
ok((await hash(p)) === "#/close", "End goes to final main slide");
await p.keyboard.press("Home"); await wait(p, 60);
ok((await hash(p)) === "#/outcome", "Home goes to the cover");

// 3. rapid navigation never leaves an invisible slide
for (let k = 0; k < 4; k++) await p.keyboard.press("ArrowRight");
await wait(p, 1200);
const vis = await p.$eval(".stage-scene .scene", (el) => getComputedStyle(el).visibility === "visible" && el.getBoundingClientRect().height > 100);
ok(vis && (await hash(p)) === "#/prioritization", "rapid → lands on the right, visible slide");
const hidden = await p.$$eval(".stage-scene .rv", (els) => els.filter((e) => +getComputedStyle(e).opacity < 1).length);
ok(hidden === 0, "all content fully visible after transition");

// 3b. the turn: plays on a forward step, completes by itself, or on a key press, and never blanks
await p.goto(`${base}/#/results-i`); await p.reload(); await wait(p, 300);
await p.keyboard.press("ArrowRight"); await wait(p, 40);
ok((await p.$eval(".deck", (el) => el.dataset.turn)) === "play", "turn plays on a forward step");
for (const ms of [120, 300, 300, 300, 300]) { await wait(p, ms); const n = (globalThis.f = (globalThis.f ?? 0) + 1); await p.screenshot({ path: `${out}/turn-${n}.png` }); }
await wait(p, 900);
ok((await p.$eval(".deck", (el) => el.dataset.turn)) === "idle" && (await p.$eval(".deck", (el) => el.dataset.world)) === "festival", "turn settles in the festival world within 2s");
await p.keyboard.press("ArrowLeft"); await wait(p, 100);
ok((await p.$eval(".deck", (el) => el.dataset.world)) === "casino", "← restores the casino world");
await p.keyboard.press("ArrowRight"); await wait(p, 300);
await p.keyboard.press("ArrowRight"); await wait(p, 80);
ok((await hash(p)) === "#/turn" && (await p.$eval(".deck", (el) => el.dataset.turn)) === "idle", "a key press completes the turn without skipping the slide");
const flip = await p.$eval(".tn-flip", (el) => getComputedStyle(el).transform);
ok(flip !== "none", "completed turn shows the pass");
await p.keyboard.press("ArrowRight"); await wait(p, 100);
ok((await hash(p)) === "#/changes", "next press continues to slide 9");
await p.goto(`${base}/#/turn`); await p.reload(); await wait(p, 200);
ok((await p.$eval(".deck", (el) => el.dataset.turn)) === "idle", "deep link shows the finished turn");
await p.goto(`${base}/#/changes`); await p.reload(); await wait(p, 200);

// 4. held key
await p.evaluate(() => { for (let k = 0; k < 5; k++) dispatchEvent(new KeyboardEvent("keydown", { key: "ArrowRight", repeat: k > 0 })); });
await wait(p, 100);
ok((await hash(p)) === "#/product", "held key advances one slide");

// 5. wheel never navigates or scrolls
await p.mouse.wheel(0, 3000); await wait(p, 200);
ok((await hash(p)) === "#/product" && (await p.evaluate(() => scrollY)) === 0, "wheel does not navigate or scroll");

// 6. back/forward, refresh, deep link
await p.goBack(); await wait(p, 100);
ok((await hash(p)) === "#/changes", "browser Back works");
await p.goForward(); await wait(p, 100);
ok((await hash(p)) === "#/product", "browser Forward works");
await p.reload(); await wait(p, 150);
ok((await hash(p)) === "#/product" && !!(await p.$(".l-product")), "refresh keeps the slide");

// 7. overview and appendix round trip
await p.keyboard.press("o"); await wait(p, 60);
ok(!!(await p.$(".ov")), "O opens overview");
await p.keyboard.press("Escape"); await wait(p, 60);
ok(!(await p.$(".ov")), "Esc closes overview");
await p.keyboard.press("o");
await p.click(".ov-cols button >> text=We chose speed"); await wait(p, 100);
ok((await hash(p)) === "#/prioritization", "overview jump works");
await p.keyboard.press("a"); await wait(p, 100);
ok((await hash(p)) === "#/a-role", "A opens the appendix");
await p.click(".ap-nav a >> text=A4"); await wait(p, 100);
ok((await hash(p)) === "#/a-metrics", "appendix links jump between sections");
await p.keyboard.press("Escape"); await wait(p, 100);
ok((await hash(p)) === "#/prioritization", "Esc returns to where you left the story");

// 8. typing safety and motion
await p.evaluate(() => { const i = document.createElement("input"); i.id = "probe"; document.body.append(i); i.focus(); });
await p.keyboard.press("ArrowRight"); await wait(p, 60);
ok((await hash(p)) === "#/prioritization", "arrows ignored while typing");
await p.evaluate(() => document.getElementById("probe").remove());
await p.keyboard.press("m"); await wait(p, 60);
ok(await p.$eval(".deck", (el) => el.classList.contains("reduced")), "M toggles motion off");
await p.keyboard.press("ArrowRight"); await wait(p, 30);
ok((await p.$eval(".stage-scene", (el) => el.dataset.anim)) === "settled", "no entrance motion when off");
p = await page({ reducedMotion: "reduce" });
await p.goto(`${base}/#/changes`); await wait(p, 100);
ok(await p.$eval(".deck", (el) => el.classList.contains("reduced")), "OS reduced motion respected");
ok(p.errs.length === 0, "no console errors in navigation");

// 8b. fullscreen: every navigation key still works, and Space after the button does not exit
p = await page();
await p.goto(`${base}/#/problem`); await p.reload(); await wait(p, 200);
await p.keyboard.press("f"); await wait(p, 300);
ok(await p.evaluate(() => !!document.fullscreenElement), "F enters fullscreen");
await p.keyboard.press("ArrowRight"); await wait(p, 80);
ok((await hash(p)) === "#/research" && (await p.evaluate(() => !!document.fullscreenElement)), "→ navigates in fullscreen");
await p.keyboard.press("ArrowLeft"); await wait(p, 80);
ok((await hash(p)) === "#/problem", "← navigates in fullscreen");
await p.keyboard.press("f"); await wait(p, 300);
await p.mouse.move(800, 880); await p.click('button[aria-label="Fullscreen"]'); await wait(p, 300);
await p.keyboard.press(" "); await wait(p, 300);
ok((await hash(p)) === "#/research" && (await p.evaluate(() => !!document.fullscreenElement)), "Space after the button advances and stays fullscreen");
await p.goto(`${base}/#/product`); await p.reload(); await wait(p, 1000);
ok(await p.$$eval(".pd-frame img", (els) => els.length === 2 && els.every((e) => e.complete && e.naturalWidth > 0)), "both product screenshots load");

// 9. phone reading view + print
p = await page({ viewport: { width: 390, height: 844 }, isMobile: true });
await p.goto(`${base}/`); await wait(p, 600);
ok((await p.evaluate(() => document.documentElement.dataset.view)) === "read", "phones get the reading view");
const over = await p.evaluate(() => document.documentElement.scrollWidth - innerWidth);
ok(over <= 1, `no horizontal scroll on phone (${over}px)`);
await p.screenshot({ path: `${out}/phone-top.png` });
p = await page();
await p.goto(`${base}/?view=print`); await wait(p, 800);
await p.emulateMedia({ media: "print" });
await p.pdf({ path: `${out}/deck.pdf`, width: "1600px", height: "900px", printBackground: true });
ok((await p.$$eval(".page", (els) => els.length)) === 20, "print view renders 20 pages");
const text = await p.evaluate(() => document.body.innerText);
ok(!text.includes("—"), "no em dashes on any slide");
ok(!/\[(CONFIRM|ADD)|Pending/.test(text), "no placeholders on any slide");

console.log(fails ? `\n${fails} FAILED` : "\nall checks passed");
await b.close();
process.exit(fails ? 1 : 0);
