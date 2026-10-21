/**
 * Scroll-driven deck. One fixed stage; the page is only a tall spacer that
 * gives the scroll distance. Scroll position `s` (in scene units) decides which
 * scene is on stage: each scene holds still, then crossfades into the next
 * over the last TRANSITION of its segment. The I → II turn gets a longer
 * segment and its transformation is scrubbed by scroll. Lenis supplies the
 * inertia; arrow keys / Space glide to the next scene.
 */
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import Lenis from "lenis";
import { appendix, scenes } from "../content/story";
import { SceneView } from "../scenes/SceneView";
import { AppendixView } from "../scenes/AppendixView";
import { CasinoBackdrop } from "../components/casino";
import { FestivalBackdrop } from "../components/festival";
import { allSlides, TURN_ID } from "./model";
import { usePrefs } from "./prefs";

const STAGE_W = 1600;
const STAGE_H = 900;
/** Viewport heights of scroll per scene unit. */
const UNIT_VH = 1.15;
/** Fraction of each segment spent crossfading into the next scene. */
const TRANSITION = 0.45;
const TURN_LEN = 3;

const clamp = (x: number) => Math.min(1, Math.max(0, x));
const ease = (x: number) => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2);

type Seg = { id: string; start: number; len: number };
const segs: Seg[] = [];
{
  let at = 0;
  for (const s of allSlides) {
    const len = s.id === TURN_ID ? TURN_LEN : 1;
    segs.push({ id: s.id, start: at, len });
    at += len;
  }
}
const TOTAL = segs[segs.length - 1].start + segs[segs.length - 1].len - TRANSITION;
const turnSeg = segs.find((s) => s.id === TURN_ID)!;

export function ScrollDeck() {
  const root = useRef<HTMLDivElement>(null);
  const layers = useRef<Map<string, HTMLDivElement>>(new Map());
  const lenis = useRef<Lenis | null>(null);
  const sRef = useRef(0);
  const [scale, setScale] = useState(1);
  const [current, setCurrent] = useState(segs[0].id);
  const [played, setPlayed] = useState<Set<string>>(() => new Set());
  const [overview, setOverview] = useState(false);
  const { reduced, setReduced } = usePrefs();

  useLayoutEffect(() => {
    const fit = () => setScale(Math.min(innerWidth / STAGE_W, innerHeight / STAGE_H));
    fit();
    addEventListener("resize", fit);
    return () => removeEventListener("resize", fit);
  }, []);

  const unitPx = () => innerHeight * UNIT_VH;
  const yFor = (id: string) => {
    const seg = segs.find((x) => x.id === id) ?? segs[0];
    // land at the start of the hold; for the turn, after the transformation finishes
    return (seg.id === TURN_ID ? seg.start + seg.len - TRANSITION - 0.05 : seg.start) * unitPx();
  };

  const glide = (id: string, immediate = false) => {
    const y = yFor(id);
    if (lenis.current) lenis.current.scrollTo(y, immediate ? { immediate: true, force: true } : { duration: 1.6, easing: ease });
    else scrollTo(0, y);
  };

  // Lenis smooth scrolling + the frame loop that paints scenes from scroll.
  useEffect(() => {
    const l = reduced ? null : new Lenis({ lerp: 0.075, wheelMultiplier: 0.8, smoothWheel: true });
    lenis.current = l;
    let raf = 0;
    let lastCurrent = "";

    const paint = () => {
      const s = (l ? l.animatedScroll : scrollY) / unitPx();
      sRef.current = s;
      let best = segs[0].id;
      let bestOp = -1;
      segs.forEach((seg, k) => {
        const el = layers.current.get(seg.id);
        if (!el) return;
        const prev = segs[k - 1];
        const enter = k === 0 ? 1 : clamp((s - (prev.start + prev.len - TRANSITION)) / TRANSITION);
        const exit = k === segs.length - 1 ? 0 : clamp((s - (seg.start + seg.len - TRANSITION)) / TRANSITION);
        const e = ease(enter);
        const x = ease(exit);
        // sequential, not a double exposure: out first, a beat of backdrop, then in
        const op = clamp(enter * 1.9 - 0.9) * clamp(1 - exit * 1.9);
        if (op <= 0.001) {
          if (el.style.visibility !== "hidden") el.style.visibility = "hidden";
          return;
        }
        el.style.visibility = "visible";
        el.style.opacity = op.toFixed(3);
        const y = (1 - e) * 90 - x * 90;
        const sc = 1 - (1 - e) * 0.04 + x * 0.03;
        el.style.transform = `translate3d(0, ${y.toFixed(1)}px, 0) scale(${sc.toFixed(4)})`;
        el.style.setProperty("--e", ease(clamp(enter * 1.9 - 0.9)).toFixed(3));
        if (op > bestOp) {
          bestOp = op;
          best = seg.id;
        }
      });

      // The turn: world change + card flip, scrubbed.
      const p = clamp((s - turnSeg.start) / (turnSeg.len - TRANSITION - 0.1));
      const r = root.current!;
      const set = (k: string, v: number) => r.style.setProperty(k, v.toFixed(3));
      const before = s < turnSeg.start - TRANSITION;
      set("--mix", before ? 0 : ease(clamp((p - 0.02) / 0.4)));
      set("--flip", ease(clamp((p - 0.12) / 0.42)));
      set("--strap", ease(clamp((p - 0.5) / 0.15)));
      set("--draw", ease(clamp((p - 0.18) / 0.5)));
      set("--copy", ease(clamp((p - 0.62) / 0.22)));
      set("--progress", clamp(s / TOTAL));
      set("--s", s);

      if (best !== lastCurrent) {
        lastCurrent = best;
        setCurrent(best);
        history.replaceState(null, "", `#/${best}`);
      }
    };

    const loop = (t: number) => {
      l?.raf(t);
      paint();
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    // deep link
    const id = location.hash.replace(/^#\/?/, "");
    if (id) requestAnimationFrame(() => glide(id, true));

    return () => {
      cancelAnimationFrame(raf);
      l?.destroy();
      lenis.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduced]);

  // One-shot flourishes (dealt cards, chip drop, bars) fire once per scene.
  useEffect(() => {
    setPlayed((p) => (p.has(current) ? p : new Set(p).add(current)));
  }, [current]);

  // Keys: glide scene to scene like a deck.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement;
      if (e.metaKey || e.ctrlKey || e.altKey || t.isContentEditable || ["INPUT", "TEXTAREA", "SELECT"].includes(t.tagName)) return;
      if (overview) {
        if (e.key === "Escape" || e.key === "o") setOverview(false);
        return;
      }
      const k = segs.findIndex((x) => x.id === current);
      const s = sRef.current;
      if (["ArrowRight", "ArrowDown", "PageDown", " "].includes(e.key)) {
        e.preventDefault();
        if (e.repeat) return;
        // inside the turn, the first press finishes the transformation
        if (current === TURN_ID && s < turnSeg.start + turnSeg.len - TRANSITION - 0.1) glide(TURN_ID);
        else glide(segs[Math.min(segs.length - 1, k + 1)].id);
      } else if (["ArrowLeft", "ArrowUp", "PageUp"].includes(e.key)) {
        e.preventDefault();
        if (e.repeat) return;
        glide(segs[Math.max(0, k - 1)].id);
      } else if (e.key === "Home") glide(segs[0].id);
      else if (e.key === "o") setOverview(true);
      else if (e.key === "m") setReduced(!reduced);
      else if (e.key === "f") {
        if (document.fullscreenElement) document.exitFullscreen();
        else document.documentElement.requestFullscreen?.().catch(() => {});
      }
    };
    addEventListener("keydown", onKey);
    return () => removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [current, overview, reduced, setReduced]);

  const jump = (id: string) => {
    setOverview(false);
    glide(id);
  };

  const slide = allSlides.find((s) => s.id === current) ?? allSlides[0];

  return (
    <div ref={root} className={`scrolly ${reduced ? "reduced" : ""}`}>
      <div className="sx-bd">
        <CasinoBackdrop />
        <FestivalBackdrop />
      </div>

      <div className="sx-viewport">
        {segs.map((seg) => {
          const k = scenes.findIndex((s) => s.id === seg.id);
          const sc = scenes[k];
          const ap = appendix.find((a) => a.id === seg.id);
          return (
            <div
              key={seg.id}
              className="sx-layer"
              data-id={seg.id}
              ref={(el) => {
                if (el) layers.current.set(seg.id, el);
              }}
            >
              <div className="stage" style={{ width: STAGE_W, height: STAGE_H, transform: `translate(-50%, -50%) scale(${scale})` }}>
                <div className="stage-scene" data-anim={played.has(seg.id) && !reduced ? "play" : "settled"}>
                  {sc && <SceneView scene={sc} n={k + 1} />}
                  {ap && <AppendixView item={ap} />}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="sx-spacer" style={{ height: `${(TOTAL * UNIT_VH + 1) * 100}vh` }} aria-hidden="true" />

      <div className="tag-hudl">Prepared for Hudl · PM Intern Interview</div>
      <div className="sx-progress" aria-hidden="true" />
      <nav className="hud sx-hud" aria-label="Presentation controls">
        <span className="hud-chapter">
          {slide.kind === "appendix" ? `Appendix A${slide.n}` : `${slide.n} / ${scenes.length}`} · {slide.chapter}
        </span>
        <span style={{ flex: 1 }} />
        <span className="hud-btns">
          <button onClick={() => jump(segs[Math.max(0, segs.findIndex((x) => x.id === current) - 1)].id)} aria-label="Previous">
            ←
          </button>
          <button onClick={() => jump(segs[Math.min(segs.length - 1, segs.findIndex((x) => x.id === current) + 1)].id)} aria-label="Next">
            →
          </button>
          <button onClick={() => setOverview(true)}>Overview</button>
          <button onClick={() => jump(appendix[0].id)}>Appendix</button>
          <button onClick={() => setReduced(!reduced)} aria-pressed={reduced}>
            {reduced ? "Motion: off" : "Motion: on"}
          </button>
        </span>
      </nav>
      <div className="sx-hint" aria-hidden="true">
        scroll or press →
      </div>

      {overview && (
        <div className="ov" role="dialog" aria-modal="true" onClick={() => setOverview(false)}>
          <div className="ov-panel" onClick={(e) => e.stopPropagation()}>
            <div className="ov-head">
              <h2>Jump to</h2>
              <button onClick={() => setOverview(false)}>Close (Esc)</button>
            </div>
            <div className="ov-cols">
              {(["scene", "appendix"] as const).map((kind) => (
                <ol key={kind}>
                  {allSlides
                    .filter((s) => s.kind === kind)
                    .map((s) => (
                      <li key={s.id}>
                        <button onClick={() => jump(s.id)} aria-current={s.id === current} data-world={s.world}>
                          <span className="ov-n">{kind === "appendix" ? `A${s.n}` : s.n}</span>
                          <span>
                            <small>{s.chapter}</small>
                            {s.title}
                          </span>
                        </button>
                      </li>
                    ))}
                </ol>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
