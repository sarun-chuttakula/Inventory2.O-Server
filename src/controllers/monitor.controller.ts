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
  INewMonitorRequest,
  INewMonitorResponse,
  IResponseDto,
} from '../dtos';
import { Request } from 'express';
import mask from '../utils/mask.util';
import { NotFoundException, UnauthorizedException } from '../utils/error.util';
import {
  createMonitor,
  deleteMonitorById,
  getAllMonitors,
  getMonitorById,
  updateMonitorById,
} from '../repositories/monitor.repository';
import { Not } from 'typeorm';

@Route("monitor")
@Tags("Monitor")
@Security("api_key")
export class MonitorController {
  constructor(private req: Request) {}

  @Get("/")
  public async getAllMonitors(): Promise<IResponseDto> {
    const monitors = await getAllMonitors();
    return new ApiResponse(true, monitors, "All monitors fetched successfully");
  }

  @Get("/:id")
  public async getMonitorById(@Path() id: string): Promise<IResponseDto> {
    const monitor = await getMonitorById(id);
    return new ApiResponse(true, monitor, "Monitor fetched successfully");
  }

  @Post("/")
  public async createMonitor(
    @Body() body: INewMonitorRequest
  ): Promise<IResponseDto<INewMonitorResponse>> {
    if (!this.req.user) throw new UnauthorizedException();
    const monitor = await createMonitor(body, this.req.user);
    return new ApiResponse(true, monitor, "Monitor created successfully");
  }

  @Put("/:id")
  public async updateMonitor(
    @Path() id: string,
    @Body() body: INewMonitorRequest
  ): Promise<IResponseDto> {
    if (!this.req.user) throw new UnauthorizedException();
    const monitor = await updateMonitorById(id, body, this.req.user);
    return new ApiResponse(true, monitor, "Monitor updated successfully");
  }

  @Delete("/:id")
  public async deleteMonitor(@Path() id: string): Promise<IResponseDto> {
    if (!this.req.user) throw new UnauthorizedException();
    const monitor = await deleteMonitorById(id);
    return new ApiResponse(true, monitor, "Monitor deleted successfully");
  }
}
