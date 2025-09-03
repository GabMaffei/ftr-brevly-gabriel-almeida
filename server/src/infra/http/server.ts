import { fastifyCors } from '@fastify/cors'
import fastifySwagger from '@fastify/swagger'
import fastifySwaggerUi from '@fastify/swagger-ui'
import { fastify } from 'fastify'
import {
  hasZodFastifySchemaValidationErrors,
  jsonSchemaTransform,
  serializerCompiler,
  validatorCompiler,
} from 'fastify-type-provider-zod'
import { createShortUrlRoute } from './routes/create-short-url'
import { deleteShortUrlRoute } from './routes/delete-short-url'
import { exportRegisteredUrlsRoute } from './routes/export-registered-urls'
import { getUrlFromShortUrlRoute } from './routes/get-url-from-short-url'
import { listAllUrlsRoute } from './routes/list-all-urls'

const server = fastify()

server.setValidatorCompiler(validatorCompiler)
server.setSerializerCompiler(serializerCompiler)

server.setErrorHandler((error, _request, reply) => {
  if (hasZodFastifySchemaValidationErrors(error)) {
    return reply
      .status(400)
      .send({ message: 'Validation error', issues: error.validation })
  }

  console.error(error)
  reply.status(500).send({ message: 'Internal Server Error' })
})

server.register(fastifyCors, {
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'HEAD', 'OPTIONS'],
})

server.register(fastifySwagger, {
  openapi: {
    info: {
      title: 'Brev.ly Server',
      description: 'API for managing shortened URLs',
      version: '1.0.0',
    },
  },
  transform: jsonSchemaTransform,
})

server.register(fastifySwaggerUi, { routePrefix: '/docs' })

// Routes
server.register(exportRegisteredUrlsRoute)
server.register(getUrlFromShortUrlRoute)
server.register(listAllUrlsRoute)
server.register(createShortUrlRoute)
server.register(deleteShortUrlRoute)

server.listen({ port: 3333, host: '0.0.0.0' }).then(() => {
  console.log('HTTP server running!')
})
