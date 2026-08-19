// All mock data for the prototype. No backend - this is a clickable concept.

export const student = {
  name: 'Aarav',
  grade: 7,
  startXp: 320,
  weekDays: ['M', 'T', 'W', 'T', 'F'],
  activeDays: [true, true, false, true, false], // which days he learned this week
}

// The quest Aarav is already on when the prototype opens (2 of 3 lessons done)
export const activeQuest = {
  id: 'space-explorer',
  title: 'Space Explorer',
  emoji: '🚀',
  subject: 'Science',
  goalLessons: 3,
  startProgress: 2,
  reward: { id: 'astro-helmet', name: 'Astro Helmet', emoji: '🧑‍🚀', kind: 'Avatar gear' },
  lessons: ['Gravity Basics', 'Speedy Science', 'Forces & Motion'],
}

// The three quests "suggested for Aarav" after he finishes Space Explorer.
// In the real product an AI ranker picks these from a teacher-written library;
// here they are hardcoded, including the "why" line the AI would surface.
export const suggestedQuests = [
  {
    id: 'number-ninja',
    title: 'Number Ninja',
    emoji: '🥷',
    subject: 'Math',
    goalLessons: 3,
    why: 'You got every fraction question right this week. Ready for level 2?',
    lessons: ['Fraction Power-Ups', 'Decimal Dash', 'Ratio Rumble'],
  },
  {
    id: 'word-wizard',
    title: 'Word Wizard',
    emoji: '🧙',
    subject: 'English',
    goalLessons: 3,
    why: "You haven't tried English yet - this one is short, see if you like it.",
    lessons: ['Story Detectives', 'Power Words', 'Plot Twist!'],
  },
  {
    id: 'mission-to-mars',
    title: 'Mission to Mars',
    emoji: '🔴',
    subject: 'Science',
    goalLessons: 5,
    why: 'You finish science lessons faster than 90% of learners. A bigger challenge.',
    lessons: ['Launch Day', 'Life Support', 'The Red Planet', 'Storm Warning', 'Landing'],
  },
]

// Rewards the student can choose to "play for" when starting a quest
export const rewardChoices = [
  {
    id: 'robo-sidekick',
    name: 'Robo Sidekick',
    emoji: '🤖',
    kind: 'Avatar buddy',
    blurb: 'A little robot that cheers next to your avatar',
  },
  {
    id: 'galaxy-theme',
    name: 'Galaxy Theme',
    emoji: '🌌',
    kind: 'App look',
    blurb: 'Turns your whole app dark-space purple',
  },
  {
    id: 'surprise-pack',
    name: 'Surprise Pack',
    emoji: '🎁',
    kind: 'Mystery',
    blurb: 'Like surprises? Get 3 mystery stickers',
  },
]

// What Aarav already owns before the session starts
export const startingCollection = [
  { id: 'blue-cap', name: 'Blue Cap', emoji: '🧢', kind: 'Avatar gear' },
  { id: 'lab-goggles', name: 'Lab Goggles', emoji: '🥽', kind: 'Avatar gear' },
]

export const badges = [
  { id: 'first-steps', name: 'First Steps', emoji: '🥉' },
  { id: 'science-whiz', name: 'Science Whiz', emoji: '🔬' },
  { id: 'quick-thinker', name: 'Quick Thinker', emoji: '⚡' },
]

// One playable lesson per subject so every suggested quest can be started
export const lessonContent = {
  'Forces & Motion': {
    subject: 'Science',
    questions: [
      {
        q: 'You kick a soccer ball and it slowly rolls to a stop. What force slows it down?',
        options: ['Friction', 'Gravity', 'Magnetism'],
        answer: 0,
        right: 'Yes! Friction between the ball and the grass steals its speed.',
        wrong: "It's friction - the ball rubbing against the grass slows it down.",
      },
      {
        q: 'Which needs MORE force to get moving: an empty shopping cart or a full one?',
        options: ['The empty cart', 'The full cart', 'Both need the same'],
        answer: 1,
        right: 'Right - more mass means more force to get it moving.',
        wrong: 'The full cart - heavier things need more force to start moving.',
      },
      {
        q: 'A rocket pushes hot gas DOWN. Which way does the rocket go?',
        options: ['Down', 'Sideways', 'Up'],
        answer: 2,
        right: 'Exactly! Every push has an equal push back the other way.',
        wrong: 'Up! Pushing gas down pushes the rocket up - action and reaction.',
      },
    ],
  },
  'Fraction Power-Ups': {
    subject: 'Math',
    questions: [
      {
        q: 'Which is bigger: 2/3 or 2/5?',
        options: ['2/3', '2/5', 'They are equal'],
        answer: 0,
        right: 'Yes! Same number of pieces, but thirds are bigger pieces than fifths.',
        wrong: "It's 2/3 - thirds are bigger slices than fifths.",
      },
      {
        q: 'You eat 3 slices of an 8-slice pizza. What fraction is LEFT?',
        options: ['3/8', '5/8', '3/5'],
        answer: 1,
        right: 'Nice - 8 slices minus 3 leaves 5 out of 8.',
        wrong: '5/8 - you ate 3 of the 8, so 5 slices remain.',
      },
      {
        q: 'What is 1/2 + 1/4?',
        options: ['2/6', '1/6', '3/4'],
        answer: 2,
        right: 'Correct! 1/2 is the same as 2/4, and 2/4 + 1/4 = 3/4.',
        wrong: "It's 3/4 - turn 1/2 into 2/4 first, then add.",
      },
    ],
  },
  'Story Detectives': {
    subject: 'English',
    questions: [
      {
        q: '"The wind whispered through the trees." What is this an example of?',
        options: ['Simile', 'Personification', 'Alliteration'],
        answer: 1,
        right: 'Yes! The wind gets a human ability - whispering.',
        wrong: "It's personification - the wind is given a human ability.",
      },
      {
        q: 'Pick the word that makes this sentence stronger: "The dog ___ across the yard."',
        options: ['went', 'sprinted', 'was'],
        answer: 1,
        right: 'Sprinted! Strong verbs paint a picture.',
        wrong: '"Sprinted" - specific verbs are stronger than "went".',
      },
      {
        q: 'What does "reluctant" mean?',
        options: ['Very excited', 'Not wanting to do something', 'Extremely tired'],
        answer: 1,
        right: 'Right - like being reluctant to leave a fun party.',
        wrong: 'It means not wanting to do something.',
      },
    ],
  },
  'Launch Day': {
    subject: 'Science',
    questions: [
      {
        q: 'Why do astronauts float on the space station?',
        options: [
          'There is no gravity in space',
          'They are constantly falling around Earth',
          'Their suits make them lighter',
        ],
        answer: 1,
        right: 'Whoa, yes - they are in free fall, going so fast they keep missing Earth!',
        wrong: 'Tricky one! They ARE pulled by gravity - they just fall around Earth forever.',
      },
      {
        q: 'Mars looks red because of…',
        options: ['Rusty iron dust on its surface', 'Its hot burning core', 'Red clouds in its sky'],
        answer: 0,
        right: 'Yes - Mars is basically covered in rust!',
        wrong: "It's rusty iron dust - Mars is covered in it.",
      },
      {
        q: "Sound can't travel through space because…",
        options: ["It's too cold", 'There is no air to carry it', 'It travels too slowly'],
        answer: 1,
        right: 'Correct - no air means nothing to carry the sound waves.',
        wrong: 'No air! Sound needs something to travel through.',
      },
    ],
  },
}

// Map each quest to the lesson that is playable in this prototype
export const firstPlayableLesson = {
  'space-explorer': 'Forces & Motion',
  'number-ninja': 'Fraction Power-Ups',
  'word-wizard': 'Story Detectives',
  'mission-to-mars': 'Launch Day',
}
