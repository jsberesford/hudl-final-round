import type { Claim } from "../content/types";
import { sourceById } from "../content/story";

/** Matches [ADD], [CONFIRM], [ADD: …], [CONFIRM]. */
export const PLACEHOLDER = /\[(?:CONFIRM|ADD)\b[^\]]*\]/g;
const TOKEN = new RegExp(`(${PLACEHOLDER.source})`, "g");
const IS_TOKEN = new RegExp(`^${PLACEHOLDER.source}$`);

/** Renders text, turning [CONFIRM: …]/[ADD: …] into visible editorial chips. */
export function Rich({ text, full = false }: { text: string; full?: boolean }) {
  const parts = text.split(TOKEN);
  return (
    <>
      {parts.map((p, i) =>
        IS_TOKEN.test(p) ? (
          full ? (
            <mark key={i} className="ph-full" data-kind={p.startsWith("[ADD") ? "add" : "confirm"}>
              {p.slice(1, -1)}
            </mark>
          ) : (
            <Placeholder key={i} token={p} />
          )
        ) : (
          p
        ),
      )}
    </>
  );
}

/** On slides, unverified wording gets a small tag. The full note is in the tooltip and ?view=report. */
function Placeholder({ token }: { token: string }) {
  const kind = token.startsWith("[ADD") ? "add" : "confirm";
  return (
    <mark className="ph" data-kind={kind} title={token.slice(1, -1)}>
      {kind === "add" ? "to add" : "confirm"}
    </mark>
  );
}

const LABEL: Record<Claim["status"], string> = {
  verified: "Verified",
  hypothesis: "Hypothesis at the time",
  retrospective: "Hindsight",
  missing: "Needs input",
};

/** A claim with its status available on hover / to screen readers. */
export function ClaimText({ claim, tag = false }: { claim: Claim; tag?: boolean }) {
  const src = claim.source ? sourceById[claim.source]?.label ?? claim.source : undefined;
  const title = `${LABEL[claim.status]}${src ? ` · ${src}` : ""}`;
  return (
    <span className="claim" data-status={claim.status} title={title}>
      {tag && claim.status !== "verified" && claim.status !== "missing" && (
        <span className="claim-tag">{LABEL[claim.status]}</span>
      )}
      <Rich text={claim.text} />
    </span>
  );
}

export function placeholderCount(value: unknown): number {
  return (JSON.stringify(value).match(PLACEHOLDER) ?? []).length;
}
