import express, { Response, Request, Router } from 'express';
import httpStatus from 'http-status';

import { ErrorResponse, IResponseDto } from '../dtos';
import { catchAsync, ServerErrorException } from '../utils/error.util';
import { ACController } from '../controllers/ac.controller';
import { authorizeUser } from '../middlewares';

const router = Router();

router
  .route('/')
  .get(
    authorizeUser([]),
    catchAsync(async (req: Request, res: Response) => {
      const acs = await new ACController(req).getAllACs();
      res.status(httpStatus.OK).json(acs);
    })
  )
  .post(
    authorizeUser([]),
    catchAsync(async (req: Request, res: Response) => {
      const ac = await new ACController(req).createAC(req.body);
      res.status(httpStatus.CREATED).send(ac);
    })
  );

router
  .route('/:id')
  .get(
    authorizeUser([]),
    catchAsync(async (req: Request, res: Response) => {
      const ac = await new ACController(req).getACById(
        req.params.id
      );
      res.status(httpStatus.OK).send(ac);
    })
  )
  .put(
    authorizeUser([]),
    catchAsync(async (req: Request, res: Response) => {
      const ac = await new ACController(req).updateAC(
        req.params.id,
        req.body
      );
      res.status(httpStatus.OK).send(ac);
    })
  )
  .delete(
    authorizeUser([]),
    catchAsync(async (req: Request, res: Response) => {
      const ac = await new ACController(req).deleteAC(
        req.params.id
      );
      res.status(httpStatus.OK).send(ac);
    })
  );

export default router;
