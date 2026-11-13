
export type QuizOption = {
    id: string
    text: string
    isCorrect: boolean
    explanation: string
}

export type QuizQuestion = {
    id: number
    question: string
    options: QuizOption[]
}

export const chapterTwoQuizOne: QuizQuestion[] = [
    {
        id: 1,
        question: "What should a B.Tech student primarily focus on during the first year?",
        options: [
            { id: "A", text: "Learning fundamentals and exploring domains", isCorrect: true, explanation: "Building programming fundamentals and exploring domains creates a strong foundation." },
            { id: "B", text: "Mastering every available technology", isCorrect: false, explanation: "Trying to master everything at once prevents focused learning." },
            { id: "C", text: "Applying only for full-time jobs", isCorrect: false, explanation: "The first year is better used for foundational learning and exploration." },
            { id: "D", text: "Preparing only for final-year interviews", isCorrect: false, explanation: "Interview preparation alone does not build the necessary technical foundation." }
        ]
    },
    {
        id: 2,
        question: "During the second year, which approach best supports career direction?",
        options: [
            { id: "A", text: "Avoiding all technical projects", isCorrect: false, explanation: "Projects help students apply their knowledge." },
            { id: "B", text: "Choosing a primary domain and building meaningful projects", isCorrect: true, explanation: "Focused learning and projects help develop practical expertise." },
            { id: "C", text: "Studying unrelated technologies every week", isCorrect: false, explanation: "Constantly switching topics makes it difficult to develop depth." },
            { id: "D", text: "Depending only on academic grades", isCorrect: false, explanation: "Grades matter, but practical skills and projects are also important." }
        ]
    },
    {
        id: 3,
        question: "Which activity is especially valuable during the third year for gaining real-world experience?",
        options: [
            { id: "A", text: "Avoiding collaboration and practical work", isCorrect: false, explanation: "Collaboration and practical work develop professional skills." },
            { id: "B", text: "Collecting certificates without applying skills", isCorrect: false, explanation: "Certificates alone do not demonstrate practical ability." },
            { id: "C", text: "Working on advanced projects and pursuing internships", isCorrect: true, explanation: "Projects and internships provide valuable practical experience." },
            { id: "D", text: "Postponing all career preparation", isCorrect: false, explanation: "Delaying preparation reduces opportunities to gain experience." }
        ]
    },
    {
        id: 4,
        question: "Which preparation is most directly relevant to a fourth-year student targeting placements?",
        options: [
            { id: "A", text: "Starting programming fundamentals from scratch without a plan", isCorrect: false, explanation: "Unstructured preparation does not cover the full placement requirements." },
            { id: "B", text: "Avoiding interviews until graduation", isCorrect: false, explanation: "Interview practice is important before recruitment begins." },
            { id: "C", text: "Focusing exclusively on social media visibility", isCorrect: false, explanation: "Visibility cannot replace technical and interview preparation." },
            { id: "D", text: "Practising coding, revising core subjects, and preparing project explanations", isCorrect: true, explanation: "These activities prepare students for technical assessments and interviews." }
        ]
    },
    {
        id: 5,
        question: "Why should a student review their four-year career roadmap regularly?",
        options: [
            { id: "A", text: "To avoid learning new skills", isCorrect: false, explanation: "A roadmap should support continuous learning." },
            { id: "B", text: "To follow the same plan regardless of circumstances", isCorrect: false, explanation: "An inflexible plan may not reflect changing opportunities." },
            { id: "C", text: "To adapt to changing interests, skills, and opportunities", isCorrect: true, explanation: "Regular reviews help students adjust their goals and actions." },
            { id: "D", text: "To postpone career decisions indefinitely", isCorrect: false, explanation: "Reviewing a roadmap should improve decisions, not delay them." }
        ]
    }
]

export const chapterTwoQuizTwo: QuizQuestion[] = [
    {
        id: 1,
        question: "A first-year student wants to explore AI, Web Development, and Cybersecurity. What is the most useful approach?",
        options: [
            { id: "A", text: "Build small beginner projects in each area", isCorrect: true, explanation: "Small projects provide practical exposure and help compare different domains." },
            { id: "B", text: "Choose only the most popular domain", isCorrect: false, explanation: "Popularity alone does not establish personal interest or suitability." },
            { id: "C", text: "Avoid programming until the third year", isCorrect: false, explanation: "Programming fundamentals are useful from the beginning." },
            { id: "D", text: "Study advanced research papers immediately", isCorrect: false, explanation: "Exploration should begin with suitable foundational knowledge." }
        ]
    },
    {
        id: 2,
        question: "A second-year student selects Machine Learning as a primary domain. Which activity best helps develop practical understanding?",
        options: [
            { id: "A", text: "Memorising technology names without implementation", isCorrect: false, explanation: "Memorisation does not demonstrate practical understanding." },
            { id: "B", text: "Building small machine learning projects using real datasets", isCorrect: true, explanation: "Implementing projects helps connect concepts with practical applications." },
            { id: "C", text: "Avoiding mathematics and programming", isCorrect: false, explanation: "Both are important foundations for machine learning." },
            { id: "D", text: "Switching domains every few days", isCorrect: false, explanation: "Frequent switching can prevent meaningful progress in the chosen domain." }
        ]
    },
    {
        id: 3,
        question: "A third-year student completes an internship task with a software team. Which outcome provides the strongest evidence of professional growth?",
        options: [
            { id: "A", text: "Receiving an attendance certificate only", isCorrect: false, explanation: "Attendance confirms participation but does not describe contributions." },
            { id: "B", text: "Documenting contributions, technical decisions, and results", isCorrect: true, explanation: "Documented work demonstrates applied skills and professional contribution." },
            { id: "C", text: "Listing every tool mentioned by the team", isCorrect: false, explanation: "A tool list does not establish how effectively the tools were used." },
            { id: "D", text: "Keeping all project work undocumented", isCorrect: false, explanation: "Documentation helps explain and demonstrate completed work." }
        ]
    },
    {
        id: 4,
        question: "A fourth-year student is considering campus placements and higher education. What is the most sensible strategy?",
        options: [
            { id: "A", text: "Prepare only for placement aptitude tests", isCorrect: false, explanation: "Aptitude preparation alone does not address higher education requirements." },
            { id: "B", text: "Delay all applications until graduation", isCorrect: false, explanation: "Waiting can cause students to miss application deadlines." },
            { id: "C", text: "Research eligibility and deadlines while preparing for selection processes", isCorrect: true, explanation: "This helps students manage different pathways and meet requirements on time." },
            { id: "D", text: "Apply everywhere without checking requirements", isCorrect: false, explanation: "Applications should match eligibility and individual goals." }
        ]
    },
    {
        id: 5,
        question: "How can a portfolio of well-documented projects support internship and placement applications?",
        options: [
            { id: "A", text: "It replaces every academic qualification", isCorrect: false, explanation: "A portfolio complements academic qualifications rather than replacing them." },
            { id: "B", text: "It guarantees selection for every job", isCorrect: false, explanation: "A portfolio cannot guarantee selection." },
            { id: "C", text: "It demonstrates practical skills through examples of completed work", isCorrect: true, explanation: "Projects provide evidence of implementation and problem-solving ability." },
            { id: "D", text: "It removes the need for interview preparation", isCorrect: false, explanation: "Students still need to explain and defend their project decisions." }
        ]
    }
]
