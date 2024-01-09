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
  INewTVRequest,
  INewTVResponse,
  IResponseDto,
} from '../dtos';
import { Request } from 'express';
import mask from '../utils/mask.util';
import { NotFoundException, UnauthorizedException } from '../utils/error.util';
import {
  createTV,
  deleteTVById,
  getAllTVs,
  getTVById,
  updateTVById,
} from '../repositories/tv.repository';
import { Not } from 'typeorm';

@Route("tv")
@Tags("TV")
@Security("api_key")
export class TVController {
  constructor(private req: Request) {}

  @Get("/")
  public async getAllTVs(): Promise<IResponseDto> {
    const tvs = await getAllTVs();
    return new ApiResponse(true, tvs, "All tvs fetched successfully");
  }

  @Get("/:id")
  public async getTVById(@Path() id: string): Promise<IResponseDto> {
    const tv = await getTVById(id);
    return new ApiResponse(true, tv, "TV fetched successfully");
  }

  @Post("/")
  public async createTV(
    @Body() body: INewTVRequest
  ): Promise<IResponseDto<INewTVResponse>> {
    if (!this.req.user) throw new UnauthorizedException();
    const tv = await createTV(body, this.req.user);
    return new ApiResponse(true, tv, "TV created successfully");
  }

  @Put("/:id")
  public async updateTV(
    @Path() id: string,
    @Body() body: INewTVRequest
  ): Promise<IResponseDto> {
    if (!this.req.user) throw new UnauthorizedException();
    const tv = await updateTVById(id, body, this.req.user);
    return new ApiResponse(true, tv, "TV updated successfully");
  }

  @Delete("/:id")
  public async deleteTV(@Path() id: string): Promise<IResponseDto> {
    if (!this.req.user) throw new UnauthorizedException();
    const tv = await deleteTVById(id);
    return new ApiResponse(true, tv, "TV deleted successfully");
  }
}
