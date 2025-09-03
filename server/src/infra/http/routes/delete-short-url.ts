import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { ShortUrlNotFoundError } from '@/app/errors/ShortUrlNotFoundError'
import { deleteShortUrl } from '@/app/functions/delete-short-url'
import { isRight, unwrapEither } from '@/shared/either'

export const deleteShortUrlRoute: FastifyPluginAsyncZod = async server => {
  server.delete(
    '/short-url/:id',
    {
      schema: {
        summary: 'Delete a shortened URL',
        tags: ['short-url'],
        params: z.object({
          id: z.uuid(),
        }),
        response: {
          204: z.object({}),
          404: z.object({
            message: z.string(),
          }),
          400: z.object({
            message: z.string(),
            issues: z.any().optional(),
          }),
        },
      },
    },
    async (request, reply) => {
      const { id } = request.params

      const result = await deleteShortUrl({ shortUrlId: id })

      if (isRight(result)) {
        return reply.status(204).send()
      }

      const error = unwrapEither(result)

      if (error instanceof ShortUrlNotFoundError) {
        return reply.status(404).send({ message: error.message })
      }
    }
  )
}
