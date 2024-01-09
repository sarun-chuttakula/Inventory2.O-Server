import express, { Response, Request, Router } from 'express';
import httpStatus from 'http-status';

import { ErrorResponse, IResponseDto } from '../dtos';
import { catchAsync, ServerErrorException } from '../utils/error.util';
import { BiometrixController } from '../controllers/biometrix.controller';
import { authorizeUser } from '../middlewares';

const router = Router();

router
  .route('/')
  .get(
    authorizeUser([]),
    catchAsync(async (req: Request, res: Response) => {
      const biometrixs = await new BiometrixController(req).getAllBiometrixs();
      res.status(httpStatus.OK).json(biometrixs);
    })
  )
  .post(
    authorizeUser([]),
    catchAsync(async (req: Request, res: Response) => {
      const biometrix = await new BiometrixController(req).createBiometrix(req.body);
      res.status(httpStatus.CREATED).send(biometrix);
    })
  );

router
  .route('/:id')
  .get(
    authorizeUser([]),
    catchAsync(async (req: Request, res: Response) => {
      const biometrix = await new BiometrixController(req).getBiometrixById(
        req.params.id
      );
      res.status(httpStatus.OK).send(biometrix);
    })
  )
  .put(
    authorizeUser([]),
    catchAsync(async (req: Request, res: Response) => {
      const biometrix = await new BiometrixController(req).updateBiometrix(
        req.params.id,
        req.body
      );
      res.status(httpStatus.OK).send(biometrix);
    })
  )
  .delete(
    authorizeUser([]),
    catchAsync(async (req: Request, res: Response) => {
      const biometrix = await new BiometrixController(req).deleteBiometrix(
        req.params.id
      );
      res.status(httpStatus.OK).send(biometrix);
    })
  );

export default router;
