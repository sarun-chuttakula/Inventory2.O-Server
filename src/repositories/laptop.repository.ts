import { NotFoundException } from '../utils';
import AppDataSource from '../configs/data-source';
import {
  INewLaptopRequest,
  INewLaptopResponse,
  IUpdateLaptopRequest,
  IUpdateLaptopResponse,
} from '../dtos';
import { User } from '../models';
import { Laptop } from '../models';

export const createLaptop = async (
  payload: INewLaptopRequest,
  reqUser: User
): Promise<INewLaptopResponse> => {
  const laptopRepository = AppDataSource.getRepository(Laptop);
  const newLaptop = new Laptop();
  return await laptopRepository.save({
    ...newLaptop,
    ...payload,
    created_by: reqUser.id,
    updated_by: reqUser.id,
    updatedbyname: reqUser.firstname,
    is_active: true,
    is_deleted: false,
  });
};

export const getAllLaptops = async (): Promise<INewLaptopResponse[]> => {
  const laptopRepository = AppDataSource.getRepository(Laptop);
  return await laptopRepository.find({
    where: { is_deleted: false, is_active: true },
    order: { created_at: 'DESC' },
  });
};

export const getLaptopById = async (
  id: string
): Promise<INewLaptopResponse> => {
  const laptopRepository = AppDataSource.getRepository(Laptop);
  return await laptopRepository.findOneOrFail({ where: { id: id } });
};

export const updateLaptopById = async (
  id: string,
  payload: IUpdateLaptopRequest,
  reqUser: User
): Promise<IUpdateLaptopResponse> => {
  const laptopRepository = AppDataSource.getRepository(Laptop);
  const laptop = await laptopRepository.findOneOrFail({ where: { id: id } });
  return await laptopRepository.save({
    ...laptop,
    ...payload,
    updated_by: reqUser.id,
    updatedbyname: reqUser.firstname,
  });
};

export const deleteLaptopById = async (
  id: string
): Promise<IUpdateLaptopResponse> => {
  const laptopRepository = AppDataSource.getRepository(Laptop);
  const laptop = await laptopRepository.findOne({ where: { id: id } });
  if ( ! laptop ){
      throw new NotFoundException("Laptop not found");
  }
  return await laptopRepository.save({
    ...laptop,
    is_active: false,
    is_deleted: true,
  });
};
