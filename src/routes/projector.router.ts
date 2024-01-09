import express, { Response, Request, Router } from 'express';
import httpStatus from 'http-status';

import { ErrorResponse, IResponseDto } from '../dtos';
import { catchAsync, ServerErrorException } from '../utils/error.util';
import { ProjectorController } from '../controllers/projector.controller';
import { authorizeUser } from '../middlewares';

const router = Router();

router
  .route('/')
  .get(
    authorizeUser([]),
    catchAsync(async (req: Request, res: Response) => {
      const projectors = await new ProjectorController(req).getAllProjectors();
      res.status(httpStatus.OK).json(projectors);
    })
  )
  .post(
    authorizeUser([]),
    catchAsync(async (req: Request, res: Response) => {
      const projector = await new ProjectorController(req).createProjector(req.body);
      res.status(httpStatus.CREATED).send(projector);
    })
  );

router
  .route('/:id')
  .get(
    authorizeUser([]),
    catchAsync(async (req: Request, res: Response) => {
      const projector = await new ProjectorController(req).getProjectorById(
        req.params.id
      );
      res.status(httpStatus.OK).send(projector);
    })
  )
  .put(
    authorizeUser([]),
    catchAsync(async (req: Request, res: Response) => {
      const projector = await new ProjectorController(req).updateProjector(
        req.params.id,
        req.body
      );
      res.status(httpStatus.OK).send(projector);
    })
  )
  .delete(
    authorizeUser([]),
    catchAsync(async (req: Request, res: Response) => {
      const projector = await new ProjectorController(req).deleteProjector(
        req.params.id
      );
      res.status(httpStatus.OK).send(projector);
    })
  );

export default router;
