/**
 * Category Page (SSR)
 *
 * Server-rendered category page showing products in a category
 */

import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getCategoryBySlug, getProducts } from "@/lib/server";
import CategoryPage from "@/components/Category/CategoryPage";

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{
    page?: string;
    limit?: string;
    minPrice?: string;
    maxPrice?: string;
  }>;
}

export async function generateMetadata({
  params,
}: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);

  if (!category) {
    return {
      title: "Category Not Found | memi.az",
    };
  }

  return {
    title: `${category.name} | memi.az`,
    description:
      category.description ||
      `Browse ${category.name} items on memi.az second-hand marketplace`,
    openGraph: {
      title: category.name,
      description: category.description || "",
      type: "website",
    },
  };
}

// Revalidate every 60 seconds for ISR
export const revalidate = 60;

export default async function CategoryPageRoute({
  params,
  searchParams,
}: CategoryPageProps) {
  const { slug } = await params;
  const searchParamsData = await searchParams;

  const category = await getCategoryBySlug(slug);

  if (!category) {
    notFound();
  }

  // Build filters
  const filters = {
    categoryId: category.id,
    status: "ACTIVE" as const,
    page: searchParamsData.page ? parseInt(searchParamsData.page) : 1,
    limit: searchParamsData.limit ? parseInt(searchParamsData.limit) : 20,
    minPrice: searchParamsData.minPrice
      ? parseFloat(searchParamsData.minPrice)
      : undefined,
    maxPrice: searchParamsData.maxPrice
      ? parseFloat(searchParamsData.maxPrice)
      : undefined,
  };

  const productsResponse = await getProducts(filters);

  return (
    <CategoryPage category={category} products={productsResponse} />
  );
}

