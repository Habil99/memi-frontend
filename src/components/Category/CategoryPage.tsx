/**
 * Category Page Component
 *
 * Client component for category pages
 * Receives data from server component
 */

'use client'

import { type Category, type ProductsResponse } from '@/services/api'
import ProductsListing from '@/components/Product/ProductsListing'

interface CategoryPageProps {
  category: Category
  products: ProductsResponse
}

export default function CategoryPage({
  category,
  products,
}: CategoryPageProps) {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-text-primary mb-2">
        {category.name}
      </h1>
      {category.description && (
        <p className="text-text-secondary mb-8">{category.description}</p>
      )}

      <ProductsListing
        products={products}
        categories={[]}
        filters={{ categoryId: category.id, status: 'ACTIVE' }}
      />
    </div>
  )
}

