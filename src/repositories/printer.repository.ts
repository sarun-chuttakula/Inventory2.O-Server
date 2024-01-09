import { NotFoundException } from '../utils';
import AppDataSource from '../configs/data-source';
import {
  INewPrinterRequest,
  INewPrinterResponse,
  IUpdatePrinterRequest,
  IUpdatePrinterResponse,
} from '../dtos';
import { User } from '../models';
import { Printer } from '../models';

export const createPrinter = async (
  payload: INewPrinterRequest,
  reqUser: User
): Promise<INewPrinterResponse> => {
  const printerRepository = AppDataSource.getRepository(Printer);
  const newPrinter = new Printer();
  return await printerRepository.save({
    ...newPrinter,
    ...payload,
    created_by: reqUser.id,
    updated_by: reqUser.id,
    updatedbyname: reqUser.firstname,
    is_active: true,
    is_deleted: false,
  });
};

export const getAllPrinters = async (): Promise<INewPrinterResponse[]> => {
  const printerRepository = AppDataSource.getRepository(Printer);
  return await printerRepository.find({
    where: { is_deleted: false, is_active: true },
    order: { created_at: 'DESC' },
  });
};

export const getPrinterById = async (
  id: string
): Promise<INewPrinterResponse> => {
  const printerRepository = AppDataSource.getRepository(Printer);
  return await printerRepository.findOneOrFail({ where: { id: id } });
};

export const updatePrinterById = async (
  id: string,
  payload: IUpdatePrinterRequest,
  reqUser: User
): Promise<IUpdatePrinterResponse> => {
  const printerRepository = AppDataSource.getRepository(Printer);
  const printer = await printerRepository.findOneOrFail({ where: { id: id } });
  return await printerRepository.save({
    ...printer,
    ...payload,
    updated_by: reqUser.id,
    updatedbyname: reqUser.firstname,
  });
};

export const deletePrinterById = async (
  id: string
): Promise<IUpdatePrinterResponse> => {
  const printerRepository = AppDataSource.getRepository(Printer);
  const printer = await printerRepository.findOne({ where: { id: id } });
  if ( ! printer ){
      throw new NotFoundException("Printer not found");
  }
  return await printerRepository.save({
    ...printer,
    is_active: false,
    is_deleted: true,
  });
};
