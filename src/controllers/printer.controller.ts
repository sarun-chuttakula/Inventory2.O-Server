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
  INewPrinterRequest,
  INewPrinterResponse,
  IResponseDto,
} from '../dtos';
import { Request } from 'express';
import mask from '../utils/mask.util';
import { NotFoundException, UnauthorizedException } from '../utils/error.util';
import {
  createPrinter,
  deletePrinterById,
  getAllPrinters,
  getPrinterById,
  updatePrinterById,
} from '../repositories/printer.repository';
import { Not } from 'typeorm';

@Route("printer")
@Tags("Printer")
@Security("api_key")
export class PrinterController {
  constructor(private req: Request) {}

  @Get("/")
  public async getAllPrinters(): Promise<IResponseDto> {
    const printers = await getAllPrinters();
    return new ApiResponse(true, printers, "All printers fetched successfully");
  }

  @Get("/:id")
  public async getPrinterById(@Path() id: string): Promise<IResponseDto> {
    const printer = await getPrinterById(id);
    return new ApiResponse(true, printer, "Printer fetched successfully");
  }

  @Post("/")
  public async createPrinter(
    @Body() body: INewPrinterRequest
  ): Promise<IResponseDto<INewPrinterResponse>> {
    if (!this.req.user) throw new UnauthorizedException();
    const printer = await createPrinter(body, this.req.user);
    return new ApiResponse(true, printer, "Printer created successfully");
  }

  @Put("/:id")
  public async updatePrinter(
    @Path() id: string,
    @Body() body: INewPrinterRequest
  ): Promise<IResponseDto> {
    if (!this.req.user) throw new UnauthorizedException();
    const printer = await updatePrinterById(id, body, this.req.user);
    return new ApiResponse(true, printer, "Printer updated successfully");
  }

  @Delete("/:id")
  public async deletePrinter(@Path() id: string): Promise<IResponseDto> {
    if (!this.req.user) throw new UnauthorizedException();
    const printer = await deletePrinterById(id);
    return new ApiResponse(true, printer, "Printer deleted successfully");
  }
}
