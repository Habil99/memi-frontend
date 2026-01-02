/**
 * Authentication Hooks
 */

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { authService, type LoginCredentials, type RegisterData } from '@/services/auth'
import { useAuthStore } from '@/store'

export function useLogin() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (credentials: LoginCredentials) => authService.login(credentials),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user'] })
    },
  })
}

export function useRegister() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: RegisterData) => authService.register(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user'] })
    },
  })
}

export function useLogout() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: () => authService.logout(),
    onSuccess: () => {
      queryClient.clear()
    },
  })
}

export function useAuth() {
  const { user, isAuthenticated, logout } = useAuthStore()
  return {
    user,
    isAuthenticated,
    logout,
  }
}

