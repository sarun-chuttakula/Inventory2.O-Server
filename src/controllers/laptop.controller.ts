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
  INewLaptopRequest,
  INewLaptopResponse,
  IResponseDto,
} from '../dtos';
import { Request } from 'express';
import mask from '../utils/mask.util';
import { NotFoundException, UnauthorizedException } from '../utils/error.util';
import {
  createLaptop,
  deleteLaptopById,
  getAllLaptops,
  getLaptopById,
  updateLaptopById,
} from '../repositories/laptop.repository';
import { Not } from 'typeorm';

@Route("laptop")
@Tags("Laptop")
@Security("api_key")
export class LaptopController {
  constructor(private req: Request) {}

  @Get("/")
  public async getAllLaptops(): Promise<IResponseDto> {
    const laptops = await getAllLaptops();
    return new ApiResponse(true, laptops, "All laptops fetched successfully");
  }

  @Get("/:id")
  public async getLaptopById(@Path() id: string): Promise<IResponseDto> {
    const laptop = await getLaptopById(id);
    return new ApiResponse(true, laptop, "Laptop fetched successfully");
  }

  @Post("/")
  public async createLaptop(
    @Body() body: INewLaptopRequest
  ): Promise<IResponseDto<INewLaptopResponse>> {
    if (!this.req.user) throw new UnauthorizedException();
    const laptop = await createLaptop(body, this.req.user);
    return new ApiResponse(true, laptop, "Laptop created successfully");
  }

  @Put("/:id")
  public async updateLaptop(
    @Path() id: string,
    @Body() body: INewLaptopRequest
  ): Promise<IResponseDto> {
    if (!this.req.user) throw new UnauthorizedException();
    const laptop = await updateLaptopById(id, body, this.req.user);
    return new ApiResponse(true, laptop, "Laptop updated successfully");
  }

  @Delete("/:id")
  public async deleteLaptop(@Path() id: string): Promise<IResponseDto> {
    if (!this.req.user) throw new UnauthorizedException();
    const laptop = await deleteLaptopById(id);
    return new ApiResponse(true, laptop, "Laptop deleted successfully");
  }
}
