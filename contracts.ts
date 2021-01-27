
export interface IUser {
  username: string;
  password: string;
  email:    string;
  token:    string | null;
  bio:      string | null;
  image:    string | null;
}

export interface IUserWrapper {
  user: IUser;
}