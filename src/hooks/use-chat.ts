/**
 * Chat Hooks
 */

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { chatService, type Chat } from '@/services/api'

export function useChats() {
  return useQuery({
    queryKey: ['chats'],
    queryFn: () => chatService.getAll(),
    enabled: typeof window !== 'undefined', // Only fetch if authenticated
  })
}

export function useChat(id: string) {
  return useQuery({
    queryKey: ['chat', id],
    queryFn: () => chatService.getById(id),
    enabled: !!id,
  })
}

export function useCreateChat() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (productId: string) => chatService.create(productId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['chats'] })
    },
  })
}

export function useBlockChat() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) => chatService.block(id),
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: ['chats'] })
      queryClient.invalidateQueries({ queryKey: ['chat', id] })
    },
  })
}

export function useUnblockChat() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) => chatService.unblock(id),
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: ['chats'] })
      queryClient.invalidateQueries({ queryKey: ['chat', id] })
    },
  })
}

