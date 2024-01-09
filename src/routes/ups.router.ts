import express, { Response, Request, Router } from 'express';
import httpStatus from 'http-status';

import { ErrorResponse, IResponseDto } from '../dtos';
import { catchAsync, ServerErrorException } from '../utils/error.util';
import { UPSController } from '../controllers/ups.controller';
import { authorizeUser } from '../middlewares';

const router = Router();

router
  .route('/')
  .get(
    authorizeUser([]),
    catchAsync(async (req: Request, res: Response) => {
      const upss = await new UPSController(req).getAllUPSs();
      res.status(httpStatus.OK).json(upss);
    })
  )
  .post(
    authorizeUser([]),
    catchAsync(async (req: Request, res: Response) => {
      const ups = await new UPSController(req).createUPS(req.body);
      res.status(httpStatus.CREATED).send(ups);
    })
  );

router
  .route('/:id')
  .get(
    authorizeUser([]),
    catchAsync(async (req: Request, res: Response) => {
      const ups = await new UPSController(req).getUPSById(
        req.params.id
      );
      res.status(httpStatus.OK).send(ups);
    })
  )
  .put(
    authorizeUser([]),
    catchAsync(async (req: Request, res: Response) => {
      const ups = await new UPSController(req).updateUPS(
        req.params.id,
        req.body
      );
      res.status(httpStatus.OK).send(ups);
    })
  )
  .delete(
    authorizeUser([]),
    catchAsync(async (req: Request, res: Response) => {
      const ups = await new UPSController(req).deleteUPS(
        req.params.id
      );
      res.status(httpStatus.OK).send(ups);
    })
  );

export default router;
