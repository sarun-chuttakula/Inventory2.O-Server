import { RESPONSE_MESSAGE, ERROR_MESSAGE } from "../constants";
import { Request, Response } from "express";
import * as userRepository from "../repositories/user.repository";
import { Get, Route, Security, Tags } from "tsoa";
import { ApiResponse, IResponseDto } from "../dtos";
import { UnauthorizedException } from "../utils";
import { getUser } from "../repositories/user.repository";

@Route("user")
@Tags("User")
@Security("api_key")
export class UPSController {
  constructor(private req: Request) {}

  @Get("/")
  public async getUser(): Promise<IResponseDto> {
    if (!this.req.user) throw new UnauthorizedException();
    const upss = await getUser(this.req.user);
    return new ApiResponse(true, upss, "All upss fetched successfully");
  }
}
