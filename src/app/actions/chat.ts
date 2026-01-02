/**
 * Server Actions for Chat
 */

'use server'

import { serverApiClient } from '@/services/api/server-client'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

async function getAuthToken(): Promise<string | undefined> {
  const cookieStore = await cookies()
  return cookieStore.get('accessToken')?.value
}

export async function createChatAction(
  productId: string
): Promise<{ success: boolean; chatId?: string; error?: string }> {
  try {
    const token = await getAuthToken()
    if (!token) {
      return { success: false, error: 'Unauthorized' }
    }

    const chat = await serverApiClient.post('/chat', { productId }, token)
    return { success: true, chatId: chat.id }
  } catch (error: any) {
    return {
      success: false,
      error: error.message || 'Failed to create chat',
    }
  }
}

