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
  INewItemRequest,
  INewItemResponse,
  IResponseDto,
} from '../dtos';
import { Request } from 'express';
import mask from '../utils/mask.util';
import { NotFoundException, UnauthorizedException } from '../utils/error.util';
import {
  createPantry,
  deletePantryById,
  getAllPantrys,
  getPantryById,
  updatePantryById,
} from '../repositories/pantry.repository';
import { Not } from 'typeorm';

@Route("pantry")
@Tags("Pantry")
@Security("api_key")
export class PantryController {
  constructor(private req: Request) {}

  @Get("/")
  public async getAllPantrys(): Promise<IResponseDto> {
    const pantrys = await getAllPantrys();
    return new ApiResponse(true, pantrys, "All Pantrys fetched successfully");
  }

  @Get("/:id")
  public async getPantryById(@Path() id: string): Promise<IResponseDto> {
    const pantry = await getPantryById(id);
    return new ApiResponse(true, pantry, "pantry fetched successfully");
  }

  @Post("/")
  public async createPantry(
    @Body() body: INewItemRequest
  ): Promise<IResponseDto<INewItemResponse>> {
    if (!this.req.user) throw new UnauthorizedException();
    const pantry = await createPantry(body, this.req.user);
    return new ApiResponse(true, pantry, "pantry created successfully");
  }

  @Put("/:id")
  public async updatePantry(
    @Path() id: string,
    @Body() body: INewItemRequest
  ): Promise<IResponseDto> {
    if (!this.req.user) throw new UnauthorizedException();
    const pantry = await updatePantryById(id, body, this.req.user);
    return new ApiResponse(true, pantry, "pantry updated successfully");
  }

  @Delete("/:id")
  public async deletePantry(@Path() id: string): Promise<IResponseDto> {
    if (!this.req.user) throw new UnauthorizedException();
    const pantry = await deletePantryById(id);
    return new ApiResponse(true, pantry, "Pantry deleted successfully");
  }
}
