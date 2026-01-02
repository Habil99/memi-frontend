/**
 * Badge Component
 * 
 * Badge component using design tokens
 */

import { HTMLAttributes } from 'react'

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'success' | 'warning' | 'error' | 'info'
  size?: 'sm' | 'md' | 'lg'
}

export function Badge({
  variant = 'default',
  size = 'md',
  className = '',
  children,
  ...props
}: BadgeProps) {
  const baseStyles = `
    inline-flex items-center
    font-medium
    rounded-full
  `

  const variantStyles = {
    default: 'bg-background-surface text-text-primary',
    success: 'bg-state-success bg-opacity-10 text-state-success',
    warning: 'bg-state-warning bg-opacity-10 text-state-warning',
    error: 'bg-state-error bg-opacity-10 text-state-error',
    info: 'bg-state-info bg-opacity-10 text-state-info',
  }

  const sizeStyles = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-2.5 py-1 text-sm',
    lg: 'px-3 py-1.5 text-base',
  }

  return (
    <span
      className={`
        ${baseStyles}
        ${variantStyles[variant]}
        ${sizeStyles[size]}
        ${className}
      `.trim().replace(/\s+/g, ' ')}
      {...props}
    >
      {children}
    </span>
  )
}

