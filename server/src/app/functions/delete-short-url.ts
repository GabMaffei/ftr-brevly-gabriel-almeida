import { eq } from 'drizzle-orm'
import z from 'zod'
import { db } from '@/infra/db'
import { schema } from '@/infra/db/schemas'
import { makeLeft, makeRight } from '@/shared/either'
import { ShortUrlNotFoundError } from '../errors/ShortUrlNotFoundError'

// Todo: replace zod parse with custom type, because the route already validates input.
// * DRY = Don't Repeat Yourself
const deleteShortUrlInput = z.object({
  shortUrlId: z.uuid(),
})

type DeleteShortUrlInput = z.input<typeof deleteShortUrlInput>

export async function deleteShortUrl(input: DeleteShortUrlInput) {
  const { shortUrlId } = deleteShortUrlInput.parse(input)

  // Tenta deletar e pede para o DB retornar o ID do que foi deletado
  const deletedLinks = await db
    .delete(schema.links)
    .where(eq(schema.links.id, shortUrlId))
    .returning({
      id: schema.links.id,
    })

  // Se o array retornado estiver vazio, o link não foi encontrado
  if (deletedLinks.length === 0) {
    return makeLeft(new ShortUrlNotFoundError())
  }

  return makeRight({})
}
