import { Column, ManyToOne, JoinColumn, Entity } from "typeorm";
import { BaseEntityModel } from "./base.model";
export class BaseUser extends BaseEntityModel {
  @Column({ nullable: true, name: "email" })
  email!: string;

  @Column({ nullable: true, name: "phonenumber", default: null })
  phonenumber!: string;
}
