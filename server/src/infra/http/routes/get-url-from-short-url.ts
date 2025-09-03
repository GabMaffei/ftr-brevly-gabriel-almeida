import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { ShortUrlNotFoundError } from '@/app/errors/ShortUrlNotFoundError'
import { getUrlFromShortUrl } from '@/app/functions/get-url-from-short-url'
import { isRight, unwrapEither } from '@/shared/either'

export const getUrlFromShortUrlRoute: FastifyPluginAsyncZod = async server => {
  server.get(
    '/short-url/:shortUrl',
    {
      schema: {
        summary: 'Get original URL from shortened URL',
        tags: ['short-url'],
        params: z.object({
          shortUrl: z
            .string()
            .min(1)
            .regex(/^[a-z0-9_-]+$/, {
              message:
                'shortUrl deve conter apenas letras minúsculas, números, hífen ou underline, sem espaços ou outros caracteres especiais',
            })
            .default('example'),
        }),
        response: {
          200: z.object({
            originalUrl: z.url(),
          }),
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
      const { shortUrl } = request.params

      const result = await getUrlFromShortUrl({ shortUrl })

      if (isRight(result)) {
        const { originalUrl } = unwrapEither(result)

        return reply.status(200).send({
          originalUrl,
        })
      }

      const error = unwrapEither(result)

      if (error instanceof ShortUrlNotFoundError) {
        return reply.status(404).send({
          message: error.message,
        })
      }
    }
  )
}
