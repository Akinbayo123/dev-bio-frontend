
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api'

interface FetchOptions extends RequestInit {
  token?: string
}

/**
 * Check if API is properly configured (not using default localhost)
 */
export function isApiConfigured(): boolean {
  const url = process.env.NEXT_PUBLIC_API_URL
  return !!url && url !== 'http://localhost:3000' && url !== 'http://localhost:3000/api'
}

/**
 * Get API base URL
 */
function getApiUrl(): string {
  return API_BASE_URL
}

/**
 * Generic fetch wrapper with error handling
 */
async function apiFetch<T>(
  endpoint: string,
  options: FetchOptions = {}
): Promise<T> {
  const { token, ...fetchOptions } = options
  const baseUrl = getApiUrl()
  const url = `${baseUrl}${endpoint}`

  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    ...fetchOptions.headers,
  }

  if (token) {
    headers['Authorization'] = `Bearer ${token}`
  }

  try {
    const response = await fetch(url, {
      ...fetchOptions,
      headers,
    })

    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'Unknown error' }))
      const err = new Error(error.message || 'API request failed');
      (err as any).status = response.status
      throw err
    }

    return response.json()
  } catch (error) {
    // Provide helpful error message for fetch failures
    if (error instanceof TypeError && error.message.includes('fetch')) {
      const isDefaultUrl = baseUrl === 'http://localhost:8000/api'
      const errorMsg = isDefaultUrl
        ? `Backend API not available at ${baseUrl}. Make sure your backend is running on port 8000, or set NEXT_PUBLIC_API_URL environment variable to the correct backend URL.`
        : `Failed to reach backend API at ${baseUrl}. Make sure your backend is running and NEXT_PUBLIC_API_URL is set correctly.`
      const err = new Error(errorMsg)
      ;(err as any).code = 'API_UNREACHABLE'
      throw err
    }
    throw error
  }
}

/**
 * Auth Endpoints
 */
export async function getGitHubOAuthRedirectUrl(): Promise<{ url: string }> {
  return apiFetch('/auth/github/redirect')
}

export async function getCurrentUser(token: string): Promise<{ data: any }> {
  return apiFetch('/auth/me', { token })
}

export async function logout(token: string): Promise<{ message: string }> {
  return apiFetch('/auth/logout', {
    method: 'POST',
    token,
  })
}

/**
 * Profile Endpoints
 */
export async function getUserProfile(token: string): Promise<{
  user: any
  profile: any
  github_stats: any
}> {
  return apiFetch('/profile', { token })
}

export async function getPublicProfile(username: string): Promise<{
  user: any
  profile: any
  github_stats: any
}> {
  return apiFetch(`/profiles/${username}`)
}

export async function updateUserProfile(
  token: string,
  data: {
    bio?: string
    theme?: string
    status?: string
    location?: string
    website?: string
    twitter?: string
    linkedin?: string
    public?: boolean
  }
): Promise<{ message: string; data: any }> {
  return apiFetch('/profile', {
    method: 'PATCH',
    token,
    body: JSON.stringify(data),
  })
}

export async function refreshGitHubStats(token: string): Promise<{
  message: string
  data: any
}> {
  return apiFetch('/profile/refresh-github-stats', {
    method: 'POST',
    token,
  })
}

/**
 * Storage helpers for token management
 */
export function getStoredToken(): string | null {
  if (typeof window === 'undefined') return null
  return localStorage.getItem('auth_token')
}

export function setStoredToken(token: string): void {
  if (typeof window === 'undefined') return
  localStorage.setItem('auth_token', token)
}

export function clearStoredToken(): void {
  if (typeof window === 'undefined') return
  localStorage.removeItem('auth_token')
}
