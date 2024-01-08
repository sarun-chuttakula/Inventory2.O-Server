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
import { UnauthorizedException } from "../utils/error.util";
import {
  createDesktop,
  deleteDesktopById,
  getAllDesktops,
  getDesktopById,
  updateDesktopById,
} from "../repositories/desktop.repository";

@Route("desktop")
@Tags("Desktop")
@Security("api_key")
export class DesktopController {
  constructor(private req: Request) {}

  @Get("/")
  public async getAllDesktops(): Promise<IResponseDto> {
    const desktops = await getAllDesktops();
    return new ApiResponse(true, desktops, "All desktops fetched successfully");
  }

  @Get("/:id")
  public async getDesktopById(@Path() id: string): Promise<IResponseDto> {
    const desktop = await getDesktopById(id);
    return new ApiResponse(true, desktop, "Desktop fetched successfully");
  }

  @Post("/")
  public async createDesktop(
    @Body() body: INewDesktopRequest
  ): Promise<IResponseDto<INewDesktopResponse>> {
    if (!this.req.user) throw new UnauthorizedException();
    const desktop = await createDesktop(body, this.req.user);
    return new ApiResponse(true, desktop, "Desktop created successfully");
  }

  @Put("/:id")
  public async updateDesktop(
    @Path() id: string,
    @Body() body: INewDesktopRequest
  ): Promise<IResponseDto> {
    if (!this.req.user) throw new UnauthorizedException();
    const desktop = await updateDesktopById(id, body, this.req.user);
    return new ApiResponse(true, desktop, "Desktop updated successfully");
  }

  @Delete("/:id")
  public async deleteDesktop(@Path() id: string): Promise<IResponseDto> {
    if (!this.req.user) throw new UnauthorizedException();
    const desktop = await deleteDesktopById(id);
    return new ApiResponse(true, desktop, "Desktop deleted successfully");
  }
}
