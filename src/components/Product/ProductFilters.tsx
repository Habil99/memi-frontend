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
import { useDebouncedSearch } from '@/hooks/use-debounced-search'
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

  // Debounced search hook - updates URL automatically
  const {
    searchValue,
    handleChange: handleSearchChange,
    handleClear: handleSearchClear,
    isSearching,
  } = useDebouncedSearch({
    paramName: 'search',
    debounceDelay: 500,
  })

  const { handleSubmit, control, reset, register } = useForm<FilterFormData>({
    defaultValues: {
      categoryId: searchParams.get('categoryId') || '',
      condition: searchParams.get('condition') || '',
      minPrice: searchParams.get('minPrice') ? parseFloat(searchParams.get('minPrice')!) : undefined,
      maxPrice: searchParams.get('maxPrice') ? parseFloat(searchParams.get('maxPrice')!) : undefined,
    },
  })

  const onSubmit = (data: FilterFormData) => {
    const params = new URLSearchParams(searchParams.toString())
    
    // Preserve search from debounced hook
    if (searchValue) params.set('search', searchValue)
    else params.delete('search')
    
    // Update other filters
    if (data.categoryId) params.set('categoryId', data.categoryId)
    else params.delete('categoryId')
    
    if (data.condition) params.set('condition', data.condition)
    else params.delete('condition')
    
    if (data.minPrice) params.set('minPrice', data.minPrice.toString())
    else params.delete('minPrice')
    
    if (data.maxPrice) params.set('maxPrice', data.maxPrice.toString())
    else params.delete('maxPrice')
    
    // Reset to page 1 when filters change
    params.delete('page')

    router.push(`/products?${params.toString()}`)
  }

  const handleClear = () => {
    reset()
    handleSearchClear()
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
            <div>
              <Input
                label="Search"
                placeholder="Search products..."
                value={searchValue}
                onChange={(e) => handleSearchChange(e.target.value)}
                fullWidth
              />
              {isSearching && (
                <p className="text-xs text-text-muted mt-1">
                  Searching...
                </p>
              )}
            </div>

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

