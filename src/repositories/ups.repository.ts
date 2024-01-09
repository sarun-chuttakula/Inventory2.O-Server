import { NotFoundException } from '../utils';
import AppDataSource from '../configs/data-source';
import {
  INewUPSRequest,
  INewUPSResponse,
  IUpdateUPSRequest,
  IUpdateUPSResponse,
} from '../dtos';
import { User } from '../models';
import { UPS } from '../models';

export const createUPS = async (
  payload: INewUPSRequest,
  reqUser: User
): Promise<INewUPSResponse> => {
  const upsRepository = AppDataSource.getRepository(UPS);
  const newUPS = new UPS();
  return await upsRepository.save({
    ...newUPS,
    ...payload,
    created_by: reqUser.id,
    updated_by: reqUser.id,
    updatedbyname: reqUser.firstname,
    is_active: true,
    is_deleted: false,
  });
};

export const getAllUPSs = async (): Promise<INewUPSResponse[]> => {
  const upsRepository = AppDataSource.getRepository(UPS);
  return await upsRepository.find({
    where: { is_deleted: false, is_active: true },
    order: { created_at: 'DESC' },
  });
};

export const getUPSById = async (
  id: string
): Promise<INewUPSResponse> => {
  const upsRepository = AppDataSource.getRepository(UPS);
  return await upsRepository.findOneOrFail({ where: { id: id } });
};

export const updateUPSById = async (
  id: string,
  payload: IUpdateUPSRequest,
  reqUser: User
): Promise<IUpdateUPSResponse> => {
  const upsRepository = AppDataSource.getRepository(UPS);
  const ups = await upsRepository.findOneOrFail({ where: { id: id } });
  return await upsRepository.save({
    ...ups,
    ...payload,
    updated_by: reqUser.id,
    updatedbyname: reqUser.firstname,
  });
};

export const deleteUPSById = async (
  id: string
): Promise<IUpdateUPSResponse> => {
  const upsRepository = AppDataSource.getRepository(UPS);
  const ups = await upsRepository.findOne({ where: { id: id } });
  if ( ! ups ){
      throw new NotFoundException("UPS not found");
  }
  return await upsRepository.save({
    ...ups,
    is_active: false,
    is_deleted: true,
  });
};
