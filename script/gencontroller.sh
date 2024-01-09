#!/bin/bash

# Specify the target directory
target_directory="/Users/ch.sarun/Documents/MyCodes/Code/Projects/Inventory/server/src/controllers/"

# Array of asset types
asset_types=("AC" "Airpurifier" "Biometrix" "Desktop" "Keyboard" "Laptop" "Monitor" "Mouse" "Printer" "Projector" "Router" "TV" "Tab" "UPS")

for asset_type in "${asset_types[@]}"
do
    # Convert asset_type to lowercase using tr
    asset_type_lower=$(echo "$asset_type" | tr '[:upper:]' '[:lower:]')

    controller_file="${target_directory}/${asset_type_lower}.controller.ts"
    cat <<EOL >"$controller_file"
import {
  Get,
  Route,
  Tags,
  Post,
  Body,
  Path,
  Put,
  Delete,
  Security,
  Query,
} from 'tsoa';
import {
  ApiResponse,
  INew${asset_type}Request,
  INew${asset_type}Response,
  IResponseDto,
} from '../dtos';
import { Request } from 'express';
import mask from '../utils/mask.util';
import { NotFoundException, UnauthorizedException } from '../utils/error.util';
import {
  create${asset_type},
  delete${asset_type}ById,
  getAll${asset_type}s,
  get${asset_type}ById,
  update${asset_type}ById,
} from '../repositories/${asset_type_lower}.repository';
import { Not } from 'typeorm';

@Route("${asset_type_lower}")
@Tags("${asset_type}")
@Security("api_key")
export class ${asset_type}Controller {
  constructor(private req: Request) {}

  @Get("/")
  public async getAll${asset_type}s(): Promise<IResponseDto> {
    const ${asset_type_lower}s = await getAll${asset_type}s();
    return new ApiResponse(true, ${asset_type_lower}s, "All ${asset_type_lower}s fetched successfully");
  }

  @Get("/:id")
  public async get${asset_type}ById(@Path() id: string): Promise<IResponseDto> {
    const ${asset_type_lower} = await get${asset_type}ById(id);
    return new ApiResponse(true, ${asset_type_lower}, "${asset_type} fetched successfully");
  }

  @Post("/")
  public async create${asset_type}(
    @Body() body: INew${asset_type}Request
  ): Promise<IResponseDto<INew${asset_type}Response>> {
    if (!this.req.user) throw new UnauthorizedException();
    const ${asset_type_lower} = await create${asset_type}(body, this.req.user);
    return new ApiResponse(true, ${asset_type_lower}, "${asset_type} created successfully");
  }

  @Put("/:id")
  public async update${asset_type}(
    @Path() id: string,
    @Body() body: INew${asset_type}Request
  ): Promise<IResponseDto> {
    if (!this.req.user) throw new UnauthorizedException();
    const ${asset_type_lower} = await update${asset_type}ById(id, body, this.req.user);
    return new ApiResponse(true, ${asset_type_lower}, "${asset_type} updated successfully");
  }

  @Delete("/:id")
  public async delete${asset_type}(@Path() id: string): Promise<IResponseDto> {
    if (!this.req.user) throw new UnauthorizedException();
    const ${asset_type_lower} = await delete${asset_type}ById(id);
    return new ApiResponse(true, ${asset_type_lower}, "${asset_type} deleted successfully");
  }
}
EOL
done
