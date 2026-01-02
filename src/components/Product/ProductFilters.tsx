/**
 * Product Filters Component
 *
 * Client component for filtering products
 */

'use client'

import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select } from '@/components/ui/select'
import { Controller, useForm } from 'react-hook-form'
import type { Category } from '@/services/api'

interface ProductFiltersProps {
  categories: Category[]
}

interface FilterFormData {
  search?: string
  categoryId?: string
  condition?: string
  minPrice?: number
  maxPrice?: number
}

export default function ProductFilters({ categories }: ProductFiltersProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isOpen, setIsOpen] = useState(false)

  const { register, handleSubmit, control, reset } = useForm<FilterFormData>({
    defaultValues: {
      search: searchParams.get('search') || '',
      categoryId: searchParams.get('categoryId') || '',
      condition: searchParams.get('condition') || '',
      minPrice: searchParams.get('minPrice') ? parseFloat(searchParams.get('minPrice')!) : undefined,
      maxPrice: searchParams.get('maxPrice') ? parseFloat(searchParams.get('maxPrice')!) : undefined,
    },
  })

  const onSubmit = (data: FilterFormData) => {
    const params = new URLSearchParams()
    
    if (data.search) params.set('search', data.search)
    if (data.categoryId) params.set('categoryId', data.categoryId)
    if (data.condition) params.set('condition', data.condition)
    if (data.minPrice) params.set('minPrice', data.minPrice.toString())
    if (data.maxPrice) params.set('maxPrice', data.maxPrice.toString())

    router.push(`/products?${params.toString()}`)
  }

  const handleClear = () => {
    reset()
    router.push('/products')
  }

  const categoryOptions = [
    { value: '', label: 'All Categories' },
    ...categories.map((cat) => ({
      value: cat.id,
      label: cat.name,
    })),
  ]

  const conditionOptions = [
    { value: '', label: 'All Conditions' },
    { value: 'NEW', label: 'New' },
    { value: 'LIKE_NEW', label: 'Like New' },
    { value: 'EXCELLENT', label: 'Excellent' },
    { value: 'GOOD', label: 'Good' },
    { value: 'FAIR', label: 'Fair' },
    { value: 'POOR', label: 'Poor' },
  ]

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Filters</CardTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? 'Hide' : 'Show'}
          </Button>
        </div>
      </CardHeader>
      {isOpen && (
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Input
              label="Search"
              placeholder="Search products..."
              {...register('search')}
              fullWidth
            />

            <Controller
              name="categoryId"
              control={control}
              render={({ field }) => (
                <Select
                  label="Category"
                  options={categoryOptions}
                  {...field}
                  fullWidth
                />
              )}
            />

            <Controller
              name="condition"
              control={control}
              render={({ field }) => (
                <Select
                  label="Condition"
                  options={conditionOptions}
                  {...field}
                  fullWidth
                />
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Min Price (AZN)"
                type="number"
                step="0.01"
                {...register('minPrice', { valueAsNumber: true })}
                fullWidth
              />
              <Input
                label="Max Price (AZN)"
                type="number"
                step="0.01"
                {...register('maxPrice', { valueAsNumber: true })}
                fullWidth
              />
            </div>

            <div className="flex gap-2">
              <Button type="submit" variant="primary" className="flex-1">
                Apply Filters
              </Button>
              <Button
                type="button"
                variant="secondary"
                onClick={handleClear}
              >
                Clear
              </Button>
            </div>
          </form>
        </CardContent>
      )}
    </Card>
  )
}

