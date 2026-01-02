/**
 * Auth Utilities
 *
 * Utilities for handling authentication tokens
 * Works in both server and client contexts
 */

import { cookies } from 'next/headers'

/**
 * Get auth token from cookies (server-side)
 */
export async function getServerAuthToken(): Promise<string | null> {
  try {
    const cookieStore = await cookies()
    return cookieStore.get('accessToken')?.value || null
  } catch {
    return null
  }
}

/**
 * Get auth token from localStorage (client-side)
 */
export function getClientAuthToken(): string | null {
  if (typeof window === 'undefined') return null
  return localStorage.getItem('accessToken')
}

/**
 * Set auth token in cookies (server-side)
 */
export async function setServerAuthToken(token: string): Promise<void> {
  const cookieStore = await cookies()
  cookieStore.set('accessToken', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7, // 7 days
  })
}

