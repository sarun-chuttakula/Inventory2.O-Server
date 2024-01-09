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
  INewBiometrixRequest,
  INewBiometrixResponse,
  IResponseDto,
} from '../dtos';
import { Request } from 'express';
import mask from '../utils/mask.util';
import { NotFoundException, UnauthorizedException } from '../utils/error.util';
import {
  createBiometrix,
  deleteBiometrixById,
  getAllBiometrixs,
  getBiometrixById,
  updateBiometrixById,
} from '../repositories/biometrix.repository';
import { Not } from 'typeorm';

@Route("biometrix")
@Tags("Biometrix")
@Security("api_key")
export class BiometrixController {
  constructor(private req: Request) {}

  @Get("/")
  public async getAllBiometrixs(): Promise<IResponseDto> {
    const biometrixs = await getAllBiometrixs();
    return new ApiResponse(true, biometrixs, "All biometrixs fetched successfully");
  }

  @Get("/:id")
  public async getBiometrixById(@Path() id: string): Promise<IResponseDto> {
    const biometrix = await getBiometrixById(id);
    return new ApiResponse(true, biometrix, "Biometrix fetched successfully");
  }

  @Post("/")
  public async createBiometrix(
    @Body() body: INewBiometrixRequest
  ): Promise<IResponseDto<INewBiometrixResponse>> {
    if (!this.req.user) throw new UnauthorizedException();
    const biometrix = await createBiometrix(body, this.req.user);
    return new ApiResponse(true, biometrix, "Biometrix created successfully");
  }

  @Put("/:id")
  public async updateBiometrix(
    @Path() id: string,
    @Body() body: INewBiometrixRequest
  ): Promise<IResponseDto> {
    if (!this.req.user) throw new UnauthorizedException();
    const biometrix = await updateBiometrixById(id, body, this.req.user);
    return new ApiResponse(true, biometrix, "Biometrix updated successfully");
  }

  @Delete("/:id")
  public async deleteBiometrix(@Path() id: string): Promise<IResponseDto> {
    if (!this.req.user) throw new UnauthorizedException();
    const biometrix = await deleteBiometrixById(id);
    return new ApiResponse(true, biometrix, "Biometrix deleted successfully");
  }
}
