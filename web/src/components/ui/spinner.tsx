import { SpinnerIcon } from '@phosphor-icons/react'

export function Spinner({ className }: { className?: string }) {
  return (
    <SpinnerIcon
      className={`
        stroke-2
        animate-spin ${className}`}
    >
      <title>Carregando</title>
    </SpinnerIcon>
  )
}
