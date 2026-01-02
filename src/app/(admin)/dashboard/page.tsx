/**
 * Admin Dashboard Page (SSR)
 *
 * Main admin dashboard with analytics
 */

import { Metadata } from "next";
import { getServerAuthToken } from "@/lib/auth";
import { serverApiClient } from "@/services/api/server-client";
import AdminDashboard from "@/components/Admin/Dashboard";

export const metadata: Metadata = {
  title: "Admin Dashboard | memi.az",
  description: "Admin dashboard and analytics",
};

export default async function AdminDashboardPage() {
  const token = await getServerAuthToken();

  let overview = null;
  if (token) {
    try {
      overview = await serverApiClient.get(
        "/admin/analytics/overview",
        undefined,
        token
      );
    } catch (error) {
      console.error("Error fetching admin overview:", error);
    }
  }

  return <AdminDashboard overview={overview} />;
}

