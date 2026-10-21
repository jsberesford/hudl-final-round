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
          <ol className="jr-steps">
            {scene.steps.map((s, k) => (
              <li key={s.label} className={`jr-step rv ${s.friction ? "is-friction" : ""}`} style={i(2 + k * 0.5)}>
                <span className="jr-n">{String(k + 1).padStart(2, "0")}</span>
                <b>{s.label}</b>
                {s.friction && <span className="jr-f-tag">♦ friction</span>}
              </li>
            ))}
          </ol>
        </>
      );

    case "evidence":
      return (
        <>
          <Head scene={scene} n={n} />
          <ol className="ev-list">
            {scene.rows.map((row, k) => (
              <li key={k} className="ev-item rv" style={i(2 + k)}>
                <span className="ev-src">
                  <ClaimText claim={row.evidence} />
                </span>
                <span className="ev-arrow">→</span>
                <span className="ev-dec">
                  <ClaimText claim={row.decision} />
                </span>
              </li>
            ))}
          </ol>
        </>
      );

    case "hypotheses":
      return (
        <>
          <Head scene={scene} n={n} />
          <div className="hy-hand">
            {scene.cards.map((c, k) => (
              <div key={k} className="hy-deal rv" style={{ ...i(2 + k), ["--rot" as string]: `${(k - 1) * 1.2}deg` }}>
                <CardFront rank={String(k + 1)} suit={c.suit} className="hy-card">
                  <p className="hy-body">
                    <ClaimText claim={c.belief} />
                  </p>
                </CardFront>
              </div>
            ))}
          </div>
        </>
      );

    case "decision":
      return (
        <>
          <Head scene={scene} n={n} />
          <div className="dc-board">
            {scene.options.map((o, k) => (
              <div key={o.name} className={`dc-opt rv ${o.chosen ? "is-chosen" : ""}`} style={i(2 + k)}>
                {o.chosen && (
                  <div className="dc-chip">
                    <Chip tone="gold" />
                  </div>
                )}
                <h3>{o.name}</h3>
                <p className="dc-sum">{o.summary}</p>
              </div>
            ))}
          </div>
          <p className="dc-down rv" style={i(6)}>
            <ClaimText claim={scene.downside} />
          </p>
        </>
      );

    case "timeline":
      return (
        <>
          <Head scene={scene} n={n} />
          <ol className="tl-row">
            {scene.milestones.map((ms, k) => (
              <li key={k} className={`tl-cell rv ${ms.mine ? "is-mine" : ""}`} style={i(2 + k * 0.5)}>
                <span className="tl-date">{ms.date}</span>
                <span className="tl-dot" aria-hidden="true" />
                <b className="tl-label">{ms.label}</b>
              </li>
            ))}
          </ol>
        </>
      );

    case "results":
      return (
        <>
          <Head scene={scene} n={n} />
          <div className="rs-chart rv" style={i(2)}>
            <Funnel metrics={scene.metrics} title="Hacklanta I funnel" />
          </div>
        </>
      );

    case "turn":
      return <TurnBody scene={scene} />;

    case "changes":
      return (
        <>
          <Head scene={scene} n={n} />
          <ol className="ch-list">
            {scene.changes.map((c, k) => (
              <li key={k} className="ch-row rv" style={i(2 + k)}>
                <span className="ch-n">{k + 1}</span>
                <span className="ch-c">
                  <ClaimText claim={c.change} />
                  {c.tradeoff && (
                    <span className="ch-t">
                      <ClaimText claim={c.tradeoff} />
                    </span>
                  )}
                </span>
              </li>
            ))}
          </ol>
        </>
      );

    case "rollout":
      return (
        <>
          <Head scene={scene} n={n} />
          <div className="ro-grid">
            <ol className="ro-tl">
              {scene.milestones.map((ms, k) => (
                <li key={k} className={`ro-item rv ${ms.mine ? "is-mine" : ""}`} style={i(2 + k * 0.5)}>
                  <span className="ro-date">{ms.date}</span>
                  <b>{ms.label}</b>
                </li>
              ))}
            </ol>
            <div className="ro-chart rv" style={i(5)}>
              <Funnel metrics={scene.metrics} title="Hacklanta II funnel" />
            </div>
          </div>
        </>
      );

    case "reflection":
      return (
        <>
          <Head scene={scene} n={n} />
          <ol className="rf-list">
            {scene.reflections.map((x, k) => (
              <li key={k} className="rf-row rv" style={i(2 + k)}>
                <h3>{x.title}</h3>
                <span className="rf-now">
                  <ClaimText claim={x.instead} />
                </span>
              </li>
            ))}
          </ol>
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
            <p className="cl-lesson rv" style={i(1)}>
              <ClaimText claim={scene.lesson} />
            </p>
            <p className="cl-q rv" style={i(2)}>
              Questions?
            </p>
          </div>
          <div className="cl-art rv" style={i(1)} aria-hidden="true">
            <Sticker name="dj-set" className="cl-dj" />
            <Sticker name="saturn" className="cl-saturn" />
            <Sticker name="sparkle-white" className="cl-sp1" />
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
