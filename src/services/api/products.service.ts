/**
 * Products API Service
 * 
 * Handles all product-related API calls
 */

import { apiClient } from './client'

export interface Product {
  id: string
  title: string
  description: string
  price: number
  condition: 'NEW' | 'LIKE_NEW' | 'EXCELLENT' | 'GOOD' | 'FAIR' | 'POOR'
  status: 'ACTIVE' | 'RESERVED' | 'SOLD' | 'DELETED'
  sellerId: string
  categoryId?: string
  subcategoryId?: string
  size?: string
  color?: string
  brand?: string
  material?: string
  location?: string
  imageUrls: string[]
  category?: {
    id: string
    name: string
    slug: string
  }
  seller?: {
    id: string
    name: string
    city?: string
  }
  createdAt?: string
  updatedAt?: string
}

export interface ProductsResponse {
  data: Product[]
  total: number
  page: number
  limit: number
  totalPages: number
}

export interface CreateProductDto {
  title: string
  description: string
  price: number
  condition: 'NEW' | 'LIKE_NEW' | 'EXCELLENT' | 'GOOD' | 'FAIR' | 'POOR'
  categoryId: string
  subcategoryId?: string
  size?: string
  color?: string
  brand?: string
  material?: string
  location?: string
  imageUrls: string[]
}

export interface UpdateProductDto extends Partial<CreateProductDto> {
  status?: 'ACTIVE' | 'RESERVED' | 'SOLD' | 'DELETED'
}

export interface ProductFilters {
  search?: string
  categoryId?: string
  subcategoryId?: string
  sellerId?: string
  condition?: Product['condition']
  status?: Product['status']
  location?: string
  brand?: string
  color?: string
  minPrice?: number
  maxPrice?: number
  page?: number
  limit?: number
}

class ProductsService {
  async getAll(filters?: ProductFilters): Promise<ProductsResponse> {
    return apiClient.get<ProductsResponse>('/products', filters)
  }

  async getById(id: string): Promise<Product> {
    return apiClient.get<Product>(`/products/${id}`)
  }

  async create(data: CreateProductDto): Promise<Product> {
    return apiClient.post<Product>('/products', data)
  }

  async update(id: string, data: UpdateProductDto): Promise<Product> {
    return apiClient.put<Product>(`/products/${id}`, data)
  }

  async delete(id: string): Promise<{ message: string }> {
    return apiClient.delete<{ message: string }>(`/products/${id}`)
  }
}

export const productsService = new ProductsService()

