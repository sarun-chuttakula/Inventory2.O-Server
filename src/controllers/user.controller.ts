import {
  Get,
  Route,
  Tags,
  Post,
  Body,
  Path,
  Put,
  Delete,
  Security,
  Query,
} from "tsoa";
import {
  ApiResponse,
  INewACRequest,
  INewACResponse,
  IResponseDto,
  IUserRegisterRequest,
  IUserRegisterResponse,
  IUserUpdateRequest,
} from "../dtos";
import { Request } from "express";
import mask from "../utils/mask.util";
import { NotFoundException, UnauthorizedException } from "../utils/error.util";
import {
  createUser,
  deleteUserById,
  getAllUsers,
  getUserById,
  updateUserById,
} from "../repositories/user.repository";
import { Not } from "typeorm";

@Route("user")
@Tags("User")
@Security("api_key")
export class UserController {
  constructor(private req: Request) {}

  @Get("/")
  public async getAllUsers(): Promise<IResponseDto> {
    if (!this.req.user) throw new UnauthorizedException();
    const users = await getAllUsers(this.req.user);
    return new ApiResponse(true, users, "All users fetched successfully");
  }

  @Get("/:id")
  public async getUserById(@Path() id: string): Promise<IResponseDto> {
    if (!this.req.user) throw new UnauthorizedException();
    const user = await getUserById(id, this.req.user);
    return new ApiResponse(true, user, "User fetched successfully");
  }

  @Post("/")
  public async createUser(
    @Body() body: IUserRegisterRequest
  ): Promise<IResponseDto<IUserRegisterResponse>> {
    if (!this.req.user) throw new UnauthorizedException();
    const user = await createUser(body);
    return new ApiResponse(true, user, "User created successfully");
  }

  @Put("/:id")
  public async updateUser(
    @Path() id: string,
    @Body() body: IUserUpdateRequest
  ): Promise<IResponseDto<INewACResponse>> {
    console.log(body, "body");
    if (!this.req.user) throw new UnauthorizedException();
    const user = await updateUserById(id, body, this.req.user);
    return new ApiResponse(true, user, "User updated successfully");
  }

  @Delete("/:id")
  public async deleteUser(@Path() id: string): Promise<IResponseDto> {
    if (!this.req.user) throw new UnauthorizedException();
    const user = await deleteUserById(id, this.req.user);
    return new ApiResponse(true, user, "User deleted successfully");
  }
}
