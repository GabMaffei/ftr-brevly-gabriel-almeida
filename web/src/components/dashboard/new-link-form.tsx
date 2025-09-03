import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useId } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { api } from '../../lib/api'
import { Button } from '../ui/button'
import { Input } from '../ui/input'

const createLinkSchema = z.object({
  originalUrl: z
    .string()
    .min(1, { message: 'O link original não pode estar vazio.' })
    .transform(url => {
      if (!url.startsWith('http://') && !url.startsWith('https://')) {
        return `http://${url}`
      }
      return url
    })
    .refine(
      url => {
        try {
          new URL(url)
          return true
        } catch {
          return false
        }
      },
      {
        message: 'Por favor, insira uma URL válida.',
      }
    ),
  shortUrl: z
    .string()
    .min(1, { message: 'O link encurtado não pode estar vazio.' })
    .regex(/^[a-z0-9_-]+$/, {
      message: 'Use apenas letras, números, hífen ou underline.',
    }),
})

type CreateLinkForm = z.infer<typeof createLinkSchema>

export function NewLinkForm() {
  const queryClient = useQueryClient()

  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors },
  } = useForm<CreateLinkForm>({
    resolver: zodResolver(createLinkSchema),
  })

  const { mutateAsync: createLinkFn, isPending } = useMutation({
    mutationFn: async (data: CreateLinkForm) => {
      await api.post('/short-url', data)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['links'] })
      reset()
    },
    // biome-ignore lint/suspicious/noExplicitAny: The error will always exist here
    onError: (error: any) => {
      if (error.response?.status === 409) {
        setError('shortUrl', {
          type: 'manual',
          message: 'Este link encurtado já está em uso.',
        })
      } else {
        alert('Ocorreu um erro ao criar o link.')
      }
    },
  })

  return (
    <div className="cards-ui">
      <h3 className="text-lg text-[--color-blue-base]">Novo link</h3>
      <form
        onSubmit={handleSubmit(data => createLinkFn(data))}
        className="flex flex-col items-start content-end gap-4 isolate p-0 self-stretch"
      >
        <Input
          id={useId()}
          label="Link original"
          placeholder="www.exemplo.com.br"
          disabled={isPending}
          {...register('originalUrl')}
          errorMessage={errors.originalUrl?.message}
        />
        <Input
          id={useId()}
          label="Link encurtado"
          prefix="brev.ly/"
          disabled={isPending}
          {...register('shortUrl')}
          errorMessage={errors.shortUrl?.message}
        />
        <Button type="submit" className="w-full" disabled={isPending}>
          {isPending ? 'Salvando...' : 'Salvar link'}
        </Button>
      </form>
    </div>
  )
}
