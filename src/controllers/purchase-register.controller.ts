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
  INewProjectorRequest,
  INewProjectorResponse,
  INewPurchaseRegisterRequest,
  INewPurchaseRegisterResponse,
  IResponseDto,
  NewPurchaseRegisterResponseFields,
} from "../dtos";
import { Request } from "express";
import mask from "../utils/mask.util";
import { NotFoundException, UnauthorizedException } from "../utils/error.util";
import { Not } from "typeorm";
import {
  createPurchaseRegister,
  getAllPurchaseRegister,
} from "../repositories/purchase-register.repository";

@Route("purchase-register")
@Tags("PurchaseRegister")
@Security("api_key")
export class PurchaseRegisterController {
  constructor(private req: Request) {}

  @Get("/")
  public async getAllPurchaseRegister(): Promise<any> {
    const purchaseRegister = await getAllPurchaseRegister(this.req.user);
    return new ApiResponse(
      true,
      purchaseRegister,
      "All purchaseRegister fetched successfully"
    );
  }

  @Post("/")
  public async createPurchaseRegister(
    @Body() body: INewPurchaseRegisterRequest
  ): Promise<IResponseDto<INewPurchaseRegisterResponse>> {
    if (!this.req.user) throw new UnauthorizedException();
    const purchaseRegister = await createPurchaseRegister(body, this.req.user);
    return new ApiResponse(
      true,
      mask(purchaseRegister, NewPurchaseRegisterResponseFields),
      "purchaseRegister created successfully"
    );
  }
}
