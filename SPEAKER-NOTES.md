# Speaker notes

Draft preparation notes for you to rewrite in your own voice. They are not testimony: anything in brackets needs your real answer. The same notes appear at `/?view=presenter` and `/?view=notes`, and `src/content/story.ts` is the source if you edit them.

Planned time: 14:30, leaving about a minute of buffer in the 15-minute slot.

| # | Slide | Time |
|---|---|---|
| 1 | Case overview | 0:30 |
| 2 | User problem | 1:30 |
| 3 | User research | 1:20 |
| 4 | Goal and hypotheses | 0:55 |
| 5 | Prioritization | 1:40 |
| 6 | Execution | 1:25 |
| 7 | Results | 1:20 |
| 8 | The pivot | 0:35 |
| 9 | Iteration | 1:15 |
| 10 | The product | 0:35 |
| 11 | One decision, measured | 1:30 |
| 12 | Retrospective | 1:25 |
| 13 | Takeaway | 0:30 |

## 1. Hacklanta (0:30)

**Main point:** I am treating the whole participant experience as the product, and I shipped it twice.

**Suggested explanation:** I'm Jared, VP of PROGSU, Georgia State's programming club. The product here isn't a website. It's the whole path a student takes, from applying to showing up and shipping something. We ran it in March as a 12-hour casino-themed event, learned from it, and rebuilt it for October.

**Transition:** Let me start with who this was for and where it got hard.

**Caveat:** No headline metric on the cover until the numbers are verified.

**Likely follow-ups:**
- Why call a hackathon a product? It has users, a journey with drop-off risk at each step, and systems we designed and changed between versions.

## 2. GSU had a CS program, but no CS community (1:30)

**Main point:** I found the problem by asking around as a transfer: the CS degree had no extracurricular layer, and that costs students careers.

**Suggested explanation:** I transferred to Georgia State from community college, and I kept asking the people I met the same question: where do CS students actually build things together? The answer was nowhere. Women in Tech, Girls Who Code, ColorStack, NSBE, even the Computer Science Club all existed on paper, and none of them were running events. [ADD: roughly how many people you asked.] Meanwhile Georgia Tech, Emory, and Kennesaw State, all nearby, have hackathons and active communities, and their students show up to recruiting with projects and networks. That's a career gap, not just a social one. So a group of friends and I founded PROGSU to fill it. [ADD: founding date, founders, members today; GSU CS enrollment.] Hacklanta is the flagship product that came out of that.

**Transition:** Before we built anything, we had to figure out what students actually needed.

**Caveat:** Club inactivity is from my own asking around, not a formal audit. Say that if asked.

**Likely follow-ups:**
- How did you know this was the right problem? I asked repeatedly as a transfer, across many people, and got the same answer: no active clubs, no events. [ADD: count]
- Why not revive an existing club instead? [ADD: your answer]
- What did you personally own? Co-founded PROGSU. On Hacklanta: direction, participant experience, ops and volunteer scheduling, sponsors and growth. The PROGSU engineering team built the site.

## 3. What we heard changed what we built (1:20)

**Main point:** Each change in II traces back to something specific we heard, and I can name who we did not hear from.

**Suggested explanation:** We ran three inputs: a survey, conversations with participants and volunteers, and an organizer retro. Read this left to right. A signal, what we took it to mean, and the decision it led to. The limit I'd flag is that the students we most needed to hear from, the ones who applied and never came, are the least likely to fill out a survey.

**Transition:** But before any of that, we went into the first event with some beliefs.

**Caveat:** No sample sizes on this slide until confirmed. Say if a finding is reconstructed from memory or notes.

**Likely follow-ups:**
- How did user evidence change your decision? [ADD: one real before and after]
- What was the sample size? [ADD: respondents, attendees, how the survey was sent]

## 4. The bets we placed (0:55)

**Main point:** We had beliefs we could have tested. I separate what we believed then from how I evaluate it now.

**Suggested explanation:** Our outcome was simple: a first-timer can apply, team up, and ship in one day. We were betting on three things. I want to be clear that we didn't write formal hypotheses at the time. This is me writing down what we were implicitly betting on. In hindsight the riskiest was the team matcher, because it shipped last and solo first-timers depended on it.

**Transition:** One of those bets shaped our biggest build decision.

**Caveat:** Confirm you held these beliefs before the event. If not, say so out loud.

**Likely follow-ups:**
- Which was riskiest? [CONFIRM: team matcher is my suggested reading, replace it if wrong]

## 5. We chose speed, knowing it would create friction (1:40)

**Main point:** The hardest call was speed versus a coherent experience, and we chose speed knowingly.

**Suggested explanation:** How should a student apply, check status, and find a team? Off-the-shelf was fastest but gave students no status and no matching. Fully custom was the best experience, but it was the most to build. We stitched: Tally for intake, our dashboard for status and teams, DevSpot for submissions. The cost was a seam, a form in one place and a login in another. That's exactly what we removed in II.

**Transition:** So how did shipping that actually go?

**Caveat:** Be upfront that this matrix is reconstructed. The ratings are qualitative.

**Likely follow-ups:**
- What did you choose not to do? A fully custom application and portal for I. [ADD: the reason in your own words]
- What would you cut with half the time? [ADD: your answer. The team matcher is one candidate.]

## 6. The core path shipped first. Team tools came late. (1:25)

**Main point:** We sequenced the core path first, and the team tools landed late.

**Suggested explanation:** First commit was February 14. Within a week we had intake and status. The timeline is drawn to scale, so you can see the long gap and then the crunch. Team matching and attendance confirmation shipped 5 to 10 days out. That matters because those were the tools a solo first-timer needed most.

**Transition:** Here's what we can say about how it turned out.

**Caveat:** Commits span about six weeks. PROGSU's recap says about four weeks of planning. They measure different things, so don't mix them up.

**Likely follow-ups:**
- What failed, and how did you respond? [ADD: the real deadline extension story: why, who decided, how it was communicated]

## 7. We shipped it, then defined what to measure (1:20)

**Main point:** Real accomplishment, honest limits, and one problem carried forward.

**Suggested explanation:** We ran the event and projects were judged across four tracks. These are the four steps I'd report, each with a definition. I'm not quoting counts for I here because I won't estimate them. That gap is one of my main lessons, and it's why II was exported and counted.

**Transition:** That's what set up the second version.

**Caveat:** Do not state any count until it is verified. See VERIFICATION.md.

**Likely follow-ups:**
- What would have happened without this change? [ADD: your answer]
- Which alternative explanation could account for the result? First-event novelty and timing in the semester are both candidates.

## 8. Same product. New hand. (0:35)

**Main point:** Same product and same user. We changed how the path worked.

**Suggested explanation:** So for II we kept the product, the student builder's path, and changed how it worked. Same user, new approach, and a new identity to go with it.

**Transition:** Let me walk through the three changes that mattered most.

**Caveat:** Not every change came from formal research. Say so if asked.

## 9. Three changes, each with a cost (1:15)

**Main point:** Learning, decision, tradeoff, three times. The referral tradeoff is the one I'd defend hardest.

**Suggested explanation:** First, the application moved onto the festival pass: about four minutes, no account. Second, growth: a dollar for every student who applies through your link. We could have shown a live counter of how many people applied. We chose not to fake social proof on a page offering people money, and showed each applicant their own queue number instead. Third, a 36-hour event needs 56 hours of staffing, so I built a scheduler for the board. The teammates who built the site built the first two. The scheduler is mine.

**Transition:** So did it work? Let me separate what we shipped from what we can prove.

**Caveat:** These are expected effects, not results. Nothing here shows that referrals worked.

**Likely follow-ups:**
- Why pay per referral? Isn't that risky? The spec has no cap. Worst case is about $2,000 at the signup goal. [ADD: actual referral spend and applicants via referral]
- Did you write the scheduler? Yes. Hacklanta-Scheduler, 74 of 81 commits are mine (Aug 2026). [CONFIRM: was it used on event weekend?]

## 10. The application became the product (0:35)

**Main point:** This is the real product. I set the requirement, and the engineering team built it.

**Suggested explanation:** Here are the two real products. On the left, Hacklanta I, where applying sent a student from our site to a Tally form and a separate login. On the right, Hacklanta II, where the application lives on the festival pass itself. I set the requirement. The credited engineers built it.

**Transition:** Removing the seam was one change. Referrals are the decision I'd like to walk through with data.

**Caveat:** The left image is the Hacklanta I home page, not its form. The right image is the live site on Nov 2.

**Likely follow-ups:**
- Did the shorter application increase completions? [ADD: I have no start-to-finish completion rate. Say so unless you can source one.]

## 11. Applications sped up after referrals. That is not proof. (1:30)

**Main point:** My decision was to pay for referrals and refuse fake social proof. The data supports continuing, and it does not prove the cause.

**Suggested explanation:** This is one decision end to end. We needed reach, so we paid a dollar per referred applicant, uncapped, and gave each applicant a personal queue number instead of a public counter. In the 14 days before referrals and the queue shipped, we had 94 applications. In the 14 days after, 244. Nearly half said they heard from a friend. I'd read that as a reason to keep going, not proof, because this export stops a month before the event and doesn't isolate referrals. What I'd test next is whether referred students show up as often as organic ones.

**Transition:** Which leads to what I'd do differently.

**Caveat:** 391 is a dated export, not a final count. Do not compare it with the 2,000 goal as a result. Windows: Aug 5 to 18 and Aug 24 to Sep 6.

**Likely follow-ups:**
- Was the growth in scope a mistake? [ADD: your view]
- What would you measure earlier next time? The full funnel by step with a dated snapshot, defined before launch.

## 12. What I'd do differently (1:25)

**Main point:** Specific mistakes, specific alternatives, and a decision rule for each.

**Suggested explanation:** First, I'd instrument the funnel before launch. Right now I can't cleanly show you where students dropped. Second, scope. Each addition made sense on its own, but I'd make every one answer what it moves and what it pushes out. Third, the referral bet. I'd pilot it capped for a week before scaling. The next thing I'd test is whether referred students show up as often as organic ones.

**Transition:** So here's what I'd take from all of this.

**Likely follow-ups:**
- What would you measure earlier? Step conversion: applied, accepted, confirmed, checked in, plus projects submitted as its own metric, with dated snapshots.

## 13. Ship it, learn from it, change it on purpose. (0:30)

**Main point:** Return to how I work as a PM, then invite questions.

**Suggested explanation:** My contribution was the direction, the participant path, and the operations behind it, across two versions. What I'd bring to Hudl is this: tie every change to evidence, name its cost, and decide what you'll measure before you launch. I have the detail behind each decision in an appendix, so please ask.
