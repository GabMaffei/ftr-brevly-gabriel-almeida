import { eq, sql } from 'drizzle-orm'
import z from 'zod'
import { db } from '@/infra/db'
import { schema } from '@/infra/db/schemas'
import { makeLeft, makeRight } from '@/shared/either'
import { ShortUrlNotFoundError } from '../errors/ShortUrlNotFoundError'

// Todo: replace zod parse with custom type, because the route already validates input.
// * DRY = Don't Repeat Yourself
const getUrlFromShortUrlInput = z.object({
  shortUrl: z.string(),
})

type GetUrlFromShortUrlInput = z.input<typeof getUrlFromShortUrlInput>

export async function getUrlFromShortUrl(input: GetUrlFromShortUrlInput) {
  const { shortUrl } = getUrlFromShortUrlInput.parse(input)

  const result = await db.query.links.findFirst({
    where: eq(schema.links.shortUrl, shortUrl),
  })

  if (!result) {
    return makeLeft(new ShortUrlNotFoundError())
  }

  await db
    .update(schema.links)
    .set({
      accessCount: sql`${schema.links.accessCount} + 1`,
    })
    .where(eq(schema.links.shortUrl, shortUrl))

  const { originalUrl } = result

  return makeRight({
    originalUrl,
  })
}
