import express, { Response, Request, Router } from "express";
import httpStatus from "http-status";

import { ErrorResponse, IResponseDto } from "../dtos";
import { catchAsync, ServerErrorException } from "../utils/error.util";
import { authorizeUser } from "../middlewares";
import { Role } from "../enums";
import { IDCardController } from "../controllers/id-card.controller";

const router = Router();

router
  .route("/")
  .get(
    authorizeUser([
      Role.superadmin,
      Role.admin,
      Role.user,
      Role.editor,
      Role.tester,
    ]),
    catchAsync(async (req: Request, res: Response) => {
      const idcards = await new IDCardController(req).getAllIDCards();
      res.status(httpStatus.OK).json(idcards);
    })
  )
  .post(
    authorizeUser([
      Role.superadmin,
      Role.admin,
      Role.user,
      Role.editor,
      Role.tester,
    ]),
    catchAsync(async (req: Request, res: Response) => {
      const idcard = await new IDCardController(req).createIDCard(req.body);
      res.status(httpStatus.CREATED).send(idcard);
    })
  );

router
  .route("/:id")
  .get(
    authorizeUser([]),
    catchAsync(async (req: Request, res: Response) => {
      const idcard = await new IDCardController(req).getIDCardById(
        req.params.id
      );
      res.status(httpStatus.OK).send(idcard);
    })
  )
  .put(
    authorizeUser([]),
    catchAsync(async (req: Request, res: Response) => {
      const idcard = await new IDCardController(req).updateIDCardById(
        req.params.id,
        req.body
      );
      res.status(httpStatus.OK).send(idcard);
    })
  )
  .delete(
    authorizeUser([]),
    catchAsync(async (req: Request, res: Response) => {
      const idcard = await new IDCardController(req).deleteIDCardById(
        req.params.id
      );
      res.status(httpStatus.OK).send(idcard);
    })
  );

export default router;
