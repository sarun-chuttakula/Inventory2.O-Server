import express, { Response, Request, Router } from 'express';
import httpStatus from 'http-status';

import { ErrorResponse, IResponseDto } from '../dtos';
import { catchAsync, ServerErrorException } from '../utils/error.util';
import { TVController } from '../controllers/tv.controller';
import { authorizeUser } from '../middlewares';

const router = Router();

router
  .route('/')
  .get(
    authorizeUser([]),
    catchAsync(async (req: Request, res: Response) => {
      const tvs = await new TVController(req).getAllTVs();
      res.status(httpStatus.OK).json(tvs);
    })
  )
  .post(
    authorizeUser([]),
    catchAsync(async (req: Request, res: Response) => {
      const tv = await new TVController(req).createTV(req.body);
      res.status(httpStatus.CREATED).send(tv);
    })
  );

router
  .route('/:id')
  .get(
    authorizeUser([]),
    catchAsync(async (req: Request, res: Response) => {
      const tv = await new TVController(req).getTVById(
        req.params.id
      );
      res.status(httpStatus.OK).send(tv);
    })
  )
  .put(
    authorizeUser([]),
    catchAsync(async (req: Request, res: Response) => {
      const tv = await new TVController(req).updateTV(
        req.params.id,
        req.body
      );
      res.status(httpStatus.OK).send(tv);
    })
  )
  .delete(
    authorizeUser([]),
    catchAsync(async (req: Request, res: Response) => {
      const tv = await new TVController(req).deleteTV(
        req.params.id
      );
      res.status(httpStatus.OK).send(tv);
    })
  );

export default router;
