import { NotFoundException } from "../utils";
import AppDataSource from "../configs/data-source";
import {
  INewMedicineRequest,
  INewMedicineResponse,
  IUpdateMedicineRequest,
  IUpdateMedicineResponse,
} from "../dtos";
import { User } from "../models";
import { Medicine } from "../models";

export const createMedicine = async (
  payload: INewMedicineRequest,
  reqUser: User
): Promise<INewMedicineResponse> => {
  const medicineRepository = AppDataSource.getRepository(Medicine);
  const newMedicine = new Medicine();
  return await medicineRepository.save({
    ...newMedicine,
    ...payload,
    medicine_date_of_purchase:new Date(payload.medicine_date_of_purchase),
    medicine_expiry_date:new Date(payload.medicine_expiry_date),
    created_by: reqUser.id,
    updated_by: reqUser.id,
    is_active: true,
    is_deleted: false,
  });
};

export const getAllMedicines = async (): Promise<INewMedicineResponse[]> => {
  const medicineRepository = AppDataSource.getRepository(Medicine);
  return await medicineRepository.find({
    where: { is_deleted: false, is_active: true },
    order: { created_at: "DESC" },
  });
};

export const getMedicineById = async (
  id: string
): Promise<INewMedicineResponse> => {
  const medicineRepository = AppDataSource.getRepository(Medicine);
  return await medicineRepository.findOneOrFail({ where: { id: id } });
};

export const updateMedicineById = async (
  id: string,
  payload: IUpdateMedicineRequest,
  reqUser: User
): Promise<IUpdateMedicineResponse> => {
  const medicineRepository = AppDataSource.getRepository(Medicine);
  const medicine = await medicineRepository.findOneOrFail({ where: { id: id } });
  return await medicineRepository.save({
    ...medicine,
    ...payload,
    updated_by: reqUser.id,
    updatedbyname: reqUser.firstname,
  });
};

export const deleteMedicineById = async (
  id: string
): Promise<IUpdateMedicineResponse> => {
  const medicineRepository = AppDataSource.getRepository(Medicine);
  const medicine = await medicineRepository.findOne({ where: { id: id } });
  if (!medicine) {
    throw new NotFoundException("medicine not found");
  }
  return await medicineRepository.save({
    ...medicine,
    is_active: false,
    is_deleted: true,
  });
};
