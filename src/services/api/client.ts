/**
 * API Client
 * 
 * Centralized API client for all backend requests
 * Handles authentication, error handling, and token refresh
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api/v1'

export interface ApiError {
  message: string
  status: number
  errors?: Record<string, string[]>
}

class ApiClient {
  private baseURL: string

  constructor(baseURL: string) {
    this.baseURL = baseURL
  }

  private async getAuthHeaders(): Promise<HeadersInit> {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    }

    // Get token from storage (implement based on your auth solution)
    const token = typeof window !== 'undefined' 
      ? localStorage.getItem('accessToken') 
      : null

    if (token) {
      headers['Authorization'] = `Bearer ${token}`
    }

    return headers
  }

  private async handleResponse<T>(response: Response): Promise<T> {
    if (!response.ok) {
      const error: ApiError = {
        message: 'An error occurred',
        status: response.status,
      }

      try {
        const data = await response.json()
        error.message = data.message || error.message
        error.errors = data.errors
      } catch {
        error.message = response.statusText || error.message
      }

      // Handle 401 - Unauthorized (token expired)
      if (response.status === 401) {
        // Trigger token refresh or redirect to login
        if (typeof window !== 'undefined') {
          localStorage.removeItem('accessToken')
          localStorage.removeItem('refreshToken')
          // Redirect to login or trigger auth refresh
        }
      }

      throw error
    }

    return response.json()
  }

  async get<T>(endpoint: string, params?: Record<string, unknown>): Promise<T> {
    const url = new URL(`${this.baseURL}${endpoint}`)
    
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          url.searchParams.append(key, String(value))
        }
      })
    }

    const response = await fetch(url.toString(), {
      method: 'GET',
      headers: await this.getAuthHeaders(),
    })

    return this.handleResponse<T>(response)
  }

  async post<T>(endpoint: string, data?: unknown): Promise<T> {
    const response = await fetch(`${this.baseURL}${endpoint}`, {
      method: 'POST',
      headers: await this.getAuthHeaders(),
      body: data ? JSON.stringify(data) : undefined,
    })

    return this.handleResponse<T>(response)
  }

  async put<T>(endpoint: string, data?: unknown): Promise<T> {
    const response = await fetch(`${this.baseURL}${endpoint}`, {
      method: 'PUT',
      headers: await this.getAuthHeaders(),
      body: data ? JSON.stringify(data) : undefined,
    })

    return this.handleResponse<T>(response)
  }

  async delete<T>(endpoint: string): Promise<T> {
    const response = await fetch(`${this.baseURL}${endpoint}`, {
      method: 'DELETE',
      headers: await this.getAuthHeaders(),
    })

    return this.handleResponse<T>(response)
  }

  async upload<T = { url: string } | { urls: string[] }>(
    endpoint: string,
    formData: FormData
  ): Promise<T> {
    const headers: HeadersInit = {}
    
    const token = typeof window !== 'undefined' 
      ? localStorage.getItem('accessToken') 
      : null

    if (token) {
      headers['Authorization'] = `Bearer ${token}`
    }

    const response = await fetch(`${this.baseURL}${endpoint}`, {
      method: 'POST',
      headers,
      body: formData,
    })

    return this.handleResponse<T>(response)
  }
}

export const apiClient = new ApiClient(API_BASE_URL)

