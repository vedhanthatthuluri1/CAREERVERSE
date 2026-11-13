/**
 * CAREERVERSE Storage Helper
 * Fault-tolerant wrapper around Web Storage APIs (sessionStorage & localStorage).
 * Handles private browsing, disabled cookies, quota limits, and malformed JSON safely.
 */

export type StorageType = 'session' | 'local'

/**
 * Accesses browser storage safely at invocation time.
 * Never accesses window/storage at module initialization time.
 */
function getStorage(type: StorageType): Storage | null {
  try {
    if (typeof window === 'undefined') {
      return null
    }
    return type === 'session' ? window.sessionStorage : window.localStorage
  } catch {
    return null
  }
}

/**
 * Safely reads a raw string from browser storage.
 * Returns null or the optional fallback if storage is unavailable or key not found.
 */
export function safeGetString(
  type: StorageType,
  key: string,
  fallback: string | null = null
): string | null {
  try {
    const storage = getStorage(type)
    if (!storage) return fallback
    const value = storage.getItem(key)
    return value !== null ? value : fallback
  } catch (error) {
    console.warn(`[storageHelper] Failed to read key "${key}" from ${type}Storage:`, error)
    return fallback
  }
}

/**
 * Safely writes a raw string to browser storage.
 * Returns true if the write succeeded, false if rejected or unavailable.
 */
export function safeSetString(
  type: StorageType,
  key: string,
  value: string
): boolean {
  try {
    const storage = getStorage(type)
    if (!storage) return false
    storage.setItem(key, value)
    return true
  } catch (error) {
    console.error(`[storageHelper] Failed to write key "${key}" to ${type}Storage:`, error)
    return false
  }
}

/**
 * Safely removes a key from browser storage.
 * Returns true if the removal succeeded, false if unavailable or failed.
 */
export function safeRemoveItem(type: StorageType, key: string): boolean {
  try {
    const storage = getStorage(type)
    if (!storage) return false
    storage.removeItem(key)
    return true
  } catch (error) {
    console.warn(`[storageHelper] Failed to remove key "${key}" from ${type}Storage:`, error)
    return false
  }
}

/**
 * Safely reads and parses a JSON item from browser storage.
 * If JSON parsing fails or validation fails, returns the provided fallback.
 */
export function safeGetJSON<T>(
  type: StorageType,
  key: string,
  fallback: T | null = null,
  validator?: (data: unknown) => boolean
): T | null {
  try {
    const raw = safeGetString(type, key)
    if (raw === null || raw.trim() === '') {
      return fallback
    }

    const parsed: unknown = JSON.parse(raw)

    if (validator && !validator(parsed)) {
      console.warn(`[storageHelper] Validation failed for key "${key}" in ${type}Storage`)
      return fallback
    }

    return parsed as T
  } catch (error) {
    console.warn(`[storageHelper] Failed to parse JSON for key "${key}" in ${type}Storage:`, error)
    return fallback
  }
}

/**
 * Safely serializes and writes a JSON value to browser storage.
 * Returns true only if serialization and storage write both succeed.
 */
export function safeSetJSON<T>(
  type: StorageType,
  key: string,
  value: T
): boolean {
  try {
    const serialized = JSON.stringify(value)
    return safeSetString(type, key, serialized)
  } catch (error) {
    console.error(`[storageHelper] Failed to serialize JSON for key "${key}":`, error)
    return false
  }
}
