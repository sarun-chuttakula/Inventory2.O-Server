import express, { Response, Request, Router } from 'express';
import httpStatus from 'http-status';

import { ErrorResponse, IResponseDto } from '../dtos';
import { catchAsync, ServerErrorException } from '../utils/error.util';
import { KeyboardController } from '../controllers/keyboard.controller';
import { authorizeUser } from '../middlewares';

const router = Router();

router
  .route('/')
  .get(
    authorizeUser([]),
    catchAsync(async (req: Request, res: Response) => {
      const keyboards = await new KeyboardController(req).getAllKeyboards();
      res.status(httpStatus.OK).json(keyboards);
    })
  )
  .post(
    authorizeUser([]),
    catchAsync(async (req: Request, res: Response) => {
      const keyboard = await new KeyboardController(req).createKeyboard(req.body);
      res.status(httpStatus.CREATED).send(keyboard);
    })
  );

router
  .route('/:id')
  .get(
    authorizeUser([]),
    catchAsync(async (req: Request, res: Response) => {
      const keyboard = await new KeyboardController(req).getKeyboardById(
        req.params.id
      );
      res.status(httpStatus.OK).send(keyboard);
    })
  )
  .put(
    authorizeUser([]),
    catchAsync(async (req: Request, res: Response) => {
      const keyboard = await new KeyboardController(req).updateKeyboard(
        req.params.id,
        req.body
      );
      res.status(httpStatus.OK).send(keyboard);
    })
  )
  .delete(
    authorizeUser([]),
    catchAsync(async (req: Request, res: Response) => {
      const keyboard = await new KeyboardController(req).deleteKeyboard(
        req.params.id
      );
      res.status(httpStatus.OK).send(keyboard);
    })
  );

export default router;
