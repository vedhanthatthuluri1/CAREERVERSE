
import { Link } from 'react-router-dom'
import {
    ArrowLeft,
    ArrowRight,
    GraduationCap,
    ShieldCheck,
    Users,
} from 'lucide-react'

export default function PortalSelection() {
    return (
        <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-950 px-5 py-16">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(37,99,235,0.30),transparent_35%),radial-gradient(circle_at_85%_80%,rgba(14,165,233,0.16),transparent_35%)]" />

            <div className="relative z-10 w-full max-w-5xl">
                <Link
                    to="/"
                    className="mb-12 inline-flex items-center gap-2 text-sm font-semibold text-slate-300 transition hover:text-white"
                >
                    <ArrowLeft size={17} />
                    Back to Welcome Page
                </Link>

                <div className="text-center">
                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-xl shadow-blue-600/30">
                        <GraduationCap size={34} />
                    </div>

                    <p className="mt-7 text-xs font-bold uppercase tracking-[0.25em] text-blue-300">
                        CAREERVERSE
                    </p>

                    <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-white sm:text-5xl">
                        Choose Your Portal
                    </h1>

                    <p className="mx-auto mt-5 max-w-xl text-base leading-8 text-slate-300">
                        Welcome to CAREERVERSE. Select the portal that
                        corresponds to your role to continue.
                    </p>
                </div>

                <div className="mt-14 grid gap-7 md:grid-cols-2">
                    {/* Admin Portal */}
                    <article className="group rounded-3xl border border-white/10 bg-white/[0.06] p-8 backdrop-blur-xl transition hover:-translate-y-1 hover:border-blue-400/50 hover:bg-white/[0.09] sm:p-10">
                        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-500/15 text-blue-300">
                            <ShieldCheck size={34} />
                        </div>

                        <p className="mt-8 text-xs font-bold uppercase tracking-[0.2em] text-blue-300">
                            Management Access
                        </p>

                        <h2 className="mt-3 text-2xl font-extrabold text-white">
                            Admin Portal
                        </h2>

                        <p className="mt-4 min-h-20 text-sm leading-7 text-slate-300">
                            A dedicated access point for authorised
                            administrators to manage the CAREERVERSE
                            platform and its activities.
                        </p>

                        <Link
                            to="/admin/login"
                            className="mt-8 inline-flex w-full items-center justify-center gap-3 rounded-xl bg-blue-600 px-6 py-4 text-sm font-bold text-white transition hover:bg-blue-500"
                        >
                            Continue as Admin
                            <ArrowRight size={18} />
                        </Link>
                    </article>

                    {/* Student Portal */}
                    <article className="group rounded-3xl border border-white/10 bg-white/[0.06] p-8 backdrop-blur-xl transition hover:-translate-y-1 hover:border-emerald-400/50 hover:bg-white/[0.09] sm:p-10">
                        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-500/15 text-emerald-300">
                            <GraduationCap size={34} />
                        </div>

                        <p className="mt-8 text-xs font-bold uppercase tracking-[0.2em] text-emerald-300">
                            Learning Access
                        </p>

                        <h2 className="mt-3 text-2xl font-extrabold text-white">
                            Student Portal
                        </h2>

                        <p className="mt-4 min-h-20 text-sm leading-7 text-slate-300">
                            Access your learning chapters, complete activities,
                            participate in assessments and follow your
                            career development journey.
                        </p>

                        <Link
                            to="/student/login"
                            className="mt-8 inline-flex w-full items-center justify-center gap-3 rounded-xl bg-emerald-600 px-6 py-4 text-sm font-bold text-white transition hover:bg-emerald-500"
                        >
                            Continue as Student
                            <ArrowRight size={18} />
                        </Link>
                    </article>
                </div>

                <div className="mt-12 flex items-center justify-center gap-2 text-xs text-slate-500">
                    <Users size={15} />
                    CAREERVERSE · Takshashila University
                </div>
            </div>
        </main>
    )
}
