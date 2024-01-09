import express, { Response, Request, Router } from 'express';
import httpStatus from 'http-status';

import { ErrorResponse, IResponseDto } from '../dtos';
import { catchAsync, ServerErrorException } from '../utils/error.util';
import { LaptopController } from '../controllers/laptop.controller';
import { authorizeUser } from '../middlewares';

const router = Router();

router
  .route('/')
  .get(
    authorizeUser([]),
    catchAsync(async (req: Request, res: Response) => {
      const laptops = await new LaptopController(req).getAllLaptops();
      res.status(httpStatus.OK).json(laptops);
    })
  )
  .post(
    authorizeUser([]),
    catchAsync(async (req: Request, res: Response) => {
      const laptop = await new LaptopController(req).createLaptop(req.body);
      res.status(httpStatus.CREATED).send(laptop);
    })
  );

router
  .route('/:id')
  .get(
    authorizeUser([]),
    catchAsync(async (req: Request, res: Response) => {
      const laptop = await new LaptopController(req).getLaptopById(
        req.params.id
      );
      res.status(httpStatus.OK).send(laptop);
    })
  )
  .put(
    authorizeUser([]),
    catchAsync(async (req: Request, res: Response) => {
      const laptop = await new LaptopController(req).updateLaptop(
        req.params.id,
        req.body
      );
      res.status(httpStatus.OK).send(laptop);
    })
  )
  .delete(
    authorizeUser([]),
    catchAsync(async (req: Request, res: Response) => {
      const laptop = await new LaptopController(req).deleteLaptop(
        req.params.id
      );
      res.status(httpStatus.OK).send(laptop);
    })
  );

export default router;
