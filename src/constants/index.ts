/**
 * Constants
 * 
 * Application-wide constants
 */

export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api/v1'

export const ROUTES = {
  HOME: '/',
  SHOP: '/shop',
  CART: '/cart',
  CHECKOUT: '/checkout',
  SIGNIN: '/signin',
  SIGNUP: '/signup',
  PROFILE: '/my-account',
  FAVORITES: '/wishlist',
  MESSAGES: '/messages',
  SELL: '/sell',
  // Admin routes
  ADMIN: '/admin',
  ADMIN_DASHBOARD: '/admin/dashboard',
  ADMIN_USERS: '/admin/users',
  ADMIN_LISTINGS: '/admin/listings',
  ADMIN_REPORTS: '/admin/reports',
  ADMIN_ANALYTICS: '/admin/analytics',
} as const

export const PRODUCT_CONDITIONS = [
  'NEW',
  'LIKE_NEW',
  'EXCELLENT',
  'GOOD',
  'FAIR',
  'POOR',
] as const

export const PRODUCT_STATUS = [
  'ACTIVE',
  'RESERVED',
  'SOLD',
  'DELETED',
] as const

export const MAX_PRODUCT_IMAGES = 8

