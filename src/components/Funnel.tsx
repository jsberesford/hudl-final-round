import type { Metric } from "../content/types";

/**
 * Funnel as a run of stages. Bars share a zero baseline and only appear for
 * verified (`actual`) metrics, so an empty chart never implies a shape.
 */
export function Funnel({ metrics }: { metrics: Metric[] }) {
  const known = (x?: Metric) => x?.status === "actual" && x.value != null;
  const max = Math.max(1, ...metrics.filter(known).map((x) => x.value!));
  return (
    <figure className="funnel">
      <ol>
        {metrics.map((s, k) => {
          const prev = metrics[k - 1];
          const rate = known(s) && known(prev) && prev.value ? Math.round((s.value! / prev.value) * 100) : null;
          return (
            <li key={s.id}>
              <b>{s.label}</b>
              {known(s) && <span className="funnel-val">{s.value!.toLocaleString("en-US")}</span>}
              {known(s) && <span className="funnel-track"><i style={{ width: `${(s.value! / max) * 100}%` }} /></span>}
              <small>{rate != null ? `${rate}% of ${prev.label.toLowerCase()}` : s.definition}</small>
            </li>
          );
        })}
      </ol>
    </figure>
  );
}
