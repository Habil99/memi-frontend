/**
 * Users API Service
 */

import { apiClient } from './client'

export interface User {
  id: string
  email: string
  name: string
  role: 'USER' | 'ADMIN'
  city?: string
  phone?: string
  avatar?: string
}

export interface UpdateProfileDto {
  name?: string
  city?: string
  phone?: string
  avatar?: string
}

class UsersService {
  async getProfile(): Promise<User> {
    return apiClient.get<User>('/users/profile')
  }

  async updateProfile(data: UpdateProfileDto): Promise<User> {
    return apiClient.put<User>('/users/profile', data)
  }

  async getPublicProfile(id: string): Promise<Omit<User, 'email'>> {
    return apiClient.get<Omit<User, 'email'>>(`/users/${id}/public`)
  }
}

export const usersService = new UsersService()

