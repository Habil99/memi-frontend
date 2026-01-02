/**
 * Typography Design Tokens
 * 
 * Based on Euclid Circular A font family (from Nextmerce template)
 */

export const typography = {
  fontFamily: {
    base: 'Euclid Circular A, sans-serif',
  },

  size: {
    xs: '12px',
    sm: '14px',
    md: '16px',
    lg: '18px',
    xl: '22px',
    xxl: '28px',
    '3xl': '36px',
    '4xl': '48px',
  },

  weight: {
    light: 300,
    regular: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },

  lineHeight: {
    tight: 1.2,
    normal: 1.5,
    relaxed: 1.75,
  },
} as const

export type Typography = typeof typography

