/**
 * Categories Hooks
 */

import { useQuery } from '@tanstack/react-query'
import { categoriesService, type Category } from '@/services/api'

export function useCategories() {
  return useQuery({
    queryKey: ['categories'],
    queryFn: () => categoriesService.getAll(),
  })
}

export function useCategory(id: string) {
  return useQuery({
    queryKey: ['category', id],
    queryFn: () => categoriesService.getById(id),
    enabled: !!id,
  })
}

export function useCategoryBySlug(slug: string) {
  return useQuery({
    queryKey: ['category', 'slug', slug],
    queryFn: () => categoriesService.getBySlug(slug),
    enabled: !!slug,
  })
}

export function useCategoriesWithSubcategories() {
  return useQuery({
    queryKey: ['categories', 'with-subcategories'],
    queryFn: () => categoriesService.getAllWithSubcategories(),
  })
}

