import fastify, { FastifyInstance } from 'fastify'
import { Plugins } from './impl/plugins'
import { Routes } from './web/routes'

/**
 * instantiate fastify server
 */
const server: FastifyInstance = fastify()
/**
 * setup all plugin
 */
new Plugins(server)
/**
 * setup all routes
 */
new Routes(server)
/**
 * start listen
 */
server.listen(8080, (err, address) => {
  if (err) {
    console.error(err)
    process.exit(1)
  }
  console.log(`Server listening at ${address}`)
})
