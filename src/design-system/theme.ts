/**
 * Theme Configuration
 * 
 * Central export of all design tokens
 */

import { colors, type Colors } from './tokens/colors'
import { spacing, type Spacing } from './tokens/spacing'
import { typography, type Typography } from './tokens/typography'
import { radius, type Radius } from './tokens/radius'
import { shadows, type Shadows } from './tokens/shadows'
import { zIndex, type ZIndex } from './tokens/zIndex'
import { transitions, type Transitions } from './tokens/transitions'

export const theme = {
  colors,
  spacing,
  typography,
  radius,
  shadows,
  zIndex,
  transitions,
} as const

export type Theme = typeof theme

export type {
  Colors,
  Spacing,
  Typography,
  Radius,
  Shadows,
  ZIndex,
  Transitions,
}

