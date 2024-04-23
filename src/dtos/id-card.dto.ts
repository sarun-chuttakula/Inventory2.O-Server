export interface INewIDCardRequest {
  s_no: string;
  employee_name: string;
  employee_id: string;
  organization: string;
  floor: string;
  card_no: string;
  card_hex_no: string;
  keka_entry_status: string;
  date_of_issue: string;
  accessible_areas: string;
  remark: string;
  action: string;
}

export const NewIDCardResponseFields = {
  s_no: undefined,
  employee_name: undefined,
  employee_id: undefined,
  organization: undefined,
  floor: undefined,
  card_no: undefined,
  card_hex_no: undefined,
  keka_entry_status: undefined,
  date_of_issue: undefined,
  accessible_areas: undefined,
  remark: undefined,
  action: undefined,
};

export interface INewIDCardResponse {
  id: string;
  s_no: string;
  employee_name: string;
  employee_id: string;
  organization: string;
  floor: string;
  card_no: string;
  card_hex_no: string;
  keka_entry_status: string;
  date_of_issue: string;
  accessible_areas: string;
  remark: string;
  action: string;
}

export interface IUpdateIDCardRequest {
  s_no?: string;
  employee_name?: string;
  employee_id?: string;
  organization?: string;
  floor?: string;
  card_no?: string;
  card_hex_no?: string;
  keka_entry_status?: string;
  date_of_issue?: string;
  accessible_areas?: string;
  remark?: string;
  action?: string;
}

export const UpdateIDCardResponseFields = {
  s_no: undefined,
  employee_name: undefined,
  employee_id: undefined,
  organization: undefined,
  floor: undefined,
  card_no: undefined,
  card_hex_no: undefined,
  keka_entry_status: undefined,
  date_of_issue: undefined,
  accessible_areas: undefined,
  remark: undefined,
  action: undefined,
};

export interface IUpdateIDCardResponse {
  id: string;
  s_no: string;
  employee_name: string;
  employee_id: string;
  organization: string;
  floor: string;
  card_no: string;
  card_hex_no: string;
  keka_entry_status: string;
  date_of_issue: string;
  accessible_areas: string;
  remark: string;
  action: string;
}
