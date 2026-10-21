/**
 * Content model for the deck. Every substantive claim carries a status so
 * verified history, hypotheses, hindsight, and gaps never blur together.
 *
 * Placeholders are written inline as `[CONFIRM: ...]` or `[ADD: ...]`.
 * They render as dashed editorial chips and are counted by the
 * completeness report (?view=report).
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
  numerator?: number;
  denominator?: number;
  cohort?: string;
  source?: string;
  status: MetricStatus;
};

export type Notes = {
  /** The one thing the room must remember from this scene. */
  keyPoint: string;
  /** Suggested narration — speak it, don't read it. */
  narration: string;
  followUps: { q: string; a: string }[];
};

type SceneBase = {
  id: string;
  chapter: string;
  world: World;
  /** Short headline shown on screen. */
  title: string;
  /** The takeaway sentence. */
  takeaway: string;
  /** Planned speaking time in seconds. */
  seconds: number;
  notes: Notes;
  sources: string[];
};

export type JourneyStep = { label: string; detail: string; friction?: Claim };
export type EvidenceRow = { evidence: Claim; insight: Claim; decision: Claim };
export type Hypothesis = { suit: "♠" | "♥" | "♦" | "♣"; belief: Claim; success: Claim };
export type Option = {
  name: string;
  summary: string;
  chosen?: boolean;
  why: Claim;
  /** Qualitative criteria: label → short assessment. */
  criteria: { label: string; value: string }[];
};
export type Milestone = { date: string; label: string; detail?: Claim; mine?: boolean };
export type Change = { learning: Claim; change: Claim; effect: Claim; tradeoff?: Claim };
export type Reflection = { title: string; happened: Claim; learned: Claim; instead: Claim };

export type Scene =
  | (SceneBase & {
      layout: "opening";
      kicker: string;
      outcome: Claim;
      facts: Claim[];
    })
  | (SceneBase & {
      layout: "journey";
      user: Claim;
      steps: JourneyStep[];
      role: Claim;
      constraints: Claim[];
    })
  | (SceneBase & { layout: "evidence"; methods: Claim[]; rows: EvidenceRow[]; limits: Claim })
  | (SceneBase & {
      layout: "hypotheses";
      outcome: Claim;
      cards: Hypothesis[];
      riskiest: Claim;
    })
  | (SceneBase & { layout: "decision"; question: string; options: Option[]; downside: Claim; framing: Claim })
  | (SceneBase & { layout: "timeline"; milestones: Milestone[]; artifact: { caption: Claim; lines: string[] } })
  | (SceneBase & {
      layout: "results";
      metrics: Metric[];
      worked: Claim[];
      didnt: Claim[];
      unresolved: Claim;
    })
  | (SceneBase & { layout: "turn"; learning: Claim })
  | (SceneBase & { layout: "changes"; changes: Change[] })
  | (SceneBase & {
      layout: "rollout";
      milestones: Milestone[];
      metrics: Metric[];
      scope: Claim;
    })
  | (SceneBase & { layout: "reflection"; reflections: Reflection[]; nextTest: Claim })
  | (SceneBase & { layout: "closing"; outcome: Claim; contribution: Claim; lesson: Claim });

export type AppendixItem = {
  id: string;
  title: string;
  sections: { heading: string; claims: Claim[] }[];
};

export type Source = { id: string; label: string; ref: string };
