
import { Link, useNavigate } from 'react-router-dom'
import {
    BookOpen,
    CheckCircle2,
    Clock3,
    GraduationCap,
    LayoutDashboard,
    LockKeyhole,
    LogOut,
    Trophy,
    UserCircle,
    Award,
} from 'lucide-react'

import {
    getStudent,
    clearStudent,
} from '../../services/storage/studentStorage'

import {
    getChapterOneQuizResult,
    getChapterTwoQuizResult,
    getChapterThreePollResult,
    getChapterFourAssessmentResult,
} from '../../services/storage/assessmentStorage'

import { isChapterCompleted } from '../../services/storage/progressStorage'

const chapters = [
    'The Master Strategy',
    'The Four-Year Roadmap',
    'Domains and Tools',
    'Skills Mastery',
    'Platforms That Build Your Proof',
    'Research and AI',
    'Experience and Visibility',
    'Beyond Placements',
    'Habits and Wrap-Up',
]

export default function StudentDashboard() {
    const navigate = useNavigate()

    const student = getStudent()

    // Chapter 1 assessment.
    const chapterOneResult = getChapterOneQuizResult()

    // Chapter 2 assessments.
    const chapterTwoQuizOneResult = getChapterTwoQuizResult(1)
    const chapterTwoQuizTwoResult = getChapterTwoQuizResult(2)

    // Chapter 3 domain preference poll.
    const chapterThreePollResult = getChapterThreePollResult()

    // Chapter 4 skills assessment.
    const chapterFourAssessmentResult = getChapterFourAssessmentResult()

    // Chapter 5–9 completion status.
    const chapterFiveCompleted = isChapterCompleted(5)
    const chapterSixCompleted = isChapterCompleted(6)
    const chapterSevenCompleted = isChapterCompleted(7)
    const chapterEightCompleted = isChapterCompleted(8)
    const chapterNineCompleted = isChapterCompleted(9)

    // Completion status for Chapters 1–4.
    const chapterOneCompleted = chapterOneResult?.completed === true

    const chapterTwoCompleted =
        chapterTwoQuizOneResult?.completed === true &&
        chapterTwoQuizTwoResult?.completed === true

    const chapterThreeCompleted = chapterThreePollResult !== null

    const chapterFourCompleted =
        chapterFourAssessmentResult?.completed === true

    // All nine chapter completion statuses.
    const chapterCompletionStatus = [
        chapterOneCompleted,
        chapterTwoCompleted,
        chapterThreeCompleted,
        chapterFourCompleted,
        chapterFiveCompleted,
        chapterSixCompleted,
        chapterSevenCompleted,
        chapterEightCompleted,
        chapterNineCompleted,
    ]

    const completedChapters = chapterCompletionStatus.filter(Boolean).length
    const totalChapters = chapters.length

    const progressPercentage = Math.round(
        (completedChapters / totalChapters) * 100,
    )

    const learningStatus =
        completedChapters === 0
            ? 'Started'
            : completedChapters === totalChapters
                ? 'Completed'
                : 'In Progress'

    // Centralized logout.
    const handleLogout = () => {
        const cleared = clearStudent()

        if (!cleared) {
            alert('Unable to log out. Please try again.')
            return
        }

        navigate('/', { replace: true })
    }

    // Assessment results.
    const assessmentResults = [
        {
            title: 'Chapter 1 Assessment',
            subtitle: 'The Master Strategy',
            result: chapterOneResult,
        },
        {
            title: 'Chapter 2 – Quiz 1',
            subtitle: 'The Four-Year Roadmap',
            result: chapterTwoQuizOneResult,
        },
        {
            title: 'Chapter 2 – Quiz 2',
            subtitle: 'The Four-Year Roadmap',
            result: chapterTwoQuizTwoResult,
        },
    ]

    // Dashboard statistics.
    const stats = [
        {
            title: 'Total Chapters',
            value: String(totalChapters).padStart(2, '0'),
            icon: BookOpen,
        },
        {
            title: 'Completed',
            value: String(completedChapters).padStart(2, '0'),
            icon: CheckCircle2,
        },
        {
            title: 'Overall Progress',
            value: `${progressPercentage}%`,
            icon: LayoutDashboard,
        },
        {
            title: 'Learning Status',
            value: learningStatus,
            icon: Clock3,
        },
    ]

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
                                Student Portal
                            </p>
                        </div>
                    </div>

                    <button
                        type="button"
                        onClick={handleLogout}
                        className="flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-red-600"
                    >
                        <LogOut size={17} />
                        Exit Portal
                    </button>

                </div>
            </header>

            <main className="mx-auto max-w-7xl px-6 py-10">

                {/* Welcome Section */}
                <section className="mb-8 rounded-2xl bg-gradient-to-r from-blue-800 to-blue-600 p-8 text-white">

                    <p className="mb-2 text-sm text-blue-100">
                        YOUR CAREER DEVELOPMENT JOURNEY
                    </p>

                    <h2 className="text-3xl font-bold">
                        Welcome, {student?.studentName || 'Student'}!
                    </h2>

                    <p className="mt-3 max-w-2xl text-blue-100">
                        Discover your direction, develop essential skills
                        and prepare yourself for the opportunities ahead.
                    </p>

                    <div className="mt-6">
                        <p className="mb-2 text-sm text-blue-100">
                            Your overall learning progress
                        </p>

                        <div className="h-2 overflow-hidden rounded-full bg-blue-950/30">
                            <div
                                className="h-full rounded-full bg-white transition-all"
                                style={{ width: `${progressPercentage}%` }}
                            />
                        </div>

                        <p className="mt-2 text-sm font-semibold text-white">
                            {progressPercentage}% completed
                        </p>
                    </div>

                </section>

                {/* Statistics */}
                <section className="mb-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">

                    {stats.map((item) => {
                        const Icon = item.icon

                        return (
                            <div
                                key={item.title}
                                className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm"
                            >
                                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-lg bg-blue-50 text-blue-700">
                                    <Icon size={22} />
                                </div>

                                <p className="text-sm text-slate-500">
                                    {item.title}
                                </p>

                                <h3 className="mt-1 text-2xl font-bold text-slate-900">
                                    {item.value}
                                </h3>
                            </div>
                        )
                    })}

                </section>

                {/* Assessment Results */}
                <section className="mb-10">

                    <div className="mb-5">
                        <h2 className="text-2xl font-bold text-slate-900">
                            Assessment Performance
                        </h2>

                        <p className="mt-1 text-sm text-slate-500">
                            Track your latest scores and best performance.
                        </p>
                    </div>

                    <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">

                        {assessmentResults.map((assessment) => (
                            <article
                                key={assessment.title}
                                className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm"
                            >

                                <div className="flex items-start justify-between gap-3">

                                    <div className="flex items-center gap-3">
                                        <div className="rounded-xl bg-blue-50 p-3 text-blue-700">
                                            <Award size={23} />
                                        </div>

                                        <div>
                                            <h3 className="font-bold text-slate-900">
                                                {assessment.title}
                                            </h3>

                                            <p className="mt-1 text-xs text-slate-500">
                                                {assessment.subtitle}
                                            </p>
                                        </div>
                                    </div>

                                </div>

                                {assessment.result ? (
                                    <div className="mt-6 grid grid-cols-2 gap-3">

                                        <div className="rounded-lg bg-slate-50 p-3">
                                            <p className="text-xs text-slate-500">
                                                Latest Score
                                            </p>

                                            <p className="mt-1 text-lg font-bold text-blue-700">
                                                {assessment.result.percentage}%
                                            </p>
                                        </div>

                                        <div className="rounded-lg bg-slate-50 p-3">
                                            <p className="text-xs text-slate-500">
                                                Best
                                            </p>

                                            <p className="mt-1 text-lg font-bold text-blue-700">
                                                {assessment.result.bestScore}/{assessment.result.totalQuestions}
                                            </p>
                                        </div>

                                    </div>
                                ) : (
                                    <p className="mt-6 rounded-lg bg-slate-50 p-4 text-sm text-slate-500">
                                        Complete this assessment to view your performance.
                                    </p>
                                )}

                            </article>
                        ))}

                    </div>
                </section>

                {/* Chapters */}
                <section className="mb-10">

                    <div className="mb-5 flex flex-wrap items-center justify-between gap-3">

                        <div>
                            <h2 className="text-2xl font-bold text-slate-900">
                                Your Learning Journey
                            </h2>

                            <p className="mt-1 text-sm text-slate-500">
                                Explore the nine chapters of CAREERVERSE.
                            </p>
                        </div>

                        <span className="rounded-full bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-700">
                            {completedChapters} / {totalChapters} Completed
                        </span>

                    </div>

                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">

                        {chapters.map((chapter, index) => {
                            const chapterNumber = index + 1

                            const isCompleted =
                                chapterCompletionStatus[index]

                            const isAvailable =
                                chapterNumber <= 8 ||
                                (chapterNumber === 9 && chapterEightCompleted)

                            return (
                                <article
                                    key={chapter}
                                    className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
                                >

                                    <div className="mb-4 flex items-center justify-between">

                                        <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 font-bold text-blue-700">
                                            {String(chapterNumber).padStart(2, '0')}
                                        </span>

                                        {isCompleted ? (
                                            <span className="flex items-center gap-1 rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-green-700">
                                                <CheckCircle2 size={13} />
                                                Completed
                                            </span>
                                        ) : isAvailable ? (
                                            <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
                                                Available
                                            </span>
                                        ) : (
                                            <span className="flex items-center gap-1 rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-500">
                                                <LockKeyhole size={12} />
                                                Locked
                                            </span>
                                        )}

                                    </div>

                                    <h3 className="min-h-14 text-lg font-semibold text-slate-900">
                                        {chapter}
                                    </h3>

                                    <p className="mt-2 text-sm text-slate-500">
                                        Chapter {chapterNumber} · Career Development
                                    </p>

                                    {/* Chapter 1 Result */}
                                    {chapterNumber === 1 && chapterOneResult && (
                                        <p className="mt-3 text-sm font-semibold text-green-700">
                                            Assessment: {chapterOneResult.score}/{chapterOneResult.totalQuestions} ({chapterOneResult.percentage}%)
                                        </p>
                                    )}

                                    {/* Chapter 2 Results */}
                                    {chapterNumber === 2 && (
                                        <div className="mt-3 space-y-1 text-sm">

                                            <p className={chapterTwoQuizOneResult ? 'font-semibold text-green-700' : 'text-slate-500'}>
                                                Quiz 1: {chapterTwoQuizOneResult
                                                    ? `${chapterTwoQuizOneResult.score}/${chapterTwoQuizOneResult.totalQuestions} (${chapterTwoQuizOneResult.percentage}%)`
                                                    : 'Pending'}
                                            </p>

                                            <p className={chapterTwoQuizTwoResult ? 'font-semibold text-green-700' : 'text-slate-500'}>
                                                Quiz 2: {chapterTwoQuizTwoResult
                                                    ? `${chapterTwoQuizTwoResult.score}/${chapterTwoQuizTwoResult.totalQuestions} (${chapterTwoQuizTwoResult.percentage}%)`
                                                    : 'Pending'}
                                            </p>

                                        </div>
                                    )}

                                    {/* Chapter 3 Poll Result */}
                                    {chapterNumber === 3 && (
                                        <div className="mt-3 space-y-1 text-sm">

                                            {chapterThreePollResult ? (
                                                <>
                                                    <p className="font-semibold text-green-700">
                                                        Domain Preference Submitted
                                                    </p>

                                                    <p className="text-slate-600">
                                                        Selected: {chapterThreePollResult.domain}
                                                    </p>
                                                </>
                                            ) : (
                                                <p className="text-slate-500">
                                                    Domain preference poll pending.
                                                </p>
                                            )}

                                        </div>
                                    )}

                                    {/* Chapter 4 Assessment Status */}
                                    {chapterNumber === 4 && (
                                        <p className="mt-3 text-sm text-slate-500">
                                            {chapterFourCompleted
                                                ? 'Skills assessment completed.'
                                                : 'Skills assessment pending.'}
                                        </p>
                                    )}

                                    {/* Chapter Navigation */}
                                    {isAvailable ? (
                                        <Link
                                            to={`/student/chapter/${chapterNumber}`}
                                            className="mt-5 block w-full rounded-lg bg-blue-700 px-4 py-3 text-center text-sm font-semibold text-white transition hover:bg-blue-800"
                                        >
                                            {isCompleted ? 'Review Chapter' : 'Explore Chapter'}
                                        </Link>
                                    ) : (
                                        <button
                                            type="button"
                                            disabled
                                            className="mt-5 w-full cursor-not-allowed rounded-lg bg-slate-100 px-4 py-3 text-sm font-semibold text-slate-400"
                                        >
                                            Coming Soon
                                        </button>
                                    )}

                                </article>
                            )
                        })}

                    </div>
                </section>

                {/* Bottom Sections */}
                <section className="grid gap-5 md:grid-cols-2">

                    <div className="rounded-xl border border-slate-200 bg-white p-6">
                        <Trophy className="mb-3 text-blue-700" size={25} />

                        <h3 className="text-lg font-semibold text-slate-900">
                            Your Achievements
                        </h3>

                        <p className="mt-2 text-sm text-slate-500">
                            {completedChapters > 0
                                ? `You have completed ${completedChapters} chapter${completedChapters > 1 ? 's' : ''}. Keep progressing!`
                                : 'Complete chapters and activities to track your achievements.'}
                        </p>
                    </div>

                    <div className="rounded-xl border border-slate-200 bg-white p-6">
                        <UserCircle className="mb-3 text-blue-700" size={25} />

                        <h3 className="text-lg font-semibold text-slate-900">
                            Student Profile
                        </h3>

                        <p className="mt-2 text-sm text-slate-500">
                            Student Name: {student?.studentName || 'Not available'}
                        </p>

                        <p className="mt-2 text-sm text-slate-500">
                            Registration Number: {student?.registrationNumber || 'Not available'}
                        </p>
                    </div>

                </section>

                {/* Footer */}
                <footer className="mt-12 border-t border-slate-200 py-6 text-center text-sm text-slate-400">
                    © 2026 CAREERVERSE · Career Development Programme
                </footer>

            </main>
        </div>
    )
}
