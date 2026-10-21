/**
 * Static views — no animation, everything in its final state.
 *   ?view=print     every scene + appendix, one 16:9 page each (Print → PDF)
 *   ?view=read      stacked reading view (default on phones)
 *   ?view=notes     speaker notes document
 *   ?view=report    content completeness report (what still needs facts)
 */
import { appendix, scenes, sourceById } from "../content/story";
import type { Scene } from "../content/types";
import { SceneView } from "../scenes/SceneView";
import { AppendixView } from "../scenes/AppendixView";
import { PLACEHOLDER, placeholderCount, Rich } from "../components/Rich";
import { CasinoBackdrop } from "../components/casino";
import { FestivalBackdrop } from "../components/festival";

const WPM = 140;
const words = (s: string) => s.split(/\s+/).filter(Boolean).length;
export const narrationSeconds = (s: Scene) => Math.round((words(s.notes.narration.replace(PLACEHOLDER, "")) / WPM) * 60);
const mmss = (sec: number) => `${Math.floor(sec / 60)}:${String(sec % 60).padStart(2, "0")}`;

export function PrintView({ reading = false }: { reading?: boolean }) {
  return (
    <div className={`static ${reading ? "reader" : "print"}`}>
      {reading && (
        <header className="reader-top">
          <b>Hacklanta I → II</b> · reading view · <a href="?view=print">print version</a> · <a href="./">presentation</a>
        </header>
      )}
      {scenes.map((s, k) => (
        <section key={s.id} className={`page page-${s.world}`} id={s.id} data-layout={s.layout}>
          {s.world === "casino" ? <CasinoBackdrop /> : <FestivalBackdrop />}
          <div className="page-inner">
            <SceneView scene={s} n={k + 1} />
          </div>
        </section>
      ))}
      {appendix.map((a) => (
        <section key={a.id} className="page page-festival" id={a.id}>
          <FestivalBackdrop />
          <div className="page-inner">
            <AppendixView item={a} />
          </div>
        </section>
      ))}
    </div>
  );
}

export function NotesView() {
  const planned = scenes.reduce((t, s) => t + s.seconds, 0);
  return (
    <article className="doc">
      <h1>Speaker notes · Hacklanta I → II</h1>
      <p>
        Planned: <b>{mmss(planned)}</b> · Draft narration at {WPM} wpm: <b>{mmss(scenes.reduce((t, s) => t + narrationSeconds(s), 0))}</b> (excluding placeholders — not a rehearsal)
      </p>
      {scenes.map((s, k) => (
        <section key={s.id}>
          <h2>
            {k + 1}. {s.title} <small>{mmss(s.seconds)} planned · ~{mmss(narrationSeconds(s))} draft</small>
          </h2>
          <p>
            <b>Key point:</b> <Rich text={s.notes.keyPoint} />
          </p>
          <p>
            <Rich text={s.notes.narration} />
          </p>
          {s.notes.followUps.length > 0 && (
            <>
              <h3>Likely follow-ups</h3>
              <dl>
                {s.notes.followUps.map((f) => (
                  <div key={f.q}>
                    <dt>{f.q}</dt>
                    <dd>
                      <Rich text={f.a} />
                    </dd>
                  </div>
                ))}
              </dl>
            </>
          )}
          <p className="doc-src">Sources: {s.sources.map((id) => sourceById[id]?.ref ?? id).join(" · ")}</p>
        </section>
      ))}
    </article>
  );
}

export function ReportView() {
  const rows = [
    ...scenes.map((s, k) => ({ id: s.id, label: `${k + 1}. ${s.title}`, n: placeholderCount(s), seconds: s.seconds, draft: narrationSeconds(s), item: s as unknown })),
    ...appendix.map((a, k) => ({ id: a.id, label: `A${k + 1}. ${a.title}`, n: placeholderCount(a), seconds: 0, draft: 0, item: a as unknown })),
  ];
  const total = rows.reduce((t, r) => t + r.n, 0);
  const all = rows.flatMap((r) => (JSON.stringify(r.item).match(PLACEHOLDER) ?? []).map((p) => ({ where: r.label, p })));
  const uniq = all.filter((x, i) => all.findIndex((y) => y.p === x.p && y.where === x.where) === i);
  return (
    <article className="doc">
      <h1>Content completeness</h1>
      <p>
        <b>{total}</b> unresolved placeholders. This page is for editing only; placeholders also render as dashed chips in the deck so they can't pass as finished content.
      </p>
      <table>
        <thead>
          <tr>
            <th>Scene</th>
            <th>Open items</th>
            <th>Planned</th>
            <th>Draft narration</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.id} className={r.n ? "open" : "done"}>
              <td>
                <a href={`./#/${r.id}`}>{r.label}</a>
              </td>
              <td>{r.n || "✓"}</td>
              <td>{r.seconds ? mmss(r.seconds) : ""}</td>
              <td>{r.draft ? mmss(r.draft) : ""}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h2>Every open item</h2>
      <ol>
        {uniq.map((x, i) => (
          <li key={i}>
            <small>{x.where}</small> — <Rich text={x.p} />
          </li>
        ))}
      </ol>
    </article>
  );
}
