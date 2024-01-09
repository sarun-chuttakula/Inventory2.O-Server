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
} from 'tsoa';
import {
  ApiResponse,
  INewRouterRequest,
  INewRouterResponse,
  IResponseDto,
} from '../dtos';
import { Request } from 'express';
import mask from '../utils/mask.util';
import { NotFoundException, UnauthorizedException } from '../utils/error.util';
import {
  createRouter,
  deleteRouterById,
  getAllRouters,
  getRouterById,
  updateRouterById,
} from '../repositories/router.repository';
import { Not } from 'typeorm';

@Route("router")
@Tags("Router")
@Security("api_key")
export class RouterController {
  constructor(private req: Request) {}

  @Get("/")
  public async getAllRouters(): Promise<IResponseDto> {
    const routers = await getAllRouters();
    return new ApiResponse(true, routers, "All routers fetched successfully");
  }

  @Get("/:id")
  public async getRouterById(@Path() id: string): Promise<IResponseDto> {
    const router = await getRouterById(id);
    return new ApiResponse(true, router, "Router fetched successfully");
  }

  @Post("/")
  public async createRouter(
    @Body() body: INewRouterRequest
  ): Promise<IResponseDto<INewRouterResponse>> {
    if (!this.req.user) throw new UnauthorizedException();
    const router = await createRouter(body, this.req.user);
    return new ApiResponse(true, router, "Router created successfully");
  }

  @Put("/:id")
  public async updateRouter(
    @Path() id: string,
    @Body() body: INewRouterRequest
  ): Promise<IResponseDto> {
    if (!this.req.user) throw new UnauthorizedException();
    const router = await updateRouterById(id, body, this.req.user);
    return new ApiResponse(true, router, "Router updated successfully");
  }

  @Delete("/:id")
  public async deleteRouter(@Path() id: string): Promise<IResponseDto> {
    if (!this.req.user) throw new UnauthorizedException();
    const router = await deleteRouterById(id);
    return new ApiResponse(true, router, "Router deleted successfully");
  }
}
