export interface INewPurchaseRegisterRequest {
  branch: string;
  purchase_date: Date;
  vendor: string;
  product: string;
  description: string;
  brand: string;
  model: string;
  serialnumber: string;
  quantity: number;
  rate: string;
  amount: number;
  capex: boolean;
  end_user: string;
  employeecode: string;
  department: string;
  tag: string;
}

export const NewPurchaseRegisterResponseFields = {
  id: undefined,
  branch: undefined,
  purchase_date: undefined,
  vendor: undefined,
  product: undefined,
  description: undefined,
  brand: undefined,
  model: undefined,
  serialnumber: undefined,
  quantity: undefined,
  rate: undefined,
  amount: undefined,
  capex: undefined,
  end_user: undefined,
  employeecode: undefined,
  department: undefined,
  tag: undefined,
};

export interface INewPurchaseRegisterResponse {
  id: string;
  branch: string;
  purchase_date: Date;
  vendor: string;
  product: string;
  description: string;
  brand: string;
  model: string;
  serialnumber: string;
  quantity: number;
  rate: string;
  amount: number;
  capex: boolean;
  end_user: string;
  employeecode: string;
  department: string;
  tag: string;
}
