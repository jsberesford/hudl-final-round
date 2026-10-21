import { describe, expect, it } from "vitest";
import { appendixSlides, idFromHash, mainSlides, shouldPlayTurn, step, TURN_ID } from "../model";
import { scenes } from "../../content/story";

const before = mainSlides[mainSlides.findIndex((s) => s.id === TURN_ID) - 1].id;
const after = mainSlides[mainSlides.findIndex((s) => s.id === TURN_ID) + 1].id;

describe("turn playback", () => {
  it("plays only on a single forward step into the turn", () => {
    expect(shouldPlayTurn(before, TURN_ID, false)).toBe(true);
    expect(shouldPlayTurn(after, TURN_ID, false)).toBe(false); // backward
    expect(shouldPlayTurn(mainSlides[0].id, TURN_ID, false)).toBe(false); // overview jump
    expect(shouldPlayTurn(null, TURN_ID, false)).toBe(false); // refresh / deep link
    expect(shouldPlayTurn(appendixSlides[0].id, TURN_ID, false)).toBe(false);
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
  it("has unique ids and casino scenes precede festival scenes", () => {
    const ids = scenes.map((s) => s.id);
    expect(new Set(ids).size).toBe(ids.length);
    const firstFestival = scenes.findIndex((s) => s.world === "festival");
    expect(scenes.slice(firstFestival).every((s) => s.world === "festival")).toBe(true);
    expect(scenes[firstFestival].id).toBe(TURN_ID);
  });
  it("plans about 14 minutes", () => {
    const total = scenes.reduce((t, s) => t + s.seconds, 0);
    expect(total).toBeGreaterThanOrEqual(13 * 60);
    expect(total).toBeLessThanOrEqual(14.5 * 60);
  });
  it("never renders a metric bar without a value", () => {
    for (const s of scenes) if ("metrics" in s) for (const m of s.metrics) if (m.status === "actual") expect(m.value).toBeTypeOf("number");
  });
});
