import { BaseEntity, Column, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Weapon } from ".";

type ShellingType = 'normal' | 'long' | 'wide';

export class GunLance extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({nullable: false})
  shellingType!: ShellingType;
  @Column()
  shellingLevel: number = 0;

  @OneToOne(() => Weapon, {nullable: false})
  weapon!: Weapon
}