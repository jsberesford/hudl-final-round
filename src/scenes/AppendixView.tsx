import type { AppendixItem } from "../content/types";
import { appendix, sourceById } from "../content/story";
import { ClaimText } from "../components/Rich";

export function AppendixView({ item }: { item: AppendixItem }) {
  const k = appendix.findIndex((a) => a.id === item.id);
  return (
    <div className="scene w-festival l-appendix" data-scene={item.id}>
      <header className="sc-head">
        <div className="fz-label">
          <span className="fz-label-n">A{k + 1}</span>Evidence appendix
        </div>
        <h2 className="sc-title rv" style={{ ["--i" as string]: 0 }}>
          {item.title}
        </h2>
      </header>
      <div className="ap-grid">
        {item.sections.map((s, n) => (
          <section key={s.heading} className="ap-sec rv" style={{ ["--i" as string]: n + 1 }}>
            <h3>{s.heading}</h3>
            <ul>
              {s.claims.map((c, j) => (
                <li key={j}>
                  <ClaimText claim={c} tag />
                  {c.source && sourceById[c.source] && <cite>{sourceById[c.source].ref}</cite>}
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
      <nav className="ap-nav" aria-label="Appendix sections">
        {appendix.map((a, j) => (
          <a key={a.id} href={`#/${a.id}`} aria-current={a.id === item.id ? "page" : undefined}>
            A{j + 1} {a.title}
          </a>
        ))}
      </nav>
    </div>
  );
}
