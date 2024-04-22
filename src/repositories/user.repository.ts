import {
  NotFoundException,
  generateHash,
  generateToken,
  storeUserTokenInCache,
} from "../utils";
import AppDataSource from "../configs/data-source";
import {
  IUserRegisterRequest,
  IUserRegisterResponse,
  IUserUpdateRequest,
} from "../dtos";
import { User } from "../models";
import { Role } from "../enums";
import { randomUUID } from "crypto";
import config from "../configs/auth.config";

export const createUser = async (
  payload: IUserRegisterRequest
): Promise<any> => {
  console.log(payload, "payload");
  const lowercaseUsername = payload.username.toLowerCase();
  console.log(lowercaseUsername);
  const userRepository = AppDataSource.manager.getRepository(User);
  const existingUser = await userRepository.findOne({
    where: [{ email: payload.email }, { username: lowercaseUsername }],
  });
  const user = new User();
  if (existingUser) {
    throw new Error("User already exists");
  }
  const hashedPassword = await generateHash(payload.password);
  const newuser = await userRepository.save({
    ...user,
    ...payload,
    created_at: new Date(),
    updated_at: new Date(),
    created_by: "SELF",
    updated_by: "SELF",
    username: lowercaseUsername,
    password: hashedPassword,
  });
  const tokenUuid = randomUUID();
  const refreshToken = generateToken(
    {
      id: newuser.id,
      uuid: tokenUuid,
    },
    "refresh"
  );

  const accessToken = generateToken({
    id: newuser.id,
    role: newuser.role,
    uuid: tokenUuid,
  });

  storeUserTokenInCache(
    `${user.id}-accessToken-${tokenUuid}`,
    accessToken,
    config.accessTokenExpiryTime
  );

  storeUserTokenInCache(
    `${user.id}-refreshToken-${tokenUuid}`,
    refreshToken,
    config.refreshTokenExpiryTime
  );
  newuser.password = "";
  return {
    ...newuser,
    accessToken: accessToken,
    refreshToken: refreshToken,
  };
};

export const getAllUsers = async (reqUser: User): Promise<any> => {
  const userRepository = AppDataSource.getRepository(User);
  return await userRepository.find({
    where: { is_deleted: false, is_active: true },
    order: { created_at: "DESC" },
  });
};

export const getUserById = async (id: string, reqUser: User): Promise<any> => {
  const userRepository = AppDataSource.getRepository(User);
  return await userRepository.findOneOrFail({ where: { id: id } });
};

export const updateUserById = async (
  id: string,
  payload: IUserUpdateRequest,
  reqUser: User
): Promise<any> => {
  const userRepository = AppDataSource.getRepository(User);
  const user = await userRepository.findOneOrFail({ where: { id: id } });
  return await userRepository.save({
    ...user,
    ...payload,
    updated_at: new Date(),
    updated_by: reqUser.id,
  });
};

export const deleteUserById = async (
  id: string,
  reqUser: User
): Promise<any> => {
  const userRepository = AppDataSource.getRepository(User);
  const user = await userRepository.findOneOrFail({ where: { id: id } });
  return await userRepository.save({
    ...user,
    is_deleted: true,
    is_active: false,
  });
};
