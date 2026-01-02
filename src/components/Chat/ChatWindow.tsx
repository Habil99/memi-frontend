/**
 * Chat Window Component
 *
 * Real-time chat interface for buyer-seller communication
 */

'use client'

import { useState, useEffect, useRef } from 'react'
import { type Chat, type Message } from '@/services/api'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { chatSocketService } from '@/services/socket/chat-socket'
import { getClientAuthToken } from '@/lib/auth'
import Image from 'next/image'

interface ChatWindowProps {
  chat: Chat
  currentUserId: string
}

export default function ChatWindow({ chat, currentUserId }: ChatWindowProps) {
  const [messages, setMessages] = useState<Message[]>(chat.messages || [])
  const [newMessage, setNewMessage] = useState('')
  const [isConnected, setIsConnected] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const token = getClientAuthToken()
    if (!token) return

    chatSocketService.connect(chat.id, token)

    // Listen for new messages
    const unsubscribe = chatSocketService.on('MESSAGE', (data: Message) => {
      setMessages((prev) => [...prev, data])
    })

    setIsConnected(chatSocketService.isConnected())

    return () => {
      unsubscribe()
      chatSocketService.disconnect()
    }
  }, [chat.id])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newMessage.trim() || !isConnected) return

    chatSocketService.sendMessage(newMessage.trim())
    setNewMessage('')
  }

  const otherUser =
    currentUserId === chat.buyerId ? chat.seller : chat.buyer

  return (
    <div className="flex flex-col h-[600px]">
      <CardHeader className="border-b border-border-default">
        <div className="flex items-center gap-3">
          {otherUser && (
            <>
              {otherUser.avatar && (
                <Image
                  src={otherUser.avatar}
                  alt={otherUser.name}
                  width={40}
                  height={40}
                  className="rounded-full"
                />
              )}
              <div>
                <h3 className="font-semibold text-text-primary">
                  {otherUser.name}
                </h3>
                {chat.product && (
                  <p className="text-sm text-text-secondary">
                    {chat.product.title}
                  </p>
                )}
              </div>
            </>
          )}
        </div>
        {!isConnected && (
          <p className="text-xs text-state-warning mt-2">
            Connecting...
          </p>
        )}
      </CardHeader>

      <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 ? (
          <div className="text-center text-text-secondary py-8">
            No messages yet. Start the conversation!
          </div>
        ) : (
          messages.map((message) => {
            const isOwnMessage = message.senderId === currentUserId
            return (
              <div
                key={message.id}
                className={`flex ${isOwnMessage ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[70%] rounded-lg p-3 ${
                    isOwnMessage
                      ? 'bg-brand-primary text-text-inverse'
                      : 'bg-background-surface text-text-primary'
                  }`}
                >
                  <p className="text-sm">{message.content}</p>
                  <p
                    className={`text-xs mt-1 ${
                      isOwnMessage ? 'text-text-inverse opacity-70' : 'text-text-muted'
                    }`}
                  >
                    {new Date(message.createdAt).toLocaleTimeString()}
                  </p>
                </div>
              </div>
            )
          })
        )}
        <div ref={messagesEndRef} />
      </CardContent>

      {chat.isBlocked ? (
        <div className="p-4 border-t border-border-default">
          <p className="text-sm text-state-error text-center">
            This chat has been blocked
          </p>
        </div>
      ) : (
        <form onSubmit={handleSendMessage} className="p-4 border-t border-border-default">
          <div className="flex gap-2">
            <Input
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type a message..."
              disabled={!isConnected}
              fullWidth
            />
            <Button
              type="submit"
              variant="primary"
              disabled={!newMessage.trim() || !isConnected}
            >
              Send
            </Button>
          </div>
        </form>
      )}
    </div>
  )
}

