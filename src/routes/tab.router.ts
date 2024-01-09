import express, { Response, Request, Router } from 'express';
import httpStatus from 'http-status';

import { ErrorResponse, IResponseDto } from '../dtos';
import { catchAsync, ServerErrorException } from '../utils/error.util';
import { TabController } from '../controllers/tab.controller';
import { authorizeUser } from '../middlewares';

const router = Router();

router
  .route('/')
  .get(
    authorizeUser([]),
    catchAsync(async (req: Request, res: Response) => {
      const tabs = await new TabController(req).getAllTabs();
      res.status(httpStatus.OK).json(tabs);
    })
  )
  .post(
    authorizeUser([]),
    catchAsync(async (req: Request, res: Response) => {
      const tab = await new TabController(req).createTab(req.body);
      res.status(httpStatus.CREATED).send(tab);
    })
  );

router
  .route('/:id')
  .get(
    authorizeUser([]),
    catchAsync(async (req: Request, res: Response) => {
      const tab = await new TabController(req).getTabById(
        req.params.id
      );
      res.status(httpStatus.OK).send(tab);
    })
  )
  .put(
    authorizeUser([]),
    catchAsync(async (req: Request, res: Response) => {
      const tab = await new TabController(req).updateTab(
        req.params.id,
        req.body
      );
      res.status(httpStatus.OK).send(tab);
    })
  )
  .delete(
    authorizeUser([]),
    catchAsync(async (req: Request, res: Response) => {
      const tab = await new TabController(req).deleteTab(
        req.params.id
      );
      res.status(httpStatus.OK).send(tab);
    })
  );

export default router;
