import { NotFoundException } from "../utils";
import AppDataSource from "../configs/data-source";
import {
  INewItemRequest,
  INewItemResponse,
  IUpdateItemRequest,
  IUpdateItemResponse,
} from "../dtos";
import { User } from "../models";
import { Pantry } from "../models";

export const createPantry = async (
  payload: INewItemRequest,
  reqUser: User
): Promise<INewItemResponse> => {
  const pantryRepository = AppDataSource.getRepository(Pantry);
  const newPantry = new Pantry();
  return await pantryRepository.save({
    ...newPantry,
    ...payload,
    item_date_of_purchase:new Date(payload.item_date_of_purchase),
    item_expiry_date:new Date(payload.item_expiry_date),
    created_by: reqUser.id,
    updated_by: reqUser.id,
    is_active: true,
    is_deleted: false,
  });
};

export const getAllPantrys = async (): Promise<INewItemResponse[]> => {
  const pantryRepository = AppDataSource.getRepository(Pantry);
  return await pantryRepository.find({
    where: { is_deleted: false, is_active: true },
    order: { created_at: "DESC" },
  });
};

export const getPantryById = async (
  id: string
): Promise<INewItemResponse> => {
  const pantryRepository = AppDataSource.getRepository(Pantry);
  return await pantryRepository.findOneOrFail({ where: { id: id } });
};

export const updatePantryById = async (
  id: string,
  payload: IUpdateItemRequest,
  reqUser: User
): Promise<IUpdateItemResponse> => {
  const pantryRepository = AppDataSource.getRepository(Pantry);
  const pantry = await pantryRepository.findOneOrFail({ where: { id: id } });
  return await pantryRepository.save({
    ...pantry,
    ...payload,
    updated_by: reqUser.id,
    updatedbyname: reqUser.firstname,
  });
};

export const deletePantryById = async (
  id: string
): Promise<IUpdateItemResponse> => {
  const pantryRepository = AppDataSource.getRepository(Pantry);
  const pantry = await pantryRepository.findOne({ where: { id: id } });
  if (!pantry) {
    throw new NotFoundException("pantry not found");
  }
  return await pantryRepository.save({
    ...pantry,
    is_active: false,
    is_deleted: true,
  });
};
