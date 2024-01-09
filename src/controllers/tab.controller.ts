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
  INewTabRequest,
  INewTabResponse,
  IResponseDto,
} from '../dtos';
import { Request } from 'express';
import mask from '../utils/mask.util';
import { NotFoundException, UnauthorizedException } from '../utils/error.util';
import {
  createTab,
  deleteTabById,
  getAllTabs,
  getTabById,
  updateTabById,
} from '../repositories/tab.repository';
import { Not } from 'typeorm';

@Route("tab")
@Tags("Tab")
@Security("api_key")
export class TabController {
  constructor(private req: Request) {}

  @Get("/")
  public async getAllTabs(): Promise<IResponseDto> {
    const tabs = await getAllTabs();
    return new ApiResponse(true, tabs, "All tabs fetched successfully");
  }

  @Get("/:id")
  public async getTabById(@Path() id: string): Promise<IResponseDto> {
    const tab = await getTabById(id);
    return new ApiResponse(true, tab, "Tab fetched successfully");
  }

  @Post("/")
  public async createTab(
    @Body() body: INewTabRequest
  ): Promise<IResponseDto<INewTabResponse>> {
    if (!this.req.user) throw new UnauthorizedException();
    const tab = await createTab(body, this.req.user);
    return new ApiResponse(true, tab, "Tab created successfully");
  }

  @Put("/:id")
  public async updateTab(
    @Path() id: string,
    @Body() body: INewTabRequest
  ): Promise<IResponseDto> {
    if (!this.req.user) throw new UnauthorizedException();
    const tab = await updateTabById(id, body, this.req.user);
    return new ApiResponse(true, tab, "Tab updated successfully");
  }

  @Delete("/:id")
  public async deleteTab(@Path() id: string): Promise<IResponseDto> {
    if (!this.req.user) throw new UnauthorizedException();
    const tab = await deleteTabById(id);
    return new ApiResponse(true, tab, "Tab deleted successfully");
  }
}
