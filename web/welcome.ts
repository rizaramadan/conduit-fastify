import { FastifyInstance } from 'fastify'

export class Welcome {
  // url: /welcome
  constructor( url: string, server: FastifyInstance) {
    server.get(url, 
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
