import { Metadata } from "next";
import { getFeaturedProducts, getNewArrivals, getCategories } from "@/lib/server";
import Home from "@/components/Home";

export const metadata: Metadata = {
  title: "memi.az | Second-Hand Fashion Marketplace",
  description:
    "Browse and buy second-hand clothes, shoes, bags, and accessories. Sell your pre-loved fashion items on memi.az",
  openGraph: {
    title: "memi.az | Second-Hand Fashion Marketplace",
    description:
      "Browse and buy second-hand clothes, shoes, bags, and accessories",
    type: "website",
  },
};

// Revalidate every 60 seconds for ISR
export const revalidate = 60;

export default async function HomePage() {
  // Fetch data on the server for SEO
  // Note: Home component will need to be updated to accept these props
  // For now, data is fetched on server but not yet passed to component
  await Promise.all([
    getFeaturedProducts(8),
    getNewArrivals(8),
    getCategories(),
  ]);

  return <Home />;
}
