import { IUser, IUserWrapper } from '../contracts'

export interface IUserRepo {
  register(user: IUser): Promise<IUserWrapper>;
}
