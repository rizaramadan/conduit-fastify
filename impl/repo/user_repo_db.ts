import { PoolClient } from 'pg'
import { v4 as uuidv4 } from 'uuid'
import { IUser } from '../../users/entity'
import { IUserRepo } from '../../users/user_repo'

export class UserRepoDb implements IUserRepo {
  //Fields
  getClient: () => Promise<PoolClient>;
  

  //Methods
  constructor(
    getClient: () => Promise<PoolClient>,
    
  ){
    this.getClient = getClient  
  }

  async create(user: IUser): Promise<boolean> {
    const client = await this.getClient()
    const salt = uuidv4().toLocaleUpperCase()
    const { rows } = await client.query<IUser>(
      `INSERT INTO users (username, password, email, bio, image, salt) VALUES ` +
      `($1,digest($2||$4,'sha256' ),$3,'','',$4) RETURNING username `,
      [user.username, user.password, user.email, salt]
    );
    client.release()
    return rows.length == 1
  }
}
