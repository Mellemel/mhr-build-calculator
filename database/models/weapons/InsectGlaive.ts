import { BaseEntity, Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Weapon } from "../Weapon";

@Entity()
export class InsectGlaive extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column('smallint', {nullable: false})
  kinsectLevel!: number;

  @OneToOne(() => Weapon, {nullable: false})
  @JoinColumn()
  weapon!: Weapon
}