import { IUser } from './entity'

export interface IUserRepo {
  create(user: IUser): Promise<boolean>;
}
