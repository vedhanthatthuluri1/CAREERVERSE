
import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import {
    ArrowLeft,
    ArrowRight,
    BookOpen,
    Brain,
    CheckCircle2,
    ExternalLink,
    FileSearch,
    GraduationCap,
    Lightbulb,
    Search,
    ShieldCheck,
    Sparkles,
    Target,
    WandSparkles,
} from 'lucide-react'

import {
    getChapterSixToolsVisited,
    saveChapterSixToolsVisited,
    getChapterSixSelectedTools,
    saveChapterSixSelectedTools,
    getChapterSixResearchQuestion,
    saveChapterSixResearchQuestion,
    getChapterSixGeneratedPrompt,
    saveChapterSixGeneratedPrompt,
    getChapterSixVerification,
    saveChapterSixVerification,
    getChapterSixReflection,
    saveChapterSixReflection,
    isChapterCompleted,
    setChapterCompleted,
} from '../../services/storage/progressStorage'

type ResearchTool = {
    name: string
    category: string
    description: string
    purpose: string
    url: string
    logo: string
}

const tools: ResearchTool[] = [
    {
        name: 'Google Scholar',
        category: 'Academic Research',
        description: 'Discover scholarly articles, theses, books and research papers.',
        purpose: 'Academic literature discovery',
        url: 'https://scholar.google.com/',
        logo: 'GS',
    },
    {
        name: 'arXiv',
        category: 'Academic Research',
        description: 'Explore research preprints across computer science, mathematics and science.',
        purpose: 'Research paper discovery',
        url: 'https://arxiv.org/',
        logo: 'arXiv',
    },
    {
        name: 'Semantic Scholar',
        category: 'Academic Research',
        description: 'Search scientific literature and explore connections between research papers.',
        purpose: 'Research discovery',
        url: 'https://www.semanticscholar.org/',
        logo: 'SS',
    },
    {
        name: 'IEEE Xplore',
        category: 'Academic Research',
        description: 'Find technical publications, conference papers and engineering research.',
        purpose: 'Engineering research',
        url: 'https://ieeexplore.ieee.org/',
        logo: 'IEEE',
    },
    {
        name: 'PubMed',
        category: 'Academic Research',
        description: 'Search biomedical and life-science literature.',
        purpose: 'Biomedical literature',
        url: 'https://pubmed.ncbi.nlm.nih.gov/',
        logo: 'PM',
    },
    {
        name: 'Zotero',
        category: 'Research Management',
        description: 'Collect, organize, annotate and cite research sources.',
        purpose: 'Reference management',
        url: 'https://www.zotero.org/',
        logo: 'Z',
    },
    {
        name: 'Mendeley',
        category: 'Research Management',
        description: 'Manage research references and organize academic reading.',
        purpose: 'Reference management',
        url: 'https://www.mendeley.com/',
        logo: 'M',
    },
    {
        name: 'Google Colab',
        category: 'AI and Development',
        description: 'Write and execute Python notebooks in a browser-based environment.',
        purpose: 'Experiments and prototyping',
        url: 'https://colab.research.google.com/',
        logo: 'GC',
    },
    {
        name: 'Kaggle',
        category: 'AI and Development',
        description: 'Explore datasets, notebooks, machine-learning competitions and community projects.',
        purpose: 'Data science practice',
        url: 'https://www.kaggle.com/',
        logo: 'K',
    },
    {
        name: 'Hugging Face',
        category: 'AI and Development',
        description: 'Explore machine-learning models, datasets and AI applications.',
        purpose: 'AI model discovery',
        url: 'https://huggingface.co/',
        logo: 'HF',
    },
    {
        name: 'ChatGPT',
        category: 'AI Assistants',
        description: 'Use AI assistance to understand concepts, brainstorm and structure research.',
        purpose: 'Learning and research assistance',
        url: 'https://chatgpt.com/',
        logo: 'AI',
    },
    {
        name: 'Google Gemini',
        category: 'AI Assistants',
        description: 'Explore an AI assistant for learning, writing and problem-solving.',
        purpose: 'AI-assisted learning',
        url: 'https://gemini.google.com/',
        logo: 'G',
    },
    {
        name: 'Perplexity',
        category: 'AI Assistants',
        description: 'Explore answers supported by linked sources and web references.',
        purpose: 'Research exploration',
        url: 'https://www.perplexity.ai/',
        logo: 'P',
    },
    {
        name: 'NotebookLM',
        category: 'AI Assistants',
        description: 'Work with supplied documents and sources to understand information.',
        purpose: 'Source-based learning',
        url: 'https://notebooklm.google.com/',
        logo: 'N',
    },
]

const categories = [
    'All Tools',
    'Academic Research',
    'Research Management',
    'AI and Development',
    'AI Assistants',
]

const modules = [
    {
        number: '01',
        title: 'Research Fundamentals',
        description: 'Learn how to identify a problem, form a research question and investigate it systematically.',
        icon: FileSearch,
        points: [
            'Identify a problem worth investigating.',
            'Convert a broad topic into a focused research question.',
            'Distinguish primary and secondary sources.',
            'Understand the difference between evidence, opinion and assumptions.',
        ],
    },
    {
        number: '02',
        title: 'Academic Research Platforms',
        description: 'Discover where researchers find reliable academic publications, datasets and references.',
        icon: BookOpen,
        points: [
            'Use academic search engines to discover literature.',
            'Understand journals, conferences and preprints.',
            'Compare sources based on relevance and credibility.',
            'Organize references using research-management tools.',
        ],
    },
    {
        number: '03',
        title: 'AI for Learning and Research',
        description: 'Use AI assistants to support learning, idea generation, summarization and technical exploration.',
        icon: Brain,
        points: [
            'Use AI to explain unfamiliar concepts.',
            'Generate initial research ideas and keywords.',
            'Use AI to organize notes and learning materials.',
            'Understand why AI-generated information must be verified.',
        ],
    },
    {
        number: '04',
        title: 'Prompt Engineering',
        description: 'Write structured instructions that help AI tools produce useful and relevant responses.',
        icon: WandSparkles,
        points: [
            'Provide context and define the task clearly.',
            'Specify constraints and the expected output format.',
            'Ask for sources and identify uncertainty.',
            'Improve prompts through iteration.',
        ],
    },
    {
        number: '05',
        title: 'Responsible and Ethical Research',
        description: 'Build responsible research habits through source verification, privacy and academic integrity.',
        icon: ShieldCheck,
        points: [
            'Verify important claims against original sources.',
            'Check publication dates, authors and evidence.',
            'Avoid plagiarism and acknowledge sources.',
            'Protect private, confidential and personal information.',
        ],
    },
]

export default function ChapterSix() {
    const [activeCategory, setActiveCategory] = useState('All Tools')
    const [search, setSearch] = useState('')

    const [visited, setVisited] = useState<string[]>(() =>
        getChapterSixToolsVisited()
    )

    const [selectedTools, setSelectedTools] = useState<string[]>(() =>
        getChapterSixSelectedTools()
    )

    const [researchQuestion, setResearchQuestion] = useState(
        () => getChapterSixResearchQuestion()
    )

    const [role, setRole] = useState('Research assistant')
    const [topic, setTopic] = useState('')
    const [task, setTask] = useState(
        'Explain the topic and identify important research directions.'
    )
    const [output, setOutput] = useState(
        'A structured explanation with headings, examples and suggested sources.'
    )

    const [generatedPrompt, setGeneratedPrompt] = useState(
        () => getChapterSixGeneratedPrompt()
    )

    const [verification, setVerification] = useState(
        () => getChapterSixVerification()
    )

    const [reflection, setReflection] = useState(
        () => getChapterSixReflection()
    )

    const [saved, setSaved] = useState(false)

    const [chapterCompleted, setChapterCompletedState] = useState(
        () => isChapterCompleted(6)
    )

    // Persist visited research tools.
    useEffect(() => {
        saveChapterSixToolsVisited(visited)
    }, [visited])

    // Persist selected research tools.
    useEffect(() => {
        saveChapterSixSelectedTools(selectedTools)
    }, [selectedTools])

    const filteredTools = useMemo(() => {
        return tools.filter((tool) => {
            const matchesCategory =
                activeCategory === 'All Tools' ||
                tool.category === activeCategory

            const query = search.trim().toLowerCase()

            const matchesSearch =
                tool.name.toLowerCase().includes(query) ||
                tool.description.toLowerCase().includes(query) ||
                tool.purpose.toLowerCase().includes(query) ||
                tool.category.toLowerCase().includes(query)

            return matchesCategory && matchesSearch
        })
    }, [activeCategory, search])

    const toggleTool = (name: string) => {
        setSelectedTools((current) =>
            current.includes(name)
                ? current.filter((item) => item !== name)
                : [...current, name]
        )

        setSaved(false)
        setChapterCompletedState(false)
        setChapterCompleted(6, false)
    }

    const openTool = (tool: ResearchTool) => {
        setVisited((current) =>
            current.includes(tool.name)
                ? current
                : [...current, tool.name]
        )

        window.open(tool.url, '_blank', 'noopener,noreferrer')
    }

    const buildPrompt = () => {
        const prompt = [
            `Role: ${role}`,
            `Topic: ${topic || '[Enter your research topic]'}`,
            `Task: ${task}`,
            `Requirements: Use clear language, separate established facts from assumptions, and identify information that needs verification.`,
            `Expected output: ${output}`,
        ].join('\n\n')

        const promptSaved = saveChapterSixGeneratedPrompt(prompt)

        if (!promptSaved) {
            setSaved(false)
            return
        }

        setGeneratedPrompt(prompt)
        setSaved(false)
    }

    const isComplete =
        researchQuestion.trim().length >= 15 &&
        selectedTools.length >= 1 &&
        verification.trim().length >= 15 &&
        reflection.trim().length >= 15

    const progressItems = [
        researchQuestion.trim().length >= 15,
        selectedTools.length >= 1,
        verification.trim().length >= 15,
        reflection.trim().length >= 15,
    ]

    const progress = Math.round(
        (progressItems.filter(Boolean).length / progressItems.length) * 100
    )

    const saveResearchPlan = () => {
        const questionSaved = saveChapterSixResearchQuestion(
            researchQuestion
        )

        const verificationSaved = saveChapterSixVerification(
            verification
        )

        const reflectionSaved = saveChapterSixReflection(
            reflection
        )

        const toolsSaved = saveChapterSixSelectedTools(selectedTools)

        if (
            !questionSaved ||
            !verificationSaved ||
            !reflectionSaved ||
            !toolsSaved
        ) {
            setSaved(false)
            return
        }

        const completionSaved = setChapterCompleted(6, isComplete)

        if (!completionSaved) {
            setSaved(false)
            return
        }

        setChapterCompletedState(isComplete)
        setSaved(true)
    }

    return (
        <div className="min-h-screen bg-slate-950 text-slate-100">
            <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">

                {/* Header */}
                <div className="mb-8">
                    <Link
                        to="/student/dashboard"
                        className="mb-6 inline-flex items-center gap-2 text-sm text-slate-400 transition hover:text-white"
                    >
                        <ArrowLeft size={16} />
                        Back to Dashboard
                    </Link>

                    <div className="overflow-hidden rounded-3xl border border-indigo-400/20 bg-gradient-to-br from-indigo-950 via-slate-900 to-slate-900 p-6 sm:p-10">
                        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-center">
                            <div className="max-w-3xl">
                                <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-indigo-400/30 bg-indigo-400/10 px-3 py-1 text-xs font-semibold text-indigo-300">
                                    <Sparkles size={14} />
                                    CHAPTER 06
                                </div>

                                <h1 className="text-3xl font-bold tracking-tight sm:text-5xl">
                                    Research and AI
                                </h1>

                                <p className="mt-4 max-w-2xl text-base leading-7 text-slate-300">
                                    Learn to discover credible information, explore research platforms,
                                    work effectively with AI and build responsible research habits.
                                </p>

                                <div className="mt-6 flex flex-wrap gap-3 text-sm text-slate-300">
                                    <span className="rounded-lg bg-white/5 px-3 py-2">
                                        5 Learning Modules
                                    </span>
                                    <span className="rounded-lg bg-white/5 px-3 py-2">
                                        Interactive Activities
                                    </span>
                                    <span className="rounded-lg bg-white/5 px-3 py-2">
                                        Practical Research Plan
                                    </span>
                                </div>
                            </div>

                            <div className="flex h-28 w-28 shrink-0 items-center justify-center self-start rounded-3xl border border-indigo-300/20 bg-indigo-400/10 lg:self-center">
                                <Brain size={58} className="text-indigo-300" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Objectives */}
                <section className="mb-10">
                    <div className="mb-4 flex items-center gap-2">
                        <Target className="text-indigo-400" size={21} />
                        <h2 className="text-xl font-bold">
                            What You Will Learn
                        </h2>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                        {[
                            'Find and evaluate credible research sources.',
                            'Explore academic and AI-powered platforms.',
                            'Write clear and effective AI prompts.',
                            'Apply responsible research practices.',
                        ].map((item, index) => (
                            <div
                                key={item}
                                className="rounded-2xl border border-slate-800 bg-slate-900 p-5"
                            >
                                <span className="mb-3 flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-500/15 text-sm font-bold text-indigo-300">
                                    0{index + 1}
                                </span>

                                <p className="text-sm leading-6 text-slate-300">
                                    {item}
                                </p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Learning modules */}
                <section className="mb-12">
                    <div className="mb-5">
                        <h2 className="text-2xl font-bold">
                            Learning Modules
                        </h2>

                        <p className="mt-2 text-sm text-slate-400">
                            Work through each topic and apply the concepts in the activities below.
                        </p>
                    </div>

                    <div className="grid gap-4 lg:grid-cols-2">
                        {modules.map((module) => {
                            const Icon = module.icon

                            return (
                                <article
                                    key={module.number}
                                    className="rounded-2xl border border-slate-800 bg-slate-900 p-6"
                                >
                                    <div className="mb-4 flex items-start gap-4">
                                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-indigo-500/15 text-indigo-300">
                                            <Icon size={24} />
                                        </div>

                                        <div>
                                            <p className="text-xs font-semibold tracking-widest text-indigo-400">
                                                MODULE {module.number}
                                            </p>

                                            <h3 className="mt-1 text-lg font-bold">
                                                {module.title}
                                            </h3>

                                            <p className="mt-2 text-sm leading-6 text-slate-400">
                                                {module.description}
                                            </p>
                                        </div>
                                    </div>

                                    <ul className="space-y-3 border-t border-slate-800 pt-4">
                                        {module.points.map((point) => (
                                            <li
                                                key={point}
                                                className="flex gap-3 text-sm leading-6 text-slate-300"
                                            >
                                                <CheckCircle2
                                                    size={17}
                                                    className="mt-0.5 shrink-0 text-emerald-400"
                                                />
                                                {point}
                                            </li>
                                        ))}
                                    </ul>
                                </article>
                            )
                        })}
                    </div>
                </section>

                {/* Research tools directory */}
                <section className="mb-12" id="research-tools">
                    <div className="mb-5 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
                        <div>
                            <p className="text-sm font-semibold text-indigo-400">
                                EXPLORE AND EXPERIENCE
                            </p>

                            <h2 className="mt-1 text-2xl font-bold">
                                Research and AI Tools Directory
                            </h2>

                            <p className="mt-2 text-sm text-slate-400">
                                Open each platform to explore its features. Select the tools you intend to use.
                            </p>
                        </div>

                        <div className="text-sm text-slate-400">
                            Visited:{' '}
                            <span className="font-bold text-white">
                                {visited.length}/{tools.length}
                            </span>
                        </div>
                    </div>

                    <div className="mb-5 flex flex-col gap-3">
                        <div className="relative">
                            <Search
                                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
                                size={18}
                            />

                            <input
                                value={search}
                                onChange={(event) => setSearch(event.target.value)}
                                placeholder="Search research and AI platforms..."
                                className="w-full rounded-xl border border-slate-800 bg-slate-900 py-3 pl-11 pr-4 text-sm text-white outline-none transition focus:border-indigo-500"
                            />
                        </div>

                        <div className="flex gap-2 overflow-x-auto pb-2">
                            {categories.map((category) => (
                                <button
                                    key={category}
                                    type="button"
                                    onClick={() => setActiveCategory(category)}
                                    className={`whitespace-nowrap rounded-full px-4 py-2 text-xs font-semibold transition ${activeCategory === category
                                            ? 'bg-indigo-500 text-white'
                                            : 'border border-slate-700 bg-slate-900 text-slate-400 hover:border-indigo-400 hover:text-white'
                                        }`}
                                >
                                    {category}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {filteredTools.map((tool) => {
                            const isSelected = selectedTools.includes(tool.name)
                            const isVisited = visited.includes(tool.name)

                            return (
                                <article
                                    key={tool.name}
                                    className="flex flex-col rounded-2xl border border-slate-800 bg-slate-900 p-5 transition hover:border-indigo-500/50"
                                >
                                    <div className="mb-4 flex items-center justify-between">
                                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-500/15 text-sm font-bold text-indigo-300">
                                            {tool.logo}
                                        </div>

                                        {isVisited && (
                                            <span className="flex items-center gap-1 text-xs text-emerald-400">
                                                <CheckCircle2 size={14} />
                                                Visited
                                            </span>
                                        )}
                                    </div>

                                    <h3 className="text-lg font-bold">
                                        {tool.name}
                                    </h3>

                                    <p className="mt-1 text-xs font-semibold text-indigo-400">
                                        {tool.category}
                                    </p>

                                    <p className="mt-3 flex-1 text-sm leading-6 text-slate-400">
                                        {tool.description}
                                    </p>

                                    <p className="mt-3 text-xs text-slate-500">
                                        Purpose: {tool.purpose}
                                    </p>

                                    <div className="mt-5 flex gap-2">
                                        <button
                                            type="button"
                                            onClick={() => openTool(tool)}
                                            className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-indigo-500 px-3 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-400"
                                        >
                                            Explore
                                            <ExternalLink size={15} />
                                        </button>

                                        <button
                                            type="button"
                                            onClick={() => toggleTool(tool.name)}
                                            aria-pressed={isSelected}
                                            className={`rounded-xl border px-3 py-2.5 text-xs font-semibold transition ${isSelected
                                                    ? 'border-emerald-500/40 bg-emerald-500/10 text-emerald-400'
                                                    : 'border-slate-700 text-slate-300 hover:border-indigo-400'
                                                }`}
                                        >
                                            {isSelected ? 'Selected' : 'Select'}
                                        </button>
                                    </div>
                                </article>
                            )
                        })}
                    </div>

                    {filteredTools.length === 0 && (
                        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-8 text-center text-slate-400">
                            No matching tools found. Try another search.
                        </div>
                    )}

                    <div className="mt-4 rounded-xl border border-indigo-500/20 bg-indigo-500/5 p-4 text-sm text-slate-300">
                        <strong className="text-indigo-300">
                            {selectedTools.length} tools selected.
                        </strong>
                        {' '}Choose tools that are relevant to your learning and research goals.
                    </div>
                </section>

                {/* Prompt builder */}
                <section className="mb-12">
                    <div className="mb-5">
                        <p className="text-sm font-semibold text-indigo-400">
                            PRACTICAL ACTIVITY 01
                        </p>

                        <h2 className="mt-1 text-2xl font-bold">
                            AI Prompt Builder
                        </h2>

                        <p className="mt-2 text-sm text-slate-400">
                            Build a structured prompt using role, context, task and expected output.
                        </p>
                    </div>

                    <div className="grid gap-6 lg:grid-cols-2">
                        <div className="space-y-4 rounded-2xl border border-slate-800 bg-slate-900 p-6">
                            <div>
                                <label className="mb-2 block text-sm font-semibold text-slate-300">
                                    AI role
                                </label>

                                <select
                                    value={role}
                                    onChange={(event) => setRole(event.target.value)}
                                    className="w-full rounded-xl border border-slate-700 bg-slate-950 p-3 text-sm text-white outline-none focus:border-indigo-500"
                                >
                                    <option>Research assistant</option>
                                    <option>Computer science tutor</option>
                                    <option>Data science mentor</option>
                                    <option>Academic writing assistant</option>
                                    <option>Software development mentor</option>
                                </select>
                            </div>

                            <div>
                                <label className="mb-2 block text-sm font-semibold text-slate-300">
                                    Research topic
                                </label>

                                <input
                                    value={topic}
                                    onChange={(event) => setTopic(event.target.value)}
                                    placeholder="Example: Applications of machine learning in education"
                                    className="w-full rounded-xl border border-slate-700 bg-slate-950 p-3 text-sm text-white outline-none focus:border-indigo-500"
                                />
                            </div>

                            <div>
                                <label className="mb-2 block text-sm font-semibold text-slate-300">
                                    Task
                                </label>

                                <textarea
                                    value={task}
                                    onChange={(event) => setTask(event.target.value)}
                                    rows={3}
                                    className="w-full rounded-xl border border-slate-700 bg-slate-950 p-3 text-sm text-white outline-none focus:border-indigo-500"
                                />
                            </div>

                            <div>
                                <label className="mb-2 block text-sm font-semibold text-slate-300">
                                    Expected output
                                </label>

                                <textarea
                                    value={output}
                                    onChange={(event) => setOutput(event.target.value)}
                                    rows={3}
                                    className="w-full rounded-xl border border-slate-700 bg-slate-950 p-3 text-sm text-white outline-none focus:border-indigo-500"
                                />
                            </div>

                            <button
                                type="button"
                                onClick={buildPrompt}
                                className="flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-500 px-4 py-3 text-sm font-bold text-white transition hover:bg-indigo-400"
                            >
                                <WandSparkles size={17} />
                                Generate Prompt
                            </button>
                        </div>

                        <div className="rounded-2xl border border-indigo-500/20 bg-indigo-500/5 p-6">
                            <div className="mb-4 flex items-center gap-2">
                                <Sparkles className="text-indigo-300" size={19} />
                                <h3 className="font-bold">
                                    Your Generated Prompt
                                </h3>
                            </div>

                            {generatedPrompt ? (
                                <>
                                    <pre className="min-h-64 whitespace-pre-wrap rounded-xl border border-slate-700 bg-slate-950 p-4 font-sans text-sm leading-7 text-slate-300">
                                        {generatedPrompt}
                                    </pre>

                                    <button
                                        type="button"
                                        onClick={() =>
                                            navigator.clipboard.writeText(generatedPrompt)
                                        }
                                        className="mt-4 rounded-xl border border-indigo-400/30 px-4 py-2 text-sm font-semibold text-indigo-300 hover:bg-indigo-500/10"
                                    >
                                        Copy Prompt
                                    </button>
                                </>
                            ) : (
                                <div className="flex min-h-64 flex-col items-center justify-center text-center text-slate-500">
                                    <Lightbulb
                                        size={36}
                                        className="mb-3 text-indigo-400"
                                    />

                                    <p className="text-sm">
                                        Your prompt will appear here.
                                    </p>

                                    <p className="mt-2 text-xs">
                                        Complete the fields and generate your prompt.
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </section>

                {/* Source verification */}
                <section className="mb-12">
                    <div className="mb-5">
                        <p className="text-sm font-semibold text-indigo-400">
                            PRACTICAL ACTIVITY 02
                        </p>

                        <h2 className="mt-1 text-2xl font-bold">
                            Source Verification Exercise
                        </h2>

                        <p className="mt-2 text-sm text-slate-400">
                            Before using information in a project or assignment, evaluate its reliability.
                        </p>
                    </div>

                    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
                        <div className="grid gap-4 sm:grid-cols-2">
                            {[
                                ['Author', 'Is the author identifiable and qualified?'],
                                ['Publication', 'Is the publisher or platform trustworthy?'],
                                ['Date', 'Is the information current enough for this topic?'],
                                ['Evidence', 'Are claims supported by data or references?'],
                                ['Purpose', 'Is the source informing, persuading or advertising?'],
                                ['Cross-check', 'Can the important claims be confirmed elsewhere?'],
                            ].map(([title, description]) => (
                                <div
                                    key={title}
                                    className="rounded-xl border border-slate-800 bg-slate-950 p-4"
                                >
                                    <h3 className="font-bold text-indigo-300">
                                        {title}
                                    </h3>

                                    <p className="mt-2 text-sm leading-6 text-slate-400">
                                        {description}
                                    </p>
                                </div>
                            ))}
                        </div>

                        <div className="mt-6">
                            <label className="mb-2 block text-sm font-semibold text-slate-300">
                                Exercise: Explain how you would verify an AI-generated research claim before including it in an assignment.
                            </label>

                            <textarea
                                value={verification}
                                onChange={(event) => {
                                    setVerification(event.target.value)
                                    setSaved(false)
                                }}
                                rows={4}
                                placeholder="Describe how you would locate the original source, check its author and date, examine the evidence and compare it with independent sources..."
                                className="w-full rounded-xl border border-slate-700 bg-slate-950 p-4 text-sm leading-6 text-white outline-none focus:border-indigo-500"
                            />
                        </div>
                    </div>
                </section>

                {/* Research plan */}
                <section className="mb-12">
                    <div className="mb-5">
                        <p className="text-sm font-semibold text-indigo-400">
                            FINAL PRACTICAL ACTIVITY
                        </p>

                        <h2 className="mt-1 text-2xl font-bold">
                            Create Your Research Plan
                        </h2>

                        <p className="mt-2 text-sm text-slate-400">
                            Apply what you learned by preparing a research question and selecting suitable tools.
                        </p>
                    </div>

                    <div className="grid gap-6 lg:grid-cols-[1fr_300px]">
                        <div className="space-y-5 rounded-2xl border border-slate-800 bg-slate-900 p-6">
                            <div>
                                <label className="mb-2 block text-sm font-semibold text-slate-300">
                                    1. Write your research question
                                </label>

                                <textarea
                                    value={researchQuestion}
                                    onChange={(event) => {
                                        setResearchQuestion(event.target.value)
                                        setSaved(false)
                                    }}
                                    rows={3}
                                    placeholder="Example: How can machine learning help identify students who may need additional academic support?"
                                    className="w-full rounded-xl border border-slate-700 bg-slate-950 p-4 text-sm leading-6 text-white outline-none focus:border-indigo-500"
                                />
                            </div>

                            <div>
                                <label className="mb-2 block text-sm font-semibold text-slate-300">
                                    2. Select the research tools you plan to use
                                </label>

                                <p className="text-sm text-slate-400">
                                    Select at least one tool from the directory above.
                                </p>

                                <div className="mt-3 flex flex-wrap gap-2">
                                    {selectedTools.map((name) => (
                                        <span
                                            key={name}
                                            className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1.5 text-xs text-emerald-300"
                                        >
                                            {name}
                                        </span>
                                    ))}

                                    {selectedTools.length === 0 && (
                                        <span className="text-xs text-slate-500">
                                            No tools selected yet.
                                        </span>
                                    )}
                                </div>
                            </div>

                            <div>
                                <label className="mb-2 block text-sm font-semibold text-slate-300">
                                    3. Explain how you will verify your findings
                                </label>

                                <p className="text-sm text-slate-400">
                                    Describe how you will check source credibility and validate important claims.
                                </p>
                            </div>

                            <div>
                                <label className="mb-2 block text-sm font-semibold text-slate-300">
                                    4. What did you learn from this chapter?
                                </label>

                                <textarea
                                    value={reflection}
                                    onChange={(event) => {
                                        setReflection(event.target.value)
                                        setSaved(false)
                                    }}
                                    rows={4}
                                    placeholder="Reflect on the research tools, AI skills and responsible practices you learned..."
                                    className="w-full rounded-xl border border-slate-700 bg-slate-950 p-4 text-sm leading-6 text-white outline-none focus:border-indigo-500"
                                />
                            </div>

                            <button
                                type="button"
                                onClick={saveResearchPlan}
                                className="flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-500 px-5 py-3 font-bold text-white transition hover:bg-indigo-400"
                            >
                                <CheckCircle2 size={18} />
                                Save Research Plan
                            </button>

                            {saved && (
                                <p
                                    className={`text-sm ${isComplete
                                            ? 'text-emerald-400'
                                            : 'text-amber-400'
                                        }`}
                                >
                                    {isComplete
                                        ? 'Your research plan has been saved and Chapter 6 is complete.'
                                        : 'Your entries have been saved. Complete all four requirements to finish this chapter.'}
                                </p>
                            )}
                        </div>

                        <aside className="h-fit rounded-2xl border border-slate-800 bg-slate-900 p-6">
                            <div className="mb-4 flex items-center gap-2">
                                <GraduationCap
                                    className="text-indigo-400"
                                    size={22}
                                />

                                <h3 className="font-bold">
                                    Chapter Progress
                                </h3>
                            </div>

                            <div className="mb-3 flex items-end justify-between">
                                <span className="text-3xl font-bold">
                                    {progress}%
                                </span>

                                <span className="text-xs text-slate-500">
                                    Activity completion
                                </span>
                            </div>

                            <div className="h-2 overflow-hidden rounded-full bg-slate-800">
                                <div
                                    className="h-full rounded-full bg-indigo-500 transition-all"
                                    style={{ width: `${progress}%` }}
                                />
                            </div>

                            <div className="mt-6 space-y-4">
                                {[
                                    'Research question',
                                    'Tools selected',
                                    'Verification response',
                                    'Chapter reflection',
                                ].map((item, index) => (
                                    <div
                                        key={item}
                                        className="flex items-center gap-3 text-sm"
                                    >
                                        {progressItems[index] ? (
                                            <CheckCircle2
                                                size={17}
                                                className="text-emerald-400"
                                            />
                                        ) : (
                                            <span className="h-4 w-4 rounded-full border border-slate-600" />
                                        )}

                                        <span
                                            className={
                                                progressItems[index]
                                                    ? 'text-slate-200'
                                                    : 'text-slate-500'
                                            }
                                        >
                                            {item}
                                        </span>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-6 rounded-xl border border-slate-700 bg-slate-950 p-4">
                                <p className="text-xs leading-6 text-slate-400">
                                    Your progress is stored in this browser. It is not yet synchronized with Google Sheets.
                                </p>
                            </div>
                        </aside>
                    </div>
                </section>

                {/* Completion and navigation */}
                <section className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
                    <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
                        <div>
                            <h2 className="text-xl font-bold">
                                Chapter 6 Completion
                            </h2>

                            <p className="mt-2 text-sm text-slate-400">
                                Complete and save all four practical requirements to mark this chapter complete.
                            </p>

                            {chapterCompleted && (
                                <p className="mt-3 flex items-center gap-2 text-sm font-semibold text-emerald-400">
                                    <CheckCircle2 size={17} />
                                    Chapter completed
                                </p>
                            )}
                        </div>

                        <Link
                            to="/student/chapter/7"
                            aria-disabled={!chapterCompleted}
                            onClick={(event) => {
                                if (!chapterCompleted) {
                                    event.preventDefault()
                                }
                            }}
                            className={`inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-bold transition ${chapterCompleted
                                    ? 'bg-indigo-500 text-white hover:bg-indigo-400'
                                    : 'pointer-events-none bg-slate-800 text-slate-500'
                                }`}
                        >
                            Continue to Chapter 7
                            <ArrowRight size={17} />
                        </Link>
                    </div>
                </section>

                <div className="mt-8 flex justify-between border-t border-slate-800 pt-6 text-sm">
                    <Link
                        to="/student/chapter/5"
                        className="flex items-center gap-2 text-slate-400 hover:text-white"
                    >
                        <ArrowLeft size={16} />
                        Previous Chapter
                    </Link>

                    <Link
                        to="/student/dashboard"
                        className="text-slate-400 hover:text-white"
                    >
                        Dashboard
                    </Link>
                </div>
            </div>
        </div>
    )
}
