import { useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Redirecting } from '../components/redirect/redirecting'
import { api } from '../lib/api'

async function fetchOriginalUrl(code: string) {
  const response = await api.get<{ originalUrl: string }>(`/short-url/${code}`)
  return response.data.originalUrl
}

export function Redirect() {
  const { code } = useParams<{ code: string }>()

  const { data: originalUrl, isLoading } = useQuery({
    queryKey: ['original-url', code],
    queryFn: () => fetchOriginalUrl(code!), //? A '!' garante ao TS que 'code' existe
    enabled: !!code,
    retry: false,
    throwOnError: true,
  })

  useEffect(() => {
    if (originalUrl) {
      window.location.href = originalUrl
    }
  }, [originalUrl])

  if (isLoading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Redirecting />
      </div>
    )
  }

  return null
}
