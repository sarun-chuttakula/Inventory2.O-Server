import { Entity, Column } from "typeorm";
import { BaseEntityModel } from "./base.model"; // Assuming BaseEntityModel is properly defined

@Entity()
export class Pantry extends BaseEntityModel {
  @Column({ nullable: false })
  item_name!: string;

  @Column({ nullable: false })
  item_description!: string;

  @Column({ nullable: false })
  item_quantity!: number;

  @Column({ nullable: false, type: "date" })
  item_date_of_purchase!: Date;

  @Column({ nullable: false, type: "date" })
  item_expiry_date!: Date;
}
