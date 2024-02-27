import express, { Response, Request, Router } from "express";
import httpStatus from "http-status";

import { ErrorResponse, IResponseDto } from "../dtos";
import { catchAsync, ServerErrorException } from "../utils/error.util";
import { DesktopController } from "../controllers/desktop.controller";
import { authorizeUser } from "../middlewares";
import { Role } from "../enums";

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
      const desktops = await new DesktopController(req).getAllDesktops();
      res.status(httpStatus.OK).json(desktops);
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
      const desktop = await new DesktopController(req).createDesktop(req.body);
      res.status(httpStatus.CREATED).send(desktop);
    })
  );

router
  .route("/:id")
  .get(
    authorizeUser([]),
    catchAsync(async (req: Request, res: Response) => {
      const desktop = await new DesktopController(req).getDesktopById(
        req.params.id
      );
      res.status(httpStatus.OK).send(desktop);
    })
  )
  .put(
    authorizeUser([]),
    catchAsync(async (req: Request, res: Response) => {
      const desktop = await new DesktopController(req).updateDesktop(
        req.params.id,
        req.body
      );
      res.status(httpStatus.OK).send(desktop);
    })
  )
  .delete(
    authorizeUser([]),
    catchAsync(async (req: Request, res: Response) => {
      const desktop = await new DesktopController(req).deleteDesktop(
        req.params.id
      );
      res.status(httpStatus.OK).send(desktop);
    })
  );

export default router;
