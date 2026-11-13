
import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
    ArrowLeft,
    ArrowRight,
    BookOpen,
    CalendarDays,
    CheckCircle2,
    Circle,
    Clock,
    Flag,
    GraduationCap,
    RefreshCw,
    Save,
    Target,
    Trophy,
    XCircle,
} from 'lucide-react'
import {
    getChapterNineHabits,
    saveChapterNineHabits,
    getChapterNineCareerGoal,
    saveChapterNineCareerGoal,
    getChapterNineWeeklyPlan,
    saveChapterNineWeeklyPlan,
    getChapterNineReflection,
    saveChapterNineReflection,
    isChapterCompleted,
    setChapterCompleted,
} from '../../services/storage/progressStorage'

const modules = [
    {
        number: '01',
        title: 'The Power of Consistency',
        description:
            'Understand why consistent learning, deliberate practice, and small improvements create long-term professional growth.',
        points: [
            'Build a daily learning habit.',
            'Practice technical skills regularly.',
            'Measure progress instead of waiting for perfection.',
        ],
    },
    {
        number: '02',
        title: 'Time and Priority Management',
        description:
            'Learn to manage academic responsibilities, projects, technical preparation, and personal development.',
        points: [
            'Identify your highest-priority tasks.',
            'Break large goals into smaller activities.',
            'Use focused study sessions and realistic deadlines.',
        ],
    },
    {
        number: '03',
        title: 'Your Weekly Career Routine',
        description:
            'Create a repeatable weekly structure for learning, building, networking, and reviewing your progress.',
        points: [
            'Schedule technical learning.',
            'Allocate time for projects and practice.',
            'Review your achievements every week.',
        ],
    },
    {
        number: '04',
        title: 'Goal Setting and Progress Tracking',
        description:
            'Convert your career ambitions into measurable goals with clear outcomes and deadlines.',
        points: [
            'Set specific and realistic goals.',
            'Track completed activities.',
            'Adjust your approach when necessary.',
        ],
    },
    {
        number: '05',
        title: 'Professional Growth Mindset',
        description:
            'Develop the ability to learn from feedback, adapt to new technologies, and respond constructively to challenges.',
        points: [
            'Accept constructive feedback.',
            'Stay curious about industry developments.',
            'Treat mistakes as opportunities to improve.',
        ],
    },
    {
        number: '06',
        title: 'Your Career Starts Now',
        description:
            'Bring together everything you learned in CAREERVERSE and create a personal career-development commitment.',
        points: [
            'Review your learning journey.',
            'Choose your next professional milestone.',
            'Commit to taking consistent action.',
        ],
    },
]

const habitOptions = [
    'Practice programming or technical skills',
    'Learn a new concept or technology',
    'Solve coding or aptitude problems',
    'Work on a portfolio project',
    'Read technical documentation or research',
    'Improve communication and English',
    'Update GitHub or professional profiles',
    'Review career goals and weekly progress',
]

const checklistSections = [
    'habit-section',
    'goal-section',
    'weekly-section',
    'reflection-section',
]

export default function ChapterNine() {
    const [selectedHabits, setSelectedHabits] = useState<string[]>(
        () => getChapterNineHabits(),
    )
    const [careerGoal, setCareerGoal] = useState(
        () => getChapterNineCareerGoal(),
    )
    const [weeklyPlan, setWeeklyPlan] = useState(
        () => getChapterNineWeeklyPlan(),
    )
    const [reflection, setReflection] = useState(
        () => getChapterNineReflection(),
    )
    const [isCompleted, setIsCompleted] = useState(
        () => isChapterCompleted(9),
    )
    const [saved, setSaved] = useState(false)

    const requirements = [
        selectedHabits.length >= 3,
        careerGoal.trim().length >= 20,
        weeklyPlan.trim().length >= 30,
        reflection.trim().length >= 40,
    ]

    const completedCount = requirements.filter(Boolean).length
    const progress = Math.round(
        (completedCount / requirements.length) * 100,
    )

    const resetCompletion = () => {
        setSaved(false)

        const completionSaved = setChapterCompleted(9, false)

        if (completionSaved) {
            setIsCompleted(false)
        }
    }

    const toggleHabit = (habit: string) => {
        setSelectedHabits((previous) =>
            previous.includes(habit)
                ? previous.filter((item) => item !== habit)
                : [...previous, habit],
        )

        resetCompletion()
    }

    const updateField = (
        setter: (value: string) => void,
        value: string,
    ) => {
        setter(value)
        resetCompletion()
    }

    const navigateToActivity = (index: number) => {
        document
            .getElementById(checklistSections[index])
            ?.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }

    const saveProgress = () => {
        if (!requirements.every(Boolean)) {
            setSaved(false)
            setIsCompleted(false)
            return
        }

        const habitsSaved = saveChapterNineHabits(selectedHabits)
        const goalSaved = saveChapterNineCareerGoal(careerGoal)
        const weeklyPlanSaved = saveChapterNineWeeklyPlan(weeklyPlan)
        const reflectionSaved = saveChapterNineReflection(reflection)

        const completionSaved = setChapterCompleted(9, true)

        const allSaved =
            habitsSaved &&
            goalSaved &&
            weeklyPlanSaved &&
            reflectionSaved &&
            completionSaved

        if (!allSaved) {
            setSaved(false)
            alert('Unable to save your progress. Please try again.')
            return
        }

        setIsCompleted(true)
        setSaved(true)
    }

    return (
        <div className="min-h-screen bg-slate-950 text-white">
            <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
                <Link
                    to="/student/dashboard"
                    className="mb-8 inline-flex items-center gap-2 text-sm text-slate-400 transition hover:text-white"
                >
                    <ArrowLeft size={17} />
                    Back to Dashboard
                </Link>

                <section className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-indigo-950 via-slate-900 to-purple-950 p-7 sm:p-10">
                    <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-indigo-500/10 blur-3xl" />

                    <div className="relative z-10">
                        <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-indigo-300/20 bg-indigo-400/10 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-indigo-200">
                            <Trophy size={15} />
                            Final Chapter
                        </div>

                        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-indigo-300">
                            Chapter 09
                        </p>

                        <h1 className="max-w-3xl text-3xl font-bold leading-tight sm:text-5xl">
                            Habits and Wrap-Up
                        </h1>

                        <p className="mt-5 max-w-2xl text-base leading-7 text-slate-300">
                            Your career journey is built through consistent action.
                            Turn everything you have learned into habits, measurable
                            goals, and a practical plan for your future.
                        </p>

                        <div className="mt-8 flex flex-wrap gap-5 text-sm text-slate-300">
                            <span className="flex items-center gap-2">
                                <BookOpen size={17} />
                                6 Learning Modules
                            </span>
                            <span className="flex items-center gap-2">
                                <Clock size={17} />
                                45–60 Minutes
                            </span>
                            <span className="flex items-center gap-2">
                                <Flag size={17} />
                                Final Assessment
                            </span>
                        </div>
                    </div>
                </section>

                <section className="mt-8 rounded-2xl border border-white/10 bg-slate-900/70 p-6">
                    <div className="flex items-center gap-3">
                        <Target className="text-indigo-400" size={23} />
                        <h2 className="text-xl font-bold">Your Learning Objectives</h2>
                    </div>

                    <div className="mt-5 grid gap-4 sm:grid-cols-2">
                        {[
                            'Develop consistent learning habits.',
                            'Manage time and career priorities.',
                            'Build a realistic weekly routine.',
                            'Set measurable career goals.',
                            'Develop a professional growth mindset.',
                            'Create a personal career action plan.',
                        ].map((objective) => (
                            <div
                                key={objective}
                                className="flex items-start gap-3 text-sm leading-6 text-slate-300"
                            >
                                <CheckCircle2
                                    size={18}
                                    className="mt-0.5 shrink-0 text-indigo-400"
                                />
                                {objective}
                            </div>
                        ))}
                    </div>
                </section>

                <section className="mt-10">
                    <div className="mb-6">
                        <p className="text-xs font-semibold uppercase tracking-widest text-indigo-400">
                            Learning Content
                        </p>
                        <h2 className="mt-2 text-2xl font-bold">
                            Six Steps Towards Continuous Growth
                        </h2>
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
                        {modules.map((module) => (
                            <article
                                key={module.number}
                                className="rounded-2xl border border-white/10 bg-slate-900 p-6 transition hover:border-indigo-400/40"
                            >
                                <div className="mb-4 flex items-center justify-between">
                                    <span className="text-2xl font-bold text-indigo-400">
                                        {module.number}
                                    </span>
                                    <GraduationCap
                                        size={22}
                                        className="text-slate-500"
                                    />
                                </div>

                                <h3 className="text-lg font-bold">{module.title}</h3>

                                <p className="mt-3 text-sm leading-6 text-slate-400">
                                    {module.description}
                                </p>

                                <ul className="mt-4 space-y-2">
                                    {module.points.map((point) => (
                                        <li
                                            key={point}
                                            className="flex items-start gap-2 text-sm text-slate-300"
                                        >
                                            <CheckCircle2
                                                size={15}
                                                className="mt-0.5 shrink-0 text-indigo-400"
                                            />
                                            {point}
                                        </li>
                                    ))}
                                </ul>
                            </article>
                        ))}
                    </div>
                </section>

                <section
                    id="habit-section"
                    className="mt-12 scroll-mt-8 rounded-2xl border border-white/10 bg-slate-900 p-6 sm:p-8"
                >
                    <div className="flex items-center gap-3">
                        <RefreshCw className="text-indigo-400" size={23} />
                        <h2 className="text-xl font-bold">
                            Activity 1: Build Your Career Habits
                        </h2>
                    </div>

                    <p className="mt-3 text-sm leading-6 text-slate-400">
                        Select at least three activities that you want to include
                        in your regular career-development routine.
                    </p>

                    <div className="mt-6 grid gap-3 sm:grid-cols-2">
                        {habitOptions.map((habit) => {
                            const selected = selectedHabits.includes(habit)

                            return (
                                <button
                                    type="button"
                                    key={habit}
                                    onClick={() => toggleHabit(habit)}
                                    className={`flex items-center gap-3 rounded-xl border p-4 text-left text-sm transition ${selected
                                            ? 'border-indigo-400 bg-indigo-500/10 text-white'
                                            : 'border-white/10 bg-slate-950 text-slate-300 hover:border-white/30'
                                        }`}
                                >
                                    {selected ? (
                                        <CheckCircle2
                                            size={19}
                                            className="shrink-0 text-indigo-400"
                                        />
                                    ) : (
                                        <Circle
                                            size={19}
                                            className="shrink-0 text-slate-500"
                                        />
                                    )}
                                    {habit}
                                </button>
                            )
                        })}
                    </div>

                    <p className="mt-4 text-sm text-slate-400">
                        Selected habits: {selectedHabits.length} / 8
                    </p>
                </section>

                <section
                    id="goal-section"
                    className="mt-6 scroll-mt-8 rounded-2xl border border-white/10 bg-slate-900 p-6 sm:p-8"
                >
                    <div className="flex items-center gap-3">
                        <Target className="text-indigo-400" size={23} />
                        <h2 className="text-xl font-bold">
                            Activity 2: Define Your Career Goal
                        </h2>
                    </div>

                    <p className="mt-3 text-sm leading-6 text-slate-400">
                        Write one meaningful career goal. Explain what you want
                        to achieve, why it matters, and what your next milestone is.
                    </p>

                    <textarea
                        value={careerGoal}
                        onChange={(event) =>
                            updateField(setCareerGoal, event.target.value)
                        }
                        rows={5}
                        placeholder="Example: My goal is to become a software developer. I will strengthen my programming fundamentals, build practical projects, and prepare for technical interviews..."
                        className="mt-5 w-full rounded-xl border border-white/10 bg-slate-950 p-4 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-indigo-400"
                    />

                    <p className="mt-2 text-xs text-slate-500">
                        Minimum 20 characters. Current: {careerGoal.trim().length}
                    </p>
                </section>

                <section
                    id="weekly-section"
                    className="mt-6 scroll-mt-8 rounded-2xl border border-white/10 bg-slate-900 p-6 sm:p-8"
                >
                    <div className="flex items-center gap-3">
                        <CalendarDays className="text-indigo-400" size={23} />
                        <h2 className="text-xl font-bold">
                            Activity 3: Create Your Weekly Action Plan
                        </h2>
                    </div>

                    <p className="mt-3 text-sm leading-6 text-slate-400">
                        Describe how you will organize your week. Include time
                        for learning, practical work, career preparation, and
                        reviewing your progress.
                    </p>

                    <div className="mt-5 overflow-hidden rounded-xl border border-white/10">
                        <div className="grid grid-cols-2 bg-slate-950 text-xs font-semibold uppercase tracking-wider text-slate-400">
                            <div className="p-3">Focus Area</div>
                            <div className="border-l border-white/10 p-3">
                                Suggested Activity
                            </div>
                        </div>

                        {[
                            ['Technical Skills', 'Programming and technical practice'],
                            ['Projects', 'Build or improve a practical project'],
                            ['Career Preparation', 'Resume, interview, and applications'],
                            ['Professional Growth', 'Communication and networking'],
                            ['Weekly Review', 'Evaluate goals and completed tasks'],
                        ].map(([area, activity]) => (
                            <div
                                key={area}
                                className="grid grid-cols-2 border-t border-white/10 text-sm"
                            >
                                <div className="p-3 font-medium text-slate-200">
                                    {area}
                                </div>
                                <div className="border-l border-white/10 p-3 text-slate-400">
                                    {activity}
                                </div>
                            </div>
                        ))}
                    </div>

                    <textarea
                        value={weeklyPlan}
                        onChange={(event) =>
                            updateField(setWeeklyPlan, event.target.value)
                        }
                        rows={5}
                        placeholder="My weekly plan: Monday to Friday I will dedicate time to technical learning and project development. I will review my progress every week..."
                        className="mt-5 w-full rounded-xl border border-white/10 bg-slate-950 p-4 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-indigo-400"
                    />

                    <p className="mt-2 text-xs text-slate-500">
                        Minimum 30 characters. Current: {weeklyPlan.trim().length}
                    </p>
                </section>

                <section
                    id="reflection-section"
                    className="mt-6 scroll-mt-8 rounded-2xl border border-white/10 bg-slate-900 p-6 sm:p-8"
                >
                    <div className="flex items-center gap-3">
                        <BookOpen className="text-indigo-400" size={23} />
                        <h2 className="text-xl font-bold">
                            Activity 4: Final Career Reflection
                        </h2>
                    </div>

                    <p className="mt-3 text-sm leading-6 text-slate-400">
                        Reflect on your CAREERVERSE experience. What have you
                        learned? Which area needs improvement? What will you do
                        next to move towards your career goal?
                    </p>

                    <textarea
                        value={reflection}
                        onChange={(event) =>
                            updateField(setReflection, event.target.value)
                        }
                        rows={6}
                        placeholder="My CAREERVERSE journey helped me understand career planning, technical skills, professional platforms, research, experience, and alternative opportunities. My next step is..."
                        className="mt-5 w-full rounded-xl border border-white/10 bg-slate-950 p-4 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-indigo-400"
                    />

                    <p className="mt-2 text-xs text-slate-500">
                        Minimum 40 characters. Current: {reflection.trim().length}
                    </p>
                </section>

                <section className="mt-8 rounded-2xl border border-indigo-400/20 bg-indigo-500/5 p-6 sm:p-8">
                    <div className="flex items-center gap-3">
                        <Trophy className="text-indigo-400" size={25} />
                        <div>
                            <h2 className="text-xl font-bold">
                                Your CAREERVERSE Final Assessment
                            </h2>
                            <p className="mt-1 text-sm text-slate-400">
                                Complete all four activities to finish Chapter 9.
                            </p>
                        </div>
                    </div>

                    <div className="mt-6">
                        <div className="mb-2 flex items-center justify-between text-sm">
                            <span className="text-slate-300">Completion progress</span>
                            <span className="font-semibold text-indigo-300">
                                {progress}%
                            </span>
                        </div>

                        <div className="h-2 overflow-hidden rounded-full bg-slate-800">
                            <div
                                className="h-full rounded-full bg-indigo-400 transition-all"
                                style={{ width: `${progress}%` }}
                            />
                        </div>
                    </div>

                    <div className="mt-6 space-y-3">
                        {[
                            'Select at least three career habits',
                            'Write your career goal',
                            'Create your weekly action plan',
                            'Complete your final reflection',
                        ].map((item, index) => (
                            <button
                                type="button"
                                key={item}
                                onClick={() => navigateToActivity(index)}
                                className="flex w-full items-center justify-between gap-3 rounded-xl border border-white/10 bg-slate-950/70 p-4 text-left transition hover:border-indigo-400/40"
                            >
                                <span className="text-sm text-slate-300">
                                    {item}
                                </span>
                                {requirements[index] ? (
                                    <CheckCircle2
                                        size={20}
                                        className="shrink-0 text-green-400"
                                    />
                                ) : (
                                    <XCircle
                                        size={20}
                                        className="shrink-0 text-slate-600"
                                    />
                                )}
                            </button>
                        ))}
                    </div>

                    <button
                        type="button"
                        onClick={saveProgress}
                        disabled={!requirements.every(Boolean)}
                        className="mt-7 flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-500 px-6 py-4 font-semibold text-white transition hover:bg-indigo-400 disabled:cursor-not-allowed disabled:bg-slate-700 disabled:text-slate-400"
                    >
                        <Save size={19} />
                        Complete CAREERVERSE
                    </button>

                    {saved && isCompleted && (
                        <div className="mt-5 rounded-xl border border-green-500/30 bg-green-500/10 p-5 text-center">
                            <CheckCircle2
                                size={30}
                                className="mx-auto text-green-400"
                            />
                            <h3 className="mt-3 text-lg font-bold text-green-300">
                                Congratulations! Journey Completed.
                            </h3>
                            <p className="mt-2 text-sm leading-6 text-slate-300">
                                You have completed all nine CAREERVERSE chapters.
                                Your next step is to apply what you have learned
                                consistently in your academic and professional journey.
                            </p>
                        </div>
                    )}
                </section>

                <div className="mt-10 flex flex-col justify-between gap-4 border-t border-white/10 pt-6 sm:flex-row">
                    <Link
                        to="/student/chapter/8"
                        className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 px-5 py-3 text-sm text-slate-300 transition hover:border-white/30 hover:text-white"
                    >
                        <ArrowLeft size={17} />
                        Previous Chapter
                    </Link>

                    <Link
                        to="/student/dashboard"
                        className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-indigo-400"
                    >
                        Return to Dashboard
                        <ArrowRight size={17} />
                    </Link>
                </div>
            </div>
        </div>
    )
}
