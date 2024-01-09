import { NotFoundException } from '../utils';
import AppDataSource from '../configs/data-source';
import {
  INewTabRequest,
  INewTabResponse,
  IUpdateTabRequest,
  IUpdateTabResponse,
} from '../dtos';
import { User } from '../models';
import { Tab } from '../models';

export const createTab = async (
  payload: INewTabRequest,
  reqUser: User
): Promise<INewTabResponse> => {
  const tabRepository = AppDataSource.getRepository(Tab);
  const newTab = new Tab();
  return await tabRepository.save({
    ...newTab,
    ...payload,
    created_by: reqUser.id,
    updated_by: reqUser.id,
    updatedbyname: reqUser.firstname,
    is_active: true,
    is_deleted: false,
  });
};

export const getAllTabs = async (): Promise<INewTabResponse[]> => {
  const tabRepository = AppDataSource.getRepository(Tab);
  return await tabRepository.find({
    where: { is_deleted: false, is_active: true },
    order: { created_at: 'DESC' },
  });
};

export const getTabById = async (
  id: string
): Promise<INewTabResponse> => {
  const tabRepository = AppDataSource.getRepository(Tab);
  return await tabRepository.findOneOrFail({ where: { id: id } });
};

export const updateTabById = async (
  id: string,
  payload: IUpdateTabRequest,
  reqUser: User
): Promise<IUpdateTabResponse> => {
  const tabRepository = AppDataSource.getRepository(Tab);
  const tab = await tabRepository.findOneOrFail({ where: { id: id } });
  return await tabRepository.save({
    ...tab,
    ...payload,
    updated_by: reqUser.id,
    updatedbyname: reqUser.firstname,
  });
};

export const deleteTabById = async (
  id: string
): Promise<IUpdateTabResponse> => {
  const tabRepository = AppDataSource.getRepository(Tab);
  const tab = await tabRepository.findOne({ where: { id: id } });
  if ( ! tab ){
      throw new NotFoundException("Tab not found");
  }
  return await tabRepository.save({
    ...tab,
    is_active: false,
    is_deleted: true,
  });
};
