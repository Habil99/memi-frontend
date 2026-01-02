/**
 * User Route Group Layout
 *
 * Layout for authenticated user routes
 */

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Account | memi.az",
  description: "Manage your account, listings, and favorites",
};

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

