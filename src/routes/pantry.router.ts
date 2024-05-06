import express, { Response, Request, Router } from 'express';
import httpStatus from 'http-status';

import { ErrorResponse, IResponseDto } from '../dtos';
import { catchAsync, ServerErrorException } from '../utils/error.util';
import { PantryController } from '../controllers/pantry.controller';
import { authorizeUser } from '../middlewares';

const router = Router();

router
  .route('/')
  .get(
    authorizeUser([]),
    catchAsync(async (req: Request, res: Response) => {
      const pantrys = await new PantryController(req).getAllPantrys();
      res.status(httpStatus.OK).json(pantrys);
    })
  )
  .post(
    authorizeUser([]),
    catchAsync(async (req: Request, res: Response) => {
      const pantry = await new PantryController(req).createPantry(req.body);
      res.status(httpStatus.CREATED).send(pantry);
    })
  );

router
  .route('/:id')
  .get(
    authorizeUser([]),
    catchAsync(async (req: Request, res: Response) => {
      const pantry = await new PantryController(req).getPantryById(
        req.params.id
      );
      res.status(httpStatus.OK).send(pantry);
    })
  )
  .put(
    authorizeUser([]),
    catchAsync(async (req: Request, res: Response) => {
      const pantry = await new PantryController(req).updatePantry(
        req.params.id,
        req.body
      );
      res.status(httpStatus.OK).send(pantry);
    })
  )
  .delete(
    authorizeUser([]),
    catchAsync(async (req: Request, res: Response) => {
      const pantry = await new PantryController(req).deletePantry(
        req.params.id
      );
      res.status(httpStatus.OK).send(pantry);
    })
  );

export default router;
