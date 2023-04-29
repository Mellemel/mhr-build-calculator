import { BaseEntity, Column, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Weapon } from "./Weapon";

export class InsectGlaive extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({nullable: false})
  kinsectLevel!: number;

  @OneToOne(() => Weapon, {nullable: false})
  weapon!: Weapon
}