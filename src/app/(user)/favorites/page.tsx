/**
 * Favorites Page (SSR)
 *
 * User's favorite products
 */

import { Metadata } from "next";
import { getServerAuthToken } from "@/lib/auth";
import { serverApiClient } from "@/services/api/server-client";
import FavoritesPage from "@/components/Favorites/FavoritesPage";

export const metadata: Metadata = {
  title: "My Favorites | memi.az",
  description: "View your favorite products",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function Favorites() {
  const token = await getServerAuthToken();

  let favorites = [];
  if (token) {
    try {
      favorites = await serverApiClient.get("/favorites", undefined, token);
    } catch (error) {
      console.error("Error fetching favorites:", error);
    }
  }

  return <FavoritesPage favorites={favorites} />;
}

