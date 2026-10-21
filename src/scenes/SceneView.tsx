import type { CSSProperties, ReactNode } from "react";
import type { Scene } from "../content/types";
import { meta } from "../content/story";
import { ClaimText, Rich } from "../components/Rich";
import { CardBack, CardFront, Chip, Label, SuitRow } from "../components/casino";
import { Pass, PassFace, Sticker } from "../components/festival";
import { Funnel } from "../components/Funnel";

const i = (n: number) => ({ ["--i" as string]: n }) as CSSProperties;

function Head({ scene, n, children }: { scene: Scene; n: number; children?: ReactNode }) {
  const casino = scene.world === "casino";
  return (
    <header className="sc-head">
      {casino ? (
        <Label n={n}>{scene.chapter}</Label>
      ) : (
        <div className="fz-label">
          <span className="fz-label-n">{String(n).padStart(2, "0")}</span>
          {scene.chapter}
        </div>
      )}
      <h2 className="sc-title rv" style={i(0)}>
        {scene.title}
      </h2>
      <p className="sc-take rv" style={i(1)}>
        <Rich text={scene.takeaway} />
      </p>
      {children}
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
            Hacklanta
          </h1>
          <div className="op-rule rv" style={i(2)} />
          <p className="op-sub rv" style={i(3)}>
            {scene.title} <span className="op-arrow">I → II</span>
          </p>
          <p className="op-outcome rv" style={i(4)}>
            <ClaimText claim={scene.outcome} />
          </p>
          <div className="op-slot rv" style={i(5)}>
            {scene.facts.map((f, k) => (
              <span key={k} className="op-slot-cell">
                <ClaimText claim={f} />
              </span>
            ))}
          </div>
          <p className="op-by rv" style={i(6)}>
            {meta.presenter} · {meta.role}
          </p>
          <p className="op-start rv" style={i(7)}>
            $ press <kbd>→</kbd> to deal<span className="cz-blink">_</span>
          </p>
        </div>
      );

    case "journey":
      return (
        <>
          <Head scene={scene} n={n} />
          <p className="jr-user rv" style={i(2)}>
            <span className="k">// primary user</span> <ClaimText claim={scene.user} />
          </p>
          <ol className="jr-steps">
            {scene.steps.map((s, k) => (
              <li key={s.label} className={`jr-step rv ${s.friction ? "is-friction" : ""}`} style={i(3 + k * 0.6)}>
                <span className="jr-n">{String(k + 1).padStart(2, "0")}</span>
                <b>{s.label}</b>
                <span className="jr-d">{s.detail}</span>
                {s.friction && (
                  <span className="jr-f">
                    <span className="jr-f-tag">♦ friction</span>
                    <ClaimText claim={s.friction} tag />
                  </span>
                )}
              </li>
            ))}
          </ol>
          <div className="jr-foot rv" style={i(8)}>
            <p className="jr-role">
              <ClaimText claim={scene.role} />
            </p>
            <ul className="jr-cons">
              {scene.constraints.map((c, k) => (
                <li key={k}>
                  <ClaimText claim={c} />
                </li>
              ))}
            </ul>
          </div>
        </>
      );

    case "evidence":
      return (
        <>
          <Head scene={scene} n={n}>
            <ul className="ev-methods rv" style={i(2)}>
              {scene.methods.map((x, k) => (
                <li key={k}>
                  <ClaimText claim={x} />
                </li>
              ))}
            </ul>
          </Head>
          <div className="ev-grid" role="table" aria-label="Evidence to decision">
            <div className="ev-hd" role="row">
              <span role="columnheader">What we heard</span>
              <span role="columnheader">What it meant</span>
              <span role="columnheader">What we decided for II</span>
            </div>
            {scene.rows.map((row, k) => (
              <div key={k} className="ev-row" role="row">
                <span className="ev-cell rv" role="cell" style={i(3 + k * 1.5)}>
                  <ClaimText claim={row.evidence} />
                </span>
                <span className="ev-cell rv" role="cell" style={i(3.5 + k * 1.5)}>
                  <ClaimText claim={row.insight} />
                </span>
                <span className="ev-cell ev-dec rv" role="cell" style={i(4 + k * 1.5)}>
                  <ClaimText claim={row.decision} />
                </span>
              </div>
            ))}
          </div>
          <p className="ev-limits rv" style={i(9)}>
            <ClaimText claim={scene.limits} />
          </p>
        </>
      );

    case "hypotheses":
      return (
        <>
          <Head scene={scene} n={n} />
          <p className="hy-outcome rv" style={i(2)}>
            <span className="k">// desired outcome</span> <ClaimText claim={scene.outcome} />
          </p>
          <div className="hy-hand">
            {scene.cards.map((c, k) => (
              <div key={k} className="hy-deal rv" style={{ ...i(3 + k), ["--rot" as string]: `${(k - 1) * 1.2}deg` }}>
                <CardFront rank={String(k + 1)} suit={c.suit} className="hy-card">
                  <div className="hy-body">
                    <span className="hy-k">We believed</span>
                    <p>
                      <ClaimText claim={c.belief} />
                    </p>
                    <span className="hy-k">We'd know if</span>
                    <p className="hy-s">
                      <ClaimText claim={c.success} />
                    </p>
                  </div>
                </CardFront>
              </div>
            ))}
          </div>
          <p className="hy-risk rv" style={i(7)}>
            <span className="k">♠ riskiest</span> <ClaimText claim={scene.riskiest} />
          </p>
        </>
      );

    case "decision":
      return (
        <>
          <Head scene={scene} n={n} />
          <p className="dc-q rv" style={i(2)}>
            {scene.question}
          </p>
          <div className="dc-board">
            {scene.options.map((o, k) => (
              <div key={o.name} className={`dc-opt rv ${o.chosen ? "is-chosen" : ""}`} style={i(3 + k)}>
                {o.chosen && (
                  <div className="dc-chip">
                    <Chip tone="gold" />
                    <span>We chose this</span>
                  </div>
                )}
                <h3>{o.name}</h3>
                <p className="dc-sum">{o.summary}</p>
                <dl className="dc-crit">
                  {o.criteria.map((c) => (
                    <div key={c.label}>
                      <dt>{c.label}</dt>
                      <dd>{c.value}</dd>
                    </div>
                  ))}
                </dl>
                <p className="dc-why">
                  <span className="k">{o.chosen ? "why" : "why not"}</span> <ClaimText claim={o.why} />
                </p>
              </div>
            ))}
          </div>
          <div className="dc-foot rv" style={i(7)}>
            <p className="dc-down">
              <ClaimText claim={scene.downside} tag />
            </p>
            <p className="dc-frame">
              <ClaimText claim={scene.framing} />
            </p>
          </div>
        </>
      );

    case "timeline":
      return (
        <>
          <Head scene={scene} n={n} />
          <div className="tl-wrap">
            <ol className="tl">
              <span className="tl-line" aria-hidden="true" />
              {scene.milestones.map((ms, k) => (
                <li key={k} className={`tl-item rv ${ms.mine ? "is-mine" : ""}`} style={i(2 + k * 0.7)}>
                  <span className="tl-dot" aria-hidden="true" />
                  <span className="tl-date">{ms.date}</span>
                  <b className="tl-label">{ms.label}</b>
                  {ms.detail && (
                    <span className="tl-detail">
                      <ClaimText claim={ms.detail} />
                    </span>
                  )}
                </li>
              ))}
            </ol>
            <figure className="tl-artifact rv" style={i(7)}>
              <pre>
                {scene.artifact.lines.map((l, k) => (
                  <span key={k} className={l.startsWith(">") ? "hl" : l.startsWith("//") ? "dim" : ""}>
                    {l}
                    {"\n"}
                  </span>
                ))}
              </pre>
              <figcaption>
                <ClaimText claim={scene.artifact.caption} />
              </figcaption>
            </figure>
          </div>
        </>
      );

    case "results":
      return (
        <>
          <Head scene={scene} n={n} />
          <div className="rs-grid">
            <div className="rs-chart rv" style={i(2)}>
              <Funnel metrics={scene.metrics} title="Hacklanta I participant funnel" />
            </div>
            <div className="rs-lists">
              <div className="rs-col rv" style={i(3)}>
                <h3>
                  <span className="rs-mark ok">♣</span> Worked
                </h3>
                <ul>
                  {scene.worked.map((c, k) => (
                    <li key={k}>
                      <ClaimText claim={c} />
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rs-col rv" style={i(4)}>
                <h3>
                  <span className="rs-mark no">♦</span> Didn't
                </h3>
                <ul>
                  {scene.didnt.map((c, k) => (
                    <li key={k}>
                      <ClaimText claim={c} />
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          <p className="rs-open rv" style={i(6)}>
            <span className="k">Still unresolved →</span> <ClaimText claim={scene.unresolved} />
          </p>
        </>
      );

    case "turn":
      return <TurnBody scene={scene} />;

    case "changes":
      return (
        <>
          <Head scene={scene} n={n} />
          <div className="ch-list">
            <div className="ch-hd" aria-hidden="true">
              <span>From I we learned</span>
              <span>So in II we changed</span>
              <span>Expecting</span>
            </div>
            {scene.changes.map((c, k) => (
              <div key={k} className="ch-row rv" style={i(2 + k * 1.2)}>
                <span className="ch-n">{k + 1}</span>
                <span className="ch-l">
                  <ClaimText claim={c.learning} />
                </span>
                <span className="ch-c">
                  <ClaimText claim={c.change} />
                </span>
                <span className="ch-e">
                  <ClaimText claim={c.effect} tag />
                </span>
                {c.tradeoff && (
                  <span className="ch-t">
                    <span className="ch-t-k">The tradeoff</span>
                    <ClaimText claim={c.tradeoff} />
                  </span>
                )}
              </div>
            ))}
          </div>
          <Sticker name="speakers" className="ch-st ch-st--1" />
          <Sticker name="sparkle-yellow" className="ch-st ch-st--2" />
        </>
      );

    case "rollout":
      return (
        <>
          <Head scene={scene} n={n} />
          <div className="ro-grid">
            <ol className="ro-tl">
              {scene.milestones.map((ms, k) => (
                <li key={k} className={`ro-item rv ${ms.mine ? "is-mine" : ""}`} style={i(2 + k * 0.6)}>
                  <span className="ro-date">{ms.date}</span>
                  <b>{ms.label}</b>
                  {ms.detail && (
                    <span className="ro-d">
                      <ClaimText claim={ms.detail} />
                    </span>
                  )}
                </li>
              ))}
            </ol>
            <div className="ro-right">
              <div className="ro-chart rv" style={i(5)}>
                <Funnel metrics={scene.metrics} title="Hacklanta II participant funnel" />
              </div>
              <p className="ro-scope rv" style={i(7)}>
                <ClaimText claim={scene.scope} />
              </p>
            </div>
          </div>
        </>
      );

    case "reflection":
      return (
        <>
          <Head scene={scene} n={n} />
          <div className="rf-list">
            <div className="rf-hd" aria-hidden="true">
              <span />
              <span>What happened</span>
              <span>What I learned</span>
              <span>What I'd do now</span>
            </div>
            {scene.reflections.map((x, k) => (
              <div key={k} className="rf-row rv" style={i(2 + k * 1.2)}>
                <h3>{x.title}</h3>
                <span>
                  <ClaimText claim={x.happened} />
                </span>
                <span>
                  <ClaimText claim={x.learned} />
                </span>
                <span className="rf-now">
                  <ClaimText claim={x.instead} />
                </span>
              </div>
            ))}
          </div>
          <p className="rf-next rv" style={i(6)}>
            <ClaimText claim={scene.nextTest} />
          </p>
        </>
      );

    case "closing":
      return (
        <div className="cl">
          <div className="cl-text">
            <div className="fz-label">
              <span className="fz-label-n">{String(n).padStart(2, "0")}</span>
              {scene.chapter}
            </div>
            <h2 className="cl-title rv" style={i(0)}>
              {scene.title}
            </h2>
            <dl className="cl-facts">
              <div className="rv" style={i(1)}>
                <dt>Outcome</dt>
                <dd>
                  <ClaimText claim={scene.outcome} />
                </dd>
              </div>
              <div className="rv" style={i(2)}>
                <dt>My part</dt>
                <dd>
                  <ClaimText claim={scene.contribution} />
                </dd>
              </div>
              <div className="rv" style={i(3)}>
                <dt>Lesson</dt>
                <dd>
                  <ClaimText claim={scene.lesson} />
                </dd>
              </div>
            </dl>
            <p className="cl-q rv" style={i(4)}>
              Questions? <a href="#/a-role">Evidence appendix →</a>
            </p>
          </div>
          <div className="cl-art rv" style={i(2)} aria-hidden="true">
            <Sticker name="dj-set" className="cl-dj" />
            <Sticker name="yellow-flower" className="cl-flower" />
            <Sticker name="green-shrub" className="cl-shrub" />
            <Sticker name="saturn" className="cl-saturn" />
            <Sticker name="sparkle-white" className="cl-sp1" />
            <Sticker name="note-pink" className="cl-sp2" />
          </div>
        </div>
      );
  }
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
        <div className="fz-label tn-label">I → II</div>
        <h2 className="tn-title">{scene.title}</h2>
        <p className="tn-learning">
          <span className="k">What we learned</span>
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
