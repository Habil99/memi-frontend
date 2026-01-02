/**
 * Transition Design Tokens
 * 
 * Standardized timing and easing for consistent animations
 */

export const transitions = {
  duration: {
    fast: '150ms',
    normal: '200ms',
    slow: '300ms',
  },

  easing: {
    default: 'ease-in-out',
    in: 'ease-in',
    out: 'ease-out',
  },
} as const

export type Transitions = typeof transitions

