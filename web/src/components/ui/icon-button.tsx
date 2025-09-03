import type { ButtonHTMLAttributes } from 'react'
import { twMerge } from 'tailwind-merge'

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

export function IconButton({ className, children, ...props }: IconButtonProps) {
  const base = `
   flex items-center justify-center rounded-md
   text-[var(--color-gray-600)] transition-colors bg-[var(--color-gray-200)]
   border border-transparent
   hover:border hover:border-[var(--color-blue-base)]
   w-7 h-7 md:w-8 md:h-8
   `

  return (
    <button {...props} className={twMerge(base, className)}>
      {children}
    </button>
  )
}
