import { NotFoundException } from "../utils";
import AppDataSource from "../configs/data-source";
import {
  INewDesktopRequest,
  INewDesktopResponse,
  IUpdateDesktopRequest,
  IUpdateDesktopResponse,
} from "../dtos";
import { User } from "../models";
import { Desktop } from "../models";

export const createDesktop = async (
  payload: INewDesktopRequest,
  reqUser: User
): Promise<INewDesktopResponse> => {
  const desktopRepository = AppDataSource.getRepository(Desktop);
  const newDesktop = new Desktop();
  return await desktopRepository.save({
    ...newDesktop,
    ...payload,
    created_by: reqUser.id,
    updated_by: reqUser.id,
    updatedbyname: reqUser.firstname,
    is_active: true,
    is_deleted: false,
  });
};

export const getAllDesktops = async (): Promise<INewDesktopResponse[]> => {
  const desktopRepository = AppDataSource.getRepository(Desktop);
  return await desktopRepository.find({
    where: { is_deleted: false, is_active: true },
    order: { created_at: "DESC" },
  });
};

export const getDesktopById = async (
  id: string
): Promise<INewDesktopResponse> => {
  const desktopRepository = AppDataSource.getRepository(Desktop);
  return await desktopRepository.findOneOrFail({ where: { id: id } });
};

export const updateDesktopById = async (
  id: string,
  payload: IUpdateDesktopRequest,
  reqUser: User
): Promise<IUpdateDesktopResponse> => {
  const desktopRepository = AppDataSource.getRepository(Desktop);
  const desktop = await desktopRepository.findOneOrFail({ where: { id: id } });
  return await desktopRepository.save({
    ...desktop,
    ...payload,
    updated_by: reqUser.id,
    updatedbyname: reqUser.firstname,
  });
};

export const deleteDesktopById = async (
  id: string
): Promise<IUpdateDesktopResponse> => {
  const desktopRepository = AppDataSource.getRepository(Desktop);
  const desktop = await desktopRepository.findOne({ where: { id: id } });
  if (!desktop) {
    throw new NotFoundException("Desktop not found");
  }
  return await desktopRepository.save({
    ...desktop,
    is_active: false,
    is_deleted: true,
  });
};
