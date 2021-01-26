import fastify from 'fastify'
import {IQuerystring, IHeaders, IRegisterWrapper, IUserResponse} from "./contracts"

const server = fastify()

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
    return output
  })

server.listen(8080, (err, address) => {
  if (err) {
    console.error(err)
    process.exit(1)
  }
  console.log(`Server listening at ${address}`)
})
