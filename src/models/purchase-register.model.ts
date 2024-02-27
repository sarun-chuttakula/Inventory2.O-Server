import { Entity, Column } from "typeorm";
import { BaseEntityModel } from "./base.model";

@Entity()
export class PurchaseRegister extends BaseEntityModel {
  @Column({ nullable: false })
  branch!: string;

  @Column({ nullable: false })
  purchase_date!: Date;

  @Column({ nullable: false })
  vendor!: string;

  @Column({ nullable: false })
  product!: string;

  @Column({ nullable: false, type: "longtext" })
  description!: string;

  @Column({ nullable: false })
  brand!: string;

  @Column({ nullable: true })
  model!: string;

  @Column({ nullable: false })
  serialnumber!: string;

  @Column({ nullable: false })
  quantity!: number;

  @Column({ nullable: false })
  rate!: string;

  @Column({ nullable: false })
  amount!: number;

  @Column({ nullable: false })
  capex!: boolean;

  @Column({ nullable: false })
  end_user!: string;

  @Column({ nullable: true })
  employeecode!: string;

  @Column({ nullable: false })
  department!: string;

  @Column({ nullable: false, unique: true })
  tag!: string;
}
