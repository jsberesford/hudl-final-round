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

    case "journey":
      return (
        <>
          <Head scene={scene} n={n} />
          <div className="sc-body">
            <ol className="jr rv" style={i(1)}>
              {scene.steps.map((s) => (
                <li key={s.label} className={s.note ? "is-friction" : ""}>
                  <span className="jr-node" aria-hidden="true" />
                  <b>{s.label}</b>
                  <span className="jr-sys">{s.system}</span>
                  {s.note && (
                    <span className="jr-note">
                      <span className="jr-kind">
                        <i aria-hidden="true">♦</i> {s.kind}
                      </span>
                      <ClaimText claim={s.note} />
                    </span>
                  )}
                </li>
              ))}
            </ol>
            <div className="pm-pair rv" style={i(2)}>
              <Block label="Primary user" claim={scene.user} />
              <Block label="What I owned" claim={scene.role} />
            </div>
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
              <span className="pm-k">Desired user outcome</span>
              <ClaimText claim={scene.outcome} />
            </p>
            <div className="hy">
              {scene.cards.map((c, k) => (
                <div key={k} className={`hy-deal rv ${c.riskiest ? "is-risk" : ""}`} style={{ ...i(2 + k), ["--rot" as string]: `${(k - 1) * 0.8}deg` }}>
                  <CardFront rank={String(k + 1)} suit={c.suit} className="hy-card">
                    <div className="hy-body">
                      <p className="hy-belief">
                        We believed <ClaimText claim={c.belief} />, because <ClaimText claim={c.because} />.
                      </p>
                      <p className="hy-check">
                        <span>{c.riskiest ? "Riskiest bet, in hindsight. Would show as:" : "Would show as:"}</span>
                        <ClaimText claim={c.expected} />
                      </p>
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
            <p className="pm-source rv" style={i(5)}>
              <ClaimText claim={scene.framing} />
            </p>
          </div>
        </>
      );

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
              <Block label="What this cannot establish" claim={scene.cannot} className="ro-limit" />
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
              {scene.reflections.map((x, k) => (
                <li key={x.title} className="rv" style={i(1 + k)}>
                  <h3>{x.title}</h3>
                  <p>
                    <ClaimText claim={x.happened} />
                  </p>
                  <p>
                    <ClaimText claim={x.learned} />
                  </p>
                  <p className="rf-now">
                    <span className="pm-k">Next time</span>
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
            <CardFront rank="I" suit="♥" className="cl-card" />
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
