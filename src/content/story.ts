/**
 * THE ONE FILE TO EDIT.
 *
 * All on-screen copy, speaker notes, metrics, sources, and appendix content
 * live here. Replace `[ADD: …]` / `[CONFIRM: …]` placeholders with real facts
 * and flip the claim helper (m → v) once a fact is verified.
 *
 *   v(text, source)  verified historical fact
 *   h(text, source?) hypothesis we held at the time
 *   r(text, source?) retrospective interpretation (hindsight)
 *   m(text)          missing — needs Jared's input
 */
import type { AppendixItem, Claim, Metric, Scene, Source } from "./types";

const v = (text: string, source?: string): Claim => ({ text, status: "verified", source });
const h = (text: string, source?: string): Claim => ({ text, status: "hypothesis", source });
const r = (text: string, source?: string): Claim => ({ text, status: "retrospective", source });
const m = (text: string): Claim => ({ text, status: "missing" });

export const meta = {
  presenter: "Jared Beresford",
  role: "Vice President, progsu",
  preparedFor: "Prepared for Hudl · Product Management Intern Interview",
};

/* ------------------------------------------------------------------ sources */

export const sources: Source[] = [
  { id: "v0-schedule", label: "Hacklanta I schedule", ref: "hacklanta-v0@48438c5 apps/web/src/components/landing/Schedule.astro:229" },
  { id: "v0-og", label: "Hacklanta I OG card copy", ref: "hacklanta-v0@48438c5 apps/web/public/images/thumbnail/og-template.html:185" },
  { id: "v0-hero", label: "Hacklanta I hero (deadline extension copy)", ref: "hacklanta-v0@48438c5 apps/web/src/components/landing/Hero.astro" },
  { id: "v0-git", label: "Hacklanta I commit history", ref: "hacklanta-v0 casino-snapshot: 9f74258 (2026-02-14) → 48438c5 (2026-03-28)" },
  { id: "v0-tally", label: "Tally intake + Clerk/Supabase status flow", ref: "hacklanta-v0 commits 2026-02-21 'integrated clerk user login + tally application form flow + new user /status page'; 2026-03-21 'link clerk user id to tally app'" },
  { id: "v0-teams", label: "Team matcher + confirm attendance", ref: "hacklanta-v0 commits 2026-03-18 'basic teamfinder implementation'; 9af2dc2 (2026-03-23) 'Confirm attendance & find team'" },
  { id: "v0-recap", label: "Spring recap copy (marketing)", ref: "hacklanta-v0 upstream/recap-and-fall-teaser SpringRecap.astro:112, Participants.astro:44-51, Sponsors.astro:161" },
  { id: "ii-spec", label: "Hacklanta II v1 design spec", ref: "hacklanta-ii@4643f46 docs/superpowers/specs/2026-08-03-hacklanta-ii-design.md" },
  { id: "ii-queue", label: "Queue-position design", ref: "hacklanta-ii@4643f46 docs/superpowers/specs/2026-08-23-queue-position-design.md" },
  { id: "ii-referral", label: "Referral promotion design", ref: "hacklanta-ii@4643f46 docs/superpowers/specs/2026-08-22-referral-promotion-design.md" },
  { id: "ii-event", label: "Hacklanta II event config", ref: "hacklanta-ii@4643f46 src/content/event.ts:4-6,244" },
  { id: "ii-git", label: "Hacklanta II commit history", ref: "hacklanta-ii origin/main 9250e1f (2026-08-03) → 4643f46 (2026-10-10)" },
  { id: "ii-admin", label: "Admin dashboard doc (2,000 signup goal)", ref: "hacklanta-ii@4643f46 docs/operations/admin-dashboard.md" },
  { id: "sched", label: "Hacklanta-Scheduler (Jared's repo)", ref: "Hacklanta-Scheduler README.md; 74/81 commits by jsberesford, Aug 2026" },
  { id: "jared", label: "Confirmed by Jared (2026-10-21)", ref: "Interview prep conversation" },
];

/* ------------------------------------------------------------------ metrics */
// Leave `value` undefined until you have a real number + denominator + source.
// Charts render a labelled empty state for anything not `actual`.

const funnel = (event: "I" | "II"): Metric[] => [
  { id: `${event}-applied`, label: "Applied", definition: "Submitted a complete application", status: "pending", cohort: `Hacklanta ${event}` },
  { id: `${event}-accepted`, label: "Accepted", definition: "Received an acceptance", status: "pending", cohort: `Hacklanta ${event}` },
  { id: `${event}-confirmed`, label: "Confirmed", definition: "Confirmed attendance before the event", status: "pending", cohort: `Hacklanta ${event}` },
  { id: `${event}-checkedin`, label: "Checked in", definition: "Physically checked in on event day", status: "pending", cohort: `Hacklanta ${event}` },
  { id: `${event}-submitted`, label: "Submitted", definition: "Projects submitted for judging", status: "pending", cohort: `Hacklanta ${event}` },
];

export const metricsI = funnel("I");
export const metricsII: Metric[] = [
  {
    id: "II-goal",
    label: "Signup goal",
    definition: "Organizer target for applications (a goal, not a result)",
    value: 2000,
    unit: "applications",
    source: "ii-admin",
    status: "target",
    cohort: "Hacklanta II",
  },
  ...funnel("II"),
];

/* ------------------------------------------------------------------- scenes */

export const scenes: Scene[] = [
  {
    id: "outcome",
    layout: "opening",
    chapter: "Hacklanta I",
    world: "casino",
    title: "Hacklanta, twice.",
    kicker: "A product case study in two releases",
    takeaway: "One product, two versions, one learning loop.",
    seconds: 40,
    outcome: m("[ADD: the verified outcome I'm proudest of — one sentence with a number, denominator, and source]"),
    facts: [
      v("Mar 28 2026", "v0-schedule"),
      v("12 hours", "v0-og"),
      v("Georgia State University", "v0-schedule"),
    ],
    notes: {
      keyPoint: "Hacklanta is a product: the participant experience from first click to final demo — and I shipped it twice.",
      narration:
        "I'm Jared, VP of progsu, Georgia State's programming club. The product I want to walk you through is Hacklanta — not the website, but the whole participant experience: applying, getting in, finding a team, showing up, and shipping something. We ran it in March as a 12-hour casino-themed event, learned from it, and rebuilt it for October. [ADD: outcome sentence]. I'll take you through the problem, what we learned, the call I'd defend, and what I'd do differently.",
      followUps: [
        { q: "Why call a hackathon a product?", a: "It has users (student builders), a journey with drop-off at every step, and systems we designed and iterated — application, acceptance, teams, ops." },
      ],
    },
    sources: ["v0-schedule", "v0-og", "jared"],
  },
  {
    id: "problem",
    layout: "journey",
    chapter: "Hacklanta I",
    world: "casino",
    title: "Getting a student from curious to shipping",
    takeaway: "The event is the easy part. The path into it is where students drop.",
    seconds: 70,
    user: m("[CONFIRM: primary user — e.g. GSU students, many first-time hackers, often without a team]"),
    steps: [
      { label: "Discover", detail: "Landing page, club channels" },
      {
        label: "Apply",
        detail: "Tally form, linked to a Clerk login",
        friction: r("[CONFIRM: did applicants struggle with the separate form + login?] Inferred from II's goals: a ~4-minute application and unambiguous status.", "ii-spec"),
      },
      { label: "Wait", detail: "Status page" },
      { label: "Confirm", detail: "Confirm attendance & find team", friction: m("[ADD: evidence of drop-off between acceptance and confirmation]") },
      { label: "Team up", detail: "Team matcher in the dashboard" },
      { label: "Build", detail: "12 hours on campus" },
      { label: "Demo", detail: "Judging across 4 tracks" },
    ],
    role: v("My role: VP of progsu. I owned event direction, the participant experience, ops & volunteer scheduling, and sponsors & growth. Site engineering was led by teammates.", "jared"),
    constraints: [
      v("~4 weeks of planning (per progsu's recap)", "v0-recap"),
      v("Student volunteer team", "jared"),
      m("[ADD: budget constraint]"),
    ],
    notes: {
      keyPoint: "Primary user = the student builder. I owned the end-to-end experience; I did not write the site code.",
      narration:
        "Our primary user is a student who's curious but hasn't committed — [CONFIRM: many first-timers, many without a team]. To succeed they have to get through seven steps, and each step is a chance to drop. In Hacklanta I, applying meant a Tally form tied to a separate login, then a status page, then a confirmation step. [ADD: where you saw the biggest drop and how you knew]. My job as VP was the whole path: direction, participant experience, ops, and sponsors. Our engineers — Joey, Poorav, Liam, Arhaan — built the site; I decided what it needed to do.",
      followUps: [
        { q: "How did you know this was the right problem?", a: "[ADD: the specific signal — survey answer, drop-off count, or repeated complaint — that pointed at the application path]" },
        { q: "What did you personally own?", a: "Direction, participant experience requirements, ops/volunteer scheduling, sponsors & growth (confirmed by Jared). Engineering: Joey Zhang, Poorav Rawat, Liam Ellison, Arhaan Keshwani (commit authors)." },
      ],
    },
    sources: ["v0-tally", "v0-teams", "v0-recap", "ii-spec", "jared"],
  },
  {
    id: "research",
    layout: "evidence",
    chapter: "Hacklanta I",
    world: "casino",
    title: "What we heard after the cards were dealt",
    takeaway: "Research after I decided what II would change.",
    seconds: 80,
    methods: [
      v("Post-event participant survey", "jared"),
      v("Conversations with participants & volunteers", "jared"),
      v("Organizer retro", "jared"),
    ],
    rows: [
      {
        evidence: m("[ADD: survey finding + n respondents]"),
        insight: m("[ADD: what it told us]"),
        decision: v("In-house application, ~4 minutes, no accounts", "ii-spec"),
      },
      {
        evidence: m("[ADD: what participants / volunteers said]"),
        insight: m("[ADD: insight]"),
        decision: v("36-hour weekend instead of 12 hours", "ii-event"),
      },
      {
        evidence: m("[ADD: retro finding about ops]"),
        insight: m("[ADD: insight]"),
        decision: v("Board scheduling across a 56-hour ops window", "sched"),
      },
    ],
    limits: r("Limits: survey respondents self-select, and the people who dropped out before the event mostly never answered. The retro reflects organizers' view, not participants'. [ADD: survey response rate]"),
    notes: {
      keyPoint: "Each change in II traces back to a specific thing we heard — and I'm honest about who we didn't hear from.",
      narration:
        "After Hacklanta I we did three things: a participant survey, conversations with participants and volunteers, and an organizer retro. [ADD: the two or three findings, with numbers]. Each one maps to a decision you'll see in II. The limit I'd flag: the people we most needed to hear from — students who applied and never showed — are the least likely to answer a survey.",
      followUps: [
        { q: "How did user evidence change your decision?", a: "[ADD: one concrete before/after — what you planned before the survey, and what you did after]" },
        { q: "What was the sample size?", a: "[ADD: respondents / attendees, and how the survey was distributed]" },
      ],
    },
    sources: ["jared", "ii-spec", "ii-event", "sched"],
  },
  {
    id: "hypotheses",
    layout: "hypotheses",
    chapter: "Hacklanta I",
    world: "casino",
    title: "The bets we placed",
    takeaway: "Three beliefs, each with a way to know if we were wrong.",
    seconds: 55,
    outcome: m("[CONFIRM: desired outcome for I — e.g. 'a first-time builder can apply, team up, and ship in one day']"),
    cards: [
      {
        suit: "♠",
        belief: h("A one-day, 12-hour format lowers the bar enough for first-timers to show up. [CONFIRM: held at the time?]", "v0-og"),
        success: m("[ADD: success criterion — e.g. show-up rate of accepted applicants]"),
      },
      {
        suit: "♥",
        belief: h("A built-in team matcher gets solo applicants into teams before the day. [CONFIRM]", "v0-teams"),
        success: m("[ADD: success criterion — e.g. share of solo applicants on a team by event day]"),
      },
      {
        suit: "♦",
        belief: h("A strong theme makes a first-year event feel worth applying to. [CONFIRM]"),
        success: m("[ADD: success criterion — e.g. applications vs. goal]"),
      },
    ],
    riskiest: m("[CONFIRM: the riskiest assumption and why]"),
    notes: {
      keyPoint: "We had explicit beliefs; I can name which was riskiest and how we'd know.",
      narration:
        "Going into I, the outcome we wanted was [CONFIRM]. We were betting on three things. The riskiest was [CONFIRM], because if it was wrong, nothing downstream mattered. Success for each looked like this: [ADD].",
      followUps: [{ q: "Which was riskiest?", a: "[CONFIRM]" }],
    },
    sources: ["v0-og", "v0-teams"],
  },
  {
    id: "prioritization",
    layout: "decision",
    chapter: "Hacklanta I",
    world: "casino",
    title: "Build, borrow, or stitch?",
    takeaway: "We stitched tools together to ship in weeks, and accepted a split experience.",
    seconds: 85,
    question: "How should a participant apply, check status, and find a team?",
    framing: r("Criteria reconstructed for this interview; we didn't score options formally at the time."),
    options: [
      {
        name: "Off-the-shelf only",
        summary: "Form + Discord, nothing custom",
        why: m("[ADD: why not — e.g. no status or team matching]"),
        criteria: [
          { label: "Speed", value: "Fastest" },
          { label: "Participant clarity", value: "Low" },
          { label: "Organizer control", value: "Low" },
        ],
      },
      {
        name: "Stitched",
        summary: "Tally intake → our status page + team matcher → DevSpot submissions",
        chosen: true,
        why: v("What shipped: Tally form linked to Clerk login, our dashboard for status and teams, winners posted with DevSpot links.", "v0-tally"),
        criteria: [
          { label: "Speed", value: "Weeks" },
          { label: "Participant clarity", value: "Medium" },
          { label: "Organizer control", value: "Medium" },
        ],
      },
      {
        name: "Fully custom",
        summary: "Our own form, portal, review & check-in",
        why: m("[ADD: why not for I — e.g. 4-week timeline, engineering capacity]"),
        criteria: [
          { label: "Speed", value: "Slowest" },
          { label: "Participant clarity", value: "High" },
          { label: "Organizer control", value: "High" },
        ],
      },
    ],
    downside: r("Accepted downside: two systems and a login stitched together, so applicants crossed a seam. [CONFIRM: did that cost us?]", "v0-tally"),
    notes: {
      keyPoint: "The hardest call was speed versus a coherent experience — and we chose speed knowingly.",
      narration:
        "The decision I want to spend time on: how does a student apply, see their status, and find a team? We had three options. Off-the-shelf was fastest but gave students no status and no team matching. Fully custom was the best experience but [ADD: why not]. We stitched: Tally for intake, our own dashboard for status and teams, and DevSpot for submissions. The cost we accepted was a seam — a form in one place, a login in another. That seam is exactly what we removed in II.",
      followUps: [
        { q: "What did you choose not to do?", a: "A fully custom application and portal for I. [ADD: the reason in your own words]" },
        { q: "What would you cut with half the time?", a: "[ADD] — likely candidate: the team matcher, keeping intake + status." },
      ],
    },
    sources: ["v0-tally", "v0-teams", "v0-recap"],
  },
  {
    id: "delivery",
    layout: "timeline",
    chapter: "Hacklanta I",
    world: "casino",
    title: "Six weeks from scaffold to show day",
    takeaway: "We shipped the core path first and kept adding until the week of the event.",
    seconds: 80,
    milestones: [
      { date: "Feb 14", label: "Site scaffold + auth", detail: v("First commit", "v0-git") },
      { date: "Feb 15", label: "Admin panel", detail: v("Applicant review for organizers", "v0-git") },
      { date: "Feb 21", label: "Tally intake + status page", detail: v("Applications open path", "v0-tally") },
      { date: "Mar 17", label: "Deadline set, later extended to Mar 27", detail: m("[ADD: why we extended]"), mine: true },
      { date: "Mar 18–23", label: "Team matcher + confirm attendance", detail: v("Shipped the week of the event", "v0-teams") },
      { date: "Mar 28", label: "Show day", detail: v("12 hours at Georgia State", "v0-schedule") },
    ],
    artifact: {
      caption: v("The participant dashboard banner, shipped Mar 23", "v0-teams"),
      lines: ["$ status --me", "// application: accepted", "> Confirm attendance & find team", "> Join the Discord"],
    },
    notes: {
      keyPoint: "We sequenced the core path first; the setback was a deadline extension; team matching landed late.",
      narration:
        "We started on February 14th. Within a week we had the admin panel and the intake path. The setback: [ADD: why we extended the deadline to March 27]. My part was [ADD: your concrete actions — e.g. deciding the extension, running comms, recruiting judges]. Team matching and attendance confirmation shipped the week of the event, which in hindsight was too late for many students to use.",
      followUps: [{ q: "What failed, and how did you respond?", a: "[ADD: the deadline extension story]" }],
    },
    sources: ["v0-git", "v0-tally", "v0-teams", "v0-hero"],
  },
  {
    id: "results-i",
    layout: "results",
    chapter: "Hacklanta I",
    world: "casino",
    title: "What actually happened",
    takeaway: "It worked. [CONFIRM: the unresolved problem we carried forward]",
    seconds: 80,
    metrics: metricsI,
    worked: [
      v("Projects judged and winners announced across 4 tracks (e.g. People's Choice: PulseRoute)", "v0-recap"),
      m("[ADD: what improved / what participants valued]"),
    ],
    didnt: [m("[ADD: what didn't work — with evidence]")],
    unresolved: m("[CONFIRM: the one unresolved problem that motivated II]"),
    notes: {
      keyPoint: "Real signals, honest limits, and one unresolved problem.",
      narration:
        "Here's what we know. [ADD funnel numbers]. What worked: [ADD]. What didn't: [ADD]. My confidence is limited by [ADD: e.g. no tracking between application and confirmation]. The problem we carried forward was [CONFIRM].",
      followUps: [
        { q: "What would have happened without this change?", a: "[ADD]" },
        { q: "Which alternative explanation could account for the result?", a: "[ADD — e.g. first-ever event novelty, timing in the semester]" },
      ],
    },
    sources: ["v0-recap"],
  },
  {
    id: "turn",
    layout: "turn",
    chapter: "I → II",
    world: "festival",
    title: "Same product. New hand.",
    takeaway: "What we learned set what we changed.",
    seconds: 20,
    learning: m("[CONFIRM: the single learning that motivated II — e.g. 'The event worked. The path into it didn't scale.']"),
    notes: {
      keyPoint: "This is the pivot: one learning drives everything in II.",
      narration: "[CONFIRM learning]. So for II we kept the product — the student builder's path — and changed how it worked.",
      followUps: [],
    },
    sources: ["jared"],
  },
  {
    id: "changes",
    layout: "changes",
    chapter: "Hacklanta II",
    world: "festival",
    title: "Three changes, each traced to I",
    takeaway: "Every change answers something we learned, with a cost we chose.",
    seconds: 95,
    changes: [
      {
        learning: m("[CONFIRM: what I taught us about applying]"),
        change: v("A ~4-minute application on the festival pass itself — no account, unambiguous submission status", "ii-spec"),
        effect: h("More completed applications, fewer 'did it go through?' questions", "ii-spec"),
      },
      {
        learning: m("[CONFIRM: what I taught us about reach]"),
        change: v("$1 referral for every student who applies through your link, plus a shareable queue ticket", "ii-referral"),
        effect: h("Applicants recruit applicants; worst-case cost ≈ the 2,000 signup goal in dollars", "ii-referral"),
        tradeoff: v("We refused to show '600 people applied' as social proof. A fake count is a false statement made while offering money.", "ii-queue"),
      },
      {
        learning: m("[CONFIRM: what the retro taught us about staffing]"),
        change: v("I built Hacklanta-Scheduler: availability, coverage, conflicts, max hours, and breaks across a 56-hour ops window", "sched"),
        effect: h("No uncovered shifts, no burned-out board members overnight", "sched"),
      },
    ],
    notes: {
      keyPoint: "Each change is learning → change → expected effect, and the referral one shows a tradeoff I'd defend.",
      narration:
        "Three changes. First, the application moved onto the festival pass itself — about four minutes, no account. Second, growth: a dollar for every student who applies through your link. The tradeoff I want to call out: we could have shown a live 'X people applied' counter. We chose not to fake social proof on a page that's offering people money; instead we showed each applicant their own queue number. Third, a 36-hour event needs 56 hours of staffing, so I built a scheduler for the board.",
      followUps: [
        { q: "Why pay per referral? Isn't that risky?", a: "Spec states no cap; worst case ≈ $2,000 at the signup goal (ii-referral). [ADD: actual referral spend and applicants via referral]" },
        { q: "Did you write the scheduler?", a: "Yes — Hacklanta-Scheduler, 74 of 81 commits are mine (Aug 2026). [CONFIRM: was it used on event weekend?]" },
      ],
    },
    sources: ["ii-spec", "ii-referral", "ii-queue", "sched"],
  },
  {
    id: "rollout-ii",
    layout: "rollout",
    chapter: "Hacklanta II",
    world: "festival",
    title: "What shipped, and what we can prove",
    takeaway: "We shipped more than v1 planned. The numbers are what tell us if it worked.",
    seconds: 95,
    milestones: [
      { date: "Aug 3", label: "v1 spec approved", detail: v("Festival credential + application", "ii-spec") },
      { date: "Aug 15", label: "Board scheduler", detail: v("My scheduling tool", "sched"), mine: true },
      { date: "Aug 19–23", label: "Referrals + queue ticket", detail: v("Growth loop", "ii-git") },
      { date: "Sep 7", label: "Team finder", detail: v("Was a v1 non-goal", "ii-git") },
      { date: "Sep 28", label: "Batch review + waitlist", detail: v("Acceptance ops", "ii-git") },
      { date: "Oct 9–11", label: "Show weekend", detail: v("36 hours at Georgia State", "ii-event") },
    ],
    metrics: metricsII,
    scope: v("Scope grew: team finder, referrals, and an organizer dashboard were all v1 non-goals, and all shipped.", "ii-spec"),
    notes: {
      keyPoint: "Execution was fast, scope grew, and I separate targets from results.",
      narration:
        "We approved the spec August 3rd and shipped in waves: application, then referrals, then the team finder and review tooling. Scope grew — three things we'd explicitly called non-goals got built. [ADD: why]. On results: our goal was 2,000 signups — that's a target, not a result. [ADD: actual applications, acceptances, check-ins, projects with sources]. I'll only compare to I where the definitions match.",
      followUps: [
        { q: "Was the growth in scope a mistake?", a: "[ADD your view] — see reflection 2." },
        { q: "What would you measure earlier next time?", a: "The full funnel by step with a dated snapshot, defined before launch." },
      ],
    },
    sources: ["ii-spec", "ii-git", "ii-admin", "ii-event", "sched"],
  },
  {
    id: "differently",
    layout: "reflection",
    chapter: "Hacklanta II",
    world: "festival",
    title: "What I'd do differently",
    takeaway: "Measure the path, guard scope, test the risky bet small.",
    seconds: 80,
    reflections: [
      {
        title: "Instrument before launch",
        happened: r("For I, I can't show a clean funnel from application to check-in. [CONFIRM]"),
        learned: r("Without it I can't prove II's changes worked."),
        instead: r("Define the funnel and take dated snapshots before opening applications."),
      },
      {
        title: "Re-plan when scope grows",
        happened: v("Three v1 non-goals shipped anyway.", "ii-spec"),
        learned: r("Each was reasonable alone; together they pulled time from [ADD]."),
        instead: r("Put every added feature through the same check: what does it move, and what does it displace?"),
      },
      {
        title: "Pilot the risky bet",
        happened: v("Referral payouts launched uncapped.", "ii-referral"),
        learned: r("[ADD: what referral data showed]"),
        instead: r("Run a capped pilot for a week, then scale only if cost per applicant beats paid alternatives."),
      },
    ],
    nextTest: r("Next test: [ADD — e.g. compare show-up rate of referred vs. organic applicants]"),
    notes: {
      keyPoint: "Specific mistakes, specific alternatives, and a decision rule.",
      narration:
        "Three things I'd change. First, I'd instrument the funnel before launch; right now I can't show you cleanly where students dropped in I. Second, scope: three non-goals shipped in II. Each one made sense alone, but I'd make every addition answer what it moves and what it pushes out. Third, the referral bet: I'd pilot it capped for a week before scaling.",
      followUps: [{ q: "What would you measure earlier?", a: "Step conversion: applied → accepted → confirmed → checked in → submitted, with dated snapshots." }],
    },
    sources: ["ii-spec", "ii-referral"],
  },
  {
    id: "close",
    layout: "closing",
    chapter: "Hacklanta II",
    world: "festival",
    title: "Ship it, learn from it, change it on purpose.",
    takeaway: "The transferable skill: tie every change to evidence and name its cost.",
    seconds: 60,
    outcome: m("[ADD: the verified outcome, restated]"),
    contribution: v("I set the direction, owned the participant path and ops, and shipped two versions six months apart.", "jared"),
    lesson: r("Tie every change to evidence, name what it costs, and measure it before you launch."),
    notes: {
      keyPoint: "Return to the outcome, my contribution, and one transferable lesson. Then invite questions.",
      narration:
        "To bring it back: [ADD outcome]. My contribution was the direction, the participant path, and the operations behind it, across two versions six months apart. The lesson I'd bring to Hudl: tie every change to evidence, name its cost, and measure before launch. I'd love to take your questions — I've got the detail behind each decision in an appendix.",
      followUps: [],
    },
    sources: ["jared"],
  },
];

/* ----------------------------------------------------------------- appendix */

export const appendix: AppendixItem[] = [
  {
    id: "a-role",
    title: "Role & decision boundaries",
    sections: [
      { heading: "I owned", claims: [v("Event direction; participant experience requirements; ops & volunteer scheduling; sponsors & growth", "jared"), v("Hacklanta-Scheduler (74 of 81 commits)", "sched")] },
      { heading: "Team delivered", claims: [v("Hacklanta I site: Joey Zhang, Poorav Rawat, Liam Ellison, Arhaan Keshwani (commit authors)", "v0-git"), v("Hacklanta II site: John Sang, Joey Zhang, Liam Ellison, Poorav Rawat (commit authors)", "ii-git")] },
      { heading: "Decision authority", claims: [m("[CONFIRM: which calls were mine alone vs. made with the president / c-suite]")] },
    ],
  },
  {
    id: "a-research",
    title: "Research methods & limits",
    sections: [
      { heading: "Methods", claims: [v("Post-event survey, conversations, organizer retro", "jared"), m("[ADD: survey questions, n, response rate, dates]")] },
      { heading: "Artifacts", claims: [m("[ADD: link or screenshot of survey results / retro doc]")] },
      { heading: "Limits", claims: [r("Non-attendees are under-represented; retro reflects organizer view.")] },
    ],
  },
  {
    id: "a-priorities",
    title: "Alternatives we rejected",
    sections: [
      { heading: "Hacklanta I", claims: [m("[ADD: why not fully custom for I]"), m("[ADD: why not off-the-shelf only]")] },
      { heading: "Hacklanta II", claims: [v("Rejected a public 'X people applied' counter in favour of a personal queue number", "ii-queue"), v("v1 non-goals: accounts/status portal, organizer dashboard, referrals, team finder, RSVP collection", "ii-spec")] },
    ],
  },
  {
    id: "a-metrics",
    title: "Metric definitions & caveats",
    sections: [
      { heading: "Funnel definitions", claims: metricsI.map((x) => v(`${x.label}: ${x.definition}`)) },
      { heading: "Not outcome data", claims: [r("'1,000+ students' on the live site is marketing copy, not applications or attendance."), r("Recap sponsor amounts and prize amounts are not revenue metrics.")] },
      { heading: "Comparability", claims: [r("I (12 hours, one day) and II (36 hours, weekend) differ in format; compare step conversion rates, not raw counts.")] },
    ],
  },
  {
    id: "a-rollout",
    title: "Rollout detail & an execution challenge",
    sections: [
      { heading: "Hacklanta I", claims: [v("Deadline extended to Mar 27", "v0-hero"), m("[ADD: the reason and how it was communicated]")] },
      { heading: "Hacklanta II", claims: [v("Launch runbook written Aug 4", "ii-git"), m("[ADD: the hardest execution moment on event weekend]")] },
    ],
  },
  {
    id: "a-delta",
    title: "Hacklanta I vs. II",
    sections: [
      { heading: "Format", claims: [v("I: 12 hours, Mar 28", "v0-og"), v("II: 36 hours, Oct 9–11", "ii-event")] },
      { heading: "Application", claims: [v("I: Tally form + Clerk login + status page", "v0-tally"), v("II: in-house ~4-minute application on the credential, no accounts", "ii-spec")] },
      { heading: "Growth", claims: [v("II: $1 referrals, queue ticket, share ticket, Discord signup webhook", "ii-git")] },
      { heading: "Ops", claims: [v("II: batch review + waitlist, board scheduler for 56-hour window", "sched")] },
      { heading: "Identity", claims: [v("I: casino. II: music festival, with the pass as the main interface.", "ii-spec")] },
    ],
  },
  {
    id: "a-next",
    title: "What didn't work & what I'd test next",
    sections: [
      { heading: "Didn't work", claims: [m("[ADD]")] },
      { heading: "Next tests", claims: [r("Referred vs. organic show-up rate"), r("Capped referral pilot vs. paid campus promotion, cost per checked-in builder")] },
    ],
  },
];

export const sourceById = Object.fromEntries(sources.map((s) => [s.id, s]));
