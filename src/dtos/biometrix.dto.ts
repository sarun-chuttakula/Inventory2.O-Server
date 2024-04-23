export interface INewBiometrixRequest {
  make: string;
  city: string;
  model: string;
  tagid: string;
  hodtag: string;
  location: string;
  serialnumber: string;
  status: string;
  remarks: string;
}

export const NewBiometrixResponseFields = {
  make: undefined,
  city: undefined,
  model: undefined,
  tagid: undefined,
  hodtag: undefined,
  location: undefined,
  serialnumber: undefined,
  user: undefined,
  status: undefined,
  remarks: undefined,
  updatedbyname: undefined,
};

export interface INewBiometrixResponse {
  make: string;
  city: string;
  model: string;
  tagid: string;
  hodtag: string;
  location: string;
  serialnumber: string;
  user: string;
  status: string;
  remarks: string;
}

export interface IUpdateBiometrixRequest {
  make?: string;
  city?: string;
  model?: string;
  tagid?: string;
  hodtag?: string;
  location?: string;
  serialnumber?: string;
  user?: string;
  status?: string;
  remarks?: string;
  updatedbyname?: string;
}

export const UpdateBiometrixResponseFields = {
  make: undefined,
  city: undefined,
  model: undefined,
  tagid: undefined,
  hodtag: undefined,
  location: undefined,
  serialnumber: undefined,
  user: undefined,
  status: undefined,
  remarks: undefined,
  updatedbyname: undefined,
};

export interface IUpdateBiometrixResponse {
  make: string;
  city: string;
  model: string;
  tagid: string;
  hodtag: string;
  location: string;
  serialnumber: string;
  user: string;
  status: string;
  remarks: string;
}
