/**
 * Server-Side Products Data Fetching
 *
 * Functions for fetching products in server components
 */

import { serverApiClient } from '@/services/api/server-client'
import type {
  Product,
  ProductsResponse,
  ProductFilters,
} from '@/services/api'

export async function getProducts(
  filters?: ProductFilters
): Promise<ProductsResponse> {
  try {
    return await serverApiClient.get<ProductsResponse>('/products', filters)
  } catch (error) {
    console.error('Error fetching products:', error)
    return {
      data: [],
      total: 0,
      page: 1,
      limit: 20,
      totalPages: 0,
    }
  }
}

export async function getProduct(id: string): Promise<Product | null> {
  try {
    return await serverApiClient.get<Product>(`/products/${id}`)
  } catch (error) {
    console.error('Error fetching product:', error)
    return null
  }
}

export async function getFeaturedProducts(limit = 8): Promise<Product[]> {
  try {
    const response = await serverApiClient.get<ProductsResponse>('/products', {
      status: 'ACTIVE',
      limit,
      page: 1,
    })
    return response.data
  } catch (error) {
    console.error('Error fetching featured products:', error)
    return []
  }
}

export async function getNewArrivals(limit = 8): Promise<Product[]> {
  try {
    const response = await serverApiClient.get<ProductsResponse>('/products', {
      status: 'ACTIVE',
      limit,
      page: 1,
    })
    // Sort by createdAt if available, otherwise return as-is
    return response.data
  } catch (error) {
    console.error('Error fetching new arrivals:', error)
    return []
  }
}
