
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
    ArrowLeft,
    ArrowRight,
    Award,
    Brain,
    CheckCircle2,
    ClipboardCheck,
    Code2,
    Database,
    Rocket,
    Target,
    Trophy,
} from 'lucide-react'

import {
    getChapterFourAssessmentResult,
    saveChapterFourAssessmentResult,
} from '../../services/storage/assessmentStorage'

import type {
    ChapterFourAssessmentResult,
} from '../../types/storage'

type SkillCategory = {
    id: string
    title: string
    description: string
    icon: typeof Code2
    question: string
}

const skillCategories: SkillCategory[] = [
    {
        id: 'programming',
        title: 'Programming Fundamentals',
        description: 'Your ability to write, understand and debug programs.',
        icon: Code2,
        question: 'How confident are you in your programming fundamentals?',
    },
    {
        id: 'dsa',
        title: 'Data Structures and Algorithms',
        description: 'Your ability to solve problems using DSA concepts.',
        icon: Brain,
        question: 'How confident are you in DSA and problem-solving?',
    },
    {
        id: 'oop',
        title: 'Object-Oriented Programming',
        description: 'Classes, objects, inheritance, abstraction and polymorphism.',
        icon: Target,
        question: 'How well do you understand OOP concepts?',
    },
    {
        id: 'dbms',
        title: 'Database Management',
        description: 'SQL, joins, normalisation, indexes and transactions.',
        icon: Database,
        question: 'How confident are you in DBMS and SQL?',
    },
    {
        id: 'corecs',
        title: 'Operating Systems and Networks',
        description: 'Processes, memory, scheduling, HTTP, DNS and TCP/IP.',
        icon: ClipboardCheck,
        question: 'How well do you understand OS and Computer Networks?',
    },
    {
        id: 'projects',
        title: 'Project Development',
        description: 'Building practical applications and explaining technical decisions.',
        icon: Rocket,
        question: 'How confident are you in building and explaining projects?',
    },
    {
        id: 'portfolio',
        title: 'Portfolio and Professional Readiness',
        description: 'GitHub, resume, project documentation and professional presentation.',
        icon: Award,
        question: 'How ready is your technical portfolio?',
    },
]

const ratingLabels = [
    '1 – Beginner',
    '2 – Basic',
    '3 – Intermediate',
    '4 – Confident',
    '5 – Strong',
]

const improvementAdvice: Record<string, string> = {
    programming:
        'Choose one programming language. Practise syntax, functions, loops, collections, debugging and small programs.',
    dsa:
        'Start with arrays and strings. Progress through recursion, linked lists, stacks, queues, trees and graphs.',
    oop:
        'Practise classes, objects, encapsulation, inheritance, abstraction and polymorphism using small programs.',
    dbms:
        'Learn SQL queries, joins, normalisation, indexing and ACID transactions. Practise using sample databases.',
    corecs:
        'Create revision notes for processes, threads, memory, scheduling, HTTP, DNS, TCP and UDP.',
    projects:
        'Build a small application that solves a clear problem. Document its features, APIs, database and technical decisions.',
    portfolio:
        'Create a one-page portfolio with your projects, GitHub profile, resume, skills and contact information.',
}

const experienceOptions = [
    {
        value: 'none',
        label: 'I have not completed a project yet.',
    },
    {
        value: 'beginner',
        label: 'I have completed beginner-level projects.',
    },
    {
        value: 'intermediate',
        label: 'I have built projects using multiple technologies.',
    },
    {
        value: 'advanced',
        label: 'I have developed complete applications and can explain their architecture.',
    },
]

const priorityOptions = [
    'Programming fundamentals',
    'Data Structures and Algorithms',
    'Core Computer Science subjects',
    'Project development',
    'Portfolio and professional readiness',
]

export default function ChapterFourAssessment() {
    const navigate = useNavigate()

    const [ratings, setRatings] = useState<Record<string, number>>({})
    const [projectExperience, setProjectExperience] = useState('')
    const [priority, setPriority] = useState('')
    const [error, setError] = useState('')
    const [result, setResult] =
        useState<ChapterFourAssessmentResult | null>(
            () => getChapterFourAssessmentResult(),
        )

    const answeredCount = Object.keys(ratings).length

    const progress = Math.round(
        (answeredCount / skillCategories.length) * 100,
    )

    const handleRating = (category: string, rating: number) => {
        setRatings((previous) => ({
            ...previous,
            [category]: rating,
        }))
        setError('')
    }

    const handleSubmit = () => {
        const allRated = skillCategories.every(
            (category) => ratings[category.id] !== undefined,
        )

        if (!allRated || !projectExperience || !priority) {
            setError(
                'Please complete all seven ratings, project experience and improvement priority.',
            )
            return
        }

        const scores = skillCategories.map(
            (category) => ratings[category.id],
        )

        const averageScore = Number(
            (
                scores.reduce((total, score) => total + score, 0) /
                scores.length
            ).toFixed(1),
        )

        const strengths = skillCategories
            .filter((category) => ratings[category.id] >= 4)
            .map((category) => category.title)

        const improvementAreas = skillCategories
            .filter((category) => ratings[category.id] <= 2)
            .map((category) => category.title)

        const recommendations = skillCategories
            .filter((category) => ratings[category.id] <= 3)
            .map((category) => improvementAdvice[category.id])

        const assessmentResult: ChapterFourAssessmentResult = {
            ratings,
            projectExperience,
            priority,
            averageScore,
            strengths,
            improvementAreas,
            recommendations,
            submittedAt: new Date().toISOString(),
            completed: true,
        }

        const saved = saveChapterFourAssessmentResult(assessmentResult)

        if (!saved) {
            setError(
                'Unable to save your assessment in this browser. Please try again.',
            )
            return
        }

        setResult(assessmentResult)
    }

    if (result) {
        return (
            <div className="min-h-screen bg-slate-50 px-6 py-12">
                <div className="mx-auto max-w-4xl">
                    <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm md:p-10">
                        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-50 text-green-600">
                            <CheckCircle2 size={36} />
                        </div>

                        <div className="mt-5 text-center">
                            <p className="text-sm font-semibold uppercase tracking-wide text-green-700">
                                Assessment Completed
                            </p>
                            <h1 className="mt-2 text-3xl font-bold text-slate-900">
                                Your Skills Report
                            </h1>
                            <p className="mt-3 text-slate-500">
                                Your responses have been analysed. Use this
                                report to decide what to improve next.
                            </p>
                        </div>

                        <div className="mt-8 rounded-xl bg-blue-50 p-6 text-center">
                            <p className="text-sm font-medium text-blue-800">
                                Average Self-Assessment Score
                            </p>
                            <p className="mt-2 text-4xl font-bold text-blue-800">
                                {result.averageScore}/5
                            </p>
                            <p className="mt-2 text-xs text-blue-700">
                                Based on your seven self-ratings
                            </p>
                        </div>

                        <div className="mt-8 grid gap-5 md:grid-cols-2">
                            <section className="rounded-xl border border-green-200 bg-green-50 p-5">
                                <div className="flex items-center gap-2 text-green-800">
                                    <Trophy size={20} />
                                    <h2 className="font-bold">Your Strengths</h2>
                                </div>

                                {result.strengths.length > 0 ? (
                                    <ul className="mt-4 space-y-2 text-sm text-green-900">
                                        {result.strengths.map((item) => (
                                            <li key={item}>• {item}</li>
                                        ))}
                                    </ul>
                                ) : (
                                    <p className="mt-4 text-sm text-green-900">
                                        Keep practising. Your next goal is to
                                        build confidence across the skill areas.
                                    </p>
                                )}
                            </section>

                            <section className="rounded-xl border border-amber-200 bg-amber-50 p-5">
                                <div className="flex items-center gap-2 text-amber-800">
                                    <Target size={20} />
                                    <h2 className="font-bold">
                                        Areas to Improve
                                    </h2>
                                </div>

                                {result.improvementAreas.length > 0 ? (
                                    <ul className="mt-4 space-y-2 text-sm text-amber-900">
                                        {result.improvementAreas.map((item) => (
                                            <li key={item}>• {item}</li>
                                        ))}
                                    </ul>
                                ) : (
                                    <p className="mt-4 text-sm text-amber-900">
                                        No low-confidence areas were identified.
                                        Continue developing your skills.
                                    </p>
                                )}
                            </section>
                        </div>

                        <section className="mt-8">
                            <h2 className="text-xl font-bold text-slate-900">
                                Your Learning Recommendations
                            </h2>

                            <div className="mt-4 space-y-3">
                                {result.recommendations.length > 0 ? (
                                    result.recommendations.map(
                                        (recommendation, index) => (
                                            <div
                                                key={index}
                                                className="rounded-lg bg-slate-50 p-4 text-sm leading-6 text-slate-700"
                                            >
                                                {recommendation}
                                            </div>
                                        ),
                                    )
                                ) : (
                                    <p className="rounded-lg bg-slate-50 p-4 text-sm text-slate-600">
                                        Maintain your current learning routine
                                        and continue building practical projects.
                                    </p>
                                )}
                            </div>
                        </section>

                        <section className="mt-8 rounded-xl border border-slate-200 p-5">
                            <h2 className="font-bold text-slate-900">
                                Your Selected Improvement Priority
                            </h2>
                            <p className="mt-2 text-sm text-slate-600">
                                {result.priority}
                            </p>

                            <h3 className="mt-5 font-bold text-slate-900">
                                Project Experience
                            </h3>
                            <p className="mt-2 text-sm text-slate-600">
                                {experienceOptions.find(
                                    (option) =>
                                        option.value === result.projectExperience,
                                )?.label}
                            </p>
                        </section>

                        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                            <button
                                type="button"
                                onClick={() => navigate('/student/dashboard')}
                                className="flex-1 rounded-lg bg-blue-700 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-800"
                            >
                                Return to Dashboard
                            </button>

                            <button
                                type="button"
                                onClick={() => navigate('/student/chapter/4')}
                                className="flex-1 rounded-lg border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50"
                            >
                                Review Chapter
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-slate-50">
            <header className="border-b border-slate-200 bg-white">
                <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
                    <div>
                        <h1 className="text-lg font-bold text-blue-700">
                            CAREERVERSE
                        </h1>
                        <p className="text-xs text-slate-500">
                            Chapter 04 · Skills Assessment
                        </p>
                    </div>

                    <Link
                        to="/student/chapter/4"
                        className="flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-blue-700"
                    >
                        <ArrowLeft size={17} />
                        Back to Chapter
                    </Link>
                </div>
            </header>

            <main className="mx-auto max-w-5xl px-6 py-10">
                <section className="mb-8 rounded-2xl bg-gradient-to-r from-blue-900 to-blue-600 p-8 text-white">
                    <div className="flex items-center gap-2 text-sm text-blue-100">
                        <ClipboardCheck size={18} />
                        SKILLS GAP ASSESSMENT
                    </div>

                    <h2 className="mt-4 text-3xl font-bold">
                        Evaluate Your Technical Skills
                    </h2>

                    <p className="mt-3 max-w-2xl text-sm leading-7 text-blue-100">
                        Assess your current confidence honestly. There are no
                        right or wrong answers. Your responses will help you
                        identify learning priorities.
                    </p>

                    <div className="mt-7">
                        <div className="mb-2 flex justify-between text-sm">
                            <span>Skill ratings completed</span>
                            <span>
                                {answeredCount}/{skillCategories.length}
                            </span>
                        </div>
                        <div className="h-2 overflow-hidden rounded-full bg-blue-950/30">
                            <div
                                className="h-full rounded-full bg-white transition-all"
                                style={{ width: `${progress}%` }}
                            />
                        </div>
                    </div>
                </section>

                <div className="mb-6">
                    <h2 className="text-xl font-bold text-slate-900">
                        Part 1: Rate Your Skills
                    </h2>
                    <p className="mt-2 text-sm leading-6 text-slate-500">
                        Choose one rating for each category. Rate your actual
                        current ability, not the level you hope to achieve.
                    </p>
                </div>

                <div className="space-y-5">
                    {skillCategories.map((category, index) => {
                        const Icon = category.icon

                        return (
                            <section
                                key={category.id}
                                className="rounded-xl border border-slate-200 bg-white p-6"
                            >
                                <div className="flex items-start gap-4">
                                    <div className="rounded-lg bg-blue-50 p-3 text-blue-700">
                                        <Icon size={22} />
                                    </div>

                                    <div className="flex-1">
                                        <p className="text-xs font-semibold uppercase text-blue-700">
                                            Skill {index + 1}
                                        </p>
                                        <h3 className="mt-1 font-bold text-slate-900">
                                            {category.title}
                                        </h3>
                                        <p className="mt-2 text-sm leading-6 text-slate-500">
                                            {category.description}
                                        </p>
                                        <p className="mt-4 text-sm font-medium text-slate-700">
                                            {category.question}
                                        </p>
                                    </div>
                                </div>

                                <div className="mt-5 grid grid-cols-5 gap-2">
                                    {ratingLabels.map((label, ratingIndex) => {
                                        const rating = ratingIndex + 1
                                        const selected =
                                            ratings[category.id] === rating

                                        return (
                                            <button
                                                type="button"
                                                key={rating}
                                                aria-pressed={selected}
                                                onClick={() =>
                                                    handleRating(
                                                        category.id,
                                                        rating,
                                                    )
                                                }
                                                className={`rounded-lg border p-3 text-center transition ${selected
                                                        ? 'border-blue-700 bg-blue-700 text-white'
                                                        : 'border-slate-200 bg-white text-slate-600 hover:border-blue-400'
                                                    }`}
                                            >
                                                <span className="block text-lg font-bold">
                                                    {rating}
                                                </span>
                                                <span className="mt-1 hidden text-xs sm:block">
                                                    {label.split(' – ')[1]}
                                                </span>
                                            </button>
                                        )
                                    })}
                                </div>
                            </section>
                        )
                    })}
                </div>

                <section className="mt-10 rounded-xl border border-slate-200 bg-white p-6">
                    <h2 className="text-xl font-bold text-slate-900">
                        Part 2: Project Experience
                    </h2>
                    <p className="mt-2 text-sm text-slate-500">
                        Which statement best describes your practical project
                        experience?
                    </p>

                    <div className="mt-5 space-y-3">
                        {experienceOptions.map((option) => (
                            <label
                                key={option.value}
                                className={`flex cursor-pointer items-start gap-3 rounded-lg border p-4 transition ${projectExperience === option.value
                                        ? 'border-blue-500 bg-blue-50'
                                        : 'border-slate-200 hover:border-blue-300'
                                    }`}
                            >
                                <input
                                    type="radio"
                                    name="projectExperience"
                                    value={option.value}
                                    checked={
                                        projectExperience === option.value
                                    }
                                    onChange={(event) =>
                                        setProjectExperience(event.target.value)
                                    }
                                    className="mt-1 accent-blue-700"
                                />
                                <span className="text-sm leading-6 text-slate-700">
                                    {option.label}
                                </span>
                            </label>
                        ))}
                    </div>
                </section>

                <section className="mt-5 rounded-xl border border-slate-200 bg-white p-6">
                    <h2 className="text-xl font-bold text-slate-900">
                        Part 3: Choose Your Priority
                    </h2>
                    <p className="mt-2 text-sm text-slate-500">
                        Which area would you most like to improve next?
                    </p>

                    <div className="mt-5 grid gap-3 sm:grid-cols-2">
                        {priorityOptions.map((option) => (
                            <label
                                key={option}
                                className={`flex cursor-pointer items-center gap-3 rounded-lg border p-4 transition ${priority === option
                                        ? 'border-blue-500 bg-blue-50'
                                        : 'border-slate-200 hover:border-blue-300'
                                    }`}
                            >
                                <input
                                    type="radio"
                                    name="priority"
                                    value={option}
                                    checked={priority === option}
                                    onChange={(event) =>
                                        setPriority(event.target.value)
                                    }
                                    className="accent-blue-700"
                                />
                                <span className="text-sm text-slate-700">
                                    {option}
                                </span>
                            </label>
                        ))}
                    </div>
                </section>

                {error && (
                    <p
                        role="alert"
                        className="mt-5 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700"
                    >
                        {error}
                    </p>
                )}

                <section className="mt-8 rounded-xl bg-slate-900 p-6 text-white">
                    <h2 className="text-lg font-bold">
                        Ready to generate your skills report?
                    </h2>
                    <p className="mt-2 text-sm leading-6 text-slate-300">
                        Review your answers and submit. Your report will show
                        your self-identified strengths and areas to improve.
                    </p>

                    <button
                        type="button"
                        onClick={handleSubmit}
                        className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 px-6 py-3 text-sm font-semibold text-white hover:bg-blue-500 sm:w-auto"
                    >
                        Submit Assessment
                        <ArrowRight size={18} />
                    </button>
                </section>

                <div className="mt-8">
                    <Link
                        to="/student/chapter/4"
                        className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-blue-700"
                    >
                        <ArrowLeft size={17} />
                        Return to Chapter 4
                    </Link>
                </div>
            </main>
        </div>
    )
}
