import { IUser } from "./User";

export type TSignIn = {
  username: string;
  password: string;
};

export type TSignature = {
  accessToken: string;
  expiredAt: number;
  refreshToken: string;
  expiredAtRefreshToken: number;
  email: string;
  phone: string;
};

export type TAuth = {
  user: IUser;
  auth: TSignature;
};
