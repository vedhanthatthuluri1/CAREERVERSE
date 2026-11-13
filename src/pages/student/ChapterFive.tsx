
import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import {
    ArrowLeft,
    ArrowUpRight,
    BookOpen,
    CheckCircle2,
    Code2,
    ExternalLink,
    GraduationCap,
    Search,
    Target,
    Trophy,
} from 'lucide-react'

import {
    getChapterFiveVisited,
    saveChapterFiveVisited,
    getChapterFiveSelected,
    saveChapterFiveSelected,
    getChapterFiveReflection,
    saveChapterFiveReflection,
    isChapterCompleted,
    setChapterCompleted,
} from '../../services/storage/progressStorage'

import { getStudentAuthSession } from '../../services/storage/authStorage'

const CAREERVERSE_API_URL =
    'https://script.google.com/macros/s/AKfycbwCzr6za1KI5i_dMywoeS4OgZsYtVI_y2AMdrork4lLgpitv5I0h1J9x6xkp7EOOgVT3A/exec'

type Platform = {
    name: string
    url: string
    category: string
    description: string
    purpose: string
    logo: string
    initials: string
}

const platforms: Platform[] = [
    {
        name: 'GitHub',
        url: 'https://github.com/',
        category: 'Portfolio & Development',
        description: 'Host code, manage repositories and collaborate on projects.',
        purpose: 'Build your developer portfolio.',
        logo: 'github',
        initials: 'GH',
    },
    {
        name: 'GitLab',
        url: 'https://gitlab.com/',
        category: 'Portfolio & Development',
        description: 'Manage source code, CI/CD pipelines and collaborative projects.',
        purpose: 'Explore professional development workflows.',
        logo: 'gitlab',
        initials: 'GL',
    },
    {
        name: 'LeetCode',
        url: 'https://leetcode.com/',
        category: 'Coding & Problem Solving',
        description: 'Practise data structures, algorithms and coding problems.',
        purpose: 'Prepare for technical coding assessments.',
        logo: 'leetcode',
        initials: 'LC',
    },
    {
        name: 'Codeforces',
        url: 'https://codeforces.com/',
        category: 'Coding & Problem Solving',
        description: 'Participate in competitive programming contests.',
        purpose: 'Improve algorithmic thinking.',
        logo: 'codeforces',
        initials: 'CF',
    },
    {
        name: 'CodeChef',
        url: 'https://www.codechef.com/',
        category: 'Coding & Problem Solving',
        description: 'Practise programming and participate in coding contests.',
        purpose: 'Build problem-solving consistency.',
        logo: 'codechef',
        initials: 'CC',
    },
    {
        name: 'HackerRank',
        url: 'https://www.hackerrank.com/',
        category: 'Coding & Problem Solving',
        description: 'Practise programming, SQL and technical skills.',
        purpose: 'Prepare for skill assessments.',
        logo: 'hackerrank',
        initials: 'HR',
    },
    {
        name: 'Kaggle',
        url: 'https://www.kaggle.com/',
        category: 'Data & Artificial Intelligence',
        description: 'Explore datasets, notebooks and machine learning competitions.',
        purpose: 'Build data science and ML projects.',
        logo: 'kaggle',
        initials: 'KG',
    },
    {
        name: 'Hugging Face',
        url: 'https://huggingface.co/',
        category: 'Data & Artificial Intelligence',
        description: 'Discover AI models, datasets and machine learning applications.',
        purpose: 'Experiment with modern AI models.',
        logo: 'huggingface',
        initials: 'HF',
    },
    {
        name: 'Google Colab',
        url: 'https://colab.research.google.com/',
        category: 'Data & Artificial Intelligence',
        description: 'Write and execute Python notebooks in the browser.',
        purpose: 'Experiment with Python and machine learning.',
        logo: 'googlecolab',
        initials: 'GC',
    },
    {
        name: 'TryHackMe',
        url: 'https://tryhackme.com/',
        category: 'Cybersecurity',
        description: 'Learn cybersecurity concepts through guided learning rooms.',
        purpose: 'Develop cybersecurity fundamentals.',
        logo: 'tryhackme',
        initials: 'TH',
    },
    {
        name: 'Hack The Box',
        url: 'https://www.hackthebox.com/',
        category: 'Cybersecurity',
        description: 'Explore structured cybersecurity learning and practice labs.',
        purpose: 'Develop security and defensive skills.',
        logo: 'hackthebox',
        initials: 'HTB',
    },
    {
        name: 'freeCodeCamp',
        url: 'https://www.freecodecamp.org/',
        category: 'Learning & Documentation',
        description: 'Learn web development, programming and related technologies.',
        purpose: 'Follow structured, hands-on learning paths.',
        logo: 'freecodecamp',
        initials: 'FC',
    },
    {
        name: 'The Odin Project',
        url: 'https://www.theodinproject.com/',
        category: 'Learning & Documentation',
        description: 'Follow a project-based full-stack web development curriculum.',
        purpose: 'Learn full-stack development.',
        logo: 'theodinproject',
        initials: 'OP',
    },
    {
        name: 'NPTEL',
        url: 'https://nptel.ac.in/',
        category: 'Learning & Documentation',
        description: 'Access courses from Indian institutes and academic experts.',
        purpose: 'Strengthen engineering fundamentals.',
        logo: 'nptel',
        initials: 'NP',
    },
    {
        name: 'CS50',
        url: 'https://cs50.harvard.edu/',
        category: 'Learning & Documentation',
        description: 'Explore computer science courses and programming fundamentals.',
        purpose: 'Build a strong computer science foundation.',
        logo: 'edx',
        initials: 'CS',
    },
    {
        name: 'MDN Web Docs',
        url: 'https://developer.mozilla.org/',
        category: 'Learning & Documentation',
        description: 'Read trusted documentation for web technologies.',
        purpose: 'Learn HTML, CSS, JavaScript and web APIs.',
        logo: 'mdnwebdocs',
        initials: 'MDN',
    },
    {
        name: 'Unstop',
        url: 'https://unstop.com/',
        category: 'Hackathons & Opportunities',
        description: 'Discover competitions, challenges, internships and events.',
        purpose: 'Find opportunities to demonstrate your skills.',
        logo: 'unstop',
        initials: 'UN',
    },
    {
        name: 'Devfolio',
        url: 'https://devfolio.co/',
        category: 'Hackathons & Opportunities',
        description: 'Discover hackathons and build projects with other participants.',
        purpose: 'Gain practical project experience.',
        logo: 'devfolio',
        initials: 'DF',
    },
    {
        name: 'Major League Hacking',
        url: 'https://mlh.io/',
        category: 'Hackathons & Opportunities',
        description: 'Explore student hackathons and developer community events.',
        purpose: 'Participate in collaborative building events.',
        logo: 'mlh',
        initials: 'MLH',
    },
    {
        name: 'LinkedIn',
        url: 'https://www.linkedin.com/',
        category: 'Professional Community',
        description: 'Build a professional profile and connect with the industry.',
        purpose: 'Develop professional visibility.',
        logo: 'linkedin',
        initials: 'in',
    },
    {
        name: 'Stack Overflow',
        url: 'https://stackoverflow.com/',
        category: 'Professional Community',
        description: 'Ask technical questions and learn from developer discussions.',
        purpose: 'Improve technical troubleshooting.',
        logo: 'stackoverflow',
        initials: 'SO',
    },
    {
        name: 'DEV Community',
        url: 'https://dev.to/',
        category: 'Professional Community',
        description: 'Read and share articles about software development.',
        purpose: 'Learn from the developer community.',
        logo: 'devdotto',
        initials: 'DEV',
    },
]

const categories = [
    'All Platforms',
    'Portfolio & Development',
    'Coding & Problem Solving',
    'Data & Artificial Intelligence',
    'Cybersecurity',
    'Learning & Documentation',
    'Hackathons & Opportunities',
    'Professional Community',
]

export default function ChapterFive() {
    const [activeCategory, setActiveCategory] = useState('All Platforms')
    const [searchQuery, setSearchQuery] = useState('')

    const [visited, setVisited] = useState<string[]>(
        () => getChapterFiveVisited()
    )

    const [selected, setSelected] = useState<string[]>(
        () => getChapterFiveSelected()
    )

    const [reflection, setReflection] = useState<string>(
        () => getChapterFiveReflection()
    )

    const [activitySaved, setActivitySaved] = useState(
        () => isChapterCompleted(5)
    )

    const [saving, setSaving] = useState(false)
    const [saveError, setSaveError] = useState('')

    // Persist visited platforms.
    useEffect(() => {
        saveChapterFiveVisited(visited)
    }, [visited])

    // Persist selected platforms.
    useEffect(() => {
        saveChapterFiveSelected(selected)
    }, [selected])

    // Persist reflection.
    useEffect(() => {
        saveChapterFiveReflection(reflection)
    }, [reflection])

    // Filter platforms using search and category.
    const filteredPlatforms = useMemo(() => {
        const query = searchQuery.trim().toLowerCase()

        return platforms.filter((platform) => {
            const matchesCategory =
                activeCategory === 'All Platforms' ||
                platform.category === activeCategory

            const matchesSearch =
                !query ||
                platform.name.toLowerCase().includes(query) ||
                platform.description.toLowerCase().includes(query) ||
                platform.purpose.toLowerCase().includes(query) ||
                platform.category.toLowerCase().includes(query)

            return matchesCategory && matchesSearch
        })
    }, [activeCategory, searchQuery])

    // Record a platform visit and persist it immediately.
    const markVisited = (platformName: string) => {
        const currentVisited = getChapterFiveVisited()

        if (currentVisited.includes(platformName)) {
            return
        }

        const updatedVisited = [...currentVisited, platformName]

        saveChapterFiveVisited(updatedVisited)

        setVisited(updatedVisited)
        setActivitySaved(false)
        setSaveError('')
    }

    // Add or remove a platform from the student's plan.
    const toggleSelected = (platformName: string) => {
        setSelected((current) => {
            const updated = current.includes(platformName)
                ? current.filter((name) => name !== platformName)
                : [...current, platformName]

            saveChapterFiveSelected(updated)
            return updated
        })

        setActivitySaved(false)
        setSaveError('')
        setChapterCompleted(5, false)
    }

    // Save activity locally and synchronize detailed data with Google Sheets.
    const saveActivity = async () => {
        if (selected.length === 0 || !reflection.trim() || saving) {
            return
        }

        setSaving(true)
        setSaveError('')
        setActivitySaved(false)

        try {
            const latestVisited = getChapterFiveVisited()

            const selectedSaved = saveChapterFiveSelected(selected)
            const reflectionSaved = saveChapterFiveReflection(
                reflection.trim()
            )

            if (!selectedSaved || !reflectionSaved) {
                throw new Error(
                    'Unable to save your platform plan locally.'
                )
            }

            // Retrieve the authenticated student session centrally.
            const studentSession = getStudentAuthSession()

            if (!studentSession) {
                throw new Error(
                    'Your student session has expired. Please log in again.'
                )
            }

            const { token, studentId } = studentSession

            // Prepare detailed activity data.
            const activityData = {
                chapter: 5,
                activityName: 'Build Your Platform Plan',
                visitedPlatforms: latestVisited,
                selectedPlatforms: selected,
                reflection: reflection.trim(),
                exploredCount: latestVisited.length,
                totalPlatforms: platforms.length,
                savedAt: new Date().toISOString(),
            }

            // Synchronize activity with Google Apps Script.
            const response = await fetch(CAREERVERSE_API_URL, {
                method: 'POST',
                body: JSON.stringify({
                    action: 'student.progress.save',
                    token,
                    studentId,
                    chapter: 5,
                    completed: true,
                    activityData,
                }),
            })

            const result = await response.json()

            if (!response.ok || result.success !== true) {
                throw new Error(
                    result.error ||
                    result.message ||
                    'Unable to synchronize activity data with Google Sheets.'
                )
            }

            // Update local completion after successful synchronization.
            const completionSaved = setChapterCompleted(5, true)

            if (!completionSaved) {
                throw new Error(
                    'Activity was synchronized, but local completion could not be updated.'
                )
            }

            setVisited(latestVisited)
            setActivitySaved(true)
        } catch (error) {
            console.error(
                'Chapter 5 activity synchronization failed:',
                error
            )

            setSaveError(
                error instanceof Error
                    ? error.message
                    : 'Something went wrong while saving your activity.'
            )
        } finally {
            setSaving(false)
        }
    }

    const handleReflectionChange = (value: string) => {
        setReflection(value)
        setActivitySaved(false)
        setSaveError('')
        setChapterCompleted(5, false)
    }

    const progress = Math.round(
        (visited.length / platforms.length) * 100
    )

    return (
        <main className="min-h-screen bg-slate-950 px-4 py-8 text-white sm:px-6 lg:px-10">
            <div className="mx-auto max-w-7xl">

                {/* Back navigation */}
                <Link
                    to="/student/chapter/4"
                    className="mb-8 inline-flex items-center gap-2 text-sm text-slate-400 transition hover:text-white"
                >
                    <ArrowLeft size={17} />
                    Back to Chapter 4
                </Link>

                {/* Chapter introduction */}
                <section className="mb-10 overflow-hidden rounded-3xl border border-slate-800 bg-gradient-to-br from-indigo-950 via-slate-900 to-slate-950 p-6 sm:p-10">
                    <div className="mb-5 flex items-center gap-3">
                        <span className="rounded-xl bg-indigo-500/20 p-3 text-indigo-300">
                            <GraduationCap size={27} />
                        </span>

                        <span className="text-sm font-semibold uppercase tracking-[0.2em] text-indigo-300">
                            Chapter 05
                        </span>
                    </div>

                    <h1 className="max-w-3xl text-3xl font-bold tracking-tight sm:text-5xl">
                        Platforms That Build Your Proof
                    </h1>

                    <p className="mt-5 max-w-3xl text-base leading-7 text-slate-300 sm:text-lg">
                        Skills become more valuable when you can demonstrate them.
                        Explore platforms where you can practise, build projects,
                        document your work, participate in challenges and develop
                        your professional presence.
                    </p>

                    <div className="mt-8 grid gap-4 sm:grid-cols-3">
                        <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                            <Code2 className="mb-3 text-indigo-300" size={22} />
                            <p className="font-semibold">Practise</p>
                            <p className="mt-1 text-sm text-slate-400">
                                Strengthen your technical skills.
                            </p>
                        </div>

                        <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                            <Trophy className="mb-3 text-indigo-300" size={22} />
                            <p className="font-semibold">Participate</p>
                            <p className="mt-1 text-sm text-slate-400">
                                Take part in challenges and events.
                            </p>
                        </div>

                        <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                            <Target className="mb-3 text-indigo-300" size={22} />
                            <p className="font-semibold">Show your proof</p>
                            <p className="mt-1 text-sm text-slate-400">
                                Build a visible record of your work.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Learning objectives */}
                <section className="mb-10">
                    <h2 className="mb-4 text-2xl font-bold">
                        What you will learn
                    </h2>

                    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                        {[
                            'Identify platforms relevant to your career domain.',
                            'Understand how each platform supports your growth.',
                            'Explore opportunities to practise and demonstrate skills.',
                            'Select platforms for your personal development plan.',
                        ].map((objective) => (
                            <div
                                key={objective}
                                className="flex gap-3 rounded-2xl border border-slate-800 bg-slate-900 p-4"
                            >
                                <CheckCircle2
                                    className="mt-0.5 shrink-0 text-emerald-400"
                                    size={19}
                                />

                                <p className="text-sm leading-6 text-slate-300">
                                    {objective}
                                </p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Platform directory */}
                <section className="mb-12">
                    <div className="mb-5 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
                        <div>
                            <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-indigo-300">
                                Explore the ecosystem
                            </p>

                            <h2 className="text-2xl font-bold sm:text-3xl">
                                Platform Directory
                            </h2>

                            <p className="mt-2 text-sm text-slate-400">
                                Select a category or search for a platform.
                                Open its official website by clicking its logo or name.
                            </p>
                        </div>

                        <div className="rounded-xl border border-slate-800 bg-slate-900 px-4 py-3 text-sm text-slate-300">
                            {platforms.length} platforms listed
                        </div>
                    </div>

                    {/* Search */}
                    <div className="relative mb-5">
                        <Search
                            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
                            size={19}
                        />

                        <input
                            type="search"
                            value={searchQuery}
                            onChange={(event) =>
                                setSearchQuery(event.target.value)
                            }
                            placeholder="Search platforms, skills or purposes..."
                            className="w-full rounded-xl border border-slate-800 bg-slate-900 py-3.5 pl-12 pr-4 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-indigo-500"
                        />
                    </div>

                    {/* Category filters */}
                    <div className="mb-6 flex gap-2 overflow-x-auto pb-3">
                        {categories.map((category) => (
                            <button
                                key={category}
                                type="button"
                                onClick={() => setActiveCategory(category)}
                                className={`shrink-0 rounded-full border px-4 py-2 text-sm transition ${activeCategory === category
                                        ? 'border-indigo-500 bg-indigo-500 text-white'
                                        : 'border-slate-700 bg-slate-900 text-slate-400 hover:border-slate-500 hover:text-white'
                                    }`}
                            >
                                {category}
                            </button>
                        ))}
                    </div>

                    {/* Platform cards */}
                    {filteredPlatforms.length === 0 ? (
                        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-10 text-center">
                            <Search
                                className="mx-auto mb-3 text-slate-500"
                                size={30}
                            />

                            <h3 className="font-semibold">
                                No platforms found
                            </h3>

                            <p className="mt-2 text-sm text-slate-400">
                                Try another search term or select a different category.
                            </p>
                        </div>
                    ) : (
                        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                            {filteredPlatforms.map((platform) => {
                                const hasVisited = visited.includes(platform.name)
                                const isSelected = selected.includes(platform.name)

                                return (
                                    <article
                                        key={platform.name}
                                        className="flex flex-col rounded-2xl border border-slate-800 bg-slate-900 p-5 transition hover:-translate-y-1 hover:border-indigo-500/60"
                                    >
                                        <div className="mb-4 flex items-start justify-between gap-3">
                                            <a
                                                href={platform.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                onClick={() =>
                                                    markVisited(platform.name)
                                                }
                                                className="group flex min-w-0 items-center gap-3"
                                                aria-label={`Visit official ${platform.name} website`}
                                            >
                                                <span className="relative flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-slate-700 bg-slate-800 text-xs font-bold text-slate-300">
                                                    <span>{platform.initials}</span>

                                                    <img
                                                        src={`https://cdn.simpleicons.org/${platform.logo}`}
                                                        alt=""
                                                        loading="lazy"
                                                        className="absolute inset-0 h-full w-full bg-slate-800 object-contain p-2"
                                                        onError={(event) => {
                                                            event.currentTarget.style.display = 'none'
                                                        }}
                                                    />
                                                </span>

                                                <span className="min-w-0">
                                                    <span className="flex items-center gap-1 font-semibold text-white group-hover:text-indigo-300">
                                                        {platform.name}
                                                        <ArrowUpRight
                                                            size={14}
                                                            className="shrink-0 opacity-60"
                                                        />
                                                    </span>

                                                    <span className="mt-1 block text-xs text-slate-500">
                                                        Official website
                                                    </span>
                                                </span>
                                            </a>

                                            {hasVisited && (
                                                <span className="flex shrink-0 items-center gap-1 rounded-full bg-emerald-500/10 px-2 py-1 text-xs text-emerald-300">
                                                    <CheckCircle2 size={13} />
                                                    Visited
                                                </span>
                                            )}
                                        </div>

                                        <span className="mb-3 w-fit rounded-full border border-indigo-500/20 bg-indigo-500/10 px-3 py-1 text-xs text-indigo-300">
                                            {platform.category}
                                        </span>

                                        <p className="mb-3 flex-1 text-sm leading-6 text-slate-400">
                                            {platform.description}
                                        </p>

                                        <div className="mb-4 rounded-xl bg-slate-800/70 p-3">
                                            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                                                Why explore it?
                                            </p>

                                            <p className="mt-1 text-sm text-slate-300">
                                                {platform.purpose}
                                            </p>
                                        </div>

                                        <div className="flex items-center justify-between gap-3 border-t border-slate-800 pt-4">
                                            <a
                                                href={platform.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                onClick={() =>
                                                    markVisited(platform.name)
                                                }
                                                className="inline-flex items-center gap-2 text-sm font-semibold text-indigo-300 hover:text-indigo-200"
                                            >
                                                Explore platform
                                                <ExternalLink size={14} />
                                            </a>

                                            <button
                                                type="button"
                                                onClick={() =>
                                                    toggleSelected(platform.name)
                                                }
                                                className={`rounded-lg border px-3 py-2 text-xs font-medium transition ${isSelected
                                                        ? 'border-emerald-500/40 bg-emerald-500/10 text-emerald-300'
                                                        : 'border-slate-700 text-slate-400 hover:border-indigo-500 hover:text-white'
                                                    }`}
                                            >
                                                {isSelected ? 'Selected' : 'Add to plan'}
                                            </button>
                                        </div>
                                    </article>
                                )
                            })}
                        </div>
                    )}
                </section>

                {/* Exploration progress */}
                <section className="mb-12 rounded-2xl border border-slate-800 bg-slate-900 p-6">
                    <div className="mb-4 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
                        <div>
                            <h2 className="text-xl font-bold">
                                Your Exploration Progress
                            </h2>

                            <p className="mt-1 text-sm text-slate-400">
                                Platforms you have opened during this chapter.
                            </p>
                        </div>

                        <p className="text-sm font-semibold text-indigo-300">
                            {visited.length} / {platforms.length} explored
                        </p>
                    </div>

                    <div className="h-3 overflow-hidden rounded-full bg-slate-800">
                        <div
                            className="h-full rounded-full bg-indigo-500 transition-all duration-500"
                            style={{ width: `${progress}%` }}
                        />
                    </div>

                    <p className="mt-2 text-right text-xs text-slate-500">
                        {progress}% explored
                    </p>
                </section>

                {/* Platform selection activity */}
                <section className="mb-12 rounded-3xl border border-indigo-500/30 bg-gradient-to-br from-indigo-950/60 to-slate-900 p-6 sm:p-8">
                    <div className="mb-6 flex items-center gap-3">
                        <span className="rounded-xl bg-indigo-500/20 p-3 text-indigo-300">
                            <Target size={24} />
                        </span>

                        <div>
                            <p className="text-xs font-semibold uppercase tracking-widest text-indigo-300">
                                Chapter Activity
                            </p>

                            <h2 className="text-2xl font-bold">
                                Build Your Platform Plan
                            </h2>
                        </div>
                    </div>

                    <p className="mb-6 max-w-3xl text-sm leading-6 text-slate-300">
                        Choose the platforms you intend to use during your learning
                        journey. Select only those that support your current goals.
                        You can change your choices later.
                    </p>

                    <div className="mb-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                        {platforms.map((platform) => (
                            <label
                                key={platform.name}
                                className={`flex cursor-pointer items-center gap-3 rounded-xl border p-3 transition ${selected.includes(platform.name)
                                        ? 'border-indigo-500 bg-indigo-500/10'
                                        : 'border-slate-700 bg-slate-900/70 hover:border-slate-500'
                                    }`}
                            >
                                <input
                                    type="checkbox"
                                    checked={selected.includes(platform.name)}
                                    onChange={() =>
                                        toggleSelected(platform.name)
                                    }
                                    className="h-4 w-4 accent-indigo-500"
                                />

                                <span className="min-w-0">
                                    <span className="block text-sm font-medium text-white">
                                        {platform.name}
                                    </span>

                                    <span className="block truncate text-xs text-slate-500">
                                        {platform.category}
                                    </span>
                                </span>
                            </label>
                        ))}
                    </div>

                    <div className="mb-5">
                        <label
                            htmlFor="platform-reflection"
                            className="mb-2 block text-sm font-semibold text-white"
                        >
                            Reflection: How will these platforms help you demonstrate your skills?
                        </label>

                        <textarea
                            id="platform-reflection"
                            value={reflection}
                            onChange={(event) =>
                                handleReflectionChange(event.target.value)
                            }
                            rows={4}
                            placeholder="Example: I will use GitHub to publish my projects, LeetCode to practise problem-solving and LinkedIn to build my professional presence..."
                            className="w-full resize-y rounded-xl border border-slate-700 bg-slate-950 p-4 text-sm leading-6 text-white outline-none placeholder:text-slate-500 focus:border-indigo-500"
                        />
                    </div>

                    <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
                        <p className="text-sm text-slate-400">
                            {selected.length} platform{selected.length === 1 ? '' : 's'} selected
                        </p>

                        <button
                            type="button"
                            onClick={saveActivity}
                            disabled={
                                selected.length === 0 ||
                                !reflection.trim() ||
                                saving
                            }
                            className="inline-flex items-center gap-2 rounded-xl bg-indigo-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-indigo-400 disabled:cursor-not-allowed disabled:opacity-40"
                        >
                            {saving ? (
                                <>
                                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                                    Saving Activity...
                                </>
                            ) : (
                                <>
                                    <CheckCircle2 size={17} />
                                    Save My Platform Plan
                                </>
                            )}
                        </button>
                    </div>

                    {saveError && (
                        <p className="mt-4 text-sm text-red-400">
                            {saveError}
                        </p>
                    )}

                    {activitySaved && (
                        <p className="mt-4 flex items-center gap-2 text-sm text-emerald-300">
                            <CheckCircle2 size={17} />
                            Chapter 5 completed! Your platform plan has been saved successfully.
                        </p>
                    )}
                </section>

                {/* Key takeaway */}
                <section className="mb-10 rounded-2xl border border-slate-800 bg-slate-900 p-6">
                    <div className="mb-3 flex items-center gap-2">
                        <BookOpen className="text-indigo-300" size={21} />

                        <h2 className="text-xl font-bold">
                            Key Takeaway
                        </h2>
                    </div>

                    <p className="text-sm leading-7 text-slate-300">
                        Do not collect accounts just to increase the number of
                        platforms you use. Choose a small set of relevant platforms,
                        use them consistently and create evidence of your progress:
                        projects, repositories, solved problems, certificates,
                        technical writing or competition participation.
                    </p>
                </section>

                {/* Next chapter */}
                <div className="flex flex-col justify-between gap-4 border-t border-slate-800 pt-6 sm:flex-row sm:items-center">
                    <div>
                        <p className="text-sm text-slate-500">
                            Up next
                        </p>

                        <h2 className="mt-1 text-xl font-bold">
                            Chapter 6 – Research and AI
                        </h2>
                    </div>

                    <Link
                        to="/student/chapter/6"
                        className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-indigo-400"
                    >
                        Continue to Chapter 6
                        <ArrowUpRight size={17} />
                    </Link>
                </div>
            </div>
        </main>
    )
}
