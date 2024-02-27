import { Role } from "../enums";

export interface IBaseUser {
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  password: string;
  role: Role;
}

export interface IUserRegisterRequest {
  firstname: string;
  lastname?: string;
  email: string;
  username: string;
  password: string;
  role?: Role;
  phonenumber?: string;
}

export interface IUserUpdateRequest {
  firstName?: string;
  lastName?: string;
  email?: string;
  username?: string;
  password?: string;
  role?: Role;
  phonenumbers?: string;
}

export const UserRegisterResponseFields = {
  id: undefined,
  firstName: undefined,
  lastName: undefined,
  email: undefined,
  role: undefined,
  phonenumbers: undefined,
  accessToken: undefined,
  refreshToken: undefined,
};

export const UserUpdateResponseFields = {
  firstName: undefined,
  lastName: undefined,
  email: undefined,
  role: undefined,
  phonenumbers: undefined,
};

export interface IUserRegisterResponse extends IBaseUser {
  id: string;
}
