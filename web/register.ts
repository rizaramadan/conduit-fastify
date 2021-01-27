import { FastifyInstance } from 'fastify'
import { PoolClient } from 'pg';
import { IUser, IUserWrapper } from '../contracts'
import { v4 as uuidv4 } from 'uuid';

export class Register {
  getClient: () => Promise<PoolClient>;

  constructor(server: FastifyInstance, getClient: () => Promise<PoolClient>) {
    this.getClient = getClient
    server.post<{Body: IUserWrapper}>('/users', 
      async (req, reply) => {
        const registerReq = req.body
        var output = await this.register(registerReq)
        reply.code(200).send(output)
      }
    )
  }

  async register(req: IUserWrapper) : Promise<IUserWrapper> {
    const client = await this.getClient()
    const salt = uuidv4().toLocaleUpperCase()
    const { rows } = await client.query<IUser>(
      `INSERT INTO users (username, password, email, bio, image, salt) VALUES ` +
      `($1,digest($2||$4,'sha256' ),$3,'','',$4) RETURNING username, email `,
      [req.user.username, req.user.password, req.user.email, salt]);
    var output: IUserWrapper = {
      user:{
        username: rows[0].username,
        email:    rows[0].email,
        password: "",
        bio:      null,
        token:    salt,
        image:    null,
      }
    }
    client.release()
    return output
  }
}
