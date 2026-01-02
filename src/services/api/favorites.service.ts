/**
 * Favorites API Service
 */

import { apiClient } from './client'

export interface Favorite {
  id: string
  productId: string
  userId: string
  product?: {
    id: string
    title: string
    price: number
    imageUrls: string[]
  }
}

class FavoritesService {
  async getAll(): Promise<Favorite[]> {
    return apiClient.get<Favorite[]>('/favorites')
  }

  async add(productId: string): Promise<{ message: string }> {
    return apiClient.post<{ message: string }>('/favorites', { productId })
  }

  async remove(productId: string): Promise<{ message: string }> {
    return apiClient.delete<{ message: string }>(`/favorites/${productId}`)
  }

  async getCount(productId: string): Promise<{ productId: string; count: number }> {
    return apiClient.get<{ productId: string; count: number }>(
      `/favorites/count/${productId}`
    )
  }
}

export const favoritesService = new FavoritesService()

