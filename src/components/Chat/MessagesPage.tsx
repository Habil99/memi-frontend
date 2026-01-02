/**
 * Messages Page Component
 *
 * Client component for displaying user chats
 */

'use client'

import { type Chat } from '@/services/api'
import { Card, CardContent } from '@/components/ui/card'
import { EmptyState } from '@/components/ui/empty-state'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'

interface MessagesPageProps {
  chats: Chat[]
}

export default function MessagesPage({ chats }: MessagesPageProps) {
  if (chats.length === 0) {
    return (
      <EmptyState
        title="No messages yet"
        description="Start a conversation by contacting a seller about a product"
        icon={
          <svg
            className="w-16 h-16 text-text-muted"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
            />
          </svg>
        }
      />
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-text-primary mb-8">Messages</h1>

      <div className="space-y-4">
        {chats.map((chat) => (
          <Link key={chat.id} href={`/messages/${chat.id}`}>
            <Card hover>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h3 className="font-semibold text-text-primary mb-1">
                      {chat.product?.title || 'Product'}
                    </h3>
                    <p className="text-sm text-text-secondary">
                      {chat.messages && chat.messages.length > 0
                        ? chat.messages[chat.messages.length - 1].content
                        : 'No messages yet'}
                    </p>
                  </div>
                  <div className="ml-4">
                    {chat.isBlocked && (
                      <Badge variant="error">Blocked</Badge>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}

