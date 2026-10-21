/**
 * Scrolling version: every scene is a full-viewport section; the I → II turn is
 * a tall pinned section whose scroll progress drives the card flip, the
 * lighting change, and the ribbon draw-in. Native scrolling — no hijacking.
 */
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { appendix, scenes } from "../content/story";
import { SceneView } from "../scenes/SceneView";
import { AppendixView } from "../scenes/AppendixView";
import { CasinoBackdrop } from "../components/casino";
import { FestivalBackdrop } from "../components/festival";
import { allSlides, TURN_ID } from "./model";
import { usePrefs } from "./prefs";

const STAGE_W = 1600;
const STAGE_H = 900;
const clamp = (x: number) => Math.min(1, Math.max(0, x));

export function ScrollDeck() {
  const root = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const [current, setCurrent] = useState(() => location.hash.replace(/^#\/?/, "") || scenes[0].id);
  const [seen, setSeen] = useState<Set<string>>(() => new Set());
  const [overview, setOverview] = useState(false);
  const { reduced, setReduced } = usePrefs();

  useLayoutEffect(() => {
    const fit = () => setScale(Math.min(innerWidth / STAGE_W, innerHeight / STAGE_H));
    fit();
    addEventListener("resize", fit);
    return () => removeEventListener("resize", fit);
  }, []);

  // Deep link on load.
  useEffect(() => {
    const id = location.hash.replace(/^#\/?/, "");
    if (id) document.getElementById(`s-${id}`)?.scrollIntoView();
  }, []);

  // Reveal each section the first time it enters, and track the current one.
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          const id = (e.target as HTMLElement).dataset.id!;
          if (e.isIntersecting) setSeen((s) => (s.has(id) ? s : new Set(s).add(id)));
        }
      },
      { threshold: 0.25 },
    );
    root.current?.querySelectorAll<HTMLElement>("[data-id]").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  // Scrub the turn from scroll position.
  useEffect(() => {
    const turn = document.getElementById(`s-${TURN_ID}`);
    let raf = 0;
    const update = () => {
      raf = 0;
      if (!turn || !root.current) return;
      const r = turn.getBoundingClientRect();
      const p = clamp(-r.top / (r.height - innerHeight));
      const set = (k: string, v: number) => root.current!.style.setProperty(k, (reduced ? Math.round(v) : v).toFixed(3));
      set("--mix", clamp((p - 0.08) / 0.35));
      set("--flip", clamp((p - 0.15) / 0.4));
      set("--strap", clamp((p - 0.5) / 0.15));
      set("--draw", clamp((p - 0.2) / 0.45));
      set("--copy", clamp((p - 0.6) / 0.2));
      // Current section = the one crossing the middle of the viewport.
      const mid = innerHeight / 2;
      const hit = [...root.current.querySelectorAll<HTMLElement>("[data-id]")].find((el) => {
        const b = el.getBoundingClientRect();
        return b.top <= mid && b.bottom > mid;
      });
      if (hit && `#/${hit.dataset.id}` !== location.hash) {
        setCurrent(hit.dataset.id!);
        history.replaceState(null, "", `#/${hit.dataset.id}`);
      }
      set("--progress", clamp(scrollY / (document.documentElement.scrollHeight - innerHeight)));
    };
    const onScroll = () => (raf ||= requestAnimationFrame(update));
    update();
    addEventListener("scroll", onScroll, { passive: true });
    addEventListener("resize", onScroll);
    return () => {
      removeEventListener("scroll", onScroll);
      removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [reduced]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "o" && !e.metaKey && !e.ctrlKey) setOverview((v) => !v);
      if (e.key === "Escape") setOverview(false);
      if (e.key === "m") setReduced(!reduced);
    };
    addEventListener("keydown", onKey);
    return () => removeEventListener("keydown", onKey);
  }, [reduced, setReduced]);

  const jump = (id: string) => {
    setOverview(false);
    document.getElementById(`s-${id}`)?.scrollIntoView({ behavior: reduced ? "auto" : "smooth" });
  };

  const slide = allSlides.find((s) => s.id === current) ?? allSlides[0];
  const stage = (id: string, children: React.ReactNode) => (
    <div className="stage" style={{ width: STAGE_W, height: STAGE_H, transform: `translate(-50%, -50%) scale(${scale})` }}>
      <div className="stage-scene" data-anim={seen.has(id) && !reduced ? "play" : seen.has(id) ? "settled" : "pending"}>
        {children}
      </div>
    </div>
  );

  return (
    <div ref={root} className={`scrolly ${reduced ? "reduced" : ""}`}>
      <div className="sx-bd">
        <CasinoBackdrop />
        <FestivalBackdrop />
      </div>

      {scenes.map((s, k) =>
        s.id === TURN_ID ? (
          <section key={s.id} id={`s-${s.id}`} data-id={s.id} className="sx sx-turn">
            <div className="sx-pin">{stage(s.id, <SceneView scene={s} n={k + 1} />)}</div>
          </section>
        ) : (
          <section key={s.id} id={`s-${s.id}`} data-id={s.id} className={`sx sx-${s.world}`} data-layout={s.layout}>
            {stage(s.id, <SceneView scene={s} n={k + 1} />)}
          </section>
        ),
      )}
      {appendix.map((a) => (
        <section key={a.id} id={`s-${a.id}`} data-id={a.id} className="sx sx-festival">
          {stage(a.id, <AppendixView item={a} />)}
        </section>
      ))}

      <div className="tag-hudl">Prepared for Hudl · PM Intern Interview</div>
      <div className="sx-progress" aria-hidden="true" />
      <nav className="hud sx-hud" aria-label="Presentation controls">
        <span className="hud-chapter">
          {slide.kind === "appendix" ? `Appendix A${slide.n}` : `${slide.n} / ${scenes.length}`} · {slide.chapter}
        </span>
        <span style={{ flex: 1 }} />
        <span className="hud-btns">
          <button onClick={() => setOverview(true)}>Overview</button>
          <button onClick={() => jump(appendix[0].id)}>Appendix</button>
          <button onClick={() => setReduced(!reduced)} aria-pressed={reduced}>
            {reduced ? "Motion: off" : "Motion: on"}
          </button>
        </span>
      </nav>

      {overview && (
        <div className="ov" role="dialog" aria-modal="true" onClick={() => setOverview(false)}>
          <div className="ov-panel" onClick={(e) => e.stopPropagation()}>
            <div className="ov-head">
              <h2>Jump to</h2>
              <button onClick={() => setOverview(false)}>Close (Esc)</button>
            </div>
            <div className="ov-cols">
              <ol>
                {allSlides
                  .filter((s) => s.kind === "scene")
                  .map((s) => (
                    <li key={s.id}>
                      <button onClick={() => jump(s.id)} aria-current={s.id === current} data-world={s.world}>
                        <span className="ov-n">{s.n}</span>
                        <span>
                          <small>{s.chapter}</small>
                          {s.title}
                        </span>
                      </button>
                    </li>
                  ))}
              </ol>
              <ol>
                {allSlides
                  .filter((s) => s.kind === "appendix")
                  .map((s) => (
                    <li key={s.id}>
                      <button onClick={() => jump(s.id)} aria-current={s.id === current} data-world="festival">
                        <span className="ov-n">A{s.n}</span>
                        <span>
                          <small>Appendix</small>
                          {s.title}
                        </span>
                      </button>
                    </li>
                  ))}
              </ol>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
