/**
 * Product Detail Page (SSR)
 *
 * Server-rendered product detail page for SEO
 */

import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProduct } from "@/lib/server";
import ProductDetails from "@/components/Product/ProductDetails";

interface ProductPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { id } = await params;
  const product = await getProduct(id);

  if (!product) {
    return {
      title: "Product Not Found | memi.az",
    };
  }

  return {
    title: `${product.title} | memi.az`,
    description: product.description || `Buy ${product.title} on memi.az`,
    openGraph: {
      title: product.title,
      description: product.description || "",
      images: product.imageUrls.length > 0 ? [product.imageUrls[0]] : [],
      type: "website",
    },
  };
}

// Revalidate every 60 seconds for ISR
export const revalidate = 60;

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params;
  const product = await getProduct(id);

  if (!product) {
    notFound();
  }

  return <ProductDetails product={product} />;
}
