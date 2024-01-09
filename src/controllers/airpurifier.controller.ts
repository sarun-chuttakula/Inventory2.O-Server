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
  INewAirpurifierRequest,
  INewAirpurifierResponse,
  IResponseDto,
} from '../dtos';
import { Request } from 'express';
import mask from '../utils/mask.util';
import { NotFoundException, UnauthorizedException } from '../utils/error.util';
import {
  createAirpurifier,
  deleteAirpurifierById,
  getAllAirpurifiers,
  getAirpurifierById,
  updateAirpurifierById,
} from '../repositories/airpurifier.repository';
import { Not } from 'typeorm';

@Route("airpurifier")
@Tags("Airpurifier")
@Security("api_key")
export class AirpurifierController {
  constructor(private req: Request) {}

  @Get("/")
  public async getAllAirpurifiers(): Promise<IResponseDto> {
    const airpurifiers = await getAllAirpurifiers();
    return new ApiResponse(true, airpurifiers, "All airpurifiers fetched successfully");
  }

  @Get("/:id")
  public async getAirpurifierById(@Path() id: string): Promise<IResponseDto> {
    const airpurifier = await getAirpurifierById(id);
    return new ApiResponse(true, airpurifier, "Airpurifier fetched successfully");
  }

  @Post("/")
  public async createAirpurifier(
    @Body() body: INewAirpurifierRequest
  ): Promise<IResponseDto<INewAirpurifierResponse>> {
    if (!this.req.user) throw new UnauthorizedException();
    const airpurifier = await createAirpurifier(body, this.req.user);
    return new ApiResponse(true, airpurifier, "Airpurifier created successfully");
  }

  @Put("/:id")
  public async updateAirpurifier(
    @Path() id: string,
    @Body() body: INewAirpurifierRequest
  ): Promise<IResponseDto> {
    if (!this.req.user) throw new UnauthorizedException();
    const airpurifier = await updateAirpurifierById(id, body, this.req.user);
    return new ApiResponse(true, airpurifier, "Airpurifier updated successfully");
  }

  @Delete("/:id")
  public async deleteAirpurifier(@Path() id: string): Promise<IResponseDto> {
    if (!this.req.user) throw new UnauthorizedException();
    const airpurifier = await deleteAirpurifierById(id);
    return new ApiResponse(true, airpurifier, "Airpurifier deleted successfully");
  }
}
