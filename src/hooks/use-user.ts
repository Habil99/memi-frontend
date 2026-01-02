/**
 * User Hooks
 */

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { usersService, type User, type UpdateProfileDto } from '@/services/api'

export function useUserProfile() {
  return useQuery({
    queryKey: ['user', 'profile'],
    queryFn: () => usersService.getProfile(),
    enabled: typeof window !== 'undefined', // Only fetch if authenticated
  })
}

export function usePublicUserProfile(id: string) {
  return useQuery({
    queryKey: ['user', 'public', id],
    queryFn: () => usersService.getPublicProfile(id),
    enabled: !!id,
  })
}

export function useUpdateProfile() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: UpdateProfileDto) => usersService.updateProfile(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user', 'profile'] })
    },
  })
}

