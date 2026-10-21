/**
 * Festival world (Hacklanta II). Ribbon geometry, stroke stack, and spectrum
 * gradient copied from hacklanta-ii@4643f46 src/components/galaxy/galaxy.tsx.
 * Pass styling adapted from src/components/credential/credential.module.css
 * (rainbow conic border, slot, prong). The physics lanyard (r3f + Rapier) is
 * replaced by a CSS strap so the deck has no WebGL dependency.
 */
import type { CSSProperties, ReactNode } from "react";

const RIBBON_PATHS = [
  "M-170 130 C130 -55 350 300 630 130 S1080 15 1340 185 S1600 280 1770 80",
  "M-170 570 C90 360 350 795 675 550 S1120 365 1390 620 S1630 760 1770 535",
  "M-190 980 C125 735 420 1110 750 850 S1220 725 1480 930 S1670 1070 1790 845",
];
const RIBBON_STROKES = [
  { stroke: "#0077ff", width: 205, opacity: 0.58, glow: true },
  { stroke: "#058cff", width: 142, opacity: 0.92 },
  { stroke: "url(#fz-spectrum)", width: 102, opacity: 1 },
  { stroke: "#ff4c54", width: 35, opacity: 0.88 },
];

export function Ribbons({ className = "" }: { className?: string }) {
  return (
    <svg className={`fz-ribbons ${className}`} viewBox="0 0 1600 1000" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <defs>
        <linearGradient id="fz-spectrum" x1="0" x2="1" y1="0" y2="0">
          <stop offset="0" stopColor="#058cff" />
          <stop offset=".2" stopColor="#21e6d7" />
          <stop offset=".38" stopColor="#f6ce28" />
          <stop offset=".58" stopColor="#ff7a1a" />
          <stop offset=".77" stopColor="#ff316f" />
          <stop offset="1" stopColor="#0878ff" />
        </linearGradient>
        <filter id="fz-glow" x="-20%" y="-50%" width="140%" height="200%">
          <feGaussianBlur stdDeviation="22" />
        </filter>
      </defs>
      {RIBBON_PATHS.map((d, ri) => (
        <g key={ri} className="fz-ribbon" style={{ ["--ri" as string]: ri }}>
          {RIBBON_STROKES.map((s, si) => (
            <path
              key={si}
              d={d}
              pathLength={1}
              fill="none"
              stroke={s.stroke}
              strokeWidth={s.width}
              strokeOpacity={s.opacity}
              strokeLinecap="round"
              filter={s.glow ? "url(#fz-glow)" : undefined}
            />
          ))}
        </g>
      ))}
    </svg>
  );
}

export function FestivalBackdrop() {
  return (
    <div className="bd bd-festival" aria-hidden="true">
      <div className="bd-stars" />
      {/* wipe = two counter-translated wrappers: a reveal done purely with transforms */}
      <div className="fz-wipe">
        <div className="fz-wipe-inner">
          <Ribbons />
        </div>
        <div className="fz-wipe-edge" />
      </div>
      <div className="bd-festival-shade" />
    </div>
  );
}

export function Sticker({ name, style, className = "" }: { name: string; style?: CSSProperties; className?: string }) {
  return <img className={`fz-sticker ${className}`} src={`/assets/festival/${name}.png`} alt="" style={style} draggable={false} />;
}

/** The festival credential, hung from a strap. `children` fills the face. */
export function Pass({ children, strap = true, className = "", style }: { children?: ReactNode; strap?: boolean; className?: string; style?: CSSProperties }) {
  return (
    <div className={`fz-pass-wrap ${className}`} style={style}>
      {strap && (
        <div className="fz-strap" aria-hidden="true">
          <span>HACKLANTA '26 · HACKLANTA '26 · HACKLANTA '26</span>
        </div>
      )}
      <div className="fz-pass">
        <div className="fz-pass-slot" aria-hidden="true" />
        <div className="fz-pass-prong" aria-hidden="true" />
        {children}
      </div>
    </div>
  );
}

export function PassFace() {
  return (
    <div className="fz-face">
      <div className="fz-face-top">HACKLANTA '26</div>
      <img className="fz-face-logo" src="/assets/festival/hacklanta2_logo_white.png" alt="hacklanta '26" />
      <div className="fz-face-dashes" aria-hidden="true">
        <i /><i /><i /><i /><i />
      </div>
      <dl className="fz-tiles">
        <div style={{ ["--c" as string]: "var(--fz-lime)" }}><dt>Dates</dt><dd>Oct 9–11</dd></div>
        <div style={{ ["--c" as string]: "#9b6ee8" }}><dt>City</dt><dd>ATL</dd></div>
        <div style={{ ["--c" as string]: "var(--fz-cyan)" }}><dt>Duration</dt><dd>36 hours</dd></div>
        <div style={{ ["--c" as string]: "var(--fz-orange)" }}><dt>Version</dt><dd>II</dd></div>
      </dl>
    </div>
  );
}
