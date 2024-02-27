import AppDataSource from "../configs/data-source";
import { Request, Response } from "express";
import {
  INewPurchaseRegisterRequest,
  INewPurchaseRegisterResponse,
} from "../dtos";
import { PurchaseRegister, User } from "../models";
import { BadRequestException } from "../utils";
import { PDFDocument } from "pdf-lib";
import { Readable } from "stream";
const purchaseRegisterRepository =
  AppDataSource.manager.getRepository(PurchaseRegister);
const user = AppDataSource.manager.getRepository(User);
export const createPurchaseRegister = async (
  payload: INewPurchaseRegisterRequest,
  reqUser: User
): Promise<INewPurchaseRegisterResponse> => {
  const alreadyExistsTag = await purchaseRegisterRepository.findOne({
    where: {
      tag: payload.tag,
    },
  });
  if (alreadyExistsTag) throw new BadRequestException("Already exists");

  return await purchaseRegisterRepository.save({
    ...new PurchaseRegister(),
    ...payload,
    created_by: reqUser.id,
    updated_by: reqUser.id,
  });
};

export const getAllPurchaseRegister = async (reqUser: User): Promise<any> => {
  const PurchaseRegisters = await purchaseRegisterRepository.find({
    where: {
      is_active: true,
      is_deleted: false,
    },
  });
};

export const generateCapex = async (req: Request, res: Response) => {
  try {
    const purchaseRegisterRepository =
      AppDataSource.manager.getRepository(PurchaseRegister);
    const data = await purchaseRegisterRepository.find({});
    console.log(data, "data");

    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage();

    const textContent = data
      .map((item, index) => {
        return `${index + 1}. Nature of Assets: ${
          item.product
        }\nUser Details: ${item.end_user}\n`;
        // Add more fields as needed
      })
      .join("\n");

    page.drawText(textContent, {
      x: 50,
      y: page.getHeight() - 100,
    });

    const pdfBytes = await pdfDoc.save();
    const pdfStream = Readable.from([Buffer.from(pdfBytes)]);

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      "attachment; filename=capex_forms.pdf"
    );

    pdfStream.pipe(res);
  } catch (error) {
    console.error("Error generating Capex:", error);
    res.status(500).send("Error generating Capex");
  }
};
