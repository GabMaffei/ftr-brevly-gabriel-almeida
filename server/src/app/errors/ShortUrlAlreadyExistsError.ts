export class ShortUrlAlreadyExistsError extends Error {
  constructor() {
    super('This short URL is already in use.')
  }
}
