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
 */
import type { AppendixItem, Claim, Metric, Scene, Source } from "./types";

const v = (text: string, source?: string): Claim => ({ text, status: "verified", source });
const h = (text: string, source?: string): Claim => ({ text, status: "hypothesis", source });
const r = (text: string, source?: string): Claim => ({ text, status: "retrospective", source });

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
  { id: "atl", label: "Peer programs (HackGT, HackEmory, KSU)", ref: "Public event and org pages [CONFIRM: current activity]" },
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
    layout: "gap",
    lens: "User problem",
    chapter: "Origin",
    world: "casino",
    title: "GSU had a CS program, but no CS community",
    seconds: 75,
    clubs: ["Women in Tech", "Girls Who Code", "ColorStack", "NSBE", "Computer Science Club"],
    dormant: v("Every one was on paper, none was hosting events.", "jared"),
    answer: { name: "PROGSU", note: v("Founded by a group of friends and me to fill the gap.", "jared") },
    compare: [
      { school: "Georgia Tech", offer: v("HackGT, active student orgs", "atl") },
      { school: "Emory", offer: v("HackEmory, active student orgs", "atl") },
      { school: "Kennesaw State", offer: v("Hackathons, active student orgs", "atl") },
      { school: "Georgia State", offer: v("Classes only", "jared"), empty: true },
    ],
    user: v("GSU CS students with no way to build, network, or compete outside class.", "jared"),
    impact: r("Without projects, hackathons, or peers, they enter the job market behind students across town."),
    notes: {
      keyPoint: "I found the problem by asking around as a transfer: the CS degree had no extracurricular layer, and that costs students careers.",
      narration: "I transferred to Georgia State from community college, and I kept asking the people I met the same question: where do CS students actually build things together? The answer was nowhere. Women in Tech, Girls Who Code, ColorStack, NSBE, even the Computer Science Club all existed on paper, and none of them were running events. [ADD: roughly how many people you asked.] Meanwhile Georgia Tech, Emory, and Kennesaw State, all nearby, have hackathons and active communities, and their students show up to recruiting with projects and networks. That's a career gap, not just a social one. So a group of friends and I founded PROGSU to fill it. [ADD: founding date, founders, members today; GSU CS enrollment.] Hacklanta is the flagship product that came out of that.",
      transition: "So what were we actually trying to change?",
      caveat: "Club inactivity is from my own asking around, not a formal audit. Say that if asked.",
      followUps: [
        { q: "How did you know this was the right problem?", a: "I asked repeatedly as a transfer, across many people, and got the same answer: no active clubs, no events. [ADD: count]" },
        { q: "Why not revive an existing club instead?", a: "[ADD: your answer]" },
        { q: "What did you personally own?", a: "Co-founded PROGSU. On Hacklanta: direction, participant experience, ops and volunteer scheduling, sponsors and growth. The PROGSU engineering team built the site." },
      ],
    },
    sources: ["jared", "atl"],
  },
  {
    id: "goal",
    layout: "goals",
    lens: "Desired outcome",
    chapter: "Origin",
    world: "casino",
    title: "Put GSU on Atlanta's tech map",
    seconds: 55,
    mission: v("Give GSU students the resources, community, and reputation that students at Tech and Emory take for granted.", "jared"),
    pillars: [
      { name: "Student resources", detail: v("Things the degree alone didn't provide.", "jared"), items: ["Workshops", "Beginner track", "Sponsors and recruiters"] },
      { name: "GSU on the map", detail: v("A flagship event that brings builders and companies to our campus.", "jared"), items: ["Hacklanta", "Industry sponsors", "Students from across Atlanta"] },
      { name: "Floor and ceiling", detail: v("Judged on more than code, so first-timers and veterans both compete.", "jared"), items: ["Technical depth", "Demo", "Presentation", "Teamwork"] },
    ],
    results: [
      { value: "200+", label: v("of ~400 attendees at their first hackathon", "jared") },
      { value: "150", label: v("of those first-timers from GSU", "jared") },
      { value: "Interviews", label: v("at Cox Automotive and a startup in the room", "jared") },
      { value: "♥", label: v("New friend groups that outlasted the event", "jared") },
    ],
    notes: {
      keyPoint: "The outcome was bigger than one event: give GSU students real resources and put GSU's name next to Tech and Emory.",
      narration: "So what were we actually trying to achieve? The big picture: GSU students deserve the same resources, community, and reputation that students at Georgia Tech and Emory take for granted, and GSU deserves to be on Atlanta's tech map. We went after that three ways. First, student resources the degree didn't provide: workshops, a beginner track, and sponsors and recruiters in the room. Second, putting GSU on the map with a flagship event that brings builders and companies to our campus. Third, raising the floor and the ceiling together. We judged on technical depth, but also the demo, the presentation, and teamwork, so a first-timer and a veteran were both in the running. And it moved: over 200 of roughly 400 attendees were at their first hackathon, 150 of them from GSU. Students got interviews at Cox Automotive and at a startup that attended. And I've seen friend groups form that never existed before.",
      transition: "Going in, we had to make some bets.",
      caveat: "[CONFIRM: the 400 and 200+ are Hacklanta II; event was on GSU's campus; attendees came from other schools.] Interviews are ones I know of, not a full count.",
      followUps: [
        { q: "How do you measure 'on the map'?", a: "[ADD: e.g. sponsors who came back, other schools attending, press, MLH listing, recruiter outreach to PROGSU]" },
        { q: "Isn't raising the floor and the ceiling a conflict?", a: "It would be if we judged only on technical depth. Scoring demo, presentation, and teamwork lets beginners compete on strengths they already have, while the hardest builds still win on depth." },
        { q: "Did anyone actually get hired?", a: "Multiple students got interviews at Cox Automotive and at a startup that attended. [ADD: any offers]" },
      ],
    },
    sources: ["jared"],
  },
  {
    id: "hypotheses",
    layout: "hypotheses",
    lens: "Assumptions",
    chapter: "Hacklanta I",
    world: "casino",
    title: "Four bets we made going into Hacklanta I",
    seconds: 50,
    outcome: v("A brand-new club can run a hackathon people show up for.", "jared"),
    framing: r("Beliefs we held before the event, framed as bets."),
    cards: [
      { suit: "♠", belief: h("Atlanta has room for one more", "jared"), because: r("HackGT and Hacklytics leave most students out"), expected: r("Applications fill"), result: { value: "~400", label: "attendees" } },
      { suit: "♥", belief: h("GSU wants an approachable one", "jared"), because: r("Big events feel built for veterans"), expected: r("Lots of first-timers"), result: { value: "200+", label: "first hackathon" } },
      { suit: "♦", belief: h("Other campuses will come", "jared"), because: r("Atlanta's schools are close together"), expected: r("Non-GSU attendees"), result: { value: "50+", label: "first-timers from other schools" } },
      { suit: "♣", belief: h("They'll trust a brand-new club", "jared"), because: r("We had no track record"), expected: r("Outsiders apply and show up"), riskiest: true },
    ],
    notes: {
      keyPoint: "We went in with four assumptions about demand and trust, and I can say which one was riskiest.",
      narration: "Going into the first Hacklanta, we were betting on four things. One, Atlanta had room for one more hackathon. HackGT and Hacklytics are huge, but they leave most students out. Two, GSU students wanted one that felt approachable. Three, students from other campuses would come. Four, the riskiest: they would trust a brand-new club with no track record. The first two were about GSU. The last two were about whether anyone outside GSU would trust us.",
      transition: "We had more ideas than time, so we ranked them.",
      caveat: "These were real beliefs at the time, but we didn't write them down as formal hypotheses. Say that if asked.",
      followUps: [
        { q: "Which was riskiest?", a: "That outside students would take a chance on a first-year club. Demand can exist and still go to the established events. [CONFIRM]" },
        { q: "Did they hold up?", a: "[ADD: e.g. Hacklanta I turnout, non-GSU share, first-timer share. The 200+ of ~400 first-timers figure supports the accessibility bet.]" },
      ],
    },
    sources: ["jared"],
  },
  {
    id: "prioritization",
    layout: "matrix",
    lens: "Prioritization",
    chapter: "Hacklanta I",
    world: "casino",
    title: "More ideas than time, so we ranked impact against effort",
    seconds: 75,
    points: [
      { name: "MLH partnership", effort: 0.12, impact: 0.8, call: "do", tag: "First" },
      { name: "Sponsor-built tracks", effort: 0.42, impact: 0.9, call: "do" },
      { name: "Food for every meal", effort: 0.88, impact: 0.78, call: "do", tag: "Sponsor-funded" },
      { name: "Beginner workshops", effort: 0.46, impact: 0.66, call: "do" },
      { name: "Minigames", effort: 0.14, impact: 0.52, call: "do" },
      { name: "Public judging rubric", effort: 0.2, impact: 0.36, call: "do" },
      { name: "RFID badges", effort: 0.9, impact: 0.58, call: "cut" },
      { name: "Custom scheduling", effort: 0.8, impact: 0.36, call: "later", tag: "Built for II" },
      { name: "Mandatory demo videos", effort: 0.52, impact: 0.12, call: "optional", tag: "Made optional" },
    ],
    rule: v("Earn trust cheaply first. Spend big only if a sponsor pays or beginners need it.", "jared"),
    framing: v("Impact and effort were our team's estimates at the time.", "jared"),
    notes: {
      keyPoint: "We had more ideas than time, so we sorted them by impact and effort and cut or deferred the expensive, medium-impact ones.",
      narration: "We had a long list of ideas and a few weeks, so we sorted them by impact against effort. Top left is where we started: an MLH partnership was low effort and gave us instant legitimacy, which mattered because our riskiest bet was whether anyone would trust a brand-new club. Minigames and a public judging rubric were cheap quick wins for energy and trust. Sponsor-built tracks and beginner workshops cost more but went straight at our goals, better projects and first-timers. Food for every meal was expensive, so we only did it because sponsors funded it. On the right, the expensive, medium-impact ideas lost. RFID badges never happened. A custom scheduling platform got pushed to Hacklanta II, where I built it. And mandatory demo videos added friction for little value, so we made them optional.",
      transition: "After the event, we asked students how it actually went.",
      caveat: "Placement on the matrix is relative, from our estimates at the time, not measured.",
      followUps: [
        { q: "Why was MLH first?", a: "Lowest effort for the biggest trust gain. It answered our riskiest bet, whether outside students would take a chance on a new club." },
        { q: "Why cut RFID?", a: "High effort and only medium impact for a 12-hour event. Manual check-in was good enough." },
        { q: "How did you estimate effort?", a: "[ADD: e.g. engineering days, cost, organizer hours]" },
      ],
    },
    sources: ["jared", "sched"],
  },
  {
    id: "research",
    layout: "research",
    lens: "User research",
    chapter: "Hacklanta I",
    world: "casino",
    title: "Every call on that matrix came from someone we asked",
    seconds: 60,
    rows: [
      { method: "SMS and email blast", who: "Our list from past PROGSU events", heard: v("Most had never been to a hackathon, and didn't think it was for them.", "jared"), built: v("Beginner track and workshops", "jared") },
      { method: "First-timer interviews", who: "Students who had never competed", heard: v("They were intimidated: not good enough, no team, no idea what to build.", "jared"), built: v("Workshops, minigames, a public rubric", "jared") },
      { method: "Sponsor discovery calls", who: "Companies we pitched", heard: v("They say yes when students build with their tools and they meet talent.", "jared"), built: v("Sponsor-built tracks", "jared") },
      { method: "Our own experience", who: "PROGSU board, from other hackathons", heard: v("Food ran out, and judging felt arbitrary.", "jared"), built: v("Food every meal, transparent judging", "jared") },
    ],
    limits: r("Limit: our list skews toward students who already show up to PROGSU events."),
    notes: {
      keyPoint: "We researched three groups before building: students, sponsors, and ourselves. Each finding maps to a call on the matrix.",
      narration: "Those calls on the matrix weren't guesses. Before Hacklanta I, we ran four kinds of research. First, we SMS and email blasted our list from past PROGSU events: had you been to a hackathon, and if not, what would get you to come? Most hadn't, and a lot didn't think it was for them. Second, we interviewed first-timers about why hackathons feel intimidating. Not feeling good enough, not having a team, not knowing what to build. Third, sponsor discovery calls: what makes a company say yes to a first-year event? They want students building with their tools and a chance to meet talent. And fourth, our own board had been to other hackathons and had stories, like food running out and judging that felt arbitrary. Read each row left to right: who we asked, what we heard, and what we built because of it.",
      transition: "Here is how the build itself went.",
      caveat: "Findings are paraphrased from memory and notes, not coded transcripts. Our list skews toward students already engaged with PROGSU.",
      followUps: [
        { q: "How many people did you reach?", a: "[ADD: list size, response count, number of interviews, number of sponsor calls]" },
        { q: "What surprised you?", a: "[ADD: one finding you didn't expect]" },
        { q: "How did you avoid only hearing from people already engaged?", a: "First-timer interviews and sponsor calls were outside our list. The limit is real for the blast, and I'd recruit from intro CS classes next time." },
      ],
    },
    sources: ["jared"],
  },
  {
    id: "delivery",
    layout: "stories",
    lens: "Execution",
    chapter: "Hacklanta I",
    world: "casino",
    title: "Three problems we had to solve to pull it off",
    seconds: 70,
    stories: [
      {
        area: "Judging",
        name: "The TJ Maxx system",
        problem: v("Judging is the top complaint at hackathons, from judges and hackers alike.", "jared"),
        how: v("One line, many registers. Judges stay put, and each team goes to the next open judge.", "jared"),
        result: v("Judges stayed comfortable. Teams barely waited.", "jared"),
      },
      {
        area: "Ops and finance",
        name: "Clear owners",
        problem: v("No playbook, and about 4 weeks of turnaround.", "jared"),
        how: v("Weekly meetings. Every person owned something: receipts, orders, specific sponsors.", "jared"),
        result: v("Nothing fell between people. Everyone knew who to ask.", "jared"),
      },
      {
        area: "Motivation",
        name: "A points board",
        problem: v("Assigning tasks wasn't keeping people motivated.", "jared"),
        how: v("Each role owes a set number of points a week, and picks whichever tasks they want.", "jared"),
        result: v("People chose work they enjoyed, and it still got done.", "jared"),
      },
    ],
    framing: v("My role: direction, ops, and sponsors.", "jared"),
    notes: {
      keyPoint: "Execution came down to three systems: a judging flow, clear owners, and a motivation model people chose into.",
      narration: "Three execution stories. First, judging. Ask anyone, judges or hackers, and judging is the biggest complaint at hackathons. Judges get worn out walking around, and teams wait forever. So we built what we call the TJ Maxx system: one line, many registers. Judges stay at their stations, and each team goes to the next open judge. Judges stayed comfortable, and teams barely waited. Second, ops and finance. We had no playbook and about four weeks. So we ran weekly meetings, and everyone owned a workstream. One person owned receipts, one owned orders, specific people owned specific sponsors. Clear owners meant nothing fell through the cracks. Third, motivation. Assigning tasks wasn't working. So we built a points board. Each role owes a set number of points a week, and they pick whatever work they want. People did the work they liked, and the work still got done.",
      transition: "Here's what we can say about how it turned out.",
      caveat: "Results here are observed, not measured. Say so if asked for numbers.",
      followUps: [
        { q: "Why call it TJ Maxx?", a: "Like the checkout: one line feeding many registers, so nobody picks the slow lane. [CONFIRM: mechanics]" },
        { q: "How did you set point values?", a: "[ADD: how points were sized and how many per role]" },
        { q: "What would you measure next time?", a: "Average team wait for judging, and judge sessions per hour." },
      ],
    },
    sources: ["jared"],
  },
  {
    id: "results-i",
    layout: "monitor",
    lens: "Metrics",
    chapter: "Hacklanta I",
    world: "casino",
    title: "After launch, we tracked three groups",
    seconds: 70,
    groups: [
      {
        area: "Hackers",
        question: "Did they come, and did they stay?",
        metrics: [
          { name: "Show-up rate", def: "Registered vs. actually came, broken down by school and first-timer status" },
          { name: "Retention", def: "Checked in vs. submitted a project" },
        ],
      },
      {
        area: "Sponsors",
        question: "Was it worth it for them?",
        metrics: [
          { name: "Resumes collected", def: "Candidates each sponsor walked away with" },
          { name: "Would you come back?", def: "Asked in every sponsor debrief" },
        ],
      },
      {
        area: "Everyone",
        question: "What did it feel like?",
        metrics: [
          { name: "Attendee survey", def: "Post-event, open to every participant" },
          { name: "Top complaints", def: "Logged and ranked, so the biggest ones get fixed first" },
        ],
      },
    ],
    loop: v("The top complaints became the to-do list for Hacklanta II.", "jared"),
    notes: {
      keyPoint: "We measured hackers, sponsors, and experience after the event, and the complaints fed straight into the next version.",
      narration: "After the event we tracked three groups. Hackers first: did they come, and did they stay? We compared registrations to who actually showed up, broken down by school and by first-timers, and we tracked retention from check-in to project submission. Second, sponsors, because without them there's no event: how many resumes each one collected, and in every debrief we asked one question, would you come back? Third, the experience: a post-event survey for attendees, and we kept a ranked list of the top complaints. That list became the to-do list for Hacklanta II.",
      transition: "That's what set up the second version.",
      caveat: "Say the actual numbers out loud if you have them. If a metric wasn't tracked precisely, say it was estimated.",
      followUps: [
        { q: "What was your show-up rate?", a: "[ADD: registered vs. attended]" },
        { q: "What were the top complaints?", a: "[ADD: top 2 or 3]" },
        { q: "Did sponsors say they'd come back?", a: "[ADD: how many said yes]" },
      ],
    },
    sources: ["jared"],
  },
  {
    id: "stats-i",
    layout: "stats",
    lens: "By the numbers",
    chapter: "Hacklanta I",
    world: "casino",
    title: "A first-year club, a first-year event",
    seconds: 35,
    hero: { value: "400+", label: "students in the room" },
    stats: [
      { value: "$20K", label: "raised from sponsors" },
      { value: "200+", label: "at their first hackathon" },
      { value: "150", label: "first-timers from GSU" },
      { value: "Interviews", label: "at Cox Automotive and a startup" },
    ],
    note: v("Hacklanta I, March 28, 2026. 12 hours, on campus.", "jared"),
    notes: {
      keyPoint: "For a club with no track record, Hacklanta I landed: 400+ students, $20K in sponsorship, and half the room at their first hackathon.",
      narration: "Here's where Hacklanta I landed. Over 400 students. Twenty thousand dollars from sponsors, for a club that didn't exist a year earlier. More than 200 people at their first hackathon, and 150 of those from GSU. And students walked out with interviews at Cox Automotive and at a startup that was there. Those numbers answered our bets: there was room for another Atlanta hackathon, and people took a chance on us.",
      transition: "But the numbers weren't the whole story.",
      caveat: "Attendance and first-timer counts are from check-in and applications. Say if any are rounded.",
      followUps: [
        { q: "How many sponsors?", a: "[ADD: count and names you can share]" },
        { q: "How many projects were submitted?", a: "[ADD]" },
      ],
    },
    sources: ["jared"],
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
    seconds: 65,
    changes: [
      {
        name: "Support",
        learning: v("First-timers still felt intimidated. They lacked mentors and didn't know the tools.", "jared"),
        decision: v("A packed Saturday: 9 workshops, 3 panels, and overnight karaoke, a DJ set, snacks, and a typing race.", "jared"),
        expected: h("First-timers feel supported and stay", "jared"),
        tradeoff: v("Less pure hacking time, so possibly weaker projects. Staff stretched thin overnight.", "jared"),
      },
      {
        name: "Scheduling",
        learning: v("A spreadsheet run of show only works if everyone checks it every 30 minutes.", "jared"),
        decision: v("I built a custom shift scheduling platform.", "sched"),
        expected: h("Nobody misses a shift", "sched"),
        tradeoff: v("It took dev time, and admins had to learn a new tool.", "jared"),
      },
      {
        name: "Sponsors",
        learning: v("Sponsors cared far more about the hiring pipeline than brand exposure.", "jared"),
        decision: v("Rebuilt the program into tiers built around hiring access.", "jared"),
        expected: h("Sponsors get candidates, and come back", "jared"),
        tradeoff: v("We dropped logo-only sponsors and said no to their money.", "jared"),
      },
    ],
    notes: {
      keyPoint: "Three things we learned from Hacklanta I, three changes, and a real cost for each one.",
      narration: "Three changes for Hacklanta II. First, support. Even with a beginner track, first-timers told us they still felt intimidated. They didn't have mentors, and they didn't know how to use the tools. So we packed Saturday with nine workshops and three panels, and kept people going overnight with snacks, karaoke, a DJ set, and a typing speed competition. The cost: less straight hacking time, which could hurt project quality, and our staff was stretched thin overnight. Second, scheduling. Our run of show was a spreadsheet, which only works if every volunteer checks it every 30 minutes or remembers their shift. So I built a custom shift scheduling platform. The cost was dev time, and admins had to learn a new tool. Third, sponsors. We learned they cared much more about the hiring pipeline than about how we presented their brand. So we rebuilt the sponsor program into tiers built around hiring access. That meant dropping logo-only sponsors and turning down their money.",
      transition: "So did it work? Let me separate what we shipped from what we can prove.",
      caveat: "The expected effects are what we hoped for, not measured results.",
      followUps: [
        { q: "Why turn down sponsor money?", a: "Logo-only deals didn't fit a program built around hiring. Keeping them would have diluted what we were selling to the sponsors who mattered most. [ADD: amount turned down, if you can share]" },
        { q: "Did more support actually hurt project quality?", a: "[ADD: what you saw at judging]" },
        { q: "Did you write the scheduler?", a: "Yes. 74 of 81 commits are mine (Aug 2026)." },
        { q: "What were the sponsor tiers?", a: "[ADD: tier names and what each got, e.g. resume book, recruiting table, judging seat]" },
      ],
    },
    sources: ["ii-spec", "ii-referral", "ii-queue", "sched"],
  },
  {
    id: "product",
    layout: "product",
    lens: "Signup friction",
    chapter: "Hacklanta II",
    world: "festival",
    title: "We killed the signup friction",
    seconds: 45,
    shots: [
      { src: "/assets/product/hacklanta-i-site.jpg", alt: "Hacklanta I site with a casino countdown", name: "Hacklanta I: an afterthought", caption: "Apply left the casino site for a Tally form, plus a separate login. The vibe ended at the form.", credit: "Internet Archive capture, Mar 29 2026." },
      { src: "/assets/product/hacklanta-ii-application.jpg", alt: "Hacklanta II application form on a festival pass", name: "Hacklanta II: start to finish on site", caption: "The form lives on the site. No signup: we email a code to get into your account.", credit: "hacklanta.dev, blank form, Nov 2 2026." },
    ],
    deltas: [
      { from: "51%", to: "~70%", label: "application completion rate" },
      { from: "30+", to: "5", label: "DMs about form problems" },
    ],
    notes: {
      keyPoint: "In Hacklanta I, registration was an afterthought that broke the experience. In II, we kept applicants on our site from start to finish.",
      narration: "Registration for Hacklanta I was honestly an afterthought. You'd be on this casino-themed site, hit apply, and get sent to a Tally form, and then a separate login. Going from a casino vibe to something that feels like a Google Form is a big drop-off point. So for Hacklanta II we put the form directly on the site, and got rid of signup entirely. Instead of making an account, we email you a code to get back in. From the landing page to submitting, you never leave the site. And it worked: completion went from 51% to about 70%, and DMs about problems with the form dropped from over 30 to just 5.",
      transition: "That fixed the experience. Next, let's look at how applications actually grew.",
      caveat: "Completion rate is started vs. submitted. Say ~70% is approximate.",
      followUps: [
        { q: "How did you measure completion?", a: "[CONFIRM: started vs. submitted applications, for each event]" },
        { q: "Why an email code instead of a password?", a: "No account to create and nothing to remember. It's one less step between interest and a finished application." },
      ],
    },
    sources: ["wayback", "live-ii", "v0-git", "ii-git"],
  },
  {
    id: "rollout-ii",
    layout: "rollout",
    lens: "Growth",
    chapter: "Hacklanta II",
    world: "festival",
    title: "1,400 applications, and referrals lit the fuse",
    seconds: 70,
    days: applicationsByDay,
    window: { from: "Aug 19", to: "Aug 23", label: "Referrals launch" },
    stats: [
      { value: "1,400", label: "total applications for Hacklanta II", source: "jared" },
      { value: "2.6×", label: "applications in the 14 days after referrals launched (94 → 244)", source: "applicants" },
      { value: "47%", label: "of applicants heard about it from a friend", source: "applicants" },
    ],
    scope: v("First month of applications, Aug 5 to Sep 6.", "applicants"),
    cannot: r("Whether referred students show up as often as everyone else."),
    notes: {
      keyPoint: "Hacklanta II reached 1,400 applications, and the referral program is what turned a slow start into momentum.",
      narration: "Growth was the big bet for Hacklanta II. We paid a dollar for every student you referred, and instead of a fake 'X people applied' counter, every applicant got their own queue number. The first two weeks were slow: 94 applications. In the two weeks after referrals launched, 244, so about 2.6 times faster. Almost half of applicants said they heard about it from a friend. We finished with 1,400 applications. To be fair, other promotion was running too, so I can't credit referrals for all of it. What I'd test next is whether referred students show up at the same rate as everyone else.",
      transition: "Which leads to what I'd do differently.",
      caveat: "The chart and the 2.6x are from the first-month export. 1,400 is the final count. Other promotion ran in the same weeks.",
      followUps: [
        { q: "How much did referrals cost?", a: "[ADD: total referral payout]" },
        { q: "How do you know referrals caused it?", a: "I don't fully. Other promotion ran at the same time. The friend rate and the jump right at launch are strong signals, and the next test is referred vs. organic show-up." },
        { q: "How many of the 1,400 attended?", a: "[ADD]" },
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
    seconds: 65,
    reflections: [
      {
        title: "Protect hacking time",
        happened: v("We packed Saturday with workshops and overnight events. Hacking time shrank and staff ran thin.", "jared"),
        learned: r(""),
        instead: r("Fewer, sharper workshops, and overnight staff on scheduled shifts."),
      },
      {
        title: "Measure from day one",
        happened: r("Offers and project quality were tracked after the fact, mostly by asking around."),
        learned: r(""),
        instead: r("Pick every metric and how we'll collect it before launch."),
      },
      {
        title: "Pilot growth bets first",
        happened: v("Referrals launched with no cap, before we knew they worked.", "ii-referral"),
        learned: r(""),
        instead: r("Run a capped one-week pilot, then scale what works."),
      },
    ],
    notes: {
      keyPoint: "Three things I'd change, each with a concrete rule for next time.",
      narration: "Three things I'd do differently. First, protect hacking time. We packed Saturday so full of workshops and overnight events that the actual building time shrank, and our staff ran thin overnight. Next time: fewer, sharper workshops, and overnight staff on scheduled shifts. Second, measure from day one. Things like offers and project quality, we pieced together afterward by asking around. Next time I'd pick every metric, and how we'll collect it, before launch. Third, pilot growth bets. Referrals launched with no cap before we knew they'd work. It paid off, but next time I'd run a capped one-week pilot and scale what works.",
      transition: "And here's where all of that left GSU.",
      followUps: [{ q: "What would you measure earlier?", a: "Application started vs. submitted, show-up rate, check-in to submission, sponsor resumes, and offers, with dated snapshots." }],
    },
    sources: ["ii-spec", "ii-referral"],
  },
  {
    id: "now",
    layout: "now",
    lens: "One year later",
    chapter: "Close",
    world: "festival",
    title: "GSU has a CS community now",
    seconds: 45,
    clubs: [
      { name: "Women in Tech", status: "Active" },
      { name: "Girls Who Code", status: "Hosting HackHers" },
      { name: "ColorStack", status: "Active" },
      { name: "NSBE", status: "Active" },
      { name: "Computer Science Club", status: "Active" },
    ],
    answer: { name: "PROGSU", status: "2,000+ members" },
    stats: [
      { value: "$95K", label: "raised from sponsors" },
      { value: "40+", label: "internship and full-time offers" },
      { value: "2,000+", label: "GSU students impacted" },
      { value: "KSU", label: "a second campus chapter" },
    ],
    companies: ["Google", "Microsoft", "Apple", "Meta", "NVIDIA", "Adobe", "Palantir", "Uber", "Intuit", "Capital One", "Cox Automotive", "PrizePicks", "FanDuel"],
    line: v("GSU students can build, network, and compete without going to another school.", "jared"),
    notes: {
      keyPoint: "The original problem is solved: the same clubs that were silent are active, and GSU students no longer have to leave campus to build.",
      narration: "Remember the list from the start? Same list, one year later. Women in Tech, ColorStack, NSBE, and the Computer Science Club are all active again, and Girls Who Code is hosting HackHers. PROGSU has over 2,000 members across our events, and we've opened a chapter at Kennesaw State. We've raised 95 thousand dollars from sponsors in total, more than 40 students have gotten internship or full-time offers through our events, at companies like Google, Microsoft, Apple, Meta, NVIDIA, and Capital One, and we've reached over 2,000 students right here at GSU. The point I started with was that GSU students had to go to another school to build, network, and compete. They don't anymore.",
      transition: "So here's what I'd take from all of it.",
      caveat: "Don't claim PROGSU caused the other clubs to restart. Say the community came back, and we were part of it.",
      followUps: [
        { q: "Did PROGSU revive those other clubs?", a: "[ADD: e.g. co-hosted events, shared members. Be careful not to overclaim.]" },
        { q: "How do you count 40+ offers?", a: "[ADD: self-reported, follow-up survey, sponsor reports]" },
      ],
    },
    sources: ["jared"],
  },
  {
    id: "close",
    layout: "closing",
    lens: "Takeaway",
    chapter: "Close",
    world: "festival",
    title: "Ship it, learn from it, change it on purpose.",
    seconds: 25,
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
      { heading: "Team delivered", claims: [v("Hacklanta I and II sites: the PROGSU engineering team", "v0-git")] },
    ],
  },
  {
    id: "a-research",
    title: "Research methods and limits",
    sections: [
      { heading: "Methods", claims: [v("SMS and email blast to past-event list, first-timer interviews, sponsor discovery calls, board members' hackathon experience", "jared")] },
      { heading: "Limits", claims: [r("The blast list skews toward students already engaged with PROGSU. Findings are paraphrased from notes and memory.")] },
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
