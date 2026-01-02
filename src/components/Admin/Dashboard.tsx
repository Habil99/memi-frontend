/**
 * Admin Dashboard Component
 *
 * Client component for admin dashboard
 */

'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { EmptyState } from '@/components/ui/empty-state'

interface AdminDashboardProps {
  overview: {
    totalUsers?: number
    totalProducts?: number
    totalChats?: number
    totalReservations?: number
  } | null
}

export default function AdminDashboard({ overview }: AdminDashboardProps) {
  if (!overview) {
    return (
      <EmptyState
        title="Unable to load dashboard"
        description="Please check your permissions and try again"
      />
    )
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-text-primary mb-8">
        Admin Dashboard
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium text-text-secondary">
              Total Users
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-text-primary">
              {overview.totalUsers || 0}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium text-text-secondary">
              Total Products
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-text-primary">
              {overview.totalProducts || 0}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium text-text-secondary">
              Total Chats
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-text-primary">
              {overview.totalChats || 0}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium text-text-secondary">
              Total Reservations
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-text-primary">
              {overview.totalReservations || 0}
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <a
              href="/admin/users"
              className="block p-3 rounded-md hover:bg-background-surface transition-colors"
            >
              Manage Users
            </a>
            <a
              href="/admin/listings"
              className="block p-3 rounded-md hover:bg-background-surface transition-colors"
            >
              Manage Listings
            </a>
            <a
              href="/admin/reports"
              className="block p-3 rounded-md hover:bg-background-surface transition-colors"
            >
              View Reports
            </a>
            <a
              href="/admin/analytics"
              className="block p-3 rounded-md hover:bg-background-surface transition-colors"
            >
              View Analytics
            </a>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

