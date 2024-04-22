import express, { Request, Response, Router } from "express";
import httpStatus from "http-status";
import { ErrorResponse, IResponseDto } from "../dtos";
import { catchAsync, ServerErrorException } from "../utils/error.util";
import { UserController } from "../controllers/user.controller";
import { authorizeUser } from "../middlewares";

const router = Router();

router
  .route("/")
  .get(
    authorizeUser([]),
    catchAsync(async (req: Request, res: Response) => {
      const users = await new UserController(req).getAllUsers();
      res.status(httpStatus.OK).json(users);
    })
  )
  .post(
    // authorizeUser([]),
    catchAsync(async (req: Request, res: Response) => {
      const user = await new UserController(req).createUser(req.body);
      res.status(httpStatus.CREATED).json(user);
    })
  );

router
  .route("/:id")
  .get(
    authorizeUser([]),
    catchAsync(async (req: Request, res: Response) => {
      const user = await new UserController(req).getUserById(req.params.id);
      res.status(httpStatus.OK).json(user);
    })
  )
  .put(
    authorizeUser([]),
    catchAsync(async (req: Request, res: Response) => {
      const user = await new UserController(req).updateUser(
        req.params.id,
        req.body
      );
      res.status(httpStatus.OK).json(user);
    })
  )
  .delete(
    authorizeUser([]),
    catchAsync(async (req: Request, res: Response) => {
      const user = await new UserController(req).deleteUser(req.params.id);
      res.status(httpStatus.OK).json(user);
    })
  );

export default router;
