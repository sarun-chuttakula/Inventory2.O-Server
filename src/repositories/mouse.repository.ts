import { NotFoundException } from '../utils';
import AppDataSource from '../configs/data-source';
import {
  INewMouseRequest,
  INewMouseResponse,
  IUpdateMouseRequest,
  IUpdateMouseResponse,
} from '../dtos';
import { User } from '../models';
import { Mouse } from '../models';

export const createMouse = async (
  payload: INewMouseRequest,
  reqUser: User
): Promise<INewMouseResponse> => {
  const mouseRepository = AppDataSource.getRepository(Mouse);
  const newMouse = new Mouse();
  return await mouseRepository.save({
    ...newMouse,
    ...payload,
    created_by: reqUser.id,
    updated_by: reqUser.id,
    updatedbyname: reqUser.firstname,
    is_active: true,
    is_deleted: false,
  });
};

export const getAllMouses = async (): Promise<INewMouseResponse[]> => {
  const mouseRepository = AppDataSource.getRepository(Mouse);
  return await mouseRepository.find({
    where: { is_deleted: false, is_active: true },
    order: { created_at: 'DESC' },
  });
};

export const getMouseById = async (
  id: string
): Promise<INewMouseResponse> => {
  const mouseRepository = AppDataSource.getRepository(Mouse);
  return await mouseRepository.findOneOrFail({ where: { id: id } });
};

export const updateMouseById = async (
  id: string,
  payload: IUpdateMouseRequest,
  reqUser: User
): Promise<IUpdateMouseResponse> => {
  const mouseRepository = AppDataSource.getRepository(Mouse);
  const mouse = await mouseRepository.findOneOrFail({ where: { id: id } });
  return await mouseRepository.save({
    ...mouse,
    ...payload,
    updated_by: reqUser.id,
    updatedbyname: reqUser.firstname,
  });
};

export const deleteMouseById = async (
  id: string
): Promise<IUpdateMouseResponse> => {
  const mouseRepository = AppDataSource.getRepository(Mouse);
  const mouse = await mouseRepository.findOne({ where: { id: id } });
  if ( ! mouse ){
      throw new NotFoundException("Mouse not found");
  }
  return await mouseRepository.save({
    ...mouse,
    is_active: false,
    is_deleted: true,
  });
};
