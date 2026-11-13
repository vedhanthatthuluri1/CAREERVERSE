import {
  SESSION_STORAGE_KEYS,
  type QuizResult,
  type DomainPollResult,
  type ChapterFourAssessmentResult,
} from '../../types/storage'
import {
  safeGetJSON,
  safeSetJSON,
  safeRemoveItem,
} from './storageHelper'

// ---------------------------------------------------------------------------
// Validation Guards (Mirrors StudentDashboard.tsx validation exactly)
// ---------------------------------------------------------------------------

function isQuizResult(data: unknown): boolean {
  if (typeof data !== 'object' || data === null) return false
  const candidate = data as Record<string, unknown>
  return (
    typeof candidate.score === 'number' &&
    typeof candidate.bestScore === 'number' &&
    typeof candidate.totalQuestions === 'number' &&
    typeof candidate.percentage === 'number' &&
    candidate.completed === true
  )
}

function isDomainPollResult(data: unknown): boolean {
  if (typeof data !== 'object' || data === null) return false
  const candidate = data as Record<string, unknown>
  return (
    typeof candidate.domain === 'string' &&
    typeof candidate.reason === 'string' &&
    typeof candidate.experience === 'string' &&
    typeof candidate.submittedAt === 'string'
  )
}

function isChapterFourAssessmentResult(data: unknown): boolean {
  if (typeof data !== 'object' || data === null) return false
  const candidate = data as Record<string, unknown>
  return (
    typeof candidate.averageScore === 'number' &&
    candidate.completed === true &&
    typeof candidate.priority === 'string' &&
    typeof candidate.submittedAt === 'string' &&
    typeof candidate.ratings === 'object' &&
    candidate.ratings !== null
  )
}

// ---------------------------------------------------------------------------
// Chapter 1 Quiz (careerverseChapter1Result)
// ---------------------------------------------------------------------------

export function getChapterOneQuizResult(): QuizResult | null {
  return safeGetJSON<QuizResult>(
    'session',
    SESSION_STORAGE_KEYS.chapter1Result,
    null,
    isQuizResult
  )
}

export function saveChapterOneQuizResult(result: QuizResult): boolean {
  return safeSetJSON('session', SESSION_STORAGE_KEYS.chapter1Result, result)
}

// ---------------------------------------------------------------------------
// Chapter 2 Quizzes (careerverseChapter2Quiz1Result & Quiz2Result)
// ---------------------------------------------------------------------------

export function getChapterTwoQuizResult(quizNumber: 1 | 2): QuizResult | null {
  const key =
    quizNumber === 1
      ? SESSION_STORAGE_KEYS.chapter2Quiz1Result
      : SESSION_STORAGE_KEYS.chapter2Quiz2Result

  return safeGetJSON<QuizResult>('session', key, null, isQuizResult)
}

export function saveChapterTwoQuizResult(
  quizNumber: 1 | 2,
  result: QuizResult
): boolean {
  const key =
    quizNumber === 1
      ? SESSION_STORAGE_KEYS.chapter2Quiz1Result
      : SESSION_STORAGE_KEYS.chapter2Quiz2Result

  return safeSetJSON('session', key, result)
}

// ---------------------------------------------------------------------------
// Chapter 3 Domain Preference Poll (careerverseChapter3Poll)
// ---------------------------------------------------------------------------

export function getChapterThreePollResult(): DomainPollResult | null {
  return safeGetJSON<DomainPollResult>(
    'session',
    SESSION_STORAGE_KEYS.chapter3Poll,
    null,
    isDomainPollResult
  )
}

export function saveChapterThreePollResult(poll: DomainPollResult): boolean {
  return safeSetJSON('session', SESSION_STORAGE_KEYS.chapter3Poll, poll)
}

// ---------------------------------------------------------------------------
// Chapter 4 Skills Gap Assessment (careerverseChapter4Assessment)
// ---------------------------------------------------------------------------

export function getChapterFourAssessmentResult(): ChapterFourAssessmentResult | null {
  return safeGetJSON<ChapterFourAssessmentResult>(
    'session',
    SESSION_STORAGE_KEYS.chapter4Assessment,
    null,
    isChapterFourAssessmentResult
  )
}

export function saveChapterFourAssessmentResult(
  assessment: ChapterFourAssessmentResult
): boolean {
  return safeSetJSON(
    'session',
    SESSION_STORAGE_KEYS.chapter4Assessment,
    assessment
  )
}

// ---------------------------------------------------------------------------
// Assessment Clearing & Reset
// ---------------------------------------------------------------------------

/**
 * Clears all assessment and quiz session data when explicitly requested.
 */
export function clearAllAssessmentData(): boolean {
  const results = [
    safeRemoveItem('session', SESSION_STORAGE_KEYS.chapter1Result),
    safeRemoveItem('session', SESSION_STORAGE_KEYS.chapter2Quiz1Result),
    safeRemoveItem('session', SESSION_STORAGE_KEYS.chapter2Quiz2Result),
    safeRemoveItem('session', SESSION_STORAGE_KEYS.chapter3Poll),
    safeRemoveItem('session', SESSION_STORAGE_KEYS.chapter4Assessment),
  ]
  return results.every(Boolean)
}
