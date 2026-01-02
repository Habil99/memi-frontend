/**
 * Categories API Service
 */

import { apiClient } from './client'

export interface Category {
  id: string
  name: string
  slug: string
  description?: string
  subcategories?: Subcategory[]
}

export interface Subcategory {
  id: string
  name: string
  slug: string
  categoryId: string
}

class CategoriesService {
  async getAll(): Promise<Category[]> {
    return apiClient.get<Category[]>('/categories')
  }

  async getById(id: string): Promise<Category> {
    return apiClient.get<Category>(`/categories/${id}`)
  }

  async getBySlug(slug: string): Promise<Category> {
    return apiClient.get<Category>(`/categories/slug/${slug}`)
  }

  async getAllWithSubcategories(): Promise<Category[]> {
    return apiClient.get<Category[]>('/categories/with-subcategories')
  }
}

export const categoriesService = new CategoriesService()

