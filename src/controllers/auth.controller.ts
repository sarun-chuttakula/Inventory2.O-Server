import { Body, Post, Route, Tags, Security, Get, Put, Path } from "tsoa";
import { verifyToken } from "../utils/auth.util";
import * as authRepository from "../repositories";
import {
  IUserRegisterRequest,
  IUserRegisterResponse,
  UserRegisterResponseFields,
  UserUpdateResponseFields,
} from "../dtos";
import { RESPONSE_MESSAGE, ERROR_MESSAGE } from "../constants";
import { Request, Response } from "express";
import {
  ServerErrorException,
  UnauthorizedException,
} from "../utils/error.util";
import logger from "../utils/logger.util";
import { ApiResponse, IResponseDto } from "../dtos/response.dto";
import mask from "../utils/mask.util";

@Route("auth")
@Tags("Authentication")
export default class AuthController {
  constructor(private req: Request) {}

  /**
   * @param payload IUserRegisterRequest
   */
  @Post("/register")
  public async registerUser(
    @Body() payload: IUserRegisterRequest
  ): Promise<IResponseDto<IUserRegisterResponse>> {
    try {
      const user = await authRepository.register(payload);
      console.log(user, "======");
      return new ApiResponse(
        true,
        // mask(user, UserRegisterResponseFields),
        user,
        RESPONSE_MESSAGE.USER_REGISTERED_SUCCESSFULLY
      );
    } catch (error: any) {
      logger.error(error);
      throw new ServerErrorException(error.message);
    }
  }
  @Post("/login")
  public async loginUser(
    @Body() payload: IUserRegisterRequest
  ): Promise<IResponseDto<IUserRegisterResponse>> {
    try {
      const user = await authRepository.login(payload);
      console.log(user, "======");
      return new ApiResponse(
        true,
        // mask(user, UserRegisterResponseFields),
        user,
        RESPONSE_MESSAGE.USER_REGISTERED_SUCCESSFULLY
      );
    } catch (error: any) {
      logger.error(error);
      throw new ServerErrorException(error.message);
    }
  }
}
