# Server-Side Rendering (SSR) Setup

## Overview

This project prioritizes Server-Side Rendering (SSR) and Server-Side Data Fetching for optimal SEO performance. All public-facing pages (home, product listings, product details, categories) are server-rendered.

## Architecture

### Server-Side API Client

**Location:** `src/services/api/server-client.ts`

- No browser APIs (no localStorage, no window)
- Works in server components and server actions
- Always fetches fresh data (`cache: 'no-store'`)
- Supports optional auth token parameter

### Server-Side Data Fetching

**Location:** `src/lib/server/`

Functions for fetching data in server components:

- `getProducts()` - Fetch products with filters
- `getProduct(id)` - Fetch single product
- `getFeaturedProducts()` - Fetch featured products
- `getNewArrivals()` - Fetch new arrivals
- `getCategories()` - Fetch all categories
- `getCategory(id)` - Fetch single category
- `getCategoryBySlug(slug)` - Fetch category by slug

### Server Actions

**Location:** `src/app/actions/`

Server actions for mutations (create, update, delete):

- `createProduct()` - Create new product
- `updateProduct()` - Update product
- `deleteProduct()` - Delete product
- `addFavorite()` - Add to favorites
- `removeFavorite()` - Remove from favorites

Server actions:

- Run on the server
- Can be called from client components
- Automatically handle auth via cookies
- Return typed responses

## Pages with SSR

### Home Page

- **Route:** `/`
- **File:** `src/app/(site)/page.tsx`
- **Revalidation:** 60 seconds (ISR)
- **Data:** Featured products, new arrivals, categories

### Products Listing

- **Route:** `/products`
- **File:** `src/app/(site)/(pages)/products/page.tsx`
- **Revalidation:** 60 seconds (ISR)
- **Data:** Products with filters from search params

### Product Detail

- **Route:** `/products/[id]`
- **File:** `src/app/(site)/(pages)/products/[id]/page.tsx`
- **Revalidation:** 60 seconds (ISR)
- **Metadata:** Dynamic SEO metadata from product data
- **Data:** Single product

### Category Page

- **Route:** `/categories/[slug]`
- **File:** `src/app/(site)/(pages)/categories/[slug]/page.tsx`
- **Revalidation:** 60 seconds (ISR)
- **Metadata:** Dynamic SEO metadata from category data
- **Data:** Category + products in category

## SEO Features

### Dynamic Metadata

All pages use Next.js `generateMetadata` for:

- Page titles
- Meta descriptions
- Open Graph tags
- Dynamic content based on data

### Incremental Static Regeneration (ISR)

All pages use `revalidate = 60` for:

- Fast page loads (static generation)
- Fresh content (revalidates every 60 seconds)
- Optimal SEO (fully rendered HTML)

## Usage Examples

### Server Component (Page)

```tsx
// app/products/page.tsx
import { getProducts } from "@/lib/server";

export default async function ProductsPage() {
  const products = await getProducts({ status: "ACTIVE" });
  return <ProductsList products={products} />;
}
```

### Server Action (Mutation)

```tsx
// app/actions/products.ts
"use server";
import { createProduct } from "@/app/actions/products";

// In client component
const handleSubmit = async (data) => {
  const result = await createProduct(data);
  if (result.success) {
    // Handle success
  }
};
```

## Client Components

Client components receive data as props from server components:

```tsx
// components/Product/ProductDetails.tsx
"use client";

interface Props {
  product: Product; // Passed from server component
}

export default function ProductDetails({ product }: Props) {
  // Client-side interactivity
}
```

## Best Practices

1. **Always fetch data in server components** for public pages
2. **Use server actions** for mutations (create, update, delete)
3. **Pass data as props** to client components
4. **Use ISR** for pages that need frequent updates
5. **Generate metadata** dynamically for SEO
6. **Handle errors gracefully** in server functions

## Next Steps

1. Update `Home` component to accept props from server
2. Add more server-side data fetching functions as needed
3. Implement caching strategies for better performance
4. Add error boundaries for better error handling
5. Consider static generation for popular products/categories
