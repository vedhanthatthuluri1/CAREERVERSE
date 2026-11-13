
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
    ArrowLeft,
    RefreshCw,
    Users,
    BookOpen,
    ClipboardList,
    Activity,
    TrendingUp,
    AlertCircle,
    GraduationCap,
} from 'lucide-react'
import {
    getAdminAuthToken,
    clearAdminAuthToken,
} from '../../services/storage/authStorage'

const API_URL =
    'https://script.google.com/macros/s/AKfycbwCzr6za1KI5i_dMywoeS4OgZsYtVI_y2AMdrork4lLgpitv5I0h1J9x6xkp7EOOgVT3A/exec'

interface Student {
    studentId: string
    studentName: string
    status: string
}

interface ProgressRecord {
    chapter: string | number
    completed: boolean | string
}

interface AssessmentRecord {
    chapter: string | number
    percentage: number | string
}

interface StudentProfile {
    progress?: ProgressRecord[]
    assessments?: AssessmentRecord[]
}

interface AnalyticsData {
    totalStudents: number
    engagedStudents: number
    totalAssessments: number
    totalCompletedChapters: number
    averageScore: number
    chapterCompletion: number[]
    chapterScores: number[]
}

const EMPTY_ANALYTICS: AnalyticsData = {
    totalStudents: 0,
    engagedStudents: 0,
    totalAssessments: 0,
    totalCompletedChapters: 0,
    averageScore: 0,
    chapterCompletion: Array(9).fill(0),
    chapterScores: Array(9).fill(0),
}

function isCompleted(value: boolean | string) {
    return value === true || String(value).toLowerCase() === 'true'
}

async function apiRequest(token: string, payload: Record<string, unknown>) {
    const response = await fetch(API_URL, {
        method: 'POST',
        body: JSON.stringify({ ...payload, token }),
    })

    const result = await response.json()

    if (!response.ok || result.success === false) {
        throw new Error(result.message || 'API request failed.')
    }

    return result.data ?? result
}

function isAuthError(message: string) {
    const normalized = message.toLowerCase()

    return (
        normalized.includes('token') ||
        normalized.includes('session')
    )
}

function MetricCard({
    title,
    value,
    subtitle,
    icon: Icon,
}: {
    title: string
    value: string | number
    subtitle: string
    icon: typeof Users
}) {
    return (
        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
            <div className="flex items-center justify-between">
                <p className="text-sm text-slate-400">{title}</p>
                <Icon size={22} className="text-indigo-400" />
            </div>
            <p className="mt-4 text-3xl font-bold text-white">{value}</p>
            <p className="mt-1 text-xs text-slate-500">{subtitle}</p>
        </div>
    )
}

function ProgressBar({
    label,
    value,
    maximum,
}: {
    label: string
    value: number
    maximum: number
}) {
    const percentage =
        maximum > 0 ? Math.min(100, (value / maximum) * 100) : 0

    return (
        <div className="space-y-2">
            <div className="flex items-center justify-between gap-3 text-sm">
                <span className="text-slate-300">{label}</span>
                <span className="font-semibold tabular-nums text-white">
                    {value}
                </span>
            </div>
            <div className="h-3 overflow-hidden rounded-full bg-slate-800">
                <div
                    className="h-full rounded-full bg-indigo-500 transition-all"
                    style={{ width: `${percentage}%` }}
                />
            </div>
        </div>
    )
}

export default function StudentAnalytics() {
    const navigate = useNavigate()

    const [analytics, setAnalytics] = useState(EMPTY_ANALYTICS)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const [partialWarning, setPartialWarning] = useState('')

    async function loadAnalytics() {
        const token = getAdminAuthToken()

        if (!token) {
            navigate('/admin/login', { replace: true })
            return
        }

        setLoading(true)
        setError('')
        setPartialWarning('')

        try {
            const studentsData = await apiRequest(token, {
                action: 'admin.students',
            })

            const students: Student[] = Array.isArray(studentsData)
                ? studentsData
                : []

            const chapterCompletion = Array(9).fill(0)
            const chapterScoreTotals = Array(9).fill(0)
            const chapterScoreCounts = Array(9).fill(0)

            let engagedStudents = 0
            let totalAssessments = 0
            let totalCompletedChapters = 0
            let totalScore = 0
            let totalScoredAssessments = 0
            let failedProfiles = 0
            let authenticationFailed = false

            // Limit concurrent requests to reduce API load.
            let nextIndex = 0

            async function worker() {
                while (
                    nextIndex < students.length &&
                    !authenticationFailed
                ) {
                    const currentIndex = nextIndex++
                    const student = students[currentIndex]

                    try {
                        const data = await apiRequest(token!, {
                            action: 'admin.student.profile',
                            studentId: student.studentId,
                        }) as StudentProfile

                        const progress = Array.isArray(data.progress)
                            ? data.progress
                            : []

                        const assessments = Array.isArray(data.assessments)
                            ? data.assessments
                            : []

                        if (progress.length > 0 || assessments.length > 0) {
                            engagedStudents++
                        }

                        progress.forEach((record) => {
                            const chapter = Number(record.chapter)

                            if (
                                chapter >= 1 &&
                                chapter <= 9 &&
                                isCompleted(record.completed)
                            ) {
                                chapterCompletion[chapter - 1]++
                                totalCompletedChapters++
                            }
                        })

                        totalAssessments += assessments.length

                        assessments.forEach((assessment) => {
                            const score = Number(assessment.percentage)
                            const chapter = Number(assessment.chapter)

                            if (Number.isFinite(score)) {
                                totalScore += score
                                totalScoredAssessments++

                                if (chapter >= 1 && chapter <= 9) {
                                    chapterScoreTotals[chapter - 1] += score
                                    chapterScoreCounts[chapter - 1]++
                                }
                            }
                        })
                    } catch (err) {
                        const message =
                            err instanceof Error ? err.message : ''

                        if (isAuthError(message)) {
                            authenticationFailed = true
                            return
                        }

                        failedProfiles++
                    }
                }
            }

            const workerCount = Math.min(4, students.length)

            await Promise.all(
                Array.from({ length: workerCount }, () => worker())
            )

            if (authenticationFailed) {
                clearAdminAuthToken()
                navigate('/admin/login', { replace: true })
                return
            }

            const chapterScores = chapterScoreTotals.map((total, index) =>
                chapterScoreCounts[index] > 0
                    ? total / chapterScoreCounts[index]
                    : 0
            )

            setAnalytics({
                totalStudents: students.length,
                engagedStudents,
                totalAssessments,
                totalCompletedChapters,
                averageScore:
                    totalScoredAssessments > 0
                        ? totalScore / totalScoredAssessments
                        : 0,
                chapterCompletion,
                chapterScores,
            })

            if (failedProfiles > 0) {
                setPartialWarning(
                    `Analytics loaded with ${failedProfiles} student profile request(s) unavailable. Some totals may be incomplete.`
                )
            }
        } catch (err) {
            const message =
                err instanceof Error
                    ? err.message
                    : 'Unable to calculate analytics.'

            if (isAuthError(message)) {
                clearAdminAuthToken()
                navigate('/admin/login', { replace: true })
                return
            }

            setError(message)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        void loadAnalytics()
    }, [])

    const engagementRate =
        analytics.totalStudents > 0
            ? (analytics.engagedStudents / analytics.totalStudents) * 100
            : 0

    const chapterMaximum = Math.max(
        1,
        ...analytics.chapterCompletion
    )

    return (
        <div className="min-h-screen bg-slate-950 text-white">
            <div className="mx-auto max-w-7xl px-5 py-8 sm:px-8">

                <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
                    <button
                        onClick={() => navigate('/admin/dashboard')}
                        className="inline-flex items-center gap-2 text-sm text-slate-400 transition hover:text-white"
                    >
                        <ArrowLeft size={17} />
                        Back to Dashboard
                    </button>

                    <button
                        onClick={() => void loadAnalytics()}
                        disabled={loading}
                        className="inline-flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-900 px-5 py-3 text-sm font-semibold transition hover:bg-slate-800 disabled:opacity-50"
                    >
                        <RefreshCw
                            size={16}
                            className={loading ? 'animate-spin' : ''}
                        />
                        Refresh Analytics
                    </button>
                </div>

                <div className="mb-8">
                    <div className="mb-2 flex items-center gap-2 text-sm font-semibold tracking-widest text-indigo-400">
                        <GraduationCap size={19} />
                        CAREERVERSE ADMIN
                    </div>

                    <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                        Student Performance Analytics
                    </h1>

                    <p className="mt-2 text-sm text-slate-400">
                        Monitor learning progress, engagement and assessment performance.
                    </p>
                </div>

                {error && (
                    <div className="mb-6 flex items-start gap-3 rounded-xl border border-red-900/50 bg-red-950/30 p-4 text-sm text-red-300">
                        <AlertCircle size={19} className="mt-0.5 shrink-0" />
                        <div>
                            <p className="font-semibold">Analytics unavailable</p>
                            <p className="mt-1">{error}</p>
                        </div>
                    </div>
                )}

                {partialWarning && (
                    <div className="mb-6 flex items-start gap-3 rounded-xl border border-amber-900/50 bg-amber-950/20 p-4 text-sm text-amber-300">
                        <AlertCircle size={19} className="mt-0.5 shrink-0" />
                        <p>{partialWarning}</p>
                    </div>
                )}

                {loading ? (
                    <div className="flex items-center justify-center gap-3 rounded-2xl border border-slate-800 bg-slate-900 py-20 text-sm text-slate-400">
                        <RefreshCw size={20} className="animate-spin" />
                        Calculating student analytics...
                    </div>
                ) : !error && (
                    <>
                        {/* Key Metrics */}
                        <section className="mb-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                            <MetricCard
                                title="Total Students"
                                value={analytics.totalStudents}
                                subtitle="Registered student accounts"
                                icon={Users}
                            />

                            <MetricCard
                                title="Engaged Students"
                                value={analytics.engagedStudents}
                                subtitle="Students with recorded learning activity"
                                icon={Activity}
                            />

                            <MetricCard
                                title="Completed Chapters"
                                value={analytics.totalCompletedChapters}
                                subtitle="Total completed chapter records"
                                icon={BookOpen}
                            />

                            <MetricCard
                                title="Assessments Submitted"
                                value={analytics.totalAssessments}
                                subtitle="Recorded assessment submissions"
                                icon={ClipboardList}
                            />

                            <MetricCard
                                title="Average Assessment Score"
                                value={`${analytics.averageScore.toFixed(1)}%`}
                                subtitle="Across recorded assessment scores"
                                icon={TrendingUp}
                            />

                            <MetricCard
                                title="Student Engagement"
                                value={`${engagementRate.toFixed(1)}%`}
                                subtitle="Percentage with recorded activity"
                                icon={GraduationCap}
                            />
                        </section>

                        {/* Chapter Completion */}
                        <section className="mb-7 rounded-2xl border border-slate-800 bg-slate-900 p-6">
                            <div className="mb-6">
                                <h2 className="text-lg font-bold">
                                    Chapter Completion Analysis
                                </h2>
                                <p className="mt-1 text-sm text-slate-400">
                                    Number of students with a completed record for each chapter.
                                </p>
                            </div>

                            <div className="space-y-6">
                                {analytics.chapterCompletion.map((value, index) => (
                                    <ProgressBar
                                        key={index}
                                        label={`Chapter ${index + 1}`}
                                        value={value}
                                        maximum={chapterMaximum}
                                    />
                                ))}
                            </div>
                        </section>

                        {/* Assessment Performance */}
                        <section className="mb-7 rounded-2xl border border-slate-800 bg-slate-900 p-6">
                            <div className="mb-6">
                                <h2 className="text-lg font-bold">
                                    Chapter-wise Assessment Performance
                                </h2>
                                <p className="mt-1 text-sm text-slate-400">
                                    Average percentage score for submitted assessments in each chapter.
                                </p>
                            </div>

                            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                                {analytics.chapterScores.map((score, index) => (
                                    <div
                                        key={index}
                                        className="rounded-xl border border-slate-800 bg-slate-950/60 p-5"
                                    >
                                        <p className="text-sm text-slate-400">
                                            Chapter {index + 1}
                                        </p>

                                        <p className="mt-3 text-3xl font-bold text-cyan-400">
                                            {score.toFixed(1)}%
                                        </p>

                                        <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-800">
                                            <div
                                                className="h-full rounded-full bg-cyan-500"
                                                style={{
                                                    width: `${Math.min(100, Math.max(0, score))}%`,
                                                }}
                                            />
                                        </div>

                                        <p className="mt-2 text-xs text-slate-500">
                                            {score > 0
                                                ? 'Based on recorded scores'
                                                : 'No scored assessments'}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </section>

                        <p className="text-xs text-slate-600">
                            Data source: CAREERVERSE Google Sheets database. Analytics reflect currently recorded student activity and submissions.
                        </p>
                    </>
                )}
            </div>
        </div>
    )
}
