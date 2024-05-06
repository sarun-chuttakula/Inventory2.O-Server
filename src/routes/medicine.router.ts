import express, { Response, Request, Router } from 'express';
import httpStatus from 'http-status';

import { ErrorResponse, IResponseDto } from '../dtos';
import { catchAsync, ServerErrorException } from '../utils/error.util';
import { MedicineController } from '../controllers/medicine.controller';
import { authorizeUser } from '../middlewares';

const router = Router();

router
  .route('/')
  .get(
    authorizeUser([]),
    catchAsync(async (req: Request, res: Response) => {
      const medicines = await new MedicineController(req).getAllMedicines();
      res.status(httpStatus.OK).json(medicines);
    })
  )
  .post(
    authorizeUser([]),
    catchAsync(async (req: Request, res: Response) => {
      const medicine = await new MedicineController(req).createMedicine(req.body);
      res.status(httpStatus.CREATED).send(medicine);
    })
  );

router
  .route('/:id')
  .get(
    authorizeUser([]),
    catchAsync(async (req: Request, res: Response) => {
      const medicine = await new MedicineController(req).getMedicineById(
        req.params.id
      );
      res.status(httpStatus.OK).send(medicine);
    })
  )
  .put(
    authorizeUser([]),
    catchAsync(async (req: Request, res: Response) => {
      const medicine = await new MedicineController(req).updateMedicine(
        req.params.id,
        req.body
      );
      res.status(httpStatus.OK).send(medicine);
    })
  )
  .delete(
    authorizeUser([]),
    catchAsync(async (req: Request, res: Response) => {
      const medicine = await new MedicineController(req).deleteMedicine(
        req.params.id
      );
      res.status(httpStatus.OK).send(medicine);
    })
  );

export default router;
