/**
 * Chat List Component
 *
 * Displays list of user's chat conversations
 */

'use client'

import { type Chat } from '@/services/api'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import Image from 'next/image'
import Link from 'next/link'
// Date formatting utility
function formatTimeAgo(dateString: string): string {
  const date = new Date(dateString)
  const now = new Date()
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000)

  if (diffInSeconds < 60) return 'just now'
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`
  if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)}d ago`
  return date.toLocaleDateString()
}

interface ChatListProps {
  chats: Chat[]
  currentUserId: string
}

export default function ChatList({ chats, currentUserId }: ChatListProps) {
  if (chats.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-text-secondary">No conversations yet</p>
        <p className="text-sm text-text-muted mt-2">
          Start a conversation by contacting a seller
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {chats.map((chat) => {
        const otherUser =
          currentUserId === chat.buyerId ? chat.seller : chat.buyer
        const lastMessage = chat.messages?.[chat.messages.length - 1]
        const unreadCount = 0 // TODO: Add unread count from API

        return (
          <Link key={chat.id} href={`/messages/${chat.id}`}>
            <Card hover>
              <CardContent className="p-4">
                <div className="flex items-start gap-4">
                  {/* Product Image */}
                  {chat.product?.imageUrls?.[0] && (
                    <div className="relative w-16 h-16 flex-shrink-0">
                      <Image
                        src={chat.product.imageUrls[0]}
                        alt={chat.product.title}
                        fill
                        className="object-cover rounded-lg"
                      />
                    </div>
                  )}

                  {/* Chat Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-1">
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-text-primary truncate">
                          {otherUser?.name || 'Unknown User'}
                        </h3>
                        {chat.product && (
                          <p className="text-sm text-text-secondary truncate">
                            {chat.product.title}
                          </p>
                        )}
                      </div>
                      {unreadCount > 0 && (
                        <Badge variant="primary">{unreadCount}</Badge>
                      )}
                    </div>

                    {lastMessage && (
                      <div className="flex items-center justify-between mt-2">
                        <p className="text-sm text-text-secondary truncate flex-1">
                          {lastMessage.content}
                        </p>
                        <span className="text-xs text-text-muted ml-2">
                          {formatTimeAgo(lastMessage.createdAt)}
                        </span>
                      </div>
                    )}

                    {chat.isBlocked && (
                      <Badge variant="error" className="mt-2">
                        Blocked
                      </Badge>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        )
      })}
    </div>
  )
}

