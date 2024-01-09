import express, { Response, Request, Router } from 'express';
import httpStatus from 'http-status';

import { ErrorResponse, IResponseDto } from '../dtos';
import { catchAsync, ServerErrorException } from '../utils/error.util';
import { PrinterController } from '../controllers/printer.controller';
import { authorizeUser } from '../middlewares';

const router = Router();

router
  .route('/')
  .get(
    authorizeUser([]),
    catchAsync(async (req: Request, res: Response) => {
      const printers = await new PrinterController(req).getAllPrinters();
      res.status(httpStatus.OK).json(printers);
    })
  )
  .post(
    authorizeUser([]),
    catchAsync(async (req: Request, res: Response) => {
      const printer = await new PrinterController(req).createPrinter(req.body);
      res.status(httpStatus.CREATED).send(printer);
    })
  );

router
  .route('/:id')
  .get(
    authorizeUser([]),
    catchAsync(async (req: Request, res: Response) => {
      const printer = await new PrinterController(req).getPrinterById(
        req.params.id
      );
      res.status(httpStatus.OK).send(printer);
    })
  )
  .put(
    authorizeUser([]),
    catchAsync(async (req: Request, res: Response) => {
      const printer = await new PrinterController(req).updatePrinter(
        req.params.id,
        req.body
      );
      res.status(httpStatus.OK).send(printer);
    })
  )
  .delete(
    authorizeUser([]),
    catchAsync(async (req: Request, res: Response) => {
      const printer = await new PrinterController(req).deletePrinter(
        req.params.id
      );
      res.status(httpStatus.OK).send(printer);
    })
  );

export default router;
