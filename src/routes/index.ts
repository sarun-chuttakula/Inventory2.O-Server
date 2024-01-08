import express, { Request, Response } from "express";
import AuthRouter from "./auth.router";
import DesktopRouter from "./desktop.router";
import { catchAsync } from "../utils/error.util";

const router = express.Router();
router.get(
  "/",
  catchAsync(async (req: Request, res: Response) => {
    res.send("Hello, TypeScript!");
  })
);
router.use("/auth", AuthRouter);
router.use("/desktop", DesktopRouter);
export default router;
