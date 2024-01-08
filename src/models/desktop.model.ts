import { Entity, Column } from "typeorm";
import { BaseEntityModel } from "./base.model";

@Entity()
export class Desktop extends BaseEntityModel {
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

  @Column({ nullable: true })
  macid_lan!: string;

  @Column({ nullable: true })
  macid_wifi!: string;

  @Column({ nullable: false })
  processor!: string;

  @Column({ nullable: false })
  generation!: string;

  @Column({ nullable: false })
  os!: string;

  @Column({ nullable: false })
  oskey!: string;

  @Column({ nullable: false })
  hostname!: string;

  @Column({ nullable: false })
  ram!: string;

  @Column({ nullable: false })
  storage!: string;

  @Column({ nullable: false })
  graphics!: string;

  @Column({ nullable: false })
  user!: string;

  @Column({ nullable: false })
  status!: string;

  @Column({ nullable: false })
  remarks!: string;

  @Column({ nullable: true })
  updatedbyname!: string;
}
