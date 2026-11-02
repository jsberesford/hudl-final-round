/**
 * Content model for the deck. Every substantive claim carries a status so
 * verified history, hypotheses, hindsight, and gaps never blur together.
 *
 * Unverified wording carries an inline `[CONFIRM: note]` or `[ADD: note]`.
 * These render as small tags on the slide and are listed at ?view=report.
 */

export type ClaimStatus =
  | "verified" // supported by a cited source or confirmed by Jared
  | "hypothesis" // what we believed before acting
  | "retrospective" // what I think the evidence means now
  | "missing"; // still needs a fact, number, or confirmation

export type World = "casino" | "festival";

export type Claim = {
  text: string;
  status: ClaimStatus;
  /** Source ID from `sources` in story.ts, or a free-text citation. */
  source?: string;
};

export type MetricStatus = "actual" | "target" | "pending";

export type Metric = {
  id: string;
  label: string;
  /** Plain-language definition, e.g. "submitted a complete application". */
  definition: string;
  value?: number;
  unit?: string;
  cohort?: string;
  source?: string;
  status: MetricStatus;
};

export type Notes = {
  /** The one thing the room must remember from this scene. */
  keyPoint: string;
  /** Suggested explanation. Edit into your own voice. */
  narration: string;
  /** Line that hands off to the next slide. */
  transition?: string;
  /** Evidence limit to keep in mind while speaking. */
  caveat?: string;
  followUps: { q: string; a: string }[];
};

type SceneBase = {
  id: string;
  chapter: string;
  world: World;
  /** The PM activity this scene demonstrates. */
  lens: string;
  /** Assertion headline shown on screen. */
  title: string;
  /** Optional single takeaway under the headline. */
  takeaway?: string;
  /** Planned speaking time in seconds. */
  seconds: number;
  notes: Notes;
  sources: string[];
};

export type JourneyStep = { label: string; system: string; note?: Claim; kind?: "Observed" | "Hypothesis" };
export type EvidenceRow = { signal: Claim; meaning: Claim; decision: Claim };
export type Hypothesis = { suit: "♠" | "♥" | "♦" | "♣"; belief: Claim; because: Claim; expected: Claim; riskiest?: boolean };
export type Option = { name: string; summary: string; chosen?: boolean; values: string[] };
export type Milestone = { date: string; label: string; late?: boolean };
export type Change = { name: string; learning: Claim; decision: Claim; expected: Claim; tradeoff: Claim };
export type Reflection = { title: string; happened: Claim; learned: Claim; instead: Claim };

export type Scene =
  | (SceneBase & { layout: "opening"; subtitle: string; kicker: string; releases: { name: string; identity: string; facts: string[] }[] })
  | (SceneBase & { layout: "journey"; user: Claim; role: Claim; steps: JourneyStep[] })
  | (SceneBase & { layout: "evidence"; methods: Claim[]; rows: EvidenceRow[]; limits: Claim })
  | (SceneBase & { layout: "hypotheses"; outcome: Claim; cards: Hypothesis[]; framing: Claim })
  | (SceneBase & { layout: "decision"; criteria: string[]; options: Option[]; downside: Claim; framing: Claim })
  | (SceneBase & { layout: "timeline"; milestones: Milestone[]; challenge: Claim; why: Claim; learned: Claim; owners: Claim })
  | (SceneBase & { layout: "results"; metrics: Metric[]; worked: Claim; didnt: Claim; carried: Claim })
  | (SceneBase & { layout: "turn"; learning: Claim })
  | (SceneBase & { layout: "changes"; changes: Change[] })
  | (SceneBase & { layout: "product"; shots: { src: string; alt: string; name: string; caption: string; credit: string }[] })
  | (SceneBase & { layout: "rollout"; days: { date: string; count: number }[]; window: { from: string; to: string; label: string }; stats: { value: string; label: string; source: string }[]; scope: Claim; cannot: Claim })
  | (SceneBase & { layout: "reflection"; reflections: Reflection[] })
  | (SceneBase & { layout: "closing"; lesson: string; principles: { name: string; detail: string }[] });

export type AppendixItem = {
  id: string;
  title: string;
  sections: { heading: string; claims: Claim[] }[];
};

export type Source = { id: string; label: string; ref: string };
