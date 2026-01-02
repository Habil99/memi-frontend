/**
 * Admin Route Group Layout
 *
 * Layout for admin panel routes
 */

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Dashboard | memi.az",
  description: "Admin panel for memi.az",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background-page">
      <div className="container mx-auto px-4 py-8">{children}</div>
    </div>
  );
}

