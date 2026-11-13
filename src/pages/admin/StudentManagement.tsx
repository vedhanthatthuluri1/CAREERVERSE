
import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
    ArrowLeft,
    Search,
    RefreshCw,
    Users,
    Mail,
    Phone,
    BookOpen,
    ClipboardList,
    AlertCircle,
    GraduationCap,
    ChevronRight,
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
    completedChapters: number
    assessmentCount: number
}

export default function StudentManagement() {
    const navigate = useNavigate()

    const [students, setStudents] = useState<Student[]>([])
    const [search, setSearch] = useState('')
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    async function loadStudents() {
        const token = getAdminAuthToken()

        if (!token) {
            navigate('/admin/login', { replace: true })
            return
        }

        setLoading(true)
        setError('')

        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                body: JSON.stringify({
                    action: 'admin.students',
                    token,
                }),
            })

            const result = await response.json()

            if (!response.ok || result.success === false) {
                const message = result.message || 'Unable to load students.'

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
            setStudents(Array.isArray(data) ? data : [])
        } catch (err) {
            setError(
                err instanceof Error
                    ? err.message
                    : 'Something went wrong while loading students.'
            )
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        void loadStudents()
    }, [])

    const filteredStudents = useMemo(() => {
        const query = search.trim().toLowerCase()

        if (!query) return students

        return students.filter((student) =>
            [
                student.studentId,
                student.studentName,
                student.email,
                student.phone,
                student.registrationNumber,
                student.eventCode,
                student.status,
            ].some((value) =>
                String(value ?? '').toLowerCase().includes(query)
            )
        )
    }, [students, search])

    return (
        <div className="min-h-screen bg-slate-950 text-white">
            <div className="mx-auto max-w-7xl px-5 py-8 sm:px-8">

                <button
                    onClick={() => navigate('/admin/dashboard')}
                    className="mb-7 inline-flex items-center gap-2 text-sm text-slate-400 transition hover:text-white"
                >
                    <ArrowLeft size={17} />
                    Back to Dashboard
                </button>

                <div className="mb-8 flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
                    <div>
                        <div className="mb-2 flex items-center gap-2 text-sm font-semibold tracking-widest text-indigo-400">
                            <GraduationCap size={18} />
                            CAREERVERSE ADMIN
                        </div>

                        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                            Student Management
                        </h1>

                        <p className="mt-2 text-sm text-slate-400">
                            View and monitor registered student accounts.
                        </p>
                    </div>

                    <button
                        onClick={() => void loadStudents()}
                        disabled={loading}
                        className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-700 bg-slate-900 px-5 py-3 text-sm font-semibold transition hover:bg-slate-800 disabled:opacity-50"
                    >
                        <RefreshCw
                            size={16}
                            className={loading ? 'animate-spin' : ''}
                        />
                        Refresh Students
                    </button>
                </div>

                <div className="mb-7 grid gap-4 sm:grid-cols-2">
                    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
                        <div className="flex items-center justify-between">
                            <p className="text-sm text-slate-400">Total Students</p>
                            <Users className="text-indigo-400" size={21} />
                        </div>
                        <p className="mt-3 text-3xl font-bold">{students.length}</p>
                        <p className="mt-1 text-xs text-slate-500">
                            Registered student accounts
                        </p>
                    </div>

                    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
                        <div className="flex items-center justify-between">
                            <p className="text-sm text-slate-400">Search Results</p>
                            <Search className="text-cyan-400" size={21} />
                        </div>
                        <p className="mt-3 text-3xl font-bold">
                            {filteredStudents.length}
                        </p>
                        <p className="mt-1 text-xs text-slate-500">
                            Students matching your search
                        </p>
                    </div>
                </div>

                <div className="mb-5">
                    <div className="relative">
                        <Search
                            size={19}
                            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
                        />
                        <input
                            value={search}
                            onChange={(event) => setSearch(event.target.value)}
                            placeholder="Search by name, student ID, email, phone..."
                            className="w-full rounded-xl border border-slate-800 bg-slate-900 py-4 pl-12 pr-4 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-indigo-500"
                        />
                    </div>
                </div>

                {error && (
                    <div className="mb-6 flex items-start gap-3 rounded-xl border border-red-900/50 bg-red-950/30 p-4 text-sm text-red-300">
                        <AlertCircle size={19} className="mt-0.5 shrink-0" />
                        <div>
                            <p className="font-semibold">Unable to load students</p>
                            <p className="mt-1">{error}</p>
                        </div>
                    </div>
                )}

                <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900">
                    <div className="border-b border-slate-800 px-5 py-5">
                        <h2 className="font-semibold">Registered Students</h2>
                        <p className="mt-1 text-xs text-slate-500">
                            Select a student to view their complete learning profile.
                        </p>
                    </div>

                    {loading ? (
                        <div className="flex items-center justify-center gap-3 py-16 text-sm text-slate-400">
                            <RefreshCw size={18} className="animate-spin" />
                            Loading student records...
                        </div>
                    ) : filteredStudents.length === 0 ? (
                        <div className="py-16 text-center">
                            <Users size={35} className="mx-auto text-slate-600" />
                            <p className="mt-4 font-semibold">No students found</p>
                            <p className="mt-2 text-sm text-slate-500">
                                Try another search or refresh the student records.
                            </p>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full min-w-[1000px] text-left text-sm">
                                <thead className="bg-slate-950/70 text-xs uppercase tracking-wider text-slate-500">
                                    <tr>
                                        <th className="px-5 py-4">Student</th>
                                        <th className="px-5 py-4">Contact</th>
                                        <th className="px-5 py-4">Registration No.</th>
                                        <th className="px-5 py-4">Event Code</th>
                                        <th className="px-5 py-4">Chapters</th>
                                        <th className="px-5 py-4">Assessments</th>
                                        <th className="px-5 py-4">Status</th>
                                        <th className="px-5 py-4">Profile</th>
                                    </tr>
                                </thead>

                                <tbody className="divide-y divide-slate-800">
                                    {filteredStudents.map((student) => (
                                        <tr
                                            key={student.studentId}
                                            onClick={() =>
                                                navigate(
                                                    `/admin/students/${encodeURIComponent(student.studentId)}`
                                                )
                                            }
                                            className="cursor-pointer transition hover:bg-indigo-500/10"
                                            title="View student profile"
                                        >
                                            <td className="px-5 py-5">
                                                <p className="font-semibold text-white">
                                                    {student.studentName || 'Unnamed Student'}
                                                </p>
                                                <p className="mt-1 text-xs text-slate-500">
                                                    {student.studentId}
                                                </p>
                                            </td>

                                            <td className="px-5 py-5">
                                                <div className="flex items-center gap-2 text-slate-300">
                                                    <Mail size={14} className="text-slate-500" />
                                                    {student.email || '—'}
                                                </div>
                                                <div className="mt-2 flex items-center gap-2 text-xs text-slate-400">
                                                    <Phone size={13} className="text-slate-500" />
                                                    {student.phone || '—'}
                                                </div>
                                            </td>

                                            <td className="px-5 py-5 text-slate-300">
                                                {student.registrationNumber || '—'}
                                            </td>

                                            <td className="px-5 py-5 text-slate-300">
                                                {student.eventCode || '—'}
                                            </td>

                                            <td className="px-5 py-5">
                                                <span className="inline-flex items-center gap-2 text-slate-300">
                                                    <BookOpen size={15} className="text-indigo-400" />
                                                    {student.completedChapters ?? 0}
                                                </span>
                                            </td>

                                            <td className="px-5 py-5">
                                                <span className="inline-flex items-center gap-2 text-slate-300">
                                                    <ClipboardList size={15} className="text-cyan-400" />
                                                    {student.assessmentCount ?? 0}
                                                </span>
                                            </td>

                                            <td className="px-5 py-5">
                                                <span className="rounded-full border border-slate-700 bg-slate-800 px-3 py-1 text-xs font-medium text-slate-300">
                                                    {student.status || 'Unknown'}
                                                </span>
                                            </td>

                                            <td className="px-5 py-5">
                                                <span className="inline-flex items-center gap-2 font-medium text-indigo-400">
                                                    View
                                                    <ChevronRight size={16} />
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>

                <p className="mt-5 text-xs text-slate-600">
                    Data source: CAREERVERSE Google Sheets database
                </p>
            </div>
        </div>
    )
}
