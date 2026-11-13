
import {
    safeGetString,
    safeSetString,
    safeRemoveItem,
} from './storageHelper'

// Centralized authentication storage keys.
export const AUTH_STORAGE_KEYS = {
    studentToken: 'careerverse_student_token',
    studentId: 'careerverse_student_id',
    adminToken: 'careerverse_admin_token',
} as const

// Student authentication session.
export interface StudentAuthSession {
    token: string
    studentId: string
}

export function getStudentAuthSession(): StudentAuthSession | null {
    const token = safeGetString('session', AUTH_STORAGE_KEYS.studentToken)
    const studentId = safeGetString('session', AUTH_STORAGE_KEYS.studentId)

    if (!token || !studentId) {
        return null
    }

    return { token, studentId }
}

export function saveStudentAuthSession(
    session: StudentAuthSession,
): boolean {
    if (!session.token.trim() || !session.studentId.trim()) {
        return false
    }

    const tokenSaved = safeSetString(
        'session',
        AUTH_STORAGE_KEYS.studentToken,
        session.token,
    )

    const studentIdSaved = safeSetString(
        'session',
        AUTH_STORAGE_KEYS.studentId,
        session.studentId,
    )

    if (!tokenSaved || !studentIdSaved) {
        clearStudentAuthSession()
        return false
    }

    return true
}

export function clearStudentAuthSession(): boolean {
    const tokenRemoved = safeRemoveItem(
        'session',
        AUTH_STORAGE_KEYS.studentToken,
    )

    const idRemoved = safeRemoveItem(
        'session',
        AUTH_STORAGE_KEYS.studentId,
    )

    return tokenRemoved && idRemoved
}

// Admin authentication session.
export function getAdminAuthToken(): string | null {
    return safeGetString('session', AUTH_STORAGE_KEYS.adminToken)
}

export function saveAdminAuthToken(token: string): boolean {
    if (!token.trim()) {
        return false
    }

    return safeSetString(
        'session',
        AUTH_STORAGE_KEYS.adminToken,
        token,
    )
}

export function clearAdminAuthToken(): boolean {
    return safeRemoveItem('session', AUTH_STORAGE_KEYS.adminToken)
}
