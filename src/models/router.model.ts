import { Entity, Column } from "typeorm";
import { BaseEntityModel } from "./base.model";

@Entity()
export class Router extends BaseEntityModel {
  @Column({ nullable: false })
  make!: string;

  @Column({ nullable: false })
  city!: string;

  @Column({ nullable: false })
  model!: string;

  @Column({ nullable: false })
  tagid!: string;

  @Column({ nullable: false })
  hodtag!: string;

  @Column({ nullable: false })
  location!: string;

  @Column({ nullable: false, unique: true })
  serialnumber!: string;

  @Column({ nullable: false })
  user!: string;

  @Column({ nullable: false })
  status!: string;

  @Column({ nullable: false })
  remarks!: string;

  @Column({ nullable: true })
  updatedbyname!: string;
}
