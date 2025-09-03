import z from 'zod'
import { db } from '@/infra/db'
import { schema } from '@/infra/db/schemas'
import { makeLeft, makeRight } from '@/shared/either'
import { ShortUrlAlreadyExistsError } from '../errors/ShortUrlAlreadyExistsError'

// Todo: replace zod parse with custom type, because the route already validates input.
// * DRY = Don't Repeat Yourself
const createShortUrlInput = z.object({
  originalUrl: z.url(),
  shortUrl: z.string(),
})

type CreateShortUrlInput = z.input<typeof createShortUrlInput>

export async function createShortUrl(input: CreateShortUrlInput) {
  const { originalUrl, shortUrl } = createShortUrlInput.parse(input)

  const existingLink = await db.query.links.findFirst({
    where: (links, { eq }) => eq(links.shortUrl, shortUrl),
  })

  if (existingLink) {
    return makeLeft(new ShortUrlAlreadyExistsError())
  }

  const [{ shortUrlId }] = await db
    .insert(schema.links)
    .values({
      originalUrl,
      shortUrl,
    })
    .returning({ shortUrlId: schema.links.id })

  return makeRight({
    shortUrlId,
  })
}
