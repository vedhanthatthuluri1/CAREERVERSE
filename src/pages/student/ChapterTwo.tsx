
import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
    ArrowLeft,
    ArrowRight,
    BookOpen,
    CheckCircle2,
    Target,
    GraduationCap,
    BriefcaseBusiness,
    Code2,
    Rocket,
    ClipboardCheck,
    Clock,
} from 'lucide-react'

const roadmap = [
    {
        year: 'YEAR 1',
        title: 'Build Your Foundation',
        subtitle: 'Explore, experiment and understand yourself.',
        icon: GraduationCap,
        goals: [
            'Build strong programming fundamentals.',
            'Learn basic problem-solving and logical thinking.',
            'Explore different technology domains.',
            'Understand Git, GitHub and developer tools.',
            'Participate in college clubs and technical events.',
            'Build two or three beginner-level projects.',
        ],
        outcome:
            'A clear understanding of your interests and a strong technical foundation.',
    },
    {
        year: 'YEAR 2',
        title: 'Choose Your Direction',
        subtitle: 'Move from exploration to focused learning.',
        icon: Code2,
        goals: [
            'Choose one primary technical domain.',
            'Learn the tools and frameworks used in that domain.',
            'Practice data structures and algorithms regularly.',
            'Build meaningful projects beyond basic tutorials.',
            'Contribute to GitHub repositories or open-source projects.',
            'Start building your technical portfolio.',
        ],
        outcome:
            'A focused skill set supported by practical projects.',
    },
    {
        year: 'YEAR 3',
        title: 'Gain Real-World Experience',
        subtitle: 'Turn your skills into demonstrable experience.',
        icon: BriefcaseBusiness,
        goals: [
            'Develop advanced projects with real-world use cases.',
            'Apply for internships and practical training opportunities.',
            'Participate in hackathons and technical competitions.',
            'Improve communication and interview skills.',
            'Build a professional resume and LinkedIn profile.',
            'Explore research, certifications and industry exposure.',
        ],
        outcome:
            'Practical experience, a stronger portfolio and career direction.',
    },
    {
        year: 'YEAR 4',
        title: 'Prepare for Your Next Step',
        subtitle: 'Convert your preparation into career opportunities.',
        icon: Rocket,
        goals: [
            'Prepare for placement and technical interviews.',
            'Revise core computer science fundamentals.',
            'Practice aptitude, coding and problem-solving.',
            'Present your strongest projects confidently.',
            'Explore higher education and alternative career paths.',
            'Apply strategically to relevant opportunities.',
        ],
        outcome:
            'Career readiness and a clear transition plan after graduation.',
    },
]

const habits = [
    'Practice coding consistently.',
    'Build projects instead of only watching tutorials.',
    'Document your learning and achievements.',
    'Improve communication and presentation skills.',
    'Connect with people in your areas of interest.',
    'Review your progress every month.',
]

export default function ChapterTwo() {
    const [completedHabits, setCompletedHabits] = useState<string[]>([])
    const [reflection, setReflection] = useState('')

    const toggleHabit = (habit: string) => {
        setCompletedHabits((previous) =>
            previous.includes(habit)
                ? previous.filter((item) => item !== habit)
                : [...previous, habit],
        )
    }

    return (
        <div className="min-h-screen bg-slate-50">
            {/* Header */}
            <header className="border-b border-slate-200 bg-white">
                <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
                    <Link
                        to="/student/dashboard"
                        className="flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-blue-700"
                    >
                        <ArrowLeft size={18} />
                        Back to Dashboard
                    </Link>

                    <span className="text-sm font-bold tracking-wide text-blue-700">
                        CAREERVERSE
                    </span>
                </div>
            </header>

            <main className="mx-auto max-w-5xl px-6 py-10">
                {/* Chapter Hero */}
                <section className="mb-10 rounded-3xl bg-gradient-to-br from-blue-950 to-blue-700 p-8 text-white md:p-12">
                    <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-sm">
                        <BookOpen size={16} />
                        CHAPTER 02 · LEARNING MODULE
                    </div>

                    <h1 className="max-w-3xl text-3xl font-bold leading-tight md:text-5xl">
                        The Four-Year Roadmap
                    </h1>

                    <p className="mt-5 max-w-2xl text-base leading-7 text-blue-100">
                        Your engineering journey is more than completing semesters.
                        It is about building skills, gaining experience, creating proof
                        of your abilities and preparing for your future.
                    </p>

                    <div className="mt-8 flex flex-wrap gap-6 text-sm text-blue-100">
                        <span className="flex items-center gap-2">
                            <Clock size={16} />
                            15–20 minutes
                        </span>

                        <span className="flex items-center gap-2">
                            <Target size={16} />
                            4-year career plan
                        </span>
                    </div>
                </section>

                {/* Four-Year Roadmap */}
                <section className="mb-12">
                    <div className="mb-6">
                        <p className="text-sm font-bold uppercase tracking-wider text-blue-700">
                            Your journey
                        </p>

                        <h2 className="mt-2 text-2xl font-bold text-slate-900">
                            Four Years. One Clear Direction.
                        </h2>

                        <p className="mt-3 leading-7 text-slate-600">
                            Every academic year has a different purpose. You do not need
                            to master everything immediately. Focus on the right priorities
                            at the right time.
                        </p>
                    </div>

                    <div className="space-y-6">
                        {roadmap.map((year, index) => {
                            const Icon = year.icon

                            return (
                                <article
                                    key={year.year}
                                    className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-8"
                                >
                                    <div className="flex flex-col gap-5 md:flex-row">
                                        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-blue-50 text-blue-700">
                                            <Icon size={28} />
                                        </div>

                                        <div className="flex-1">
                                            <div className="flex flex-wrap items-center gap-3">
                                                <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-700">
                                                    {year.year}
                                                </span>

                                                <span className="text-xs text-slate-500">
                                                    Stage {index + 1} of 4
                                                </span>
                                            </div>

                                            <h3 className="mt-3 text-xl font-bold text-slate-900">
                                                {year.title}
                                            </h3>

                                            <p className="mt-2 text-sm text-slate-600">
                                                {year.subtitle}
                                            </p>

                                            <div className="mt-5">
                                                <h4 className="mb-3 text-sm font-bold text-slate-800">
                                                    Key priorities
                                                </h4>

                                                <ul className="grid gap-3 md:grid-cols-2">
                                                    {year.goals.map((goal) => (
                                                        <li
                                                            key={goal}
                                                            className="flex items-start gap-2 text-sm leading-6 text-slate-600"
                                                        >
                                                            <CheckCircle2
                                                                size={17}
                                                                className="mt-1 shrink-0 text-blue-600"
                                                            />
                                                            {goal}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>

                                            <div className="mt-6 rounded-xl bg-slate-50 p-4">
                                                <p className="text-xs font-bold uppercase tracking-wide text-blue-700">
                                                    Expected outcome
                                                </p>

                                                <p className="mt-2 text-sm leading-6 text-slate-700">
                                                    {year.outcome}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </article>
                            )
                        })}
                    </div>
                </section>

                {/* Consistency Checklist */}
                <section className="mb-10 rounded-2xl border border-slate-200 bg-white p-6 md:p-8">
                    <div className="flex items-center gap-3">
                        <Target className="text-blue-700" size={25} />

                        <h2 className="text-xl font-bold text-slate-900">
                            Your Consistency Checklist
                        </h2>
                    </div>

                    <p className="mt-3 text-sm leading-6 text-slate-600">
                        These habits support your development throughout all four years.
                        Select the habits you are currently following.
                    </p>

                    <div className="mt-6 space-y-3">
                        {habits.map((habit) => (
                            <label
                                key={habit}
                                className="flex cursor-pointer items-start gap-3 rounded-xl border border-slate-200 p-4 hover:bg-slate-50"
                            >
                                <input
                                    type="checkbox"
                                    checked={completedHabits.includes(habit)}
                                    onChange={() => toggleHabit(habit)}
                                    className="mt-1 h-4 w-4 accent-blue-700"
                                />

                                <span className="text-sm text-slate-700">
                                    {habit}
                                </span>
                            </label>
                        ))}
                    </div>

                    <p className="mt-4 text-sm font-semibold text-blue-700">
                        {completedHabits.length} of {habits.length} habits selected
                    </p>
                </section>

                {/* Personal Reflection */}
                <section className="mb-10 rounded-2xl border border-slate-200 bg-white p-6 md:p-8">
                    <div className="flex items-center gap-3">
                        <ClipboardCheck className="text-blue-700" size={25} />

                        <h2 className="text-xl font-bold text-slate-900">
                            Personal Reflection
                        </h2>
                    </div>

                    <p className="mt-3 text-sm leading-6 text-slate-600">
                        Which year are you currently in, and what is the most important
                        skill or achievement you want to develop next?
                    </p>

                    <textarea
                        value={reflection}
                        onChange={(event) => setReflection(event.target.value)}
                        placeholder="Write your thoughts here..."
                        rows={5}
                        className="mt-5 w-full rounded-xl border border-slate-300 p-4 text-sm outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                    />

                    <p className="mt-2 text-xs text-slate-500">
                        Your reflection is currently stored only in this page's state.
                    </p>
                </section>

                {/* Chapter Assessments */}
                <section className="rounded-2xl border border-blue-100 bg-blue-50 p-8">
                    <div className="text-center">
                        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-white text-blue-700">
                            <ClipboardCheck size={28} />
                        </div>

                        <h2 className="mt-4 text-2xl font-bold text-slate-900">
                            Chapter 2 Assessments
                        </h2>

                        <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-slate-600">
                            Test your understanding of the four-year roadmap through
                            knowledge checks and practical career scenarios.
                        </p>
                    </div>

                    <div className="mt-8 grid gap-5 md:grid-cols-2">
                        {/* Quiz 1 */}
                        <article className="rounded-2xl border border-slate-200 bg-white p-6">
                            <span className="text-xs font-bold uppercase tracking-wider text-blue-700">
                                Assessment 01
                            </span>

                            <h3 className="mt-3 text-xl font-bold text-slate-900">
                                Knowledge Quiz 1
                            </h3>

                            <p className="mt-3 text-sm leading-6 text-slate-600">
                                Test your understanding of the four B.Tech years,
                                from building fundamentals to career preparation.
                            </p>

                            <div className="mt-5 flex gap-4 text-xs font-medium text-slate-500">
                                <span>5 Questions</span>
                                <span>5 Marks</span>
                            </div>

                            <Link
                                to="/student/chapter/2/quiz/1"
                                className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-blue-700 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-800"
                            >
                                Start Quiz 1
                                <ArrowRight size={17} />
                            </Link>
                        </article>

                        {/* Quiz 2 */}
                        <article className="rounded-2xl border border-slate-200 bg-white p-6">
                            <span className="text-xs font-bold uppercase tracking-wider text-indigo-700">
                                Assessment 02
                            </span>

                            <h3 className="mt-3 text-xl font-bold text-slate-900">
                                Knowledge Quiz 2
                            </h3>

                            <p className="mt-3 text-sm leading-6 text-slate-600">
                                Apply your knowledge to practical scenarios involving
                                projects, internships, portfolios and career decisions.
                            </p>

                            <div className="mt-5 flex gap-4 text-xs font-medium text-slate-500">
                                <span>5 Questions</span>
                                <span>5 Marks</span>
                            </div>

                            <Link
                                to="/student/chapter/2/quiz/2"
                                className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-700 px-5 py-3 text-sm font-semibold text-white hover:bg-indigo-800"
                            >
                                Start Quiz 2
                                <ArrowRight size={17} />
                            </Link>
                        </article>
                    </div>

                    <p className="mt-6 text-center text-xs text-slate-500">
                        Complete both assessments to finish the Chapter 2 knowledge checks.
                    </p>
                </section>
            </main>
        </div>
    )
}
