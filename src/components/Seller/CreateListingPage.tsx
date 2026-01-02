/**
 * Create Listing Page Component
 *
 * Client component for creating a new product listing
 */

'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Select } from '@/components/ui/select'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { createProduct } from '@/app/actions/products'
import { uploadService } from '@/services/api'
import toast from 'react-hot-toast'
import type { Category } from '@/services/api'

const createListingSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  price: z.number().min(0, 'Price must be positive'),
  condition: z.enum(['NEW', 'LIKE_NEW', 'EXCELLENT', 'GOOD', 'FAIR', 'POOR']),
  categoryId: z.string().min(1, 'Category is required'),
  subcategoryId: z.string().optional(),
  size: z.string().optional(),
  color: z.string().optional(),
  brand: z.string().optional(),
  material: z.string().optional(),
  location: z.string().optional(),
})

type CreateListingFormData = z.infer<typeof createListingSchema>

interface CreateListingPageProps {
  categories: Category[]
}

export default function CreateListingPage({
  categories,
}: CreateListingPageProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [images, setImages] = useState<File[]>([])

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    setValue,
    watch,
  } = useForm<CreateListingFormData>({
    resolver: zodResolver(createListingSchema),
  })

  const selectedCategory = watch('categoryId')

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    if (images.length + files.length > 8) {
      toast.error('Maximum 8 images allowed')
      return
    }
    setImages([...images, ...files])
  }

  const removeImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index))
  }

  const onSubmit = async (data: CreateListingFormData) => {
    setIsLoading(true)
    try {
      // Upload images first
      let imageUrls: string[] = []
      if (images.length > 0) {
        const uploadResult = await uploadService.uploadMultiple(images)
        imageUrls = uploadResult.urls || []
      }

      // Create product
      const result = await createProduct({
        ...data,
        imageUrls,
      })

      if (result.success) {
        toast.success('Listing created successfully!')
        router.push('/seller/listings')
      } else {
        toast.error(result.error || 'Failed to create listing')
      }
    } catch (error: any) {
      toast.error(error.message || 'Failed to create listing')
    } finally {
      setIsLoading(false)
    }
  }

  const categoryOptions = categories.map((cat) => ({
    value: cat.id,
    label: cat.name,
  }))

  const conditionOptions = [
    { value: 'NEW', label: 'New' },
    { value: 'LIKE_NEW', label: 'Like New' },
    { value: 'EXCELLENT', label: 'Excellent' },
    { value: 'GOOD', label: 'Good' },
    { value: 'FAIR', label: 'Fair' },
    { value: 'POOR', label: 'Poor' },
  ]

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold text-text-primary mb-8">
        Create New Listing
      </h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Product Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input
              label="Title"
              {...register('title')}
              error={errors.title?.message}
              fullWidth
              required
            />

            <Textarea
              label="Description"
              {...register('description')}
              error={errors.description?.message}
              fullWidth
              required
              rows={5}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Price (AZN)"
                type="number"
                step="0.01"
                {...register('price', { valueAsNumber: true })}
                error={errors.price?.message}
                fullWidth
                required
              />

              <Controller
                name="condition"
                control={control}
                render={({ field }) => (
                  <Select
                    label="Condition"
                    options={conditionOptions}
                    {...field}
                    error={errors.condition?.message}
                    fullWidth
                    required
                  />
                )}
              />
            </div>

            <Controller
              name="categoryId"
              control={control}
              render={({ field }) => (
                <Select
                  label="Category"
                  options={categoryOptions}
                  {...field}
                  error={errors.categoryId?.message}
                  fullWidth
                  required
                />
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Size (Optional)"
                {...register('size')}
                error={errors.size?.message}
                fullWidth
              />

              <Input
                label="Color (Optional)"
                {...register('color')}
                error={errors.color?.message}
                fullWidth
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Brand (Optional)"
                {...register('brand')}
                error={errors.brand?.message}
                fullWidth
              />

              <Input
                label="Location (Optional)"
                {...register('location')}
                error={errors.location?.message}
                fullWidth
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Images (Max 8)</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageUpload}
              className="block w-full text-sm text-text-secondary file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-brand-primary file:text-text-inverse hover:file:opacity-90"
            />

            {images.length > 0 && (
              <div className="grid grid-cols-4 gap-4">
                {images.map((image, index) => (
                  <div key={index} className="relative">
                    <img
                      src={URL.createObjectURL(image)}
                      alt={`Preview ${index + 1}`}
                      className="w-full h-32 object-cover rounded-md"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute top-1 right-1 bg-state-error text-white rounded-full w-6 h-6 flex items-center justify-center text-xs"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <div className="flex gap-4">
          <Button
            type="submit"
            variant="primary"
            isLoading={isLoading}
            disabled={images.length === 0}
          >
            Create Listing
          </Button>
          <Button
            type="button"
            variant="secondary"
            onClick={() => router.back()}
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  )
}

