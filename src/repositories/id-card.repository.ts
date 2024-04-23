import { NotFoundException } from "../utils";
import AppDataSource from "../configs/data-source";
import {
  INewIDCardRequest,
  INewIDCardResponse,
  IUpdateIDCardRequest,
  IUpdateIDCardResponse,
} from "../dtos";
import { IDCard, User } from "../models";

export const createIDCard = async (
  payload: INewIDCardRequest,
  reqUser: User
): Promise<INewIDCardResponse> => {
  const idcardRepository = AppDataSource.getRepository(IDCard);
  const newIDCard = new IDCard();
  return await idcardRepository.save({
    ...newIDCard,
    ...payload,
    created_by: reqUser.id,
    updated_by: reqUser.id,
    updatedbyname: reqUser.firstname,
    is_active: true,
    is_deleted: false,
  });
};

export const getAllIDCards = async (): Promise<INewIDCardResponse[]> => {
  const idcardRepository = AppDataSource.getRepository(IDCard);
  return await idcardRepository.find({
    where: { is_deleted: false, is_active: true },
    order: { created_at: "DESC" },
  });
};

export const getIDCardById = async (
  id: string
): Promise<INewIDCardResponse> => {
  const idcardRepository = AppDataSource.getRepository(IDCard);
  return await idcardRepository.findOneOrFail({ where: { id: id } });
};

export const updateIDCardById = async (
  id: string,
  payload: IUpdateIDCardRequest,
  reqUser: User
): Promise<IUpdateIDCardResponse> => {
  const idcardRepository = AppDataSource.getRepository(IDCard);
  const idcard = await idcardRepository.findOneOrFail({ where: { id: id } });
  return await idcardRepository.save({
    ...idcard,
    ...payload,
    updated_by: reqUser.id,
    updatedbyname: reqUser.firstname,
  });
};

export const deleteIDCardById = async (
  id: string
): Promise<INewIDCardResponse> => {
  const idcardRepository = AppDataSource.getRepository(IDCard);
  const idcard = await idcardRepository.findOne({ where: { id: id } });
  if (!idcard) {
    throw new NotFoundException("Desktop not found");
  }
  return await idcardRepository.save({
    ...idcard,
    is_active: false,
    is_deleted: true,
  });
};
