/**
 * Chat API Service
 */

import { apiClient } from './client'

export interface Chat {
  id: string
  productId: string
  buyerId: string
  sellerId: string
  isBlocked: boolean
  messages?: Message[]
  product?: {
    id: string
    title: string
    price: number
    imageUrls: string[]
  }
  buyer?: {
    id: string
    name: string
    avatar?: string
  }
  seller?: {
    id: string
    name: string
    avatar?: string
  }
}

export interface Message {
  id: string
  chatId: string
  senderId: string
  content: string
  createdAt: string
  sender?: {
    id: string
    name: string
    avatar?: string
  }
}

class ChatService {
  async create(productId: string): Promise<Chat> {
    return apiClient.post<Chat>('/chat', { productId })
  }

  async getAll(): Promise<Chat[]> {
    return apiClient.get<Chat[]>('/chat')
  }

  async getById(id: string): Promise<Chat> {
    return apiClient.get<Chat>(`/chat/${id}`)
  }

  async block(id: string): Promise<Chat> {
    return apiClient.put<Chat>(`/chat/${id}/block`)
  }

  async unblock(id: string): Promise<Chat> {
    return apiClient.put<Chat>(`/chat/${id}/unblock`)
  }
}

export const chatService = new ChatService()

