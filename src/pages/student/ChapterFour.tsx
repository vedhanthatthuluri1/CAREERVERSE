
import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
    ArrowLeft,
    ArrowRight,
    Award,
    BookOpen,
    Brain,
    CheckCircle2,
    ClipboardCheck,
    Code2,
    Database,
    GraduationCap,
    Layers,
    Lightbulb,
    Network,
    Rocket,
    Target,
} from 'lucide-react'

const dsaTopics = [
    'Time and space complexity',
    'Arrays and strings',
    'Recursion',
    'Linked lists',
    'Stacks and queues',
    'Hashing',
    'Sorting and searching',
    'Trees and binary search trees',
    'Graphs',
    'Heaps',
    'Dynamic programming',
    'Greedy algorithms and backtracking',
]

const problemSolvingSteps = [
    {
        number: '01',
        title: 'Understand the problem',
        description: 'Restate the problem in your own words. Identify the inputs, outputs and constraints.',
    },
    {
        number: '02',
        title: 'Work through examples',
        description: 'Test normal cases, small inputs and edge cases before writing code.',
    },
    {
        number: '03',
        title: 'Develop a brute-force solution',
        description: 'Find a straightforward solution first. Understand its time and space complexity.',
    },
    {
        number: '04',
        title: 'Optimise and implement',
        description: 'Look for a more efficient approach, then write clean and readable code.',
    },
    {
        number: '05',
        title: 'Test and reflect',
        description: 'Test edge cases, analyse complexity and record what you learned.',
    },
]

const coreSubjects = [
    {
        title: 'Object-Oriented Programming',
        icon: Code2,
        topics: [
            'Classes and objects',
            'Encapsulation and abstraction',
            'Inheritance and polymorphism',
            'SOLID principles',
        ],
        outcome: 'Design maintainable and reusable software.',
    },
    {
        title: 'Database Management Systems',
        icon: Database,
        topics: [
            'SQL and joins',
            'Database normalisation',
            'Indexes and query optimisation',
            'Transactions and ACID properties',
        ],
        outcome: 'Understand how applications store, retrieve and manage data.',
    },
    {
        title: 'Operating Systems',
        icon: Layers,
        topics: [
            'Processes and threads',
            'CPU scheduling',
            'Deadlocks',
            'Memory management',
        ],
        outcome: 'Understand how programs interact with system resources.',
    },
    {
        title: 'Computer Networks',
        icon: Network,
        topics: [
            'HTTP and HTTPS',
            'DNS',
            'TCP and UDP',
            'Network communication fundamentals',
        ],
        outcome: 'Understand how applications communicate over networks.',
    },
]

const systemDesignSteps = [
    'Understand functional and non-functional requirements.',
    'Estimate expected users, requests and storage.',
    'Define the main APIs and communication flow.',
    'Design the database and data relationships.',
    'Identify where caching can improve performance.',
    'Consider scalability, reliability and trade-offs.',
]

const projectPrinciples = [
    'Solve a clear problem for real or intended users.',
    'Include a working demonstration or live link when possible.',
    'Write a useful README explaining the project.',
    'Understand the authentication, database and API decisions.',
    'Be prepared to explain your architecture and technical choices.',
]

const portfolioSections = [
    'A clear introduction and professional summary',
    'Two or three meaningful projects',
    'Technical skills you can confidently explain',
    'A downloadable and updated resume',
    'GitHub, LinkedIn and contact links',
]

const certificationPrinciples = [
    'Choose certifications that support your learning goals.',
    'Consider recognised cloud associate certifications.',
    'Explore relevant proctored NPTEL courses.',
    'Use selected Coursera courses when they add value.',
    'Build a project before collecting more certificates.',
]

const weeklyActions = [
    'Solve at least one DSA problem.',
    'Revise one core CS concept.',
    'Make progress on a practical project.',
    'Update project documentation or GitHub.',
    'Explain one technical concept in your own words.',
]

export default function ChapterFour() {
    const [completedTopics, setCompletedTopics] = useState<string[]>([])

    const toggleTopic = (topic: string) => {
        setCompletedTopics((previous) =>
            previous.includes(topic)
                ? previous.filter((item) => item !== topic)
                : [...previous, topic],
        )
    }

    const totalTopics = dsaTopics.length + weeklyActions.length
    const completedCount = completedTopics.length
    const checklistProgress = Math.round(
        (completedCount / totalTopics) * 100,
    )

    return (
        <div className="min-h-screen bg-slate-50">
            {/* Header */}
            <header className="border-b border-slate-200 bg-white">
                <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
                    <div className="flex items-center gap-3">
                        <div className="rounded-xl bg-blue-700 p-2 text-white">
                            <GraduationCap size={24} />
                        </div>
                        <div>
                            <h1 className="text-xl font-bold text-blue-700">
                                CAREERVERSE
                            </h1>
                            <p className="text-xs text-slate-500">
                                Student Learning Portal
                            </p>
                        </div>
                    </div>

                    <Link
                        to="/student/dashboard"
                        className="flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-blue-700"
                    >
                        <ArrowLeft size={17} />
                        Dashboard
                    </Link>
                </div>
            </header>

            <main className="mx-auto max-w-7xl px-6 py-10">
                {/* Hero */}
                <section className="mb-10 rounded-2xl bg-gradient-to-r from-blue-900 to-blue-600 p-8 text-white">
                    <div className="mb-5 flex items-center gap-2 text-sm font-medium text-blue-100">
                        <BookOpen size={17} />
                        CHAPTER 04 · SKILL DEVELOPMENT
                    </div>

                    <h2 className="max-w-3xl text-3xl font-bold md:text-4xl">
                        Skills Mastery
                    </h2>

                    <p className="mt-4 max-w-3xl leading-7 text-blue-100">
                        Move beyond learning concepts. Develop problem-solving
                        ability, strengthen your computer science fundamentals
                        and build practical proof of your technical skills.
                    </p>

                    <div className="mt-7 flex flex-wrap gap-3">
                        <span className="rounded-full bg-white/15 px-4 py-2 text-sm">
                            DSA
                        </span>
                        <span className="rounded-full bg-white/15 px-4 py-2 text-sm">
                            Core CS
                        </span>
                        <span className="rounded-full bg-white/15 px-4 py-2 text-sm">
                            Projects
                        </span>
                        <span className="rounded-full bg-white/15 px-4 py-2 text-sm">
                            Portfolio
                        </span>
                    </div>
                </section>

                {/* Learning Objectives */}
                <section className="mb-10">
                    <div className="mb-5 flex items-center gap-3">
                        <div className="rounded-xl bg-blue-50 p-3 text-blue-700">
                            <Target size={23} />
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold text-slate-900">
                                What You Will Learn
                            </h2>
                            <p className="text-sm text-slate-500">
                                Your learning objectives for this chapter.
                            </p>
                        </div>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {[
                            'Understand the complete DSA learning sequence.',
                            'Develop a structured problem-solving approach.',
                            'Strengthen four essential CS subjects.',
                            'Understand the fundamentals of system design.',
                            'Build meaningful projects that demonstrate skills.',
                            'Create a professional technical portfolio.',
                        ].map((objective) => (
                            <div
                                key={objective}
                                className="flex items-start gap-3 rounded-xl border border-slate-200 bg-white p-5"
                            >
                                <CheckCircle2
                                    className="mt-0.5 shrink-0 text-blue-700"
                                    size={19}
                                />
                                <p className="text-sm leading-6 text-slate-700">
                                    {objective}
                                </p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* DSA Section */}
                <section className="mb-10 rounded-2xl border border-slate-200 bg-white p-6 md:p-8">
                    <div className="mb-6 flex items-center gap-3">
                        <div className="rounded-xl bg-blue-50 p-3 text-blue-700">
                            <Brain size={25} />
                        </div>
                        <div>
                            <p className="text-xs font-semibold uppercase tracking-wide text-blue-700">
                                Section 01
                            </p>
                            <h2 className="text-2xl font-bold text-slate-900">
                                Data Structures and Algorithms
                            </h2>
                        </div>
                    </div>

                    <p className="mb-6 leading-7 text-slate-600">
                        DSA develops logical thinking and problem-solving
                        ability. Choose one programming language and learn
                        concepts in a structured sequence instead of jumping
                        between topics.
                    </p>

                    <div className="mb-5 rounded-xl bg-blue-50 p-5">
                        <h3 className="mb-2 font-semibold text-blue-900">
                            Recommended learning sequence
                        </h3>
                        <p className="text-sm leading-6 text-blue-800">
                            Start with complexity analysis, then progress
                            through linear data structures, searching and
                            sorting, trees, graphs and advanced problem-solving
                            techniques.
                        </p>
                    </div>

                    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                        {dsaTopics.map((topic, index) => {
                            const isCompleted = completedTopics.includes(topic)

                            return (
                                <button
                                    type="button"
                                    key={topic}
                                    onClick={() => toggleTopic(topic)}
                                    className={`flex items-center gap-3 rounded-lg border p-4 text-left transition ${
                                        isCompleted
                                            ? 'border-green-200 bg-green-50'
                                            : 'border-slate-200 bg-white hover:border-blue-300'
                                    }`}
                                >
                                    {isCompleted ? (
                                        <CheckCircle2
                                            size={19}
                                            className="shrink-0 text-green-600"
                                        />
                                    ) : (
                                        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-blue-50 text-xs font-bold text-blue-700">
                                            {index + 1}
                                        </span>
                                    )}
                                    <span
                                        className={`text-sm font-medium ${
                                            isCompleted
                                                ? 'text-green-800'
                                                : 'text-slate-700'
                                        }`}
                                    >
                                        {topic}
                                    </span>
                                </button>
                            )
                        })}
                    </div>

                    <p className="mt-4 text-xs text-slate-500">
                        Select a topic to mark it as completed. This checklist
                        is currently stored only in the active page state.
                    </p>
                </section>

                {/* DSA Targets */}
                <section className="mb-10 grid gap-5 md:grid-cols-3">
                    {[
                        {
                            year: 'Year 1',
                            target: '100',
                            description: 'Build fundamentals and develop a consistent practice habit.',
                        },
                        {
                            year: 'Year 2',
                            target: '200+',
                            description: 'Strengthen DSA and practise problems across major topics.',
                        },
                        {
                            year: 'Year 3',
                            target: '350–500',
                            description: 'Develop stronger problem-solving skills for technical interviews.',
                        },
                    ].map((item) => (
                        <div
                            key={item.year}
                            className="rounded-xl border border-slate-200 bg-white p-6"
                        >
                            <p className="text-sm font-semibold text-blue-700">
                                {item.year}
                            </p>
                            <h3 className="mt-2 text-3xl font-bold text-slate-900">
                                {item.target}
                            </h3>
                            <p className="mt-2 text-sm text-slate-500">
                                Problems as a learning target
                            </p>
                            <p className="mt-4 text-sm leading-6 text-slate-600">
                                {item.description}
                            </p>
                        </div>
                    ))}
                </section>

                {/* Problem Solving */}
                <section className="mb-10 rounded-2xl border border-slate-200 bg-white p-6 md:p-8">
                    <div className="mb-6 flex items-center gap-3">
                        <div className="rounded-xl bg-amber-50 p-3 text-amber-700">
                            <Lightbulb size={25} />
                        </div>
                        <div>
                            <p className="text-xs font-semibold uppercase tracking-wide text-amber-700">
                                Section 02
                            </p>
                            <h2 className="text-2xl font-bold text-slate-900">
                                The Five-Step Problem-Solving Method
                            </h2>
                        </div>
                    </div>

                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                        {problemSolvingSteps.map((step) => (
                            <article
                                key={step.number}
                                className="rounded-xl border border-slate-200 p-5"
                            >
                                <span className="text-sm font-bold text-blue-700">
                                    STEP {step.number}
                                </span>
                                <h3 className="mt-3 font-bold text-slate-900">
                                    {step.title}
                                </h3>
                                <p className="mt-2 text-sm leading-6 text-slate-600">
                                    {step.description}
                                </p>
                            </article>
                        ))}
                    </div>
                </section>

                {/* Core CS */}
                <section className="mb-10">
                    <div className="mb-6">
                        <p className="text-xs font-semibold uppercase tracking-wide text-blue-700">
                            Section 03
                        </p>
                        <h2 className="mt-2 text-2xl font-bold text-slate-900">
                            Master the Core CS Subjects
                        </h2>
                        <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-500">
                            These subjects help you understand how software
                            works internally and prepare you for technical
                            interviews.
                        </p>
                    </div>

                    <div className="grid gap-5 md:grid-cols-2">
                        {coreSubjects.map((subject) => {
                            const Icon = subject.icon

                            return (
                                <article
                                    key={subject.title}
                                    className="rounded-xl border border-slate-200 bg-white p-6"
                                >
                                    <div className="mb-4 flex items-center gap-3">
                                        <div className="rounded-lg bg-blue-50 p-3 text-blue-700">
                                            <Icon size={23} />
                                        </div>
                                        <h3 className="text-lg font-bold text-slate-900">
                                            {subject.title}
                                        </h3>
                                    </div>

                                    <ul className="space-y-3">
                                        {subject.topics.map((topic) => (
                                            <li
                                                key={topic}
                                                className="flex items-start gap-2 text-sm text-slate-600"
                                            >
                                                <CheckCircle2
                                                    size={16}
                                                    className="mt-0.5 shrink-0 text-blue-600"
                                                />
                                                {topic}
                                            </li>
                                        ))}
                                    </ul>

                                    <div className="mt-5 rounded-lg bg-slate-50 p-4">
                                        <p className="text-xs font-semibold uppercase text-slate-500">
                                            Learning outcome
                                        </p>
                                        <p className="mt-1 text-sm text-slate-700">
                                            {subject.outcome}
                                        </p>
                                    </div>
                                </article>
                            )
                        })}
                    </div>
                </section>

                {/* System Design */}
                <section className="mb-10 rounded-2xl border border-slate-200 bg-white p-6 md:p-8">
                    <div className="mb-5 flex items-center gap-3">
                        <div className="rounded-xl bg-indigo-50 p-3 text-indigo-700">
                            <Layers size={25} />
                        </div>
                        <div>
                            <p className="text-xs font-semibold uppercase tracking-wide text-indigo-700">
                                Section 04
                            </p>
                            <h2 className="text-2xl font-bold text-slate-900">
                                Introduction to System Design
                            </h2>
                        </div>
                    </div>

                    <p className="mb-6 max-w-3xl text-sm leading-7 text-slate-600">
                        System design is about planning how software
                        components work together. Begin learning the
                        fundamentals in Year 3 and gradually understand
                        architecture, scalability and engineering trade-offs.
                    </p>

                    <div className="space-y-3">
                        {systemDesignSteps.map((step, index) => (
                            <div
                                key={step}
                                className="flex items-start gap-4 rounded-lg bg-slate-50 p-4"
                            >
                                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-indigo-100 text-sm font-bold text-indigo-700">
                                    {index + 1}
                                </span>
                                <p className="pt-1 text-sm leading-6 text-slate-700">
                                    {step}
                                </p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Projects */}
                <section className="mb-10 grid gap-5 lg:grid-cols-2">
                    <article className="rounded-2xl border border-slate-200 bg-white p-6 md:p-8">
                        <div className="mb-5 flex items-center gap-3">
                            <div className="rounded-xl bg-green-50 p-3 text-green-700">
                                <Rocket size={24} />
                            </div>
                            <div>
                                <p className="text-xs font-semibold uppercase tracking-wide text-green-700">
                                    Section 05
                                </p>
                                <h2 className="text-xl font-bold text-slate-900">
                                    Build Meaningful Projects
                                </h2>
                            </div>
                        </div>

                        <p className="mb-5 text-sm leading-6 text-slate-600">
                            Aim to build two or three strong projects that
                            demonstrate your ability to solve practical
                            problems.
                        </p>

                        <ul className="space-y-3">
                            {projectPrinciples.map((principle) => (
                                <li
                                    key={principle}
                                    className="flex items-start gap-2 text-sm leading-6 text-slate-600"
                                >
                                    <CheckCircle2
                                        size={17}
                                        className="mt-0.5 shrink-0 text-green-600"
                                    />
                                    {principle}
                                </li>
                            ))}
                        </ul>
                    </article>

                    <article className="rounded-2xl border border-slate-200 bg-white p-6 md:p-8">
                        <div className="mb-5 flex items-center gap-3">
                            <div className="rounded-xl bg-blue-50 p-3 text-blue-700">
                                <Award size={24} />
                            </div>
                            <div>
                                <p className="text-xs font-semibold uppercase tracking-wide text-blue-700">
                                    Section 06
                                </p>
                                <h2 className="text-xl font-bold text-slate-900">
                                    Create Your Technical Portfolio
                                </h2>
                            </div>
                        </div>

                        <p className="mb-5 text-sm leading-6 text-slate-600">
                            Your portfolio should provide clear evidence of
                            what you can build and explain.
                        </p>

                        <ul className="space-y-3">
                            {portfolioSections.map((item) => (
                                <li
                                    key={item}
                                    className="flex items-start gap-2 text-sm leading-6 text-slate-600"
                                >
                                    <CheckCircle2
                                        size={17}
                                        className="mt-0.5 shrink-0 text-blue-600"
                                    />
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </article>
                </section>

                {/* Certifications */}
                <section className="mb-10 rounded-2xl border border-slate-200 bg-white p-6 md:p-8">
                    <div className="mb-5 flex items-center gap-3">
                        <div className="rounded-xl bg-amber-50 p-3 text-amber-700">
                            <GraduationCap size={25} />
                        </div>
                        <div>
                            <p className="text-xs font-semibold uppercase tracking-wide text-amber-700">
                                Section 07
                            </p>
                            <h2 className="text-2xl font-bold text-slate-900">
                                Certifications: Support Your Skills
                            </h2>
                        </div>
                    </div>

                    <p className="mb-5 text-sm leading-7 text-slate-600">
                        Certifications can support your learning and
                        demonstrate structured study. However, they should
                        complement practical work rather than replace it.
                    </p>

                    <div className="grid gap-3 sm:grid-cols-2">
                        {certificationPrinciples.map((principle) => (
                            <div
                                key={principle}
                                className="flex items-start gap-3 rounded-lg bg-slate-50 p-4"
                            >
                                <CheckCircle2
                                    size={18}
                                    className="mt-0.5 shrink-0 text-amber-600"
                                />
                                <p className="text-sm leading-6 text-slate-700">
                                    {principle}
                                </p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Weekly Action */}
                <section className="mb-10 rounded-2xl border border-blue-100 bg-blue-50 p-6 md:p-8">
                    <div className="mb-5 flex items-center gap-3">
                        <div className="rounded-xl bg-white p-3 text-blue-700">
                            <ClipboardCheck size={24} />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-blue-950">
                                Your Weekly Skills Action Plan
                            </h2>
                            <p className="text-sm text-blue-800">
                                Turn what you learned into consistent action.
                            </p>
                        </div>
                    </div>

                    <div className="space-y-3">
                        {weeklyActions.map((action) => {
                            const isCompleted = completedTopics.includes(action)

                            return (
                                <button
                                    key={action}
                                    type="button"
                                    onClick={() => toggleTopic(action)}
                                    className={`flex w-full items-center gap-3 rounded-lg border p-4 text-left transition ${
                                        isCompleted
                                            ? 'border-green-200 bg-green-50'
                                            : 'border-blue-100 bg-white hover:border-blue-300'
                                    }`}
                                >
                                    <CheckCircle2
                                        size={19}
                                        className={
                                            isCompleted
                                                ? 'text-green-600'
                                                : 'text-slate-300'
                                        }
                                    />
                                    <span
                                        className={`text-sm ${
                                            isCompleted
                                                ? 'font-medium text-green-800'
                                                : 'text-slate-700'
                                        }`}
                                    >
                                        {action}
                                    </span>
                                </button>
                            )
                        })}
                    </div>

                    <div className="mt-6">
                        <div className="mb-2 flex justify-between text-sm">
                            <span className="font-medium text-blue-950">
                                Learning checklist
                            </span>
                            <span className="font-bold text-blue-800">
                                {completedCount}/{totalTopics} · {checklistProgress}%
                            </span>
                        </div>
                        <div className="h-2 overflow-hidden rounded-full bg-blue-200">
                            <div
                                className="h-full rounded-full bg-blue-700 transition-all"
                                style={{ width: `${checklistProgress}%` }}
                            />
                        </div>
                    </div>
                </section>

                {/* Assessment CTA */}
                <section className="rounded-2xl bg-slate-900 p-8 text-white">
                    <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                        <div className="max-w-2xl">
                            <p className="text-sm font-semibold text-blue-300">
                                CHAPTER 04 ACTIVITY
                            </p>
                            <h2 className="mt-2 text-2xl font-bold">
                                Evaluate Your Current Skills
                            </h2>
                            <p className="mt-3 text-sm leading-6 text-slate-300">
                                Complete the Skills Gap Assessment to identify
                                your strengths, areas for improvement and
                                immediate learning priorities.
                            </p>
                        </div>

                        <Link
                            to="/student/chapter/4/assessment"
                            className="inline-flex shrink-0 items-center justify-center gap-2 rounded-lg bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-500"
                        >
                            Start Assessment
                            <ArrowRight size={18} />
                        </Link>
                    </div>
                </section>

                {/* Footer Navigation */}
                <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
                    <Link
                        to="/student/chapter/3"
                        className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-blue-700"
                    >
                        <ArrowLeft size={17} />
                        Previous Chapter
                    </Link>

                    <Link
                        to="/student/dashboard"
                        className="inline-flex items-center gap-2 text-sm font-semibold text-blue-700 hover:text-blue-900"
                    >
                        Return to Dashboard
                        <ArrowRight size={17} />
                    </Link>
                </div>

                <footer className="mt-10 border-t border-slate-200 py-6 text-center text-sm text-slate-400">
                    © 2026 CAREERVERSE · Career Development Programme
                </footer>
            </main>
        </div>
    )
}
