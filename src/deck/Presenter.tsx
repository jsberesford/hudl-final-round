/**
 * ?view=presenter: open in a second window, share only the audience window.
 * Syncs over BroadcastChannel; the deck works without it.
 */
import { useEffect, useState } from "react";
import { scenes, appendix } from "../content/story";
import { Rich } from "../components/Rich";
import { allSlides, idFromHash, step } from "./model";
import { channel, type SyncMsg } from "./sync";
import { narrationSeconds } from "./Static";

const mmss = (sec: number) => `${sec < 0 ? "-" : ""}${Math.floor(Math.abs(sec) / 60)}:${String(Math.abs(sec) % 60).padStart(2, "0")}`;

export function Presenter() {
  const [id, setId] = useState(() => idFromHash(location.hash));
  const [start, setStart] = useState<number | null>(null);
  const [sceneStart, setSceneStart] = useState(() => Date.now());
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    const onMsg = (e: MessageEvent<SyncMsg>) => {
      if (e.data.type === "at") {
        setId(e.data.id);
        setSceneStart(Date.now());
      }
    };
    channel?.addEventListener("message", onMsg);
    channel?.postMessage({ type: "hello" } satisfies SyncMsg);
    const t = setInterval(() => setNow(Date.now()), 500);
    return () => {
      channel?.removeEventListener("message", onMsg);
      clearInterval(t);
    };
  }, []);

  const send = (target: string) => channel?.postMessage({ type: "go", id: target } satisfies SyncMsg);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === " ") {
        e.preventDefault();
        send(step(id, 1));
      }
      if (e.key === "ArrowLeft") send(step(id, -1));
    };
    addEventListener("keydown", onKey);
    return () => removeEventListener("keydown", onKey);
  }, [id]);

  const scene = scenes.find((s) => s.id === id);
  const appx = appendix.find((a) => a.id === id);
  const k = allSlides.findIndex((s) => s.id === id);
  const next = allSlides[k + 1];
  const elapsed = start ? Math.round((now - start) / 1000) : 0;
  const inScene = Math.round((now - sceneStart) / 1000);
  const budgetToHere = scenes.slice(0, Math.max(0, scenes.findIndex((s) => s.id === id) + 1)).reduce((t, s) => t + s.seconds, 0);

  return (
    <div className="presenter">
      <header>
        <div className="pr-clock">
          <b>{mmss(elapsed)}</b> elapsed
          {scene && (
            <>
              {" "}
              · scene {mmss(inScene)} / {mmss(scene.seconds)} · budget to end of scene {mmss(budgetToHere)}
            </>
          )}
        </div>
        <button onClick={() => setStart(start ? null : Date.now())}>{start ? "Reset timer" : "Start timer"}</button>
        <button onClick={() => send(step(id, -1))}>← Prev</button>
        <button onClick={() => send(step(id, 1))}>Next →</button>
        {!channel && <span className="pr-warn">BroadcastChannel is unavailable, so the presenter can't sync.</span>}
      </header>
      <h1>
        {scene ? `${scenes.indexOf(scene) + 1}. ${scene.title}` : appx?.title}
        {next && <small> · next: {next.title}</small>}
      </h1>
      {scene && (
        <>
          <p className="pr-key">
            <Rich full text={scene.notes.keyPoint} />
          </p>
          <p className="pr-narr">
            <Rich full text={scene.notes.narration} />
          </p>
          {scene.notes.transition && <p className="pr-narr"><b>Next:</b> {scene.notes.transition}</p>}
          {scene.notes.caveat && <p className="pr-key">Caveat: {scene.notes.caveat}</p>}
          <p className="pr-meta">Draft narration ≈ {mmss(narrationSeconds(scene))} at 140 wpm</p>
          {scene.notes.followUps.map((f) => (
            <details key={f.q}>
              <summary>{f.q}</summary>
              <Rich full text={f.a} />
            </details>
          ))}
        </>
      )}
    </div>
  );
}
