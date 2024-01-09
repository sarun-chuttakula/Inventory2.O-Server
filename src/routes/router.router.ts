import express, { Response, Request, Router } from 'express';
import httpStatus from 'http-status';

import { ErrorResponse, IResponseDto } from '../dtos';
import { catchAsync, ServerErrorException } from '../utils/error.util';
import { RouterController } from '../controllers/router.controller';
import { authorizeUser } from '../middlewares';

const router = Router();

router
  .route('/')
  .get(
    authorizeUser([]),
    catchAsync(async (req: Request, res: Response) => {
      const routers = await new RouterController(req).getAllRouters();
      res.status(httpStatus.OK).json(routers);
    })
  )
  .post(
    authorizeUser([]),
    catchAsync(async (req: Request, res: Response) => {
      const router = await new RouterController(req).createRouter(req.body);
      res.status(httpStatus.CREATED).send(router);
    })
  );

router
  .route('/:id')
  .get(
    authorizeUser([]),
    catchAsync(async (req: Request, res: Response) => {
      const router = await new RouterController(req).getRouterById(
        req.params.id
      );
      res.status(httpStatus.OK).send(router);
    })
  )
  .put(
    authorizeUser([]),
    catchAsync(async (req: Request, res: Response) => {
      const router = await new RouterController(req).updateRouter(
        req.params.id,
        req.body
      );
      res.status(httpStatus.OK).send(router);
    })
  )
  .delete(
    authorizeUser([]),
    catchAsync(async (req: Request, res: Response) => {
      const router = await new RouterController(req).deleteRouter(
        req.params.id
      );
      res.status(httpStatus.OK).send(router);
    })
  );

export default router;
