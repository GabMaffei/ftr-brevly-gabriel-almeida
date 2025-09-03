// src/components/Input.tsx
import { WarningIcon } from '@phosphor-icons/react'
import type { InputHTMLAttributes } from 'react'

type Props = InputHTMLAttributes<HTMLInputElement> & {
  id: string
  label: string

  prefix?: string

  errorMessage?: string

  prefixPaddingClassName?: string
}

export function Input({
  id,
  label,
  prefix,
  errorMessage,
  className = '',
  prefixPaddingClassName = 'pl-15',
  ...props
}: Props) {
  const hasError = Boolean(errorMessage)

  return (
    <div className="w-full">
      <label
        htmlFor={id}
        className={`block text-xs font-semibold transition-colors ${
          hasError
            ? 'text-[var(--color-danger)]'
            : 'text-[var(--color-gray-500)] focus-within:text-[var(--color-blue-base)]'
        }`}
      >
        <span className="block mb-1">{label}</span>

        <div className="relative">
          {prefix && (
            <span
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2
                         text-[var(--color-gray-400)] select-none text-md normal-case !font-normal"
            >
              {prefix}
            </span>
          )}

          <input
            id={id}
            className={[
              'h-10 w-full rounded-lg border transition-colors outline-none text-md !font-normal placeholder:text-md placeholder:font-normal',

              'hover:bg-gray-50',

              hasError
                ? 'border-[var(--color-danger)] text-[var(--color-gray-600)] placeholder:text-[var(--color-gray-400)]'
                : 'border-[var(--color-gray-300)] text-[var(--color-gray-600)] placeholder:text-[var(--color-gray-400)] focus:border-[var(--color-blue-base)]',

              prefix ? prefixPaddingClassName : 'px-3',

              className,
            ]
              .filter(Boolean)
              .join(' ')}
            {...props}
          />
        </div>
      </label>

      {hasError && (
        <div className="mt-1 flex items-center gap-2 text-sm text-[var(--color-gray-500)]">
          <WarningIcon size={16} className="text-[var(--color-danger)]" />
          <span>{errorMessage}</span>
        </div>
      )}
    </div>
  )
}
