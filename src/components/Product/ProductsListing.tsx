/**
 * Products Listing Component
 *
 * Client component for displaying product listings
 * Receives data from server component
 */

"use client";

import {
  type ProductsResponse,
  type Category,
  type ProductFilters,
} from "@/services/api";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import Link from "next/link";
import ProductFiltersSection from "./ProductFilters";

interface ProductsListingProps {
  products: ProductsResponse;
  categories: Category[];
  filters: ProductFilters;
}

export default function ProductsListing({
  products,
  categories,
}: ProductsListingProps) {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Filters Sidebar */}
        <div className="lg:col-span-1">
          <ProductFiltersSection categories={categories} />
        </div>

        {/* Products Grid */}
        <div className="lg:col-span-3">
          <h1 className="text-3xl font-bold text-text-primary mb-8">
            Browse Products
          </h1>

          {products.data.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-text-secondary">No products found</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
                {products.data.map((product) => (
                  <Link key={product.id} href={`/products/${product.id}`}>
                    <Card hover className="h-full">
                      <div className="relative aspect-square">
                        {product.imageUrls.length > 0 ? (
                          <Image
                            src={product.imageUrls[0]}
                            alt={product.title}
                            fill
                            className="object-cover rounded-t-lg"
                          />
                        ) : (
                          <div className="w-full h-full bg-background-surface flex items-center justify-center">
                            <span className="text-text-muted">No image</span>
                          </div>
                        )}
                      </div>
                      <CardContent className="p-4">
                        <h3 className="font-semibold text-text-primary mb-2 line-clamp-2">
                          {product.title}
                        </h3>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xl font-bold text-brand-primary">
                            {product.price} AZN
                          </span>
                          <Badge variant="default">{product.condition}</Badge>
                        </div>
                        {product.location && (
                          <p className="text-sm text-text-secondary">
                            {product.location}
                          </p>
                        )}
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>

              {/* Pagination */}
              {products.totalPages > 1 && (
                <div className="flex justify-center gap-2">
                  {Array.from(
                    { length: products.totalPages },
                    (_, i) => i + 1
                  ).map((page) => (
                    <Link
                      key={page}
                      href={`/products?page=${page}`}
                      className="px-4 py-2 border border-border-default rounded-md hover:bg-background-surface"
                    >
                      {page}
                    </Link>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
