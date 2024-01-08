export interface INewMonitorRequest {
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
  updatedbyname: undefined;
}

export const NewMonitorResponseFields = {
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

export interface INewMonitorResponse {
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
  updatedbyname: undefined;
}

export interface IUpdateMonitorRequest {
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
  updatedbyname?: undefined;
}

export const UpdateMonitorResponseFields = {
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

export interface IUpdateMonitorResponse {
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
  updatedbyname: undefined;
}
