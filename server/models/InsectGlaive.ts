import { BaseEntity, Column, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Weapon } from ".";

export class InsectGlaive extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({nullable: false})
  kinsectLevel!: number;

  @OneToOne(() => Weapon, {nullable: false})
  weapon!: Weapon
}