/**
 * Seller Route Group Layout
 *
 * Layout for seller dashboard routes
 */

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Seller Dashboard | memi.az",
  description: "Manage your listings and sales",
};

export default function SellerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

