/**
 * Button Component
 * 
 * Base button component using design tokens
 * Supports variants, sizes, and states
 */

import { ButtonHTMLAttributes, forwardRef } from 'react'
import { theme } from '@/design-system'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  isLoading?: boolean
  fullWidth?: boolean
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      isLoading = false,
      fullWidth = false,
      className = '',
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    const baseStyles = `
      inline-flex items-center justify-center
      font-medium
      rounded-md
      transition-colors
      focus:outline-none focus:ring-2 focus:ring-offset-2
      disabled:opacity-50 disabled:cursor-not-allowed
    `

    const variantStyles = {
      primary: `
        bg-brand-primary text-text-inverse
        hover:bg-opacity-90
        focus:ring-brand-accent
      `,
      secondary: `
        bg-background-surface text-text-primary border border-border-default
        hover:bg-background-elevated
        focus:ring-brand-accent
      `,
      outline: `
        border-2 border-brand-primary text-brand-primary bg-transparent
        hover:bg-brand-primary hover:text-text-inverse
        focus:ring-brand-accent
      `,
      ghost: `
        text-text-primary bg-transparent
        hover:bg-background-surface
        focus:ring-brand-accent
      `,
    }

    const sizeStyles = {
      sm: 'px-3 py-1.5 text-sm',
      md: 'px-4 py-2 text-base',
      lg: 'px-6 py-3 text-lg',
    }

    const widthStyles = fullWidth ? 'w-full' : ''

    return (
      <button
        ref={ref}
        className={`
          ${baseStyles}
          ${variantStyles[variant]}
          ${sizeStyles[size]}
          ${widthStyles}
          ${className}
        `.trim().replace(/\s+/g, ' ')}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading ? (
          <>
            <svg
              className="animate-spin -ml-1 mr-2 h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            Loading...
          </>
        ) : (
          children
        )}
      </button>
    )
  }
)

Button.displayName = 'Button'

