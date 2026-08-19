# Learnify: Reducing the Lesson-3 Drop-off

*Product case study - take-home assignment for the Product Intern role.*
*Reading time: ~7 minutes. An interactive prototype lives in `/prototype` (instructions at the end).*

> **If you only have two minutes:** 70% of students quit after lesson 3. I don't think they want bigger rewards - I think the app stops giving them a short-term goal once the easy early badges run out. My proposal is **Quests**: 3-5 lesson goals the student picks themselves, with a reward they choose upfront, and a new quest offered the moment one ends. AI personalizes which quests get suggested (from a teacher-written library - AI picks, humans write). Success is measured by lesson-4 conversion in an 8-week A/B test on new signups, with quiz accuracy as a guardrail so we never trade learning for engagement.

---

## 1. The Problem

Learnify gets students in the door - signups are strong, and students are enthusiastic when they start. Then 70% of them stop after completing just three lessons.

That number matters for two reasons. First, it means most of our acquisition spend is buying us three lessons, not a learner. Second, the drop happens *before* a habit could possibly form. Whatever is pulling students through lessons 1-3 stops working exactly at the moment the product needs to convert excitement into routine.

We already have gamification - badges, levels, leaderboards. Student feedback says the rewards "aren't motivating enough." So the interesting question isn't "should we add rewards?" We have rewards. The question is why they stop working after lesson 3.

## 2. What We Know vs What We Believe

Worth being honest about how little hard data the brief gives us.

**What we know (facts):**
- 70% of users drop off after completing three lessons.
- Signup enthusiasm is high, so acquisition and first impressions aren't the problem.
- Students say the gamified rewards aren't motivating enough.

**What we believe (plausible, but unproven):**
- The first badges arrive quickly and easily; after lesson 3, the next reward feels far away.
- Leaderboards only motivate students near the top. Being 214th is demotivating, not motivating.
- Rewards become predictable - the third badge feels like the first one, minus the novelty.
- After the onboarding path ends, there's no obvious "next thing to work toward."
- There's no strong reason to come back *tomorrow* specifically.

**What we'd validate before building (in a real setting):**
- The funnel lesson by lesson: is it a cliff at lesson 3 or a steady slide?
- Whether students quit mid-lesson (a content problem) or between sessions (a motivation problem).
- Reward interaction logs: do students even open the badges screen after day one?
- 8-10 short student interviews.

One thing shaped my whole approach here: "rewards aren't motivating" is what a student can *articulate*. I don't think they're asking for bigger rewards - I think the feedback is a symptom of a goal problem.

## 3. Root Cause Hypothesis

Picture the experience after lesson 3. The easy early badges are collected. The next level is a long grind away. The leaderboard confirms you're nowhere near the top. Every reward in the app points *backwards* - it certifies what you already did. Nothing points *forwards* and makes the next lesson feel worth doing today.

So my hypothesis:

> **Students drop off after lesson 3 because the app stops giving them a meaningful short-term goal.** Badges and levels reward the past. If every student always has a small, self-chosen goal - with a reward they actually picked - more of them will start lesson 4, and more of them will come back tomorrow.

This reframes the feedback: the fix isn't more rewards, it's restructuring rewards around *near goals the student chose*.

## 4. Product Opportunity

We don't need to rip out the existing gamification. We need one forward-pulling layer on top of it: something that ensures that at any moment, a student can answer the question *"what am I working toward right now, and why do I care?"* - and that the answer is always at most a few lessons away.

## 5. Proposed Solution: Quests

One feature: **Quests** - short, personal learning goals with a reward the student picks upfront.

How it works:

1. After finishing a lesson (starting with their very first), the student is offered **three suggested quests** - e.g. *Space Explorer: finish 3 science lessons*. Each comes with a one-line reason: *"You got every fraction question right this week - ready for level 2?"*
2. The student picks one, then picks **which reward they're playing for** (avatar gear, an app theme, or a surprise pack for kids who like mystery).
3. The quest is 3-5 lessons - finishable in two to four days. Its progress bar is the first thing they see on the home screen, and it fills visibly after every lesson.
4. Finishing a quest triggers a celebration, unlocks the chosen reward, and immediately offers the next three quests. **There is never a moment without a next goal.**

Four deliberate design choices:

- **Short.** The reward is always days away, never weeks - the same cadence that carried lessons 1-3.
- **Chosen, not assigned.** Picking your own quest and reward makes both feel like yours.
- **Reward known upfront.** Anticipating a specific thing you chose beats gambling on a mystery. (Surprise stays available as one *option*, for kids who genuinely like it.)
- **Ends with a beginning.** Completing a quest flows straight into choosing the next one.

### Where AI fits (and where it doesn't)

I want to be precise about this. Most of Quests is plain product logic: progress tracking, the reward economy, celebrations - none of that needs AI.

AI does one job: **deciding which three quests to suggest to which student, and at what difficulty.** That's a genuine personalization problem where rules fall short. "Always suggest the weakest subject" turns quests into homework. "Always suggest the strongest" never stretches anyone. The right next goal differs per student and shifts week to week - exactly what a lightweight recommendation model is good at.

- **Signals it needs:** lessons completed, accuracy by topic, pace, which quests the student picked before, which rewards they chose. All in-app learning behavior - no personal data beyond that.
- **What AI does NOT do:** it never generates free-form text for children. Quests, their descriptions, and encouragement lines are written and reviewed by the content team. The AI *selects and ranks* from that library. AI picks; humans write.
- **Transparency:** each suggestion shows its "why" line, so the recommendation never feels random - and gives us a debuggable surface if suggestions go wrong.
- **Cold start / failure mode:** new students get a default starter set; if the ranker misfires, the student still chooses from three options, so a bad suggestion costs little.

If we couldn't build the ranker in v1, Quests still works with simple heuristics - which is exactly why I'm comfortable shipping it. The AI improves the feature; it isn't a crutch holding it up.

## 6. Why This Solution (and not the others)

- **Mystery boxes** - variable rewards do drive behavior, but that's the slot-machine playbook, and these users are 11-14. It also doesn't fix the actual problem: you still don't know what you're working toward.
- **Friend challenges** - promising, but it needs your friends to already be on the app (a cold-start wall), and the leaderboard already tells us competition isn't retaining the middle of the pack. Worth revisiting later as optional *cooperative* duo quests.
- **Streaks** - proven retention mechanics, but they work partly through guilt over a broken streak. Not the relationship an education product should have with a 12-year-old. The prototype shows gentle weekly activity dots instead - nothing to lose.

Quests won because it's the only option that directly attacks the hypothesis: a near goal + a chosen reward + always a visible next step.

## 7. User Journey

Aarav, grade 7, is two lessons into his *Space Explorer* quest (3 science lessons → Astro Helmet for his avatar).

| Step | What he sees / does | What the system does | What he's feeling |
|---|---|---|---|
| Opens app | Quest card front and center: 2/3 lessons, "1 to go!", the helmet he picked | Surfaces the quest, not a generic menu | "I'm almost there" |
| Starts lesson | One tap on "Next up: Forces & Motion" | Serves the next quest lesson | Clear next action, no browsing |
| Completes lesson | Instant feedback per question, then +30 XP | Scores answers, updates progress | Small wins throughout |
| Sees progress | Quest bar animates 2/3 → 3/3 | Connects this lesson to his goal | "I finished the thing I chose" |
| Claims reward | Celebration; Astro Helmet added to his avatar | Unlocks the pre-chosen reward | Earned, not given |
| Picks next quest | 3 suggestions, each with a "why" line; picks Number Ninja, plays for the Robo Sidekick | AI ranks the library; student chooses | "This one's mine" |
| Next day | Home shows the new quest at 0/3 | The loop restarts itself | A concrete reason to return |

The journey's job in one sentence: Aarav should never open the app and wonder what to do or why to bother.

## 8. Product Design

The prototype (`/prototype`) covers six screens: **Home**, **Lesson**, **Lesson Complete**, **Quest Complete**, **Quest Picker** (quest → reward, two steps), and **Rewards/Collection**.

```
   HOME                          QUEST PICKER
 ┌──────────────────┐          ┌──────────────────┐
 │ 🙂 Hi, Aarav  Lv4 │          │ Pick your next    │
 │ ▪▪▫▪▫  this week  │          │ quest             │
 │ ┌──────────────┐ │          │ ┌──────────────┐  │
 │ │ ACTIVE QUEST │ │          │ │ 🥷 Number     │  │
 │ │ 🚀 Space      │ │          │ │    Ninja  ✓  │  │
 │ │ ███████──  2/3│ │          │ │ ✨ why: aced  │  │
 │ │ 🎁 Astro Helmet│ │         │ │   fractions  │  │
 │ └──────────────┘ │          │ ├──────────────┤  │
 │ [▶ Next lesson ] │          │ │ 🧙 Word Wizard│  │
 │ 🏠    🗺️    🎒    │          │ │ 🔴 Mars (5)   │  │
 └──────────────────┘          └──────────────────┘
```

UX decisions worth calling out:

- The quest card owns the home screen. Progress and the chosen reward are visible before anything else.
- The progress bar animates immediately after each lesson - progress you *watch happen* beats progress you're told about.
- The picker shows the "why" behind each suggestion, plus a footnote that quests are written by Learnify teachers.
- Rewards are cosmetic and identity-based (avatar gear, themes). **Learning content is never locked behind rewards.**
- Quests don't expire. No countdown timers, no streak to lose, no push-notification pressure.

## 9. Metrics

Three primary metrics:

1. **Lesson-4 conversion** (% of new students who complete a 4th lesson within 14 days of signup). This is the cliff itself. If Quests works, this moves first. *Expected: up meaningfully - the A/B test below targets +5pp.*
2. **D7 retention.** Short quests are meant to create a reason to return tomorrow; D7 tells us whether a return habit is forming, not just a longer first session. *Expected: up, lagging lesson-4 conversion.*
3. **Lessons completed per student (first 14 days).** Depth, not just survival. Protects us from celebrating students who open the app but don't learn. *Expected: up if the loop works; flat if students only poke at the quest UI.*

**Learning-quality guardrails** (must not degrade):
- Quiz accuracy per lesson - if it falls, students are racing through lessons for rewards.
- Mid-lesson abandonment rate - starting lessons for quest credit and bailing.
- Time per lesson - a collapse means skimming, not learning.

More sessions with worse accuracy is a failure, even if the retention chart looks great.

## 10. A/B Test

- **Population:** new signups only. Existing users carry habits and history that would muddy the read on a first-two-weeks problem.
- **Randomization:** 50/50 at account creation, stratified by grade.
- **Control:** current experience (badges, levels, leaderboards).
- **Experiment:** current experience + Quests, with the first quest picker appearing after the first completed lesson.
- **Primary metric:** lesson-4 conversion within 14 days of signup.
- **Secondary:** D7 retention, lessons per student, quest adoption (% who pick a quest), quest completion rate.
- **Guardrails:** quiz accuracy, mid-lesson abandonment, time per lesson, uninstall rate.
- **Sizing (assumptions, clearly labeled):** if baseline lesson-4 conversion is ~30% and we want to detect a +5pp lift at 80% power, we need roughly 1,400 students per arm. At ~500 signups/week that's about 6 weeks of enrollment; each student is observed for 14 days, so the whole test runs ~8 weeks.
- **Decision criteria:**
  - Ship: primary metric up ≥5pp (statistically significant), guardrails flat.
  - Iterate: directionally positive but below target - dig into where the loop leaks (adoption? completion? second quest?).
  - Rethink: flat despite healthy adoption (>60% pick a quest) - the goal-gap hypothesis is wrong, and that's worth knowing.
  - Fix discovery first: adoption under ~40% means we're testing a feature students never saw, not a feature that failed.

## 11. Risks

- **Optimizing for rewards over learning.** The biggest one. Mitigations: cosmetic-only rewards, the accuracy guardrail, and lessons never locked behind quest items.
- **Quest treadmill pressure.** "Always a next goal" must not become "never allowed to rest." Quests don't expire, skipping the picker is fine, no nag notifications.
- **Over-gamification.** Adding a layer to an app whose gamification already isn't working is a real irony risk. The bet is that the *type* of mechanic (forward goals vs. backward badges) is what's broken - the A/B test checks exactly that.
- **Competition creep.** Quests are deliberately solo in v1. If duo quests come later, cooperative beats competitive at this age.
- **Privacy.** Users are minors. The ranker uses in-app learning behavior only - no social graph, no free text about the child - with parental controls per COPPA/DPDP-style requirements.
- **AI errors.** A bad suggestion is low-cost by design (student picks from three; defaults exist), and no AI-generated free text ever reaches a child. Suggestion quality gets logged and human-reviewed.

## 12. Next Steps

**If it wins:** keep the reward catalog fresh (cosmetics go stale), grow the teacher-written quest library, improve ranking with the new data, then explore optional duo quests as the social step.

**If it's flat:** run the student interviews we flagged in section 2, and test goal-framing separately from reward content to find which half of the mechanic failed. Either way, instrument the funnel properly - the biggest gap in this whole analysis is how much we had to assume.

## 13. Final Recommendation

Build Quests and A/B test it with new signups. It attacks the most plausible root cause of the lesson-3 cliff - no meaningful short-term goal - with one contained feature, and uses AI only where personalization genuinely needs it. If it works, we've turned a reward problem into a goal system. If it doesn't, we'll know which assumption to attack next - at the cost of one small feature, not a redesign.

---

### Running the prototype

```
cd prototype
npm install
npm run dev
```

Then open http://localhost:5173. Complete the lesson to finish the active quest, claim the reward, and pick the next quest to see the full loop. (Prototype note: it's front-end only with mock data; each quest's first lesson is fully playable.)
