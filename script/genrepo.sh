#!/bin/bash

# Specify the target directory
target_directory="/Users/ch.sarun/Documents/MyCodes/Code/Projects/Inventory/server/src/repositories/"

# Array of asset types
asset_types=("AC" "Airpurifier" "Biometrix" "Desktop" "Keyboard" "Laptop" "Monitor" "Mouse" "Printer" "Projector" "Router" "TV" "Tab" "UPS")

for asset_type in "${asset_types[@]}"
do
    # Convert asset_type to lowercase using tr
    asset_type_lower=$(echo "$asset_type" | tr '[:upper:]' '[:lower:]')

    repository_file="${target_directory}/${asset_type_lower}.repository.ts"
    cat <<EOL >"$repository_file"
import { NotFoundException } from '../utils';
import AppDataSource from '../configs/data-source';
import {
  INew${asset_type}Request,
  INew${asset_type}Response,
  IUpdate${asset_type}Request,
  IUpdate${asset_type}Response,
} from '../dtos';
import { User } from '../models';
import { ${asset_type} } from '../models';

export const create${asset_type} = async (
  payload: INew${asset_type}Request,
  reqUser: User
): Promise<INew${asset_type}Response> => {
  const ${asset_type_lower}Repository = AppDataSource.getRepository(${asset_type});
  const new${asset_type} = new ${asset_type}();
  return await ${asset_type_lower}Repository.save({
    ...new${asset_type},
    ...payload,
    created_by: reqUser.id,
    updated_by: reqUser.id,
    updatedbyname: reqUser.firstname,
    is_active: true,
    is_deleted: false,
  });
};

export const getAll${asset_type}s = async (): Promise<INew${asset_type}Response[]> => {
  const ${asset_type_lower}Repository = AppDataSource.getRepository(${asset_type});
  return await ${asset_type_lower}Repository.find({
    where: { is_deleted: false, is_active: true },
    order: { created_at: 'DESC' },
  });
};

export const get${asset_type}ById = async (
  id: string
): Promise<INew${asset_type}Response> => {
  const ${asset_type_lower}Repository = AppDataSource.getRepository(${asset_type});
  return await ${asset_type_lower}Repository.findOneOrFail({ where: { id: id } });
};

export const update${asset_type}ById = async (
  id: string,
  payload: IUpdate${asset_type}Request,
  reqUser: User
): Promise<IUpdate${asset_type}Response> => {
  const ${asset_type_lower}Repository = AppDataSource.getRepository(${asset_type});
  const ${asset_type_lower} = await ${asset_type_lower}Repository.findOneOrFail({ where: { id: id } });
  return await ${asset_type_lower}Repository.save({
    ...${asset_type_lower},
    ...payload,
    updated_by: reqUser.id,
    updatedbyname: reqUser.firstname,
  });
};

export const delete${asset_type}ById = async (
  id: string
): Promise<IUpdate${asset_type}Response> => {
  const ${asset_type_lower}Repository = AppDataSource.getRepository(${asset_type});
  const ${asset_type_lower} = await ${asset_type_lower}Repository.findOne({ where: { id: id } });
  if ( ! ${asset_type_lower} ){
      throw new NotFoundException("${asset_type} not found");
  }
  return await ${asset_type_lower}Repository.save({
    ...${asset_type_lower},
    is_active: false,
    is_deleted: true,
  });
};
EOL
done
