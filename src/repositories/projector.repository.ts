import { NotFoundException } from '../utils';
import AppDataSource from '../configs/data-source';
import {
  INewProjectorRequest,
  INewProjectorResponse,
  IUpdateProjectorRequest,
  IUpdateProjectorResponse,
} from '../dtos';
import { User } from '../models';
import { Projector } from '../models';

export const createProjector = async (
  payload: INewProjectorRequest,
  reqUser: User
): Promise<INewProjectorResponse> => {
  const projectorRepository = AppDataSource.getRepository(Projector);
  const newProjector = new Projector();
  return await projectorRepository.save({
    ...newProjector,
    ...payload,
    created_by: reqUser.id,
    updated_by: reqUser.id,
    updatedbyname: reqUser.firstname,
    is_active: true,
    is_deleted: false,
  });
};

export const getAllProjectors = async (): Promise<INewProjectorResponse[]> => {
  const projectorRepository = AppDataSource.getRepository(Projector);
  return await projectorRepository.find({
    where: { is_deleted: false, is_active: true },
    order: { created_at: 'DESC' },
  });
};

export const getProjectorById = async (
  id: string
): Promise<INewProjectorResponse> => {
  const projectorRepository = AppDataSource.getRepository(Projector);
  return await projectorRepository.findOneOrFail({ where: { id: id } });
};

export const updateProjectorById = async (
  id: string,
  payload: IUpdateProjectorRequest,
  reqUser: User
): Promise<IUpdateProjectorResponse> => {
  const projectorRepository = AppDataSource.getRepository(Projector);
  const projector = await projectorRepository.findOneOrFail({ where: { id: id } });
  return await projectorRepository.save({
    ...projector,
    ...payload,
    updated_by: reqUser.id,
    updatedbyname: reqUser.firstname,
  });
};

export const deleteProjectorById = async (
  id: string
): Promise<IUpdateProjectorResponse> => {
  const projectorRepository = AppDataSource.getRepository(Projector);
  const projector = await projectorRepository.findOne({ where: { id: id } });
  if ( ! projector ){
      throw new NotFoundException("Projector not found");
  }
  return await projectorRepository.save({
    ...projector,
    is_active: false,
    is_deleted: true,
  });
};
