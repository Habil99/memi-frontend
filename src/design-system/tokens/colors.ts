/**
 * Color Design Tokens
 * 
 * Rules:
 * - No RGB or HEX outside tokens
 * - State colors used only for state
 * - Accent color used sparingly
 */

export const colors = {
  brand: {
    primary: '#111827', // main text / primary buttons
    secondary: '#6B7280', // secondary text
    accent: '#2563EB', // links / highlights
  },

  background: {
    page: '#FFFFFF',
    surface: '#F9FAFB',
    elevated: '#FFFFFF',
  },

  text: {
    primary: '#111827',
    secondary: '#4B5563',
    muted: '#9CA3AF',
    inverse: '#FFFFFF',
  },

  border: {
    default: '#E5E7EB',
    focus: '#2563EB',
    subtle: '#F3F4F6',
  },

  state: {
    success: '#16A34A',
    warning: '#D97706',
    error: '#DC2626',
    info: '#2563EB',
  },
} as const

export type Colors = typeof colors

