import { BaseEntity, Column, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Weapon } from "../Weapon";

export class HuntingHorn extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column('simple-array')
  songs: string[] = [];

  @OneToOne(() => Weapon, {nullable: false})
  weapon!: Weapon
}