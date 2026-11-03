# Speaker notes

Generated from src/content/story.ts.

## 1. Hacklanta (0:30)

**Main point:** I am treating the whole participant experience as the product, and I shipped it twice.

**Suggested explanation:** I'm Jared, VP of PROGSU, Georgia State's programming club. The product here isn't a website. It's the whole path a student takes, from applying to showing up and shipping something. We ran it in March as a 12-hour casino-themed event, learned from it, and rebuilt it for October.

**Transition:** Let me start with who this was for and where it got hard.

**Caveat:** No headline metric on the cover until the numbers are verified.

**Likely follow-ups:**
- Why call a hackathon a product? It has users, a journey with drop-off risk at each step, and systems we designed and changed between versions.

## 2. GSU had a CS program, but no CS community (1:15)

**Main point:** I found the problem by asking around as a transfer: the CS degree had no extracurricular layer, and that costs students careers.

**Suggested explanation:** I transferred to Georgia State from community college, and I kept asking the people I met the same question: where do CS students actually build things together? The answer was nowhere. Women in Tech, Girls Who Code, ColorStack, NSBE, even the Computer Science Club all existed on paper, and none of them were running events. [ADD: roughly how many people you asked.] Meanwhile Georgia Tech, Emory, and Kennesaw State, all nearby, have hackathons and active communities, and their students show up to recruiting with projects and networks. That's a career gap, not just a social one. So a group of friends and I founded PROGSU to fill it. [ADD: founding date, founders, members today; GSU CS enrollment.] Hacklanta is the flagship product that came out of that.

**Transition:** So what were we actually trying to change?

**Caveat:** Club inactivity is from my own asking around, not a formal audit. Say that if asked.

**Likely follow-ups:**
- How did you know this was the right problem? I asked repeatedly as a transfer, across many people, and got the same answer: no active clubs, no events. [ADD: count]
- Why not revive an existing club instead? [ADD: your answer]
- What did you personally own? Co-founded PROGSU. On Hacklanta: direction, participant experience, ops and volunteer scheduling, sponsors and growth. The PROGSU engineering team built the site.

## 3. Put GSU on Atlanta's tech map (0:55)

**Main point:** The outcome was bigger than one event: give GSU students real resources and put GSU's name next to Tech and Emory.

**Suggested explanation:** So what were we actually trying to achieve? The big picture: GSU students deserve the same resources, community, and reputation that students at Georgia Tech and Emory take for granted, and GSU deserves to be on Atlanta's tech map. We went after that three ways. First, student resources the degree didn't provide: workshops, a beginner track, and sponsors and recruiters in the room. Second, putting GSU on the map with a flagship event that brings builders and companies to our campus. Third, raising the floor and the ceiling together. We judged on technical depth, but also the demo, the presentation, and teamwork, so a first-timer and a veteran were both in the running. And it moved: over 200 of roughly 400 attendees were at their first hackathon, 150 of them from GSU. Students got interviews at Cox Automotive and at a startup that attended. And I've seen friend groups form that never existed before.

**Transition:** Going in, we had to make some bets.

**Caveat:** [CONFIRM: the 400 and 200+ are Hacklanta II; event was on GSU's campus; attendees came from other schools.] Interviews are ones I know of, not a full count.

**Likely follow-ups:**
- How do you measure 'on the map'? [ADD: e.g. sponsors who came back, other schools attending, press, MLH listing, recruiter outreach to PROGSU]
- Isn't raising the floor and the ceiling a conflict? It would be if we judged only on technical depth. Scoring demo, presentation, and teamwork lets beginners compete on strengths they already have, while the hardest builds still win on depth.
- Did anyone actually get hired? Multiple students got interviews at Cox Automotive and at a startup that attended. [ADD: any offers]

## 4. Four bets we made going into Hacklanta I (0:50)

**Main point:** We went in with four assumptions about demand and trust, and I can say which one was riskiest.

**Suggested explanation:** Going into the first Hacklanta, we were betting on four things. One, Atlanta had room for one more hackathon. HackGT and Hacklytics are huge, but they leave most students out. Two, GSU students wanted one that felt approachable. Three, students from other campuses would come. Four, the riskiest: they would trust a brand-new club with no track record. The first two were about GSU. The last two were about whether anyone outside GSU would trust us.

**Transition:** We had more ideas than time, so we ranked them.

**Caveat:** These were real beliefs at the time, but we didn't write them down as formal hypotheses. Say that if asked.

**Likely follow-ups:**
- Which was riskiest? That outside students would take a chance on a first-year club. Demand can exist and still go to the established events. [CONFIRM]
- Did they hold up? [ADD: e.g. Hacklanta I turnout, non-GSU share, first-timer share. The 200+ of ~400 first-timers figure supports the accessibility bet.]

## 5. More ideas than time, so we ranked impact against effort (1:15)

**Main point:** We had more ideas than time, so we sorted them by impact and effort and cut or deferred the expensive, medium-impact ones.

**Suggested explanation:** We had a long list of ideas and a few weeks, so we sorted them by impact against effort. Top left is where we started: an MLH partnership was low effort and gave us instant legitimacy, which mattered because our riskiest bet was whether anyone would trust a brand-new club. Minigames and a public judging rubric were cheap quick wins for energy and trust. Sponsor-built tracks and beginner workshops cost more but went straight at our goals, better projects and first-timers. Food for every meal was expensive, so we only did it because sponsors funded it. On the right, the expensive, medium-impact ideas lost. RFID badges never happened. A custom scheduling platform got pushed to Hacklanta II, where I built it. And mandatory demo videos added friction for little value, so we made them optional.

**Transition:** After the event, we asked students how it actually went.

**Caveat:** Placement on the matrix is relative, from our estimates at the time, not measured.

**Likely follow-ups:**
- Why was MLH first? Lowest effort for the biggest trust gain. It answered our riskiest bet, whether outside students would take a chance on a new club.
- Why cut RFID? High effort and only medium impact for a 12-hour event. Manual check-in was good enough.
- How did you estimate effort? [ADD: e.g. engineering days, cost, organizer hours]

## 6. Every call on that matrix came from someone we asked (1:00)

**Main point:** We researched three groups before building: students, sponsors, and ourselves. Each finding maps to a call on the matrix.

**Suggested explanation:** Those calls on the matrix weren't guesses. Before Hacklanta I, we ran four kinds of research. First, we SMS and email blasted our list from past PROGSU events: had you been to a hackathon, and if not, what would get you to come? Most hadn't, and a lot didn't think it was for them. Second, we interviewed first-timers about why hackathons feel intimidating. Not feeling good enough, not having a team, not knowing what to build. Third, sponsor discovery calls: what makes a company say yes to a first-year event? They want students building with their tools and a chance to meet talent. And fourth, our own board had been to other hackathons and had stories, like food running out and judging that felt arbitrary. Read each row left to right: who we asked, what we heard, and what we built because of it.

**Transition:** Here is how the build itself went.

**Caveat:** Findings are paraphrased from memory and notes, not coded transcripts. Our list skews toward students already engaged with PROGSU.

**Likely follow-ups:**
- How many people did you reach? [ADD: list size, response count, number of interviews, number of sponsor calls]
- What surprised you? [ADD: one finding you didn't expect]
- How did you avoid only hearing from people already engaged? First-timer interviews and sponsor calls were outside our list. The limit is real for the blast, and I'd recruit from intro CS classes next time.

## 7. Three problems we had to solve to pull it off (1:10)

**Main point:** Execution came down to three systems: a judging flow, clear owners, and a motivation model people chose into.

**Suggested explanation:** Three execution stories. First, judging. Ask anyone, judges or hackers, and judging is the biggest complaint at hackathons. Judges get worn out walking around, and teams wait forever. So we built what we call the TJ Maxx system: one line, many registers. Judges stay at their stations, and each team goes to the next open judge. Judges stayed comfortable, and teams barely waited. Second, ops and finance. We had no playbook and about four weeks. So we ran weekly meetings, and everyone owned a workstream. One person owned receipts, one owned orders, specific people owned specific sponsors. Clear owners meant nothing fell through the cracks. Third, motivation. Assigning tasks wasn't working. So we built a points board. Each role owes a set number of points a week, and they pick whatever work they want. People did the work they liked, and the work still got done.

**Transition:** Here's what we can say about how it turned out.

**Caveat:** Results here are observed, not measured. Say so if asked for numbers.

**Likely follow-ups:**
- Why call it TJ Maxx? Like the checkout: one line feeding many registers, so nobody picks the slow lane. [CONFIRM: mechanics]
- How did you set point values? [ADD: how points were sized and how many per role]
- What would you measure next time? Average team wait for judging, and judge sessions per hour.

## 8. After launch, we tracked three groups (1:10)

**Main point:** We measured hackers, sponsors, and experience after the event, and the complaints fed straight into the next version.

**Suggested explanation:** After the event we tracked three groups. Hackers first: did they come, and did they stay? We compared registrations to who actually showed up, broken down by school and by first-timers, and we tracked retention from check-in to project submission. Second, sponsors, because without them there's no event: how many resumes each one collected, and in every debrief we asked one question, would you come back? Third, the experience: a post-event survey for attendees, and we kept a ranked list of the top complaints. That list became the to-do list for Hacklanta II.

**Transition:** That's what set up the second version.

**Caveat:** Say the actual numbers out loud if you have them. If a metric wasn't tracked precisely, say it was estimated.

**Likely follow-ups:**
- What was your show-up rate? [ADD: registered vs. attended]
- What were the top complaints? [ADD: top 2 or 3]
- Did sponsors say they'd come back? [ADD: how many said yes]

## 9. A first-year club, a first-year event (0:35)

**Main point:** For a club with no track record, Hacklanta I landed: 400+ students, $20K in sponsorship, and half the room at their first hackathon.

**Suggested explanation:** Here's where Hacklanta I landed. Over 400 students. Twenty thousand dollars from sponsors, for a club that didn't exist a year earlier. More than 200 people at their first hackathon, and 150 of those from GSU. And students walked out with interviews at Cox Automotive and at a startup that was there. Those numbers answered our bets: there was room for another Atlanta hackathon, and people took a chance on us.

**Transition:** But the numbers weren't the whole story.

**Caveat:** Attendance and first-timer counts are from check-in and applications. Say if any are rounded.

**Likely follow-ups:**
- How many sponsors? [ADD: count and names you can share]
- How many projects were submitted? [ADD]

## 10. Same product. New hand. (0:35)

**Main point:** Same product and same user. We changed how the path worked.

**Suggested explanation:** So for II we kept the product, the student builder's path, and changed how it worked. Same user, new approach, and a new identity to go with it.

**Transition:** Let me walk through the three changes that mattered most.

**Caveat:** Not every change came from formal research. Say so if asked.

## 11. Three changes, each with a cost (1:05)

**Main point:** Three things we learned from Hacklanta I, three changes, and a real cost for each one.

**Suggested explanation:** Three changes for Hacklanta II. First, support. Even with a beginner track, first-timers told us they still felt intimidated. They didn't have mentors, and they didn't know how to use the tools. So we packed Saturday with nine workshops and three panels, and kept people going overnight with snacks, karaoke, a DJ set, and a typing speed competition. The cost: less straight hacking time, which could hurt project quality, and our staff was stretched thin overnight. Second, scheduling. Our run of show was a spreadsheet, which only works if every volunteer checks it every 30 minutes or remembers their shift. So I built a custom shift scheduling platform. The cost was dev time, and admins had to learn a new tool. Third, sponsors. We learned they cared much more about the hiring pipeline than about how we presented their brand. So we rebuilt the sponsor program into tiers built around hiring access. That meant dropping logo-only sponsors and turning down their money.

**Transition:** So did it work? Let me separate what we shipped from what we can prove.

**Caveat:** The expected effects are what we hoped for, not measured results.

**Likely follow-ups:**
- Why turn down sponsor money? Logo-only deals didn't fit a program built around hiring. Keeping them would have diluted what we were selling to the sponsors who mattered most. [ADD: amount turned down, if you can share]
- Did more support actually hurt project quality? [ADD: what you saw at judging]
- Did you write the scheduler? Yes. 74 of 81 commits are mine (Aug 2026).
- What were the sponsor tiers? [ADD: tier names and what each got, e.g. resume book, recruiting table, judging seat]

## 12. We killed the signup friction (0:45)

**Main point:** In Hacklanta I, registration was an afterthought that broke the experience. In II, we kept applicants on our site from start to finish.

**Suggested explanation:** Registration for Hacklanta I was honestly an afterthought. You'd be on this casino-themed site, hit apply, and get sent to a Tally form, and then a separate login. Going from a casino vibe to something that feels like a Google Form is a big drop-off point. So for Hacklanta II we put the form directly on the site, and got rid of signup entirely. Instead of making an account, we email you a code to get back in. From the landing page to submitting, you never leave the site. And it worked: completion went from 51% to about 70%, and DMs about problems with the form dropped from over 30 to just 5.

**Transition:** That fixed the experience. Next, let's look at how applications actually grew.

**Caveat:** Completion rate is started vs. submitted. Say ~70% is approximate.

**Likely follow-ups:**
- How did you measure completion? [CONFIRM: started vs. submitted applications, for each event]
- Why an email code instead of a password? No account to create and nothing to remember. It's one less step between interest and a finished application.

## 13. 1,400 applications, and referrals lit the fuse (1:10)

**Main point:** Hacklanta II reached 1,400 applications, and the referral program is what turned a slow start into momentum.

**Suggested explanation:** Growth was the big bet for Hacklanta II. We paid a dollar for every student you referred, and instead of a fake 'X people applied' counter, every applicant got their own queue number. The first two weeks were slow: 94 applications. In the two weeks after referrals launched, 244, so about 2.6 times faster. Almost half of applicants said they heard about it from a friend. We finished with 1,400 applications. To be fair, other promotion was running too, so I can't credit referrals for all of it. What I'd test next is whether referred students show up at the same rate as everyone else.

**Transition:** Which leads to what I'd do differently.

**Caveat:** The chart and the 2.6x are from the first-month export. 1,400 is the final count. Other promotion ran in the same weeks.

**Likely follow-ups:**
- How much did referrals cost? [ADD: total referral payout]
- How do you know referrals caused it? I don't fully. Other promotion ran at the same time. The friend rate and the jump right at launch are strong signals, and the next test is referred vs. organic show-up.
- How many of the 1,400 attended? [ADD]

## 14. What I'd do differently (1:05)

**Main point:** Three things I'd change, each with a concrete rule for next time.

**Suggested explanation:** Three things I'd do differently. First, protect hacking time. We packed Saturday so full of workshops and overnight events that the actual building time shrank, and our staff ran thin overnight. Next time: fewer, sharper workshops, and overnight staff on scheduled shifts. Second, measure from day one. Things like offers and project quality, we pieced together afterward by asking around. Next time I'd pick every metric, and how we'll collect it, before launch. Third, pilot growth bets. Referrals launched with no cap before we knew they'd work. It paid off, but next time I'd run a capped one-week pilot and scale what works.

**Transition:** And here's where all of that left GSU.

**Likely follow-ups:**
- What would you measure earlier? Application started vs. submitted, show-up rate, check-in to submission, sponsor resumes, and offers, with dated snapshots.

## 15. GSU has a CS community now (0:45)

**Main point:** The original problem is solved: the same clubs that were silent are active, and GSU students no longer have to leave campus to build.

**Suggested explanation:** Remember the list from the start? Same list, one year later. Women in Tech, ColorStack, NSBE, and the Computer Science Club are all active again, and Girls Who Code is hosting HackHers. PROGSU has over 2,000 members across our events, and we've opened a chapter at Kennesaw State. We've raised 95 thousand dollars from sponsors in total, more than 40 students have gotten internship or full-time offers through our events, at companies like Google, Microsoft, Apple, Meta, NVIDIA, and Capital One, and we've reached over 2,000 students right here at GSU. The point I started with was that GSU students had to go to another school to build, network, and compete. They don't anymore.

**Transition:** So here's what I'd take from all of it.

**Caveat:** Don't claim PROGSU caused the other clubs to restart. Say the community came back, and we were part of it.

**Likely follow-ups:**
- Did PROGSU revive those other clubs? [ADD: e.g. co-hosted events, shared members. Be careful not to overclaim.]
- How do you count 40+ offers? [ADD: self-reported, follow-up survey, sponsor reports]

## 16. Ship it, learn from it, change it on purpose. (0:25)

**Main point:** Return to how I work as a PM, then invite questions.

**Suggested explanation:** My contribution was the direction, the participant path, and the operations behind it, across two versions. What I'd bring to Hudl is this: tie every change to evidence, name its cost, and decide what you'll measure before you launch. I have the detail behind each decision in an appendix, so please ask.

