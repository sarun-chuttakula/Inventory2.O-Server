import { NotFoundException } from '../utils';
import AppDataSource from '../configs/data-source';
import {
  INewACRequest,
  INewACResponse,
  IUpdateACRequest,
  IUpdateACResponse,
} from '../dtos';
import { User } from '../models';
import { AC } from '../models';

export const createAC = async (
  payload: INewACRequest,
  reqUser: User
): Promise<INewACResponse> => {
  const acRepository = AppDataSource.getRepository(AC);
  const newAC = new AC();
  return await acRepository.save({
    ...newAC,
    ...payload,
    created_by: reqUser.id,
    updated_by: reqUser.id,
    updatedbyname: reqUser.firstname,
    is_active: true,
    is_deleted: false,
  });
};

export const getAllACs = async (): Promise<INewACResponse[]> => {
  const acRepository = AppDataSource.getRepository(AC);
  return await acRepository.find({
    where: { is_deleted: false, is_active: true },
    order: { created_at: 'DESC' },
  });
};

export const getACById = async (
  id: string
): Promise<INewACResponse> => {
  const acRepository = AppDataSource.getRepository(AC);
  return await acRepository.findOneOrFail({ where: { id: id } });
};

export const updateACById = async (
  id: string,
  payload: IUpdateACRequest,
  reqUser: User
): Promise<IUpdateACResponse> => {
  const acRepository = AppDataSource.getRepository(AC);
  const ac = await acRepository.findOneOrFail({ where: { id: id } });
  return await acRepository.save({
    ...ac,
    ...payload,
    updated_by: reqUser.id,
    updatedbyname: reqUser.firstname,
  });
};

export const deleteACById = async (
  id: string
): Promise<IUpdateACResponse> => {
  const acRepository = AppDataSource.getRepository(AC);
  const ac = await acRepository.findOne({ where: { id: id } });
  if ( ! ac ){
      throw new NotFoundException("AC not found");
  }
  return await acRepository.save({
    ...ac,
    is_active: false,
    is_deleted: true,
  });
};
