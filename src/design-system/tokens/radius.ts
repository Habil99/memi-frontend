/**
 * Border Radius Design Tokens
 */

export const radius = {
  none: '0px',
  sm: '6px',
  md: '10px',
  lg: '14px',
  xl: '16px',
  full: '9999px',
} as const

export type Radius = typeof radius

