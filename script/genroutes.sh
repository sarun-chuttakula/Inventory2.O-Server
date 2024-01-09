#!/bin/bash

# Specify the target directory
target_directory="/Users/ch.sarun/Documents/MyCodes/Code/Projects/Inventory/server/src/routes/"

# Array of asset types
asset_types=("AC" "Airpurifier" "Biometrix" "Desktop" "Keyboard" "Laptop" "Monitor" "Mouse" "Printer" "Projector" "Router" "TV" "Tab" "UPS")

for asset_type in "${asset_types[@]}"
do
    # Convert asset_type to lowercase using tr
    asset_type_lower=$(echo "$asset_type" | tr '[:upper:]' '[:lower:]')

    route_file="${target_directory}/${asset_type_lower}.route.ts"
    cat <<EOL >"$route_file"
import express, { Response, Request, Router } from 'express';
import httpStatus from 'http-status';

import { ErrorResponse, IResponseDto } from '../dtos';
import { catchAsync, ServerErrorException } from '../utils/error.util';
import { ${asset_type}Controller } from '../controllers/${asset_type_lower}.controller';
import { authorizeUser } from '../middlewares';

const router = Router();

router
  .route('/')
  .get(
    authorizeUser([]),
    catchAsync(async (req: Request, res: Response) => {
      const ${asset_type_lower}s = await new ${asset_type}Controller(req).getAll${asset_type}s();
      res.status(httpStatus.OK).json(${asset_type_lower}s);
    })
  )
  .post(
    authorizeUser([]),
    catchAsync(async (req: Request, res: Response) => {
      const ${asset_type_lower} = await new ${asset_type}Controller(req).create${asset_type}(req.body);
      res.status(httpStatus.CREATED).send(${asset_type_lower});
    })
  );

router
  .route('/:id')
  .get(
    authorizeUser([]),
    catchAsync(async (req: Request, res: Response) => {
      const ${asset_type_lower} = await new ${asset_type}Controller(req).get${asset_type}ById(
        req.params.id
      );
      res.status(httpStatus.OK).send(${asset_type_lower});
    })
  )
  .put(
    authorizeUser([]),
    catchAsync(async (req: Request, res: Response) => {
      const ${asset_type_lower} = await new ${asset_type}Controller(req).update${asset_type}(
        req.params.id,
        req.body
      );
      res.status(httpStatus.OK).send(${asset_type_lower});
    })
  )
  .delete(
    authorizeUser([]),
    catchAsync(async (req: Request, res: Response) => {
      const ${asset_type_lower} = await new ${asset_type}Controller(req).delete${asset_type}(
        req.params.id
      );
      res.status(httpStatus.OK).send(${asset_type_lower});
    })
  );

export default router;
EOL
done
