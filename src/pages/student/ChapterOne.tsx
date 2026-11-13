
import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
    ArrowLeft,
    BookOpen,
    CheckCircle2,
    Clock,
    Target,
    Lightbulb,
    ClipboardCheck,
} from 'lucide-react'

const mistakes = [
    'Collecting certificates without building projects',
    'Switching domains every month',
    'Starting DSA preparation only in Year 3',
    'Ignoring communication skills until interviews',
    'Using AI-generated code without understanding it',
    'Comparing your progress with someone else’s journey',
    'Waiting until final year to start placement preparation',
    'Ignoring CGPA and company eligibility requirements',
]

export default function ChapterOne() {
    const [scores, setScores] = useState({
        skill: 0,
        proof: 0,
        communication: 0,
    })

    const [selectedMistakes, setSelectedMistakes] = useState<number[]>([])
    const [reflection, setReflection] = useState('')

    const lowestScore = Math.min(
        ...Object.values(scores).filter((score) => score > 0),
    )

    const allScoresCompleted = Object.values(scores).every(
        (score) => score > 0,
    )

    function toggleMistake(index: number) {
        setSelectedMistakes((current) =>
            current.includes(index)
                ? current.filter((item) => item !== index)
                : [...current, index],
        )
    }

    return (
        <main className="min-h-screen bg-slate-50">
            <header className="border-b border-slate-200 bg-white">
                <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
                    <Link
                        to="/student/dashboard"
                        className="flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-blue-700"
                    >
                        <ArrowLeft size={17} />
                        Back to Dashboard
                    </Link>

                    <span className="text-sm font-bold text-blue-700">
                        CAREERVERSE
                    </span>
                </div>
            </header>

            <div className="mx-auto max-w-5xl px-6 py-10">

                {/* Chapter Header */}
                <section className="mb-10 rounded-2xl bg-gradient-to-r from-blue-900 to-blue-700 p-8 text-white">
                    <span className="text-sm font-semibold uppercase tracking-widest text-blue-200">
                        Chapter 01 · Career Strategy
                    </span>

                    <h1 className="mt-4 text-4xl font-bold">
                        The Master Strategy
                    </h1>

                    <p className="mt-4 max-w-2xl leading-7 text-blue-100">
                        Understand what creates opportunities, develop the
                        mindset of a T-shaped engineer and learn to manage
                        your time strategically.
                    </p>

                    <div className="mt-6 flex items-center gap-2 text-sm text-blue-100">
                        <Clock size={16} />
                        Learning chapter
                    </div>
                </section>

                {/* Learning Objectives */}
                <section className="mb-8 rounded-xl border border-slate-200 bg-white p-7">
                    <div className="mb-4 flex items-center gap-3">
                        <Target className="text-blue-700" size={24} />
                        <h2 className="text-2xl font-bold text-slate-900">
                            Learning Objectives
                        </h2>
                    </div>

                    <p className="mb-4 text-slate-600">
                        By the end of this chapter, you should be able to:
                    </p>

                    <ul className="space-y-3 text-slate-700">
                        {[
                            'Identify the three factors that influence career opportunities.',
                            'Explain the structure of a T-shaped engineer.',
                            'Apply the 70–20–10 time allocation strategy.',
                            'Recognise and correct common career-development mistakes.',
                        ].map((objective) => (
                            <li key={objective} className="flex gap-3">
                                <CheckCircle2
                                    className="mt-0.5 shrink-0 text-green-600"
                                    size={18}
                                />
                                {objective}
                            </li>
                        ))}
                    </ul>
                </section>

                {/* Section 01 */}
                <section className="mb-8 rounded-xl border border-slate-200 bg-white p-7">
                    <span className="text-sm font-semibold text-blue-700">
                        SECTION 01
                    </span>

                    <h2 className="mb-4 mt-2 text-2xl font-bold text-slate-900">
                        What Decides Who Gets the Opportunity?
                    </h2>

                    <p className="leading-7 text-slate-600">
                        Career opportunities are influenced by three connected
                        factors. Strong technical knowledge alone is not enough.
                        You must also demonstrate your abilities and communicate
                        your value.
                    </p>

                    <div className="mt-6 grid gap-4 md:grid-cols-3">
                        {[
                            {
                                title: 'Skill Depth',
                                description: 'Knowledge and the ability to solve real technical problems.',
                                number: '01',
                            },
                            {
                                title: 'Proof of Work',
                                description: 'Projects, practical experience and demonstrable results.',
                                number: '02',
                            },
                            {
                                title: 'Communication & Network',
                                description: 'Explaining your work and building professional connections.',
                                number: '03',
                            },
                        ].map((item) => (
                            <div key={item.number} className="rounded-xl bg-blue-50 p-5">
                                <span className="text-sm font-bold text-blue-600">
                                    {item.number}
                                </span>

                                <h3 className="mt-3 font-bold text-slate-900">
                                    {item.title}
                                </h3>

                                <p className="mt-2 text-sm leading-6 text-slate-600">
                                    {item.description}
                                </p>
                            </div>
                        ))}
                    </div>

                    {/* Self Assessment */}
                    <div className="mt-8 rounded-xl border border-blue-100 p-5">
                        <h3 className="font-bold text-slate-900">
                            Your Opportunity Self-Assessment
                        </h3>

                        <p className="mt-2 text-sm text-slate-500">
                            Rate your current confidence in each area from 1 to 5.
                        </p>

                        {[
                            { key: 'skill', label: 'Skill Depth' },
                            { key: 'proof', label: 'Proof of Work' },
                            { key: 'communication', label: 'Communication & Network' },
                        ].map((item) => (
                            <div key={item.key} className="mt-5">
                                <p className="mb-2 text-sm font-medium text-slate-700">
                                    {item.label}
                                </p>

                                <div className="flex gap-3">
                                    {[1, 2, 3, 4, 5].map((number) => (
                                        <button
                                            type="button"
                                            key={number}
                                            onClick={() =>
                                                setScores((current) => ({
                                                    ...current,
                                                    [item.key]: number,
                                                }))
                                            }
                                            className={`h-10 w-10 rounded-lg border font-semibold ${scores[item.key as keyof typeof scores] === number
                                                    ? 'border-blue-700 bg-blue-700 text-white'
                                                    : 'border-slate-200 bg-white text-slate-600 hover:border-blue-400'
                                                }`}
                                        >
                                            {number}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        ))}

                        {allScoresCompleted && (
                            <div className="mt-6 rounded-lg bg-green-50 p-4 text-sm text-green-800">
                                Your lowest score is {lowestScore}/5.
                                Focus on strengthening this area during the semester.
                            </div>
                        )}
                    </div>
                </section>

                {/* Section 02 */}
                <section className="mb-8 rounded-xl border border-slate-200 bg-white p-7">
                    <span className="text-sm font-semibold text-blue-700">
                        SECTION 02
                    </span>

                    <h2 className="mb-4 mt-2 text-2xl font-bold text-slate-900">
                        What Is a T-Shaped Engineer?
                    </h2>

                    <p className="leading-7 text-slate-600">
                        A T-shaped engineer combines deep expertise in one
                        specialised domain with broad knowledge of supporting
                        technologies and professional skills.
                    </p>

                    <div className="mt-6 grid gap-5 md:grid-cols-2">
                        <div className="rounded-xl bg-blue-50 p-6">
                            <h3 className="font-bold text-blue-900">
                                Vertical Line — Depth
                            </h3>

                            <p className="mt-3 text-sm leading-6 text-slate-700">
                                Build expertise in one domain, such as backend
                                development, machine learning or embedded systems.
                            </p>
                        </div>

                        <div className="rounded-xl bg-sky-50 p-6">
                            <h3 className="font-bold text-sky-900">
                                Horizontal Line — Breadth
                            </h3>

                            <p className="mt-3 text-sm leading-6 text-slate-700">
                                Develop supporting knowledge in Git, SQL, cloud
                                fundamentals, AI tools and communication.
                            </p>
                        </div>
                    </div>

                    <div className="mt-6 rounded-lg border-l-4 border-blue-600 bg-slate-50 p-5">
                        <p className="font-semibold text-slate-900">
                            Remember:
                        </p>

                        <p className="mt-2 text-sm leading-6 text-slate-600">
                            Avoid starting ten courses without completing meaningful
                            projects. Explore during Year 1, then begin developing
                            domain depth by Year 2.
                        </p>
                    </div>
                </section>

                {/* Section 03 */}
                <section className="mb-8 rounded-xl border border-slate-200 bg-white p-7">
                    <span className="text-sm font-semibold text-blue-700">
                        SECTION 03
                    </span>

                    <h2 className="mb-4 mt-2 text-2xl font-bold text-slate-900">
                        How Should You Split Your Time?
                    </h2>

                    <p className="leading-7 text-slate-600">
                        Apply this strategy to your time outside classes.
                        The proportions matter more than exact hours.
                    </p>

                    <div className="mt-6 space-y-5">
                        {[
                            {
                                title: 'Core Skills',
                                hours: '70%',
                                width: '70%',
                                description: 'DSA, your chosen domain and projects.',
                                color: 'bg-blue-700',
                            },
                            {
                                title: 'Supporting Skills',
                                hours: '20%',
                                width: '20%',
                                description: 'Aptitude, communication and core subjects.',
                                color: 'bg-sky-500',
                            },
                            {
                                title: 'Exploration',
                                hours: '10%',
                                width: '10%',
                                description: 'New tools, clubs, events and technical talks.',
                                color: 'bg-indigo-400',
                            },
                        ].map((item) => (
                            <div key={item.title}>
                                <div className="mb-2 flex justify-between">
                                    <span className="font-semibold text-slate-800">
                                        {item.title}
                                    </span>

                                    <span className="font-bold text-blue-700">
                                        {item.hours}
                                    </span>
                                </div>

                                <div className="h-3 overflow-hidden rounded-full bg-slate-100">
                                    <div
                                        className={`h-full rounded-full ${item.color}`}
                                        style={{ width: item.width }}
                                    />
                                </div>

                                <p className="mt-2 text-sm text-slate-500">
                                    {item.description}
                                </p>
                            </div>
                        ))}
                    </div>

                    <div className="mt-6 rounded-lg bg-blue-50 p-5">
                        <p className="font-semibold text-blue-900">
                            This week's activity
                        </p>

                        <p className="mt-2 text-sm leading-6 text-slate-700">
                            Track how you spend your free time for seven days.
                            Identify whether your actual schedule matches your
                            priorities.
                        </p>
                    </div>
                </section>

                {/* Section 04 */}
                <section className="mb-8 rounded-xl border border-slate-200 bg-white p-7">
                    <span className="text-sm font-semibold text-blue-700">
                        SECTION 04
                    </span>

                    <h2 className="mb-4 mt-2 text-2xl font-bold text-slate-900">
                        Eight Mistakes That Cost Students Years
                    </h2>

                    <p className="mb-6 text-slate-600">
                        Select the mistakes you currently recognise in your
                        own learning journey. Choose the one you want to
                        improve first.
                    </p>

                    <div className="space-y-3">
                        {mistakes.map((mistake, index) => (
                            <label
                                key={mistake}
                                className="flex cursor-pointer items-start gap-3 rounded-lg border border-slate-200 p-4 hover:bg-slate-50"
                            >
                                <input
                                    type="checkbox"
                                    checked={selectedMistakes.includes(index)}
                                    onChange={() => toggleMistake(index)}
                                    className="mt-1 h-4 w-4 accent-blue-700"
                                />

                                <span className="text-sm leading-6 text-slate-700">
                                    {index + 1}. {mistake}
                                </span>
                            </label>
                        ))}
                    </div>

                    <div className="mt-6">
                        <label className="mb-2 block font-semibold text-slate-800">
                            Your improvement commitment
                        </label>

                        <textarea
                            value={reflection}
                            onChange={(event) => setReflection(event.target.value)}
                            rows={4}
                            placeholder="Write one action you will take to improve this semester..."
                            className="w-full rounded-lg border border-slate-300 p-4 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                        />
                    </div>

                    <div className="mt-4 flex items-center gap-2 text-sm text-slate-500">
                        <Lightbulb size={17} className="text-amber-500" />
                        Selected mistakes: {selectedMistakes.length} of 8
                    </div>
                </section>

                {/* Chapter Assessment Button */}
                <section className="mb-8 rounded-2xl border border-blue-100 bg-blue-50 p-8 text-center">
                    <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-white text-blue-700">
                        <ClipboardCheck size={28} />
                    </div>

                    <h2 className="mt-4 text-2xl font-bold text-slate-900">
                        Ready to Test Your Knowledge?
                    </h2>

                    <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-slate-600">
                        Complete the five-question assessment to evaluate
                        your understanding of Chapter 1: The Master Strategy.
                    </p>

                    <Link
                        to="/student/chapter/1/quiz"
                        className="mt-6 inline-flex items-center justify-center rounded-xl bg-blue-700 px-8 py-3 font-semibold text-white transition hover:bg-blue-800"
                    >
                        Start Chapter Assessment →
                    </Link>

                    <p className="mt-3 text-xs text-slate-500">
                        5 Questions · Single-answer MCQs
                    </p>
                </section>

                {/* Completion Section */}
                <section className="rounded-xl border border-slate-200 bg-white p-7">
                    <BookOpen className="mb-3 text-blue-700" size={25} />

                    <h2 className="text-xl font-bold text-slate-900">
                        Chapter Learning Complete
                    </h2>

                    <p className="mt-2 text-sm leading-6 text-slate-500">
                        You have explored all four learning sections.
                        Continue to the assessment to check your understanding.
                    </p>

                    <Link
                        to="/student/dashboard"
                        className="mt-6 inline-flex rounded-lg bg-blue-700 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-800"
                    >
                        Return to Dashboard
                    </Link>
                </section>

            </div>
        </main>
    )
}
