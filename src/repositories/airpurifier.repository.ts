import { NotFoundException } from '../utils';
import AppDataSource from '../configs/data-source';
import {
  INewAirpurifierRequest,
  INewAirpurifierResponse,
  IUpdateAirpurifierRequest,
  IUpdateAirpurifierResponse,
} from '../dtos';
import { User } from '../models';
import { Airpurifier } from '../models';

export const createAirpurifier = async (
  payload: INewAirpurifierRequest,
  reqUser: User
): Promise<INewAirpurifierResponse> => {
  const airpurifierRepository = AppDataSource.getRepository(Airpurifier);
  const newAirpurifier = new Airpurifier();
  return await airpurifierRepository.save({
    ...newAirpurifier,
    ...payload,
    created_by: reqUser.id,
    updated_by: reqUser.id,
    updatedbyname: reqUser.firstname,
    is_active: true,
    is_deleted: false,
  });
};

export const getAllAirpurifiers = async (): Promise<INewAirpurifierResponse[]> => {
  const airpurifierRepository = AppDataSource.getRepository(Airpurifier);
  return await airpurifierRepository.find({
    where: { is_deleted: false, is_active: true },
    order: { created_at: 'DESC' },
  });
};

export const getAirpurifierById = async (
  id: string
): Promise<INewAirpurifierResponse> => {
  const airpurifierRepository = AppDataSource.getRepository(Airpurifier);
  return await airpurifierRepository.findOneOrFail({ where: { id: id } });
};

export const updateAirpurifierById = async (
  id: string,
  payload: IUpdateAirpurifierRequest,
  reqUser: User
): Promise<IUpdateAirpurifierResponse> => {
  const airpurifierRepository = AppDataSource.getRepository(Airpurifier);
  const airpurifier = await airpurifierRepository.findOneOrFail({ where: { id: id } });
  return await airpurifierRepository.save({
    ...airpurifier,
    ...payload,
    updated_by: reqUser.id,
    updatedbyname: reqUser.firstname,
  });
};

export const deleteAirpurifierById = async (
  id: string
): Promise<IUpdateAirpurifierResponse> => {
  const airpurifierRepository = AppDataSource.getRepository(Airpurifier);
  const airpurifier = await airpurifierRepository.findOne({ where: { id: id } });
  if ( ! airpurifier ){
      throw new NotFoundException("Airpurifier not found");
  }
  return await airpurifierRepository.save({
    ...airpurifier,
    is_active: false,
    is_deleted: true,
  });
};
