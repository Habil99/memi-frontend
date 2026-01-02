/**
 * Product Details Component
 *
 * Client component for product details page
 * Receives product data from server component
 */

'use client'

import { type Product } from '@/services/api'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createChatAction } from '@/app/actions/chat'
import { addFavorite, removeFavorite } from '@/app/actions/favorites'
import { useAuthStore } from '@/store'
import toast from 'react-hot-toast'

interface ProductDetailsProps {
  product: Product
}

export default function ProductDetails({ product }: ProductDetailsProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const [isFavorite, setIsFavorite] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { isAuthenticated } = useAuthStore()

  const handleContactSeller = async () => {
    if (!isAuthenticated) {
      router.push('/auth/login?redirect=' + encodeURIComponent(`/products/${product.id}`))
      return
    }

    setIsLoading(true)
    try {
      const result = await createChatAction(product.id)
      if (result.success && result.chatId) {
        router.push(`/messages/${result.chatId}`)
      } else {
        toast.error(result.error || 'Failed to start conversation')
      }
    } catch (error: any) {
      toast.error(error.message || 'Failed to start conversation')
    } finally {
      setIsLoading(false)
    }
  }

  const handleToggleFavorite = async () => {
    if (!isAuthenticated) {
      router.push('/auth/login?redirect=' + encodeURIComponent(`/products/${product.id}`))
      return
    }

    setIsLoading(true)
    try {
      const result = isFavorite
        ? await removeFavorite(product.id)
        : await addFavorite(product.id)

      if (result.success) {
        setIsFavorite(!isFavorite)
        toast.success(isFavorite ? 'Removed from favorites' : 'Added to favorites')
      } else {
        toast.error(result.error || 'Failed to update favorites')
      }
    } catch (error: any) {
      toast.error(error.message || 'Failed to update favorites')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Image Gallery */}
        <div>
          <div className="relative aspect-square mb-4">
            {product.imageUrls.length > 0 ? (
              <Image
                src={product.imageUrls[selectedImageIndex]}
                alt={product.title}
                fill
                className="object-cover rounded-lg"
                priority
              />
            ) : (
              <div className="w-full h-full bg-background-surface flex items-center justify-center rounded-lg">
                <span className="text-text-muted">No image</span>
              </div>
            )}
          </div>
          {product.imageUrls.length > 1 && (
            <div className="grid grid-cols-4 gap-2">
              {product.imageUrls.map((url, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImageIndex(index)}
                  className={`relative aspect-square rounded-md overflow-hidden border-2 ${
                    selectedImageIndex === index
                      ? 'border-brand-accent'
                      : 'border-border-default'
                  }`}
                >
                  <Image
                    src={url}
                    alt={`${product.title} ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div>
          <h1 className="text-3xl font-bold text-text-primary mb-4">
            {product.title}
          </h1>

          <div className="flex items-center gap-4 mb-4">
            <span className="text-3xl font-bold text-brand-primary">
              {product.price} AZN
            </span>
            <Badge variant="default">{product.condition}</Badge>
            <Badge
              variant={
                product.status === 'ACTIVE'
                  ? 'success'
                  : product.status === 'SOLD'
                    ? 'error'
                    : 'warning'
              }
            >
              {product.status}
            </Badge>
          </div>

          {product.description && (
            <Card className="mb-4">
              <CardContent className="p-4">
                <h2 className="font-semibold mb-2">Description</h2>
                <p className="text-text-secondary whitespace-pre-line">
                  {product.description}
                </p>
              </CardContent>
            </Card>
          )}

          {/* Product Details */}
          <Card className="mb-4">
            <CardContent className="p-4">
              <h2 className="font-semibold mb-2">Details</h2>
              <dl className="grid grid-cols-2 gap-2">
                {product.brand && (
                  <>
                    <dt className="text-text-secondary">Brand</dt>
                    <dd className="text-text-primary">{product.brand}</dd>
                  </>
                )}
                {product.size && (
                  <>
                    <dt className="text-text-secondary">Size</dt>
                    <dd className="text-text-primary">{product.size}</dd>
                  </>
                )}
                {product.color && (
                  <>
                    <dt className="text-text-secondary">Color</dt>
                    <dd className="text-text-primary">{product.color}</dd>
                  </>
                )}
                {product.location && (
                  <>
                    <dt className="text-text-secondary">Location</dt>
                    <dd className="text-text-primary">{product.location}</dd>
                  </>
                )}
              </dl>
            </CardContent>
          </Card>

          {/* Seller Info */}
          {product.seller && (
            <Card className="mb-4">
              <CardContent className="p-4">
                <h2 className="font-semibold mb-2">Seller</h2>
                <p className="text-text-primary">{product.seller.name}</p>
                {product.seller.city && (
                  <p className="text-sm text-text-secondary">{product.seller.city}</p>
                )}
              </CardContent>
            </Card>
          )}

          {/* Actions */}
          <div className="flex gap-4">
            <Button
              variant="primary"
              className="flex-1"
              onClick={handleContactSeller}
              disabled={isLoading || product.status !== 'ACTIVE'}
            >
              {product.status === 'ACTIVE' ? 'Contact Seller' : 'Product Unavailable'}
            </Button>
            <Button
              variant="outline"
              onClick={handleToggleFavorite}
              disabled={isLoading}
            >
              {isFavorite ? '❤️' : '🤍'} Favorite
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

