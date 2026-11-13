
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import {
    ArrowLeft,
    RefreshCw,
    GraduationCap,
    UserCircle,
    Mail,
    Phone,
    BookOpen,
    ClipboardList,
    CheckCircle2,
    Clock3,
    AlertCircle,
    CalendarDays,
    Activity,
    ChevronDown,
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
    email: string
    phone: string
    registrationNumber: string
    eventCode: string
    status: string
    createdAt: string
    updatedAt: string
}

interface ProgressRecord {
    progressId: string
    chapter: string | number
    studentId: string
    completed: boolean | string
    completedAt: string
    updatedAt: string
    activityData: unknown
}

interface AssessmentRecord {
    submissionId: string
    studentId: string
    chapter: string | number
    assessmentType: string
    score: number | string
    totalQuestions: number | string
    percentage: number | string
    responseData: unknown
    submittedAt: string
}

interface StudentProfileData {
    student: Student
    progress: ProgressRecord[]
    assessments: AssessmentRecord[]
    summary: {
        totalChapters: number
        completedChapters: number
        remainingChapters: number
        totalAssessments: number
        averageScore: number
    }
}

function parseStoredData(value: unknown): unknown {
    if (typeof value !== 'string') return value

    try {
        return JSON.parse(value)
    } catch {
        return value
    }
}

function formatDate(value?: string) {
    if (!value) return 'Not available'

    const date = new Date(value)

    if (Number.isNaN(date.getTime())) return String(value)

    return date.toLocaleString('en-IN', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    })
}

function isCompleted(value: boolean | string) {
    return value === true || String(value).toLowerCase() === 'true'
}

function DataDetails({ value }: { value: unknown }) {
    const parsed = parseStoredData(value)

    if (parsed === null || parsed === undefined || parsed === '') {
        return <p className="text-sm text-slate-500">No additional data recorded.</p>
    }

    if (typeof parsed === 'object') {
        return (
            <pre className="max-h-72 overflow-auto whitespace-pre-wrap break-words rounded-xl bg-slate-950 p-4 text-xs leading-6 text-slate-300">
                {JSON.stringify(parsed, null, 2)}
            </pre>
        )
    }

    return (
        <p className="whitespace-pre-wrap break-words text-sm text-slate-300">
            {String(parsed)}
        </p>
    )
}

export default function StudentProfile() {
    const navigate = useNavigate()
    const { studentId } = useParams<{ studentId: string }>()

    const [profile, setProfile] = useState<StudentProfileData | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    async function loadProfile() {
        const token = getAdminAuthToken()

        if (!token) {
            navigate('/admin/login', { replace: true })
            return
        }

        if (!studentId) {
            setError('Student ID is missing from the URL.')
            setLoading(false)
            return
        }

        setLoading(true)
        setError('')

        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                body: JSON.stringify({
                    action: 'admin.student.profile',
                    token,
                    studentId: decodeURIComponent(studentId),
                }),
            })

            const result = await response.json()

            if (!response.ok || result.success === false) {
                const message =
                    result.message || 'Unable to load student profile.'

                if (
                    message.toLowerCase().includes('token') ||
                    message.toLowerCase().includes('session')
                ) {
                    clearAdminAuthToken()
                    navigate('/admin/login', { replace: true })
                    return
                }

                throw new Error(message)
            }

            const data = result.data ?? result

            if (!data.student) {
                throw new Error('Student profile was not found.')
            }

            setProfile(data as StudentProfileData)
        } catch (err) {
            setError(
                err instanceof Error
                    ? err.message
                    : 'Something went wrong while loading the profile.'
            )
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        void loadProfile()
    }, [studentId])

    const completedChapters = profile?.summary?.completedChapters ?? 0
    const totalChapters = profile?.summary?.totalChapters ?? 9
    const progressPercentage =
        totalChapters > 0
            ? Math.min(100, (completedChapters / totalChapters) * 100)
            : 0

    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-slate-950 text-slate-400">
                <div className="flex items-center gap-3">
                    <RefreshCw size={20} className="animate-spin" />
                    Loading student profile...
                </div>
            </div>
        )
    }

    if (error || !profile) {
        return (
            <div className="min-h-screen bg-slate-950 px-5 py-12 text-white">
                <div className="mx-auto max-w-3xl rounded-2xl border border-red-900/50 bg-slate-900 p-8">
                    <AlertCircle className="mb-4 text-red-400" size={32} />
                    <h1 className="text-xl font-bold">Unable to load profile</h1>
                    <p className="mt-2 text-sm text-slate-400">
                        {error || 'No student profile data was returned.'}
                    </p>
                    <div className="mt-6 flex flex-wrap gap-3">
                        <button
                            onClick={() => navigate('/admin/students')}
                            className="rounded-xl border border-slate-700 px-5 py-3 text-sm font-semibold hover:bg-slate-800"
                        >
                            Back to Students
                        </button>
                        <button
                            onClick={() => void loadProfile()}
                            className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold hover:bg-indigo-500"
                        >
                            <RefreshCw size={16} />
                            Try Again
                        </button>
                    </div>
                </div>
            </div>
        )
    }

    const student = profile.student
    const progressRecords = Array.isArray(profile.progress) ? profile.progress : []
    const assessmentRecords = Array.isArray(profile.assessments)
        ? profile.assessments
        : []

    return (
        <div className="min-h-screen bg-slate-950 text-white">
            <div className="mx-auto max-w-7xl px-5 py-8 sm:px-8">

                <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
                    <button
                        onClick={() => navigate('/admin/students')}
                        className="inline-flex items-center gap-2 text-sm text-slate-400 transition hover:text-white"
                    >
                        <ArrowLeft size={17} />
                        Back to Students
                    </button>

                    <button
                        onClick={() => void loadProfile()}
                        className="inline-flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-sm font-semibold transition hover:bg-slate-800"
                    >
                        <RefreshCw size={16} />
                        Refresh Profile
                    </button>
                </div>

                <div className="mb-8">
                    <div className="mb-2 flex items-center gap-2 text-sm font-semibold tracking-widest text-indigo-400">
                        <GraduationCap size={19} />
                        CAREERVERSE ADMIN
                    </div>
                    <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                        Student Profile
                    </h1>
                    <p className="mt-2 text-sm text-slate-400">
                        Individual student information, learning activity and assessment history.
                    </p>
                </div>

                {/* Student Information */}
                <section className="mb-7 rounded-2xl border border-slate-800 bg-slate-900 p-6">
                    <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
                        <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-indigo-500/15 text-indigo-400">
                            <UserCircle size={36} />
                        </div>

                        <div className="min-w-0 flex-1">
                            <div className="flex flex-wrap items-center gap-3">
                                <h2 className="text-2xl font-bold">
                                    {student.studentName || 'Unnamed Student'}
                                </h2>
                                <span className="rounded-full border border-emerald-800 bg-emerald-950/40 px-3 py-1 text-xs font-semibold text-emerald-400">
                                    {student.status || 'Unknown'}
                                </span>
                            </div>

                            <p className="mt-2 break-all text-sm text-slate-400">
                                Student ID: {student.studentId}
                            </p>

                            <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                                <div className="flex items-center gap-3 text-sm text-slate-300">
                                    <Mail size={17} className="shrink-0 text-indigo-400" />
                                    {student.email || 'Email not provided'}
                                </div>

                                <div className="flex items-center gap-3 text-sm text-slate-300">
                                    <Phone size={17} className="shrink-0 text-indigo-400" />
                                    {student.phone || 'Phone not provided'}
                                </div>

                                <div className="text-sm text-slate-300">
                                    <span className="text-slate-500">Registration:</span>{' '}
                                    {student.registrationNumber || '—'}
                                </div>

                                <div className="text-sm text-slate-300">
                                    <span className="text-slate-500">Event code:</span>{' '}
                                    {student.eventCode || '—'}
                                </div>

                                <div className="text-sm text-slate-300">
                                    <span className="text-slate-500">Created:</span>{' '}
                                    {formatDate(student.createdAt)}
                                </div>

                                <div className="text-sm text-slate-300">
                                    <span className="text-slate-500">Last updated:</span>{' '}
                                    {formatDate(student.updatedAt)}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Summary Cards */}
                <section className="mb-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
                        <BookOpen className="mb-3 text-indigo-400" size={23} />
                        <p className="text-sm text-slate-400">Completed Chapters</p>
                        <p className="mt-2 text-3xl font-bold">
                            {completedChapters}/{totalChapters}
                        </p>
                    </div>

                    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
                        <ClipboardList className="mb-3 text-cyan-400" size={23} />
                        <p className="text-sm text-slate-400">Assessments</p>
                        <p className="mt-2 text-3xl font-bold">
                            {profile.summary?.totalAssessments ?? assessmentRecords.length}
                        </p>
                    </div>

                    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
                        <Activity className="mb-3 text-emerald-400" size={23} />
                        <p className="text-sm text-slate-400">Average Score</p>
                        <p className="mt-2 text-3xl font-bold">
                            {Number(profile.summary?.averageScore ?? 0).toFixed(1)}%
                        </p>
                    </div>

                    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
                        <Clock3 className="mb-3 text-amber-400" size={23} />
                        <p className="text-sm text-slate-400">Remaining Chapters</p>
                        <p className="mt-2 text-3xl font-bold">
                            {profile.summary?.remainingChapters ?? Math.max(0, totalChapters - completedChapters)}
                        </p>
                    </div>
                </section>

                {/* Learning Progress */}
                <section className="mb-7 rounded-2xl border border-slate-800 bg-slate-900 p-6">
                    <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
                        <div>
                            <h2 className="text-lg font-bold">Learning Progress</h2>
                            <p className="mt-1 text-sm text-slate-400">
                                Recorded completion across all nine chapters.
                            </p>
                        </div>
                        <span className="text-xl font-bold text-indigo-400">
                            {progressPercentage.toFixed(0)}%
                        </span>
                    </div>

                    <div className="mb-6 h-3 overflow-hidden rounded-full bg-slate-800">
                        <div
                            className="h-full rounded-full bg-indigo-500 transition-all"
                            style={{ width: `${progressPercentage}%` }}
                        />
                    </div>

                    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                        {Array.from({ length: totalChapters }, (_, index) => {
                            const chapterNumber = index + 1
                            const record = progressRecords.find(
                                (item) => Number(item.chapter) === chapterNumber
                            )
                            const done = record ? isCompleted(record.completed) : false

                            return (
                                <div
                                    key={chapterNumber}
                                    className="rounded-xl border border-slate-800 bg-slate-950/60 p-4"
                                >
                                    <div className="flex items-center justify-between gap-3">
                                        <div>
                                            <p className="font-semibold">
                                                Chapter {chapterNumber}
                                            </p>
                                            <p className={`mt-1 text-xs ${done ? 'text-emerald-400' : 'text-slate-500'}`}>
                                                {done
                                                    ? 'Completed'
                                                    : record
                                                        ? 'Progress recorded'
                                                        : 'No progress record'}
                                            </p>
                                        </div>

                                        {done ? (
                                            <CheckCircle2 className="text-emerald-400" size={21} />
                                        ) : (
                                            <Clock3 className="text-slate-600" size={21} />
                                        )}
                                    </div>

                                    {record && (
                                        <p className="mt-3 text-xs text-slate-500">
                                            Updated: {formatDate(record.updatedAt)}
                                        </p>
                                    )}
                                </div>
                            )
                        })}
                    </div>
                </section>

                {/* Chapter Activity */}
                <section className="mb-7 rounded-2xl border border-slate-800 bg-slate-900 p-6">
                    <div className="mb-5">
                        <h2 className="text-lg font-bold">Chapter Activity Details</h2>
                        <p className="mt-1 text-sm text-slate-400">
                            Stored learning activities and chapter-specific data.
                        </p>
                    </div>

                    {progressRecords.length === 0 ? (
                        <p className="rounded-xl bg-slate-950 p-5 text-sm text-slate-500">
                            No chapter activity records are available for this student.
                        </p>
                    ) : (
                        <div className="space-y-3">
                            {progressRecords.map((record, index) => (
                                <details
                                    key={record.progressId || `${record.chapter}-${index}`}
                                    className="group rounded-xl border border-slate-800 bg-slate-950/60"
                                >
                                    <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-4">
                                        <div>
                                            <p className="font-semibold">
                                                Chapter {record.chapter}
                                            </p>
                                            <p className="mt-1 text-xs text-slate-500">
                                                Last updated: {formatDate(record.updatedAt)}
                                            </p>
                                        </div>
                                        <ChevronDown
                                            size={18}
                                            className="shrink-0 text-slate-500 transition group-open:rotate-180"
                                        />
                                    </summary>

                                    <div className="border-t border-slate-800 p-4">
                                        <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
                                            Activity Data
                                        </p>
                                        <DataDetails value={record.activityData} />
                                    </div>
                                </details>
                            ))}
                        </div>
                    )}
                </section>

                {/* Assessment History */}
                <section className="mb-7 rounded-2xl border border-slate-800 bg-slate-900 p-6">
                    <div className="mb-5">
                        <h2 className="text-lg font-bold">Assessment History</h2>
                        <p className="mt-1 text-sm text-slate-400">
                            Submitted quizzes, assessments and recorded results.
                        </p>
                    </div>

                    {assessmentRecords.length === 0 ? (
                        <div className="rounded-xl bg-slate-950 p-8 text-center">
                            <ClipboardList
                                size={30}
                                className="mx-auto text-slate-600"
                            />
                            <p className="mt-3 font-semibold">No assessments submitted</p>
                            <p className="mt-1 text-sm text-slate-500">
                                Assessment results will appear here when submitted.
                            </p>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {assessmentRecords.map((assessment, index) => (
                                <div
                                    key={assessment.submissionId || index}
                                    className="rounded-xl border border-slate-800 bg-slate-950/60 p-5"
                                >
                                    <div className="flex flex-wrap items-start justify-between gap-4">
                                        <div>
                                            <h3 className="font-semibold">
                                                Chapter {assessment.chapter}
                                            </h3>
                                            <p className="mt-1 text-sm text-slate-400">
                                                {assessment.assessmentType || 'Assessment'}
                                            </p>
                                            <p className="mt-2 flex items-center gap-2 text-xs text-slate-500">
                                                <CalendarDays size={14} />
                                                {formatDate(assessment.submittedAt)}
                                            </p>
                                        </div>

                                        <div className="text-right">
                                            <p className="text-2xl font-bold text-indigo-400">
                                                {Number(assessment.percentage || 0).toFixed(1)}%
                                            </p>
                                            <p className="mt-1 text-xs text-slate-500">
                                                {assessment.score ?? 0} / {assessment.totalQuestions ?? 0}
                                            </p>
                                        </div>
                                    </div>

                                    <details className="group mt-5 border-t border-slate-800 pt-4">
                                        <summary className="flex cursor-pointer list-none items-center justify-between text-sm font-medium text-slate-400 hover:text-white">
                                            View submitted responses
                                            <ChevronDown
                                                size={17}
                                                className="transition group-open:rotate-180"
                                            />
                                        </summary>

                                        <div className="mt-4">
                                            <DataDetails value={assessment.responseData} />
                                        </div>
                                    </details>
                                </div>
                            ))}
                        </div>
                    )}
                </section>

                <p className="text-xs text-slate-600">
                    Data source: CAREERVERSE Google Sheets database
                </p>
            </div>
        </div>
    )
}
