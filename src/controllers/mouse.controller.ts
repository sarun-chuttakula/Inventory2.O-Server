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
  INewMouseRequest,
  INewMouseResponse,
  IResponseDto,
} from '../dtos';
import { Request } from 'express';
import mask from '../utils/mask.util';
import { NotFoundException, UnauthorizedException } from '../utils/error.util';
import {
  createMouse,
  deleteMouseById,
  getAllMouses,
  getMouseById,
  updateMouseById,
} from '../repositories/mouse.repository';
import { Not } from 'typeorm';

@Route("mouse")
@Tags("Mouse")
@Security("api_key")
export class MouseController {
  constructor(private req: Request) {}

  @Get("/")
  public async getAllMouses(): Promise<IResponseDto> {
    const mouses = await getAllMouses();
    return new ApiResponse(true, mouses, "All mouses fetched successfully");
  }

  @Get("/:id")
  public async getMouseById(@Path() id: string): Promise<IResponseDto> {
    const mouse = await getMouseById(id);
    return new ApiResponse(true, mouse, "Mouse fetched successfully");
  }

  @Post("/")
  public async createMouse(
    @Body() body: INewMouseRequest
  ): Promise<IResponseDto<INewMouseResponse>> {
    if (!this.req.user) throw new UnauthorizedException();
    const mouse = await createMouse(body, this.req.user);
    return new ApiResponse(true, mouse, "Mouse created successfully");
  }

  @Put("/:id")
  public async updateMouse(
    @Path() id: string,
    @Body() body: INewMouseRequest
  ): Promise<IResponseDto> {
    if (!this.req.user) throw new UnauthorizedException();
    const mouse = await updateMouseById(id, body, this.req.user);
    return new ApiResponse(true, mouse, "Mouse updated successfully");
  }

  @Delete("/:id")
  public async deleteMouse(@Path() id: string): Promise<IResponseDto> {
    if (!this.req.user) throw new UnauthorizedException();
    const mouse = await deleteMouseById(id);
    return new ApiResponse(true, mouse, "Mouse deleted successfully");
  }
}
