import { FastifyInstance } from 'fastify'
import { IUserWrapper } from '../contracts'
import { IUserRepo } from '../users/register'

export class Register {
  userRepo: IUserRepo

  constructor(
    url: string, 
    server: FastifyInstance, 
    userRepo: IUserRepo
  ){
    this.userRepo = userRepo
    // url: /users
    server.post<{Body: IUserWrapper}>(url, 
      async (req, reply) => {
        const registerReq = req.body
        var output = await this.register(registerReq)
        reply.code(200).send(output)
      }
    )
  }

  async register(req: IUserWrapper) : Promise<IUserWrapper> {
    var output: IUserWrapper = await this.userRepo.register(req.user)
    return output
  }
}
