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
  INewDesktopRequest,
  INewDesktopResponse,
  IResponseDto,
} from "../dtos";
import { Request } from "express";
import mask from "../utils/mask.util";
import { NotFoundException, UnauthorizedException } from "../utils/error.util";
import { Not } from "typeorm";
import { getallassets } from "../repositories/asset.repository";

@Route("assets")
@Tags("Assets")
@Security("api_key")
export class AssetsController {
  constructor(private req: Request) {}

  @Get("/")
  public async getAllAssets(
    @Query() asset_type: string,
    @Query() page: string
  ): Promise<IResponseDto> {
    const assets = await getallassets(asset_type,page);
    return new ApiResponse(true, assets, "All1 desktops fetched successfully");
  }
}
