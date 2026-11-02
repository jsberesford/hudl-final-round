import { describe, expect, it } from "vitest";
import { appendixSlides, idFromHash, mainSlides, shouldPlayTurn, step, TURN_ID } from "../model";
import { appendix, applicationsByDay, scenes } from "../../content/story";

const before = mainSlides[mainSlides.findIndex((s) => s.id === TURN_ID) - 1].id;
const after = mainSlides[mainSlides.findIndex((s) => s.id === TURN_ID) + 1].id;

describe("turn playback", () => {
  it("plays only on a single forward step into the turn", () => {
    expect(shouldPlayTurn(before, TURN_ID, false)).toBe(true);
    expect(shouldPlayTurn(after, TURN_ID, false)).toBe(false);
    expect(shouldPlayTurn(mainSlides[0].id, TURN_ID, false)).toBe(false);
    expect(shouldPlayTurn(null, TURN_ID, false)).toBe(false);
  });
  it("never plays with reduced motion", () => {
    expect(shouldPlayTurn(before, TURN_ID, true)).toBe(false);
  });
});

describe("navigation", () => {
  it("clamps at both ends and keeps appendix separate", () => {
    expect(step(mainSlides[0].id, -1)).toBe(mainSlides[0].id);
    expect(step(mainSlides[mainSlides.length - 1].id, 1)).toBe(mainSlides[mainSlides.length - 1].id);
    expect(step(appendixSlides[0].id, 1)).toBe(appendixSlides[1].id);
    expect(step(appendixSlides[0].id, -1)).toBe(appendixSlides[0].id);
  });
  it("resolves hashes and falls back to the opening", () => {
    expect(idFromHash("#/turn")).toBe("turn");
    expect(idFromHash("#/nope")).toBe(mainSlides[0].id);
    expect(idFromHash("")).toBe(mainSlides[0].id);
  });
});

describe("content model", () => {
  it("has unique ids and the turn scene in the story", () => {
    const ids = scenes.map((s) => s.id);
    expect(new Set(ids).size).toBe(ids.length);
    expect(ids).toContain(TURN_ID);
  });
  it("plans about 14 minutes", () => {
    const total = scenes.reduce((t, s) => t + s.seconds, 0);
    expect(total).toBeGreaterThanOrEqual(13 * 60);
    expect(total).toBeLessThanOrEqual(14.5 * 60);
  });
  it("contains no em dashes and no draft values", () => {
    const text = JSON.stringify({ scenes, appendix });
    expect(text).not.toContain("—");
    expect(text).not.toMatch(/e\.g\. '/);
  });
  it("shows no placeholders on slides or in the appendix", () => {
    const onSlide = scenes.map((s) => ({ ...s, notes: null }));
    expect(JSON.stringify({ onSlide, appendix })).not.toMatch(/\[(CONFIRM|ADD)\b/);
  });
  it("keeps the daily chart consistent with the export", () => {
    const sum = (a: number, b: number) => applicationsByDay.slice(a, b).reduce((t, d) => t + d.count, 0);
    expect(sum(0, 14)).toBe(94);
    expect(sum(19, 33)).toBe(244);
    expect(sum(0, 33)).toBe(390); // plus 1 on Sep 7, a partial day left off the chart
  });
  it("shows a metric value only when it is verified", () => {
    const walk = (x: unknown): void => {
      if (Array.isArray(x)) return x.forEach(walk);
      if (x && typeof x === "object") {
        const o = x as Record<string, unknown>;
        if ("definition" in o && o.value != null) expect(o.status === "actual" || o.status === "target").toBe(true);
        Object.values(o).forEach(walk);
      }
    };
    walk(scenes);
  });
});
