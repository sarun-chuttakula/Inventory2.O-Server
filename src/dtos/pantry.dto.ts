export interface INewItemRequest {
  item_name: string;
  item_description: string;
  item_quantity: number;
  item_date_of_purchase: Date;
  item_expiry_date: Date;
}

export const NewItemResponseFields = {
  id: undefined,
  item_name: undefined,
  item_description: undefined,
  item_quantity: undefined,
  item_date_of_purchase: undefined,
  item_expiry_date: undefined,
};

export interface INewItemResponse {
  id: string;
  item_name: string;
  item_description: string;
  item_quantity: number;
  item_date_of_purchase: Date;
  item_expiry_date: Date;
}

export interface IUpdateItemRequest {
  item_name?: string;
  item_description?: string;
  item_quantity?: number;
  item_date_of_purchase?: Date;
  item_expiry_date?: Date;
}

export const UpdateItemResponseFields = {
  id: undefined,
  item_name: undefined,
  item_description: undefined,
  item_quantity: undefined,
  item_date_of_purchase: undefined,
  item_expiry_date: undefined,
};

export interface IUpdateItemResponse {
  id: string;
  item_name: string;
  item_description: string;
  item_quantity: number;
  item_date_of_purchase: Date;
  item_expiry_date: Date;
}
