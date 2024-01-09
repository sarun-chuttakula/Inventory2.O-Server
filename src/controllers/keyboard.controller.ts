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
  INewKeyboardRequest,
  INewKeyboardResponse,
  IResponseDto,
} from '../dtos';
import { Request } from 'express';
import mask from '../utils/mask.util';
import { NotFoundException, UnauthorizedException } from '../utils/error.util';
import {
  createKeyboard,
  deleteKeyboardById,
  getAllKeyboards,
  getKeyboardById,
  updateKeyboardById,
} from '../repositories/keyboard.repository';
import { Not } from 'typeorm';

@Route("keyboard")
@Tags("Keyboard")
@Security("api_key")
export class KeyboardController {
  constructor(private req: Request) {}

  @Get("/")
  public async getAllKeyboards(): Promise<IResponseDto> {
    const keyboards = await getAllKeyboards();
    return new ApiResponse(true, keyboards, "All keyboards fetched successfully");
  }

  @Get("/:id")
  public async getKeyboardById(@Path() id: string): Promise<IResponseDto> {
    const keyboard = await getKeyboardById(id);
    return new ApiResponse(true, keyboard, "Keyboard fetched successfully");
  }

  @Post("/")
  public async createKeyboard(
    @Body() body: INewKeyboardRequest
  ): Promise<IResponseDto<INewKeyboardResponse>> {
    if (!this.req.user) throw new UnauthorizedException();
    const keyboard = await createKeyboard(body, this.req.user);
    return new ApiResponse(true, keyboard, "Keyboard created successfully");
  }

  @Put("/:id")
  public async updateKeyboard(
    @Path() id: string,
    @Body() body: INewKeyboardRequest
  ): Promise<IResponseDto> {
    if (!this.req.user) throw new UnauthorizedException();
    const keyboard = await updateKeyboardById(id, body, this.req.user);
    return new ApiResponse(true, keyboard, "Keyboard updated successfully");
  }

  @Delete("/:id")
  public async deleteKeyboard(@Path() id: string): Promise<IResponseDto> {
    if (!this.req.user) throw new UnauthorizedException();
    const keyboard = await deleteKeyboardById(id);
    return new ApiResponse(true, keyboard, "Keyboard deleted successfully");
  }
}
