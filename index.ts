import fastify, { FastifyInstance } from 'fastify'
import { Register } from "./web/register"

const server : FastifyInstance = fastify()

server.register(require('fastify-postgres'), {
  connectionString: 'postgres://postgres:mainmain@localhost:5432/gonduit',
});

server.get('/calc', async () => {
  const client = await server.pg.connect()
  const { rows } = await client.query<Int16Array>('SELECT 2 + 2 as sum');
  client.release()
  return rows[0]
});

server.get('/ping', async (request, reply) => { 
  return 'pong\n'
})

const getClient = () => server.pg.connect()
new Register(server, getClient)

server.listen(8080, (err, address) => {
  if (err) {
    console.error(err)
    process.exit(1)
  }
  console.log(`Server listening at ${address}`)
})
