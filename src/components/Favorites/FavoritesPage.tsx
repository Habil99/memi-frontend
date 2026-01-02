/**
 * Favorites Page Component
 *
 * Client component for displaying user favorites
 */

'use client'

import { type Favorite } from '@/services/api'
import { Card, CardContent } from '@/components/ui/card'
import { EmptyState } from '@/components/ui/empty-state'
import Image from 'next/image'
import Link from 'next/link'

interface FavoritesPageProps {
  favorites: Favorite[]
}

export default function FavoritesPage({ favorites }: FavoritesPageProps) {
  if (favorites.length === 0) {
    return (
      <EmptyState
        title="No favorites yet"
        description="Start adding products to your favorites to see them here"
        icon={
          <svg
            className="w-16 h-16 text-text-muted"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
          </svg>
        }
      />
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-text-primary mb-8">My Favorites</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {favorites.map((favorite) => (
          <Link key={favorite.id} href={`/products/${favorite.productId}`}>
            <Card hover className="h-full">
              {favorite.product?.imageUrls?.[0] && (
                <div className="relative aspect-square">
                  <Image
                    src={favorite.product.imageUrls[0]}
                    alt={favorite.product.title}
                    fill
                    className="object-cover rounded-t-lg"
                  />
                </div>
              )}
              <CardContent className="p-4">
                <h3 className="font-semibold text-text-primary mb-2 line-clamp-2">
                  {favorite.product?.title || 'Product'}
                </h3>
                <p className="text-xl font-bold text-brand-primary">
                  {favorite.product?.price} AZN
                </p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}

