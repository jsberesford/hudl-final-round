/**
 * THE ONE FILE TO EDIT.
 *
 * All on-screen copy, speaker notes, metrics, sources, and appendix content
 * live here. Unverified wording carries an inline [CONFIRM: note] or [ADD: note],
 * which renders as a small tag. Remove the tag once the fact is confirmed.
 *
 *   v(text, source)  verified historical fact
 *   h(text, source?) hypothesis we held at the time
 *   r(text, source?) retrospective interpretation (hindsight)
 *   m(text)          unconfirmed, needs Jared's input
 */
import type { AppendixItem, Claim, Metric, Scene, Source } from "./types";

const v = (text: string, source?: string): Claim => ({ text, status: "verified", source });
const h = (text: string, source?: string): Claim => ({ text, status: "hypothesis", source });
const r = (text: string, source?: string): Claim => ({ text, status: "retrospective", source });
const m = (text: string): Claim => ({ text, status: "missing" });

export const meta = {
  presenter: "Jared Beresford",
  role: "Vice President, PROGSU",
  preparedFor: "Prepared for Hudl",
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
  { id: "applicants", label: "Hacklanta II applicant export", ref: "hacklanta-applicants.csv, 391 unique receipts, Aug 5 to Sep 7 2026. Aggregates only, kept out of the repo" },
  { id: "wayback", label: "Hacklanta I site capture", ref: "Internet Archive capture of hacklanta.dev, March 29 2026" },
  { id: "live-ii", label: "Hacklanta II application capture", ref: "hacklanta.dev, captured November 2 2026, blank form" },
  { id: "jared", label: "Confirmed by Jared (2026-10-21)", ref: "Interview prep conversation" },
];

/* ------------------------------------------------------------------ metrics */
// Leave `value` undefined until you have a real number, a definition, and a source.
// Anything not `actual` renders as "Pending". Never enter an unverified number.

const funnel = (event: "I" | "II"): Metric[] => [
  { id: `${event}-applied`, label: "Applied", definition: "Submitted a complete application", status: "pending", cohort: `Hacklanta ${event}` },
  { id: `${event}-accepted`, label: "Accepted", definition: "Received an acceptance", status: "pending", cohort: `Hacklanta ${event}` },
  { id: `${event}-confirmed`, label: "Confirmed", definition: "Confirmed attendance before the event", status: "pending", cohort: `Hacklanta ${event}` },
  { id: `${event}-checkedin`, label: "Checked in", definition: "Physically checked in on event day", status: "pending", cohort: `Hacklanta ${event}` },
];
const projects = (event: "I" | "II"): Metric => ({ id: `${event}-submitted`, label: "Projects submitted", definition: "Projects submitted for judging (counts projects, not people)", status: "pending", cohort: `Hacklanta ${event}` });

export const metricsI = funnel("I");
export const metricsII = funnel("II");

/** Applications per day from the export, drawn to scale on the outcomes slide. */
export const applicationsByDay: { date: string; count: number }[] = (
  [["Aug 5",14],["Aug 6",21],["Aug 7",9],["Aug 8",5],["Aug 9",3],["Aug 10",13],["Aug 11",10],["Aug 12",0],["Aug 13",5],["Aug 14",2],["Aug 15",4],["Aug 16",2],["Aug 17",4],["Aug 18",2],
   ["Aug 19",3],["Aug 20",4],["Aug 21",9],["Aug 22",10],["Aug 23",26],
   ["Aug 24",26],["Aug 25",32],["Aug 26",13],["Aug 27",34],["Aug 28",5],["Aug 29",4],["Aug 30",2],["Aug 31",25],["Sep 1",25],["Sep 2",32],["Sep 3",18],["Sep 4",9],["Sep 5",10],["Sep 6",9]] as [string, number][]
).map(([date, count]) => ({ date, count }));

/* ------------------------------------------------------------------- scenes */

export const scenes: Scene[] = [
  {
    id: "outcome",
    layout: "opening",
    lens: "Case overview",
    chapter: "Cover",
    world: "casino",
    title: "Hacklanta",
    subtitle: "One product. Two releases. One learning loop.",
    kicker: "Product management case study for Hudl",
    seconds: 30,
    releases: [
      { name: "Hacklanta I", identity: "Casino", facts: ["March 28, 2026", "12 hours"] },
      { name: "Hacklanta II", identity: "Music festival", facts: ["October 9 to 11, 2026", "36 hours"] },
    ],
    notes: {
      keyPoint: "I am treating the whole participant experience as the product, and I shipped it twice.",
      narration: "I'm Jared, VP of PROGSU, Georgia State's programming club. The product here isn't a website. It's the whole path a student takes, from applying to showing up and shipping something. We ran it in March as a 12-hour casino-themed event, learned from it, and rebuilt it for October.",
      transition: "Let me start with who this was for and where it got hard.",
      caveat: "No headline metric on the cover until the numbers are verified.",
      followUps: [{ q: "Why call a hackathon a product?", a: "It has users, a journey with drop-off risk at each step, and systems we designed and changed between versions." }],
    },
    sources: ["v0-schedule", "v0-og", "ii-event", "jared"],
  },
  {
    id: "problem",
    layout: "journey",
    lens: "User problem",
    chapter: "Hacklanta I",
    world: "casino",
    title: "The journey crossed too many systems",
    seconds: 90,
    user: v("Students deciding whether to try a hackathon. In the Hacklanta II export, 73% applied without a team.", "applicants"),
    role: v("I owned direction, participant experience, operations, and sponsors. Teammates engineered the site.", "jared"),
    steps: [
      { label: "Discover", system: "Landing page, club channels" },
      { label: "Apply", system: "Tally form + Clerk login", kind: "Observed", note: v("The form and the login were separate systems.", "v0-tally") },
      { label: "Confirm", system: "Status page", kind: "Hypothesis", note: h("Students may drop between acceptance and attendance.") },
      { label: "Team up", system: "Dashboard matcher" },
      { label: "Show up", system: "On campus, 12 hours" },
    ],
    notes: {
      keyPoint: "The primary user is the student builder. I owned the end-to-end experience, and I did not write the site code.",
      narration: "Our primary user is a student who is curious but hasn't committed. To get from curious to on campus, a student moved through a landing page, a Tally form, a separate login, a status page, and a team matcher. The two highlighted stages are where I'd look first. The seam at Apply is a fact about what we built. The drop-off after acceptance is a hypothesis, and I'll be careful about that. My job was the whole path. Joey, Poorav, Liam, and Arhaan built the site. I decided what it needed to do.",
      transition: "After the event, we went and asked where this broke down.",
      caveat: "Friction at Apply is a fact about the design. Whether it cost us applicants is unconfirmed.",
      followUps: [
        { q: "How did you know this was the right problem?", a: "[ADD: the specific signal in your own words]" },
        { q: "What did you personally own?", a: "Direction, participant experience requirements, ops and volunteer scheduling, sponsors and growth. Engineering: Joey Zhang, Poorav Rawat, Liam Ellison, Arhaan Keshwani (commit authors)." },
      ],
    },
    sources: ["v0-tally", "v0-teams", "ii-spec", "jared"],
  },
  {
    id: "research",
    layout: "evidence",
    lens: "User research",
    chapter: "Hacklanta I",
    world: "casino",
    title: "What we heard changed what we built",
    seconds: 80,
    methods: [v("Post-event participant survey", "jared"), v("Participant and volunteer conversations", "jared"), v("Organizer retro", "jared")],
    rows: [
      {
        signal: m("Friction between the form and the login"),
        meaning: r("Two systems to apply was one too many."),
        decision: v("In-house application, about 4 minutes, no account", "ii-spec"),
      },
      {
        signal: m("Limited time to build"),
        meaning: r("12 hours is short for a first project."),
        decision: v("36-hour weekend instead of 12 hours", "ii-event"),
      },
      {
        signal: m("Volunteer shifts were coordinated ad hoc"),
        meaning: r("A longer event needs planned coverage."),
        decision: v("Scheduling tool for a 56-hour ops window", "sched"),
      },
    ],
    limits: r("Limit: students who dropped out are the least likely to answer a survey."),
    notes: {
      keyPoint: "Each change in II traces back to something specific we heard, and I can name who we did not hear from.",
      narration: "We ran three inputs: a survey, conversations with participants and volunteers, and an organizer retro. Read this left to right. A signal, what we took it to mean, and the decision it led to. The limit I'd flag is that the students we most needed to hear from, the ones who applied and never came, are the least likely to fill out a survey.",
      transition: "But before any of that, we went into the first event with some beliefs.",
      caveat: "No sample sizes on this slide until confirmed. Say if a finding is reconstructed from memory or notes.",
      followUps: [
        { q: "How did user evidence change your decision?", a: "[ADD: one real before and after]" },
        { q: "What was the sample size?", a: "[ADD: respondents, attendees, how the survey was sent]" },
      ],
    },
    sources: ["jared", "ii-spec", "ii-event", "sched"],
  },
  {
    id: "hypotheses",
    layout: "hypotheses",
    lens: "Goal and hypotheses",
    chapter: "Hacklanta I",
    world: "casino",
    title: "The bets we placed",
    seconds: 55,
    outcome: r("A first-timer can apply, find a team, and ship something in one day."),
    framing: r("Reconstructed for this interview. These checks were not launch targets at the time."),
    cards: [
      { suit: "♠", belief: h("one 12-hour day was a small enough ask", "v0-og"), because: r("first-timers won't commit a whole weekend"), expected: r("Most accepted students check in") },
      { suit: "♥", belief: h("a team matcher would place solo applicants", "v0-teams"), because: r("many would arrive without a team"), expected: r("Solo applicants on teams by event day"), riskiest: true },
      { suit: "♦", belief: h("a bold theme would make a first-year event worth applying to"), because: r("we had no track record yet"), expected: r("Applications meet our goal") },
    ],
    notes: {
      keyPoint: "We had beliefs we could have tested. I separate what we believed then from how I evaluate it now.",
      narration: "Our outcome was simple: a first-timer can apply, team up, and ship in one day. We were betting on three things. I want to be clear that we didn't write formal hypotheses at the time. This is me writing down what we were implicitly betting on. In hindsight the riskiest was the team matcher, because it shipped last and solo first-timers depended on it.",
      transition: "One of those bets shaped our biggest build decision.",
      caveat: "Confirm you held these beliefs before the event. If not, say so out loud.",
      followUps: [{ q: "Which was riskiest?", a: "[CONFIRM: team matcher is my suggested reading, replace it if wrong]" }],
    },
    sources: ["v0-og", "v0-teams"],
  },
  {
    id: "prioritization",
    layout: "decision",
    lens: "Prioritization",
    chapter: "Hacklanta I",
    world: "casino",
    title: "We chose speed, knowing it would create friction",
    seconds: 100,
    criteria: ["Time to ship", "Participant clarity", "Organizer control", "Engineering effort"],
    options: [
      { name: "Off-the-shelf", summary: "A form and a Discord", values: ["Fastest", "Low", "Low", "Lowest"] },
      { name: "Stitched", summary: "Tally, our dashboard, DevSpot", chosen: true, values: ["Weeks", "Medium", "Medium", "Moderate"] },
      { name: "Fully custom", summary: "Our own form, portal, check-in", values: ["Slowest", "High", "High", "Highest"] },
    ],
    downside: r("Applicants crossed a seam between two systems.", "v0-tally"),
    framing: r("Criteria reconstructed for this interview. We did not score options formally at the time."),
    notes: {
      keyPoint: "The hardest call was speed versus a coherent experience, and we chose speed knowingly.",
      narration: "How should a student apply, check status, and find a team? Off-the-shelf was fastest but gave students no status and no matching. Fully custom was the best experience, but it was the most to build. We stitched: Tally for intake, our dashboard for status and teams, DevSpot for submissions. The cost was a seam, a form in one place and a login in another. That's exactly what we removed in II.",
      transition: "So how did shipping that actually go?",
      caveat: "Be upfront that this matrix is reconstructed. The ratings are qualitative.",
      followUps: [
        { q: "What did you choose not to do?", a: "A fully custom application and portal for I. [ADD: the reason in your own words]" },
        { q: "What would you cut with half the time?", a: "[ADD: your answer. The team matcher is one candidate.]" },
      ],
    },
    sources: ["v0-tally", "v0-teams", "v0-recap"],
  },
  {
    id: "delivery",
    layout: "timeline",
    lens: "Execution",
    chapter: "Hacklanta I",
    world: "casino",
    title: "The core path shipped first. Team tools came late.",
    seconds: 85,
    milestones: [
      { date: "Feb 14", label: "Site and auth" },
      { date: "Feb 21", label: "Application and status" },
      { date: "Mar 17", label: "Deadline set, later moved to Mar 27" },
      { date: "Mar 18–23", label: "Team matching, attendance", late: true },
      { date: "Mar 28", label: "Event day" },
    ],
    challenge: v("Team matching and attendance confirmation shipped 5 to 10 days before the event.", "v0-teams"),
    why: r("Solo applicants had little time to use them."),
    learned: r("Build the steps students depend on earlier."),
    owners: v("Me: direction, participant experience, ops, sponsors. Engineering: Joey Zhang, Poorav Rawat, Liam Ellison, Arhaan Keshwani.", "jared"),
    notes: {
      keyPoint: "We sequenced the core path first, and the team tools landed late.",
      narration: "First commit was February 14. Within a week we had intake and status. The timeline is drawn to scale, so you can see the long gap and then the crunch. Team matching and attendance confirmation shipped 5 to 10 days out. That matters because those were the tools a solo first-timer needed most.",
      transition: "Here's what we can say about how it turned out.",
      caveat: "Commits span about six weeks. PROGSU's recap says about four weeks of planning. They measure different things, so don't mix them up.",
      followUps: [{ q: "What failed, and how did you respond?", a: "[ADD: the real deadline extension story: why, who decided, how it was communicated]" }],
    },
    sources: ["v0-git", "v0-tally", "v0-teams", "v0-hero", "jared"],
  },
  {
    id: "results-i",
    layout: "results",
    lens: "Results",
    chapter: "Hacklanta I",
    world: "casino",
    title: "We shipped it, then defined what to measure",
    seconds: 80,
    metrics: metricsI,
    worked: v("12 hours on campus, with projects judged across 4 tracks.", "v0-recap"),
    didnt: r("Team tools arrived 5 to 10 days out, leaving little time to use them."),
    carried: r("Define each step of the path before launch, and measure it."),
    notes: {
      keyPoint: "Real accomplishment, honest limits, and one problem carried forward.",
      narration: "We ran the event and projects were judged across four tracks. These are the four steps I'd report, each with a definition. I'm not quoting counts for I here because I won't estimate them. That gap is one of my main lessons, and it's why II was exported and counted.",
      transition: "That's what set up the second version.",
      caveat: "Do not state any count until it is verified. See VERIFICATION.md.",
      followUps: [
        { q: "What would have happened without this change?", a: "[ADD: your answer]" },
        { q: "Which alternative explanation could account for the result?", a: "First-event novelty and timing in the semester are both candidates." },
      ],
    },
    sources: ["v0-recap", "v0-teams"],
  },
  {
    id: "turn",
    layout: "turn",
    lens: "The pivot",
    chapter: "I to II",
    world: "festival",
    title: "Same product. New hand.",
    seconds: 35,
    learning: r("The event shipped. The participant experience still needed work."),
    notes: {
      keyPoint: "Same product and same user. We changed how the path worked.",
      narration: "So for II we kept the product, the student builder's path, and changed how it worked. Same user, new approach, and a new identity to go with it.",
      transition: "Let me walk through the three changes that mattered most.",
      caveat: "Not every change came from formal research. Say so if asked.",
      followUps: [],
    },
    sources: ["v0-tally", "v0-og", "ii-spec", "ii-event", "sched"],
  },
  {
    id: "changes",
    layout: "changes",
    lens: "Iteration",
    chapter: "Hacklanta II",
    world: "festival",
    title: "Three changes, each with a cost",
    seconds: 75,
    changes: [
      {
        name: "Application",
        learning: v("Applicants crossed multiple systems.", "v0-tally"),
        decision: v("A 4-minute application on the pass itself, with no account.", "ii-spec"),
        expected: h("More finished applications", "ii-spec"),
        tradeoff: r("We took on building and running our own intake."),
      },
      {
        name: "Referrals",
        learning: v("Growth had to carry a goal of 2,000 applications.", "ii-admin"),
        decision: v("$1 for every student you refer, plus a personal queue number.", "ii-referral"),
        expected: h("Applicants recruit applicants", "ii-referral"),
        tradeoff: v("No cap: about $2,000 at the goal. We refused to fake a \"600 people applied\" counter.", "ii-queue"),
      },
      {
        name: "Scheduling",
        learning: v("A 36-hour event needs a 56-hour staffing window.", "sched"),
        decision: v("I built a scheduling tool to staff a 56-hour window.", "sched"),
        expected: h("More predictable coverage", "sched"),
        tradeoff: r("Build time went to an internal tool, not the participant path."),
      },
    ],
    notes: {
      keyPoint: "Learning, decision, tradeoff, three times. The referral tradeoff is the one I'd defend hardest.",
      narration: "First, the application moved onto the festival pass: about four minutes, no account. Second, growth: a dollar for every student who applies through your link. We could have shown a live counter of how many people applied. We chose not to fake social proof on a page offering people money, and showed each applicant their own queue number instead. Third, a 36-hour event needs 56 hours of staffing, so I built a scheduler for the board. The teammates who built the site built the first two. The scheduler is mine.",
      transition: "So did it work? Let me separate what we shipped from what we can prove.",
      caveat: "These are expected effects, not results. Nothing here shows that referrals worked.",
      followUps: [
        { q: "Why pay per referral? Isn't that risky?", a: "The spec has no cap. Worst case is about $2,000 at the signup goal. [ADD: actual referral spend and applicants via referral]" },
        { q: "Did you write the scheduler?", a: "Yes. Hacklanta-Scheduler, 74 of 81 commits are mine (Aug 2026). [CONFIRM: was it used on event weekend?]" },
      ],
    },
    sources: ["ii-spec", "ii-referral", "ii-queue", "sched"],
  },
  {
    id: "product",
    layout: "product",
    lens: "The product",
    chapter: "Hacklanta II",
    world: "festival",
    title: "The application became the product",
    seconds: 35,
    shots: [
      { src: "/assets/product/hacklanta-i-site.jpg", alt: "Hacklanta I site with a casino countdown", name: "Hacklanta I", caption: "Casino site. Apply led to a Tally form and a separate login.", credit: "Internet Archive capture, Mar 29 2026. Built by Joey Zhang, Poorav Rawat, Liam Ellison, Arhaan Keshwani." },
      { src: "/assets/product/hacklanta-ii-application.jpg", alt: "Hacklanta II application form on a festival pass", name: "Hacklanta II", caption: "On the pass itself: eight steps, no account.", credit: "hacklanta.dev, blank form, Nov 2 2026. Built by John Sang, Joey Zhang, Liam Ellison, Poorav Rawat." },
    ],
    notes: {
      keyPoint: "This is the real product. I set the requirement, and the engineering team built it.",
      narration: "Here are the two real products. On the left, Hacklanta I, where applying sent a student from our site to a Tally form and a separate login. On the right, Hacklanta II, where the application lives on the festival pass itself. I set the requirement. The credited engineers built it.",
      transition: "Removing the seam was one change. Referrals are the decision I'd like to walk through with data.",
      caveat: "The left image is the Hacklanta I home page, not its form. The right image is the live site on Nov 2.",
      followUps: [{ q: "Did the shorter application increase completions?", a: "[ADD: I have no start-to-finish completion rate. Say so unless you can source one.]" }],
    },
    sources: ["wayback", "live-ii", "v0-git", "ii-git"],
  },
  {
    id: "rollout-ii",
    layout: "rollout",
    lens: "One decision, measured",
    chapter: "Hacklanta II",
    world: "festival",
    title: "Applications sped up after referrals. That is not proof.",
    seconds: 90,
    days: applicationsByDay,
    window: { from: "Aug 19", to: "Aug 23", label: "Referrals and queue ship" },
    stats: [
      { value: "94", label: "applications in the 14 days before", source: "applicants" },
      { value: "244", label: "applications in the 14 days after", source: "applicants" },
      { value: "47%", label: "said they heard from a friend (183 of 391)", source: "applicants" },
    ],
    scope: v("Export of 391 applications, Aug 5 to Sep 7. It ends a month before the event, so it is not a final count. Goal: 2,000.", "applicants"),
    cannot: r("Other promotion may have run in the same weeks, and nothing here isolates referrals. \"Friend\" is self-reported. Next test: referred versus organic show-up rate."),
    notes: {
      keyPoint: "My decision was to pay for referrals and refuse fake social proof. The data supports continuing, and it does not prove the cause.",
      narration: "This is one decision end to end. We needed reach, so we paid a dollar per referred applicant, uncapped, and gave each applicant a personal queue number instead of a public counter. In the 14 days before referrals and the queue shipped, we had 94 applications. In the 14 days after, 244. Nearly half said they heard from a friend. I'd read that as a reason to keep going, not proof, because this export stops a month before the event and doesn't isolate referrals. What I'd test next is whether referred students show up as often as organic ones.",
      transition: "Which leads to what I'd do differently.",
      caveat: "391 is a dated export, not a final count. Do not compare it with the 2,000 goal as a result. Windows: Aug 5 to 18 and Aug 24 to Sep 6.",
      followUps: [
        { q: "Was the growth in scope a mistake?", a: "[ADD: your view]" },
        { q: "What would you measure earlier next time?", a: "The full funnel by step with a dated snapshot, defined before launch." },
      ],
    },
    sources: ["applicants", "ii-referral", "ii-queue", "ii-admin"],
  },
  {
    id: "differently",
    layout: "reflection",
    lens: "Retrospective",
    chapter: "Hacklanta II",
    world: "festival",
    title: "What I'd do differently",
    seconds: 85,
    reflections: [
      {
        title: "Instrument the funnel before launch",
        happened: r("I have no sourced step-by-step funnel for I."),
        learned: r("Without it, I can't show that II did better."),
        instead: r("Define every step and its owner before launch."),
      },
      {
        title: "Re-plan when scope grows",
        happened: v("Referrals, team finder, and an organizer dashboard were v1 non-goals, and all shipped.", "ii-spec"),
        learned: r("Each made sense alone, but not as a set."),
        instead: r("Ask what each addition moves and what it displaces."),
      },
      {
        title: "Pilot uncertain growth bets",
        happened: v("Referrals launched with no cap.", "ii-referral"),
        learned: r("We took on the cost before we knew it worked."),
        instead: r("Run a capped pilot for a week, then scale."),
      },
    ],
    notes: {
      keyPoint: "Specific mistakes, specific alternatives, and a decision rule for each.",
      narration: "First, I'd instrument the funnel before launch. Right now I can't cleanly show you where students dropped. Second, scope. Each addition made sense on its own, but I'd make every one answer what it moves and what it pushes out. Third, the referral bet. I'd pilot it capped for a week before scaling. The next thing I'd test is whether referred students show up as often as organic ones.",
      transition: "So here's what I'd take from all of this.",
      followUps: [{ q: "What would you measure earlier?", a: "Step conversion: applied, accepted, confirmed, checked in, plus projects submitted as its own metric, with dated snapshots." }],
    },
    sources: ["ii-spec", "ii-referral"],
  },
  {
    id: "close",
    layout: "closing",
    lens: "Takeaway",
    chapter: "Close",
    world: "festival",
    title: "Ship it, learn from it, change it on purpose.",
    seconds: 30,
    lesson: "Good product decisions connect user evidence, practical constraints, and measurable outcomes.",
    principles: [
      { name: "Listen to users", detail: "Trace each change to something you heard." },
      { name: "Make deliberate tradeoffs", detail: "Name the cost when you choose." },
      { name: "Measure what matters", detail: "Decide what counts before launch." },
    ],
    notes: {
      keyPoint: "Return to how I work as a PM, then invite questions.",
      narration: "My contribution was the direction, the participant path, and the operations behind it, across two versions. What I'd bring to Hudl is this: tie every change to evidence, name its cost, and decide what you'll measure before you launch. I have the detail behind each decision in an appendix, so please ask.",
      followUps: [],
    },
    sources: ["jared"],
  },
];

/* ----------------------------------------------------------------- appendix */

export const appendix: AppendixItem[] = [
  {
    id: "a-role",
    title: "Role and decision boundaries",
    sections: [
      { heading: "I owned", claims: [v("Event direction, participant experience requirements, ops and volunteer scheduling, sponsors and growth", "jared"), v("Hacklanta-Scheduler (74 of 81 commits)", "sched")] },
      { heading: "Team delivered", claims: [v("Hacklanta I site: Joey Zhang, Poorav Rawat, Liam Ellison, Arhaan Keshwani (commit authors)", "v0-git"), v("Hacklanta II site: John Sang, Joey Zhang, Liam Ellison, Poorav Rawat (commit authors)", "ii-git")] },
    ],
  },
  {
    id: "a-research",
    title: "Research methods and limits",
    sections: [
      { heading: "Methods", claims: [v("Post-event survey, conversations, organizer retro", "jared")] },
      { heading: "Limits", claims: [r("Non-attendees are under-represented, and the retro reflects the organizer view.")] },
    ],
  },
  {
    id: "a-priorities",
    title: "Alternatives we rejected",
    sections: [
      { heading: "Hacklanta I", claims: [r("Fully custom was the most to build. Off-the-shelf gave students no status or team matching. Reconstructed for this interview.")] },
      { heading: "Hacklanta II", claims: [v("Rejected a public \"X people applied\" counter in favor of a personal queue number", "ii-queue"), v("v1 non-goals: accounts and status portal, organizer dashboard, referrals, team finder, RSVP collection", "ii-spec")] },
    ],
  },
  {
    id: "a-metrics",
    title: "Metric definitions and caveats",
    sections: [
      { heading: "Funnel definitions", claims: [...metricsI, projects("I")].map((x) => v(`${x.label}: ${x.definition}`)) },
      { heading: "Not outcome data", claims: [r("\"1,000+ students\" on the live site is marketing copy, not applications or attendance."), r("Recap sponsor and prize amounts are not revenue metrics."), v("2,000 signups was a goal for II, not a result.", "ii-admin")] },
      { heading: "Comparability", claims: [r("I (12 hours, one day) and II (36 hours, weekend) differ in format. Compare step conversion rates, not raw counts, and do not assign cause.")] },
    ],
  },
  {
    id: "a-rollout",
    title: "Rollout detail and execution challenges",
    sections: [
      { heading: "Hacklanta I", claims: [v("Feb 14 first commit, Feb 15 admin panel, Feb 21 Tally intake and status page", "v0-git"), v("Mar 18 to 23: team matcher and confirm attendance", "v0-teams"), v("Deadline extended to Mar 27", "v0-hero"), v("About 4 weeks of planning, per PROGSU's recap", "v0-recap")] },
      { heading: "Hacklanta II", claims: [v("Aug 3 spec, Aug 4 launch runbook, Aug 19 to 23 referrals and queue, Sep 7 team finder, Sep 28 batch review and waitlist, Oct 9 to 11 event", "ii-git"), v("Aug 15: board scheduler", "sched")] },
    ],
  },
  {
    id: "a-delta",
    title: "Hacklanta I versus II",
    sections: [
      { heading: "Format", claims: [v("I: 12 hours, Mar 28", "v0-og"), v("II: 36 hours, Oct 9 to 11", "ii-event")] },
      { heading: "Application", claims: [v("I: Tally form, Clerk login, status page", "v0-tally"), v("II: in-house application of about 4 minutes, on the credential, no accounts", "ii-spec")] },
      { heading: "Growth", claims: [v("II: $1 referrals, queue ticket, share ticket, Discord signup webhook", "ii-git")] },
      { heading: "Ops", claims: [v("II: batch review and waitlist, board scheduler for a 56-hour window", "sched")] },
      { heading: "Identity", claims: [v("I: casino. II: music festival, with the pass as the main interface.", "ii-spec")] },
    ],
  },
  {
    id: "a-next",
    title: "What failed and what to test next",
    sections: [
      { heading: "What failed", claims: [v("Team matching and attendance confirmation shipped 5 to 10 days before Hacklanta I.", "v0-teams"), r("No sourced step-by-step funnel exists for Hacklanta I.")] },
      { heading: "Next tests", claims: [r("Referred versus organic show-up rate"), r("Capped referral pilot versus paid campus promotion, by cost per checked-in builder")] },
    ],
  },
];

export const sourceById = Object.fromEntries(sources.map((s) => [s.id, s]));
