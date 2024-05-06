export interface INewMedicineRequest {
  medicine_name: string;
  vendor: string;
  batch_no: string;
  medicine_quantity: number;
  medicine_date_of_purchase: Date;
  medicine_expiry_date: Date;
}

export const NewMedicineResponseFields = {
  id: undefined,
  medicine_name: undefined,
  vendor: undefined,
  batch_no: undefined,
  medicine_quantity: undefined,
  medicine_date_of_purchase: undefined,
  medicine_expiry_date: undefined,
};

export interface INewMedicineResponse {
  id: string;
  medicine_name: string;
  vendor: string;
  batch_no: string;
  medicine_quantity: number;
  medicine_date_of_purchase: Date;
  medicine_expiry_date: Date;
}

export interface IUpdateMedicineRequest {
  medicine_name?: string;
  vendor?: string;
  batch_no?: string;
  medicine_quantity?: number;
  medicine_date_of_purchase?: Date;
  medicine_expiry_date?: Date;
}

export const UpdateMedicineResponseFields = {
  medicine_name: undefined,
  vendor: undefined,
  batch_no: undefined,
  medicine_quantity: undefined,
  medicine_date_of_purchase: undefined,
  medicine_expiry_date: undefined,
};

export interface IUpdateMedicineResponse {
  id: string;
  medicine_name: string;
  vendor: string;
  batch_no: string;
  medicine_quantity: number;
  medicine_date_of_purchase: Date;
  medicine_expiry_date: Date;
}
