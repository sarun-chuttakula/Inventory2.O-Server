export interface INewAirpurifierRequest {
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

export const NewAirpurifierResponseFields = {
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

export interface INewAirpurifierResponse {
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

export interface IUpdateAirpurifierRequest {
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

export const UpdateAirpurifierResponseFields = {
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

export interface IUpdateAirpurifierResponse {
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
