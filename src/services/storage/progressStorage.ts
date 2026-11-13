
import { LOCAL_STORAGE_KEYS } from '../../types/storage'
import {
  safeGetString,
  safeSetString,
  safeRemoveItem,
  safeGetJSON,
  safeSetJSON,
} from './storageHelper'
import { getStudentAuthSession } from './authStorage'

// ---------------------------------------------------------------------------
// Configuration
// ---------------------------------------------------------------------------

const CAREERVERSE_API_URL =
  'https://script.google.com/macros/s/AKfycbwCzr6za1KI5i_dMywoeS4OgZsYtVI_y2AMdrork4lLgpitv5I0h1J9x6xkp7EOOgVT3A/exec'

// ---------------------------------------------------------------------------
// Low-Level Typed Storage Helpers
// ---------------------------------------------------------------------------

export function readString(key: string, fallback = ''): string {
  const value = safeGetString('local', key, fallback)
  return value !== null ? value : fallback
}

export function writeString(key: string, value: string): boolean {
  return safeSetString('local', key, value)
}

export function readArray(key: string, fallback: string[] = []): string[] {
  const result = safeGetJSON<string[]>('local', key, fallback, (data) =>
    Array.isArray(data) && data.every((item) => typeof item === 'string')
  )

  return result !== null ? result : fallback
}

export function writeArray(key: string, value: string[]): boolean {
  return safeSetJSON('local', key, value)
}

// ---------------------------------------------------------------------------
// Chapter Completion and Google Sheets Synchronization
// ---------------------------------------------------------------------------

export type TrackedChapterNumber = 5 | 6 | 7 | 8 | 9

function getChapterCompletionKey(chapter: TrackedChapterNumber): string {
  switch (chapter) {
    case 5:
      return LOCAL_STORAGE_KEYS.chapter5Completed
    case 6:
      return LOCAL_STORAGE_KEYS.chapter6Completed
    case 7:
      return LOCAL_STORAGE_KEYS.chapter7Completed
    case 8:
      return LOCAL_STORAGE_KEYS.chapter8Completed
    case 9:
      return LOCAL_STORAGE_KEYS.chapter9Completed
  }
}

export function isChapterCompleted(
  chapter: TrackedChapterNumber
): boolean {
  const key = getChapterCompletionKey(chapter)
  return safeGetString('local', key) === 'true'
}

/**
 * Sends chapter completion to the CAREERVERSE Google Apps Script API.
 * Uses the centralized student authentication storage service.
 */
function syncChapterProgressToSheets(
  chapter: TrackedChapterNumber,
  completed: boolean
): void {
  try {
    const session = getStudentAuthSession()

    if (!session) {
      return
    }

    const { token, studentId } = session

    void fetch(CAREERVERSE_API_URL, {
      method: 'POST',
      body: JSON.stringify({
        action: 'student.progress.save',
        token,
        studentId,
        chapter,
        completed,
      }),
    })
      .then(async (response) => {
        const result = await response.json()

        if (!response.ok || result.success !== true) {
          console.warn(
            `Chapter ${chapter} progress synchronization failed:`,
            result.message || response.statusText
          )
        }
      })
      .catch((error) => {
        console.warn(
          `Chapter ${chapter} progress could not be synchronized:`,
          error
        )
      })
  } catch (error) {
    console.warn(
      'Unable to access the student session:',
      error
    )
  }
}

export function setChapterCompleted(
  chapter: TrackedChapterNumber,
  completed: boolean
): boolean {
  const key = getChapterCompletionKey(chapter)

  let localSaved: boolean

  if (completed) {
    localSaved = safeSetString('local', key, 'true')
  } else if (chapter === 6) {
    localSaved = safeRemoveItem('local', key)
  } else {
    localSaved = safeSetString('local', key, 'false')
  }

  if (!localSaved) {
    return false
  }

  syncChapterProgressToSheets(chapter, completed)

  return true
}

export function resetChapterCompletion(
  chapter: TrackedChapterNumber
): boolean {
  return setChapterCompleted(chapter, false)
}

// ---------------------------------------------------------------------------
// Chapter 5: Platforms That Build Your Proof
// ---------------------------------------------------------------------------

export function getChapterFiveVisited(): string[] {
  return readArray(LOCAL_STORAGE_KEYS.chapter5Visited)
}

export function saveChapterFiveVisited(visited: string[]): boolean {
  return writeArray(LOCAL_STORAGE_KEYS.chapter5Visited, visited)
}

export function getChapterFiveSelected(): string[] {
  return readArray(LOCAL_STORAGE_KEYS.chapter5Selected)
}

export function saveChapterFiveSelected(selected: string[]): boolean {
  return writeArray(LOCAL_STORAGE_KEYS.chapter5Selected, selected)
}

export function getChapterFiveReflection(): string {
  return readString(LOCAL_STORAGE_KEYS.chapter5Reflection)
}

export function saveChapterFiveReflection(reflection: string): boolean {
  return writeString(LOCAL_STORAGE_KEYS.chapter5Reflection, reflection)
}

// ---------------------------------------------------------------------------
// Chapter 6: Research and AI
// ---------------------------------------------------------------------------

export function getChapterSixToolsVisited(): string[] {
  return readArray(LOCAL_STORAGE_KEYS.chapter6ToolsVisited)
}

export function saveChapterSixToolsVisited(tools: string[]): boolean {
  return writeArray(LOCAL_STORAGE_KEYS.chapter6ToolsVisited, tools)
}

export function getChapterSixSelectedTools(): string[] {
  return readArray(LOCAL_STORAGE_KEYS.chapter6SelectedTools)
}

export function saveChapterSixSelectedTools(tools: string[]): boolean {
  return writeArray(LOCAL_STORAGE_KEYS.chapter6SelectedTools, tools)
}

export function getChapterSixResearchQuestion(): string {
  return readString(LOCAL_STORAGE_KEYS.chapter6ResearchQuestion)
}

export function saveChapterSixResearchQuestion(question: string): boolean {
  return writeString(LOCAL_STORAGE_KEYS.chapter6ResearchQuestion, question)
}

export function getChapterSixGeneratedPrompt(): string {
  return readString(LOCAL_STORAGE_KEYS.chapter6GeneratedPrompt)
}

export function saveChapterSixGeneratedPrompt(prompt: string): boolean {
  return writeString(LOCAL_STORAGE_KEYS.chapter6GeneratedPrompt, prompt)
}

export function getChapterSixVerification(): string {
  return readString(LOCAL_STORAGE_KEYS.chapter6Verification)
}

export function saveChapterSixVerification(verification: string): boolean {
  return writeString(LOCAL_STORAGE_KEYS.chapter6Verification, verification)
}

export function getChapterSixReflection(): string {
  return readString(LOCAL_STORAGE_KEYS.chapter6Reflection)
}

export function saveChapterSixReflection(reflection: string): boolean {
  return writeString(LOCAL_STORAGE_KEYS.chapter6Reflection, reflection)
}

// ---------------------------------------------------------------------------
// Chapter 7: Experience and Visibility
// ---------------------------------------------------------------------------

export function getChapterSevenSelectedExperiences(): string[] {
  return readArray(LOCAL_STORAGE_KEYS.chapter7SelectedExperiences)
}

export function saveChapterSevenSelectedExperiences(
  experiences: string[]
): boolean {
  return writeArray(LOCAL_STORAGE_KEYS.chapter7SelectedExperiences, experiences)
}

export function getChapterSevenPortfolioUrl(): string {
  return readString(LOCAL_STORAGE_KEYS.chapter7PortfolioUrl)
}

export function saveChapterSevenPortfolioUrl(url: string): boolean {
  return writeString(LOCAL_STORAGE_KEYS.chapter7PortfolioUrl, url)
}

export function getChapterSevenLinkedinUrl(): string {
  return readString(LOCAL_STORAGE_KEYS.chapter7LinkedinUrl)
}

export function saveChapterSevenLinkedinUrl(url: string): boolean {
  return writeString(LOCAL_STORAGE_KEYS.chapter7LinkedinUrl, url)
}

export function getChapterSevenGithubUrl(): string {
  return readString(LOCAL_STORAGE_KEYS.chapter7GithubUrl)
}

export function saveChapterSevenGithubUrl(url: string): boolean {
  return writeString(LOCAL_STORAGE_KEYS.chapter7GithubUrl, url)
}

export function getChapterSevenActionPlan(): string {
  return readString(LOCAL_STORAGE_KEYS.chapter7ActionPlan)
}

export function saveChapterSevenActionPlan(plan: string): boolean {
  return writeString(LOCAL_STORAGE_KEYS.chapter7ActionPlan, plan)
}

export function getChapterSevenReflection(): string {
  return readString(LOCAL_STORAGE_KEYS.chapter7Reflection)
}

export function saveChapterSevenReflection(reflection: string): boolean {
  return writeString(LOCAL_STORAGE_KEYS.chapter7Reflection, reflection)
}

// ---------------------------------------------------------------------------
// Chapter 8: Beyond Placements
// ---------------------------------------------------------------------------

export function getChapterEightSelectedPathway(): string {
  return readString(LOCAL_STORAGE_KEYS.chapter8SelectedPathway)
}

export function saveChapterEightSelectedPathway(pathway: string): boolean {
  return writeString(LOCAL_STORAGE_KEYS.chapter8SelectedPathway, pathway)
}

export function getChapterEightSelectedInterest(): string {
  return readString(LOCAL_STORAGE_KEYS.chapter8SelectedInterest)
}

export function saveChapterEightSelectedInterest(interest: string): boolean {
  return writeString(LOCAL_STORAGE_KEYS.chapter8SelectedInterest, interest)
}

export function getChapterEightActionPlan(): string {
  return readString(LOCAL_STORAGE_KEYS.chapter8ActionPlan)
}

export function saveChapterEightActionPlan(plan: string): boolean {
  return writeString(LOCAL_STORAGE_KEYS.chapter8ActionPlan, plan)
}

export function getChapterEightReflection(): string {
  return readString(LOCAL_STORAGE_KEYS.chapter8Reflection)
}

export function saveChapterEightReflection(reflection: string): boolean {
  return writeString(LOCAL_STORAGE_KEYS.chapter8Reflection, reflection)
}

// ---------------------------------------------------------------------------
// Chapter 9: Habits and Wrap-Up
// ---------------------------------------------------------------------------

export function getChapterNineHabits(): string[] {
  return readArray(LOCAL_STORAGE_KEYS.chapter9Habits)
}

export function saveChapterNineHabits(habits: string[]): boolean {
  return writeArray(LOCAL_STORAGE_KEYS.chapter9Habits, habits)
}

export function getChapterNineCareerGoal(): string {
  return readString(LOCAL_STORAGE_KEYS.chapter9CareerGoal)
}

export function saveChapterNineCareerGoal(goal: string): boolean {
  return writeString(LOCAL_STORAGE_KEYS.chapter9CareerGoal, goal)
}

export function getChapterNineWeeklyPlan(): string {
  return readString(LOCAL_STORAGE_KEYS.chapter9WeeklyPlan)
}

export function saveChapterNineWeeklyPlan(plan: string): boolean {
  return writeString(LOCAL_STORAGE_KEYS.chapter9WeeklyPlan, plan)
}

export function getChapterNineReflection(): string {
  return readString(LOCAL_STORAGE_KEYS.chapter9Reflection)
}

export function saveChapterNineReflection(reflection: string): boolean {
  return writeString(LOCAL_STORAGE_KEYS.chapter9Reflection, reflection)
}
