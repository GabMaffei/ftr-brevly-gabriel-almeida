import { asc, count } from 'drizzle-orm'
import { db } from '@/infra/db'
import { schema } from '@/infra/db/schemas'
import { makeRight } from '@/shared/either'

export async function listAllUrls() {
  const [links, [{ total }]] = await Promise.all([
    // Query 1: Busca os links da página atual
    db
      .select({
        id: schema.links.id,
        originalUrl: schema.links.originalUrl,
        shortUrl: schema.links.shortUrl,
        accessCount: schema.links.accessCount,
      })
      .from(schema.links)
      .orderBy(asc(schema.links.id)),

    // Query 2: Busca o número total de links na tabela
    db
      .select({ total: count() })
      .from(schema.links),
  ])

  return makeRight({
    total,
    links,
  })
}
