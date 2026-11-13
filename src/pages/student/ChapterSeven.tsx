
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {
    ArrowLeft,
    ArrowRight,
    Award,
    BookOpen,
    BriefcaseBusiness,
    CheckCircle2,
    ExternalLink,
    Globe,
    Lightbulb,
    MessageSquare,
    Network,
    Save,
    Target,
    Trophy,
    Users,
    XCircle,
    GraduationCap,
} from 'lucide-react'
import {
    getChapterSevenSelectedExperiences,
    saveChapterSevenSelectedExperiences,
    getChapterSevenPortfolioUrl,
    saveChapterSevenPortfolioUrl,
    getChapterSevenLinkedinUrl,
    saveChapterSevenLinkedinUrl,
    getChapterSevenGithubUrl,
    saveChapterSevenGithubUrl,
    getChapterSevenActionPlan,
    saveChapterSevenActionPlan,
    getChapterSevenReflection,
    saveChapterSevenReflection,
    isChapterCompleted,
    setChapterCompleted,
} from '../../services/storage/progressStorage'

const modules = [
    {
        number: '01',
        title: 'Understanding Professional Experience',
        description:
            'Learn why practical experience matters and how projects, internships, research, volunteering and leadership activities demonstrate your abilities.',
        points: [
            'Understand the difference between theoretical knowledge and practical application.',
            'Identify opportunities to apply classroom concepts.',
            'Learn how to document your contribution and outcomes.',
        ],
    },
    {
        number: '02',
        title: 'Internships and Real-World Learning',
        description:
            'Understand how internships and structured learning experiences help you explore professional environments.',
        points: [
            'Identify internships relevant to your interests and skills.',
            'Prepare a focused resume and application.',
            'Evaluate the learning objectives and credibility of an opportunity.',
            'Understand professional communication and workplace expectations.',
        ],
    },
    {
        number: '03',
        title: 'Projects and Open Source',
        description:
            'Build evidence of your skills through meaningful projects, collaboration and contributions to public software communities.',
        points: [
            'Develop projects that solve clearly defined problems.',
            'Maintain readable code and useful documentation.',
            'Learn Git, branches, commits and pull requests.',
            'Explain your technical decisions and individual contribution.',
        ],
    },
    {
        number: '04',
        title: 'Building Your Professional Profile',
        description:
            'Create a consistent professional identity across your resume, LinkedIn profile, GitHub account and portfolio.',
        points: [
            'Write a clear professional summary.',
            'Present skills with evidence rather than unsupported claims.',
            'Organise projects and achievements.',
            'Keep your professional information accurate and current.',
        ],
    },
    {
        number: '05',
        title: 'Networking and Professional Communication',
        description:
            'Learn how to communicate professionally, connect with mentors and participate in technical communities.',
        points: [
            'Introduce yourself clearly and confidently.',
            'Ask specific questions when seeking guidance.',
            'Participate respectfully in technical communities.',
            'Follow up professionally after events and discussions.',
        ],
    },
    {
        number: '06',
        title: 'Presenting Your Work',
        description:
            'Learn how to explain your projects, demonstrate your decisions and communicate the value of your work.',
        points: [
            'Explain the problem, approach, tools and outcome.',
            'Prepare a short project demonstration.',
            'Discuss challenges and lessons learned.',
            'Connect your experience to the role or opportunity.',
        ],
    },
]

const experiences = [
    {
        id: 'personal-projects',
        title: 'Personal and Academic Projects',
        description:
            'Build useful applications, prototypes or research-based projects that demonstrate your skills.',
        icon: Lightbulb,
    },
    {
        id: 'internships',
        title: 'Internships',
        description:
            'Explore structured learning opportunities that provide relevant practical exposure.',
        icon: BriefcaseBusiness,
    },
    {
        id: 'open-source',
        title: 'Open-Source Contributions',
        description:
            'Learn collaborative development through documentation, bug reports and code contributions.',
        icon: Globe,
    },
    {
        id: 'hackathons',
        title: 'Hackathons and Technical Events',
        description:
            'Work with a team, develop solutions and present your ideas within a defined event.',
        icon: Trophy,
    },
    {
        id: 'research',
        title: 'Research and Publications',
        description:
            'Explore a technical question, review credible sources and communicate your findings.',
        icon: BookOpen,
    },
    {
        id: 'leadership',
        title: 'Leadership and Volunteering',
        description:
            'Demonstrate organisation, teamwork, responsibility and communication through meaningful activities.',
        icon: Users,
    },
    {
        id: 'communities',
        title: 'Technical Communities',
        description:
            'Learn with peers, attend technical sessions and share useful knowledge.',
        icon: Network,
    },
    {
        id: 'portfolio',
        title: 'Portfolio Development',
        description:
            'Present your projects, skills, experience and contact information in one professional location.',
        icon: Globe,
    },
]

const platforms = [
    {
        name: 'LinkedIn',
        category: 'Professional Networking',
        description:
            'Build a professional profile and connect with the technology community.',
        url: 'https://www.linkedin.com/',
        icon: 'linkedin',
    },
    {
        name: 'GitHub',
        category: 'Code Portfolio',
        description:
            'Publish projects, maintain repositories and collaborate on software.',
        url: 'https://github.com/',
        icon: 'github',
    },
    {
        name: 'GitLab',
        category: 'Code Collaboration',
        description:
            'Manage repositories and explore collaborative development workflows.',
        url: 'https://gitlab.com/',
        icon: 'github',
    },
    {
        name: 'Devfolio',
        category: 'Hackathons',
        description: 'Discover hackathons and showcase projects.',
        url: 'https://devfolio.co/',
        icon: 'trophy',
    },
    {
        name: 'Unstop',
        category: 'Challenges and Opportunities',
        description:
            'Explore competitions, challenges and student opportunities.',
        url: 'https://unstop.com/',
        icon: 'award',
    },
    {
        name: 'Major League Hacking',
        category: 'Hackathons',
        description:
            'Explore student hackathons and developer community activities.',
        url: 'https://mlh.io/',
        icon: 'users',
    },
    {
        name: 'Google Summer of Code',
        category: 'Open Source',
        description:
            'Learn about structured open-source contribution programmes.',
        url: 'https://summerofcode.withgoogle.com/',
        icon: 'globe',
    },
    {
        name: 'freeCodeCamp',
        category: 'Learning and Projects',
        description:
            'Practise development skills through structured learning and projects.',
        url: 'https://www.freecodecamp.org/',
        icon: 'book',
    },
]

const actionPlanOptions = [
    'Complete one meaningful technical project.',
    'Improve my GitHub profile and project documentation.',
    'Prepare or update my professional resume.',
    'Improve my LinkedIn profile.',
    'Explore relevant internship opportunities.',
    'Participate in a technical event or hackathon.',
    'Make a beginner-friendly open-source contribution.',
    'Practise explaining my projects.',
]

const checklistSections = [
    'experience-section',
    'profile-section',
    'action-plan-section',
    'reflection-section',
]

function LinkedInIcon({ size = 20 }: { size?: number }) {
    return (
        <span
            style={{ width: size, height: size }}
            className="inline-flex shrink-0 items-center justify-center rounded-sm bg-[#0A66C2] text-[11px] font-bold leading-none text-white"
            aria-label="LinkedIn"
        >
            in
        </span>
    )
}

export default function ChapterSeven() {
    const [selectedExperiences, setSelectedExperiences] = useState<string[]>([])
    const [portfolioUrl, setPortfolioUrl] = useState('')
    const [linkedinUrl, setLinkedinUrl] = useState('')
    const [githubUrl, setGithubUrl] = useState('')
    const [actionPlan, setActionPlan] = useState('')
    const [reflection, setReflection] = useState('')
    const [saved, setSaved] = useState(false)
    const [isCompleted, setIsCompleted] = useState(false)

    useEffect(() => {
        setSelectedExperiences(getChapterSevenSelectedExperiences())
        setPortfolioUrl(getChapterSevenPortfolioUrl())
        setLinkedinUrl(getChapterSevenLinkedinUrl())
        setGithubUrl(getChapterSevenGithubUrl())
        setActionPlan(getChapterSevenActionPlan())
        setReflection(getChapterSevenReflection())
        setIsCompleted(isChapterCompleted(7))
    }, [])

    const toggleExperience = (id: string) => {
        setSelectedExperiences((previous) =>
            previous.includes(id)
                ? previous.filter((item) => item !== id)
                : [...previous, id],
        )

        setSaved(false)
    }

    const isValidUrl = (value: string) => {
        if (!value.trim()) return true

        try {
            const parsed = new URL(value)

            return (
                parsed.protocol === 'https:' ||
                parsed.protocol === 'http:'
            )
        } catch {
            return false
        }
    }

    const hasProfileUrl = Boolean(
        portfolioUrl.trim() ||
        githubUrl.trim() ||
        linkedinUrl.trim(),
    )

    const requirements = [
        {
            label: 'Select at least one experience category.',
            complete: selectedExperiences.length > 0,
        },
        {
            label: 'Add a valid portfolio, GitHub or LinkedIn URL.',
            complete:
                hasProfileUrl &&
                isValidUrl(portfolioUrl) &&
                isValidUrl(githubUrl) &&
                isValidUrl(linkedinUrl),
        },
        {
            label: 'Write your next action plan.',
            complete: actionPlan.trim().length >= 15,
        },
        {
            label: 'Complete your reflection.',
            complete: reflection.trim().length >= 30,
        },
    ]

    const allRequirementsMet = requirements.every(
        (requirement) => requirement.complete,
    )

    const completedRequirements = requirements.filter(
        (requirement) => requirement.complete,
    ).length

    const goToChecklistActivity = (index: number) => {
        const section = document.getElementById(checklistSections[index])

        section?.scrollIntoView({
            behavior: 'smooth',
            block: 'center',
        })
    }

    const saveProgress = () => {
        if (!allRequirementsMet) {
            setSaved(false)
            return
        }

        const selectedSaved =
            saveChapterSevenSelectedExperiences(selectedExperiences)
        const portfolioSaved = saveChapterSevenPortfolioUrl(
            portfolioUrl.trim(),
        )
        const linkedinSaved = saveChapterSevenLinkedinUrl(
            linkedinUrl.trim(),
        )
        const githubSaved = saveChapterSevenGithubUrl(githubUrl.trim())
        const actionPlanSaved = saveChapterSevenActionPlan(actionPlan.trim())
        const reflectionSaved = saveChapterSevenReflection(reflection.trim())

        const progressSaved = [
            selectedSaved,
            portfolioSaved,
            linkedinSaved,
            githubSaved,
            actionPlanSaved,
            reflectionSaved,
        ].every(Boolean)

        if (!progressSaved) {
            setSaved(false)
            alert('Unable to save your progress. Please try again.')
            return
        }

        const completionSaved = setChapterCompleted(7, true)

        if (!completionSaved) {
            setSaved(false)
            alert('Your activities were saved, but chapter completion could not be recorded. Please try again.')
            return
        }

        setIsCompleted(true)
        setSaved(true)
    }

    return (
        <div className="min-h-screen bg-slate-50">
            {/* Header */}
            <header className="border-b border-slate-200 bg-white">
                <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
                    <Link
                        to="/student/dashboard"
                        className="flex items-center gap-3"
                    >
                        <div className="rounded-xl bg-blue-700 p-2 text-white">
                            <GraduationCap size={23} />
                        </div>

                        <div>
                            <h1 className="text-lg font-bold text-blue-700">
                                CAREERVERSE
                            </h1>
                            <p className="text-xs text-slate-500">
                                Student Learning Portal
                            </p>
                        </div>
                    </Link>

                    <Link
                        to="/student/dashboard"
                        className="text-sm font-medium text-slate-600 hover:text-blue-700"
                    >
                        Dashboard
                    </Link>
                </div>
            </header>

            <main className="mx-auto max-w-7xl px-6 py-10">
                {/* Hero */}
                <section className="mb-8 rounded-2xl bg-gradient-to-r from-blue-900 to-indigo-700 p-8 text-white">
                    <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-blue-200">
                        Chapter 07 · Professional Development
                    </p>

                    <h2 className="text-3xl font-bold md:text-4xl">
                        Experience and Visibility
                    </h2>

                    <p className="mt-4 max-w-3xl leading-7 text-blue-100">
                        Knowledge becomes more valuable when you can
                        demonstrate it. Learn how to build practical
                        experience, develop your professional identity
                        and make your work visible through credible evidence.
                    </p>

                    <div className="mt-6 flex flex-wrap gap-3">
                        <span className="rounded-full bg-white/15 px-4 py-2 text-sm">
                            6 Learning Modules
                        </span>
                        <span className="rounded-full bg-white/15 px-4 py-2 text-sm">
                            8 Experience Categories
                        </span>
                        <span className="rounded-full bg-white/15 px-4 py-2 text-sm">
                            Practical Activities
                        </span>
                    </div>
                </section>

                {/* Learning Objectives */}
                <section className="mb-10 rounded-xl border border-slate-200 bg-white p-6">
                    <div className="mb-5 flex items-center gap-3">
                        <div className="rounded-lg bg-blue-50 p-3 text-blue-700">
                            <Target size={23} />
                        </div>

                        <div>
                            <h3 className="text-xl font-bold text-slate-900">
                                Learning Objectives
                            </h3>
                            <p className="text-sm text-slate-500">
                                By the end of this chapter, you should be able to:
                            </p>
                        </div>
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
                        {[
                            'Identify meaningful ways to gain practical experience.',
                            'Build a professional resume and online identity.',
                            'Present projects and achievements with evidence.',
                            'Understand internships and open-source participation.',
                            'Communicate with mentors and technical communities.',
                            'Create a practical professional development plan.',
                        ].map((objective) => (
                            <div
                                key={objective}
                                className="flex items-start gap-3"
                            >
                                <CheckCircle2
                                    size={19}
                                    className="mt-0.5 shrink-0 text-green-600"
                                />
                                <p className="text-sm leading-6 text-slate-700">
                                    {objective}
                                </p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Learning Modules */}
                <section className="mb-10">
                    <div className="mb-5">
                        <h3 className="text-2xl font-bold text-slate-900">
                            Learning Modules
                        </h3>
                        <p className="mt-1 text-sm text-slate-500">
                            Understand each topic before completing the practical activities.
                        </p>
                    </div>

                    <div className="space-y-4">
                        {modules.map((module) => (
                            <article
                                key={module.number}
                                className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm"
                            >
                                <div className="flex items-start gap-4">
                                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-blue-50 font-bold text-blue-700">
                                        {module.number}
                                    </div>

                                    <div className="flex-1">
                                        <h4 className="text-lg font-bold text-slate-900">
                                            {module.title}
                                        </h4>

                                        <p className="mt-2 text-sm leading-6 text-slate-600">
                                            {module.description}
                                        </p>

                                        <ul className="mt-4 space-y-2">
                                            {module.points.map((point) => (
                                                <li
                                                    key={point}
                                                    className="flex items-start gap-2 text-sm text-slate-600"
                                                >
                                                    <CheckCircle2
                                                        size={16}
                                                        className="mt-0.5 shrink-0 text-green-600"
                                                    />
                                                    {point}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>
                </section>

                {/* Experience Opportunities */}
                <section id="experience-section" className="mb-10 scroll-mt-8">
                    <div className="mb-5">
                        <h3 className="text-2xl font-bold text-slate-900">
                            Explore Experience Opportunities
                        </h3>
                        <p className="mt-1 text-sm text-slate-500">
                            Select the experience categories you want to pursue.
                        </p>
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
                        {experiences.map((experience) => {
                            const Icon = experience.icon
                            const selected = selectedExperiences.includes(
                                experience.id,
                            )

                            return (
                                <button
                                    type="button"
                                    key={experience.id}
                                    onClick={() =>
                                        toggleExperience(experience.id)
                                    }
                                    aria-pressed={selected}
                                    className={`rounded-xl border p-5 text-left transition ${selected
                                            ? 'border-blue-600 bg-blue-50'
                                            : 'border-slate-200 bg-white hover:border-blue-300'
                                        }`}
                                >
                                    <div className="flex items-start gap-4">
                                        <div className="rounded-lg bg-white p-3 text-blue-700 shadow-sm">
                                            <Icon size={23} />
                                        </div>

                                        <div className="flex-1">
                                            <div className="flex items-center justify-between gap-2">
                                                <h4 className="font-bold text-slate-900">
                                                    {experience.title}
                                                </h4>

                                                {selected ? (
                                                    <CheckCircle2
                                                        size={20}
                                                        className="shrink-0 text-blue-700"
                                                    />
                                                ) : (
                                                    <span className="text-xs text-slate-400">
                                                        Select
                                                    </span>
                                                )}
                                            </div>

                                            <p className="mt-2 text-sm leading-6 text-slate-600">
                                                {experience.description}
                                            </p>
                                        </div>
                                    </div>
                                </button>
                            )
                        })}
                    </div>

                    <p className="mt-3 text-sm font-medium text-blue-700">
                        {selectedExperiences.length} experience categories selected
                    </p>
                </section>

                {/* Professional Platforms */}
                <section className="mb-10">
                    <div className="mb-5">
                        <h3 className="text-2xl font-bold text-slate-900">
                            Professional Platforms
                        </h3>
                        <p className="mt-1 text-sm text-slate-500">
                            Open these platforms to explore their features and opportunities.
                        </p>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                        {platforms.map((platform) => {
                            const Icon =
                                platform.icon === 'trophy'
                                    ? Trophy
                                    : platform.icon === 'award'
                                        ? Award
                                        : platform.icon === 'users'
                                            ? Users
                                            : platform.icon === 'book'
                                                ? BookOpen
                                                : Globe

                            return (
                                <article
                                    key={platform.name}
                                    className="flex flex-col rounded-xl border border-slate-200 bg-white p-5 shadow-sm"
                                >
                                    <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-lg bg-blue-50 text-blue-700">
                                        {platform.icon === 'linkedin' ? (
                                            <LinkedInIcon size={23} />
                                        ) : (
                                            <Icon size={23} />
                                        )}
                                    </div>

                                    <h4 className="font-bold text-slate-900">
                                        {platform.name}
                                    </h4>

                                    <p className="mt-1 text-xs font-medium text-blue-700">
                                        {platform.category}
                                    </p>

                                    <p className="mt-3 flex-1 text-sm leading-6 text-slate-500">
                                        {platform.description}
                                    </p>

                                    <a
                                        href={platform.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="mt-5 flex items-center justify-center gap-2 rounded-lg bg-blue-700 px-3 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-800"
                                    >
                                        Explore Platform
                                        <ExternalLink size={15} />
                                    </a>
                                </article>
                            )
                        })}
                    </div>
                </section>

                {/* Professional Profile Builder */}
                <section
                    id="profile-section"
                    className="mb-10 scroll-mt-8 rounded-xl border border-slate-200 bg-white p-6"
                >
                    <div className="mb-5 flex items-center gap-3">
                        <div className="rounded-lg bg-blue-50 p-3 text-blue-700">
                            <Globe size={23} />
                        </div>

                        <div>
                            <h3 className="text-xl font-bold text-slate-900">
                                Professional Profile Builder
                            </h3>
                            <p className="text-sm text-slate-500">
                                Add your profile links to organise your professional presence.
                            </p>
                        </div>
                    </div>

                    <div className="space-y-5">
                        <div>
                            <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700">
                                <Globe size={17} />
                                GitHub Profile URL
                            </label>

                            <input
                                type="url"
                                value={githubUrl}
                                onChange={(event) => {
                                    setGithubUrl(event.target.value)
                                    setSaved(false)
                                }}
                                placeholder="https://github.com/your-username"
                                className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                            />
                        </div>

                        <div>
                            <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700">
                                <LinkedInIcon size={17} />
                                LinkedIn Profile URL
                            </label>

                            <input
                                type="url"
                                value={linkedinUrl}
                                onChange={(event) => {
                                    setLinkedinUrl(event.target.value)
                                    setSaved(false)
                                }}
                                placeholder="https://www.linkedin.com/in/your-profile"
                                className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                            />
                        </div>

                        <div>
                            <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700">
                                <Globe size={17} />
                                Portfolio Website URL
                            </label>

                            <input
                                type="url"
                                value={portfolioUrl}
                                onChange={(event) => {
                                    setPortfolioUrl(event.target.value)
                                    setSaved(false)
                                }}
                                placeholder="https://your-portfolio.com"
                                className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                            />
                        </div>
                    </div>

                    <p className="mt-4 text-xs leading-5 text-slate-500">
                        Add at least one valid profile link to complete this activity.
                        You can add the remaining links later.
                    </p>
                </section>

                {/* Action Plan */}
                <section
                    id="action-plan-section"
                    className="mb-10 scroll-mt-8 rounded-xl border border-slate-200 bg-white p-6"
                >
                    <div className="mb-5 flex items-center gap-3">
                        <div className="rounded-lg bg-blue-50 p-3 text-blue-700">
                            <Target size={23} />
                        </div>

                        <div>
                            <h3 className="text-xl font-bold text-slate-900">
                                My Professional Action Plan
                            </h3>
                            <p className="text-sm text-slate-500">
                                Define one specific next step for your professional development.
                            </p>
                        </div>
                    </div>

                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                        Choose your next action
                    </label>

                    <select
                        value={actionPlan}
                        onChange={(event) => {
                            setActionPlan(event.target.value)
                            setSaved(false)
                        }}
                        className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                    >
                        <option value="">Select an action</option>

                        {actionPlanOptions.map((option) => (
                            <option key={option} value={option}>
                                {option}
                            </option>
                        ))}
                    </select>

                    <p className="mt-3 text-xs text-slate-500">
                        Choose an action you can realistically begin working on.
                    </p>
                </section>

                {/* Reflection */}
                <section
                    id="reflection-section"
                    className="mb-10 scroll-mt-8 rounded-xl border border-slate-200 bg-white p-6"
                >
                    <div className="mb-4 flex items-center gap-3">
                        <div className="rounded-lg bg-blue-50 p-3 text-blue-700">
                            <MessageSquare size={23} />
                        </div>

                        <div>
                            <h3 className="text-xl font-bold text-slate-900">
                                Chapter Reflection
                            </h3>
                            <p className="text-sm text-slate-500">
                                Think about how you will make your work visible.
                            </p>
                        </div>
                    </div>

                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                        What did you learn, and how will you demonstrate your abilities through practical experience?
                    </label>

                    <textarea
                        value={reflection}
                        onChange={(event) => {
                            setReflection(event.target.value)
                            setSaved(false)
                        }}
                        rows={5}
                        placeholder="Write your reflection here. Include what you learned, which experience you want to pursue and how you will demonstrate your skills..."
                        className="w-full resize-y rounded-lg border border-slate-300 px-4 py-3 text-sm leading-6 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                    />

                    <p className="mt-2 text-xs text-slate-500">
                        Minimum 30 characters. {reflection.trim().length} characters entered.
                    </p>
                </section>

                {/* Interactive Completion Checklist */}
                <section className="mb-8 rounded-xl border border-slate-200 bg-white p-6">
                    <h3 className="mb-2 text-xl font-bold text-slate-900">
                        Chapter Completion Checklist
                    </h3>

                    <p className="mb-5 text-sm text-slate-500">
                        Click an incomplete requirement to jump directly to its activity.
                    </p>

                    <div className="space-y-3">
                        {requirements.map((requirement, index) => (
                            <button
                                type="button"
                                key={requirement.label}
                                onClick={() => goToChecklistActivity(index)}
                                aria-label={`Go to activity: ${requirement.label}`}
                                className="flex w-full items-center gap-3 rounded-lg border border-slate-100 p-4 text-left transition hover:border-blue-300 hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                {requirement.complete ? (
                                    <CheckCircle2
                                        size={20}
                                        className="shrink-0 text-green-600"
                                    />
                                ) : (
                                    <XCircle
                                        size={20}
                                        className="shrink-0 text-slate-400"
                                    />
                                )}

                                <span
                                    className={`flex-1 text-sm ${requirement.complete
                                            ? 'font-medium text-green-700'
                                            : 'text-slate-600'
                                        }`}
                                >
                                    {requirement.label}
                                </span>

                                <span className="shrink-0 text-xs font-medium text-blue-600">
                                    {requirement.complete
                                        ? 'Completed'
                                        : 'Go to activity'}
                                </span>
                            </button>
                        ))}
                    </div>

                    <div className="mt-6">
                        <div className="mb-2 flex justify-between text-xs font-medium text-slate-500">
                            <span>Completion requirements</span>
                            <span>{completedRequirements}/4</span>
                        </div>

                        <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                            <div
                                className="h-full rounded-full bg-blue-700 transition-all"
                                style={{
                                    width: `${(completedRequirements / 4) * 100}%`,
                                }}
                            />
                        </div>
                    </div>

                    <button
                        type="button"
                        onClick={saveProgress}
                        disabled={!allRequirementsMet}
                        className="mt-7 flex w-full items-center justify-center gap-2 rounded-lg bg-blue-700 px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-blue-800 disabled:cursor-not-allowed disabled:bg-slate-300"
                    >
                        <Save size={18} />
                        Save Chapter Progress
                    </button>

                    {!allRequirementsMet && (
                        <p className="mt-3 text-center text-xs text-slate-500">
                            Complete all four requirements to save and unlock the next chapter.
                        </p>
                    )}

                    {saved && (
                        <div className="mt-4 flex items-center gap-2 rounded-lg bg-green-50 p-4 text-sm font-medium text-green-700">
                            <CheckCircle2 size={19} />
                            Chapter 7 progress saved successfully!
                        </div>
                    )}

                    {isCompleted && !saved && (
                        <p className="mt-4 text-center text-sm font-medium text-green-700">
                            Your Chapter 7 completion has been saved.
                        </p>
                    )}
                </section>

                {/* Navigation */}
                <section className="flex flex-col justify-between gap-4 border-t border-slate-200 pt-6 sm:flex-row">
                    <Link
                        to="/student/chapter/6"
                        className="flex items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-100"
                    >
                        <ArrowLeft size={17} />
                        Previous Chapter
                    </Link>

                    {isCompleted ? (
                        <Link
                            to="/student/chapter/8"
                            className="flex items-center justify-center gap-2 rounded-lg bg-blue-700 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-800"
                        >
                            Continue to Chapter 8
                            <ArrowRight size={17} />
                        </Link>
                    ) : (
                        <button
                            type="button"
                            disabled
                            className="flex cursor-not-allowed items-center justify-center gap-2 rounded-lg bg-slate-200 px-5 py-3 text-sm font-semibold text-slate-400"
                        >
                            Complete Chapter to Continue
                            <span aria-hidden="true">🔒</span>
                        </button>
                    )}
                </section>

                <footer className="mt-12 border-t border-slate-200 py-6 text-center text-sm text-slate-400">
                    CAREERVERSE · Chapter 07 · Experience and Visibility
                </footer>
            </main>
        </div>
    )
}
