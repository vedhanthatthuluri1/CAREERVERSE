
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
    ArrowLeft,
    GraduationCap,
    LockKeyhole,
    Hash,
    LoaderCircle,
} from 'lucide-react'

import { saveStudent } from '../../services/storage/studentStorage'
import { saveStudentAuthSession } from '../../services/storage/authStorage'

const EVENT_ACCESS_CODE = 'CVTUB101'

const CAREERVERSE_API_URL =
    'https://script.google.com/macros/s/AKfycbwCzr6za1KI5i_dMywoeS4OgZsYtVI_y2AMdrork4lLgpitv5I0h1J9x6xkp7EOOgVT3A/exec'

type StudentLoginResponse = {
    success: boolean
    message?: string
    data?: {
        student: {
            studentId: string
            studentName: string
            registrationNumber: string
        }
        token: string
        expiresIn: number
    }
}

export default function StudentLogin() {
    const navigate = useNavigate()

    const [studentName, setStudentName] = useState('')
    const [serialNumber, setSerialNumber] = useState('')
    const [accessCode, setAccessCode] = useState('')
    const [error, setError] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    async function handleLogin(
        event: React.FormEvent<HTMLFormElement>
    ) {
        event.preventDefault()
        setError('')

        if (
            !studentName.trim() ||
            !serialNumber.trim() ||
            !accessCode.trim()
        ) {
            setError('Please complete all fields.')
            return
        }

        if (
            accessCode.trim().toUpperCase() !== EVENT_ACCESS_CODE
        ) {
            setError(
                'Invalid event access code. Please check and try again.'
            )
            return
        }

        if (!/^\d{1,3}$/.test(serialNumber.trim())) {
            setError(
                'Enter a valid student serial number (for example, 01).'
            )
            return
        }

        const serial = Number(serialNumber)

        if (serial < 1 || serial > 999) {
            setError(
                'Student serial number must be between 1 and 999.'
            )
            return
        }

        setIsLoading(true)

        try {
            const response = await fetch(CAREERVERSE_API_URL, {
                method: 'POST',
                body: JSON.stringify({
                    action: 'student.login',
                    studentName: studentName.trim(),
                    serialNumber: String(serial),
                    eventCode: accessCode.trim().toUpperCase(),
                }),
            })

            const result =
                (await response.json()) as StudentLoginResponse

            if (!response.ok || !result.success || !result.data) {
                throw new Error(
                    result.message ||
                    'Student login failed. Please try again.'
                )
            }

            const { student, token } = result.data

            if (!student?.studentId || !token) {
                throw new Error(
                    'The server returned incomplete student login details.'
                )
            }

            const studentSaved = saveStudent({
                studentName: student.studentName,
                registrationNumber: student.registrationNumber,
            })

            if (!studentSaved) {
                throw new Error(
                    'Unable to save your student details in this browser.'
                )
            }

            const sessionSaved = saveStudentAuthSession({
                token,
                studentId: student.studentId,
            })

            if (!sessionSaved) {
                throw new Error(
                    'Unable to create your student session. Please enable browser session storage.'
                )
            }

            navigate('/student/dashboard', {
                replace: true,
            })

        } catch (err) {
            console.error('CAREERVERSE student login error:', err)

            if (
                err instanceof TypeError &&
                err.message.toLowerCase().includes('fetch')
            ) {
                setError(
                    'Unable to connect to CAREERVERSE. Check your internet connection and try again.'
                )
            } else {
                setError(
                    err instanceof Error
                        ? err.message
                        : 'Something went wrong. Please try again.'
                )
            }

        } finally {
            setIsLoading(false)
        }
    }

    return (
        <main className="flex min-h-screen items-center justify-center bg-slate-50 px-5 py-12">
            <div className="w-full max-w-md">
                <Link
                    to="/"
                    className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-blue-700"
                >
                    <ArrowLeft size={16} />
                    Back to Home
                </Link>

                <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
                    <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-blue-50 text-blue-700">
                        <GraduationCap size={30} />
                    </div>

                    <h1 className="text-3xl font-bold text-slate-900">
                        Student Login
                    </h1>

                    <p className="mt-2 text-sm leading-6 text-slate-500">
                        Enter your student details and batch access code
                        to access CAREERVERSE.
                    </p>

                    <form
                        onSubmit={handleLogin}
                        className="mt-8 space-y-5"
                    >
                        <div>
                            <label className="mb-2 block text-sm font-medium text-slate-700">
                                Student Name
                            </label>

                            <input
                                value={studentName}
                                onChange={(event) =>
                                    setStudentName(event.target.value)
                                }
                                placeholder="Enter your full name"
                                autoComplete="name"
                                disabled={isLoading}
                                required
                                className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 disabled:bg-slate-100"
                            />
                        </div>

                        <div>
                            <label className="mb-2 block text-sm font-medium text-slate-700">
                                Student Serial Number
                            </label>

                            <div className="relative">
                                <Hash
                                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                                    size={18}
                                />

                                <input
                                    value={serialNumber}
                                    onChange={(event) =>
                                        setSerialNumber(
                                            event.target.value
                                                .replace(/\D/g, '')
                                                .slice(0, 3)
                                        )
                                    }
                                    placeholder="Example: 01"
                                    inputMode="numeric"
                                    disabled={isLoading}
                                    required
                                    className="w-full rounded-lg border border-slate-300 py-3 pl-11 pr-4 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 disabled:bg-slate-100"
                                />
                            </div>

                            <p className="mt-1 text-xs text-slate-400">
                                Enter the serial number assigned to you.
                            </p>
                        </div>

                        <div>
                            <label className="mb-2 block text-sm font-medium text-slate-700">
                                Event Access Code
                            </label>

                            <div className="relative">
                                <LockKeyhole
                                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                                    size={18}
                                />

                                <input
                                    value={accessCode}
                                    onChange={(event) =>
                                        setAccessCode(event.target.value)
                                    }
                                    placeholder="Enter event access code"
                                    autoCapitalize="characters"
                                    disabled={isLoading}
                                    required
                                    className="w-full rounded-lg border border-slate-300 py-3 pl-11 pr-4 uppercase outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 disabled:bg-slate-100"
                                />
                            </div>
                        </div>

                        {error && (
                            <p
                                role="alert"
                                className="rounded-lg bg-red-50 p-3 text-sm text-red-600"
                            >
                                {error}
                            </p>
                        )}

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="flex w-full items-center justify-center gap-2 rounded-lg bg-blue-700 px-4 py-3 font-semibold text-white transition hover:bg-blue-800 disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            {isLoading ? (
                                <>
                                    <LoaderCircle
                                        size={18}
                                        className="animate-spin"
                                    />
                                    Connecting to CAREERVERSE...
                                </>
                            ) : (
                                'Continue to CAREERVERSE'
                            )}
                        </button>
                    </form>

                    <p className="mt-6 text-center text-xs text-slate-400">
                        CAREERVERSE · Career Development Programme
                    </p>
                </div>
            </div>
        </main>
    )
}
