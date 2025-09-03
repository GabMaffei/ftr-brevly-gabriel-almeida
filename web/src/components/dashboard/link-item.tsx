import { CopyIcon, TrashIcon } from '@phosphor-icons/react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { env } from '../../env'
import { api } from '../../lib/api'
import { IconButton } from '../ui/icon-button'
import type { Link } from './links-list' // Importamos o tipo de Link

export function LinkItem({ id, shortUrl, originalUrl, accessCount }: Link) {
  const queryClient = useQueryClient()

  const { mutate: deleteLink, isPending: isDeleting } = useMutation({
    mutationFn: async () => {
      await api.delete(`/short-url/${id}`)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['links'] })
      toast.success('Link removido com sucesso', {
        style: {
          background: 'var(--color-gray-100)',
        },
        iconTheme: {
          primary: 'var(--color-blue-base)',
          secondary: 'var(--color-gray-100)',
        },
      })
    },
    onError: () => {
      toast.error('Falha ao remover o link.')
    },
  })

  const fullShortUrl = `${env.VITE_FRONTEND_URL}/${shortUrl}`
  const displayUrl = fullShortUrl.replace(/^https?:\/\//, '')

  const handleCopy = () => {
    navigator.clipboard.writeText(fullShortUrl)
    toast.success('URL copiada para a área de transferência!', {
      style: {
        background: 'var(--color-gray-100)',
      },
      iconTheme: {
        primary: 'var(--color-blue-base)',
        secondary: 'var(--color-gray-100)',
      },
    })
  }

  return (
    <div className="flex flex-wrap items-center gap-4">
      <div className="flex flex-col gap-1 flex-1 truncate min-w-1/5">
        <div className="flex items-center gap-2">
          <a
            href={fullShortUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-md text-[var(--color-blue-base)] hover:underline truncate"
          >
            {displayUrl}
          </a>
        </div>
        <p className="text-sm-regular text-gray-400 truncate">{originalUrl}</p>
      </div>
      <div className="flex items-center gap-4 text-sm-semibold text-gray-400">
        <span className="ml-auto sm:block whitespace-nowrap">
          {accessCount} acessos
        </span>
        <div className="flex items-center gap-2">
          <IconButton onClick={handleCopy}>
            <CopyIcon />
          </IconButton>
          <IconButton
            onClick={() => {
              const confirmed = window.confirm(
                'Tem certeza que deseja remover esse link?'
              )
              if (confirmed) deleteLink()
            }}
            disabled={isDeleting}
          >
            <TrashIcon />
          </IconButton>
        </div>
      </div>
    </div>
  )
}
