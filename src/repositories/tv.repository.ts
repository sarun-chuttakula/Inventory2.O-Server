import { NotFoundException } from '../utils';
import AppDataSource from '../configs/data-source';
import {
  INewTVRequest,
  INewTVResponse,
  IUpdateTVRequest,
  IUpdateTVResponse,
} from '../dtos';
import { User } from '../models';
import { TV } from '../models';

export const createTV = async (
  payload: INewTVRequest,
  reqUser: User
): Promise<INewTVResponse> => {
  const tvRepository = AppDataSource.getRepository(TV);
  const newTV = new TV();
  return await tvRepository.save({
    ...newTV,
    ...payload,
    created_by: reqUser.id,
    updated_by: reqUser.id,
    updatedbyname: reqUser.firstname,
    is_active: true,
    is_deleted: false,
  });
};

export const getAllTVs = async (): Promise<INewTVResponse[]> => {
  const tvRepository = AppDataSource.getRepository(TV);
  return await tvRepository.find({
    where: { is_deleted: false, is_active: true },
    order: { created_at: 'DESC' },
  });
};

export const getTVById = async (
  id: string
): Promise<INewTVResponse> => {
  const tvRepository = AppDataSource.getRepository(TV);
  return await tvRepository.findOneOrFail({ where: { id: id } });
};

export const updateTVById = async (
  id: string,
  payload: IUpdateTVRequest,
  reqUser: User
): Promise<IUpdateTVResponse> => {
  const tvRepository = AppDataSource.getRepository(TV);
  const tv = await tvRepository.findOneOrFail({ where: { id: id } });
  return await tvRepository.save({
    ...tv,
    ...payload,
    updated_by: reqUser.id,
    updatedbyname: reqUser.firstname,
  });
};

export const deleteTVById = async (
  id: string
): Promise<IUpdateTVResponse> => {
  const tvRepository = AppDataSource.getRepository(TV);
  const tv = await tvRepository.findOne({ where: { id: id } });
  if ( ! tv ){
      throw new NotFoundException("TV not found");
  }
  return await tvRepository.save({
    ...tv,
    is_active: false,
    is_deleted: true,
  });
};
