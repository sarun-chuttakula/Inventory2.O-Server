import express, { Response, Request, Router } from 'express';
import httpStatus from 'http-status';

import { ErrorResponse, IResponseDto } from '../dtos';
import { catchAsync, ServerErrorException } from '../utils/error.util';
import { MouseController } from '../controllers/mouse.controller';
import { authorizeUser } from '../middlewares';

const router = Router();

router
  .route('/')
  .get(
    authorizeUser([]),
    catchAsync(async (req: Request, res: Response) => {
      const mouses = await new MouseController(req).getAllMouses();
      res.status(httpStatus.OK).json(mouses);
    })
  )
  .post(
    authorizeUser([]),
    catchAsync(async (req: Request, res: Response) => {
      const mouse = await new MouseController(req).createMouse(req.body);
      res.status(httpStatus.CREATED).send(mouse);
    })
  );

router
  .route('/:id')
  .get(
    authorizeUser([]),
    catchAsync(async (req: Request, res: Response) => {
      const mouse = await new MouseController(req).getMouseById(
        req.params.id
      );
      res.status(httpStatus.OK).send(mouse);
    })
  )
  .put(
    authorizeUser([]),
    catchAsync(async (req: Request, res: Response) => {
      const mouse = await new MouseController(req).updateMouse(
        req.params.id,
        req.body
      );
      res.status(httpStatus.OK).send(mouse);
    })
  )
  .delete(
    authorizeUser([]),
    catchAsync(async (req: Request, res: Response) => {
      const mouse = await new MouseController(req).deleteMouse(
        req.params.id
      );
      res.status(httpStatus.OK).send(mouse);
    })
  );

export default router;
