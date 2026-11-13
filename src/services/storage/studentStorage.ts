import {
  SESSION_STORAGE_KEYS,
  type StudentIdentity,
} from '../../types/storage'
import {
  safeGetJSON,
  safeSetJSON,
  safeRemoveItem,
} from './storageHelper'

/**
 * Validates whether an unknown parsed payload matches the StudentIdentity structure.
 */
function isStudentIdentity(data: unknown): boolean {
  if (typeof data !== 'object' || data === null) {
    return false
  }
  const candidate = data as Record<string, unknown>
  return (
    typeof candidate.studentName === 'string' &&
    typeof candidate.registrationNumber === 'string'
  )
}

/**
 * Retrieves the currently logged-in student identity from sessionStorage.
 * Returns null if no valid student identity is present.
 */
export function getStudent(): StudentIdentity | null {
  return safeGetJSON<StudentIdentity>(
    'session',
    SESSION_STORAGE_KEYS.student,
    null,
    isStudentIdentity
  )
}

/**
 * Persists the student identity to sessionStorage.
 * Preserves the exact structure: { studentName, registrationNumber }.
 * Returns true if successful, false if storage write fails.
 */
export function saveStudent(student: StudentIdentity): boolean {
  if (!student.studentName?.trim() || !student.registrationNumber?.trim()) {
    return false
  }

  const payload: StudentIdentity = {
    studentName: student.studentName.trim(),
    registrationNumber: student.registrationNumber.trim(),
  }

  return safeSetJSON('session', SESSION_STORAGE_KEYS.student, payload)
}

/**
 * Clears the student identity from sessionStorage.
 * Useful for explicit logout and session reset.
 */
export function clearStudent(): boolean {
  return safeRemoveItem('session', SESSION_STORAGE_KEYS.student)
}
