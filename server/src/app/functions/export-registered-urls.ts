import { PassThrough, Transform } from 'node:stream'
import { pipeline } from 'node:stream/promises'
import { stringify } from 'csv-stringify'
import { uuidv7 } from 'uuidv7'
import { db, pg } from '@/infra/db'
import { schema } from '@/infra/db/schemas'
import { uploadFileToStorage } from '@/infra/storage/upload-file-to-storage'
import { makeRight } from '@/shared/either'

export async function getAllRegisteredUrls() {
  const { sql, params } = db
    .select({
      id: schema.links.id,
      originalUrl: schema.links.originalUrl,
      shortUrl: schema.links.shortUrl,
      accessCount: schema.links.accessCount,
      createdAt: schema.links.createdAt,
    })
    .from(schema.links)
    .toSQL()

  const cursor = pg.unsafe(sql, params as string[]).cursor(10)

  const csvStringifier = stringify({
    header: true,
    columns: [
      { key: 'id', header: 'ID' },
      { key: 'original_url', header: 'Original URL' },
      { key: 'short_url', header: 'Short URL' },
      { key: 'access_count', header: 'Access Count' },
      { key: 'created_at', header: 'Created at' },
    ],
  })

  const uploadStream = new PassThrough()

  const pipelinePromise = pipeline(
    cursor,
    new Transform({
      objectMode: true,
      transform(chunks, _, callback) {
        for (const chunk of chunks) {
          this.push(chunk)
        }
        callback()
      },
    }),
    csvStringifier,
    uploadStream
  )

  const uploadPromise = uploadFileToStorage({
    folder: 'downloads',
    fileName: `${uuidv7()}-links.csv`,
    contentType: 'text/csv',
    contentStream: uploadStream,
  })

  const [, { url }] = await Promise.all([pipelinePromise, uploadPromise])

  return makeRight({
    csvUrl: url,
  })
}
