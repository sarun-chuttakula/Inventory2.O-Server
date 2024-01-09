import { NotFoundException } from '../utils';
import AppDataSource from '../configs/data-source';
import {
  INewMonitorRequest,
  INewMonitorResponse,
  IUpdateMonitorRequest,
  IUpdateMonitorResponse,
} from '../dtos';
import { User } from '../models';
import { Monitor } from '../models';

export const createMonitor = async (
  payload: INewMonitorRequest,
  reqUser: User
): Promise<INewMonitorResponse> => {
  const monitorRepository = AppDataSource.getRepository(Monitor);
  const newMonitor = new Monitor();
  return await monitorRepository.save({
    ...newMonitor,
    ...payload,
    created_by: reqUser.id,
    updated_by: reqUser.id,
    updatedbyname: reqUser.firstname,
    is_active: true,
    is_deleted: false,
  });
};

export const getAllMonitors = async (): Promise<INewMonitorResponse[]> => {
  const monitorRepository = AppDataSource.getRepository(Monitor);
  return await monitorRepository.find({
    where: { is_deleted: false, is_active: true },
    order: { created_at: 'DESC' },
  });
};

export const getMonitorById = async (
  id: string
): Promise<INewMonitorResponse> => {
  const monitorRepository = AppDataSource.getRepository(Monitor);
  return await monitorRepository.findOneOrFail({ where: { id: id } });
};

export const updateMonitorById = async (
  id: string,
  payload: IUpdateMonitorRequest,
  reqUser: User
): Promise<IUpdateMonitorResponse> => {
  const monitorRepository = AppDataSource.getRepository(Monitor);
  const monitor = await monitorRepository.findOneOrFail({ where: { id: id } });
  return await monitorRepository.save({
    ...monitor,
    ...payload,
    updated_by: reqUser.id,
    updatedbyname: reqUser.firstname,
  });
};

export const deleteMonitorById = async (
  id: string
): Promise<IUpdateMonitorResponse> => {
  const monitorRepository = AppDataSource.getRepository(Monitor);
  const monitor = await monitorRepository.findOne({ where: { id: id } });
  if ( ! monitor ){
      throw new NotFoundException("Monitor not found");
  }
  return await monitorRepository.save({
    ...monitor,
    is_active: false,
    is_deleted: true,
  });
};
