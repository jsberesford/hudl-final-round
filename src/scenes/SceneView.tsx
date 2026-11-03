import type { CSSProperties } from "react";
import type { Claim, Milestone, Scene } from "../content/types";
import { meta } from "../content/story";
import { ClaimText } from "../components/Rich";
import { CardBack, CardFront, Chip, Label, SuitRow } from "../components/casino";
import { Pass, PassFace, Sticker } from "../components/festival";
import { Funnel } from "../components/Funnel";

const i = (n: number) => ({ ["--i" as string]: n }) as CSSProperties;

function Head({ scene, n }: { scene: Scene; n: number }) {
  return (
    <header className="sc-head">
      {scene.world === "casino" ? (
        <Label n={n}>{scene.lens}</Label>
      ) : (
        <div className="fz-label">
          <span className="fz-label-n">{String(n).padStart(2, "0")}</span>
          {scene.lens}
        </div>
      )}
      <h2 className="sc-title rv" style={i(0)}>
        {scene.title}
      </h2>
    </header>
  );
}

export function SceneView({ scene, n }: { scene: Scene; n: number }) {
  return (
    <div className={`scene w-${scene.world} l-${scene.layout}`} data-scene={scene.id}>
      <Body scene={scene} n={n} />
    </div>
  );
}

function Block({ label, claim, className = "" }: { label: string; claim: Claim; className?: string }) {
  return (
    <div className={`pm-block ${className}`}>
      <span className="pm-k">{label}</span>
      <p>
        <ClaimText claim={claim} />
      </p>
    </div>
  );
}

function Body({ scene, n }: { scene: Scene; n: number }) {
  switch (scene.layout) {
    case "opening":
      return (
        <div className="op">
          <div className="op-cards" aria-hidden="true">
            <CardBack className="op-card op-card--1" />
            <CardFront rank="I" suit="♥" className="op-card op-card--2" />
            <CardBack className="op-card op-card--3" />
          </div>
          <p className="op-pre rv" style={i(0)}>
            {scene.kicker}
          </p>
          <h1 className="op-title rv" style={i(1)}>
            {scene.title}
          </h1>
          <div className="op-rule rv" style={i(2)} />
          <p className="op-sub rv" style={i(3)}>
            {scene.subtitle}
          </p>
          <p className="op-by rv" style={i(4)}>
            {meta.presenter} · {meta.role}
          </p>
        </div>
      );

    case "gap":
      return (
        <>
          <Head scene={scene} n={n} />
          <div className="sc-body">
            <div className="gp">
              <div className="gp-roster rv" style={i(1)}>
                <span className="pm-k">What I found as a transfer</span>
                <ul>
                  {scene.clubs.map((c) => (
                    <li key={c}>
                      <span>{c}</span>
                      <em>No events</em>
                    </li>
                  ))}
                  <li className="gp-answer">
                    <span>{scene.answer.name}</span>
                    <em>Founded</em>
                  </li>
                </ul>
                <p className="pm-source">
                  <ClaimText claim={scene.dormant} />
                </p>
              </div>
              <div className="gp-atl rv" style={i(2)}>
                <span className="pm-k">Across Atlanta</span>
                <dl>
                  {scene.compare.map((c) => (
                    <div key={c.school} className={c.empty ? "is-empty" : ""}>
                      <dt>{c.school}</dt>
                      <dd>
                        <ClaimText claim={c.offer} />
                      </dd>
                    </div>
                  ))}
                </dl>
                <p className="pm-source">
                  <ClaimText claim={scene.answer.note} />
                </p>
              </div>
            </div>
            <div className="pm-pair rv" style={i(3)}>
              <Block label="Primary user" claim={scene.user} />
              <Block label="Why it matters" claim={scene.impact} />
            </div>
          </div>
        </>
      );

    case "goals":
      return (
        <>
          <Head scene={scene} n={n} />
          <div className="sc-body">
            <div className="gl">
              <div className="gl-left">
                <p className="gl-mission rv" style={i(1)}>
                  <ClaimText claim={scene.mission} />
                </p>
                <dl className="gl-proof rv" style={i(3)}>
                  {scene.results.map((r) => (
                    <div key={r.value}>
                      <dt>{r.value}</dt>
                      <dd>
                        <ClaimText claim={r.label} />
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
              <div className="gl-how rv" style={i(2)}>
                <span className="pm-k">How we went after it</span>
                <ol>
                  {scene.pillars.map((p, k) => (
                    <li key={p.name}>
                      <span className="gl-n">{k + 1}</span>
                      <div>
                        <h3>{p.name}</h3>
                        <p>{p.items.join(" · ")}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        </>
      );

    case "research":
      return (
        <>
          <Head scene={scene} n={n} />
          <div className="sc-body">
            <div className="rs rv" style={i(1)}>
              <div className="rs-row rs-head">
                <span>Who we asked</span>
                <span>What we heard</span>
                <span>What we built</span>
              </div>
              {scene.rows.map((row) => (
                <div key={row.method} className="rs-row">
                  <div className="rs-who">
                    <b>{row.method}</b>
                    <small>{row.who}</small>
                  </div>
                  <p className="rs-heard">
                    <ClaimText claim={row.heard} />
                  </p>
                  <p className="rs-built">
                    <ClaimText claim={row.built} />
                  </p>
                </div>
              ))}
            </div>
            <p className="pm-source rv" style={i(2)}>
              <ClaimText claim={scene.limits} />
            </p>
          </div>
        </>
      );

    case "stories":
      return (
        <>
          <Head scene={scene} n={n} />
          <div className="sc-body">
            <ol className="st">
              {scene.stories.map((st, k) => (
                <li key={st.name} className="rv" style={i(1 + k)}>
                  <span className="st-area">{st.area}</span>
                  <h3>{st.name}</h3>
                  <p className="st-problem">
                    <ClaimText claim={st.problem} />
                  </p>
                  <p className="st-how">
                    <ClaimText claim={st.how} />
                  </p>
                  <p className="st-result">
                    <ClaimText claim={st.result} />
                  </p>
                </li>
              ))}
            </ol>
            <p className="pm-source rv" style={i(4)}>
              <ClaimText claim={scene.framing} />
            </p>
          </div>
        </>
      );

    case "monitor":
      return (
        <>
          <Head scene={scene} n={n} />
          <div className="sc-body">
            <ol className="mo">
              {scene.groups.map((g, k) => (
                <li key={g.area} className="rv" style={i(1 + k)}>
                  <span className="mo-area">{g.area}</span>
                  <h3>{g.question}</h3>
                  <dl>
                    {g.metrics.map((m) => (
                      <div key={m.name}>
                        <dt>
                          {m.name}
                          {m.value && <b>{m.value}</b>}
                        </dt>
                        <dd>{m.def}</dd>
                      </div>
                    ))}
                  </dl>
                </li>
              ))}
            </ol>
            <p className="mo-loop rv" style={i(4)}>
              <span aria-hidden="true">↻</span>
              <ClaimText claim={scene.loop} />
            </p>
          </div>
        </>
      );

    case "stats":
      return (
        <>
          <Head scene={scene} n={n} />
          <div className="sc-body">
            <div className="sx">
              <div className="sx-hero rv" style={i(1)}>
                <b>{scene.hero.value}</b>
                <span>{scene.hero.label}</span>
              </div>
              <dl className="sx-grid rv" style={i(2)}>
                {scene.stats.map((st) => (
                  <div key={st.label}>
                    <dt>{st.value}</dt>
                    <dd>{st.label}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <p className="pm-source rv" style={i(3)}>
              <ClaimText claim={scene.note} />
            </p>
          </div>
        </>
      );

    case "now":
      return (
        <>
          <Head scene={scene} n={n} />
          <div className="sc-body">
            <div className="nw">
              <div className="nw-list rv" style={i(1)}>
                <span className="nw-k">The same list, one year later</span>
                <ul>
                  {scene.clubs.map((c) => (
                    <li key={c.name}>
                      <span>{c.name}</span>
                      <em>{c.status}</em>
                    </li>
                  ))}
                  <li className="nw-answer">
                    <span>{scene.answer.name}</span>
                    <em>{scene.answer.status}</em>
                  </li>
                </ul>
              </div>
              <div className="nw-right rv" style={i(2)}>
                <dl className="nw-stats">
                  {scene.stats.map((st) => (
                    <div key={st.label}>
                      <dt>{st.value}</dt>
                      <dd>{st.label}</dd>
                    </div>
                  ))}
                </dl>
                <div className="nw-co">
                  <span className="nw-k">Offers from</span>
                  <ul>
                    {scene.companies.map((c) => (
                      <li key={c}>{c}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            <p className="nw-line rv" style={i(3)}>
              <ClaimText claim={scene.line} />
            </p>
          </div>
        </>
      );

    case "evidence":
      return (
        <>
          <Head scene={scene} n={n} />
          <div className="sc-body">
            <ul className="ev-inputs rv" style={i(1)}>
              {scene.methods.map((c) => (
                <li key={c.text}>{c.text}</li>
              ))}
            </ul>
            <div className="flow rv" style={i(2)}>
              <div className="flow-row flow-head">
                <span>What we heard</span>
                <span>What it meant</span>
                <span>What changed</span>
              </div>
              {scene.rows.map((row, k) => (
                <div key={k} className="flow-row">
                  <span>
                    <ClaimText claim={row.signal} />
                  </span>
                  <span>
                    <ClaimText claim={row.meaning} />
                  </span>
                  <span className="flow-out">
                    <ClaimText claim={row.decision} />
                  </span>
                </div>
              ))}
            </div>
            <p className="pm-source rv" style={i(3)}>
              <ClaimText claim={scene.limits} />
            </p>
          </div>
        </>
      );

    case "hypotheses":
      return (
        <>
          <Head scene={scene} n={n} />
          <div className="sc-body">
            <p className="hy-goal rv" style={i(1)}>
              <span className="pm-k">What we needed to be true</span>
              <ClaimText claim={scene.outcome} />
            </p>
            <div className="hy">
              {scene.cards.map((c, k) => (
                <div key={k} className={`hy-deal rv ${c.riskiest ? "is-risk" : ""}`} style={{ ...i(2 + k), ["--rot" as string]: `${(k - (scene.cards.length - 1) / 2) * 0.8}deg` }}>
                  <CardFront rank={String(k + 1)} suit={c.suit} className="hy-card">
                    <div className="hy-body">
                      <p className="hy-belief">
                        <ClaimText claim={c.belief} />
                      </p>
                      <p className="hy-why">
                        <ClaimText claim={c.because} />
                      </p>
                      <p className="hy-check">
                        <span>{c.riskiest ? "Riskiest · Proof" : "Proof"}</span>
                        <ClaimText claim={c.expected} />
                      </p>
                      {c.result && (
                        <p className="hy-result">
                          <b>{c.result.value}</b> {c.result.label}
                        </p>
                      )}
                    </div>
                  </CardFront>
                  {c.riskiest && (
                    <div className="hy-chip" aria-hidden="true">
                      <Chip tone="gold" />
                    </div>
                  )}
                </div>
              ))}
            </div>
            <p className="pm-source rv" style={i(6)}>
              <ClaimText claim={scene.framing} />
            </p>
          </div>
        </>
      );

    case "matrix": {
      const label = { do: "Did it", later: "Pushed to II", cut: "Cut", optional: "Optional" } as const;
      return (
        <>
          <Head scene={scene} n={n} />
          <div className="sc-body">
            <div className="mx-wrap">
              <div className="mx rv" style={i(1)}>
                <span className="mx-axis mx-y">Impact →</span>
                <span className="mx-axis mx-x">Effort →</span>
                <div className="mx-grid">
                  <span className="mx-q mx-q1">Quick wins</span>
                  <span className="mx-q mx-q2">Big bets</span>
                  <span className="mx-q mx-q3">Fill-ins</span>
                  <span className="mx-q mx-q4">Money pits</span>
                  {scene.points.map((p) => (
                    <span key={p.name} className={`mx-pt is-${p.call}${p.effort > 0.7 ? " is-flip" : ""}`} style={{ left: `${p.effort * 100}%`, bottom: `${p.impact * 100}%` }}>
                      <i aria-hidden="true" />
                      <span>
                        <b>{p.name}</b>
                        {p.tag && <small>{p.tag}</small>}
                      </span>
                    </span>
                  ))}
                </div>
              </div>
              <div className="mx-side rv" style={i(2)}>
                <ul className="mx-key">
                  {(Object.keys(label) as (keyof typeof label)[]).map((c) => (
                    <li key={c} className={`is-${c}`}>
                      <i aria-hidden="true" />
                      {label[c]}
                      <span>{scene.points.filter((p) => p.call === c).length}</span>
                    </li>
                  ))}
                </ul>
                <p className="mx-rule">
                  <span className="pm-k">The rule we followed</span>
                  <ClaimText claim={scene.rule} />
                </p>
                <p className="pm-source">
                  <ClaimText claim={scene.framing} />
                </p>
              </div>
            </div>
          </div>
        </>
      );
    }

    case "decision":
      return (
        <>
          <Head scene={scene} n={n} />
          <div className="sc-body">
            <div className="dc">
              {scene.options.map((o, k) => (
                <div key={o.name} className={`dc-opt rv ${o.chosen ? "is-chosen" : ""}`} style={i(1 + k)}>
                  {o.chosen && (
                    <>
                      <span className="dc-tag">Chosen for Hacklanta I</span>
                      <div className="dc-chip" aria-hidden="true">
                        <Chip tone="gold" />
                      </div>
                    </>
                  )}
                  <h3>{o.name}</h3>
                  <p className="dc-sum">{o.summary}</p>
                  <dl>
                    {scene.criteria.map((c, j) => (
                      <div key={c}>
                        <dt>{c}</dt>
                        <dd>{o.values[j]}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              ))}
            </div>
            <div className="dc-cost rv" style={i(4)}>
              <p className="dc-cost-line">
                <span className="pm-k">The cost we accepted</span>
                <ClaimText claim={scene.downside} />
              </p>
              <p className="pm-source">
                <ClaimText claim={scene.framing} />
              </p>
            </div>
          </div>
        </>
      );

    case "timeline":
      return (
        <>
          <Head scene={scene} n={n} />
          <div className="sc-body">
            <Rail milestones={scene.milestones} />
            <div className="tl-call rv" style={i(2)}>
              <Block label="The challenge" claim={scene.challenge} className="tl-hero" />
              <Block label="Why it mattered" claim={scene.why} />
              <Block label="What I learned" claim={scene.learned} />
            </div>
            <p className="pm-source rv" style={i(3)}>
              <ClaimText claim={scene.owners} />
            </p>
          </div>
        </>
      );

    case "results":
      return (
        <>
          <Head scene={scene} n={n} />
          <div className="sc-body">
            <div className="rv" style={i(1)}>
              <Funnel metrics={scene.metrics} />
            </div>
            <div className="rs-side rv" style={i(2)}>
              <Block label="What worked" claim={scene.worked} />
              <Block label="What did not" claim={scene.didnt} />
              <Block label="What we carried forward" claim={scene.carried} className="rs-carry" />
            </div>
          </div>
        </>
      );

    case "turn":
      return <TurnBody scene={scene} />;

    case "changes":
      return (
        <>
          <Head scene={scene} n={n} />
          <div className="sc-body">
            <ol className="tk">
              {scene.changes.map((c, k) => (
                <li key={c.name} className="tk-row rv" style={i(1 + k)}>
                  <h3 className="tk-stub">{c.name}</h3>
                  <div>
                    <span className="pm-k">Learned</span>
                    <ClaimText claim={c.learning} />
                  </div>
                  <div className="tk-main">
                    <span className="pm-k">Decided</span>
                    <ClaimText claim={c.decision} />
                    <small>
                      Expected: <ClaimText claim={c.expected} />
                    </small>
                  </div>
                  <div>
                    <span className="pm-k">Tradeoff</span>
                    <ClaimText claim={c.tradeoff} />
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </>
      );

    case "product":
      return (
        <>
          <Head scene={scene} n={n} />
          <div className="sc-body">
            <div className="pd">
              {scene.shots.map((s, k) => (
                <figure key={s.name} className="pd-shot rv" style={i(1 + k)}>
                  <div className="pd-frame">
                    <img src={s.src} alt={s.alt} />
                  </div>
                  <figcaption>
                    <b>{s.name}</b>
                    <span>{s.caption}</span>
                    <small>{s.credit}</small>
                  </figcaption>
                </figure>
              ))}
            </div>
            {scene.deltas && (
              <dl className="pd-deltas rv" style={i(3)}>
                {scene.deltas.map((d) => (
                  <div key={d.label}>
                    <dt>
                      <s>{d.from}</s>
                      <span aria-hidden="true">→</span>
                      <b>{d.to}</b>
                    </dt>
                    <dd>{d.label}</dd>
                  </div>
                ))}
              </dl>
            )}
          </div>
        </>
      );

    case "rollout":
      return (
        <>
          <Head scene={scene} n={n} />
          <div className="sc-body ro">
            <div className="ro-chart rv" style={i(1)}>
              <DailyBars days={scene.days} window={scene.window} />
              <p className="pm-source">
                <ClaimText claim={scene.scope} />
              </p>
            </div>
            <div className="ro-side rv" style={i(2)}>
              <ul className="ro-stats">
                {scene.stats.map((s) => (
                  <li key={s.label}>
                    <b>{s.value}</b>
                    <span>{s.label}</span>
                  </li>
                ))}
              </ul>
              <Block label="What I'd test next" claim={scene.cannot} className="ro-limit" />
            </div>
          </div>
        </>
      );

    case "reflection":
      return (
        <>
          <Head scene={scene} n={n} />
          <div className="sc-body">
            <ol className="rf">
              <li className="rf-head" aria-hidden="true">
                <span />
                <span>What happened</span>
                <span>Next time</span>
              </li>
              {scene.reflections.map((x, k) => (
                <li key={x.title} className="rv" style={i(1 + k)}>
                  <h3>
                    <span className="rf-n">{k + 1}</span>
                    {x.title}
                  </h3>
                  <p>
                    <ClaimText claim={x.happened} />
                  </p>
                  <p className="rf-now">
                    <ClaimText claim={x.instead} />
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </>
      );

    case "closing":
      return (
        <div className="cl">
          <div className="cl-text">
            <div className="fz-label">
              <span className="fz-label-n">{String(n).padStart(2, "0")}</span>
              {scene.lens}
            </div>
            <h2 className="cl-title rv" style={i(0)}>
              {scene.title}
            </h2>
            <p className="cl-lesson rv" style={i(1)}>
              {scene.lesson}
            </p>
            <ul className="cl-p rv" style={i(2)}>
              {scene.principles.map((p) => (
                <li key={p.name}>{p.name}</li>
              ))}
            </ul>
            <p className="cl-q rv" style={i(3)}>
              Thank you. Questions?
            </p>
            <p className="cl-by rv" style={i(4)}>
              {meta.presenter} · {meta.role}
            </p>
          </div>
          <div className="cl-art rv" style={i(1)} aria-hidden="true">
            <CardFront rank="I" suit="♥" className="cl-card">
              <div className="cl-card-face">
                <span className="cl-card-word">Hacklanta</span>
                <span className="cl-card-sub">I · Mar 28</span>
              </div>
            </CardFront>
            <div className="cl-pass">
              <Pass strap={false}>
                <PassFace />
              </Pass>
            </div>
            <Sticker name="saturn" className="cl-saturn" />
            <Sticker name="sparkle-white" className="cl-sp1" />
          </div>
        </div>
      );
  }
}

/** Applications per day on a zero baseline, with the ship window marked. */
function DailyBars({ days, window: w }: { days: { date: string; count: number }[]; window: { from: string; to: string; label: string } }) {
  const max = Math.max(...days.map((d) => d.count));
  const from = days.findIndex((d) => d.date === w.from);
  const to = days.findIndex((d) => d.date === w.to);
  return (
    <figure className="bars" aria-label="Applications per day, August 5 to September 6">
      <div className="bars-window" style={{ left: `${(from / days.length) * 100}%`, width: `${((to - from + 1) / days.length) * 100}%` }}>
        <em>{w.label}</em>
      </div>
      <div className="bars-plot">
        {days.map((d) => (
          <i key={d.date} title={`${d.date}: ${d.count}`} style={{ height: `${(d.count / max) * 100}%` }} />
        ))}
      </div>
      <figcaption>
        <span>{days[0].date}</span>
        <span>Applications per day (peak {max})</span>
        <span>{days[days.length - 1].date}</span>
      </figcaption>
    </figure>
  );
}

function span(date: string) {
  const [mon, days] = date.split(" ");
  const [a, b] = days.split("–");
  return [Date.parse(`${mon} ${a}, 2026`), Date.parse(`${mon} ${b ?? a}, 2026`)];
}

/** Milestones on a true date scale, so gaps and crunches are visible. */
function Rail({ milestones }: { milestones: Milestone[] }) {
  const t0 = span(milestones[0].date)[0];
  const t1 = span(milestones[milestones.length - 1].date)[1];
  const pos = (t: number) => ((t - t0) / (t1 - t0)) * 100;
  return (
    <div className="rail rv" style={i(1)}>
      <div className="rail-track" aria-hidden="true">
        {milestones.map((ms, k) => {
          const [a, b] = span(ms.date);
          return (
            <span key={k} className={`rail-mark ${ms.late ? "is-late" : ""}`} style={{ left: `${pos(a)}%`, width: `calc(${pos(b) - pos(a)}% + 32px)` }}>
              {k + 1}
            </span>
          );
        })}
      </div>
      <ol className="rail-items" style={{ gridTemplateColumns: `repeat(${milestones.length}, 1fr)` }}>
        {milestones.map((ms, k) => (
          <li key={k} className={ms.late ? "is-late" : ""}>
            <span className="rail-date">
              {k + 1}. {ms.date}
            </span>
            <b>{ms.label}</b>
          </li>
        ))}
      </ol>
    </div>
  );
}

/** Scene 8. The outgoing casino card flips to become the festival pass. */
function TurnBody({ scene }: { scene: Extract<Scene, { layout: "turn" }> }) {
  return (
    <div className="tn">
      <div className="tn-casino" aria-hidden="true">
        <Chip tone="red" className="tn-chip tn-chip--1" />
        <Chip tone="gold" className="tn-chip tn-chip--2" />
        <Chip tone="dark" className="tn-chip tn-chip--3" />
        <SuitRow />
      </div>
      <div className="tn-copy">
        <div className="fz-label tn-label">{scene.lens} · I to II</div>
        <h2 className="tn-title">{scene.title}</h2>
        <p className="tn-learning">
          <ClaimText claim={scene.learning} />
        </p>
      </div>
      <div className="tn-stage" aria-hidden="true">
        <div className="tn-strap" />
        <div className="tn-flip">
          <div className="tn-face tn-face--front">
            <CardFront rank="I" suit="♥" className="tn-card">
              <span className="tn-card-word">Hacklanta</span>
            </CardFront>
          </div>
          <div className="tn-face tn-face--back">
            <Pass strap={false}>
              <PassFace />
            </Pass>
          </div>
        </div>
        <Sticker name="sparkle-yellow" className="tn-spark tn-spark--1" />
        <Sticker name="note-orange" className="tn-spark tn-spark--2" />
        <Sticker name="sparkle-blue" className="tn-spark tn-spark--3" />
      </div>
    </div>
  );
}
