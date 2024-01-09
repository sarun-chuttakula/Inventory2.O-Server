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
  INewACRequest,
  INewACResponse,
  IResponseDto,
} from '../dtos';
import { Request } from 'express';
import mask from '../utils/mask.util';
import { NotFoundException, UnauthorizedException } from '../utils/error.util';
import {
  createAC,
  deleteACById,
  getAllACs,
  getACById,
  updateACById,
} from '../repositories/ac.repository';
import { Not } from 'typeorm';

@Route("ac")
@Tags("AC")
@Security("api_key")
export class ACController {
  constructor(private req: Request) {}

  @Get("/")
  public async getAllACs(): Promise<IResponseDto> {
    const acs = await getAllACs();
    return new ApiResponse(true, acs, "All acs fetched successfully");
  }

  @Get("/:id")
  public async getACById(@Path() id: string): Promise<IResponseDto> {
    const ac = await getACById(id);
    return new ApiResponse(true, ac, "AC fetched successfully");
  }

  @Post("/")
  public async createAC(
    @Body() body: INewACRequest
  ): Promise<IResponseDto<INewACResponse>> {
    if (!this.req.user) throw new UnauthorizedException();
    const ac = await createAC(body, this.req.user);
    return new ApiResponse(true, ac, "AC created successfully");
  }

  @Put("/:id")
  public async updateAC(
    @Path() id: string,
    @Body() body: INewACRequest
  ): Promise<IResponseDto> {
    if (!this.req.user) throw new UnauthorizedException();
    const ac = await updateACById(id, body, this.req.user);
    return new ApiResponse(true, ac, "AC updated successfully");
  }

  @Delete("/:id")
  public async deleteAC(@Path() id: string): Promise<IResponseDto> {
    if (!this.req.user) throw new UnauthorizedException();
    const ac = await deleteACById(id);
    return new ApiResponse(true, ac, "AC deleted successfully");
  }
}
