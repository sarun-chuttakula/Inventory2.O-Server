#!/bin/bash

# Specify the output directory
output_directory="/Users/ch.sarun/Documents/MyCodes/Code/Projects/Inventory/server/src/dtos/"

# Array of asset types
asset_types=("AC" "Airpurifier" "Biometrix" "Desktop" "Keyboard" "Laptop" "Monitor" "Mouse" "Printer" "Projector" "Router" "TV" "Tab" "UPS")

# Loop through each asset type
for asset_type in "${asset_types[@]}"
do
  # Convert asset_type to lowercase
  asset_type_lowercase=$(echo "$asset_type" | tr '[:upper:]' '[:lower:]')

  # Create the file name
  file_name="${output_directory}/${asset_type_lowercase}.dto.ts"

  # Capitalize the first letter of the asset type
  asset_type_capitalized="$(tr '[:lower:]' '[:upper:]' <<< ${asset_type:0:1})${asset_type:1}"

  # Write content to the file
  cat <<EOL > "$file_name"
export interface INew${asset_type_capitalized}Request {
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

export const New${asset_type_capitalized}ResponseFields = {
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

export interface INew${asset_type_capitalized}Response {
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

export interface IUpdate${asset_type_capitalized}Request {
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

export const Update${asset_type_capitalized}ResponseFields = {
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

export interface IUpdate${asset_type_capitalized}Response {
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
EOL

  echo "Created $file_name"
done
