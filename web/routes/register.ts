import { FastifyInstance } from 'fastify'
import { IUser } from '../../users/entity'
import { IUserRepo } from '../../users/user_repo'

export interface IUserWrapper {
  user: IUser;
}

export class Register {
  userRepo: IUserRepo
  getToken: (username: string, email: string) => string

  constructor(
    url: string, 
    server: FastifyInstance, 
    getToken: (username: string, email: string) => string,
    userRepo: IUserRepo
  ){
    this.userRepo = userRepo
    this.getToken = getToken
    // url: /users
    server.post<{Body: IUserWrapper}>(url, 
      async (req, reply) => {
        const registerReq = req.body
        const output = await this.register(registerReq)
        reply.code(200).send(output)
      }
    )
  }

  async register(req: IUserWrapper) : Promise<IUserWrapper> {
    const success: boolean = await this.userRepo.create(req.user)
    if(!success) {
      throw new Error("cannot create user");
    }
    const output: IUserWrapper = {
      user:{
        username: req.user.username,
        email:    req.user.email,
        password: "",
        bio:      null,
        token:    this.getToken(req.user.username, req.user.email),
        image:    null,
      }
    }
    return output
  }
}
