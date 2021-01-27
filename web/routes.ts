import { FastifyLoggerInstance } from "fastify"
import { FastifyInstance } from "fastify/types/instance"
import { Server, IncomingMessage, ServerResponse } from "http"
import { Register } from "./register"


export class Routes {
  constructor(server: FastifyInstance<Server, IncomingMessage, ServerResponse, FastifyLoggerInstance>){
    const getClient = () => server.pg.connect()
    const getToken = (username: string, email: string) => server.jwt.sign({username:username, email:email})
    new Register(server, getClient, getToken)

    server.get('/welcome', 
      async (req, reply) => {
        try {
          await req.jwtVerify()
        } catch (err) {
          reply.send(err)
        }        
        reply.code(200).send(`{"welome": ${req.user.username}}`)
      }
    )
  }
}
