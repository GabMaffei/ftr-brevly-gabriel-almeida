import type { ButtonHTMLAttributes } from 'react'
import { twMerge } from 'tailwind-merge'

type ButtonVariant = 'primary' | 'secondary'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
}

export function Button({
  variant = 'primary',
  className,
  children,
  ...props
}: ButtonProps) {
  const base =
    'px-8 py-2 rounded-md font-medium transition-colors flex items-center justify-center gap-2'

  const variants: Record<ButtonVariant, string> = {
    primary: `
      bg-[var(--color-blue-base)] text-white
      hover:bg-[var(--color-blue-dark)]
      disabled:bg-[var(--color-blue-base)] disabled:opacity-50 disabled:cursor-not-allowed
    `,
    secondary: `
      text-[var(--color-gray-500)] bg-[var(--color-gray-200)]
      border border-transparent
      hover:border hover:border-[var(--color-blue-base)]
      disabled:opacity-50 disabled:cursor-not-allowed
      disabled:hover:border-transparent
    `,
  }

  return (
    <button {...props} className={twMerge(base, variants[variant], className)}>
      {children}
    </button>
  )
}
