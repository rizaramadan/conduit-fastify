import fastify from 'fastify'
import { IQuerystring, IHeaders } from "./contracts"
import { IRegisterWrapper , IUserResponse } from "./handlers/register"



const server = fastify()

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

server.get<{
    Querystring: IQuerystring,
    Headers: IHeaders
  }>('/auth', async (request, reply) => {
    const { username, password } = request.query
    const customerHeader = request.headers['H-Custom']
    // do something with request data
  
    return `logged in!`
  })


server.post<{
    Body: IRegisterWrapper
  }>('/users', async (req, reply) => {
    const registerReq = req.body
    
    // do something with request data
    var output: IUserResponse = {
        user:{
            username: registerReq.user.username,
            email: registerReq.user.email,
            bio: "this is bio",
        }
    }
    reply
      .code(200)
      .send(output)
  })

server.listen(8080, (err, address) => {
  if (err) {
    console.error(err)
    process.exit(1)
  }
  console.log(`Server listening at ${address}`)
})
