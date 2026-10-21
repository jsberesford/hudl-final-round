import type { Metric } from "../content/types";
import { sourceById } from "../content/story";

const fmt = (n: number) => n.toLocaleString("en-US");

/**
 * Step funnel. Bars render only for `actual` metrics; targets render as a
 * labelled marker; anything pending shows an explicit empty state. Never
 * substitutes sample values.
 */
export function Funnel({ metrics, title }: { metrics: Metric[]; title: string }) {
  const actual = metrics.filter((x) => x.status === "actual" && x.value != null);
  const targets = metrics.filter((x) => x.status === "target" && x.value != null);
  const steps = metrics.filter((x) => x.status !== "target");
  const max = Math.max(1, ...actual.map((x) => x.value!), ...targets.map((x) => x.value!));
  const empty = actual.length === 0;

  return (
    <figure className={`funnel ${empty ? "is-empty" : ""}`}>
      <figcaption className="funnel-cap">
        <span>{title}</span>
        {empty && <span className="funnel-flag">Awaiting verified data</span>}
      </figcaption>
      {targets.map((t) => (
        <div key={t.id} className="funnel-target" title={sourceById[t.source ?? ""]?.ref}>
          <span>Target, not a result</span>
          <b>
            {t.label}: {fmt(t.value!)} {t.unit}
          </b>
        </div>
      ))}
      <ol className="funnel-steps">
        {steps.map((s, i) => {
          const has = s.status === "actual" && s.value != null;
          const prev = i > 0 ? steps[i - 1] : undefined;
          const rate = has && prev?.status === "actual" && prev.value ? Math.round((s.value! / prev.value) * 100) : undefined;
          return (
            <li key={s.id} className="funnel-step rv" style={{ ["--i" as string]: i }}>
              <span className="funnel-label">{s.label}</span>
              <span className="funnel-track">
                {has ? (
                  <span className="funnel-bar" style={{ ["--w" as string]: `${(s.value! / max) * 100}%` }} />
                ) : (
                  <span className="funnel-missing">{s.definition}</span>
                )}
              </span>
              <span className="funnel-val">{has ? fmt(s.value!) : "—"}</span>
              <span className="funnel-rate">{rate != null ? `${rate}%` : ""}</span>
            </li>
          );
        })}
      </ol>
    </figure>
  );
}
