export class ShortUrlNotFoundError extends Error {
  constructor() {
    super('This short URL was not found.')
  }
}
