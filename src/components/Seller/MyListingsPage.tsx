/**
 * My Listings Page Component
 *
 * Client component for seller's product listings
 */

'use client'

import { type ProductsResponse } from '@/services/api'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { EmptyState } from '@/components/ui/empty-state'
import Image from 'next/image'
import Link from 'next/link'

interface MyListingsPageProps {
  products: ProductsResponse
}

export default function MyListingsPage({ products }: MyListingsPageProps) {
  if (products.data.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-text-primary">My Listings</h1>
          <Link href="/seller/listings/create">
            <Button variant="primary">Create Listing</Button>
          </Link>
        </div>

        <EmptyState
          title="No listings yet"
          description="Create your first product listing to start selling"
          action={{
            label: 'Create Listing',
            onClick: () => {
              window.location.href = '/seller/listings/create'
            },
          }}
        />
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-text-primary">My Listings</h1>
        <Link href="/seller/listings/create">
          <Button variant="primary">Create Listing</Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.data.map((product) => (
          <Card key={product.id} hover className="h-full">
            {product.imageUrls.length > 0 && (
              <div className="relative aspect-square">
                <Image
                  src={product.imageUrls[0]}
                  alt={product.title}
                  fill
                  className="object-cover rounded-t-lg"
                />
              </div>
            )}
            <CardContent className="p-4">
              <h3 className="font-semibold text-text-primary mb-2 line-clamp-2">
                {product.title}
              </h3>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xl font-bold text-brand-primary">
                  {product.price} AZN
                </span>
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
              <div className="flex gap-2 mt-4">
                <Link
                  href={`/seller/listings/${product.id}/edit`}
                  className="flex-1"
                >
                  <Button variant="outline" size="sm" fullWidth>
                    Edit
                  </Button>
                </Link>
                <Link href={`/products/${product.id}`} className="flex-1">
                  <Button variant="secondary" size="sm" fullWidth>
                    View
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

