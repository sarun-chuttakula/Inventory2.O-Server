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
  INewUPSRequest,
  INewUPSResponse,
  IResponseDto,
} from '../dtos';
import { Request } from 'express';
import mask from '../utils/mask.util';
import { NotFoundException, UnauthorizedException } from '../utils/error.util';
import {
  createUPS,
  deleteUPSById,
  getAllUPSs,
  getUPSById,
  updateUPSById,
} from '../repositories/ups.repository';
import { Not } from 'typeorm';

@Route("ups")
@Tags("UPS")
@Security("api_key")
export class UPSController {
  constructor(private req: Request) {}

  @Get("/")
  public async getAllUPSs(): Promise<IResponseDto> {
    const upss = await getAllUPSs();
    return new ApiResponse(true, upss, "All upss fetched successfully");
  }

  @Get("/:id")
  public async getUPSById(@Path() id: string): Promise<IResponseDto> {
    const ups = await getUPSById(id);
    return new ApiResponse(true, ups, "UPS fetched successfully");
  }

  @Post("/")
  public async createUPS(
    @Body() body: INewUPSRequest
  ): Promise<IResponseDto<INewUPSResponse>> {
    if (!this.req.user) throw new UnauthorizedException();
    const ups = await createUPS(body, this.req.user);
    return new ApiResponse(true, ups, "UPS created successfully");
  }

  @Put("/:id")
  public async updateUPS(
    @Path() id: string,
    @Body() body: INewUPSRequest
  ): Promise<IResponseDto> {
    if (!this.req.user) throw new UnauthorizedException();
    const ups = await updateUPSById(id, body, this.req.user);
    return new ApiResponse(true, ups, "UPS updated successfully");
  }

  @Delete("/:id")
  public async deleteUPS(@Path() id: string): Promise<IResponseDto> {
    if (!this.req.user) throw new UnauthorizedException();
    const ups = await deleteUPSById(id);
    return new ApiResponse(true, ups, "UPS deleted successfully");
  }
}
