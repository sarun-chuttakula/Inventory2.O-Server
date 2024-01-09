export interface INewTVRequest {
  make: string;
  city: string;
  model: string;
  tagid: string;
  hodtag: string;
  location: string;
  serialnumber: string;
  screensize: string;
  user: string;
  status: string;
  remarks: string;
  updatedbyname: string;
}

export const NewTVResponseFields = {
  make: undefined,
  city: undefined,
  model: undefined,
  tagid: undefined,
  hodtag: undefined,
  location: undefined,
  serialnumber: undefined,
  screensize: undefined,
  user: undefined,
  status: undefined,
  remarks: undefined,
  updatedbyname: undefined,
};

export interface INewTVResponse {
  make: string;
  city: string;
  model: string;
  tagid: string;
  hodtag: string;
  location: string;
  serialnumber: string;
  screensize: string;
  user: string;
  status: string;
  remarks: string;
  updatedbyname: string;
}

export interface IUpdateTVRequest {
  make?: string;
  city?: string;
  model?: string;
  tagid?: string;
  hodtag?: string;
  location?: string;
  serialnumber?: string;
  screensize?: string;
  user?: string;
  status?: string;
  remarks?: string;
  updatedbyname?: string;
}

export const UpdateTVResponseFields = {
  make: undefined,
  city: undefined,
  model: undefined,
  tagid: undefined,
  hodtag: undefined,
  location: undefined,
  serialnumber: undefined,
  screensize: undefined,
  user: undefined,
  status: undefined,
  remarks: undefined,
  updatedbyname: undefined,
};

export interface IUpdateTVResponse {
  make: string;
  city: string;
  model: string;
  tagid: string;
  hodtag: string;
  location: string;
  serialnumber: string;
  screensize: string;
  user: string;
  status: string;
  remarks: string;
  updatedbyname: string;
}
