import { NotFoundException } from '../utils';
import AppDataSource from '../configs/data-source';
import {
  INewKeyboardRequest,
  INewKeyboardResponse,
  IUpdateKeyboardRequest,
  IUpdateKeyboardResponse,
} from '../dtos';
import { User } from '../models';
import { Keyboard } from '../models';

export const createKeyboard = async (
  payload: INewKeyboardRequest,
  reqUser: User
): Promise<INewKeyboardResponse> => {
  const keyboardRepository = AppDataSource.getRepository(Keyboard);
  const newKeyboard = new Keyboard();
  return await keyboardRepository.save({
    ...newKeyboard,
    ...payload,
    created_by: reqUser.id,
    updated_by: reqUser.id,
    updatedbyname: reqUser.firstname,
    is_active: true,
    is_deleted: false,
  });
};

export const getAllKeyboards = async (): Promise<INewKeyboardResponse[]> => {
  const keyboardRepository = AppDataSource.getRepository(Keyboard);
  return await keyboardRepository.find({
    where: { is_deleted: false, is_active: true },
    order: { created_at: 'DESC' },
  });
};

export const getKeyboardById = async (
  id: string
): Promise<INewKeyboardResponse> => {
  const keyboardRepository = AppDataSource.getRepository(Keyboard);
  return await keyboardRepository.findOneOrFail({ where: { id: id } });
};

export const updateKeyboardById = async (
  id: string,
  payload: IUpdateKeyboardRequest,
  reqUser: User
): Promise<IUpdateKeyboardResponse> => {
  const keyboardRepository = AppDataSource.getRepository(Keyboard);
  const keyboard = await keyboardRepository.findOneOrFail({ where: { id: id } });
  return await keyboardRepository.save({
    ...keyboard,
    ...payload,
    updated_by: reqUser.id,
    updatedbyname: reqUser.firstname,
  });
};

export const deleteKeyboardById = async (
  id: string
): Promise<IUpdateKeyboardResponse> => {
  const keyboardRepository = AppDataSource.getRepository(Keyboard);
  const keyboard = await keyboardRepository.findOne({ where: { id: id } });
  if ( ! keyboard ){
      throw new NotFoundException("Keyboard not found");
  }
  return await keyboardRepository.save({
    ...keyboard,
    is_active: false,
    is_deleted: true,
  });
};
