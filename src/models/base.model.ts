import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  Index,
  PrimaryColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { randomUUID } from "crypto";
export abstract class BaseEntityModel extends BaseEntity {
  @Index({ unique: true })
  @PrimaryColumn({ nullable: false })
  id: string = randomUUID();

  @CreateDateColumn({ name: "created_at" })
  created_at: Date = new Date();

  @UpdateDateColumn({ name: "updated_at" })
  updated_at: Date = new Date();

  @Column({ name: "created_by" })
  created_by!: string;

  @Column({ name: "updated_by" })
  updated_by!: string;

  @Column({ default: true, name: "is_active" })
  is_active!: boolean;

  @Column({ default: false, name: "is_deleted", select: false })
  is_deleted!: boolean;
}
