/**
 * Server Actions for Authentication
 *
 * Server actions for login and register
 */

'use server'

import { serverApiClient } from '@/services/api/server-client'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import type { LoginCredentials, RegisterData, AuthResponse } from '@/services/auth'

export async function loginAction(
  credentials: LoginCredentials
): Promise<{ success: boolean; error?: string }> {
  try {
    const response = await serverApiClient.post<AuthResponse>(
      '/auth/login',
      credentials
    )

    // Set cookies
    const cookieStore = await cookies()
    cookieStore.set('accessToken', response.accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7 days
    })
    cookieStore.set('refreshToken', response.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 30, // 30 days
    })
    cookieStore.set('userRole', response.user.role, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7 days
    })

    return { success: true }
  } catch (error: any) {
    return {
      success: false,
      error: error.message || 'Login failed',
    }
  }
}

export async function registerAction(
  data: RegisterData
): Promise<{ success: boolean; error?: string }> {
  try {
    const response = await serverApiClient.post<AuthResponse>(
      '/auth/register',
      data
    )

    // Set cookies
    const cookieStore = await cookies()
    cookieStore.set('accessToken', response.accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7 days
    })
    cookieStore.set('refreshToken', response.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 30, // 30 days
    })
    cookieStore.set('userRole', response.user.role, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7 days
    })

    return { success: true }
  } catch (error: any) {
    return {
      success: false,
      error: error.message || 'Registration failed',
    }
  }
}

export async function logoutAction() {
  const cookieStore = await cookies()
  cookieStore.delete('accessToken')
  cookieStore.delete('refreshToken')
  cookieStore.delete('userRole')
  redirect('/')
}

