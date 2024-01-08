import { Entity, Column, OneToMany, Check } from "typeorm";
import { Role } from "../enums";
import { BaseUser } from "./base-user.model";
@Entity()
@Check(`"is_deleted" = false`)
export class User extends BaseUser {
  @Column({ nullable: false })
  firstname!: string;

  @Column({ nullable: true, default: null })
  lastname!: string;

  @Column({ type: "enum", enum: Role })
  role!: Role;

  @Column({ nullable: true, default: null })
  dob!: string;

  @Column({ nullable: true, default: null })
  gender!: string;

  @Column({ default: false })
  isauthenticated!: boolean;

  @Column({ default: false, unique: true })
  username!: string;

  @Column({ default: false })
  password!: string;

  @Column({ type: "datetime", default: () => "CURRENT_TIMESTAMP" })
  lastlogin!: Date;

  @Column({ nullable: true, default: null })
  profilePic!: string;
}
