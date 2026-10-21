/**
 * Casino world (Hacklanta I). Markup and styling adapted from
 * hacklanta-v0@48438c5 apps/web/src/components/landing/Hero.astro
 * (poker-chip, deco-card) and TrackGrid.astro (section label pattern).
 */
import type { CSSProperties, ReactNode } from "react";

export function Chip({ tone = "red", style, className = "" }: { tone?: "red" | "gold" | "dark"; style?: CSSProperties; className?: string }) {
  return (
    <div className={`cz-chip cz-chip--${tone} ${className}`} style={style} aria-hidden="true">
      <div className="cz-chip-base">
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="cz-chip-stripe" style={{ transform: `rotate(${i * 45}deg)` }} />
        ))}
      </div>
      <div className="cz-chip-infield">
        <div className="cz-chip-ring" />
      </div>
    </div>
  );
}

export function CardBack({ style, className = "" }: { style?: CSSProperties; className?: string }) {
  return (
    <div className={`cz-card cz-card--back ${className}`} style={style} aria-hidden="true">
      <div className="cz-card-back-inner" />
    </div>
  );
}

export function CardFront({
  rank,
  suit,
  children,
  style,
  className = "",
}: {
  rank: string;
  suit: "♠" | "♥" | "♦" | "♣";
  children?: ReactNode;
  style?: CSSProperties;
  className?: string;
}) {
  const red = suit === "♥" || suit === "♦";
  return (
    <div className={`cz-card cz-card--front ${red ? "is-red" : ""} ${className}`} style={style}>
      <span className="cz-card-corner" aria-hidden="true">
        <b>{rank}</b>
        <i>{suit}</i>
      </span>
      {children}
      <span className="cz-card-corner cz-card-corner--br" aria-hidden="true">
        <b>{rank}</b>
        <i>{suit}</i>
      </span>
    </div>
  );
}

/** `[01] // LABEL` section header from the casino site. */
export function Label({ n, children }: { n: number | string; children: ReactNode }) {
  return (
    <div className="cz-label">
      <span className="cz-label-rule" />
      <span className="cz-label-n">[{String(n).padStart(2, "0")}]</span>
      <span>{children}</span>
      <span className="cz-label-rule cz-label-rule--r" />
    </div>
  );
}

export function SuitRow() {
  return (
    <div className="cz-suits" aria-hidden="true">
      <span>♠</span>
      <span className="r">♦</span>
      <span>♣</span>
      <span className="r">♥</span>
    </div>
  );
}

const SCATTER: { tone: "red" | "gold" | "dark"; x: string; y: string; r: number; s: number }[] = [
  { tone: "gold", x: "4%", y: "6%", r: -12, s: 1 },
  { tone: "dark", x: "9%", y: "20%", r: 20, s: 0.8 },
  { tone: "red", x: "88%", y: "8%", r: 8, s: 1.1 },
  { tone: "dark", x: "93%", y: "26%", r: -30, s: 0.7 },
  { tone: "red", x: "6%", y: "80%", r: 35, s: 0.9 },
  { tone: "gold", x: "90%", y: "78%", r: -6, s: 1 },
];

/** Fixed full-bleed casino environment: red radial glow, ghost suits, chips. */
export function CasinoBackdrop() {
  return (
    <div className="bd bd-casino" aria-hidden="true">
      <div className="bd-casino-glow" />
      <div className="bd-casino-gold" />
      <span className="bd-suit" style={{ left: "14%", top: "30%" }}>♠</span>
      <span className="bd-suit" style={{ left: "78%", top: "52%", fontSize: "34vh" }}>♥</span>
      {SCATTER.map((c, i) => (
        <div key={i} className="bd-chip" style={{ left: c.x, top: c.y, transform: `rotate(${c.r}deg) scale(${c.s})`, ["--i" as string]: i }}>
          <Chip tone={c.tone} />
        </div>
      ))}
      <div className="bd-vignette" />
    </div>
  );
}
