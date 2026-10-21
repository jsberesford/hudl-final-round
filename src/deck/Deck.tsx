import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { appendix, scenes } from "../content/story";
import { SceneView } from "../scenes/SceneView";
import { AppendixView } from "../scenes/AppendixView";
import { CasinoBackdrop } from "../components/casino";
import { FestivalBackdrop } from "../components/festival";
import { allSlides, appendixSlides, idFromHash, mainSlides, shouldPlayTurn, slideIndex, step, TURN_ID } from "./model";
import { channel, type SyncMsg } from "./sync";
import { usePrefs } from "./prefs";

const STAGE_W = 1600;
const STAGE_H = 900;
const TURN_MS = 3400;
const ENTER_MS = 1600;

const FESTIVAL_PRELOAD = ["hacklanta2_logo_white", "speakers", "sparkle-yellow", "note-orange", "sparkle-blue", "dj-set", "yellow-flower", "green-shrub", "saturn", "sparkle-white", "note-pink"];

function isTyping(t: EventTarget | null) {
  const el = t as HTMLElement | null;
  if (!el) return false;
  return el.isContentEditable || ["INPUT", "TEXTAREA", "SELECT"].includes(el.tagName);
}

export function Deck() {
  const [id, setId] = useState(() => idFromHash(location.hash));
  const prevId = useRef<string | null>(null);
  const turnPlayed = useRef(false);
  const [turn, setTurn] = useState<"idle" | "play">("idle");
  const [animating, setAnimating] = useState(true);
  const [overview, setOverview] = useState(false);
  const [scale, setScale] = useState(1);
  const { reduced, setReduced } = usePrefs();
  const [fsOk] = useState(() => !!document.documentElement.requestFullscreen);
  const [hudNote, setHudNote] = useState<string | null>(null);

  const slide = allSlides[slideIndex(id)];
  const world = slide.world;

  // URL is the source of truth: hash changes (back/forward, overview links) drive state.
  useEffect(() => {
    const onHash = () => setId(idFromHash(location.hash));
    addEventListener("hashchange", onHash);
    if (location.hash !== `#/${id}`) history.replaceState(null, "", `#/${id}`);
    return () => removeEventListener("hashchange", onHash);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const go = useCallback((next: string) => {
    if (`#/${next}` !== location.hash) location.hash = `/${next}`;
  }, []);

  // On every slide change decide whether to play the turn and restart entrance motion.
  useLayoutEffect(() => {
    const from = prevId.current;
    prevId.current = id;
    const play = !turnPlayed.current && shouldPlayTurn(from, id, reduced);
    if (play) turnPlayed.current = true;
    setTurn(play ? "play" : "idle");
    setAnimating(!reduced);
    const t = setTimeout(() => {
      setTurn("idle");
      setAnimating(false);
    }, play ? TURN_MS : ENTER_MS);
    channel?.postMessage({ type: "at", id } satisfies SyncMsg);
    document.title = `${slide.n}. ${slide.title} · Hacklanta I → II`;
    return () => clearTimeout(t);
  }, [id, reduced, slide.n, slide.title]);

  const skip = useCallback(() => {
    setTurn("idle");
    setAnimating(false);
  }, []);

  const replay = useCallback(() => {
    if (reduced) return;
    setAnimating(true);
    setTurn("idle");
    requestAnimationFrame(() => {
      setTurn("play");
      setTimeout(() => {
        setTurn("idle");
        setAnimating(false);
      }, TURN_MS);
    });
  }, [reduced]);

  const fullscreen = useCallback(() => {
    if (!document.documentElement.requestFullscreen) {
      setHudNote("Fullscreen unavailable — use the browser's View → Enter Full Screen");
      setTimeout(() => setHudNote(null), 3000);
      return;
    }
    if (document.fullscreenElement) document.exitFullscreen();
    else document.documentElement.requestFullscreen().catch(() => setHudNote("Fullscreen was blocked by the browser"));
  }, []);

  // Keyboard. Ignore repeats (held keys) and typing contexts; leave Tab alone.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey || isTyping(e.target)) return;
      if (e.repeat) return e.preventDefault();
      const k = e.key;
      if (overview) {
        if (k === "Escape" || k === "o") setOverview(false);
        return;
      }
      if ((k === " " || k === "Enter") && (e.target as HTMLElement)?.closest?.("button, a")) return;
      if (k === "ArrowRight" || k === "PageDown" || k === " ") {
        e.preventDefault();
        if (animating) return skip(); // first press finishes motion, second advances
        go(step(id, 1));
      } else if (k === "ArrowLeft" || k === "PageUp") {
        e.preventDefault();
        go(step(id, -1));
      } else if (k === "Home") go(mainSlides[0].id);
      else if (k === "End") go(mainSlides[mainSlides.length - 1].id);
      else if (k === "o" || k === "g") setOverview(true);
      else if (k === "f") fullscreen();
      else if (k === "s" || k === "Escape") skip();
      else if (k === "m") setReduced(!reduced);
      else if (k === "a") go(appendixSlides[0].id);
    };
    addEventListener("keydown", onKey);
    return () => removeEventListener("keydown", onKey);
  }, [id, animating, overview, go, skip, fullscreen, reduced, setReduced]);

  // Presenter window remote control.
  useEffect(() => {
    if (!channel) return;
    const onMsg = (e: MessageEvent<SyncMsg>) => {
      const msg = e.data;
      if (msg.type === "go") go(msg.id);
      if (msg.type === "hello") channel!.postMessage({ type: "at", id: prevId.current ?? id } satisfies SyncMsg);
    };
    channel.addEventListener("message", onMsg);
    return () => channel!.removeEventListener("message", onMsg);
  }, [go, id]);

  // Fit the 1600×900 stage into the viewport.
  useLayoutEffect(() => {
    const fit = () => setScale(Math.min(innerWidth / STAGE_W, innerHeight / STAGE_H));
    fit();
    addEventListener("resize", fit);
    return () => removeEventListener("resize", fit);
  }, []);

  // Warm the festival world so the turn never waits on the network.
  useEffect(() => {
    FESTIVAL_PRELOAD.forEach((n) => {
      const img = new Image();
      img.src = `/assets/festival/${n}.png`;
      img.decode?.().catch(() => {});
    });
  }, []);

  const scene = scenes.find((s) => s.id === id);
  const appx = appendix.find((a) => a.id === id);
  const inAppendix = !!appx;
  const list = inAppendix ? appendixSlides : mainSlides;
  const pos = list.findIndex((s) => s.id === id);

  return (
    <div className={`deck ${reduced ? "reduced" : ""}`} data-world={world} data-turn={turn} data-layout={scene?.layout ?? "appendix"}>
      <CasinoBackdrop />
      <FestivalBackdrop />

      <main className="stage-outer" aria-live="polite">
        <div className="stage" style={{ width: STAGE_W, height: STAGE_H, transform: `translate(-50%, -50%) scale(${scale})` }}>
          <div key={id} className="stage-scene" data-anim={animating ? "play" : "settled"}>
            {scene && <SceneView scene={scene} n={slide.n} />}
            {appx && <AppendixView item={appx} />}
          </div>
        </div>
      </main>

      <div className="tag-hudl">Prepared for Hudl · PM Intern Interview</div>

      <nav className="hud" aria-label="Presentation controls">
        <span className="hud-chapter">
          {inAppendix ? `Appendix A${pos + 1}` : `${slide.n} / ${mainSlides.length}`} · {slide.chapter}
        </span>
        <span className="hud-progress" aria-hidden="true">
          {list.map((s, k) => (
            <i key={s.id} className={k <= pos ? "on" : ""} data-world={s.world} />
          ))}
        </span>
        <span className="hud-btns">
          {animating && (
            <button onClick={skip} title="Finish animation (S)">
              Skip ▸▸
            </button>
          )}
          {id === TURN_ID && !reduced && !animating && (
            <button onClick={replay} title="Replay the transformation">
              Replay ↺
            </button>
          )}
          <button onClick={() => go(step(id, -1))} aria-label="Previous (←)" disabled={pos === 0}>
            ←
          </button>
          <button onClick={() => go(step(id, 1))} aria-label="Next (→)" disabled={pos === list.length - 1}>
            →
          </button>
          <button onClick={() => setOverview(true)} title="Overview (O)">
            Overview
          </button>
          {inAppendix ? (
            <button onClick={() => go(mainSlides[mainSlides.length - 1].id)}>Back to story</button>
          ) : (
            <button onClick={() => go(appendixSlides[0].id)} title="Appendix (A)">
              Appendix
            </button>
          )}
          <button onClick={() => setReduced(!reduced)} aria-pressed={reduced} title="Reduce motion (M)">
            {reduced ? "Motion: off" : "Motion: on"}
          </button>
          <button onClick={fullscreen} title={fsOk ? "Fullscreen (F)" : "Fullscreen unavailable"}>
            ⛶
          </button>
        </span>
        {hudNote && <span className="hud-note">{hudNote}</span>}
      </nav>

      {overview && <Overview current={id} onPick={(s) => (go(s), setOverview(false))} onClose={() => setOverview(false)} />}
    </div>
  );
}

function Overview({ current, onPick, onClose }: { current: string; onPick: (id: string) => void; onClose: () => void }) {
  const first = useRef<HTMLButtonElement>(null);
  useEffect(() => first.current?.focus(), []);
  return (
    <div className="ov" role="dialog" aria-modal="true" aria-label="Jump to scene" onClick={onClose}>
      <div className="ov-panel" onClick={(e) => e.stopPropagation()}>
        <div className="ov-head">
          <h2>Jump to</h2>
          <button onClick={onClose}>Close (Esc)</button>
        </div>
        <div className="ov-cols">
          <ol>
            {mainSlides.map((s, k) => (
              <li key={s.id}>
                <button ref={k === 0 ? first : undefined} onClick={() => onPick(s.id)} aria-current={s.id === current} data-world={s.world}>
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
            {appendixSlides.map((s) => (
              <li key={s.id}>
                <button onClick={() => onPick(s.id)} aria-current={s.id === current} data-world="festival">
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
        <p className="ov-keys">← → / Space navigate · S skip motion · O overview · A appendix · M motion · F fullscreen</p>
      </div>
    </div>
  );
}
