export interface INewLaptopRequest {
  make: string;
  city: string;
  model: string;
  tagid: string;
  hodtag: string;
  location: string;
  serialnumber: string;
  macid_lan?: string;
  macid_wifi?: string;
  processor: string;
  generation: string;
  os: string;
  oskey: string;
  hostname: string;
  ram: string;
  storage: string;
  graphics: string;
  user: string;
  status: string;
  remarks: string;
  updatedbyname: undefined;
}

export const NewLaptopResponseFields = {
  make: undefined,
  city: undefined,
  model: undefined,
  tagid: undefined,
  hodtag: undefined,
  location: undefined,
  serialnumber: undefined,
  macid_lan: undefined,
  macid_wifi: undefined,
  processor: undefined,
  generation: undefined,
  os: undefined,
  oskey: undefined,
  hostname: undefined,
  ram: undefined,
  storage: undefined,
  graphics: undefined,
  user: undefined,
  status: undefined,
  remarks: undefined,
  updatedbyname: undefined,
};

export interface INewLaptopResponse {
  make: string;
  city: string;
  model: string;
  tagid: string;
  hodtag: string;
  location: string;
  serialnumber: string;
  macid_lan?: string;
  macid_wifi?: string;
  processor: string;
  generation: string;
  os: string;
  oskey: string;
  hostname: string;
  ram: string;
  storage: string;
  graphics: string;
  user: string;
  status: string;
  remarks: string;
  updatedbyname: undefined;
}

export interface IUpdateLaptopRequest {
  make?: string;
  city?: string;
  model?: string;
  tagid?: string;
  hodtag?: string;
  location?: string;
  serialnumber?: string;
  macid_lan?: string;
  macid_wifi?: string;
  processor?: string;
  generation?: string;
  os?: string;
  oskey?: string;
  hostname?: string;
  ram?: string;
  storage?: string;
  graphics?: string;
  user?: string;
  status?: string;
  remarks?: string;
  updatedbyname?: undefined;
}

export const UpdateLaptopResponseFields = {
  make: undefined,
  city: undefined,
  model: undefined,
  tagid: undefined,
  hodtag: undefined,
  location: undefined,
  serialnumber: undefined,
  macid_lan: undefined,
  macid_wifi: undefined,
  processor: undefined,
  generation: undefined,
  os: undefined,
  oskey: undefined,
  hostname: undefined,
  ram: undefined,
  storage: undefined,
  graphics: undefined,
  user: undefined,
  status: undefined,
  remarks: undefined,
  updatedbyname: undefined,
};

export interface IUpdateLaptopResponse {
  make: string;
  city: string;
  model: string;
  tagid: string;
  hodtag: string;
  location: string;
  serialnumber: string;
  macid_lan?: string;
  macid_wifi?: string;
  processor: string;
  generation: string;
  os: string;
  oskey: string;
  hostname: string;
  ram: string;
  storage: string;
  graphics: string;
  user: string;
  status: string;
  remarks: string;
  updatedbyname: undefined;
}
