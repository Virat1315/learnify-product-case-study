import { useState } from 'react'
import {
  student,
  activeQuest,
  suggestedQuests,
  rewardChoices,
  startingCollection,
  badges,
  lessonContent,
  firstPlayableLesson,
} from './data.js'

const XP_PER_LESSON = 30

/* ---------------------------------- shared bits ---------------------------------- */

function ProgressBar({ value, max, from, className = '', barClass = 'bg-sun' }) {
  const pct = Math.min(100, (value / max) * 100)
  const fromPct = from != null ? Math.min(100, (from / max) * 100) : null
  return (
    <div className={`h-3 rounded-full bg-black/15 overflow-hidden ${className}`}>
      <div
        className={`h-full rounded-full ${barClass} ${fromPct != null ? 'fill-bar' : ''}`}
        style={
          fromPct != null
            ? { '--from-w': `${fromPct}%`, '--to-w': `${pct}%` }
            : { width: `${pct}%` }
        }
      />
    </div>
  )
}

function SubjectChip({ subject }) {
  const styles = {
    Science: 'bg-mint/15 text-mint-dark',
    Math: 'bg-grape/15 text-grape-dark',
    English: 'bg-coral/15 text-coral',
  }
  return (
    <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${styles[subject]}`}>
      {subject}
    </span>
  )
}

function BigButton({ children, onClick, color = 'bg-mint', shadow = 'shadow-[0_4px_0_#1fa28a]' }) {
  return (
    <button
      onClick={onClick}
      className={`btn-3d w-full py-3.5 rounded-2xl text-white font-extrabold text-base hover:brightness-105 ${color} ${shadow}`}
    >
      {children}
    </button>
  )
}

function Confetti() {
  const bits = ['🎉', '⭐', '🎊', '✨', '🌟', '🎈', '💫', '⭐', '🎊', '✨']
  return (
    <div className="pointer-events-none absolute inset-x-0 top-16 h-40">
      {bits.map((b, i) => (
        <span
          key={i}
          className="confetti"
          style={{
            left: `${6 + i * 9.5}%`,
            top: `${(i % 3) * 26}px`,
            fontSize: i % 2 ? '22px' : '28px',
            animationDelay: `${i * 0.09}s`,
          }}
        >
          {b}
        </span>
      ))}
    </div>
  )
}

/* ------------------------------------- screens ------------------------------------ */

function HomeScreen({ quest, progress, xp, collection, nextLessonName, onStartLesson, onNav }) {
  const questDone = progress >= quest.goalLessons
  const hasHelmet = collection.some((r) => r.id === 'astro-helmet')
  return (
    <div className="px-5 pb-24 pt-6">
      {/* header */}
      <div className="flex items-center gap-3">
        <button onClick={() => onNav('rewards')} className="text-4xl bg-white rounded-full w-14 h-14 flex items-center justify-center shadow-sm">
          {hasHelmet ? '🧑‍🚀' : '🙂'}
        </button>
        <div className="flex-1">
          <p className="font-extrabold text-lg leading-tight">Hi, {student.name}!</p>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-[11px] font-bold bg-grape text-white px-2 py-0.5 rounded-full">
              Lv {Math.floor(xp / 100) + 1}
            </span>
            <ProgressBar value={xp % 100} max={100} className="flex-1 h-2" barClass="bg-grape" />
            <span className="text-[11px] font-bold text-ink/50">{100 - (xp % 100)} XP to go</span>
          </div>
        </div>
      </div>

      {/* week activity - deliberately gentle, no streak counter */}
      <div className="mt-4 bg-white rounded-2xl px-4 py-3 flex items-center justify-between shadow-sm">
        <p className="text-xs font-bold text-ink/60">This week</p>
        <div className="flex gap-2">
          {student.weekDays.map((d, i) => (
            <div key={i} className="flex flex-col items-center gap-1">
              <span className="text-[10px] font-bold text-ink/40">{d}</span>
              <div
                className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${
                  student.activeDays[i] ? 'bg-mint text-white' : 'bg-black/8'
                }`}
              >
                {student.activeDays[i] ? '✓' : ''}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* active quest card */}
      <button onClick={() => onNav('quest')} className="relative overflow-hidden w-full text-left mt-4 rounded-3xl bg-gradient-to-br from-grape to-grape-dark text-white p-5 shadow-lg hover:brightness-105 transition">
        <span className="absolute top-3 right-16 text-white/20 text-lg select-none">✦</span>
        <span className="absolute bottom-10 right-6 text-white/15 text-sm select-none">✦</span>
        <span className="absolute top-12 left-40 text-white/10 text-xl select-none">✦</span>
        <div className="flex items-center justify-between">
          <p className="text-[11px] font-extrabold tracking-widest text-white/70">ACTIVE QUEST</p>
          <span className="text-[11px] font-bold bg-white/20 px-2 py-0.5 rounded-full">
            {progress}/{quest.goalLessons} lessons
          </span>
        </div>
        <div className="flex items-center gap-3 mt-2">
          <span className="text-4xl">{quest.emoji}</span>
          <div>
            <p className="font-extrabold text-xl leading-tight">{quest.title}</p>
            <p className="text-xs text-white/70">{quest.subject}</p>
          </div>
        </div>
        <ProgressBar value={progress} max={quest.goalLessons} className="shine mt-4 bg-white/20" />
        <div className="mt-3 flex items-center justify-between">
          <span className="text-xs font-bold bg-white/15 rounded-full px-3 py-1.5">
            Playing for: {quest.reward.emoji} {quest.reward.name}
          </span>
          <span className="text-xs font-bold text-sun">
            {questDone ? 'Done! 🎉' : `${quest.goalLessons - progress} to go!`}
          </span>
        </div>
      </button>

      {/* next lesson CTA */}
      <div className="mt-4">
        {questDone ? (
          <BigButton onClick={() => onNav('questComplete')} color="bg-sun" shadow="shadow-[0_4px_0_#e09a10]">
            🎁 Claim your quest reward!
          </BigButton>
        ) : (
          <BigButton onClick={onStartLesson}>▶ &nbsp;Next up: {nextLessonName}</BigButton>
        )}
      </div>

      {/* subjects */}
      <p className="mt-6 mb-2 text-xs font-extrabold tracking-wide text-ink/50">EXPLORE SUBJECTS</p>
      <div className="grid grid-cols-3 gap-3">
        {[
          ['🔬', 'Science'],
          ['➗', 'Math'],
          ['📚', 'English'],
        ].map(([icon, name]) => (
          <div key={name} className="bg-white rounded-2xl py-3 flex flex-col items-center gap-1 shadow-sm">
            <span className="text-2xl">{icon}</span>
            <span className="text-xs font-bold text-ink/70">{name}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function QuestScreen({ quest, progress, onStartLesson, onNav }) {
  const questDone = progress >= quest.goalLessons
  return (
    <div className="px-5 pb-24 pt-6">
      <p className="text-[11px] font-extrabold tracking-widest text-ink/40">YOUR QUEST</p>
      <div className="mt-2 flex items-center gap-3">
        <span className="text-5xl">{quest.emoji}</span>
        <div>
          <h1 className="font-extrabold text-2xl leading-tight">{quest.title}</h1>
          <SubjectChip subject={quest.subject} />
        </div>
      </div>

      <div className="mt-4 bg-white rounded-3xl p-5 shadow-sm">
        <div className="flex items-center justify-between mb-2">
          <p className="text-xs font-extrabold text-ink/50">PROGRESS</p>
          <p className="text-xs font-bold text-ink/60">
            {progress} of {quest.goalLessons} lessons
          </p>
        </div>
        <ProgressBar value={progress} max={quest.goalLessons} />
        <div className="mt-4 space-y-2">
          {quest.lessons.map((name, i) => {
            const done = i < progress
            const isNext = i === progress
            return (
              <div
                key={name}
                className={`flex items-center gap-3 rounded-xl px-3 py-2.5 ${
                  isNext ? 'bg-grape/10 ring-2 ring-grape/40' : done ? 'bg-mint/10' : 'bg-black/4'
                }`}
              >
                <span
                  className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-extrabold ${
                    done ? 'bg-mint text-white' : isNext ? 'bg-grape text-white' : 'bg-black/10 text-ink/40'
                  }`}
                >
                  {done ? '✓' : i + 1}
                </span>
                <span className={`text-sm font-bold ${done ? 'text-ink/40 line-through' : 'text-ink'}`}>
                  {name}
                </span>
                {isNext && !questDone && (
                  <span className="ml-auto text-[11px] font-extrabold text-grape">NEXT</span>
                )}
              </div>
            )
          })}
        </div>
      </div>

      <div className="mt-4 bg-white rounded-3xl p-5 shadow-sm flex items-center gap-4">
        <span className="text-4xl wiggle">{quest.reward.emoji}</span>
        <div>
          <p className="text-xs font-extrabold text-ink/50">YOU PICKED THIS REWARD</p>
          <p className="font-extrabold">{quest.reward.name}</p>
          <p className="text-xs text-ink/50">Unlocks when you finish the quest</p>
        </div>
      </div>

      <div className="mt-4">
        {questDone ? (
          <BigButton onClick={() => onNav('questComplete')} color="bg-sun" shadow="shadow-[0_4px_0_#e09a10]">
            🎁 Claim your quest reward!
          </BigButton>
        ) : (
          <BigButton onClick={onStartLesson}>▶ &nbsp;Continue quest</BigButton>
        )}
      </div>
      <p className="mt-3 text-center text-[11px] text-ink/40 font-medium">
        Finish this quest to pick your next one 🗺️
      </p>
    </div>
  )
}

function LessonScreen({ lessonName, onComplete, onExit }) {
  const lesson = lessonContent[lessonName]
  const [qIndex, setQIndex] = useState(0)
  const [picked, setPicked] = useState(null)
  const [numRight, setNumRight] = useState(0)
  const question = lesson.questions[qIndex]
  const answered = picked != null
  const wasRight = answered && picked === question.answer

  const next = () => {
    if (qIndex + 1 >= lesson.questions.length) {
      onComplete(numRight)
    } else {
      setQIndex(qIndex + 1)
      setPicked(null)
    }
  }

  return (
    <div className="px-5 pt-6 pb-8 flex flex-col min-h-full">
      <div className="flex items-center gap-3">
        <button onClick={onExit} className="text-ink/40 font-extrabold text-lg px-1">
          ✕
        </button>
        <div className="flex-1 flex gap-1.5">
          {lesson.questions.map((_, i) => (
            <div
              key={i}
              className={`h-2 flex-1 rounded-full ${
                i < qIndex || (i === qIndex && answered && wasRight)
                  ? 'bg-mint'
                  : i === qIndex
                    ? 'bg-grape'
                    : 'bg-black/10'
              }`}
            />
          ))}
        </div>
        <SubjectChip subject={lesson.subject} />
      </div>

      <p className="mt-5 text-xs font-extrabold text-ink/40 tracking-wide">{lessonName.toUpperCase()}</p>
      <h2 className="mt-1 font-extrabold text-xl leading-snug">{question.q}</h2>

      <div className="mt-5 space-y-3">
        {question.options.map((opt, i) => {
          let style = 'bg-white shadow-sm'
          if (answered && i === question.answer) style = 'bg-mint/15 ring-2 ring-mint'
          else if (answered && i === picked) style = 'bg-coral/15 ring-2 ring-coral'
          else if (answered) style = 'bg-white opacity-50'
          return (
            <button
              key={i}
              disabled={answered}
              onClick={() => {
                setPicked(i)
                if (i === question.answer) setNumRight((n) => n + 1)
              }}
              className={`w-full text-left px-4 py-3.5 rounded-2xl font-bold text-sm ${style}`}
            >
              {opt}
              {answered && i === question.answer && <span className="float-right">✓</span>}
              {answered && i === picked && i !== question.answer && <span className="float-right">✕</span>}
            </button>
          )
        })}
      </div>

      {answered && (
        <div className={`rise mt-4 rounded-2xl px-4 py-3 text-sm font-bold ${wasRight ? 'bg-mint/15 text-mint-dark' : 'bg-sun/20 text-sun-dark'}`}>
          {wasRight ? question.right : question.wrong}
        </div>
      )}

      <div className="mt-auto pt-5">
        {answered && (
          <BigButton onClick={next} color="bg-grape" shadow="shadow-[0_4px_0_#5538d4]">
            {qIndex + 1 >= lesson.questions.length ? 'Finish lesson' : 'Next question'}
          </BigButton>
        )}
      </div>
    </div>
  )
}

function LessonCompleteScreen({ quest, progress, numRight, numQuestions, onContinue }) {
  const questDone = progress >= quest.goalLessons
  return (
    <div className="px-5 pt-10 pb-8 flex flex-col min-h-full text-center relative">
      <Confetti />
      <span className="text-6xl pop-in">🎉</span>
      <h1 className="mt-3 font-extrabold text-2xl">Lesson complete!</h1>
      <p className="mt-1 text-sm font-bold text-ink/50">
        {numRight}/{numQuestions} correct
      </p>
      <div className="mt-4 mx-auto pop-in bg-sun/20 text-sun-dark font-extrabold px-5 py-2 rounded-full">
        +{XP_PER_LESSON} XP
      </div>

      <div className="rise-late mt-6 bg-white rounded-3xl p-5 shadow-sm text-left">
        <div className="flex items-center justify-between">
          <p className="text-xs font-extrabold text-ink/50">QUEST PROGRESS</p>
          <p className="text-xs font-extrabold text-grape">
            {quest.emoji} {quest.title}
          </p>
        </div>
        <ProgressBar value={progress} max={quest.goalLessons} from={progress - 1} className="mt-3" />
        <p className="mt-3 text-sm font-bold text-center">
          {questDone
            ? `Quest complete! Your ${quest.reward.name} is waiting 🎁`
            : `${quest.goalLessons - progress} more lesson${quest.goalLessons - progress > 1 ? 's' : ''} to unlock ${quest.reward.emoji} ${quest.reward.name}`}
        </p>
      </div>

      <div className="mt-auto pt-6">
        <BigButton
          onClick={onContinue}
          color={questDone ? 'bg-sun' : 'bg-mint'}
          shadow={questDone ? 'shadow-[0_4px_0_#e09a10]' : 'shadow-[0_4px_0_#1fa28a]'}
        >
          {questDone ? '🎁 Claim your reward!' : 'Keep going'}
        </BigButton>
      </div>
    </div>
  )
}

function QuestCompleteScreen({ quest, onPickNext }) {
  return (
    <div className="px-5 pt-10 pb-8 flex flex-col min-h-full text-center relative">
      <Confetti />
      <p className="text-[11px] font-extrabold tracking-widest text-ink/40">QUEST COMPLETE</p>
      <h1 className="mt-1 font-extrabold text-2xl">
        {quest.emoji} {quest.title}
      </h1>
      <div className="pop-in mt-6 mx-auto bg-white rounded-3xl px-10 py-8 shadow-lg">
        <span className="text-7xl block wiggle">{quest.reward.emoji}</span>
        <p className="mt-3 font-extrabold text-lg">{quest.reward.name}</p>
        <p className="text-xs font-bold text-ink/50">{quest.reward.kind} · added to your collection</p>
      </div>
      <p className="rise-late mt-5 text-sm font-bold text-ink/60">
        You earned it - 3 lessons, all yours. 💪
      </p>
      <div className="mt-auto pt-6 space-y-3">
        <BigButton onClick={onPickNext} color="bg-grape" shadow="shadow-[0_4px_0_#5538d4]">
          Pick your next quest →
        </BigButton>
      </div>
    </div>
  )
}

function QuestPickerScreen({ onConfirm }) {
  const [step, setStep] = useState('quest') // 'quest' | 'reward'
  const [questPick, setQuestPick] = useState(null)
  const [rewardPick, setRewardPick] = useState(null)

  if (step === 'quest') {
    return (
      <div className="px-5 pt-8 pb-8 flex flex-col min-h-full">
        <h1 className="font-extrabold text-2xl">Pick your next quest</h1>
        <p className="mt-1 text-sm font-bold text-ink/50">Picked for you, based on how you learn ✨</p>
        <div className="mt-5 space-y-3">
          {suggestedQuests.map((q) => (
            <button
              key={q.id}
              onClick={() => setQuestPick(q)}
              className={`w-full text-left bg-white rounded-3xl p-4 shadow-sm transition ${
                questPick?.id === q.id ? 'ring-3 ring-grape' : ''
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="text-3xl">{q.emoji}</span>
                <div className="flex-1">
                  <p className="font-extrabold">{q.title}</p>
                  <div className="flex items-center gap-2 mt-0.5">
                    <SubjectChip subject={q.subject} />
                    <span className="text-[11px] font-bold text-ink/40">{q.goalLessons} lessons</span>
                  </div>
                </div>
                {questPick?.id === q.id && <span className="text-grape font-extrabold">✓</span>}
              </div>
              <p className="mt-2 text-xs font-medium text-ink/60 bg-paper rounded-xl px-3 py-2">
                ✨ {q.why}
              </p>
            </button>
          ))}
        </div>
        <p className="mt-4 text-center text-[11px] text-ink/40 font-medium">
          Quests are written by Learnify teachers. Suggestions are picked for you.
        </p>
        <div className="mt-auto pt-4">
          {questPick && (
            <BigButton onClick={() => setStep('reward')} color="bg-grape" shadow="shadow-[0_4px_0_#5538d4]">
              Next: pick your reward
            </BigButton>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="px-5 pt-8 pb-8 flex flex-col min-h-full">
      <p className="text-[11px] font-extrabold tracking-widest text-ink/40">
        {questPick.emoji} {questPick.title.toUpperCase()}
      </p>
      <h1 className="mt-1 font-extrabold text-2xl">What are you playing for?</h1>
      <p className="mt-1 text-sm font-bold text-ink/50">
        Finish {questPick.goalLessons} lessons and it's yours
      </p>
      <div className="mt-5 space-y-3">
        {rewardChoices.map((r) => (
          <button
            key={r.id}
            onClick={() => setRewardPick(r)}
            className={`w-full text-left bg-white rounded-3xl p-4 shadow-sm flex items-center gap-4 transition ${
              rewardPick?.id === r.id ? 'ring-3 ring-sun' : ''
            }`}
          >
            <span className="text-4xl">{r.emoji}</span>
            <div className="flex-1">
              <p className="font-extrabold">{r.name}</p>
              <p className="text-xs font-medium text-ink/50">{r.blurb}</p>
            </div>
            {rewardPick?.id === r.id && <span className="text-sun-dark font-extrabold">✓</span>}
          </button>
        ))}
      </div>
      <div className="mt-auto pt-4">
        {rewardPick && (
          <BigButton onClick={() => onConfirm(questPick, rewardPick)}>
            🚀 Start {questPick.title}!
          </BigButton>
        )}
      </div>
    </div>
  )
}

function RewardsScreen({ collection }) {
  const lockedSlots = 3
  return (
    <div className="px-5 pb-24 pt-6">
      <h1 className="font-extrabold text-2xl">Your collection</h1>
      <div className="mt-4 bg-gradient-to-br from-grape to-grape-dark rounded-3xl p-5 text-white flex items-center gap-4 shadow-lg">
        <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center text-4xl">
          {collection.some((r) => r.id === 'astro-helmet') ? '🧑‍🚀' : '🙂'}
        </div>
        <div>
          <p className="font-extrabold">{student.name}'s avatar</p>
          <p className="text-xs text-white/70">Grade {student.grade} · Quest rewards show up here</p>
        </div>
      </div>

      <p className="mt-6 mb-2 text-xs font-extrabold tracking-wide text-ink/50">QUEST REWARDS</p>
      <div className="grid grid-cols-3 gap-3">
        {collection.map((r) => (
          <div key={r.id} className="bg-white rounded-2xl py-4 flex flex-col items-center gap-1 shadow-sm">
            <span className="text-3xl">{r.emoji}</span>
            <span className="text-[11px] font-bold text-ink/70 text-center px-1">{r.name}</span>
          </div>
        ))}
        {Array.from({ length: lockedSlots }).map((_, i) => (
          <div
            key={i}
            className="rounded-2xl py-4 flex flex-col items-center gap-1 border-2 border-dashed border-black/10"
          >
            <span className="text-3xl opacity-30">🔒</span>
            <span className="text-[11px] font-bold text-ink/30">Finish quests</span>
          </div>
        ))}
      </div>

      <p className="mt-6 mb-2 text-xs font-extrabold tracking-wide text-ink/50">BADGES</p>
      <div className="flex gap-3">
        {badges.map((b) => (
          <div key={b.id} className="flex-1 bg-white rounded-2xl py-3 flex flex-col items-center gap-1 shadow-sm">
            <span className="text-2xl">{b.emoji}</span>
            <span className="text-[10px] font-bold text-ink/60">{b.name}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function BottomNav({ active, onNav }) {
  const items = [
    ['home', '🏠', 'Home'],
    ['quest', '🗺️', 'Quest'],
    ['rewards', '🎒', 'Rewards'],
  ]
  return (
    <div className="absolute bottom-0 inset-x-0 bg-white border-t border-black/5 flex justify-around py-2 rounded-b-[2rem]">
      {items.map(([key, icon, label]) => (
        <button
          key={key}
          onClick={() => onNav(key)}
          className={`flex flex-col items-center gap-0.5 px-4 py-1 rounded-xl ${
            active === key ? 'text-grape' : 'text-ink/35'
          }`}
        >
          <span className="text-xl">{icon}</span>
          <span className="text-[10px] font-extrabold">{label}</span>
        </button>
      ))}
    </div>
  )
}

/* --------------------------------------- app ------------------------------------- */

export default function App() {
  const [screen, setScreen] = useState('home')
  const [xp, setXp] = useState(student.startXp)
  const [quest, setQuest] = useState(activeQuest)
  const [progress, setProgress] = useState(activeQuest.startProgress)
  const [collection, setCollection] = useState(startingCollection)
  const [lastScore, setLastScore] = useState({ right: 0, total: 3 })

  const currentLessonName =
    quest.lessons && progress < quest.lessons.length ? quest.lessons[progress] : null
  // In this prototype only the first lesson of each new quest is playable
  const playableLesson =
    currentLessonName && lessonContent[currentLessonName]
      ? currentLessonName
      : firstPlayableLesson[quest.id]

  const completeLesson = (numRight) => {
    setXp((x) => x + XP_PER_LESSON)
    setProgress((p) => p + 1)
    setLastScore({ right: numRight, total: lessonContent[playableLesson].questions.length })
    setScreen('lessonComplete')
  }

  const claimQuestReward = () => {
    setCollection((c) => [{ ...quest.reward }, ...c])
    setScreen('questCelebration')
  }

  const startNewQuest = (pickedQuest, pickedReward) => {
    setQuest({ ...pickedQuest, reward: pickedReward })
    setProgress(0)
    setScreen('home')
  }

  const showNav = ['home', 'quest', 'rewards'].includes(screen)

  return (
    <div className="backdrop min-h-screen flex items-center justify-center p-6">
      <div className="flex flex-col items-center gap-4">
        {/* phone frame */}
        <div className="relative w-[390px] h-[780px] bg-paper rounded-[2.2rem] shadow-2xl overflow-hidden ring-8 ring-ink/90">
          {/* fake status bar */}
          <div className="absolute top-0 inset-x-0 z-10 flex justify-between items-center px-6 pt-2 text-[11px] font-bold text-ink/40 pointer-events-none">
            <span>9:41</span>
            <span>📶 🔋</span>
          </div>
          <div key={screen} className="screen-in h-full overflow-y-auto pt-4">
            {screen === 'home' && (
              <HomeScreen
                quest={quest}
                progress={progress}
                xp={xp}
                collection={collection}
                nextLessonName={playableLesson}
                onStartLesson={() => setScreen('lesson')}
                onNav={(s) => (s === 'questComplete' ? claimQuestReward() : setScreen(s))}
              />
            )}
            {screen === 'quest' && (
              <QuestScreen
                quest={quest}
                progress={progress}
                onStartLesson={() => setScreen('lesson')}
                onNav={(s) => (s === 'questComplete' ? claimQuestReward() : setScreen(s))}
              />
            )}
            {screen === 'lesson' && (
              <LessonScreen
                lessonName={playableLesson}
                onComplete={completeLesson}
                onExit={() => setScreen('home')}
              />
            )}
            {screen === 'lessonComplete' && (
              <LessonCompleteScreen
                quest={quest}
                progress={progress}
                numRight={lastScore.right}
                numQuestions={lastScore.total}
                onContinue={() =>
                  progress >= quest.goalLessons ? claimQuestReward() : setScreen('home')
                }
              />
            )}
            {screen === 'questCelebration' && (
              <QuestCompleteScreen quest={quest} onPickNext={() => setScreen('questPicker')} />
            )}
            {screen === 'questPicker' && <QuestPickerScreen onConfirm={startNewQuest} />}
            {screen === 'rewards' && <RewardsScreen collection={collection} />}
          </div>
          {showNav && <BottomNav active={screen} onNav={setScreen} />}
        </div>
        <p className="text-xs font-bold text-ink/40 max-w-[390px] text-center">
          Learnify Quests · interactive prototype - finish the lesson to complete the quest, then
          pick your next one
        </p>
      </div>
    </div>
  )
}
