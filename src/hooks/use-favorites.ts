/**
 * Favorites Hooks
 */

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { favoritesService, type Favorite } from '@/services/api'

export function useFavorites() {
  return useQuery({
    queryKey: ['favorites'],
    queryFn: () => favoritesService.getAll(),
    enabled: typeof window !== 'undefined', // Only fetch if authenticated
  })
}

export function useFavoriteCount(productId: string) {
  return useQuery({
    queryKey: ['favorites', 'count', productId],
    queryFn: () => favoritesService.getCount(productId),
    enabled: !!productId,
  })
}

export function useAddFavorite() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (productId: string) => favoritesService.add(productId),
    onSuccess: (_, productId) => {
      queryClient.invalidateQueries({ queryKey: ['favorites'] })
      queryClient.invalidateQueries({ queryKey: ['favorites', 'count', productId] })
    },
  })
}

export function useRemoveFavorite() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (productId: string) => favoritesService.remove(productId),
    onSuccess: (_, productId) => {
      queryClient.invalidateQueries({ queryKey: ['favorites'] })
      queryClient.invalidateQueries({ queryKey: ['favorites', 'count', productId] })
    },
  })
}

