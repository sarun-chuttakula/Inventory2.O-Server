import AppDataSource from "../configs/data-source";
import { User } from "../models";
import { NotFoundException } from "../utils";

export const createUser = async (user: User): Promise<any> => {
  try {
    await AppDataSource.manager.save(user);
    return user;
  } catch (error) {
    throw error;
  }
};

export const getUser = async (reqUser: User): Promise<User> => {
  const userRepository = AppDataSource.getRepository(User);
  const user = await userRepository.findOne({
    where: {
      id: reqUser.id,
    },
  });
  if (!user) throw new NotFoundException("user not found");
  return user;
};
