
export interface IRegister {
  username: string;
  email: string;
  password: string;
}

export interface IRegisterWrapper {
  user : IRegister;
}

export interface IUser {
  username: string;
  email: string;
  bio: string;
}

export interface IUserResponse {
  user: IUser;
}
