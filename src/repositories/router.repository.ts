import { NotFoundException } from '../utils';
import AppDataSource from '../configs/data-source';
import {
  INewRouterRequest,
  INewRouterResponse,
  IUpdateRouterRequest,
  IUpdateRouterResponse,
} from '../dtos';
import { User } from '../models';
import { Router } from '../models';

export const createRouter = async (
  payload: INewRouterRequest,
  reqUser: User
): Promise<INewRouterResponse> => {
  const routerRepository = AppDataSource.getRepository(Router);
  const newRouter = new Router();
  return await routerRepository.save({
    ...newRouter,
    ...payload,
    created_by: reqUser.id,
    updated_by: reqUser.id,
    updatedbyname: reqUser.firstname,
    is_active: true,
    is_deleted: false,
  });
};

export const getAllRouters = async (): Promise<INewRouterResponse[]> => {
  const routerRepository = AppDataSource.getRepository(Router);
  return await routerRepository.find({
    where: { is_deleted: false, is_active: true },
    order: { created_at: 'DESC' },
  });
};

export const getRouterById = async (
  id: string
): Promise<INewRouterResponse> => {
  const routerRepository = AppDataSource.getRepository(Router);
  return await routerRepository.findOneOrFail({ where: { id: id } });
};

export const updateRouterById = async (
  id: string,
  payload: IUpdateRouterRequest,
  reqUser: User
): Promise<IUpdateRouterResponse> => {
  const routerRepository = AppDataSource.getRepository(Router);
  const router = await routerRepository.findOneOrFail({ where: { id: id } });
  return await routerRepository.save({
    ...router,
    ...payload,
    updated_by: reqUser.id,
    updatedbyname: reqUser.firstname,
  });
};

export const deleteRouterById = async (
  id: string
): Promise<IUpdateRouterResponse> => {
  const routerRepository = AppDataSource.getRepository(Router);
  const router = await routerRepository.findOne({ where: { id: id } });
  if ( ! router ){
      throw new NotFoundException("Router not found");
  }
  return await routerRepository.save({
    ...router,
    is_active: false,
    is_deleted: true,
  });
};
