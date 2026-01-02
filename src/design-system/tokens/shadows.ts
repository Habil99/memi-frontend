/**
 * Shadow Design Tokens
 * 
 * Rule: Use shadows sparingly → focus on spacing instead.
 */

export const shadows = {
  none: 'none',
  sm: '0 1px 2px rgba(0,0,0,0.04)',
  md: '0 4px 8px rgba(0,0,0,0.08)',
  lg: '0 8px 16px rgba(0,0,0,0.12)',
} as const

export type Shadows = typeof shadows

