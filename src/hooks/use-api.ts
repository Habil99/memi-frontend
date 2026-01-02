/**
 * React Query Hooks for API Calls
 * 
 * Custom hooks for data fetching using React Query
 */

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { apiClient, type ApiError } from '../services/api'

// Example hook - Products
export function useProducts(params?: {
  search?: string
  categoryId?: string
  page?: number
  limit?: number
}) {
  return useQuery({
    queryKey: ['products', params],
    queryFn: () => apiClient.get('/products', params),
  })
}

export function useProduct(id: string) {
  return useQuery({
    queryKey: ['product', id],
    queryFn: () => apiClient.get(`/products/${id}`),
    enabled: !!id,
  })
}

export function useCreateProduct() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: (data: unknown) => apiClient.post('/products', data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] })
    },
  })
}

// Example hook - Auth
export function useLogin() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: (credentials: { email: string; password: string }) =>
      apiClient.post('/auth/login', credentials),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user'] })
    },
  })
}

