import express, { Response, Request, Router } from 'express';
import httpStatus from 'http-status';

import { ErrorResponse, IResponseDto } from '../dtos';
import { catchAsync, ServerErrorException } from '../utils/error.util';
import { AirpurifierController } from '../controllers/airpurifier.controller';
import { authorizeUser } from '../middlewares';

const router = Router();

router
  .route('/')
  .get(
    authorizeUser([]),
    catchAsync(async (req: Request, res: Response) => {
      const airpurifiers = await new AirpurifierController(req).getAllAirpurifiers();
      res.status(httpStatus.OK).json(airpurifiers);
    })
  )
  .post(
    authorizeUser([]),
    catchAsync(async (req: Request, res: Response) => {
      const airpurifier = await new AirpurifierController(req).createAirpurifier(req.body);
      res.status(httpStatus.CREATED).send(airpurifier);
    })
  );

router
  .route('/:id')
  .get(
    authorizeUser([]),
    catchAsync(async (req: Request, res: Response) => {
      const airpurifier = await new AirpurifierController(req).getAirpurifierById(
        req.params.id
      );
      res.status(httpStatus.OK).send(airpurifier);
    })
  )
  .put(
    authorizeUser([]),
    catchAsync(async (req: Request, res: Response) => {
      const airpurifier = await new AirpurifierController(req).updateAirpurifier(
        req.params.id,
        req.body
      );
      res.status(httpStatus.OK).send(airpurifier);
    })
  )
  .delete(
    authorizeUser([]),
    catchAsync(async (req: Request, res: Response) => {
      const airpurifier = await new AirpurifierController(req).deleteAirpurifier(
        req.params.id
      );
      res.status(httpStatus.OK).send(airpurifier);
    })
  );

export default router;
