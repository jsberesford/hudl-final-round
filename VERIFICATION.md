# Verification checklist

Private preparation file, not shown in the deck. The audience sees no placeholders. Slides state sourced facts, labeled reconstructions, or the items below, which you must confirm before presenting. Open questions stay in the speaker notes. Slide numbers in the older tables below predate the new slide 10: old 10 to 12 are now 11 to 13.

## New evidence: applicant export (confirm it is production data)

`Downloads/hacklanta-applicants.csv`, 391 unique receipts and emails, Aug 5 to Sep 7 2026. It is not in the repo, and only aggregates appear in the deck.

- 94 applications Aug 5 to 18, 52 Aug 19 to 23, 244 Aug 24 to Sep 6, 1 on Sep 7
- 285 of 391 (73%) said no teammates. 183 (47%) heard from a friend. This is self-reported, not referral attribution.
- At least 235 name Georgia State, spelled two ways, and 45 are first-years. Year of study does not show first-time hackers, so slide 2 no longer calls applicants first-timers.
- Confirm the referral ship dates (Aug 19 to 23, from commits) and name any other promotion in those weeks.

## Still on slides without confirmation

- Slide 3: the three "What we heard" signals come from your brief.
- Slide 4: the goal and bets are reconstructed, and the slide says so.
- Slides 7 and 12: "no sourced funnel for I" is true of what I could find. Replace it if you have counts.
- Slide 9: "Build time went to an internal tool" is hindsight, and the scheduler's use on event weekend is unconfirmed.
- Slide 10: the left image is the Hacklanta I home page, because the Tally form was not captured. Confirm "no account" and "eight steps" still match how you describe it.

## Numbers still needed

No counts appear in the deck. Earlier draft numbers (180, 150, 110, 85, 22 and 640, 420, 300, 240, 58) were placeholders and have been removed.

| Claim | Where | Current evidence | Verified? | Needed |
|---|---|---|---|---|
| Applied, accepted, confirmed, checked in, for I | Slides 7, 10 | None | No | Counts, a source, and a date |
| Same four counts for II | Slide 10 | None | No | Counts with matching definitions |
| Projects submitted, I and II | Slide 10 | None | No | Counts |
| Accepted to checked in rate | Slide 10 | Calculated once counts exist | No | Counts. If the rates are similar, say the rate did not clearly improve |
| Survey sample size and response rate | A2, notes | None | No | Respondents, attendees, dates |
| Referral spend and applicants via referral | Notes | None | No | Actual figures |
| Budget constraint | Not in the deck | None | No | Only add it if you want to discuss it |

## Wording that needs your confirmation

| Claim | Where | Current evidence | Verified? | Needed |
|---|---|---|---|---|
| Primary user: GSU students, many first-timers without a team | Slide 2 | Inferred | No | Confirm or correct |
| Students may drop between acceptance and attendance | Slide 2 | Labeled as a hypothesis | Hypothesis | Any real evidence |
| Friction between the form and the login | Slides 3, 9 | Your brief, and the design itself (Tally plus Clerk) | Partly | Did participants actually say this? In which input? |
| Limited time to build | Slide 3 | Your brief | No | Which input it came from |
| Volunteer shifts coordinated ad hoc | Slides 3, 9 | Your brief | No | Retro finding, and your wording |
| Goal for I: apply, find a team, ship in one day | Slide 4 | Inferred | No | Was this the goal at the time? |
| The three bets, and their "because" reasons | Slide 4 | Inferred from what shipped, marked as reconstructed | No | Did you hold these before the event? |
| Team matcher was the riskiest bet | Slide 4 | My suggestion | No | Your own judgment |
| Decision matrix ratings, including engineering effort | Slide 5 | Reconstructed, and the slide says so | Reconstructed | Check you agree with each rating |
| Solo applicants had little time to use the team tools | Slide 6 | Inferred from ship dates | No | Usage of the matcher, if known |
| Team tools arrived too late to help many students | Slide 7 | Inferred | No | Your read, and any evidence |
| No clean funnel for I | Slides 7, 11 | Inferred | No | Confirm. The headline on slide 7 depends on it |
| We needed more reach | Slide 9 | Inferred | No | What I taught you about reach |
| Scheduling cost build time on the participant path | Slide 9 | My inference, marked as hindsight | No | Confirm, or replace with the real tradeoff |
| Referrals, team finder, organizer dashboard were non-goals and shipped | Slide 12, A3 | v1 spec, repos | Yes for the spec | Nothing further |
| Scheduler used on event weekend | Notes | None | No | Yes or no, and any uncovered shifts |

## Answers only you can give

Marked as `[ADD]` in the appendix or notes.

- A1: which calls were yours alone, and which were shared
- A2: survey details and any artifact you can show
- A3: why not fully custom, and why not off-the-shelf only, for I
- A5: why the deadline moved and how it was communicated, plus the hardest moment on event weekend
- A7: what did not work, with evidence
- Notes: how you knew this was the right problem, and one real before and after from research
- Notes: what you would cut with half the time, and whether scope growth was a mistake

## Verified from repos, or confirmed by you on 2026-10-21

- I: Mar 28 2026, 12 hours, Georgia State, 4 tracks, Tally plus Clerk plus status page, team matcher and attendance confirmation Mar 18 to 23, deadline extended to Mar 27
- II: Oct 9 to 11 2026, 36 hours, Aug 3 v1 spec with a 4-minute no-account application, $1 referrals with no cap (worst case about $2,000), the rejected "600 people applied" counter, 2,000 signups as a goal
- 74 of 81 Hacklanta-Scheduler commits are yours, for a 56-hour ops window
- Your role and the three research methods
- Engineering credit, from commit authors. You are not a commit author on either site repo

## Timelines not to confuse

The commit history for I spans about six weeks (Feb 14 to Mar 28). PROGSU's recap says about four weeks of planning. They measure different things.
