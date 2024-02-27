import express, { Response, Request, Router } from "express";
import httpStatus from "http-status";

import { ErrorResponse, IResponseDto } from "../dtos";
import { catchAsync, ServerErrorException } from "../utils/error.util";
import { ProjectorController } from "../controllers/projector.controller";
import { authorizeUser } from "../middlewares";
import { Role } from "../enums";
import { PurchaseRegisterController } from "../controllers/purchase-register.controller";
import { generateCapex } from "../repositories/purchase-register.repository";

const router = Router();

router
  .route("/")
  .get(
    authorizeUser([Role.user]),
    catchAsync(async (req: Request, res: Response) => {
      const purchaseRegister = await new PurchaseRegisterController(
        req
      ).getAllPurchaseRegister();
      res.status(httpStatus.OK).json(purchaseRegister);
    })
  )
  .post(
    authorizeUser([Role.user, Role.superadmin]),
    catchAsync(async (req: Request, res: Response) => {
      const purchaseRegister = await new PurchaseRegisterController(
        req
      ).createPurchaseRegister(req.body);
      res.status(httpStatus.CREATED).send(purchaseRegister);
    })
  );

router.get("/generateCapex", generateCapex);

export default router;
