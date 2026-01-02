/**
 * Server-Side Categories Data Fetching
 */

import { serverApiClient } from '@/services/api/server-client'
import type { Category } from '@/services/api'

export async function getCategories(): Promise<Category[]> {
  try {
    return await serverApiClient.get<Category[]>('/categories')
  } catch (error) {
    console.error('Error fetching categories:', error)
    return []
  }
}

export async function getCategory(id: string): Promise<Category | null> {
  try {
    return await serverApiClient.get<Category>(`/categories/${id}`)
  } catch (error) {
    console.error('Error fetching category:', error)
    return null
  }
}

export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  try {
    return await serverApiClient.get<Category>(`/categories/slug/${slug}`)
  } catch (error) {
    console.error('Error fetching category by slug:', error)
    return null
  }
}

export async function getCategoriesWithSubcategories(): Promise<Category[]> {
  try {
    return await serverApiClient.get<Category[]>('/categories/with-subcategories')
  } catch (error) {
    console.error('Error fetching categories with subcategories:', error)
    return []
  }
}

