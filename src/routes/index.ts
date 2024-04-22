import express, { Request, Response } from "express";
import AuthRouter from "./auth.router";
import ACRouter from "./ac.router";
import AirPurifierRouter from "./airpurifier.router";
import BiometrixRouter from "./biometrix.router";
import DesktopRouter from "./desktop.router";
import KeyboardRouter from "./keyboard.router";
import LaptopRouter from "./laptop.router";
import MonitorRouter from "./monitor.router";
import MouseRouter from "./mouse.router";
import PrinterRouter from "./printer.router";
import ProjectorRouter from "./projector.router";
import RouterRouter from "./router.router";
import TabRouter from "./tab.router";
import TVRouter from "./tv.router";
import UPSRouter from "./ups.router";
import UserRouter from "./user.router";
import PurchaseRegisterRouter from "./purchase-register.router";
import { catchAsync } from "../utils/error.util";
import AssetsRouter from "./asset.router";
const router = express.Router();
router.get(
  "/",
  catchAsync(async (req: Request, res: Response) => {
    res.send("Hello, Inventory is running!");
  })
);
router.use("/auth", AuthRouter);
router.use("/ac", ACRouter);
router.use("/ups", UPSRouter);
router.use("/tab", TabRouter);
router.use("/airpurifier", AirPurifierRouter);
router.use("/biometrix", BiometrixRouter);
router.use("/printer", PrinterRouter);
router.use("/tv", TVRouter);
router.use("/monitor", MonitorRouter);
router.use("/laptop", LaptopRouter);
router.use("/mouse", MouseRouter);
router.use("/keyboard", KeyboardRouter);
router.use("/router", RouterRouter);
router.use("/projector", ProjectorRouter);
router.use("/desktop", DesktopRouter);
router.use("/assets", AssetsRouter);
router.use("/purchase-register", PurchaseRegisterRouter);
router.use("/user", UserRouter);
export default router;
