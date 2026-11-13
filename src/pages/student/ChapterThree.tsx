
import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
    ArrowLeft,
    ArrowRight,
    BookOpen,
    CheckCircle2,
    ClipboardList,
    Code2,
    Cloud,
    GraduationCap,
    Lightbulb,
    Search,
    ShieldCheck,
    Smartphone,
    Target,
    Brain,
    Cpu,
    TestTube,
    Rocket,
    BarChart3,
} from 'lucide-react'

type Domain = {
    id: number
    title: string
    description: string
    icon: typeof Code2
    beginner: string
    intermediate: string
    advanced: string
    tools: string[]
    project: string
    weeklyAction: string
}

const domains: Domain[] = [
    {
        id: 1,
        title: 'Software Development and Full Stack',
        description:
            'Design and develop websites, applications, APIs and complete software systems.',
        icon: Code2,
        beginner: 'Learn HTML, CSS, JavaScript, Git and one programming language.',
        intermediate:
            'Explore React, Node.js or Django, databases, REST APIs, authentication and application architecture.',
        advanced:
            'Learn system design, caching, queues, automated testing, deployment and application security.',
        tools: ['HTML', 'CSS', 'JavaScript', 'React', 'Node.js', 'Python', 'SQL', 'Git'],
        project:
            'Build a full-stack application with user login, database integration, an admin dashboard and deployment.',
        weeklyAction: 'Create and publish one responsive web page.',
    },
    {
        id: 2,
        title: 'Mobile App Development',
        description:
            'Build applications for smartphones and create useful mobile experiences.',
        icon: Smartphone,
        beginner: 'Explore Kotlin for Android or Flutter and Dart fundamentals.',
        intermediate:
            'Learn UI development, state management, APIs, local storage and navigation.',
        advanced:
            'Explore offline-first applications, performance optimization, testing and app-store publishing.',
        tools: ['Kotlin', 'Flutter', 'Dart', 'Android Studio', 'Firebase concepts', 'REST APIs'],
        project:
            'Develop a mobile application with authentication, multiple screens and persistent data.',
        weeklyAction: 'Build one functional mobile application screen.',
    },
    {
        id: 3,
        title: 'Data Science and Analytics',
        description:
            'Use data, statistics and visualizations to discover patterns and support decisions.',
        icon: BarChart3,
        beginner: 'Learn Python, Excel, SQL, basic statistics and data handling.',
        intermediate:
            'Explore Pandas, NumPy, data visualization, Power BI or Tableau and exploratory analysis.',
        advanced:
            'Study A/B testing, data pipelines, advanced analytics and dashboard development.',
        tools: ['Python', 'Excel', 'SQL', 'Pandas', 'NumPy', 'Power BI', 'Tableau'],
        project:
            'Analyze a public dataset and build a dashboard with clear, actionable findings.',
        weeklyAction: 'Answer one practical question using a public dataset.',
    },
    {
        id: 4,
        title: 'Machine Learning and AI',
        description:
            'Develop systems that learn from data and make predictions or support decisions.',
        icon: Brain,
        beginner: 'Learn Python, linear algebra, probability, statistics and basic data processing.',
        intermediate:
            'Explore Scikit-learn, feature engineering, model evaluation and PyTorch fundamentals.',
        advanced:
            'Study deep learning, experiment tracking, research papers and model deployment.',
        tools: ['Python', 'NumPy', 'Pandas', 'Scikit-learn', 'PyTorch', 'TensorFlow'],
        project:
            'Build, evaluate and deploy an end-to-end machine learning model with documented results.',
        weeklyAction: 'Train and evaluate one beginner machine learning model.',
    },
    {
        id: 5,
        title: 'Generative AI and LLMs',
        description:
            'Build applications using large language models, retrieval systems and AI workflows.',
        icon: Lightbulb,
        beginner: 'Understand prompting, model APIs, limitations and output verification.',
        intermediate:
            'Explore embeddings, vector databases, retrieval-augmented generation and evaluation.',
        advanced:
            'Study AI agents, fine-tuning concepts, guardrails, latency and cost optimization.',
        tools: ['Python', 'LLM APIs', 'Hugging Face', 'LangChain', 'Vector databases', 'Gradio'],
        project:
            'Build a document question-answering application and measure the accuracy of its responses.',
        weeklyAction: 'Build a small demonstration using a Hugging Face pipeline.',
    },
    {
        id: 6,
        title: 'Cybersecurity',
        description:
            'Understand how to protect applications, networks and information systems.',
        icon: ShieldCheck,
        beginner: 'Learn Linux, networking fundamentals, scripting and security basics.',
        intermediate:
            'Study OWASP Top 10, web security, Burp Suite and authorized practice labs.',
        advanced:
            'Explore CTF challenges, cloud security, security analysis and responsible vulnerability reporting.',
        tools: ['Linux', 'Python', 'Networking', 'Burp Suite', 'Wireshark', 'TryHackMe'],
        project:
            'Complete a legal practice lab and prepare a technical write-up explaining the findings.',
        weeklyAction: 'Complete one beginner cybersecurity learning lab.',
    },
    {
        id: 7,
        title: 'Cloud Computing and DevOps',
        description:
            'Deploy applications and automate software delivery and infrastructure operations.',
        icon: Cloud,
        beginner: 'Learn Linux, Git, networking and the fundamentals of one cloud provider.',
        intermediate:
            'Explore Docker, CI/CD pipelines, cloud deployment and infrastructure basics.',
        advanced:
            'Study Kubernetes, Terraform, monitoring, reliability and cloud cost management.',
        tools: ['Linux', 'Git', 'Docker', 'GitHub Actions', 'AWS', 'Azure', 'Terraform', 'Kubernetes'],
        project:
            'Deploy an application using Docker and automate its deployment through a CI/CD pipeline.',
        weeklyAction: 'Dockerize one small application.',
    },
    {
        id: 8,
        title: 'Embedded Systems, IoT and VLSI',
        description:
            'Work with electronics, microcontrollers, connected devices and digital hardware design.',
        icon: Cpu,
        beginner: 'Learn C, digital electronics, Arduino fundamentals and datasheets.',
        intermediate:
            'Explore ESP32 or STM32, communication protocols such as I2C, SPI and UART, and RTOS basics.',
        advanced:
            'Study Verilog or VHDL, FPGA development, low-power design and hardware debugging.',
        tools: ['C', 'Arduino', 'ESP32', 'STM32', 'Verilog', 'VHDL', 'FPGA'],
        project:
            'Build a sensor-based device that collects data and communicates with a software application.',
        weeklyAction: 'Complete a basic LED or sensor programming exercise.',
    },
    {
        id: 9,
        title: 'Quality Assurance and SDET',
        description:
            'Improve software quality through systematic testing and automation.',
        icon: TestTube,
        beginner: 'Learn software testing fundamentals, test cases and bug reporting.',
        intermediate:
            'Explore Selenium or Playwright, API testing and Postman.',
        advanced:
            'Build automation frameworks and explore CI integration and performance testing.',
        tools: ['Java', 'Python', 'Selenium', 'Playwright', 'Postman', 'Jest'],
        project:
            'Create an automated end-to-end test suite for a web application.',
        weeklyAction: 'Write ten test cases for an application you use.',
    },
]

const coreBranches = [
    {
        branch: 'Mechanical Engineering',
        tools: 'AutoCAD, SolidWorks, CATIA and ANSYS',
        focus: 'CAD modelling, design, simulation and manufacturing.',
    },
    {
        branch: 'Civil Engineering',
        tools: 'AutoCAD, STAAD.Pro, ETABS, Revit and Primavera',
        focus: 'Structural design, construction planning and BIM.',
    },
    {
        branch: 'Electrical Engineering',
        tools: 'MATLAB, Simulink, PLC and SCADA',
        focus: 'Power systems, control systems and automation.',
    },
    {
        branch: 'Electronics Engineering',
        tools: 'Embedded C, PCB design, Verilog and VHDL',
        focus: 'Circuit design, embedded systems and VLSI.',
    },
]

const explorationSteps = [
    {
        week: 'Week 1',
        title: 'Explore the first domain',
        description: 'Complete a beginner lesson and build one small practical exercise.',
    },
    {
        week: 'Week 2',
        title: 'Explore the second domain',
        description: 'Try another domain through a beginner lesson and a tiny project.',
    },
    {
        week: 'Week 3',
        title: 'Talk to practitioners',
        description: 'Speak with three students, alumni or professionals from each domain, if possible.',
    },
    {
        week: 'Week 4',
        title: 'Compare and decide',
        description: 'Score both domains, review your experience and choose one direction to explore for six months.',
    },
]

const scoreCriteria = [
    'How much do I enjoy working in this domain?',
    'Can I see myself learning and growing in this field?',
    'Are there relevant opportunities in current job listings?',
    'Does the learning difficulty fit my interests and current foundation?',
]

const checklistItems = [
    'Identify two domains that interest me.',
    'Complete a beginner lesson in each domain.',
    'Build or attempt one small project in each domain.',
    'Talk to students, alumni or professionals.',
    'Compare my domain selection scores.',
    'Choose one domain to explore consistently for six months.',
]

export default function ChapterThree() {
    const [scores, setScores] = useState<number[]>([0, 0, 0, 0])
    const [reflection, setReflection] = useState('')
    const [completedSteps, setCompletedSteps] = useState<number[]>([])

    const updateScore = (index: number, value: number) => {
        setScores((current) =>
            current.map((score, i) => (i === index ? value : score)),
        )
    }

    const toggleStep = (index: number) => {
        setCompletedSteps((current) =>
            current.includes(index)
                ? current.filter((step) => step !== index)
                : [...current, index],
        )
    }

    const totalScore = scores.reduce((sum, score) => sum + score, 0)

    return (
        <div className="min-h-screen bg-slate-50">
            <header className="border-b border-slate-200 bg-white">
                <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
                    <div>
                        <h1 className="text-xl font-bold text-blue-700">CAREERVERSE</h1>
                        <p className="text-xs text-slate-500">Chapter 03 · Domains and Tools</p>
                    </div>

                    <Link
                        to="/student/dashboard"
                        className="flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-blue-700"
                    >
                        <ArrowLeft size={17} />
                        Dashboard
                    </Link>
                </div>
            </header>

            <main className="mx-auto max-w-7xl px-6 py-10">
                {/* Hero */}
                <section className="rounded-3xl bg-gradient-to-r from-blue-950 via-blue-800 to-blue-600 p-8 text-white md:p-12">
                    <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-blue-200">
                        <Search size={17} />
                        Career Exploration
                    </div>

                    <h2 className="mt-5 max-w-3xl text-4xl font-bold leading-tight md:text-5xl">
                        Discover Your Domain. Build Your Direction.
                    </h2>

                    <p className="mt-5 max-w-2xl text-base leading-8 text-blue-100 md:text-lg">
                        Engineering offers many career paths. Explore different domains,
                        understand their tools, experiment with practical projects and
                        identify the direction that matches your interests.
                    </p>

                    <div className="mt-8 flex flex-wrap gap-3">
                        <span className="rounded-full bg-white/15 px-4 py-2 text-sm">
                            9 Technology Domains
                        </span>
                        <span className="rounded-full bg-white/15 px-4 py-2 text-sm">
                            Core Engineering Paths
                        </span>
                        <span className="rounded-full bg-white/15 px-4 py-2 text-sm">
                            4-Week Exploration Plan
                        </span>
                    </div>
                </section>

                {/* Objectives */}
                <section className="mt-10">
                    <div className="mb-5 flex items-center gap-3">
                        <Target className="text-blue-700" size={24} />
                        <h3 className="text-2xl font-bold text-slate-900">
                            What You Will Learn
                        </h3>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                        {[
                            'Understand different engineering career domains.',
                            'Identify the tools and skills used in each domain.',
                            'Compare beginner, intermediate and advanced learning paths.',
                            'Choose a domain through practical experimentation.',
                        ].map((item, index) => (
                            <div
                                key={index}
                                className="rounded-xl border border-slate-200 bg-white p-5"
                            >
                                <CheckCircle2 className="mb-3 text-blue-600" size={21} />
                                <p className="text-sm leading-6 text-slate-600">{item}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Domain Selection Guidance */}
                <section className="mt-12 rounded-2xl border border-blue-100 bg-blue-50 p-6 md:p-8">
                    <div className="flex items-center gap-3">
                        <Lightbulb className="text-blue-700" size={25} />
                        <h3 className="text-xl font-bold text-slate-900">
                            First, Understand How to Choose a Domain
                        </h3>
                    </div>

                    <p className="mt-4 leading-7 text-slate-700">
                        Do not choose a domain only because it is popular, because a
                        friend selected it or because of a salary headline. Explore the
                        work, understand the learning requirements and evaluate your own
                        interest.
                    </p>

                    <div className="mt-5 grid gap-4 md:grid-cols-3">
                        {[
                            {
                                title: 'Interest',
                                description: 'Do you enjoy solving the problems this domain involves?',
                            },
                            {
                                title: 'Growth',
                                description: 'Are you willing to keep learning as the field develops?',
                            },
                            {
                                title: 'Opportunity',
                                description: 'Can you identify relevant roles and real-world applications?',
                            },
                        ].map((item) => (
                            <div key={item.title} className="rounded-xl bg-white p-5">
                                <h4 className="font-bold text-blue-800">{item.title}</h4>
                                <p className="mt-2 text-sm leading-6 text-slate-600">
                                    {item.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Technology Domains */}
                <section className="mt-12">
                    <div className="mb-6">
                        <p className="text-sm font-semibold uppercase tracking-widest text-blue-600">
                            Explore the possibilities
                        </p>
                        <h3 className="mt-2 text-3xl font-bold text-slate-900">
                            Technology Career Domains
                        </h3>
                        <p className="mt-3 max-w-3xl leading-7 text-slate-500">
                            Each domain has a different learning path. Start with its
                            fundamentals, build practical experience and gradually advance.
                        </p>
                    </div>

                    <div className="grid gap-6 lg:grid-cols-2">
                        {domains.map((domain) => {
                            const Icon = domain.icon

                            return (
                                <article
                                    key={domain.id}
                                    className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
                                >
                                    <div className="flex items-start gap-4">
                                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-700">
                                            <Icon size={25} />
                                        </div>

                                        <div>
                                            <p className="text-xs font-semibold uppercase tracking-wider text-blue-600">
                                                Domain {String(domain.id).padStart(2, '0')}
                                            </p>
                                            <h4 className="mt-1 text-xl font-bold text-slate-900">
                                                {domain.title}
                                            </h4>
                                            <p className="mt-2 text-sm leading-6 text-slate-500">
                                                {domain.description}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="mt-6 space-y-4">
                                        <div>
                                            <p className="text-sm font-bold text-slate-800">
                                                Beginner
                                            </p>
                                            <p className="mt-1 text-sm leading-6 text-slate-600">
                                                {domain.beginner}
                                            </p>
                                        </div>

                                        <div>
                                            <p className="text-sm font-bold text-slate-800">
                                                Intermediate
                                            </p>
                                            <p className="mt-1 text-sm leading-6 text-slate-600">
                                                {domain.intermediate}
                                            </p>
                                        </div>

                                        <div>
                                            <p className="text-sm font-bold text-slate-800">
                                                Advanced
                                            </p>
                                            <p className="mt-1 text-sm leading-6 text-slate-600">
                                                {domain.advanced}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="mt-5 border-t border-slate-100 pt-5">
                                        <p className="text-sm font-bold text-slate-800">
                                            Important Tools
                                        </p>
                                        <div className="mt-3 flex flex-wrap gap-2">
                                            {domain.tools.map((tool) => (
                                                <span
                                                    key={tool}
                                                    className="rounded-full bg-slate-100 px-3 py-1.5 text-xs font-medium text-slate-600"
                                                >
                                                    {tool}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="mt-5 rounded-xl bg-blue-50 p-4">
                                        <p className="text-sm font-bold text-blue-900">
                                            Portfolio Project
                                        </p>
                                        <p className="mt-2 text-sm leading-6 text-blue-800">
                                            {domain.project}
                                        </p>
                                    </div>

                                    <div className="mt-4 flex items-start gap-2 text-sm text-slate-600">
                                        <Rocket className="mt-0.5 shrink-0 text-blue-600" size={17} />
                                        <p>
                                            <strong>Try this week:</strong> {domain.weeklyAction}
                                        </p>
                                    </div>
                                </article>
                            )
                        })}
                    </div>
                </section>

                {/* Core Engineering */}
                <section className="mt-14">
                    <div className="flex items-center gap-3">
                        <GraduationCap className="text-blue-700" size={25} />
                        <h3 className="text-2xl font-bold text-slate-900">
                            Career Paths in Core Engineering Branches
                        </h3>
                    </div>

                    <p className="mt-3 max-w-3xl leading-7 text-slate-500">
                        Technology careers are not limited to computer science. Core
                        engineering students can build strong careers by combining
                        engineering fundamentals with relevant software and digital tools.
                    </p>

                    <div className="mt-6 grid gap-5 md:grid-cols-2">
                        {coreBranches.map((branch) => (
                            <div
                                key={branch.branch}
                                className="rounded-xl border border-slate-200 bg-white p-6"
                            >
                                <h4 className="text-lg font-bold text-slate-900">
                                    {branch.branch}
                                </h4>

                                <p className="mt-3 text-sm leading-6 text-slate-600">
                                    <strong>Tools:</strong> {branch.tools}
                                </p>

                                <p className="mt-2 text-sm leading-6 text-slate-600">
                                    <strong>Focus:</strong> {branch.focus}
                                </p>
                            </div>
                        ))}
                    </div>

                    <div className="mt-5 rounded-xl bg-slate-100 p-5">
                        <p className="font-semibold text-slate-800">
                            A useful additional skill set
                        </p>
                        <p className="mt-2 text-sm leading-6 text-slate-600">
                            Python, data analysis, automation and IoT fundamentals can
                            complement many core engineering specializations.
                        </p>
                    </div>
                </section>

                {/* Four Week Plan */}
                <section className="mt-14">
                    <div className="flex items-center gap-3">
                        <BookOpen className="text-blue-700" size={25} />
                        <h3 className="text-2xl font-bold text-slate-900">
                            The Four-Week Domain Exploration Method
                        </h3>
                    </div>

                    <p className="mt-3 max-w-3xl leading-7 text-slate-500">
                        Instead of switching interests every few days, follow a short,
                        structured experiment before committing to a learning direction.
                    </p>

                    <div className="mt-6 space-y-4">
                        {explorationSteps.map((step, index) => (
                            <div
                                key={step.week}
                                className="flex gap-4 rounded-xl border border-slate-200 bg-white p-5"
                            >
                                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-blue-50 font-bold text-blue-700">
                                    {index + 1}
                                </div>

                                <div>
                                    <p className="text-xs font-bold uppercase tracking-wider text-blue-600">
                                        {step.week}
                                    </p>
                                    <h4 className="mt-1 font-bold text-slate-900">
                                        {step.title}
                                    </h4>
                                    <p className="mt-2 text-sm leading-6 text-slate-600">
                                        {step.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Domain Scorecard */}
                <section className="mt-14 rounded-2xl border border-slate-200 bg-white p-6 md:p-8">
                    <div className="flex items-center gap-3">
                        <BarChart3 className="text-blue-700" size={25} />
                        <h3 className="text-2xl font-bold text-slate-900">
                            My Domain Selection Scorecard
                        </h3>
                    </div>

                    <p className="mt-3 text-sm leading-6 text-slate-500">
                        Score your current domain choice from 1 to 10. These are personal
                        reflection scores, not an objective ranking of careers.
                    </p>

                    <div className="mt-7 space-y-6">
                        {scoreCriteria.map((criterion, index) => (
                            <div key={criterion}>
                                <div className="flex flex-wrap items-center justify-between gap-3">
                                    <p className="font-medium text-slate-800">
                                        {index + 1}. {criterion}
                                    </p>
                                    <span className="font-bold text-blue-700">
                                        {scores[index] === 0 ? 'Not rated' : `${scores[index]}/10`}
                                    </span>
                                </div>

                                <input
                                    type="range"
                                    min="0"
                                    max="10"
                                    value={scores[index]}
                                    onChange={(event) =>
                                        updateScore(index, Number(event.target.value))
                                    }
                                    className="mt-3 w-full accent-blue-700"
                                    aria-label={`Score for ${criterion}`}
                                />

                                <div className="flex justify-between text-xs text-slate-400">
                                    <span>0</span>
                                    <span>10</span>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-7 rounded-xl bg-blue-50 p-5">
                        <p className="text-sm font-medium text-blue-800">
                            Your current reflection score
                        </p>
                        <p className="mt-1 text-3xl font-bold text-blue-900">
                            {totalScore}/40
                        </p>
                        <p className="mt-2 text-xs leading-5 text-blue-700">
                            Complete all four ratings to make your comparison meaningful.
                            Use the scores to support your decision, not to make it for you.
                        </p>
                    </div>
                </section>

                {/* Reflection */}
                <section className="mt-14 rounded-2xl border border-slate-200 bg-white p-6 md:p-8">
                    <div className="flex items-center gap-3">
                        <ClipboardList className="text-blue-700" size={25} />
                        <h3 className="text-2xl font-bold text-slate-900">
                            My Career Direction Reflection
                        </h3>
                    </div>

                    <p className="mt-3 text-sm leading-6 text-slate-500">
                        Think about what you explored. Write down your current thoughts.
                    </p>

                    <textarea
                        value={reflection}
                        onChange={(event) => setReflection(event.target.value)}
                        placeholder="Which two domains would you like to explore? What interests you about them? What would you like to build?"
                        rows={5}
                        className="mt-5 w-full rounded-xl border border-slate-200 p-4 text-sm leading-6 text-slate-700 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    />

                    <p className="mt-2 text-right text-xs text-slate-400">
                        {reflection.length} characters
                    </p>
                </section>

                {/* Action Checklist */}
                <section className="mt-10 rounded-2xl border border-slate-200 bg-white p-6 md:p-8">
                    <div className="flex items-center gap-3">
                        <CheckCircle2 className="text-blue-700" size={25} />
                        <h3 className="text-2xl font-bold text-slate-900">
                            My Domain Exploration Checklist
                        </h3>
                    </div>

                    <p className="mt-3 text-sm text-slate-500">
                        Track the actions you have completed during your exploration.
                    </p>

                    <div className="mt-5 space-y-3">
                        {checklistItems.map((item, index) => (
                            <label
                                key={item}
                                className="flex cursor-pointer items-start gap-3 rounded-lg border border-slate-100 p-4 hover:bg-slate-50"
                            >
                                <input
                                    type="checkbox"
                                    checked={completedSteps.includes(index)}
                                    onChange={() => toggleStep(index)}
                                    className="mt-1 h-4 w-4 accent-blue-700"
                                />
                                <span
                                    className={`text-sm leading-6 ${completedSteps.includes(index)
                                            ? 'text-slate-400 line-through'
                                            : 'text-slate-700'
                                        }`}
                                >
                                    {item}
                                </span>
                            </label>
                        ))}
                    </div>

                    <p className="mt-5 text-sm font-semibold text-blue-700">
                        {completedSteps.length} of 6 actions completed
                    </p>
                </section>

                {/* Key Takeaways */}
                <section className="mt-12 rounded-2xl bg-slate-900 p-7 text-white md:p-9">
                    <h3 className="text-2xl font-bold">Key Takeaways</h3>

                    <div className="mt-5 grid gap-4 md:grid-cols-2">
                        {[
                            'Explore before committing to a domain.',
                            'Build practical projects instead of only collecting certificates.',
                            'Learn tools in a structured beginner-to-advanced sequence.',
                            'Use your interests, growth potential and opportunities to guide your decision.',
                        ].map((item, index) => (
                            <div key={index} className="flex items-start gap-3">
                                <CheckCircle2 className="mt-1 shrink-0 text-sky-400" size={19} />
                                <p className="text-sm leading-6 text-slate-200">{item}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Poll CTA */}
                <section className="mt-12 rounded-2xl border border-blue-100 bg-white p-7 text-center shadow-sm md:p-10">
                    <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-blue-700">
                        <ClipboardList size={28} />
                    </div>

                    <h3 className="mt-5 text-2xl font-bold text-slate-900">
                        Ready to Share Your Domain Preference?
                    </h3>

                    <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-slate-500">
                        Participate in the Chapter 3 Domain Preference Poll. Share your
                        interests, reasons and current experience level. There are no
                        right or wrong answers.
                    </p>

                    <Link
                        to="/student/chapter/3/poll"
                        className="mt-7 inline-flex items-center gap-2 rounded-lg bg-blue-700 px-6 py-3 font-semibold text-white transition hover:bg-blue-800"
                    >
                        Participate in Domain Poll
                        <ArrowRight size={18} />
                    </Link>
                </section>

                <div className="mt-10 flex justify-start">
                    <Link
                        to="/student/dashboard"
                        className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-blue-700"
                    >
                        <ArrowLeft size={17} />
                        Back to Dashboard
                    </Link>
                </div>
            </main>
        </div>
    )
}
