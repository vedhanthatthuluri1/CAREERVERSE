
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
    Users,
    ClipboardCheck,
    BookOpenCheck,
    UserPlus,
    TrendingUp,
    RefreshCw,
    LogOut,
    ShieldCheck,
    LayoutDashboard,
    AlertCircle,
} from 'lucide-react'
import {
    getAdminAuthToken,
    clearAdminAuthToken,
} from '../../services/storage/authStorage'

const API_URL =
    'https://script.google.com/macros/s/AKfycbwCzr6za1KI5i_dMywoeS4OgZsYtVI_y2AMdrork4lLgpitv5I0h1J9x6xkp7EOOgVT3A/exec'

interface DashboardData {
    totalStudents: number
    totalAssessments: number
    completedChapters: number
    liveRegistrations: number
    averageScore: number
}

const initialData: DashboardData = {
    totalStudents: 0,
    totalAssessments: 0,
    completedChapters: 0,
    liveRegistrations: 0,
    averageScore: 0,
}

const metrics = [
    {
        key: 'totalStudents',
        title: 'Total Students',
        description: 'Registered student accounts',
        icon: Users,
        color: 'bg-blue-50 text-blue-600',
    },
    {
        key: 'totalAssessments',
        title: 'Assessments',
        description: 'Submitted assessments',
        icon: ClipboardCheck,
        color: 'bg-violet-50 text-violet-600',
    },
    {
        key: 'completedChapters',
        title: 'Completed Chapters',
        description: 'Total chapter completions',
        icon: BookOpenCheck,
        color: 'bg-emerald-50 text-emerald-600',
    },
    {
        key: 'liveRegistrations',
        title: 'LIVE Registrations',
        description: 'Event registrations received',
        icon: UserPlus,
        color: 'bg-orange-50 text-orange-600',
    },
    {
        key: 'averageScore',
        title: 'Average Score',
        description: 'Average assessment percentage',
        icon: TrendingUp,
        color: 'bg-pink-50 text-pink-600',
        suffix: '%',
    },
] as const

export default function AdminDashboard() {
    const navigate = useNavigate()

    const [data, setData] = useState<DashboardData>(initialData)
    const [loading, setLoading] = useState(true)
    const [refreshing, setRefreshing] = useState(false)
    const [error, setError] = useState('')

    const loadDashboard = async (isRefresh = false) => {
        const token = getAdminAuthToken()

        if (!token) {
            navigate('/admin/login', { replace: true })
            return
        }

        if (isRefresh) {
            setRefreshing(true)
        } else {
            setLoading(true)
        }

        setError('')

        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                body: JSON.stringify({
                    action: 'admin.dashboard',
                    token,
                }),
            })

            const result = await response.json()

            if (!response.ok || result.success === false) {
                if (
                    result.message?.toLowerCase().includes('token') ||
                    result.message?.toLowerCase().includes('session')
                ) {
                    clearAdminAuthToken()
                    navigate('/admin/login', { replace: true })
                    return
                }

                throw new Error(
                    result.message || 'Unable to load dashboard data.',
                )
            }

            const dashboard = result.data ?? result

            setData({
                totalStudents: Number(dashboard.totalStudents) || 0,
                totalAssessments: Number(dashboard.totalAssessments) || 0,
                completedChapters: Number(dashboard.completedChapters) || 0,
                liveRegistrations: Number(dashboard.liveRegistrations) || 0,
                averageScore: Number(dashboard.averageScore) || 0,
            })
        } catch (err) {
            console.error('Admin dashboard error:', err)
            setError(
                err instanceof Error
                    ? err.message
                    : 'Unable to connect to the CAREERVERSE database.',
            )
        } finally {
            setLoading(false)
            setRefreshing(false)
        }
    }

    useEffect(() => {
        void loadDashboard()
    }, [])

    const handleLogout = async () => {
        const token = getAdminAuthToken()

        try {
            if (token) {
                await fetch(API_URL, {
                    method: 'POST',
                    body: JSON.stringify({
                        action: 'admin.logout',
                        token,
                    }),
                })
            }
        } catch (err) {
            console.error('Admin logout error:', err)
        } finally {
            clearAdminAuthToken()
            navigate('/admin/login', { replace: true })
        }
    }

    return (
        <div className="min-h-screen bg-slate-50">

            {/* Header */}
            <header className="border-b border-slate-200 bg-white">
                <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8">

                    <div className="flex items-center gap-3">
                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-600 text-white">
                            <ShieldCheck size={24} />
                        </div>

                        <div>
                            <h1 className="text-lg font-bold tracking-tight text-slate-900">
                                CAREERVERSE
                            </h1>
                            <p className="text-xs text-slate-500">
                                Administration Portal
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <div className="hidden items-center gap-2 rounded-full bg-emerald-50 px-3 py-2 text-xs font-semibold text-emerald-700 sm:flex">
                            <span className="h-2 w-2 rounded-full bg-emerald-500" />
                            Admin Session
                        </div>

                        <button
                            onClick={handleLogout}
                            className="flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100 hover:text-slate-900"
                        >
                            <LogOut size={16} />
                            <span className="hidden sm:inline">Logout</span>
                        </button>
                    </div>

                </div>
            </header>

            {/* Admin Navigation */}
            <nav className="border-b border-slate-200 bg-white">
                <div className="mx-auto flex max-w-7xl gap-2 overflow-x-auto px-5 py-3 lg:px-8">

                    <button
                        onClick={() => navigate('/admin/dashboard')}
                        className="flex shrink-0 items-center gap-2 rounded-lg bg-indigo-50 px-4 py-2.5 text-sm font-semibold text-indigo-700 transition hover:bg-indigo-100"
                    >
                        <LayoutDashboard size={17} />
                        Dashboard
                    </button>

                    <button
                        onClick={() => navigate('/admin/students')}
                        className="flex shrink-0 items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold text-slate-600 transition hover:bg-slate-100 hover:text-indigo-700"
                    >
                        <Users size={17} />
                        Student Management
                    </button>

                </div>
            </nav>

            <main className="mx-auto max-w-7xl px-5 py-8 lg:px-8">

                {/* Page Heading */}
                <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">

                    <div>
                        <div className="mb-2 flex items-center gap-2 text-sm font-medium text-indigo-600">
                            <LayoutDashboard size={16} />
                            Dashboard Overview
                        </div>

                        <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                            Administration Dashboard
                        </h2>

                        <p className="mt-2 text-sm text-slate-500">
                            Monitor student participation and CAREERVERSE performance.
                        </p>
                    </div>

                    <button
                        onClick={() => void loadDashboard(true)}
                        disabled={loading || refreshing}
                        className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        <RefreshCw
                            size={16}
                            className={refreshing ? 'animate-spin' : ''}
                        />
                        Refresh Data
                    </button>

                </div>

                {/* Error Message */}
                {error && (
                    <div className="mb-6 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
                        <AlertCircle size={20} className="mt-0.5 shrink-0" />

                        <div>
                            <p className="font-semibold">
                                Dashboard data unavailable
                            </p>

                            <p className="mt-1">{error}</p>

                            <button
                                onClick={() => void loadDashboard()}
                                className="mt-2 font-semibold underline"
                            >
                                Try again
                            </button>
                        </div>
                    </div>
                )}

                {/* Metric Cards */}
                <section>
                    <div className="mb-4">
                        <h3 className="text-lg font-bold text-slate-900">
                            Platform Statistics
                        </h3>

                        <p className="mt-1 text-sm text-slate-500">
                            Live statistics retrieved from your CAREERVERSE database.
                        </p>
                    </div>

                    <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">

                        {metrics.map((metric) => {
                            const Icon = metric.icon
                            const value = data[metric.key]

                            return (
                                <div
                                    key={metric.key}
                                    className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                                >
                                    <div className="flex items-start justify-between">

                                        <div>
                                            <p className="text-sm font-medium text-slate-500">
                                                {metric.title}
                                            </p>

                                            <div className="mt-4 flex items-baseline gap-1">
                                                {loading ? (
                                                    <div className="h-9 w-20 animate-pulse rounded-lg bg-slate-100" />
                                                ) : (
                                                    <span className="text-3xl font-bold tracking-tight text-slate-900">
                                                        {value.toLocaleString()}
                                                        {'suffix' in metric ? metric.suffix : ''}
                                                    </span>
                                                )}
                                            </div>
                                        </div>

                                        <div
                                            className={`flex h-12 w-12 items-center justify-center rounded-xl ${metric.color}`}
                                        >
                                            <Icon size={23} />
                                        </div>

                                    </div>

                                    <p className="mt-4 text-xs text-slate-400">
                                        {metric.description}
                                    </p>
                                </div>
                            )
                        })}

                    </div>
                </section>

                {/* Database Information */}
                <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                    <div className="flex items-start gap-4">

                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                            <ShieldCheck size={22} />
                        </div>

                        <div>
                            <h3 className="font-bold text-slate-900">
                                CAREERVERSE Database Connection
                            </h3>

                            <p className="mt-1 text-sm leading-6 text-slate-500">
                                Dashboard statistics are retrieved through the CAREERVERSE
                                Apps Script API, connected to your Google Sheets database.
                            </p>

                            <div className="mt-3 inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1.5 text-xs font-medium text-slate-600">
                                <span className="h-2 w-2 rounded-full bg-emerald-500" />
                                Data source: Google Sheets
                            </div>
                        </div>

                    </div>
                </section>

                {/* Footer */}
                <footer className="mt-10 border-t border-slate-200 py-6 text-center text-xs text-slate-400">
                    CAREERVERSE Administration System
                </footer>

            </main>
        </div>
    )
}
