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
} from "tsoa";
import {
  ApiResponse,
  INewIDCardRequest,
  INewIDCardResponse,
  IResponseDto,
} from "../dtos";
import { Request } from "express";
import mask from "../utils/mask.util";
import { NotFoundException, UnauthorizedException } from "../utils/error.util";
import {
  createIDCard,
  deleteIDCardById,
  getAllIDCards,
  getIDCardById,
  updateIDCardById,
} from "../repositories/id-card.repository";
import { Not } from "typeorm";

@Route("id_card")
@Tags("ID_Card")
@Security("api_key")
export class IDCardController {
  constructor(private req: Request) {}

  @Get("/")
  public async getAllIDCards(): Promise<IResponseDto> {
    const idcards = await getAllIDCards();
    return new ApiResponse(true, idcards, "All IDCards fetched successfully");
  }

  @Get("/:id")
  public async getIDCardById(@Path() id: string): Promise<IResponseDto> {
    const idcard = await getIDCardById(id);
    return new ApiResponse(true, idcard, "ID Card fetched successfully");
  }

  @Post("/")
  public async createIDCard(
    @Body() body: INewIDCardRequest
  ): Promise<IResponseDto<INewIDCardResponse>> {
    if (!this.req.user) throw new UnauthorizedException();
    const idcard = await createIDCard(body, this.req.user);
    return new ApiResponse(true, idcard, "ID Card created successfully");
  }

  @Put("/:id")
  public async updateIDCardById(
    @Path() id: string,
    @Body() body: INewIDCardRequest
  ): Promise<IResponseDto> {
    if (!this.req.user) throw new UnauthorizedException();
    const idcard = await updateIDCardById(id, body, this.req.user);
    return new ApiResponse(true, idcard, "ID Card updated successfully");
  }

  @Delete("/:id")
  public async deleteIDCardById(@Path() id: string): Promise<IResponseDto> {
    if (!this.req.user) throw new UnauthorizedException();
    const idcard = await deleteIDCardById(id);
    return new ApiResponse(true, idcard, "ID Card deleted successfully");
  }
}
