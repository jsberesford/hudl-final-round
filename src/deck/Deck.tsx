import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { appendix, scenes } from "../content/story";
import { SceneView } from "../scenes/SceneView";
import { AppendixView } from "../scenes/AppendixView";
import { CasinoBackdrop } from "../components/casino";
import { FestivalBackdrop } from "../components/festival";
import { appendixSlides, allSlides, idFromHash, mainSlides, shouldPlayTurn, slideIndex, step, TURN_ID } from "./model";
import { channel, type SyncMsg } from "./sync";
import { usePrefs } from "./prefs";

const STAGE_W = 1600;
const STAGE_H = 900;
const ENTER_MS = 1000;
const TURN_MS = 2000;

const FESTIVAL_PRELOAD = ["hacklanta2_logo_white", "sparkle-yellow", "note-orange", "sparkle-blue", "saturn", "sparkle-white"];

function isTyping(t: EventTarget | null) {
  const el = t as HTMLElement | null;
  if (!el) return false;
  return el.isContentEditable || ["INPUT", "TEXTAREA", "SELECT"].includes(el.tagName);
}

export function Deck() {
  const [id, setId] = useState(() => idFromHash(location.hash));
  const lastMain = useRef(mainSlides[0].id);
  const prevId = useRef<string | null>(null);
  const [turn, setTurn] = useState<"idle" | "play">("idle");
  const playing = useRef(false);
  const [animating, setAnimating] = useState(false);
  const [overview, setOverview] = useState(false);
  const [scale, setScale] = useState(1);
  const { reduced, setReduced } = usePrefs();
  const [hudNote, setHudNote] = useState<string | null>(null);

  const slide = allSlides[slideIndex(id)];

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

  useLayoutEffect(() => {
    const from = prevId.current;
    prevId.current = id;
    if (slide.kind === "scene") lastMain.current = id;
    channel?.postMessage({ type: "at", id } satisfies SyncMsg);
    document.title = `${slide.n}. ${slide.title} · Hacklanta I to II`;
    // A refresh or deep link shows the finished slide at once.
    if (from == null) return;
    const play = shouldPlayTurn(from, id, reduced);
    playing.current = play;
    setTurn(play ? "play" : "idle");
    setAnimating(!reduced);
    const t = setTimeout(() => {
      playing.current = false;
      setTurn("idle");
      setAnimating(false);
    }, play ? TURN_MS : ENTER_MS);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const skip = useCallback(() => {
    playing.current = false;
    setTurn("idle");
    setAnimating(false);
  }, []);

  const replay = useCallback(() => {
    if (reduced) return;
    setTurn("idle");
    setAnimating(true);
    requestAnimationFrame(() => {
      playing.current = true;
      setTurn("play");
      setTimeout(() => {
        playing.current = false;
        setTurn("idle");
        setAnimating(false);
      }, TURN_MS);
    });
  }, [reduced]);

  // Warm the festival world so the turn never waits on the network.
  useEffect(() => {
    FESTIVAL_PRELOAD.forEach((n) => {
      const img = new Image();
      img.src = `/assets/festival/${n}.png`;
      img.decode?.().catch(() => {});
    });
  }, []);

  const fullscreen = useCallback(() => {
    if (!document.documentElement.requestFullscreen) {
      setHudNote("Fullscreen is unavailable. Use the browser's View menu.");
      setTimeout(() => setHudNote(null), 3000);
      return;
    }
    // A focused button would otherwise catch the next Space and leave fullscreen.
    (document.activeElement as HTMLElement | null)?.blur?.();
    if (document.fullscreenElement) document.exitFullscreen();
    else document.documentElement.requestFullscreen().catch(() => setHudNote("The browser blocked fullscreen."));
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
        if (playing.current) return skip(); // a press during the turn completes it
        go(step(idFromHash(location.hash), 1));
      } else if (k === "ArrowLeft" || k === "PageUp") {
        e.preventDefault();
        go(step(idFromHash(location.hash), -1));
      } else if (k === "Home") go(mainSlides[0].id);
      else if (k === "End") go(mainSlides[mainSlides.length - 1].id);
      else if (k === "o" || k === "g") setOverview(true);
      else if (k === "s") skip();
      else if (k === "f") fullscreen();
      else if (k === "m") setReduced(!reduced);
      else if (k === "a") go(appendixSlides[0].id);
      else if (k === "Escape" && slide.kind === "appendix") go(lastMain.current);
    };
    addEventListener("keydown", onKey);
    return () => removeEventListener("keydown", onKey);
  }, [id, slide.kind, overview, go, skip, fullscreen, reduced, setReduced]);

  // Presenter window remote control.
  useEffect(() => {
    if (!channel) return;
    const onMsg = (e: MessageEvent<SyncMsg>) => {
      const msg = e.data;
      if (msg.type === "go") go(msg.id);
      if (msg.type === "hello") channel!.postMessage({ type: "at", id } satisfies SyncMsg);
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

  const scene = scenes.find((s) => s.id === id);
  const appx = appendix.find((a) => a.id === id);
  const inAppendix = !!appx;
  const list = inAppendix ? appendixSlides : mainSlides;
  const pos = list.findIndex((s) => s.id === id);

  return (
    <div className={`deck ${reduced ? "reduced" : ""}`} data-world={slide.world} data-turn={turn} data-layout={scene?.layout ?? "appendix"}>
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

      <nav className="hud" aria-label="Presentation controls">
        <span className="hud-chapter">{inAppendix ? `Appendix A${pos + 1} of ${list.length}` : `${slide.n} of ${mainSlides.length} · ${slide.chapter}`}</span>
        <span className="hud-progress" aria-hidden="true">
          {list.map((s, k) => (
            <i key={s.id} className={k <= pos ? "on" : ""} data-world={s.world} />
          ))}
        </span>
        <span className="hud-btns">
          {id === TURN_ID && !reduced && turn === "idle" && <button onClick={replay}>Replay</button>}
          <button onClick={() => go(step(id, -1))} aria-label="Previous slide" disabled={pos === 0}>
            ←
          </button>
          <button onClick={() => go(step(id, 1))} aria-label="Next slide" disabled={pos === list.length - 1}>
            →
          </button>
          <button onClick={() => setOverview(true)}>Overview</button>
          {inAppendix ? <button onClick={() => go(lastMain.current)}>Back to story</button> : <button onClick={() => go(appendixSlides[0].id)}>Appendix</button>}
          <button onClick={() => setReduced(!reduced)} aria-pressed={reduced}>
            {reduced ? "Motion: off" : "Motion: on"}
          </button>
          <button onClick={fullscreen} aria-label="Fullscreen">
            Fullscreen
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
    <div className="ov" role="dialog" aria-modal="true" aria-label="Jump to a slide" onClick={onClose}>
      <div className="ov-panel" onClick={(e) => e.stopPropagation()}>
        <div className="ov-head">
          <h2>Jump to</h2>
          <button onClick={onClose}>Close (Esc)</button>
        </div>
        <div className="ov-cols">
          <ol>
            {mainSlides.map((s, k) => (
              <li key={s.id}>
                <button ref={k === 0 ? first : undefined} onClick={() => onPick(s.id)} aria-current={s.id === current}>
                  <span className="ov-n">{s.n}</span>
                  <span>{s.title}</span>
                </button>
              </li>
            ))}
          </ol>
          <ol>
            {appendixSlides.map((s) => (
              <li key={s.id}>
                <button onClick={() => onPick(s.id)} aria-current={s.id === current}>
                  <span className="ov-n">A{s.n}</span>
                  <span>{s.title}</span>
                </button>
              </li>
            ))}
          </ol>
        </div>
        <p className="ov-keys">← → or Space: move · S: finish the transition · Home, End · O: overview · A: appendix · Esc: back to story · M: motion · F: fullscreen</p>
      </div>
    </div>
  );
}
