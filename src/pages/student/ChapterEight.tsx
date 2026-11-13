
import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
    ArrowLeft,
    ArrowRight,
    BookOpen,
    BriefcaseBusiness,
    CheckCircle2,
    ExternalLink,
    GraduationCap,
    Landmark,
    Lightbulb,
    Rocket,
    Save,
    Target,
    Trophy,
    XCircle,
} from 'lucide-react'
import {
    getChapterEightSelectedPathway,
    saveChapterEightSelectedPathway,
    getChapterEightSelectedInterest,
    saveChapterEightSelectedInterest,
    getChapterEightActionPlan,
    saveChapterEightActionPlan,
    getChapterEightReflection,
    saveChapterEightReflection,
    isChapterCompleted,
    setChapterCompleted,
} from '../../services/storage/progressStorage'

const pathways = [
    {
        id: 'higher-studies',
        title: 'Higher Studies',
        description:
            'Continue your education through postgraduate programmes, specialised degrees or international study opportunities.',
        icon: GraduationCap,
    },
    {
        id: 'research',
        title: 'Research and Academia',
        description:
            'Explore research projects, academic institutions, research assistantships and teaching-related careers.',
        icon: BookOpen,
    },
    {
        id: 'entrepreneurship',
        title: 'Entrepreneurship',
        description:
            'Develop an idea into a product, service or technology-based business.',
        icon: Rocket,
    },
    {
        id: 'fellowships',
        title: 'Fellowships and Programmes',
        description:
            'Explore structured programmes that provide mentorship, professional exposure and learning opportunities.',
        icon: Trophy,
    },
    {
        id: 'government',
        title: 'Government Careers',
        description:
            'Explore public-sector careers, competitive examinations and government technical opportunities.',
        icon: Landmark,
    },
    {
        id: 'alternative',
        title: 'Alternative Career Paths',
        description:
            'Consider specialised careers, independent work, professional certifications and interdisciplinary opportunities.',
        icon: BriefcaseBusiness,
    },
]

const modules = [
    {
        number: '01',
        title: 'Higher Studies in India and Abroad',
        icon: GraduationCap,
        description:
            'Higher education can help you specialise in a technical field, build research expertise or prepare for advanced professional roles.',
        topics: [
            {
                heading: 'Higher Studies in India',
                details: [
                    'M.Tech and M.E. programmes in specialised engineering domains.',
                    'M.Sc. programmes in computer science, mathematics, data science and related disciplines.',
                    'MBA programmes for management, product and business leadership.',
                    'Integrated and interdisciplinary postgraduate programmes.',
                ],
            },
            {
                heading: 'Higher Studies Abroad',
                details: [
                    'Explore universities based on programme quality and curriculum.',
                    'Compare tuition fees, living expenses and scholarship availability.',
                    'Understand language requirements and application deadlines.',
                    'Review admission requirements directly on university websites.',
                ],
            },
            {
                heading: 'Common Entrance Examinations',
                details: [
                    'GATE: postgraduate engineering and related opportunities.',
                    'JAM: selected postgraduate science programmes.',
                    'CAT: management education admissions.',
                    'University-specific entrance examinations and selection processes.',
                ],
            },
        ],
    },
    {
        number: '02',
        title: 'Research and Academic Careers',
        icon: BookOpen,
        description:
            'Research careers focus on investigating problems, generating knowledge and developing new technologies.',
        topics: [
            {
                heading: 'Research Opportunities',
                details: [
                    'Research internships at universities and recognised institutions.',
                    'Research assistant opportunities where available.',
                    'Undergraduate research projects and faculty collaborations.',
                    'Technical publications, conferences and academic presentations.',
                ],
            },
            {
                heading: 'Academic Career Path',
                details: [
                    'Build strong foundations in a chosen research area.',
                    'Pursue relevant postgraduate education.',
                    'Develop research methods and academic writing skills.',
                    'Explore doctoral studies and academic positions.',
                ],
            },
            {
                heading: 'Research Skills',
                details: [
                    'Literature review and identifying research gaps.',
                    'Research methodology and experimentation.',
                    'Data analysis and interpretation.',
                    'Academic integrity, citations and responsible publication.',
                ],
            },
        ],
    },
    {
        number: '03',
        title: 'Entrepreneurship and Startups',
        icon: Rocket,
        description:
            'Entrepreneurship involves identifying problems, developing solutions and creating sustainable products or services.',
        topics: [
            {
                heading: 'From Idea to Product',
                details: [
                    'Identify a genuine problem faced by a specific group of people.',
                    'Research existing solutions and the market.',
                    'Create a minimum viable product (MVP).',
                    'Collect feedback and improve the solution.',
                ],
            },
            {
                heading: 'Technology Entrepreneurship',
                details: [
                    'Software products and SaaS platforms.',
                    'Artificial intelligence and automation solutions.',
                    'Education technology and healthcare technology.',
                    'Cybersecurity and cloud-based products.',
                ],
            },
            {
                heading: 'Startup Fundamentals',
                details: [
                    'Understand customers and business models.',
                    'Learn product development and basic financial planning.',
                    'Understand intellectual property and responsible data practices.',
                    'Explore recognised incubators and entrepreneurship programmes.',
                ],
            },
        ],
    },
    {
        number: '04',
        title: 'Fellowships and Graduate Programmes',
        icon: Trophy,
        description:
            'Fellowships and graduate programmes can provide structured learning, mentorship and exposure to professional environments.',
        topics: [
            {
                heading: 'Types of Opportunities',
                details: [
                    'Research fellowships and research training programmes.',
                    'Graduate trainee and early-career programmes.',
                    'International exchange and scholarship programmes.',
                    'Innovation, entrepreneurship and leadership fellowships.',
                ],
            },
            {
                heading: 'Preparing an Application',
                details: [
                    'Read the official eligibility requirements carefully.',
                    'Prepare an accurate resume and statement of purpose.',
                    'Organise academic records and required documents.',
                    'Prepare for interviews, assessments or selection rounds.',
                ],
            },
            {
                heading: 'Important Considerations',
                details: [
                    'Check whether the programme is currently accepting applications.',
                    'Verify funding, duration and programme responsibilities.',
                    'Use the official programme website for application details.',
                    'Never assume eligibility remains unchanged between application cycles.',
                ],
            },
        ],
    },
    {
        number: '05',
        title: 'Government Careers and Opportunities',
        icon: Landmark,
        description:
            'Government careers include administrative services, technical positions, public-sector organisations and research institutions.',
        topics: [
            {
                heading: 'Central Government Opportunities',
                details: [
                    'UPSC examinations for notified civil-service positions.',
                    'SSC examinations for eligible central government posts.',
                    'Government technical and scientific recruitment.',
                    'Public-sector and research-institution recruitment.',
                ],
            },
            {
                heading: 'State Government Opportunities',
                details: [
                    'Andhra Pradesh: APPSC and relevant state recruitment notifications.',
                    'Tamil Nadu: TNPSC and relevant state recruitment notifications.',
                    'Telangana: TGPSC and relevant state recruitment notifications.',
                    'Other state-level technical, administrative and public-service positions.',
                ],
            },
            {
                heading: 'Preparation Strategy',
                details: [
                    'Identify the exact post and its official eligibility criteria.',
                    'Understand the examination pattern and syllabus.',
                    'Prepare a realistic study schedule.',
                    'Track official notifications instead of relying only on social media.',
                ],
            },
        ],
    },
    {
        number: '06',
        title: 'Alternative Career Pathways',
        icon: BriefcaseBusiness,
        description:
            'A successful career does not have to follow only the traditional placement or postgraduate route.',
        topics: [
            {
                heading: 'Specialised Technology Careers',
                details: [
                    'Cloud computing and DevOps.',
                    'Cybersecurity and digital forensics.',
                    'Data engineering and analytics.',
                    'AI engineering and automation.',
                    'UI/UX design and product development.',
                ],
            },
            {
                heading: 'Independent and Flexible Careers',
                details: [
                    'Freelance software and design projects.',
                    'Technical content creation and documentation.',
                    'Open-source community participation.',
                    'Consulting and independent product development.',
                ],
            },
            {
                heading: 'Building a Flexible Career',
                details: [
                    'Develop transferable technical and communication skills.',
                    'Create a portfolio with demonstrable work.',
                    'Continue learning as technologies and industries evolve.',
                    'Evaluate opportunities based on long-term learning and professional goals.',
                ],
            },
        ],
    },
]

const resourceGroups = [
    {
        title: 'Higher Studies and Scholarships',
        description:
            'Official education, admissions and international study resources.',
        resources: [
            {
                name: 'GATE',
                description:
                    'Graduate Aptitude Test in Engineering information and examination resources.',
                url: 'https://gate2026.iitg.ac.in/',
            },
            {
                name: 'IIT JAM',
                description: 'Joint Admission Test for Masters information.',
                url: 'https://jam2026.iitb.ac.in/',
            },
            {
                name: 'Study in India',
                description:
                    'Information about studying at participating Indian institutions.',
                url: 'https://studyinindia.gov.in/',
            },
            {
                name: 'DAAD',
                description:
                    'Official German Academic Exchange Service information.',
                url: 'https://www.daad.de/en/',
            },
            {
                name: 'Erasmus+',
                description:
                    'European Union education, training and mobility programmes.',
                url: 'https://erasmus-plus.ec.europa.eu/',
            },
            {
                name: 'EducationUSA',
                description:
                    'Official guidance about studying in the United States.',
                url: 'https://educationusa.state.gov/',
            },
        ],
    },
    {
        title: 'Research and Innovation',
        description:
            'Explore research, scientific development and innovation resources.',
        resources: [
            {
                name: 'Anusandhan National Research Foundation',
                description:
                    "India's national research and development funding organisation.",
                url: 'https://anrfonline.in/',
            },
            {
                name: 'Indian Science and Technology Portal',
                description:
                    'Explore science and technology information in India.',
                url: 'https://www.indiascienceandtechnology.gov.in/',
            },
            {
                name: 'CSIR',
                description: 'Council of Scientific and Industrial Research.',
                url: 'https://www.csir.res.in/',
            },
            {
                name: 'DRDO',
                description:
                    'Defence Research and Development Organisation.',
                url: 'https://www.drdo.gov.in/',
            },
            {
                name: 'ISRO',
                description: 'Indian Space Research Organisation.',
                url: 'https://www.isro.gov.in/',
            },
        ],
    },
    {
        title: 'Entrepreneurship and Startups',
        description:
            'Explore official startup support and entrepreneurship ecosystems.',
        resources: [
            {
                name: 'Startup India',
                description:
                    'Government of India startup ecosystem and programme information.',
                url: 'https://www.startupindia.gov.in/',
            },
            {
                name: 'Atal Innovation Mission',
                description: 'Innovation and entrepreneurship initiatives.',
                url: 'https://aim.gov.in/',
            },
            {
                name: 'BIRAC',
                description:
                    'Biotechnology innovation and entrepreneurship programmes.',
                url: 'https://birac.nic.in/',
            },
        ],
    },
    {
        title: 'Government Careers',
        description:
            'Official recruitment and public-service information portals.',
        resources: [
            {
                name: 'UPSC',
                description:
                    'Union Public Service Commission examinations and recruitment.',
                url: 'https://upsc.gov.in/',
            },
            {
                name: 'SSC',
                description:
                    'Staff Selection Commission examinations and notifications.',
                url: 'https://ssc.gov.in/',
            },
            {
                name: 'National Career Service',
                description:
                    'Government career services and employment information.',
                url: 'https://www.ncs.gov.in/',
            },
            {
                name: 'APPSC',
                description: 'Andhra Pradesh Public Service Commission.',
                url: 'https://psc.ap.gov.in/',
            },
            {
                name: 'TNPSC',
                description: 'Tamil Nadu Public Service Commission.',
                url: 'https://www.tnpsc.gov.in/',
            },
            {
                name: 'TGPSC',
                description: 'Telangana Public Service Commission.',
                url: 'https://www.tgpsc.gov.in/',
            },
        ],
    },
]

const interestOptions = [
    'Artificial Intelligence and Machine Learning',
    'Software Engineering and Full Stack Development',
    'Data Science and Analytics',
    'Cybersecurity',
    'Cloud Computing and DevOps',
    'Research and Higher Education',
    'Business and Entrepreneurship',
    'Government and Public Service',
    'Design and Product Development',
    'Other interdisciplinary fields',
]

const checklistSections = [
    'pathway-section',
    'interest-section',
    'action-plan-section',
    'reflection-section',
]

export default function ChapterEight() {
    const [selectedPathway, setSelectedPathway] = useState(
        () => getChapterEightSelectedPathway(),
    )
    const [selectedInterest, setSelectedInterest] = useState(
        () => getChapterEightSelectedInterest(),
    )
    const [actionPlan, setActionPlan] = useState(
        () => getChapterEightActionPlan(),
    )
    const [reflection, setReflection] = useState(
        () => getChapterEightReflection(),
    )
    const [isCompleted, setIsCompleted] = useState(
        () => isChapterCompleted(8),
    )
    const [saved, setSaved] = useState(false)

    const requirements = [
        {
            label: 'Choose at least one career pathway.',
            complete: Boolean(selectedPathway),
        },
        {
            label: 'Select an area of professional interest.',
            complete: Boolean(selectedInterest),
        },
        {
            label: 'Write your future career action plan.',
            complete: actionPlan.trim().length >= 20,
        },
        {
            label: 'Complete your personal career reflection.',
            complete: reflection.trim().length >= 30,
        },
    ]

    const completedCount = requirements.filter(
        (requirement) => requirement.complete,
    ).length

    const allRequirementsMet = completedCount === requirements.length

    const updateField = (
        setter: (value: string) => void,
        value: string,
    ) => {
        setter(value)
        setSaved(false)

        const completionSaved = setChapterCompleted(8, false)
        if (completionSaved) {
            setIsCompleted(false)
        }
    }

    const navigateToActivity = (index: number) => {
        document.getElementById(checklistSections[index])?.scrollIntoView({
            behavior: 'smooth',
            block: 'center',
        })
    }

    const saveProgress = () => {
        if (!allRequirementsMet) return

        const pathwaySaved =
            saveChapterEightSelectedPathway(selectedPathway)

        const interestSaved =
            saveChapterEightSelectedInterest(selectedInterest)

        const actionPlanSaved =
            saveChapterEightActionPlan(actionPlan.trim())

        const reflectionSaved =
            saveChapterEightReflection(reflection.trim())

        const completionSaved = setChapterCompleted(8, true)

        const allSaved =
            pathwaySaved &&
            interestSaved &&
            actionPlanSaved &&
            reflectionSaved &&
            completionSaved

        if (!allSaved) {
            alert('Unable to save your progress. Please try again.')
            setSaved(false)
            return
        }

        setIsCompleted(true)
        setSaved(true)
    }

    return (
        <div className="min-h-screen bg-slate-50">
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
                <section className="mb-8 rounded-2xl bg-gradient-to-r from-indigo-950 to-purple-800 p-8 text-white">
                    <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-purple-200">
                        Chapter 08 · Career Exploration
                    </p>
                    <h2 className="text-3xl font-bold md:text-4xl">
                        Beyond Placements
                    </h2>
                    <p className="mt-4 max-w-3xl leading-7 text-purple-100">
                        A successful career can follow many different paths.
                        Explore higher education, research, entrepreneurship,
                        fellowships, government opportunities and alternative
                        professional pathways.
                    </p>
                    <div className="mt-6 flex flex-wrap gap-3">
                        <span className="rounded-full bg-white/15 px-4 py-2 text-sm">
                            6 Learning Modules
                        </span>
                        <span className="rounded-full bg-white/15 px-4 py-2 text-sm">
                            4 Practical Activities
                        </span>
                        <span className="rounded-full bg-white/15 px-4 py-2 text-sm">
                            Official Resources
                        </span>
                    </div>
                </section>

                {/* Introduction */}
                <section className="mb-10 rounded-xl border border-slate-200 bg-white p-6">
                    <div className="mb-4 flex items-center gap-3">
                        <div className="rounded-lg bg-purple-50 p-3 text-purple-700">
                            <Lightbulb size={23} />
                        </div>
                        <h3 className="text-xl font-bold text-slate-900">
                            Your Career Has More Than One Direction
                        </h3>
                    </div>
                    <p className="text-sm leading-7 text-slate-600">
                        Campus placements are one possible career route, but
                        they are not the only measure of success. Some students
                        pursue advanced degrees, some build research careers,
                        some establish businesses, and others enter public
                        service or specialised technical fields.
                    </p>
                    <p className="mt-3 text-sm leading-7 text-slate-600">
                        Your objective is to understand the available
                        pathways, evaluate them using reliable information
                        and choose a direction that matches your interests,
                        strengths and circumstances.
                    </p>
                </section>

                {/* Learning Objectives */}
                <section className="mb-10 rounded-xl border border-slate-200 bg-white p-6">
                    <h3 className="mb-5 text-xl font-bold text-slate-900">
                        Learning Objectives
                    </h3>
                    <div className="grid gap-4 md:grid-cols-2">
                        {[
                            'Understand postgraduate study options in India and abroad.',
                            'Explore research and academic career opportunities.',
                            'Understand startup development and entrepreneurship.',
                            'Identify fellowship and graduate programme opportunities.',
                            'Explore central and state government career routes.',
                            'Evaluate alternative and specialised career paths.',
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

                {/* Pathway Overview */}
                <section className="mb-10">
                    <div className="mb-5">
                        <h3 className="text-2xl font-bold text-slate-900">
                            Explore Six Career Pathways
                        </h3>
                        <p className="mt-1 text-sm text-slate-500">
                            Understand the different directions available after graduation.
                        </p>
                    </div>
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                        {pathways.map((pathway) => {
                            const Icon = pathway.icon

                            return (
                                <article
                                    key={pathway.id}
                                    className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:border-purple-300"
                                >
                                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-purple-50 text-purple-700">
                                        <Icon size={25} />
                                    </div>
                                    <h4 className="font-bold text-slate-900">
                                        {pathway.title}
                                    </h4>
                                    <p className="mt-2 text-sm leading-6 text-slate-600">
                                        {pathway.description}
                                    </p>
                                </article>
                            )
                        })}
                    </div>
                </section>

                {/* Detailed Modules */}
                <section className="mb-10">
                    <div className="mb-5">
                        <h3 className="text-2xl font-bold text-slate-900">
                            Complete Learning Modules
                        </h3>
                        <p className="mt-1 text-sm text-slate-500">
                            Learn the fundamentals of each career pathway.
                        </p>
                    </div>
                    <div className="space-y-5">
                        {modules.map((module) => {
                            const Icon = module.icon

                            return (
                                <article
                                    key={module.number}
                                    className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm"
                                >
                                    <div className="mb-5 flex items-start gap-4">
                                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-purple-50 text-purple-700">
                                            <Icon size={24} />
                                        </div>
                                        <div>
                                            <p className="text-xs font-bold uppercase tracking-wider text-purple-700">
                                                Module {module.number}
                                            </p>
                                            <h4 className="mt-1 text-lg font-bold text-slate-900">
                                                {module.title}
                                            </h4>
                                            <p className="mt-2 text-sm leading-6 text-slate-600">
                                                {module.description}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="grid gap-4 md:grid-cols-3">
                                        {module.topics.map((topic) => (
                                            <div
                                                key={topic.heading}
                                                className="rounded-lg bg-slate-50 p-4"
                                            >
                                                <h5 className="mb-3 font-semibold text-slate-800">
                                                    {topic.heading}
                                                </h5>
                                                <ul className="space-y-2">
                                                    {topic.details.map((detail) => (
                                                        <li
                                                            key={detail}
                                                            className="flex items-start gap-2 text-sm leading-6 text-slate-600"
                                                        >
                                                            <CheckCircle2
                                                                size={15}
                                                                className="mt-1 shrink-0 text-purple-600"
                                                            />
                                                            <span>{detail}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        ))}
                                    </div>
                                </article>
                            )
                        })}
                    </div>
                </section>

                {/* Official Resources */}
                <section className="mb-10">
                    <div className="mb-5">
                        <h3 className="text-2xl font-bold text-slate-900">
                            Official Career and Opportunity Resources
                        </h3>
                        <p className="mt-1 text-sm text-slate-500">
                            Open the official websites to explore programmes, examinations and opportunities.
                        </p>
                    </div>
                    <div className="space-y-6">
                        {resourceGroups.map((group) => (
                            <article
                                key={group.title}
                                className="rounded-xl border border-slate-200 bg-white p-6"
                            >
                                <h4 className="text-lg font-bold text-slate-900">
                                    {group.title}
                                </h4>
                                <p className="mt-1 text-sm text-slate-500">
                                    {group.description}
                                </p>
                                <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                                    {group.resources.map((resource) => (
                                        <a
                                            key={resource.name}
                                            href={resource.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="group rounded-lg border border-slate-200 p-4 transition hover:border-purple-400 hover:bg-purple-50"
                                        >
                                            <div className="flex items-center justify-between gap-2">
                                                <h5 className="font-semibold text-slate-800 group-hover:text-purple-800">
                                                    {resource.name}
                                                </h5>
                                                <ExternalLink
                                                    size={15}
                                                    className="shrink-0 text-slate-400 group-hover:text-purple-700"
                                                />
                                            </div>
                                            <p className="mt-2 text-sm leading-6 text-slate-500">
                                                {resource.description}
                                            </p>
                                            <p className="mt-3 text-xs font-semibold text-purple-700">
                                                Visit Official Website
                                            </p>
                                        </a>
                                    ))}
                                </div>
                            </article>
                        ))}
                    </div>
                </section>

                {/* Important Notice */}
                <section className="mb-10 rounded-xl border border-amber-200 bg-amber-50 p-5">
                    <h3 className="font-bold text-amber-900">
                        Important: Verify Every Opportunity
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-amber-800">
                        Eligibility, application dates, fees, vacancies,
                        scholarships and examination patterns can change.
                        Always read the latest official notification before
                        applying. The resources above are starting points,
                        not confirmation that an application is currently open
                        or that you meet its eligibility requirements.
                    </p>
                </section>

                {/* Pathway Selection */}
                <section
                    id="pathway-section"
                    className="mb-10 scroll-mt-8 rounded-xl border border-slate-200 bg-white p-6"
                >
                    <div className="mb-5 flex items-center gap-3">
                        <div className="rounded-lg bg-purple-50 p-3 text-purple-700">
                            <Target size={23} />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-slate-900">
                                Choose Your Preferred Career Pathway
                            </h3>
                            <p className="text-sm text-slate-500">
                                Select the direction you want to explore further.
                            </p>
                        </div>
                    </div>
                    <div className="grid gap-3 sm:grid-cols-2">
                        {pathways.map((pathway) => (
                            <button
                                type="button"
                                key={pathway.id}
                                onClick={() =>
                                    updateField(setSelectedPathway, pathway.id)
                                }
                                aria-pressed={selectedPathway === pathway.id}
                                className={`rounded-lg border p-4 text-left transition ${selectedPathway === pathway.id
                                    ? 'border-purple-600 bg-purple-50'
                                    : 'border-slate-200 hover:border-purple-300'
                                    }`}
                            >
                                <div className="flex items-center justify-between gap-3">
                                    <span className="text-sm font-semibold text-slate-800">
                                        {pathway.title}
                                    </span>
                                    {selectedPathway === pathway.id && (
                                        <CheckCircle2
                                            size={19}
                                            className="shrink-0 text-purple-700"
                                        />
                                    )}
                                </div>
                                <p className="mt-2 text-xs leading-5 text-slate-500">
                                    {pathway.description}
                                </p>
                            </button>
                        ))}
                    </div>
                </section>

                {/* Interest Selection */}
                <section
                    id="interest-section"
                    className="mb-10 scroll-mt-8 rounded-xl border border-slate-200 bg-white p-6"
                >
                    <div className="mb-5 flex items-center gap-3">
                        <div className="rounded-lg bg-purple-50 p-3 text-purple-700">
                            <Lightbulb size={23} />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-slate-900">
                                Identify Your Area of Interest
                            </h3>
                            <p className="text-sm text-slate-500">
                                Select the field you want to develop further.
                            </p>
                        </div>
                    </div>
                    <div className="grid gap-3 sm:grid-cols-2">
                        {interestOptions.map((interest) => (
                            <button
                                type="button"
                                key={interest}
                                onClick={() =>
                                    updateField(setSelectedInterest, interest)
                                }
                                aria-pressed={selectedInterest === interest}
                                className={`flex items-center justify-between gap-3 rounded-lg border p-4 text-left text-sm transition ${selectedInterest === interest
                                    ? 'border-purple-600 bg-purple-50 font-semibold text-purple-800'
                                    : 'border-slate-200 text-slate-700 hover:border-purple-300'
                                    }`}
                            >
                                <span>{interest}</span>
                                {selectedInterest === interest && (
                                    <CheckCircle2
                                        size={18}
                                        className="shrink-0 text-purple-700"
                                    />
                                )}
                            </button>
                        ))}
                    </div>
                </section>

                {/* Action Plan */}
                <section
                    id="action-plan-section"
                    className="mb-10 scroll-mt-8 rounded-xl border border-slate-200 bg-white p-6"
                >
                    <div className="mb-5 flex items-center gap-3">
                        <div className="rounded-lg bg-purple-50 p-3 text-purple-700">
                            <Target size={23} />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-slate-900">
                                My Future Career Action Plan
                            </h3>
                            <p className="text-sm text-slate-500">
                                Convert your preferred pathway into a practical next step.
                            </p>
                        </div>
                    </div>
                    <label
                        htmlFor="career-action-plan"
                        className="mb-2 block text-sm font-semibold text-slate-700"
                    >
                        What will you do next?
                    </label>
                    <textarea
                        id="career-action-plan"
                        value={actionPlan}
                        onChange={(event) =>
                            updateField(setActionPlan, event.target.value)
                        }
                        rows={5}
                        placeholder="Example: I will research postgraduate programmes in Artificial Intelligence, compare admission requirements and prepare a list of suitable universities."
                        className="w-full resize-y rounded-lg border border-slate-300 px-4 py-3 text-sm leading-6 outline-none focus:border-purple-600 focus:ring-2 focus:ring-purple-100"
                    />
                    <p className="mt-2 text-xs text-slate-500">
                        Minimum 20 characters. {actionPlan.trim().length} characters entered.
                    </p>
                </section>

                {/* Reflection */}
                <section
                    id="reflection-section"
                    className="mb-10 scroll-mt-8 rounded-xl border border-slate-200 bg-white p-6"
                >
                    <div className="mb-5 flex items-center gap-3">
                        <div className="rounded-lg bg-purple-50 p-3 text-purple-700">
                            <BookOpen size={23} />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-slate-900">
                                Chapter Reflection
                            </h3>
                            <p className="text-sm text-slate-500">
                                Think about your long-term career direction.
                            </p>
                        </div>
                    </div>
                    <label
                        htmlFor="career-reflection"
                        className="mb-2 block text-sm font-semibold text-slate-700"
                    >
                        Which career pathway interests you most, and why?
                    </label>
                    <textarea
                        id="career-reflection"
                        value={reflection}
                        onChange={(event) =>
                            updateField(setReflection, event.target.value)
                        }
                        rows={5}
                        placeholder="Write about your preferred career direction, why it interests you, what you need to learn and how you plan to move forward..."
                        className="w-full resize-y rounded-lg border border-slate-300 px-4 py-3 text-sm leading-6 outline-none focus:border-purple-600 focus:ring-2 focus:ring-purple-100"
                    />
                    <p className="mt-2 text-xs text-slate-500">
                        Minimum 30 characters. {reflection.trim().length} characters entered.
                    </p>
                </section>

                {/* Completion Checklist */}
                <section className="mb-8 rounded-xl border border-slate-200 bg-white p-6">
                    <h3 className="text-xl font-bold text-slate-900">
                        Chapter Completion Checklist
                    </h3>
                    <p className="mb-5 mt-1 text-sm text-slate-500">
                        Complete all four requirements. Click an item to navigate to its activity.
                    </p>
                    <div className="space-y-3">
                        {requirements.map((requirement, index) => (
                            <button
                                type="button"
                                key={requirement.label}
                                onClick={() => navigateToActivity(index)}
                                className="flex w-full items-center gap-3 rounded-lg border border-slate-100 p-4 text-left transition hover:border-purple-300 hover:bg-purple-50 focus:outline-none focus:ring-2 focus:ring-purple-500"
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
                                <span className="shrink-0 text-xs font-medium text-purple-700">
                                    {requirement.complete
                                        ? 'Completed'
                                        : 'Go to activity'}
                                </span>
                            </button>
                        ))}
                    </div>

                    <div className="mt-6">
                        <div className="mb-2 flex justify-between text-xs font-medium text-slate-500">
                            <span>Chapter completion</span>
                            <span>{completedCount}/4</span>
                        </div>
                        <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                            <div
                                className="h-full rounded-full bg-purple-700 transition-all"
                                style={{
                                    width: `${(completedCount / 4) * 100}%`,
                                }}
                            />
                        </div>
                    </div>

                    <button
                        type="button"
                        onClick={saveProgress}
                        disabled={!allRequirementsMet}
                        className="mt-7 flex w-full items-center justify-center gap-2 rounded-lg bg-purple-700 px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-purple-800 disabled:cursor-not-allowed disabled:bg-slate-300"
                    >
                        <Save size={18} />
                        Save Chapter Progress
                    </button>

                    {!allRequirementsMet && (
                        <p className="mt-3 text-center text-xs text-slate-500">
                            Complete all four requirements to unlock the next chapter.
                        </p>
                    )}

                    {saved && (
                        <div className="mt-4 flex items-center gap-2 rounded-lg bg-green-50 p-4 text-sm font-medium text-green-700">
                            <CheckCircle2 size={19} />
                            Chapter 8 progress saved successfully!
                        </div>
                    )}

                    {isCompleted && !saved && (
                        <p className="mt-4 text-center text-sm font-medium text-green-700">
                            Your Chapter 8 completion has been saved.
                        </p>
                    )}
                </section>

                {/* Navigation */}
                <section className="flex flex-col justify-between gap-4 border-t border-slate-200 pt-6 sm:flex-row">
                    <Link
                        to="/student/chapter/7"
                        className="flex items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-100"
                    >
                        <ArrowLeft size={17} />
                        Previous Chapter
                    </Link>

                    {isCompleted ? (
                        <Link
                            to="/student/chapter/9"
                            className="flex items-center justify-center gap-2 rounded-lg bg-purple-700 px-5 py-3 text-sm font-semibold text-white hover:bg-purple-800"
                        >
                            Continue to Chapter 9
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
                    CAREERVERSE · Chapter 08 · Beyond Placements
                </footer>
            </main>
        </div>
    )
}
