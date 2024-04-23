#!/bin/bash

# Specify the output directory
output_directory="/Users/ch.sarun/Documents/MyCodes/Code/Projects/Inventory/server/src/models"

# Array of asset types
asset_types=("AC" "Airpurifier" "Biometrix" "Desktop" "Keyboard" "Laptop" "Monitor" "Mouse" "Printer" "Projector" "Router" "TV" "Tab" "UPS")

# Loop through each asset type
for asset_type in "${asset_types[@]}"
do
  # Convert asset_type to lowercase
  asset_type_lowercase=$(echo "$asset_type" | tr '[:upper:]' '[:lower:]')

  # Create the file name
  file_name="${output_directory}/${asset_type_lowercase}.model.ts"

  # Capitalize the first letter of the asset type
  asset_type_capitalized="$(tr '[:lower:]' '[:upper:]' <<< ${asset_type:0:1})${asset_type:1}"

  # Write content to the file
  cat <<EOL > "$file_name"
import { Entity, Column } from "typeorm";
import { BaseEntityModel } from "./base.model";

@Entity()
export class $asset_type_capitalized extends BaseEntityModel {
  @Column({ nullable: false })
  make!: string;

  @Column({ nullable: false })
  city!: string;

  @Column({ nullable: false })
  model!: string;

  @Column({ nullable: false })
  tagid!: string;

  @Column({ nullable: false })
  hodtag!: string;

  @Column({ nullable: false })
  location!: string;

  @Column({ nullable: false, unique: true })
  serialnumber!: string;

  @Column({ nullable: true })
  macid_lan!: string;

  @Column({ nullable: true })
  macid_wifi!: string;

  @Column({ nullable: false })
  processor!: string;

  @Column({ nullable: false })
  generation!: string;

  @Column({ nullable: false })
  os!: string;

  @Column({ nullable: false })
  oskey!: string;

  @Column({ nullable: false })
  hostname!: string;

  @Column({ nullable: false })
  ram!: string;

  @Column({ nullable: false })
  storage!: string;

  @Column({ nullable: false })
  graphics!: string;

  @Column({ nullable: false })
  user!: string;

  @Column({ nullable: false })
  status!: string;

  @Column({ nullable: false })
  remarks!: string;

  
}
EOL

  echo "Created $file_name"
done
