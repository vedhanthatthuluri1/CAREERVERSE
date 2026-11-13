
import { useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { LockKeyhole, ShieldCheck, User, Eye, EyeOff } from 'lucide-react'
import { saveAdminAuthToken } from '../../services/storage/authStorage'

const API_URL =
    'https://script.google.com/macros/s/AKfycbwCzr6za1KI5i_dMywoeS4OgZsYtVI_y2AMdrork4lLgpitv5I0h1J9x6xkp7EOOgVT3A/exec'

export default function AdminLogin() {
    const navigate = useNavigate()

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        setError('')

        if (!username.trim() || !password) {
            setError('Please enter your username and password.')
            return
        }

        setLoading(true)

        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                body: JSON.stringify({
                    action: 'admin.login',
                    username: username.trim(),
                    password,
                }),
            })

            const result = await response.json()

            if (!result.success) {
                setError(result.message || 'Invalid admin credentials.')
                return
            }

            const token = result.token || result.data?.token

            if (!token) {
                setError('Login response did not contain an admin session token.')
                return
            }

            const sessionSaved = saveAdminAuthToken(token)

            if (!sessionSaved) {
                setError(
                    'Unable to create your admin session. Please enable browser session storage.'
                )
                return
            }

            navigate('/admin/dashboard')
        } catch (err) {
            console.error('Admin login error:', err)
            setError('Unable to connect to CAREERVERSE. Please try again.')
        } finally {
            setLoading(false)
        }
    }

    return (
        <main className="min-h-screen bg-slate-950 flex items-center justify-center px-5 py-12">
            <div className="w-full max-w-md">
                <div className="text-center mb-8">
                    <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-500/15 text-indigo-400">
                        <ShieldCheck size={34} />
                    </div>

                    <h1 className="text-3xl font-bold tracking-tight text-white">
                        CAREERVERSE
                    </h1>

                    <p className="mt-2 text-sm text-slate-400">
                        Administration Portal
                    </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-slate-900 p-7 shadow-2xl">
                    <div className="mb-7">
                        <h2 className="text-xl font-semibold text-white">
                            Admin Sign In
                        </h2>
                        <p className="mt-1 text-sm text-slate-400">
                            Sign in to manage the CAREERVERSE platform.
                        </p>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-5">
                        <div>
                            <label className="mb-2 block text-sm font-medium text-slate-300">
                                Admin Username
                            </label>

                            <div className="relative">
                                <User
                                    size={18}
                                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
                                />
                                <input
                                    type="text"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    placeholder="Enter admin username"
                                    autoComplete="username"
                                    className="w-full rounded-xl border border-white/10 bg-slate-950 py-3 pl-10 pr-4 text-white outline-none transition focus:border-indigo-500"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="mb-2 block text-sm font-medium text-slate-300">
                                Password
                            </label>

                            <div className="relative">
                                <LockKeyhole
                                    size={18}
                                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
                                />
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Enter admin password"
                                    autoComplete="current-password"
                                    className="w-full rounded-xl border border-white/10 bg-slate-950 py-3 pl-10 pr-12 text-white outline-none transition focus:border-indigo-500"
                                />

                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white"
                                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                                >
                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                        </div>

                        {error && (
                            <div
                                role="alert"
                                className="rounded-lg border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400"
                            >
                                {error}
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full rounded-xl bg-indigo-600 py-3 font-semibold text-white transition hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            {loading ? 'Authenticating...' : 'Sign In to Admin Portal'}
                        </button>
                    </form>

                    <p className="mt-6 text-center text-xs text-slate-500">
                        Restricted access · Authorized administrators only
                    </p>
                </div>

                <p className="mt-6 text-center text-xs text-slate-600">
                    CAREERVERSE · Administration System
                </p>
            </div>
        </main>
    )
}
