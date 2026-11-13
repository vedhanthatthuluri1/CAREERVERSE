import {
    GraduationCap,
    Clock,
    Calendar,
    Users,
    CheckCircle2,
    ArrowRight,
    ExternalLink,
    Sparkles,
    BookOpen,
    Target,
    ShieldCheck,
    AlertCircle,
    ArrowLeft,
} from 'lucide-react'
import { Link } from 'react-router-dom'

// Official Google Form URL for CAREERVERSE LIVE event registration
export const GOOGLE_FORM_URL = "https://docs.google.com/forms/d/e/1FAIpQLSemob2O8TLlmVptZJfogGQbva9fy3jEYszK5F2bH8YACsB75Q/viewform?usp=header";

export default function LiveRegistration() {
    return (
        <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
            {/* Top Navigation Bar */}
            <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/90 backdrop-blur-md">
                <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
                    <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-700 text-white shadow-sm">
                            <GraduationCap size={22} />
                        </div>
                        <div>
                            <div className="flex items-center gap-2">
                                <span className="text-lg font-bold tracking-tight text-blue-700">
                                    CAREERVERSE
                                </span>
                                <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2 py-0.5 text-xs font-semibold text-blue-700 border border-blue-200">
                                    <span className="h-1.5 w-1.5 rounded-full bg-blue-600 animate-pulse" />
                                    LIVE
                                </span>
                            </div>
                            <p className="text-xs text-slate-500">Career Development Programme</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <Link
                            to="/student/login"
                            className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-600 hover:text-blue-700 transition"
                        >
                            <ArrowLeft size={16} />
                            <span className="hidden sm:inline">Student Login</span>
                        </Link>
                        <a
                            href={GOOGLE_FORM_URL}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 rounded-lg bg-blue-700 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-800"
                        >
                            Register
                            <ExternalLink size={14} />
                        </a>
                    </div>
                </div>
            </header>

            {/* Hero Section */}
            <section className="relative overflow-hidden bg-gradient-to-b from-blue-900 via-blue-800 to-blue-700 px-6 py-20 text-white lg:py-24">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.1),transparent_60%)] pointer-events-none" />

                <div className="mx-auto max-w-4xl text-center relative z-10">
                    <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-blue-100 backdrop-blur-sm border border-white/20 mb-6">
                        <Sparkles size={14} className="text-amber-300" />
                        Exclusive Campus Interactive Event
                    </div>

                    <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl leading-tight">
                        CAREERVERSE <span className="text-sky-300">LIVE</span>
                    </h1>

                    <p className="mt-4 text-2xl font-semibold text-blue-100 sm:text-3xl">
                        Your Career. Your Future. Your Universe.
                    </p>

                    <p className="mx-auto mt-6 max-w-2xl text-base sm:text-lg leading-relaxed text-blue-100/90">
                        Join CAREERVERSE LIVE and take the next step in exploring your career opportunities.
                        An immersive, high-impact career development workshop engineered to give students
                        actionable technical roadmaps, domain clarity, and proof-of-work mastery.
                    </p>

                    {/* Prominent Primary Call To Action */}
                    <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
                        <a
                            href={GOOGLE_FORM_URL}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group inline-flex w-full sm:w-auto items-center justify-center gap-2.5 rounded-xl bg-white px-8 py-4 text-base font-bold text-blue-800 shadow-lg shadow-blue-950/20 transition hover:bg-blue-50 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-white/40"
                        >
                            REGISTER NOW
                            <ExternalLink size={18} className="transition group-hover:translate-x-0.5" />
                        </a>

                        <Link
                            to="/student/login"
                            className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl border border-white/25 bg-white/10 px-6 py-4 text-base font-semibold text-white backdrop-blur-sm transition hover:bg-white/20"
                        >
                            Existing Student Login
                            <ArrowRight size={16} />
                        </Link>
                    </div>

                    <p className="mt-4 flex items-center justify-center gap-1.5 text-xs text-blue-200">
                        <AlertCircle size={14} />
                        <span>Registrations are subject to session availability and venue capacity.</span>
                    </p>
                </div>
            </section>

            {/* Quick Overview Highlights */}
            <section className="mx-auto -mt-8 max-w-6xl px-6 relative z-20">
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-blue-700 mb-3">
                            <Target size={20} />
                        </div>
                        <h2 className="text-base font-bold text-slate-900">Domain Clarity</h2>
                        <p className="mt-1 text-xs text-slate-500 leading-relaxed">
                            Discover high-demand engineering specializations and real market demands.
                        </p>
                    </div>

                    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-blue-700 mb-3">
                            <BookOpen size={20} />
                        </div>
                        <h2 className="text-base font-bold text-slate-900">4-Year Strategy</h2>
                        <p className="mt-1 text-xs text-slate-500 leading-relaxed">
                            Structured semester-by-semester goals tailored to your graduation year.
                        </p>
                    </div>

                    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-blue-700 mb-3">
                            <ShieldCheck size={20} />
                        </div>
                        <h2 className="text-base font-bold text-slate-900">Proof of Work</h2>
                        <p className="mt-1 text-xs text-slate-500 leading-relaxed">
                            Learn how to build standout GitHub repositories, portfolios, and live demos.
                        </p>
                    </div>

                    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-blue-700 mb-3">
                            <Users size={20} />
                        </div>
                        <h2 className="text-base font-bold text-slate-900">Interactive Sync</h2>
                        <p className="mt-1 text-xs text-slate-500 leading-relaxed">
                            Participate in live session polls, knowledge benchmarks, and skill gap analyses.
                        </p>
                    </div>
                </div>
            </section>

            {/* Event Introduction */}
            <section className="mx-auto max-w-5xl px-6 py-16 lg:py-20">
                <div className="text-center">
                    <span className="text-xs font-bold uppercase tracking-widest text-blue-700">
                        About the Event
                    </span>
                    <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
                        A Purpose-Built Career Acceleration Experience
                    </h2>
                    <p className="mx-auto mt-4 max-w-3xl text-base text-slate-600 leading-relaxed">
                        CAREERVERSE LIVE is designed to bridge the gap between academic theory and high-growth
                        careers. Tailored into distinct sessions for first- and second-year students, the programme
                        delivers targeted insights at the exact stage of your undergraduate journey.
                    </p>
                </div>

                <div className="mt-12 rounded-2xl border border-slate-200 bg-white p-8 shadow-sm lg:p-10">
                    <div className="grid gap-8 md:grid-cols-3">
                        <div className="space-y-2">
                            <h3 className="text-lg font-bold text-slate-900">Structured Guidance</h3>
                            <p className="text-sm text-slate-600 leading-relaxed">
                                Cut through conflicting internet advice with an authoritative, university-backed
                                roadmap designed by educators and senior technologists.
                            </p>
                        </div>
                        <div className="space-y-2">
                            <h3 className="text-lg font-bold text-slate-900">Actionable Exercises</h3>
                            <p className="text-sm text-slate-600 leading-relaxed">
                                Experience guided self-assessments that pinpoint your current strengths and
                                outline concrete 30-day technical milestones.
                            </p>
                        </div>
                        <div className="space-y-2">
                            <h3 className="text-lg font-bold text-slate-900">Exclusive Event Access</h3>
                            <p className="text-sm text-slate-600 leading-relaxed">
                                Attendees gain priority access to the interactive CAREERVERSE student portal,
                                curriculum modules, and assessment scorecards.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Session Schedule Cards: First-Year & Second-Year */}
            <section className="bg-slate-100/80 border-y border-slate-200 px-6 py-16 lg:py-20">
                <div className="mx-auto max-w-5xl">
                    <div className="text-center mb-12">
                        <span className="text-xs font-bold uppercase tracking-widest text-blue-700">
                            Session Schedule
                        </span>
                        <h2 className="mt-2 text-3xl font-extrabold text-slate-900 sm:text-4xl">
                            Tailored Cohort Sessions
                        </h2>
                        <p className="mt-3 text-sm text-slate-600">
                            Please select the session corresponding to your current academic year.
                        </p>
                    </div>

                    <div className="grid gap-8 lg:grid-cols-2">
                        {/* First-Year Morning Session */}
                        <div className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-8 shadow-sm transition hover:shadow-md">
                            <div>
                                <div className="flex items-center justify-between gap-3 mb-4">
                                    <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-700 border border-blue-200">
                                        <Calendar size={13} />
                                        Morning Session
                                    </span>
                                    <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                                        Cohort: Year 1
                                    </span>
                                </div>

                                <h3 className="text-2xl font-bold text-slate-900">
                                    First-Year Morning Session
                                </h3>
                                <p className="text-sm font-semibold text-blue-700 mt-1">
                                    Foundations & 4-Year Roadmapping
                                </p>

                                <div className="mt-5 space-y-2.5 rounded-xl bg-slate-50 p-4 text-xs text-slate-600 border border-slate-200/60">
                                    <div className="flex items-center gap-2">
                                        <Clock size={15} className="text-blue-700 shrink-0" />
                                        <span className="font-semibold text-slate-800">Timing:</span>
                                        <span>Morning Session (09:30 AM â€“ 12:30 PM)</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Users size={15} className="text-blue-700 shrink-0" />
                                        <span className="font-semibold text-slate-800">Target Audience:</span>
                                        <span>All 1st-Year Engineering & Technology Students</span>
                                    </div>
                                </div>

                                <div className="mt-6 space-y-3">
                                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                                        Session Focus & Topics:
                                    </h4>
                                    <ul className="space-y-2.5 text-sm text-slate-700">
                                        <li className="flex items-start gap-2.5">
                                            <CheckCircle2 size={16} className="text-blue-600 mt-0.5 shrink-0" />
                                            <span>Building solid programming fundamentals & logical thinking</span>
                                        </li>
                                        <li className="flex items-start gap-2.5">
                                            <CheckCircle2 size={16} className="text-blue-600 mt-0.5 shrink-0" />
                                            <span>Understanding Git, GitHub, and professional developer tools</span>
                                        </li>
                                        <li className="flex items-start gap-2.5">
                                            <CheckCircle2 size={16} className="text-blue-600 mt-0.5 shrink-0" />
                                            <span>The 8 critical mistakes students make in their first two semesters</span>
                                        </li>
                                        <li className="flex items-start gap-2.5">
                                            <CheckCircle2 size={16} className="text-blue-600 mt-0.5 shrink-0" />
                                            <span>Starting your first beginner-level practical projects</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>

                            <div className="mt-8 pt-6 border-t border-slate-100">
                                <a
                                    href={GOOGLE_FORM_URL}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-blue-700 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-800"
                                >
                                    Register for Morning Session
                                    <ExternalLink size={15} />
                                </a>
                            </div>
                        </div>

                        {/* Second-Year Afternoon Session */}
                        <div className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-8 shadow-sm transition hover:shadow-md">
                            <div>
                                <div className="flex items-center justify-between gap-3 mb-4">
                                    <span className="inline-flex items-center gap-1.5 rounded-full bg-indigo-50 px-3 py-1 text-xs font-bold text-indigo-700 border border-indigo-200">
                                        <Calendar size={13} />
                                        Afternoon Session
                                    </span>
                                    <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                                        Cohort: Year 2
                                    </span>
                                </div>

                                <h3 className="text-2xl font-bold text-slate-900">
                                    Second-Year Afternoon Session
                                </h3>
                                <p className="text-sm font-semibold text-blue-700 mt-1">
                                    Specialization, Skills Mastery & Proof of Work
                                </p>

                                <div className="mt-5 space-y-2.5 rounded-xl bg-slate-50 p-4 text-xs text-slate-600 border border-slate-200/60">
                                    <div className="flex items-center gap-2">
                                        <Clock size={15} className="text-blue-700 shrink-0" />
                                        <span className="font-semibold text-slate-800">Timing:</span>
                                        <span>Afternoon Session (01:30 PM â€“ 04:30 PM)</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Users size={15} className="text-blue-700 shrink-0" />
                                        <span className="font-semibold text-slate-800">Target Audience:</span>
                                        <span>All 2nd-Year Engineering & Technology Students</span>
                                    </div>
                                </div>

                                <div className="mt-6 space-y-3">
                                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                                        Session Focus & Topics:
                                    </h4>
                                    <ul className="space-y-2.5 text-sm text-slate-700">
                                        <li className="flex items-start gap-2.5">
                                            <CheckCircle2 size={16} className="text-blue-600 mt-0.5 shrink-0" />
                                            <span>Selecting your primary technical domain and technology stack</span>
                                        </li>
                                        <li className="flex items-start gap-2.5">
                                            <CheckCircle2 size={16} className="text-blue-600 mt-0.5 shrink-0" />
                                            <span>Data structures, problem-solving habits, and DSA progression</span>
                                        </li>
                                        <li className="flex items-start gap-2.5">
                                            <CheckCircle2 size={16} className="text-blue-600 mt-0.5 shrink-0" />
                                            <span>Building full-stack, AI, or core engineering portfolio projects</span>
                                        </li>
                                        <li className="flex items-start gap-2.5">
                                            <CheckCircle2 size={16} className="text-blue-600 mt-0.5 shrink-0" />
                                            <span>Hackathons, open-source contributions, and internship preparedness</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>

                            <div className="mt-8 pt-6 border-t border-slate-100">
                                <a
                                    href={GOOGLE_FORM_URL}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-blue-700 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-800"
                                >
                                    Register for Afternoon Session
                                    <ExternalLink size={15} />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Registration Instructions Section */}
            <section className="mx-auto max-w-4xl px-6 py-16 lg:py-20">
                <div className="text-center mb-10">
                    <span className="text-xs font-bold uppercase tracking-widest text-blue-700">
                        How to Join
                    </span>
                    <h2 className="mt-2 text-3xl font-extrabold text-slate-900 sm:text-4xl">
                        Registration Instructions
                    </h2>
                    <p className="mt-3 text-sm text-slate-600">
                        Follow these simple steps to secure your seat for CAREERVERSE LIVE.
                    </p>
                </div>

                <div className="space-y-4">
                    <div className="flex gap-4 rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-100 font-bold text-blue-800 text-sm">
                            1
                        </span>
                        <div>
                            <h3 className="font-bold text-slate-900 text-base">Click "REGISTER NOW"</h3>
                            <p className="mt-1 text-sm text-slate-600">
                                Open the official university registration form by clicking any of the register buttons on this page.
                            </p>
                        </div>
                    </div>

                    <div className="flex gap-4 rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-100 font-bold text-blue-800 text-sm">
                            2
                        </span>
                        <div>
                            <h3 className="font-bold text-slate-900 text-base">Fill in Your Academic Details</h3>
                            <p className="mt-1 text-sm text-slate-600">
                                Provide your Full Name, University Registration Number, Department, Year of Study, and active email address.
                            </p>
                        </div>
                    </div>

                    <div className="flex gap-4 rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-100 font-bold text-blue-800 text-sm">
                            3
                        </span>
                        <div>
                            <h3 className="font-bold text-slate-900 text-base">Select Your Cohort Session</h3>
                            <p className="mt-1 text-sm text-slate-600">
                                Choose either the First-Year Morning Session or Second-Year Afternoon Session based on your current year of study.
                            </p>
                        </div>
                    </div>

                    <div className="flex gap-4 rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-100 font-bold text-blue-800 text-sm">
                            4
                        </span>
                        <div>
                            <h3 className="font-bold text-slate-900 text-base">Bring Your Device to the Event</h3>
                            <p className="mt-1 text-sm text-slate-600">
                                Please bring a charged smartphone or laptop to participate in real-time session polls and live skills benchmarks.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Bottom Call to Action Banner */}
            <section className="bg-blue-700 px-6 py-16 text-white text-center">
                <div className="mx-auto max-w-3xl">
                    <h2 className="text-3xl font-extrabold sm:text-4xl">
                        Ready to Accelerate Your Career?
                    </h2>
                    <p className="mx-auto mt-4 max-w-xl text-base text-blue-100 leading-relaxed">
                        Seats are limited per session to ensure every participant receives interactive guidance.
                        Register today to confirm your participation.
                    </p>

                    <div className="mt-8 flex flex-col items-center justify-center gap-3">
                        <a
                            href={GOOGLE_FORM_URL}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 rounded-xl bg-white px-8 py-4 text-base font-bold text-blue-700 shadow-md transition hover:bg-blue-50 hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-white/40"
                        >
                            REGISTER NOW
                            <ExternalLink size={18} />
                        </a>

                        <p className="mt-3 text-xs text-blue-200">
                            * Registrations are subject to session availability and venue capacity.
                        </p>
                    </div>
                </div>
            </section>

            {/* Footer with CAREERVERSE Branding */}
            <footer className="border-t border-slate-200 bg-white py-10 px-6 text-center text-sm text-slate-500">
                <div className="mx-auto max-w-6xl flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-2">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-700 text-white">
                            <GraduationCap size={18} />
                        </div>
                        <span className="font-bold text-slate-900">CAREERVERSE LIVE</span>
                    </div>

                    <p className="text-xs text-slate-400">
                        Â© 2026 CAREERVERSE Â· Career Development Programme. All rights reserved.
                    </p>

                    <div className="flex items-center gap-4 text-xs font-medium">
                        <Link to="/student/login" className="hover:text-blue-700 transition">
                            Student Login
                        </Link>
                        <Link to="/student/dashboard" className="hover:text-blue-700 transition">
                            Student Portal
                        </Link>
                    </div>
                </div>
            </footer>
        </div>
    )
}
