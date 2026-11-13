/**
 * CAREERVERSE Storage Type Definitions
 * Exact type contracts matching the application's runtime data structures.
 */

// ---------------------------------------------------------------------------
// Student Identity
// ---------------------------------------------------------------------------

export type StudentIdentity = {
  studentName: string
  registrationNumber: string
}

// ---------------------------------------------------------------------------
// Assessment and Quiz Results (Chapters 1 - 4)
// ---------------------------------------------------------------------------

export type QuizResult = {
  score: number
  bestScore: number
  totalQuestions: number
  percentage: number
  completed: boolean
  completedAt: string
}

export type DomainPollResult = {
  domain: string
  reason: string
  experience: string
  submittedAt: string
}

export type ChapterFourAssessmentResult = {
  ratings: Record<string, number>
  projectExperience: string
  priority: string
  averageScore: number
  strengths: string[]
  improvementAreas: string[]
  recommendations: string[]
  submittedAt: string
  completed: boolean
}

// ---------------------------------------------------------------------------
// Storage Keys Constants
// ---------------------------------------------------------------------------

/** Session Storage Keys (Identity & Chapters 1-4) */
export const SESSION_STORAGE_KEYS = {
  student: 'careerverseStudent',
  chapter1Result: 'careerverseChapter1Result',
  chapter2Quiz1Result: 'careerverseChapter2Quiz1Result',
  chapter2Quiz2Result: 'careerverseChapter2Quiz2Result',
  chapter3Poll: 'careerverseChapter3Poll',
  chapter4Assessment: 'careerverseChapter4Assessment',
} as const

/** Local Storage Keys (Chapters 5-9) */
export const LOCAL_STORAGE_KEYS = {
  // Chapter 5
  chapter5Visited: 'careerverseChapter5Visited',
  chapter5Selected: 'careerverseChapter5Selected',
  chapter5Reflection: 'careerverseChapter5Reflection',
  chapter5Completed: 'careerverseChapter5Completed',

  // Chapter 6
  chapter6ToolsVisited: 'careerverseChapter6ToolsVisited',
  chapter6SelectedTools: 'careerverseChapter6SelectedTools',
  chapter6ResearchQuestion: 'careerverseChapter6ResearchQuestion',
  chapter6GeneratedPrompt: 'careerverseChapter6GeneratedPrompt',
  chapter6Verification: 'careerverseChapter6Verification',
  chapter6Reflection: 'careerverseChapter6Reflection',
  chapter6Completed: 'careerverseChapter6Completed',

  // Chapter 7
  chapter7SelectedExperiences: 'careerverseChapter7SelectedExperiences',
  chapter7PortfolioUrl: 'careerverseChapter7PortfolioUrl',
  chapter7LinkedinUrl: 'careerverseChapter7LinkedinUrl',
  chapter7GithubUrl: 'careerverseChapter7GithubUrl',
  chapter7ActionPlan: 'careerverseChapter7ActionPlan',
  chapter7Reflection: 'careerverseChapter7Reflection',
  chapter7Completed: 'careerverseChapter7Completed',

  // Chapter 8
  chapter8SelectedPathway: 'careerverseChapter8SelectedPathway',
  chapter8SelectedInterest: 'careerverseChapter8SelectedInterest',
  chapter8ActionPlan: 'careerverseChapter8ActionPlan',
  chapter8Reflection: 'careerverseChapter8Reflection',
  chapter8Completed: 'careerverseChapter8Completed',

  // Chapter 9
  chapter9Habits: 'careerverseChapter9Habits',
  chapter9CareerGoal: 'careerverseChapter9CareerGoal',
  chapter9WeeklyPlan: 'careerverseChapter9WeeklyPlan',
  chapter9Reflection: 'careerverseChapter9Reflection',
  chapter9Completed: 'careerverseChapter9Completed',
} as const
