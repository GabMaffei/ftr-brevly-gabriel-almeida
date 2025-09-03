import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { getAllRegisteredUrls } from '@/app/functions/export-registered-urls'
import { isRight, unwrapEither } from '@/shared/either'

export const exportRegisteredUrlsRoute: FastifyPluginAsyncZod =
  async server => {
    server.post(
      '/short-url/all',
      {
        schema: {
          summary:
            'Post all registered URLs as a CSV, and return URL from remote storage',
          tags: ['short-url'],
          response: {
            201: z.object({
              csvUrl: z
                .url()
                .default('http://cloud-storage-url.com/short-urls.csv'),
            }),
            400: z.object({
              message: z.string(),
              issues: z.any().optional(),
            }),
          },
        },
      },
      async (_request, reply) => {
        const result = await getAllRegisteredUrls()

        if (isRight(result)) {
          const { csvUrl } = unwrapEither(result)
          return reply.status(201).send({ csvUrl })
        }
      }
    )
  }
