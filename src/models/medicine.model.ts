import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  PrimaryColumn,
  Generated,
} from "typeorm";
import { BaseEntityModel } from "./base.model";

@Entity()
export class Medicine extends BaseEntityModel {
  @Column({ nullable: false })
  medicine_name!: string;

  @Column({ nullable: false })
  vendor!: string;

  @Column({ nullable: false })
  batch_no!: string;

  @Column({ nullable: false })
  medicine_quantity!: number;

  @Column({ nullable: false, type: "date" })
  medicine_date_of_purchase!: Date;

  @Column({ nullable: false, type: "date" })
  medicine_expiry_date!: Date;
}
