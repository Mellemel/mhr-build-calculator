import { BaseEntity, Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Weapon } from "./Weapon";

type PhialType = 'power' | 'element' | 'impact' | 'exhaust' | 'elemental';

@Entity()
export class ChargeBlade extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column('simple-enum', {nullable: false})
  phialType!: PhialType;

  @OneToOne(() => Weapon, {nullable: false})
  weapon!: Weapon;
}