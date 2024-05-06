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
  INewMedicineRequest,
  INewMedicineResponse,
  IResponseDto,
} from '../dtos';
import { Request } from 'express';
import mask from '../utils/mask.util';
import { NotFoundException, UnauthorizedException } from '../utils/error.util';
import {
  createMedicine,
  deleteMedicineById,
  getAllMedicines,
  getMedicineById,
  updateMedicineById,
} from '../repositories/medicine.repository';
import { Not } from 'typeorm';

@Route("medicine")
@Tags("Medicine")
@Security("api_key")
export class MedicineController {
  constructor(private req: Request) {}

  @Get("/")
  public async getAllMedicines(): Promise<IResponseDto> {
    const medicines = await getAllMedicines();
    return new ApiResponse(true, medicines, "All Medicines fetched successfully");
  }

  @Get("/:id")
  public async getMedicineById(@Path() id: string): Promise<IResponseDto> {
    const medicine = await getMedicineById(id);
    return new ApiResponse(true, medicine, "medicine fetched successfully");
  }

  @Post("/")
  public async createMedicine(
    @Body() body: INewMedicineRequest
  ): Promise<IResponseDto<INewMedicineResponse>> {
    if (!this.req.user) throw new UnauthorizedException();
    const medicine = await createMedicine(body, this.req.user);
    return new ApiResponse(true, medicine, "medicine created successfully");
  }

  @Put("/:id")
  public async updateMedicine(
    @Path() id: string,
    @Body() body: INewMedicineRequest
  ): Promise<IResponseDto> {
    if (!this.req.user) throw new UnauthorizedException();
    const medicine = await updateMedicineById(id, body, this.req.user);
    return new ApiResponse(true, medicine, "medicine updated successfully");
  }

  @Delete("/:id")
  public async deleteMedicine(@Path() id: string): Promise<IResponseDto> {
    if (!this.req.user) throw new UnauthorizedException();
    const medicine = await deleteMedicineById(id);
    return new ApiResponse(true, medicine, "Medicine deleted successfully");
  }
}
