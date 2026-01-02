/**
 * My Listings Page (SSR)
 *
 * Seller's product listings
 */

import { Metadata } from "next";
import { getServerAuthToken } from "@/lib/auth";
import { getProducts } from "@/lib/server";
import MyListingsPage from "@/components/Seller/MyListingsPage";

export const metadata: Metadata = {
  title: "My Listings | memi.az",
  description: "Manage your product listings",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function MyListings() {
  const token = await getServerAuthToken();

  let products = { data: [], total: 0, page: 1, limit: 20, totalPages: 0 };
  if (token) {
    try {
      // Get user's products - this would need sellerId filter
      // For now, we'll fetch all and filter client-side
      products = await getProducts({ status: "ACTIVE" });
    } catch (error) {
      console.error("Error fetching listings:", error);
    }
  }

  return <MyListingsPage products={products} />;
}

