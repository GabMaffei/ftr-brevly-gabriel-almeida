import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { ShortUrlAlreadyExistsError } from '@/app/errors/ShortUrlAlreadyExistsError'
import { createShortUrl } from '@/app/functions/create-short-url'
import { isRight, unwrapEither } from '@/shared/either'

export const createShortUrlRoute: FastifyPluginAsyncZod = async server => {
  server.post(
    '/short-url',
    {
      schema: {
        summary: 'Create a shortened URL',
        tags: ['short-url'],
        body: z.object({
          originalUrl: z.url().default('https://www.example.com/'),
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
          201: z.object({
            shortUrlId: z.uuid(),
          }),
          400: z.object({
            message: z.string(),
            issues: z.any().optional(),
          }),
          409: z.object({
            message: z.string(),
          }),
        },
      },
    },
    async (request, reply) => {
      const { originalUrl, shortUrl } = request.body

      const result = await createShortUrl({
        originalUrl,
        shortUrl,
      })

      if (isRight(result)) {
        const { shortUrlId } = unwrapEither(result)
        return reply.status(201).send({ shortUrlId })
      }

      const error = unwrapEither(result)

      console.log(error)

      if (error instanceof ShortUrlAlreadyExistsError) {
        return reply.status(409).send({ message: error.message })
      }
    }
  )
}
