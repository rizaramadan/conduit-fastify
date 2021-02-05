import { PoolClient } from 'pg'
import { IUser, IUserWrapper } from '../../contracts'
import { IUserRepo } from '../../users/register'
import { v4 as uuidv4 } from 'uuid'

export class UserRepoDb implements IUserRepo {

  getClient: () => Promise<PoolClient>;
  getToken: (username: string, email: string) => string

  constructor(
    getClient: () => Promise<PoolClient>,
    getToken: (username: string, email: string) => string
  ){
    this.getClient = getClient  
    this.getToken = getToken
  }

  async register(user: IUser): Promise<IUserWrapper> {
    const client = await this.getClient()
    const salt = uuidv4().toLocaleUpperCase()
    const { rows } = await client.query<IUser>(
      `INSERT INTO users (username, password, email, bio, image, salt) VALUES ` +
      `($1,digest($2||$4,'sha256' ),$3,'','',$4) RETURNING username, email `,
      [user.username, user.password, user.email, salt]
    );
  
    var output: IUserWrapper = {
      user:{
        username: rows[0].username,
        email:    rows[0].email,
        password: "",
        bio:      null,
        token:    this.getToken(rows[0].username, rows[0].email),
        image:    null,
      }
    }

    return output
  }

}