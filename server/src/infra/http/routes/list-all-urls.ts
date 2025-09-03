import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { listAllUrls } from '@/app/functions/list-all-urls'
import { isRight, unwrapEither } from '@/shared/either'

export const listAllUrlsRoute: FastifyPluginAsyncZod = async server => {
  server.get(
    '/short-url',
    {
      schema: {
        summary: 'List all shortened URLs',
        tags: ['short-url'],
        response: {
          200: z.object({
            total: z.number().min(0),
            links: z.array(
              z.object({
                id: z.uuid(),
                originalUrl: z.url(),
                shortUrl: z.string(),
                accessCount: z.coerce.number().min(0).default(0),
              })
            ),
          }),
          400: z.object({
            message: z.string(),
            issues: z.any().optional(),
          }),
        },
      },
    },
    async (_request, reply) => {
      const result = await listAllUrls()

      if (isRight(result)) {
        const { links, total } = unwrapEither(result)

        return reply.status(200).send({
          total,
          links,
        })
      }
    }
  )
}
