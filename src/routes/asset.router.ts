import express, { Response, Request, Router } from "express";
import httpStatus from "http-status";

import { ErrorResponse, IResponseDto } from "../dtos";
import { catchAsync, ServerErrorException } from "../utils/error.util";
import { DesktopController } from "../controllers/desktop.controller";
import { authorizeUser } from "../middlewares";
import { AssetsController } from "../controllers/asset.controller";

const router = Router();

router.route("/").get(
  authorizeUser([]),
  catchAsync(async (req: Request, res: Response) => {
    const asset_type = req.query.asset_type as string;
    const page = req.query.page as string;
    const desktops = await new AssetsController(req).getAllAssets(
      asset_type,
      page
    );
    res.status(httpStatus.OK).json(desktops);
  })
);

export default router;
