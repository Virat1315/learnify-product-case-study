# Learnify Quests - interactive prototype

A clickable concept for the Quests feature. React + Vite + Tailwind, front-end only, all mock data.

```
npm install
npm run dev
```

Open http://localhost:5173.

## What to click

You start as Aarav, 2 of 3 lessons into the "Space Explorer" quest.

1. **Home** - the active quest owns the screen: progress, and the reward Aarav picked (Astro Helmet).
2. Tap **"Next up: Forces & Motion"** and answer the 3 questions.
3. **Lesson complete** - watch the quest bar fill from 2/3 to 3/3.
4. **Claim the reward** - the helmet joins the collection (check the avatar top-left afterwards).
5. **Pick the next quest** - 3 suggestions, each with the "why this one for you" line the AI ranker would surface, then pick which reward you're playing for.
6. Explore the **Quest** and **Rewards** tabs in the bottom nav.

## Prototype notes

- Every suggested quest's first lesson is fully playable (Math, English and Science content included); later lessons in a quest reuse the first lesson's content.
- The "AI suggestions" are hardcoded - in the real product a ranker would pick them from a teacher-written quest library (see the case study, section 5).
