/**
 * Server-Side API Client
 *
 * API client for server components and server actions
 * Does not use localStorage or browser APIs
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api/v1'

export interface ApiError {
  message: string
  status: number
  errors?: Record<string, string[]>
}

class ServerApiClient {
  private baseURL: string

  constructor(baseURL: string) {
    this.baseURL = baseURL
  }

  private getAuthHeaders(token?: string): HeadersInit {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    }

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

      throw error
    }

    return response.json()
  }

  async get<T>(
    endpoint: string,
    params?: Record<string, unknown>,
    token?: string
  ): Promise<T> {
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
      headers: this.getAuthHeaders(token),
      cache: 'no-store', // Always fetch fresh data on server
    })

    return this.handleResponse<T>(response)
  }

  async post<T>(
    endpoint: string,
    data?: unknown,
    token?: string
  ): Promise<T> {
    const response = await fetch(`${this.baseURL}${endpoint}`, {
      method: 'POST',
      headers: this.getAuthHeaders(token),
      body: data ? JSON.stringify(data) : undefined,
      cache: 'no-store',
    })

    return this.handleResponse<T>(response)
  }

  async put<T>(
    endpoint: string,
    data?: unknown,
    token?: string
  ): Promise<T> {
    const response = await fetch(`${this.baseURL}${endpoint}`, {
      method: 'PUT',
      headers: this.getAuthHeaders(token),
      body: data ? JSON.stringify(data) : undefined,
      cache: 'no-store',
    })

    return this.handleResponse<T>(response)
  }

  async delete<T>(endpoint: string, token?: string): Promise<T> {
    const response = await fetch(`${this.baseURL}${endpoint}`, {
      method: 'DELETE',
      headers: this.getAuthHeaders(token),
      cache: 'no-store',
    })

    return this.handleResponse<T>(response)
  }
}

export const serverApiClient = new ServerApiClient(API_BASE_URL)

