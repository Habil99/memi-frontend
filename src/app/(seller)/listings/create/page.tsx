/**
 * Create Listing Page (SSR)
 *
 * Page for creating a new product listing
 */

import { Metadata } from "next";
import { getCategories } from "@/lib/server";
import CreateListingPage from "@/components/Seller/CreateListingPage";

export const metadata: Metadata = {
  title: "Create Listing | memi.az",
  description: "Create a new product listing",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function CreateListing() {
  const categories = await getCategories();

  return <CreateListingPage categories={categories} />;
}

