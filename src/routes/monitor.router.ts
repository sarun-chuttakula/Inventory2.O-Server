import express, { Response, Request, Router } from 'express';
import httpStatus from 'http-status';

import { ErrorResponse, IResponseDto } from '../dtos';
import { catchAsync, ServerErrorException } from '../utils/error.util';
import { MonitorController } from '../controllers/monitor.controller';
import { authorizeUser } from '../middlewares';

const router = Router();

router
  .route('/')
  .get(
    authorizeUser([]),
    catchAsync(async (req: Request, res: Response) => {
      const monitors = await new MonitorController(req).getAllMonitors();
      res.status(httpStatus.OK).json(monitors);
    })
  )
  .post(
    authorizeUser([]),
    catchAsync(async (req: Request, res: Response) => {
      const monitor = await new MonitorController(req).createMonitor(req.body);
      res.status(httpStatus.CREATED).send(monitor);
    })
  );

router
  .route('/:id')
  .get(
    authorizeUser([]),
    catchAsync(async (req: Request, res: Response) => {
      const monitor = await new MonitorController(req).getMonitorById(
        req.params.id
      );
      res.status(httpStatus.OK).send(monitor);
    })
  )
  .put(
    authorizeUser([]),
    catchAsync(async (req: Request, res: Response) => {
      const monitor = await new MonitorController(req).updateMonitor(
        req.params.id,
        req.body
      );
      res.status(httpStatus.OK).send(monitor);
    })
  )
  .delete(
    authorizeUser([]),
    catchAsync(async (req: Request, res: Response) => {
      const monitor = await new MonitorController(req).deleteMonitor(
        req.params.id
      );
      res.status(httpStatus.OK).send(monitor);
    })
  );

export default router;
