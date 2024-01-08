import express, { Response, Request, Router } from "express";
import httpStatus from "http-status";

import { ErrorResponse, IResponseDto } from "../dtos";
import { catchAsync, ServerErrorException } from "../utils/error.util";
import { DesktopController } from "../controllers/desktop.controller";
import { authorizeUser } from "../middlewares";

const router = Router();

router
  .route("/")
  .get(
    authorizeUser([]),
    catchAsync(async (req: Request, res: Response) => {
      const desktops = await new DesktopController(req).getAllDesktops();
      const response: IResponseDto = {
        success: true,
        data: desktops,
        message: "All desktops fetched successfully",
      };
    })
  )
  .post(
    authorizeUser([]),
    catchAsync(async (req: Request, res: Response) => {
      const desktop = await new DesktopController(req).createDesktop(req.body);
      const response: IResponseDto = {
        success: true,
        data: desktop,
        message: "Desktop created successfully",
      };
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
      const response: IResponseDto = {
        success: true,
        data: desktop,
        message: "Desktop fetched successfully",
      };
    })
  )
  .put(
    authorizeUser([]),
    catchAsync(async (req: Request, res: Response) => {
      const desktop = await new DesktopController(req).updateDesktop(
        req.params.id,
        req.body
      );
      const response: IResponseDto = {
        success: true,
        data: desktop,
        message: "Desktop updated successfully",
      };
    })
  )
  .delete(
    authorizeUser([]),
    catchAsync(async (req: Request, res: Response) => {
      const desktop = await new DesktopController(req).deleteDesktop(
        req.params.id
      );
      const response: IResponseDto = {
        success: true,
        data: desktop,
        message: "Desktop deleted successfully",
      };
    })
  );

export default router;
