import { NotFoundException } from '../utils';
import AppDataSource from '../configs/data-source';
import {
  INewBiometrixRequest,
  INewBiometrixResponse,
  IUpdateBiometrixRequest,
  IUpdateBiometrixResponse,
} from '../dtos';
import { User } from '../models';
import { Biometrix } from '../models';

export const createBiometrix = async (
  payload: INewBiometrixRequest,
  reqUser: User
): Promise<INewBiometrixResponse> => {
  const biometrixRepository = AppDataSource.getRepository(Biometrix);
  const newBiometrix = new Biometrix();
  return await biometrixRepository.save({
    ...newBiometrix,
    ...payload,
    created_by: reqUser.id,
    updated_by: reqUser.id,
    updatedbyname: reqUser.firstname,
    is_active: true,
    is_deleted: false,
  });
};

export const getAllBiometrixs = async (): Promise<INewBiometrixResponse[]> => {
  const biometrixRepository = AppDataSource.getRepository(Biometrix);
  return await biometrixRepository.find({
    where: { is_deleted: false, is_active: true },
    order: { created_at: 'DESC' },
  });
};

export const getBiometrixById = async (
  id: string
): Promise<INewBiometrixResponse> => {
  const biometrixRepository = AppDataSource.getRepository(Biometrix);
  return await biometrixRepository.findOneOrFail({ where: { id: id } });
};

export const updateBiometrixById = async (
  id: string,
  payload: IUpdateBiometrixRequest,
  reqUser: User
): Promise<IUpdateBiometrixResponse> => {
  const biometrixRepository = AppDataSource.getRepository(Biometrix);
  const biometrix = await biometrixRepository.findOneOrFail({ where: { id: id } });
  return await biometrixRepository.save({
    ...biometrix,
    ...payload,
    updated_by: reqUser.id,
    updatedbyname: reqUser.firstname,
  });
};

export const deleteBiometrixById = async (
  id: string
): Promise<IUpdateBiometrixResponse> => {
  const biometrixRepository = AppDataSource.getRepository(Biometrix);
  const biometrix = await biometrixRepository.findOne({ where: { id: id } });
  if ( ! biometrix ){
      throw new NotFoundException("Biometrix not found");
  }
  return await biometrixRepository.save({
    ...biometrix,
    is_active: false,
    is_deleted: true,
  });
};
