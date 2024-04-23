export interface INewItemRequest {
  item_name: string;
  item_description: string;
  item_quantity: string;
  item_date_of_purchase: string;
  item_expiry_date: string;
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
  item_quantity: string;
  item_date_of_purchase: string;
  item_expiry_date: string;
}

export interface IUpdateItemRequest {
  item_name?: string;
  item_description?: string;
  item_quantity?: string;
  item_date_of_purchase?: string;
  item_expiry_date?: string;
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
  item_quantity: string;
  item_date_of_purchase: string;
  item_expiry_date: string;
}
