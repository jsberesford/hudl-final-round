import { appendix, scenes } from "../content/story";
import type { World } from "../content/types";

export type Slide =
  | { kind: "scene"; id: string; n: number; world: World; title: string; chapter: string }
  | { kind: "appendix"; id: string; n: number; world: World; title: string; chapter: string };

export const mainSlides: Slide[] = scenes.map((s, k) => ({ kind: "scene", id: s.id, n: k + 1, world: s.world, title: s.title, chapter: s.chapter }));
export const appendixSlides: Slide[] = appendix.map((a, k) => ({ kind: "appendix", id: a.id, n: k + 1, world: "festival", title: a.title, chapter: "Appendix" }));
export const allSlides = [...mainSlides, ...appendixSlides];

export const TURN_ID = "turn";

export function slideIndex(id: string | null): number {
  const k = allSlides.findIndex((s) => s.id === id);
  return k < 0 ? 0 : k;
}

/** Next/prev stay within the main story or within the appendix. */
export function step(id: string, dir: 1 | -1): string {
  const list = mainSlides.some((s) => s.id === id) ? mainSlides : appendixSlides;
  const k = list.findIndex((s) => s.id === id);
  return list[Math.max(0, Math.min(list.length - 1, k + dir))].id;
}

export function idFromHash(hash: string): string {
  const id = hash.replace(/^#\/?/, "");
  return allSlides.some((s) => s.id === id) ? id : mainSlides[0].id;
}

/**
 * Whether arriving at `to` from `from` should play the I→II transformation:
 * only a single forward step into the turn scene, with motion allowed.
 */
export function shouldPlayTurn(from: string | null, to: string, reduced: boolean): boolean {
  if (reduced || to !== TURN_ID || from == null) return false;
  const a = mainSlides.findIndex((s) => s.id === from);
  const b = mainSlides.findIndex((s) => s.id === to);
  return a >= 0 && b === a + 1;
}
