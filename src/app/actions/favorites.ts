/**
 * Server Actions for Favorites
 */

'use server'

import { serverApiClient } from '@/services/api/server-client'
import { cookies } from 'next/headers'

async function getAuthToken(): Promise<string | undefined> {
  const cookieStore = await cookies()
  return cookieStore.get('accessToken')?.value
}

export async function addFavorite(
  productId: string
): Promise<{ success: boolean; error?: string }> {
  try {
    const token = await getAuthToken()
    if (!token) {
      return { success: false, error: 'Unauthorized' }
    }

    await serverApiClient.post('/favorites', { productId }, token)
    return { success: true }
  } catch (error: any) {
    return {
      success: false,
      error: error.message || 'Failed to add favorite',
    }
  }
}

export async function removeFavorite(
  productId: string
): Promise<{ success: boolean; error?: string }> {
  try {
    const token = await getAuthToken()
    if (!token) {
      return { success: false, error: 'Unauthorized' }
    }

    await serverApiClient.delete(`/favorites/${productId}`, token)
    return { success: true }
  } catch (error: any) {
    return {
      success: false,
      error: error.message || 'Failed to remove favorite',
    }
  }
}

