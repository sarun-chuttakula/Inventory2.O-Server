import AppDataSource from "../configs/data-source";
import { User } from "../models";

export const createUser = async (user: User): Promise<any> => {
  try {
    await AppDataSource.manager.save(user);
    return user;
  } catch (error) {
    throw error;
  }
};
