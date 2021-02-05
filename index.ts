import fastify, { FastifyInstance } from 'fastify'
import { Plugins }                  from './web/plugins/plugins'
import { Routes }                   from './web/routes/routes'

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
server.listen(8080, (err: any, address: any) => {
  if (err) {
    console.error(err)
    process.exit(1)
  }
  console.log(`Server listening at ${address}`)
})
