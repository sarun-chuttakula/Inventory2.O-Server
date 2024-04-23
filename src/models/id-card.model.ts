import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  PrimaryColumn,
  Generated,
} from "typeorm";
import { BaseEntityModel } from "./base.model";

@Entity()
export class IDCard extends BaseEntityModel {
  @Column({ nullable: false })
  s_no!: string;

  @Column({ nullable: false })
  employee_name!: string;

  @Column({ nullable: false })
  employee_id!: string;

  @Column({ nullable: false })
  organization!: string;

  @Column({ nullable: false })
  floor!: string;

  @Column({ nullable: false })
  card_no!: string;

  @Column({ nullable: false })
  card_hex_no!: string;

  @Column({ nullable: false })
  keka_entry_status!: string;

  @Column({ nullable: false })
  date_of_issue!: string;

  @Column({ nullable: false })
  accessible_areas!: string;

  @Column({ nullable: true })
  remark!: string;

  @Column({ nullable: true })
  action!: string;
}
