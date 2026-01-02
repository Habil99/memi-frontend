/**
 * Messages Page (SSR)
 *
 * List of all user's chat conversations
 */

import { Metadata } from 'next'
import { notFound, redirect } from 'next/navigation'
import { getServerAuthToken } from '@/lib/auth'
import { serverApiClient } from '@/services/api/server-client'
import ChatList from '@/components/Chat/ChatList'

export const metadata: Metadata = {
  title: 'Messages | memi.az',
  robots: {
    index: false,
    follow: false,
  },
}

export default async function MessagesPage() {
  const token = await getServerAuthToken()

  if (!token) {
    redirect('/auth/login?redirect=/messages')
  }

  let chats = []
  let currentUserId = ''

  try {
    // Get user profile for current user ID
    const userProfile = await serverApiClient.get(
      '/users/profile',
      undefined,
      token
    )
    currentUserId = userProfile.id

    // Get all chats
    chats = await serverApiClient.get('/chat', undefined, token)
  } catch (error) {
    console.error('Error fetching chats:', error)
    // Return empty state if error
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold text-text-primary mb-8">Messages</h1>
      <ChatList chats={chats} currentUserId={currentUserId} />
    </div>
  )
}
