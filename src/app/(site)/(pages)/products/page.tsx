/**
 * Products Listing Page (SSR)
 *
 * Server-rendered product listing page with filters
 */

import { Metadata } from "next";
import { getProducts, getCategories } from "@/lib/server";
import ProductsListing from "@/components/Product/ProductsListing";
import type { ProductFilters } from "@/services/api";

interface ProductsPageProps {
  searchParams: Promise<{
    search?: string;
    categoryId?: string;
    subcategoryId?: string;
    condition?: string;
    minPrice?: string;
    maxPrice?: string;
    page?: string;
    limit?: string;
  }>;
}

export const metadata: Metadata = {
  title: "Browse Products | memi.az",
  description:
    "Browse all second-hand fashion items. Filter by category, price, condition, and more.",
  openGraph: {
    title: "Browse Products | memi.az",
    description: "Browse all second-hand fashion items",
    type: "website",
  },
};

// Revalidate every 60 seconds for ISR
export const revalidate = 60;

export default async function ProductsPage({
  searchParams,
}: ProductsPageProps) {
  const params = await searchParams;

  // Build filters from search params
  const filters: ProductFilters = {
    status: "ACTIVE",
    page: params.page ? parseInt(params.page) : 1,
    limit: params.limit ? parseInt(params.limit) : 20,
  };

  if (params.search) filters.search = params.search;
  if (params.categoryId) filters.categoryId = params.categoryId;
  if (params.subcategoryId) filters.subcategoryId = params.subcategoryId;
  if (params.condition) {
    filters.condition = params.condition as ProductFilters["condition"];
  }
  if (params.minPrice) filters.minPrice = parseFloat(params.minPrice);
  if (params.maxPrice) filters.maxPrice = parseFloat(params.maxPrice);

  // Fetch data on the server
  const [productsResponse, categories] = await Promise.all([
    getProducts(filters),
    getCategories(),
  ]);

  return (
    <ProductsListing
      products={productsResponse}
      categories={categories}
      filters={filters}
    />
  );
}

