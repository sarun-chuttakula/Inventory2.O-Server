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
  INewProjectorRequest,
  INewProjectorResponse,
  IResponseDto,
} from '../dtos';
import { Request } from 'express';
import mask from '../utils/mask.util';
import { NotFoundException, UnauthorizedException } from '../utils/error.util';
import {
  createProjector,
  deleteProjectorById,
  getAllProjectors,
  getProjectorById,
  updateProjectorById,
} from '../repositories/projector.repository';
import { Not } from 'typeorm';

@Route("projector")
@Tags("Projector")
@Security("api_key")
export class ProjectorController {
  constructor(private req: Request) {}

  @Get("/")
  public async getAllProjectors(): Promise<IResponseDto> {
    const projectors = await getAllProjectors();
    return new ApiResponse(true, projectors, "All projectors fetched successfully");
  }

  @Get("/:id")
  public async getProjectorById(@Path() id: string): Promise<IResponseDto> {
    const projector = await getProjectorById(id);
    return new ApiResponse(true, projector, "Projector fetched successfully");
  }

  @Post("/")
  public async createProjector(
    @Body() body: INewProjectorRequest
  ): Promise<IResponseDto<INewProjectorResponse>> {
    if (!this.req.user) throw new UnauthorizedException();
    const projector = await createProjector(body, this.req.user);
    return new ApiResponse(true, projector, "Projector created successfully");
  }

  @Put("/:id")
  public async updateProjector(
    @Path() id: string,
    @Body() body: INewProjectorRequest
  ): Promise<IResponseDto> {
    if (!this.req.user) throw new UnauthorizedException();
    const projector = await updateProjectorById(id, body, this.req.user);
    return new ApiResponse(true, projector, "Projector updated successfully");
  }

  @Delete("/:id")
  public async deleteProjector(@Path() id: string): Promise<IResponseDto> {
    if (!this.req.user) throw new UnauthorizedException();
    const projector = await deleteProjectorById(id);
    return new ApiResponse(true, projector, "Projector deleted successfully");
  }
}
