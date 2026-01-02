/**
 * Server Actions for Products
 *
 * Server actions for product mutations (create, update, delete)
 * These run on the server and can be called from client components
 */

'use server'

import { serverApiClient } from '@/services/api/server-client'
import type {
  Product,
  CreateProductDto,
  UpdateProductDto,
} from '@/services/api'
import { cookies } from 'next/headers'

async function getAuthToken(): Promise<string | undefined> {
  const cookieStore = await cookies()
  return cookieStore.get('accessToken')?.value
}

export async function createProduct(
  data: CreateProductDto
): Promise<{ success: boolean; product?: Product; error?: string }> {
  try {
    const token = await getAuthToken()
    if (!token) {
      return { success: false, error: 'Unauthorized' }
    }

    const product = await serverApiClient.post<Product>(
      '/products',
      data,
      token
    )
    return { success: true, product }
  } catch (error: any) {
    return {
      success: false,
      error: error.message || 'Failed to create product',
    }
  }
}

export async function updateProduct(
  id: string,
  data: UpdateProductDto
): Promise<{ success: boolean; product?: Product; error?: string }> {
  try {
    const token = await getAuthToken()
    if (!token) {
      return { success: false, error: 'Unauthorized' }
    }

    const product = await serverApiClient.put<Product>(
      `/products/${id}`,
      data,
      token
    )
    return { success: true, product }
  } catch (error: any) {
    return {
      success: false,
      error: error.message || 'Failed to update product',
    }
  }
}

export async function deleteProduct(
  id: string
): Promise<{ success: boolean; error?: string }> {
  try {
    const token = await getAuthToken()
    if (!token) {
      return { success: false, error: 'Unauthorized' }
    }

    await serverApiClient.delete(`/products/${id}`, token)
    return { success: true }
  } catch (error: any) {
    return {
      success: false,
      error: error.message || 'Failed to delete product',
    }
  }
}

