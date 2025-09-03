import { DownloadSimpleIcon, LinkIcon } from '@phosphor-icons/react'
import * as ScrollArea from '@radix-ui/react-scroll-area'
import { useIsFetching, useIsMutating, useQuery } from '@tanstack/react-query'
import { Fragment } from 'react'
import { api } from '../../lib/api'
import { Button } from '../ui/button'
import { LoadingBar } from '../ui/loading-bar'
import { Spinner } from '../ui/spinner'
import { LinkItem } from './link-item'

export interface Link {
  id: string
  originalUrl: string
  shortUrl: string
  accessCount: number
}

async function fetchLinks(): Promise<Link[]> {
  const response = await api.get<{ links: Link[] }>('/short-url')
  return response.data.links
}

export function LinksList() {
  const { data: links, isLoading } = useQuery({
    queryKey: ['links'],
    queryFn: fetchLinks,
  })

  const isFetchingLinks = useIsFetching({ queryKey: ['links'] }) > 0
  const isMutatingLinks = useIsMutating() > 0
  const showLoadingBar = isFetchingLinks || isMutatingLinks
  const hasLinks = links && links.length > 0

  async function handleDownloadCsv() {
    try {
      const response = await api.post<{ csvUrl: string }>('/short-url/all')
      window.open(response.data.csvUrl, '_blank')
    } catch {
      alert('Erro ao gerar o relatório CSV.')
    }
  }

  return (
    <div className="cards-ui relative">
      <div className="flex items-center justify-between w-full gap-4">
        {showLoadingBar && <LoadingBar />}
        <h3 className="text-lg font-bold text-gray-600 whitespace-nowrap">
          Meus links
        </h3>
        <Button
          variant="secondary"
          className="flex items-center text-md csv-button"
          onClick={handleDownloadCsv}
          disabled={isLoading || !hasLinks}
        >
          <DownloadSimpleIcon size={16} weight="bold" className="csv-icon" />
          <span className="whitespace-nowrap text-md csv-button-text">
            Baixar CSV
          </span>
        </Button>
      </div>

      <div className="w-full h-px bg-gray-200" />

      <ScrollArea.Root className="w-full" type="auto">
        <ScrollArea.Viewport className="w-full pr-4 max-h-[40vh] lg:max-h-[calc(100vh-240px)]">
          {isLoading && !hasLinks && (
            <div className="flex flex-col items-center justify-center gap-4 py-10">
              <Spinner className="h-8 w-8 text-gray-400" />
              <p className="text-center text-sm">Carregando links...</p>
            </div>
          )}

          {!isLoading && !hasLinks && (
            <div className="flex flex-col items-center justify-center text-center gap-4 py-10">
              <div className="rounded-full flex items-center justify-center">
                <LinkIcon className="w-8 h-8 text-gray-400" />
              </div>
              <p className="text-xs text-gray-500 font-semibold uppercase">
                Ainda não existem links cadastrados
              </p>
            </div>
          )}

          {hasLinks && (
            <div className="space-y-3 lg:space-y-4">
              {links.map((link, idx) => (
                <Fragment key={link.id}>
                  <LinkItem
                    id={link.id}
                    shortUrl={link.shortUrl}
                    originalUrl={link.originalUrl}
                    accessCount={link.accessCount}
                  />
                  {idx < links.length - 1 && (
                    <div className="w-full h-px bg-gray-200" />
                  )}
                </Fragment>
              ))}
            </div>
          )}
        </ScrollArea.Viewport>

        <ScrollArea.Scrollbar
          className="flex select-none touch-none p-0.5 transition-colors duration-[160ms] ease-out data-[orientation=vertical]:w-3"
          orientation="vertical"
        >
          <ScrollArea.Thumb className="flex-1 bg-[var(--color-blue-base)] relative hover:bg-[var(--color-blue-dark)] transition-colors" />
        </ScrollArea.Scrollbar>
      </ScrollArea.Root>
    </div>
  )
}
